import { createClient } from '@supabase/supabase-js';

// =============================================================================
// SUPABASE CLIENT CONFIGURATION
// =============================================================================
// Two separate Supabase projects under the GroundZero Page organization:
// 1. "newsletter emails" - Handles newsletter subscriptions
// 2. "community-blogs" - Handles blog submissions
// =============================================================================

// Newsletter Emails Client (newsletter-subscribers project)
// Used for: Newsletter popup subscriptions
const newsletterUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const newsletterAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(newsletterUrl, newsletterAnonKey);

// Community Blogs Client (community-blogs project)
// Used for: Blog submission form on /spotlights/community-blogs
const communityBlogsUrl = process.env.NEXT_PUBLIC_COMMUNITY_BLOGS_URL!;
const communityBlogsAnonKey = process.env.NEXT_PUBLIC_COMMUNITY_BLOGS_ANON_KEY!;
export const communityBlogsSupabase = createClient(communityBlogsUrl, communityBlogsAnonKey);

// =============================================================================
// DATABASE SCHEMAS
// =============================================================================

/*
--- Newsletter Emails Project (gbxxnumzvuplcqmokjoi) ---
Project URL: https://gbxxnumzvuplcqmokjoi.supabase.co
Purpose: Store newsletter subscriber emails

CREATE TABLE newsletter_subscribers (
  id TEXT PRIMARY KEY DEFAULT lower(substr(md5(random()::text || clock_timestamp()::text), 1, 10)),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT date_trunc('minute', NOW()),
  source VARCHAR(50) DEFAULT 'popup',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT date_trunc('minute', NOW())
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
*/

/*
--- Community Blogs Project (jvqblcbwixxdtnaaskci) ---
Project URL: https://jvqblcbwixxdtnaaskci.supabase.co
Purpose: Store community blog submissions for review

CREATE TABLE blog_submissions (
  id TEXT PRIMARY KEY DEFAULT lower(substr(md5(random()::text || clock_timestamp()::text), 1, 10)),
  email VARCHAR(255) NOT NULL,
  profile_link TEXT NOT NULL,
  blog_link TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT date_trunc('minute', NOW()),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT date_trunc('minute', NOW())
);

CREATE INDEX idx_blog_submissions_email ON blog_submissions(email);
CREATE INDEX idx_blog_submissions_status ON blog_submissions(status);
ALTER TABLE blog_submissions DISABLE ROW LEVEL SECURITY;
*/
