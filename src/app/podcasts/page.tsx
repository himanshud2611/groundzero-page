"use client";
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

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
      } catch (err) {
        setError('Failed to load videos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
      {/* Background with noise */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.67' numOctaves='3' stitchTiles='stitch' seed='2400'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23454545'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <Header />

      {/* Lights background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/signals-page-lights.svg"
          alt=""
          width={1440}
          height={872}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-auto max-w-none"
          priority
        />
      </div>

      <main className="relative flex-1 w-full pt-32 px-4 sm:px-10 md:px-16 pb-20">
        <motion.article
          className="relative z-10 w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title Section */}
          <div className="flex flex-col items-center gap-3 mb-8 md:mb-12">
            <motion.h1
              className="font-serif font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.4px] text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Podcasts
            </motion.h1>
            <motion.p
              className="font-mono text-base md:text-lg text-white/60 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              ML, Maths and Conversations
            </motion.p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                  <div className="flex-1 p-2 md:p-4 flex flex-col">
                    <h3 className="font-mono text-[13px] md:text-base text-white/90 group-hover:text-[#628bb2] transition-colors duration-300 line-clamp-2 mb-1 md:mb-2 leading-tight md:leading-snug">
                      {video.title}
                    </h3>
                    <p className="font-mono text-[11px] md:text-xs text-white/50 group-hover:text-white/60 transition-colors duration-200 line-clamp-1 md:line-clamp-2 mb-2 md:mb-3 leading-relaxed hidden md:block">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs text-white/40 group-hover:text-white/50 transition-colors duration-200 mt-auto">
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
        </motion.article>
      </main>
      <Footer />
    </div>
  );
}
