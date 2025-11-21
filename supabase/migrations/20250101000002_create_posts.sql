-- Create posts table
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
  
  -- Common fields for all types
  opening_hours TEXT,
  price_range TEXT,
  facilities JSONB,
  
  -- Event-specific fields
  event_date DATE,
  event_start_time TIME,
  event_end_time TIME,
  capacity INTEGER,
  organizer TEXT,
  
  -- Food-specific fields
  cuisine_type TEXT,
  reservation_info TEXT,
  payment_methods JSONB,
  
  -- Place-specific fields
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

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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

-- Indexes
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_posts_trending ON posts(trending) WHERE trending = TRUE;
CREATE INDEX idx_posts_verified ON posts(verified) WHERE verified = TRUE;
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_search ON posts USING GIN(search_vector);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_event_date ON posts(event_date) WHERE type = 'event';
CREATE INDEX idx_posts_cuisine ON posts(cuisine_type) WHERE type = 'food';
