'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { communityBlogsSupabase } from '@/lib/supabase';

interface Stats {
  pendingBlogs: number;
  approvedBlogs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pendingBlogs: 0,
    approvedBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch blog submissions stats
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

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Pending Blogs',
      value: stats.pendingBlogs,
      icon: '⏳',
      color: 'bg-yellow-500',
      href: '/admin/blogs',
    },
    {
      title: 'Approved Blogs',
      value: stats.approvedBlogs,
      icon: '📝',
      color: 'bg-purple-500',
      href: '/admin/blogs',
    },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif text-2xl md:text-3xl text-gray-900">Dashboard</h1>
        <p className="font-mono text-sm text-gray-500 mt-1">
          Welcome to the GroundZero admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
        {statCards.map((card, index) => (
          <motion.a
            key={card.title}
            href={card.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="block"
          >
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg md:text-xl">{card.icon}</span>
                <div className={`w-2 h-2 rounded-full ${card.color}`} />
              </div>
              <div>
                {loading ? (
                  <div className="h-6 md:h-7 w-10 md:w-12 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <p className="font-serif text-xl md:text-2xl text-gray-900">{card.value}</p>
                )}
                <p className="font-mono text-[10px] md:text-xs text-gray-500 mt-1">{card.title}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <h2 className="font-serif text-lg md:text-xl text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <motion.a
            href="https://groundzero1.substack.com/publish/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl md:text-2xl">📧</span>
            <div>
              <p className="font-mono font-medium text-gray-900 text-sm md:text-base">Newsletter (Substack)</p>
              <p className="font-mono text-xs text-gray-500">View subscribers on Substack</p>
            </div>
          </motion.a>

          <motion.a
            href="/admin/blogs"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl md:text-2xl">📝</span>
            <div>
              <p className="font-mono font-medium text-gray-900 text-sm md:text-base">Review Blogs</p>
              <p className="font-mono text-xs text-gray-500">Approve or reject submissions</p>
            </div>
          </motion.a>

          <motion.a
            href="https://tally.so/forms/pbbyQ8/submissions"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl md:text-2xl">⚡</span>
            <div>
              <p className="font-mono font-medium text-gray-900 text-sm md:text-base">Signals (Tally)</p>
              <p className="font-mono text-xs text-gray-500">View in Tally dashboard</p>
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
