import { NextResponse } from 'next/server';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

const CACHE_DURATION_MS = 1000 * 60 * 30; // 30 minutes

let cache: { posts: SubstackPost[]; lastUpdated: string; timestamp: number } | null = null;

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cache && now - cache.timestamp < CACHE_DURATION_MS) {
    return NextResponse.json({ posts: cache.posts, lastUpdated: cache.lastUpdated });
  }

  try {
    const response = await fetch('https://groundzero1.substack.com/feed', {
      headers: {
        'User-Agent': 'GroundZero-Admin/1.0',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xml = await response.text();
    const posts = parseRSS(xml);

    cache = {
      posts,
      lastUpdated: new Date().toISOString(),
      timestamp: now,
    };

    return NextResponse.json({ posts, lastUpdated: cache.lastUpdated });
  } catch (error) {
    console.error('Substack RSS Error:', error);

    // Return stale cache if available
    if (cache) {
      return NextResponse.json({ posts: cache.posts, lastUpdated: cache.lastUpdated });
    }

    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

function parseRSS(xml: string): SubstackPost[] {
  const posts: SubstackPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];

    const title = extractTag(item, 'title');
    const link = extractTag(item, 'link');
    const pubDate = extractTag(item, 'pubDate');
    const description = extractTag(item, 'description');

    if (title && link) {
      posts.push({
        title: decodeHTMLEntities(title),
        link,
        pubDate: pubDate || '',
        description: cleanDescription(description || ''),
      });
    }
  }

  return posts.slice(0, 10); // Return latest 10 posts
}

function extractTag(xml: string, tag: string): string | null {
  // Handle CDATA
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) {
    return cdataMatch[1].trim();
  }

  // Handle regular content
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function cleanDescription(html: string): string {
  // Remove HTML tags and decode entities
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();

  // Truncate to ~150 chars
  if (text.length > 150) {
    return text.substring(0, 150).trim() + '...';
  }
  return text;
}
