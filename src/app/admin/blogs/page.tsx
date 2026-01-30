'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { communityBlogsSupabase } from '@/lib/supabase';
import { extractHandle } from '@/lib/utils';

interface BlogSubmission {
  id: string;
  title: string | null;
  email: string;
  profile_link: string;
  blog_link: string;
  category: string | null;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string | null;
  created_at: string;
}

// Default categories
const DEFAULT_CATEGORIES = [
  'AI x Experiments',
  'AI x Science',
  'AI x Maths',
  'AI x Interpretability',
  'AI Infra x Experiments',
  'Game Dev x Experiments',
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  // Approval modal state
  const [approvalModal, setApprovalModal] = useState<{
    isOpen: boolean;
    blog: BlogSubmission | null;
  }>({ isOpen: false, blog: null });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [editableTitle, setEditableTitle] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Extract unique categories from approved blogs
  useEffect(() => {
    const approvedCategories = blogs
      .filter(b => b.status === 'approved' && b.category)
      .map(b => b.category as string);
    const uniqueCategories = [...new Set([...DEFAULT_CATEGORIES, ...approvedCategories])];
    setCategories(uniqueCategories);
  }, [blogs]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await communityBlogsSupabase
        .from('blog_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };


  const openApprovalModal = (blog: BlogSubmission) => {
    setApprovalModal({ isOpen: true, blog });
    setSelectedCategory(blog.category || '');
    setCustomCategory('');
    setShowCustomInput(false);
    setEditableTitle(blog.title || '');
  };

  const closeApprovalModal = () => {
    setApprovalModal({ isOpen: false, blog: null });
    setSelectedCategory('');
    setCustomCategory('');
    setShowCustomInput(false);
    setEditableTitle('');
  };

  const handleApprove = async () => {
    if (!approvalModal.blog) return;

    const finalCategory = showCustomInput ? customCategory.trim() : selectedCategory;
    const finalTitle = editableTitle.trim();

    if (!finalTitle) {
      alert('Please enter a title for the blog');
      return;
    }

    if (!finalCategory) {
      alert('Please select or enter a category');
      return;
    }

    try {
      const { error } = await communityBlogsSupabase
        .from('blog_submissions')
        .update({
          status: 'approved',
          title: finalTitle,
          category: finalCategory,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', approvalModal.blog.id);

      if (error) throw error;

      setBlogs(blogs.map(blog =>
        blog.id === approvalModal.blog!.id
          ? { ...blog, status: 'approved' as const, title: finalTitle, category: finalCategory, reviewed_at: new Date().toISOString() }
          : blog
      ));

      // Add new category to list if custom
      if (showCustomInput && customCategory.trim() && !categories.includes(customCategory.trim())) {
        setCategories([...categories, customCategory.trim()]);
      }

      closeApprovalModal();
    } catch (error) {
      console.error('Error approving blog:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await communityBlogsSupabase
        .from('blog_submissions')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      setBlogs(blogs.map(blog =>
        blog.id === id ? { ...blog, status: 'rejected' as const, reviewed_at: new Date().toISOString() } : blog
      ));
    } catch (error) {
      console.error('Error rejecting blog:', error);
    }
  };

  const getFilteredBlogs = () => {
    if (filter === 'all') return blogs;
    return blogs.filter(blog => blog.status === filter);
  };

  const filteredBlogs = getFilteredBlogs();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white/90">Blog Submissions</h1>
        <p className="font-mono text-sm text-white/60 mt-1">
          Review and manage community blog submissions
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => {
          const count = f === 'all' ? blogs.length : blogs.filter(b => b.status === f).length;
          const label = f.charAt(0).toUpperCase() + f.slice(1);
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-mono text-sm rounded-xl transition-colors flex items-center gap-2 ${
                filter === f
                  ? 'bg-[#bf635c] text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                filter === f ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Blog Cards Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-white/20 border-t-[#bf635c] rounded-full animate-spin mx-auto" />
          <p className="font-mono text-sm text-white/60 mt-4">Loading submissions...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12 bg-[#1a1a1a] rounded-2xl border border-white/10">
          <p className="font-mono text-white/60">No {filter === 'all' ? '' : filter} submissions found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              {/* Status & Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full font-mono text-xs font-medium ${getStatusColor(blog.status)}`}>
                    {blog.status}
                  </span>
                  {blog.category && (
                    <span className="px-2 py-1 rounded-full font-mono text-xs bg-purple-100 text-purple-700">
                      {blog.category}
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs text-white/40">
                  {new Date(blog.submitted_at).toLocaleDateString()}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg text-white/90 mb-2 line-clamp-2">
                {blog.title || <span className="text-white/40 italic">TBD</span>}
              </h3>

              {/* Links */}
              <div className="space-y-2 mb-4">
                <a
                  href={blog.blog_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-xs text-white/60 hover:text-[#bf635c] truncate transition-colors"
                >
                  📝 {blog.blog_link}
                </a>
                <a
                  href={blog.profile_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-sm text-[#bf635c] hover:text-[#d4736b] transition-colors"
                >
                  <Image src="/twitter-logo.svg" alt="X" width={14} height={14} />
                  {extractHandle(blog.profile_link)}
                </a>
              </div>

              {/* Actions */}
              {blog.status === 'pending' && (
                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => openApprovalModal(blog)}
                    className="flex-1 py-2 bg-green-500/20 text-green-400 font-mono text-sm rounded-xl hover:bg-green-500/30 transition-colors border border-green-500/30"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(blog.id)}
                    className="flex-1 py-2 bg-red-500/20 text-red-400 font-mono text-sm rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Reject
                  </button>
                </div>
              )}

              {blog.status === 'approved' && (
                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleReject(blog.id)}
                    className="flex-1 py-2 bg-red-500/20 text-red-400 font-mono text-sm rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Remove from Community
                  </button>
                </div>
              )}

              {blog.status === 'rejected' && (
                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => openApprovalModal(blog)}
                    className="flex-1 py-2 bg-blue-500/20 text-blue-400 font-mono text-sm rounded-xl hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                  >
                    Review Again
                  </button>
                </div>
              )}

              {blog.reviewed_at && (
                <p className="font-mono text-xs text-white/40 mt-4">
                  Reviewed: {new Date(blog.reviewed_at).toLocaleDateString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Approval Modal */}
      <AnimatePresence>
        {approvalModal.isOpen && approvalModal.blog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={closeApprovalModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-[#1a1a1a] rounded-2xl shadow-xl w-full max-w-md p-6 border border-white/20" onClick={e => e.stopPropagation()}>
                <h2 className="font-serif text-xl text-white/90 mb-2">Approve Blog</h2>
                <p className="font-mono text-sm text-white/60 mb-6">
                  Set title and category before approving
                </p>

                {/* Blog Info */}
                <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                  <p className="font-mono text-sm text-white/60">
                    by {extractHandle(approvalModal.blog.profile_link)}
                  </p>
                  <a
                    href={approvalModal.blog.blog_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#bf635c] hover:underline truncate block mt-1"
                  >
                    {approvalModal.blog.blog_link}
                  </a>
                </div>

                {/* Title Input */}
                <div className="mb-6">
                  <label className="block font-mono text-sm text-white/70 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    placeholder="Enter blog title..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl font-mono text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#bf635c]/50"
                  />
                </div>

                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block font-mono text-sm text-white/70 mb-3">
                    Category *
                  </label>

                  {!showCustomInput ? (
                    <>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
                              selectedCategory === cat
                                ? 'bg-[#bf635c] text-white'
                                : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          setShowCustomInput(true);
                          setSelectedCategory('');
                        }}
                        className="font-mono text-sm text-[#bf635c] hover:underline flex items-center gap-1"
                      >
                        <span>+</span> Add new category
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter new category..."
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl font-mono text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#bf635c]/50"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          setShowCustomInput(false);
                          setCustomCategory('');
                        }}
                        className="font-mono text-sm text-white/60 hover:underline"
                      >
                        ← Back to existing categories
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={closeApprovalModal}
                    className="flex-1 py-2.5 font-mono text-sm text-white/70 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={!editableTitle.trim() || (!selectedCategory && !customCategory.trim())}
                    className="flex-1 py-2.5 bg-green-600 text-white font-mono text-sm rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
