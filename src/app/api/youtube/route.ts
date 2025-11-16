import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get('playlistId');

  if (!playlistId) {
    return NextResponse.json({ error: 'Playlist ID is required' }, { status: 400 });
  }

  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 });
  }

  try {
    // Fetch playlist items
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
    );

    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlist');
    }

    const playlistData = await playlistResponse.json();

    // Get video IDs
    const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(',');

    // Fetch video details (duration, views, etc.)
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const videosData = await videosResponse.json();

    // Format the response with only the required data
    const videos = videosData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high.url,
      duration: video.contentDetails.duration,
      views: video.statistics.viewCount,
      uploadTime: video.snippet.publishedAt,
      link: `https://www.youtube.com/watch?v=${video.id}`,
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('YouTube API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
