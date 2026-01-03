import { NextResponse } from 'next/server';

const CACHE_WINDOW_MS = 1000 * 60 * 60 * 12; // 12 hours

type VideoPayload = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadTime: string;
  link: string;
};

type CachedResponse = {
  videos: VideoPayload[];
  lastUpdated: string;
};

// YouTube API response types
interface YouTubePlaylistItem {
  contentDetails: {
    videoId: string;
  };
}

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    publishedAt: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}

const cache = new Map<string, { timestamp: number; data: CachedResponse }>();

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

  const cached = cache.get(playlistId);
  const now = Date.now();
  const isFresh = cached && now - cached.timestamp < CACHE_WINDOW_MS;

  if (isFresh && cached) {
    return NextResponse.json(cached.data);
  }

  try {
    const freshData = await fetchPlaylistVideos(playlistId, API_KEY);
    cache.set(playlistId, { timestamp: now, data: freshData });
    return NextResponse.json(freshData);
  } catch (error) {
    console.error('YouTube API Error:', error);

    if (cached) {
      return NextResponse.json(cached.data);
    }

    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

async function fetchPlaylistVideos(playlistId: string, apiKey: string): Promise<CachedResponse> {
  const playlistResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}`,
    { cache: 'no-store' }
  );

  if (!playlistResponse.ok) {
    throw new Error('Failed to fetch playlist');
  }

  const playlistData = await playlistResponse.json();
  const videoIds = playlistData.items.map((item: YouTubePlaylistItem) => item.contentDetails.videoId).filter(Boolean);

  if (videoIds.length === 0) {
    return {
      videos: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  const videosResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${apiKey}`,
    { cache: 'no-store' }
  );

  if (!videosResponse.ok) {
    throw new Error('Failed to fetch video details');
  }

  const videosData = await videosResponse.json();

  const videos = videosData.items.map((video: YouTubeVideo) => ({
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.high.url,
    duration: video.contentDetails.duration,
    views: video.statistics.viewCount,
    uploadTime: video.snippet.publishedAt,
    link: `https://www.youtube.com/watch?v=${video.id}`,
  }));

  return {
    videos,
    lastUpdated: new Date().toISOString(),
  };
}
