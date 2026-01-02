import { NextResponse } from 'next/server';
import { createAdminServerClient } from '@/lib/admin-auth';

export async function GET() {
  try {
    const supabase = createAdminServerClient();

    const { data: campaigns, error } = await supabase
      .from('newsletter_campaigns')
      .select('*')
      .order('sent_at', { ascending: false });

    if (error) {
      console.error('Error fetching campaigns:', error);
      return NextResponse.json(
        { error: 'Failed to fetch campaigns' },
        { status: 500 }
      );
    }

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Newsletter history error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter history' },
      { status: 500 }
    );
  }
}
