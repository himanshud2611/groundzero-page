import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://groundzero1.substack.com/feed', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Substack feed');
    }

    const text = await response.text();

    // Parse RSS feed to extract subscriber count if available
    // Note: Substack RSS feeds don't typically include subscriber counts
    // This is a placeholder for potential future implementation

    return NextResponse.json({
      success: true,
      subscribers: null, // Substack doesn't expose this via RSS
      message: 'Subscriber count not available via RSS feed',
    });
  } catch (error) {
    console.error('Error fetching Substack data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Substack data' },
      { status: 500 }
    );
  }
}
