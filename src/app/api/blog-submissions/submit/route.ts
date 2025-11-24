import { NextRequest, NextResponse } from 'next/server';
import { communityBlogsSupabase } from '@/lib/supabase';
import { isValidEmail, isValidUrl, normalizeEmail } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, profileLink, blogLink } = body;

    // Validation
    if (!email || !profileLink || !blogLink) {
      return NextResponse.json(
        { error: 'Email, profile link, and blog link are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate URLs
    if (!isValidUrl(profileLink) || !isValidUrl(blogLink)) {
      return NextResponse.json(
        { error: 'Invalid URL format for profile or blog link' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await communityBlogsSupabase
      .from('blog_submissions')
      .insert([
        {
          email: normalizeEmail(email),
          profile_link: profileLink.trim(),
          blog_link: blogLink.trim(),
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Blog submission received successfully',
        data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
