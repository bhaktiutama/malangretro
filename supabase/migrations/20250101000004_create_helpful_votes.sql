-- Create helpful_votes table
CREATE TABLE helpful_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  browser_fingerprint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Either user_id or browser_fingerprint must be present
  CONSTRAINT check_voter_identity CHECK (
    (user_id IS NOT NULL AND browser_fingerprint IS NULL) OR
    (user_id IS NULL AND browser_fingerprint IS NOT NULL)
  ),
  
  -- Prevent duplicate votes
  UNIQUE(post_id, user_id),
  UNIQUE(post_id, browser_fingerprint)
);

-- Enable RLS
ALTER TABLE helpful_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Votes are viewable by everyone"
  ON helpful_votes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can vote"
  ON helpful_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete own votes"
  ON helpful_votes FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_helpful_votes_post_id ON helpful_votes(post_id);
CREATE INDEX idx_helpful_votes_fingerprint ON helpful_votes(browser_fingerprint) WHERE browser_fingerprint IS NOT NULL;
