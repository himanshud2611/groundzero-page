"use client";
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import LightsBackground from "@/components/common/LightsBackground";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSignalsLogo from "@/components/AnimatedSignalsLogo";
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

export default function SignalsEpisodes() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const PLAYLIST_ID = 'PL-vuWWQkFkr_T4FQ5bM9HJKtE9PN3mWFo';

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
            <motion.div
              className="flex items-center justify-center gap-2.5 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <AnimatedSignalsLogo
                size={48}
                className="shrink-0"
              />
              <h1 className="font-mono font-normal text-[40px] leading-none tracking-[-0.4px] text-white">
                SIGNALS
              </h1>
            </motion.div>
            <motion.h2
              className="font-serif font-normal text-[28px] md:text-[32px] leading-none tracking-[-0.4px] text-white/90 text-center"
              {...fadeInUpDelayed(0.2)}
            >
              Episodes
            </motion.h2>
            <motion.p
              className="font-mono text-base md:text-lg max-w-xl text-white/60 text-center tracking-tight"
              {...fadeInUpDelayed(0.3)}
            >
              Watch researchers and builders share their work, pivots, and technical tradeoffs
            </motion.p>
            <motion.a
              href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 relative inline-flex items-center justify-center h-10 md:h-12 px-5 md:px-6 gap-2 md:gap-3 bg-[#628bb2]/20 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(98,139,178,0.1)] border border-[#628bb2]/30 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.01,
                backgroundColor: 'rgba(98, 139, 178, 0.3)',
                borderColor: 'rgba(98, 139, 178, 0.5)',
              }}
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
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <p className="font-mono text-white/60">Loading episodes...</p>
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
