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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={item}>
          <h1 className="font-serif text-2xl lg:text-3xl text-white/90 tracking-tight">Blog Submissions</h1>
          <p className="font-mono text-sm text-white/30 mt-1">Review and manage community blog submissions</p>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item} className="flex flex-wrap gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => {
            const count = f === 'all' ? blogs.length : blogs.filter(b => b.status === f).length;
            const isActive = filter === f;

            let dotColor = 'bg-white/20';
            if (f === 'pending') dotColor = 'bg-amber-500';
            if (f === 'approved') dotColor = 'bg-emerald-500';
            if (f === 'rejected') dotColor = 'bg-red-400';

            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 font-mono text-xs rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'bg-[#1a1a1a] text-white/40 border border-white/5 hover:text-white/60 hover:border-white/10'
                }`}
              >
                {f !== 'all' && <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
                <span className="capitalize">{f}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/10 text-white/70' : 'bg-white/5 text-white/30'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        {loading ? (
          <motion.div variants={item} className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#e79c7f] rounded-full animate-spin" />
            <p className="font-mono text-sm text-white/30 mt-4">Loading submissions...</p>
          </motion.div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div variants={item} className="text-center py-20 rounded-2xl bg-[#1a1a1a] border border-white/5">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="font-mono text-sm text-white/40">No {filter === 'all' ? '' : filter} submissions found</p>
          </motion.div>
        ) : (
          <motion.div
            variants={item}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className="group rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-white/10 transition-all duration-200 flex flex-col"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider ${
                      blog.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-400'
                        : blog.status === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${
                        blog.status === 'pending' ? 'bg-amber-400' : blog.status === 'approved' ? 'bg-emerald-400' : 'bg-red-400'
                      }`} />
                      {blog.status}
                    </span>
                    <span className="font-mono text-[10px] text-white/20">{formatDate(blog.submitted_at)}</span>
                  </div>

                  <h3 className="font-serif text-base text-white/90 leading-snug line-clamp-2 min-h-[2.5rem]">
                    {blog.title || <span className="text-white/25 italic">Untitled submission</span>}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Category */}
                  {blog.category && (
                    <span className="inline-block w-fit px-2 py-0.5 rounded font-mono text-[10px] bg-violet-500/10 text-violet-400 mb-3">
                      {blog.category}
                    </span>
                  )}

                  {/* Links */}
                  <div className="space-y-2 mb-4">
                    <a
                      href={blog.blog_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-[11px] text-white/40 hover:text-[#e79c7f] transition-colors group/link"
                    >
                      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                      </svg>
                      <span className="truncate group-hover/link:underline">{blog.blog_link.replace(/^https?:\/\//, '').slice(0, 35)}...</span>
                    </a>

                    <a
                      href={blog.profile_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-[11px] text-white/50 hover:text-white/80 transition-colors"
                    >
                      <Image src="/twitter-logo.svg" alt="X" width={10} height={10} className="opacity-50" />
                      <span>{extractHandle(blog.profile_link)}</span>
                    </a>
                  </div>

                  {/* Actions - pushed to bottom */}
                  <div className="mt-auto flex gap-2">
                    {blog.status === 'pending' && (
                      <>
                        <button
                          onClick={() => openApprovalModal(blog)}
                          className="flex-1 py-2 bg-emerald-500/10 text-emerald-400 font-mono text-[11px] rounded-lg hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(blog.id)}
                          className="flex-1 py-2 bg-red-500/10 text-red-400 font-mono text-[11px] rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </>
                    )}

                    {blog.status === 'approved' && (
                      <button
                        onClick={() => handleReject(blog.id)}
                        className="w-full py-2 bg-white/5 text-white/40 font-mono text-[11px] rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    )}

                    {blog.status === 'rejected' && (
                      <button
                        onClick={() => openApprovalModal(blog)}
                        className="w-full py-2 bg-white/5 text-white/40 font-mono text-[11px] rounded-lg hover:bg-white/10 hover:text-white/60 transition-colors"
                      >
                        Review Again
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Approval Modal */}
      <AnimatePresence>
        {approvalModal.isOpen && approvalModal.blog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={closeApprovalModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg p-6"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-white/90">Approve Blog</h2>
                    <p className="font-mono text-xs text-white/40">Set title and category before approving</p>
                  </div>
                </div>

                {/* Blog Info */}
                <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Image src="/twitter-logo.svg" alt="X" width={12} height={12} className="opacity-50" />
                    <span className="font-mono text-sm text-white/60">{extractHandle(approvalModal.blog.profile_link)}</span>
                  </div>
                  <a
                    href={approvalModal.blog.blog_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#e79c7f] hover:underline truncate block"
                  >
                    {approvalModal.blog.blog_link}
                  </a>
                </div>

                {/* Title Input */}
                <div className="mb-6">
                  <label className="block font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    placeholder="Enter blog title..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#e79c7f]/50 focus:ring-1 focus:ring-[#e79c7f]/20 transition-all"
                  />
                </div>

                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                    Category
                  </label>

                  {!showCustomInput ? (
                    <>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                              selectedCategory === cat
                                ? 'bg-[#e79c7f]/20 text-[#e79c7f] border border-[#e79c7f]/30'
                                : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60 hover:border-white/10'
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
                        className="font-mono text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new category
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter new category..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#e79c7f]/50 focus:ring-1 focus:ring-[#e79c7f]/20 transition-all"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          setShowCustomInput(false);
                          setCustomCategory('');
                        }}
                        className="font-mono text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to existing categories
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={closeApprovalModal}
                    className="flex-1 py-3 font-mono text-sm text-white/40 hover:text-white/60 hover:bg-white/5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={!editableTitle.trim() || (!selectedCategory && !customCategory.trim())}
                    className="flex-1 py-3 bg-emerald-500 text-white font-mono text-sm rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
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
