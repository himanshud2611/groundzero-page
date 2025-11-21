import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Schema
// Create this table in your Supabase dashboard:
/*
CREATE TABLE newsletter_subscribers (
  id TEXT PRIMARY KEY DEFAULT lower(substr(md5(random()::text || clock_timestamp()::text), 1, 10)),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT date_trunc('minute', NOW()),
  source VARCHAR(50) DEFAULT 'popup',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT date_trunc('minute', NOW())
);

-- Create index for faster email lookups
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- Disable Row Level Security (RLS) for full access
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
*/
