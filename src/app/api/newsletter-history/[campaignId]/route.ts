import { NextRequest, NextResponse } from 'next/server';
import { createAdminServerClient } from '@/lib/admin-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  try {
    const { campaignId } = params;

    const supabase = createAdminServerClient();

    const { data: sends, error } = await supabase
      .from('newsletter_sends')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('sent_at', { ascending: false });

    if (error) {
      console.error('Error fetching sends:', error);
      return NextResponse.json(
        { error: 'Failed to fetch sends' },
        { status: 500 }
      );
    }

    return NextResponse.json({ sends });
  } catch (error) {
    console.error('Newsletter sends error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter sends' },
      { status: 500 }
    );
  }
}
