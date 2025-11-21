-- Create post_images table
CREATE TABLE post_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE post_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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

-- Index
CREATE INDEX idx_post_images_post_id ON post_images(post_id);
