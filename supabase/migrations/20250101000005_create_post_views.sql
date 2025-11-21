-- Create post_views table
CREATE TABLE post_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  browser_fingerprint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- RLS Policy
CREATE POLICY "Anyone can track views"
  ON post_views FOR INSERT
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_post_views_post_id ON post_views(post_id);
CREATE INDEX idx_post_views_created_at ON post_views(created_at);
CREATE INDEX idx_post_views_fingerprint ON post_views(browser_fingerprint) WHERE browser_fingerprint IS NOT NULL;

-- Prevent counting the same view multiple times within a time window
CREATE UNIQUE INDEX idx_post_views_unique_recent ON post_views(
  post_id, 
  COALESCE(user_id::text, browser_fingerprint),
  date_trunc('hour', created_at)
);
