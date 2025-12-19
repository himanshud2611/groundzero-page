'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase, communityBlogsSupabase } from '@/lib/supabase';

interface Stats {
  totalSubscribers: number;
  activeSubscribers: number;
  pendingBlogs: number;
  approvedBlogs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalSubscribers: 0,
    activeSubscribers: 0,
    pendingBlogs: 0,
    approvedBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch newsletter subscribers stats
        const { count: totalSubs } = await supabase
          .from('newsletter_subscribers')
          .select('*', { count: 'exact', head: true });

        const { count: activeSubs } = await supabase
          .from('newsletter_subscribers')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

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
          totalSubscribers: totalSubs || 0,
          activeSubscribers: activeSubs || 0,
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
      title: 'Total Subscribers',
      value: stats.totalSubscribers,
      icon: '📧',
      color: 'bg-blue-500',
      href: '/admin/subscribers',
    },
    {
      title: 'Active Subscribers',
      value: stats.activeSubscribers,
      icon: '✅',
      color: 'bg-green-500',
      href: '/admin/subscribers',
    },
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-900">Dashboard</h1>
        <p className="font-mono text-sm text-gray-500 mt-1">
          Welcome to the GroundZero admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
                <div className={`w-2 h-2 rounded-full ${card.color}`} />
              </div>
              <div>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <p className="font-serif text-3xl text-gray-900">{card.value}</p>
                )}
                <p className="font-mono text-sm text-gray-500 mt-1">{card.title}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-serif text-xl text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.a
            href="/admin/subscribers"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">📧</span>
            <div>
              <p className="font-mono font-medium text-gray-900">View Subscribers</p>
              <p className="font-mono text-xs text-gray-500">Manage newsletter list</p>
            </div>
          </motion.a>

          <motion.a
            href="/admin/blogs"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">📝</span>
            <div>
              <p className="font-mono font-medium text-gray-900">Review Blogs</p>
              <p className="font-mono text-xs text-gray-500">Approve or reject submissions</p>
            </div>
          </motion.a>

          <motion.a
            href="/admin/signals"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-mono font-medium text-gray-900">Manage Signals</p>
              <p className="font-mono text-xs text-gray-500">Create and edit content</p>
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
