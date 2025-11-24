# Supabase Setup Guide

This guide covers the Supabase setup for Ground Zero. The project uses **two separate Supabase projects** under the GroundZero Page organization:

1. **Newsletter Emails** - Handles newsletter subscriptions
2. **Community Blogs** - Handles blog submissions

## Prerequisites

- A Supabase account (free tier works fine)
- Access to your Supabase project dashboard

## Architecture Overview

```
Ground Zero Application
├── Newsletter Emails Project (gbxxnumzvuplcqmokjoi)
│   └── Table: newsletter_subscribers
│       └── Used by: Newsletter popup component
└── Community Blogs Project (jvqblcbwixxdtnaaskci)
    └── Table: blog_submissions
        └── Used by: Blog submission form on /spotlights/community-blogs
```

---

## Project 1: Newsletter Emails

### Step 1: Create Newsletter Emails Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: newsletter emails
   - **Database Password**: Save this password securely
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be ready (1-2 minutes)

### Step 2: Create the Newsletter Subscribers Table

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Create newsletter subscribers table
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
```

4. Click "Run" to execute the query
5. You should see a success message

## Step 3: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** (left sidebar) → **API**
2. Find these two values:
   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **anon/public key**: A long JWT token starting with `eyJ...`

## Step 4: Configure Environment Variables

1. In your Ground Zero project root, create a `.env.local` file (if it doesn't exist)
2. Add these environment variables with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Save the file
4. **Important**: Restart your development server for the changes to take effect:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## Step 5: Test the Newsletter Popup

1. Open your site at `http://localhost:3000`
2. Wait 30 seconds for the popup to appear (or clear localStorage to test immediately)
3. Enter an email address and click "Subscribe"
4. Check your Supabase dashboard:
   - Go to **Table Editor** → **newsletter_subscribers**
   - You should see your test email in the table

## Testing Tips

To test the popup multiple times during development:

1. **Open browser DevTools** (F12 or right-click → Inspect)
2. Go to **Application** tab → **Local Storage**
3. Delete these keys to reset:
   - `newsletter_subscribed`
   - `newsletter_dismissed`
4. Refresh the page

## Popup Behavior

- Shows after **30 seconds** of page load
- If dismissed: Won't show again for **24 hours**
- If subscribed: Won't show again **ever**
- Tracks state in browser's localStorage

## Viewing Subscribers

To view all newsletter subscribers:

1. Go to Supabase dashboard
2. **Table Editor** → **newsletter_subscribers**
3. You'll see all emails with subscription dates

## Exporting Subscribers

To export emails for sending newsletters:

1. In Supabase dashboard, go to **Table Editor** → **newsletter_subscribers**
2. Click the three dots (⋯) at the top right
3. Select "Download as CSV"
4. Use the CSV file with your email service (SendGrid, Mailchimp, etc.)

Or use SQL to get just the emails:

```sql
SELECT email
FROM newsletter_subscribers
WHERE is_active = true
ORDER BY subscribed_at DESC;
```

## Security Notes

- ✅ Row Level Security (RLS) is disabled for full access
- ✅ Email validation happens both client-side and API-side
- ✅ Duplicate emails are prevented at database level
- ✅ API credentials are safe to expose (they're client-side keys)

## Troubleshooting

### Popup doesn't appear
- Check browser console for errors
- Verify `.env.local` file exists and has correct values
- Restart dev server after adding environment variables
- Clear localStorage and wait 30 seconds

### "Failed to subscribe" error
- Check browser console for detailed error
- Verify Supabase credentials are correct
- Make sure the database table was created successfully
- Check Supabase project is not paused (free tier pauses after inactivity)

### Duplicate email error is expected
- This is normal behavior
- The system prevents duplicate subscriptions
- User will see "This email is already subscribed" message

## Next Steps (Optional Enhancements)

1. **Email Confirmation**: Send welcome emails using Supabase Edge Functions
2. **Unsubscribe Feature**: Add unsubscribe links and update `is_active` field
3. **Admin Dashboard**: Build a page to view/manage subscribers
4. **Email Campaigns**: Integrate with SendGrid/Resend to send newsletters
5. **Analytics**: Track popup conversion rates

## Production Deployment

When deploying to production (Vercel):

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the same two variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy your site

The popup will work automatically in production!
