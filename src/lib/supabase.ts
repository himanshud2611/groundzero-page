import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Schema
// Create this table in your Supabase dashboard:
/*
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'popup',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for newsletter signup)
CREATE POLICY "Allow public newsletter signups"
ON newsletter_subscribers FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional)
CREATE POLICY "Allow authenticated read"
ON newsletter_subscribers FOR SELECT
TO authenticated
USING (true);
*/
