# Supabase Database Setup

## Quick Start

### 1. Execute Database Schema

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/qxjgomwibnxkzythmdti
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy the entire contents of `supabase/schema.sql`
5. Paste into the SQL Editor
6. Click **Run** to execute

This will create:
- ✅ 5 tables (profiles, posts, post_images, helpful_votes, post_views)
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ Database functions & triggers
- ✅ Full-text search support

### 2. Verify Installation

After running the schema, verify the tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see:
- profiles
- posts
- post_images
- helpful_votes
- post_views

### 3. Test the Setup

Insert a test post:

```sql
INSERT INTO posts (type, title, content, location, tags)
VALUES (
  'event',
  'Test Event',
  'This is a test event',
  'Malang, Indonesia',
  ARRAY['test', 'event']
);
```

Query the post:

```sql
SELECT * FROM posts;
```

## Environment Variables

The `.env.local` file has been created with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://qxjgomwibnxkzythmdti.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=sb_secret_FArVZiFFp7HqIfeA3JZ-aA_NATdg9nJ
```

## What's Been Set Up

### ✅ Supabase Client Utilities
- `src/lib/supabase/client.ts` - Browser client
- `src/lib/supabase/server.ts` - Server client
- `src/lib/supabase/middleware.ts` - Auth middleware
- `src/lib/supabase/database.types.ts` - TypeScript types

### ✅ Browser Fingerprinting
- `src/lib/fingerprint/client.ts` - Fingerprint utility with React hook
- Session caching for performance
- Anonymous user tracking

### ✅ Analytics API
- `src/lib/api/analytics.ts` - View tracking & helpful votes
- Automatic fingerprint handling
- Duplicate prevention

### ✅ Middleware
- `middleware.ts` - Auth session management
- Automatic cookie handling

### ✅ Database Schema
- All tables with proper relationships
- RLS policies for security
- Indexes for performance
- Triggers for automatic updates
- Full-text search support

## Next Steps

1. **Execute the schema** in Supabase SQL Editor
2. **Seed some data** (optional - we can create seed data)
3. **Update components** to use Supabase instead of mock data
4. **Test the application** with real data

## Database Schema Overview

### Tables

**profiles**
- User profiles with badges and contribution counts
- Linked to Supabase Auth users

**posts**
- Main content table for events, food, and places
- Type-specific fields (event_date, cuisine_type, entrance_fee, etc.)
- Full-text search support
- Metrics tracking (views, helpful_votes, visit_count)

**post_images**
- Multiple images per post
- Display order support
- Linked to Supabase Storage

**helpful_votes**
- User or anonymous votes
- Browser fingerprint for anonymous users
- Automatic count updates via triggers

**post_views**
- View tracking with deduplication
- 1-hour window to prevent inflation
- Browser fingerprint support

### Security

All tables have Row Level Security (RLS) enabled:
- Public read access for posts and images
- Authenticated users can create/update/delete own content
- Anonymous users can vote and track views using fingerprints

### Performance

Indexes created for:
- Post type filtering
- Trending/verified posts
- Date-based queries
- Full-text search
- Tag-based filtering
- Cuisine type filtering (food posts)
- Event date filtering (event posts)

## Troubleshooting

### If migration fails:

1. Check if tables already exist:
   ```sql
   DROP TABLE IF EXISTS post_views CASCADE;
   DROP TABLE IF EXISTS helpful_votes CASCADE;
   DROP TABLE IF EXISTS post_images CASCADE;
   DROP TABLE IF EXISTS posts CASCADE;
   DROP TABLE IF EXISTS profiles CASCADE;
   ```

2. Re-run the schema.sql file

### If RLS blocks queries:

Check policies:
```sql
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

### If fingerprinting doesn't work:

Check browser console for errors. The fingerprint library requires:
- JavaScript enabled
- Canvas API support
- WebGL support

## Support

For issues or questions:
1. Check Supabase logs in dashboard
2. Review RLS policies
3. Test queries in SQL Editor
4. Check browser console for client errors
