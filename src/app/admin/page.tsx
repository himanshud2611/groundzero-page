'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { communityBlogsSupabase } from '@/lib/supabase';

interface Stats {
  pendingBlogs: number;
  approvedBlogs: number;
}

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pendingBlogs: 0,
    approvedBlogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: pendingBlogs } = await communityBlogsSupabase
          .from('blog_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        const { count: approvedBlogs } = await communityBlogsSupabase
          .from('blog_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved');

        setStats({
          pendingBlogs: pendingBlogs || 0,
          approvedBlogs: approvedBlogs || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/substack');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching Substack posts:', error);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchStats();
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div variants={item}>
          <h1 className="font-serif text-2xl lg:text-3xl text-white/90 tracking-tight">Dashboard</h1>
          <p className="font-mono text-sm text-white/30 mt-1">Overview of your GroundZero admin panel</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4 lg:gap-6">
          {/* Pending Blogs */}
          <a href="/admin/blogs" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#141414] border border-white/5 p-6 lg:p-8 transition-all duration-300 hover:border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-mono text-[11px] text-white/40 uppercase tracking-wider">Pending</span>
                </div>
                {loading ? (
                  <div className="h-10 w-16 bg-white/5 rounded animate-pulse" />
                ) : (
                  <p className="font-serif text-4xl lg:text-5xl text-white/90 tracking-tight">{stats.pendingBlogs}</p>
                )}
                <p className="font-mono text-xs text-white/30 mt-2">Blog submissions awaiting review</p>
              </div>
            </div>
          </a>

          {/* Approved Blogs */}
          <a href="/admin/blogs" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#141414] border border-white/5 p-6 lg:p-8 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[11px] text-white/40 uppercase tracking-wider">Published</span>
                </div>
                {loading ? (
                  <div className="h-10 w-16 bg-white/5 rounded animate-pulse" />
                ) : (
                  <p className="font-serif text-4xl lg:text-5xl text-white/90 tracking-tight">{stats.approvedBlogs}</p>
                )}
                <p className="font-mono text-xs text-white/30 mt-2">Approved community blogs</p>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-gradient-to-b from-[#bf635c] to-[#e79c7f] rounded-full" />
            <h2 className="font-mono text-xs text-white/50 uppercase tracking-wider">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <motion.a
              href="https://groundzero1.substack.com/publish/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-[#e79c7f]/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6719]/20 to-[#FF6719]/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FF6719]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">Substack</p>
                <p className="font-mono text-[11px] text-white/30">Manage newsletter</p>
              </div>
              <svg className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </motion.a>

            <motion.a
              href="/admin/blogs"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-[#e79c7f]/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e79c7f]/20 to-[#e79c7f]/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#e79c7f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">Review Blogs</p>
                <p className="font-mono text-[11px] text-white/30">Approve submissions</p>
              </div>
              <svg className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.a>

            <motion.a
              href="https://tally.so/forms/pbbyQ8/submissions"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-[#e79c7f]/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">Signals</p>
                <p className="font-mono text-[11px] text-white/30">Tally submissions</p>
              </div>
              <svg className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Latest Substack Posts */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-[#FF6719] to-[#FF6719]/50 rounded-full" />
              <h2 className="font-mono text-xs text-white/50 uppercase tracking-wider">Latest on Substack</h2>
            </div>
            <a
              href="https://groundzero1.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
            >
              View all
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          <div className="rounded-2xl bg-[#1a1a1a] border border-white/5 overflow-hidden">
            {postsLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-8 h-8 bg-white/5 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-white/5 rounded w-3/4" />
                    </div>
                    <div className="w-12 h-3 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="divide-y divide-white/5">
                {posts.slice(0, 5).map((post, index) => (
                  <motion.a
                    key={post.link}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6719]/10 to-transparent flex items-center justify-center shrink-0">
                      <span className="font-mono text-xs text-[#FF6719]/60">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="flex-1 font-mono text-sm text-white/60 group-hover:text-white/90 transition-colors line-clamp-1">
                      {post.title}
                    </p>
                    <span className="font-mono text-[11px] text-white/20 shrink-0">{formatDate(post.pubDate)}</span>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="font-mono text-sm text-white/30">No posts found</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
