"use client";
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import LightsBackground from "@/components/common/LightsBackground";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInUpDelayed } from "@/lib/animations";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadTime: string;
  link: string;
}

// Function to parse ISO 8601 duration to readable format
function parseDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
}

// Function to format view count
function formatViews(views: string): string {
  const num = parseInt(views);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// Function to format upload time
function formatUploadTime(uploadTime: string): string {
  const date = new Date(uploadTime);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

export default function Podcasts() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const PLAYLIST_ID = 'PL-vuWWQkFkr-CyVjXDBhjoiElmibTC5jV';

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(`/api/youtube?playlistId=${PLAYLIST_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data.videos);
        setLastUpdated(data.lastUpdated ?? null);
      } catch (err) {
        setError('Failed to load videos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const lastUpdatedLabel = lastUpdated
    ? new Date(lastUpdated).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : null;

  return (
    <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
      <BackgroundNoise />
      <Header />
      <LightsBackground />

      <main className="relative flex-1 w-full pt-32 px-4 sm:px-10 md:px-16 pb-20">
        <motion.article
          className="relative z-10 w-full max-w-6xl mx-auto"
          {...fadeInUp}
        >
          {/* Title Section */}
          <div className="flex flex-col items-center gap-3 mb-8 md:mb-12">
            <motion.h1
              className="font-serif font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.4px] text-white text-center"
              {...fadeInUpDelayed(0.2)}
            >
              GroundZero Podcasts
            </motion.h1>
            <motion.p
              className="font-mono text-base md:text-lg max-w-xl text-white/60 text-center tracking-tight"
              {...fadeInUpDelayed(0.3)}
            >
              Deep tech interesting conversations with amazing researchers, hackers and founders in AI
            </motion.p>
            <motion.div
              className="mt-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center h-10 md:h-12 px-5 md:px-6 gap-2 md:gap-3 bg-white/10 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.1)] cursor-pointer"
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="relative w-[18px] h-[18px] md:w-6 md:h-6" viewBox="0 0 24 24">
                  <path fill="#FF3333" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                  <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="relative font-mono font-medium text-sm md:text-base text-white/90 tracking-tight">
                  View Playlist
                </span>
              </motion.a>

              <motion.a
                href="https://open.spotify.com/show/2x5gh4HfayziVzKrBefzjt?si=effc3ae6c0024e57"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-white/10 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.1)] cursor-pointer"
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-[18px] h-[18px] md:w-6 md:h-6" viewBox="0 0 496 512" fill="#1ED760">
                  <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://podcasts.apple.com/in/podcast/groundzero-ai-talks/id1896715519"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-white/10 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.1)] cursor-pointer"
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/apple-podcasts-icon.svg"
                  alt="Apple Podcasts"
                  width={24}
                  height={24}
                  className="w-[18px] h-[18px] md:w-6 md:h-6"
                />
              </motion.a>
            </motion.div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <p className="font-mono text-white/60">Loading videos...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-20">
              <p className="font-mono text-red-400">{error}</p>
            </div>
          )}

          {/* Videos Grid */}
          {!loading && !error && (
            <motion.div
              className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0"
              {...fadeInUpDelayed(0.4)}
            >
              {videos.map((video, index) => (
                <motion.a
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 rounded-lg overflow-hidden border border-white/5 hover:border-[#628bb2]/30 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 flex md:flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-[168px] h-[94px] md:w-full md:h-auto md:aspect-video bg-black/20 overflow-hidden shrink-0">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {/* Duration Badge */}
                    <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-black/90 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-mono text-white font-medium">
                      {parseDuration(video.duration)}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0 p-2 md:p-4 flex flex-col">
                    <h3 className="font-mono text-[13px] md:text-base text-white/90 group-hover:text-[#628bb2] transition-colors duration-300 line-clamp-2 leading-tight md:leading-snug mb-auto">
                      {video.title}
                    </h3>
                    <p className="font-mono text-xs text-white/50 group-hover:text-white/60 transition-colors duration-200 mb-3 leading-relaxed hidden md:block overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {video.description}
                    </p>
                    <div className="flex items-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs text-white/40 group-hover:text-white/50 transition-colors duration-200">
                      <div className="flex items-center gap-1 md:gap-1.5">
                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{formatViews(video.views)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1 md:gap-1.5">
                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatUploadTime(video.uploadTime)}</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}

          {lastUpdatedLabel && (
            <p className="font-mono text-[10px] md:text-xs text-white/35 text-center tracking-tight mt-6">
              Last updated · {lastUpdatedLabel}
            </p>
          )}
        </motion.article>
      </main>
      <Footer />
    </div>
  );
}
