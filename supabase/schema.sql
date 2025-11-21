-- ============================================
-- Malang Retro Event App - Database Schema
-- Execute this SQL in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CREATE PROFILES TABLE
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  badge TEXT CHECK (badge IN ('verified', 'expert')),
  contribution_count INTEGER DEFAULT 0,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE INDEX idx_profiles_username ON profiles(username);

-- ============================================
-- 2. CREATE POSTS TABLE
-- ============================================

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('event', 'food', 'place')),
  title TEXT NOT NULL,
  venue TEXT,
  content TEXT NOT NULL,
  location TEXT NOT NULL,
  coordinates JSONB,
  tags TEXT[] DEFAULT '{}',
  
  -- Metrics
  views INTEGER DEFAULT 0,
  helpful_votes INTEGER DEFAULT 0,
  visit_count INTEGER DEFAULT 0,
  
  -- Verification & Quality
  verified BOOLEAN DEFAULT FALSE,
  is_official BOOLEAN DEFAULT FALSE,
  trending BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('active', 'closed', 'upcoming')) DEFAULT 'active',
  
  -- Contributor
  contributor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  
  -- Common fields
  opening_hours TEXT,
  price_range TEXT,
  facilities JSONB,
  
  -- Event-specific
  event_date DATE,
  event_start_time TIME,
  event_end_time TIME,
  capacity INTEGER,
  organizer TEXT,
  
  -- Food-specific
  cuisine_type TEXT,
  reservation_info TEXT,
  payment_methods JSONB,
  
  -- Place-specific
  entrance_fee TEXT,
  photo_spots_count TEXT,
  best_season TEXT,
  accessibility TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Full text search
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('indonesian', 
      coalesce(title, '') || ' ' || 
      coalesce(content, '') || ' ' || 
      coalesce(location, '') || ' ' || 
      coalesce(cuisine_type, '') || ' ' || 
      coalesce(organizer, '')
    )
  ) STORED
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' OR is_anonymous = true);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = contributor_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = contributor_id);

CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_posts_trending ON posts(trending) WHERE trending = TRUE;
CREATE INDEX idx_posts_verified ON posts(verified) WHERE verified = TRUE;
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_search ON posts USING GIN(search_vector);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_event_date ON posts(event_date) WHERE type = 'event';
CREATE INDEX idx_posts_cuisine ON posts(cuisine_type) WHERE type = 'food';

-- ============================================
-- 3. CREATE POST_IMAGES TABLE
-- ============================================

CREATE TABLE post_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE post_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post images are viewable by everyone"
  ON post_images FOR SELECT
  USING (true);

CREATE POLICY "Post owners can manage images"
  ON post_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_images.post_id
      AND posts.contributor_id = auth.uid()
    )
  );

CREATE INDEX idx_post_images_post_id ON post_images(post_id);

-- ============================================
-- 4. CREATE HELPFUL_VOTES TABLE
-- ============================================

CREATE TABLE helpful_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  browser_fingerprint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT check_voter_identity CHECK (
    (user_id IS NOT NULL AND browser_fingerprint IS NULL) OR
    (user_id IS NULL AND browser_fingerprint IS NOT NULL)
  ),
  
  UNIQUE(post_id, user_id),
  UNIQUE(post_id, browser_fingerprint)
);

ALTER TABLE helpful_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Votes are viewable by everyone"
  ON helpful_votes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can vote"
  ON helpful_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete own votes"
  ON helpful_votes FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_helpful_votes_post_id ON helpful_votes(post_id);
CREATE INDEX idx_helpful_votes_fingerprint ON helpful_votes(browser_fingerprint) WHERE browser_fingerprint IS NOT NULL;

-- ============================================
-- 5. CREATE POST_VIEWS TABLE
-- ============================================

CREATE TABLE post_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  browser_fingerprint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track views"
  ON post_views FOR INSERT
  WITH CHECK (true);

CREATE INDEX idx_post_views_post_id ON post_views(post_id);
CREATE INDEX idx_post_views_created_at ON post_views(created_at);
CREATE INDEX idx_post_views_fingerprint ON post_views(browser_fingerprint) WHERE browser_fingerprint IS NOT NULL;

CREATE UNIQUE INDEX idx_post_views_unique_recent ON post_views(
  post_id, 
  COALESCE(user_id::text, browser_fingerprint),
  date_trunc('hour', created_at)
);

-- ============================================
-- 6. CREATE FUNCTIONS & TRIGGERS
-- ============================================

-- Update contribution count
CREATE OR REPLACE FUNCTION update_contribution_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles
    SET contribution_count = contribution_count + 1
    WHERE id = NEW.contributor_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles
    SET contribution_count = contribution_count - 1
    WHERE id = OLD.contributor_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_post_created
  AFTER INSERT ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_contribution_count();

CREATE TRIGGER on_post_deleted
  AFTER DELETE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_contribution_count();

-- Update helpful votes count
CREATE OR REPLACE FUNCTION update_helpful_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts
    SET helpful_votes = helpful_votes + 1
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts
    SET helpful_votes = helpful_votes - 1
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_helpful_vote_changed
  AFTER INSERT OR DELETE ON helpful_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_helpful_votes_count();

-- Update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Increment view count function
CREATE OR REPLACE FUNCTION increment_post_views(post_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE id = post_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- All tables, policies, indexes, functions, and triggers have been created.
-- You can now start using the database!
