'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Placeholder for Signals - will be connected to Supabase later
// TODO: Create signals table in Supabase and connect

interface Signal {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  created_at: string;
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNew = () => {
    setEditingSignal(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setShowEditor(true);
  };

  const handleEdit = (signal: Signal) => {
    setEditingSignal(signal);
    setTitle(signal.title);
    setExcerpt(signal.excerpt);
    setContent(signal.content);
    setShowEditor(true);
  };

  const handleSave = () => {
    // TODO: Save to Supabase
    const newSignal: Signal = {
      id: editingSignal?.id || Date.now().toString(),
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      excerpt,
      content,
      status: 'draft',
      created_at: new Date().toISOString(),
    };

    if (editingSignal) {
      setSignals(signals.map(s => s.id === editingSignal.id ? newSignal : s));
    } else {
      setSignals([newSignal, ...signals]);
    }

    setShowEditor(false);
    setEditingSignal(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-gray-900">Signals</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">
            Create and manage signal articles
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-[#5e3535] text-white font-mono text-sm rounded-xl hover:bg-[#4a2a2a] transition-colors flex items-center gap-2"
        >
          <span>+</span> New Signal
        </button>
      </div>

      {/* Setup Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-start gap-4">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-mono font-medium text-amber-800 mb-2">Setup Required</h3>
            <p className="font-mono text-sm text-amber-700 mb-4">
              To use Signals, create a <code className="bg-amber-100 px-2 py-0.5 rounded">signals</code> table in your Supabase project with the following schema:
            </p>
            <pre className="bg-amber-100 p-4 rounded-xl font-mono text-xs text-amber-800 overflow-x-auto">
{`CREATE TABLE signals (
  id TEXT PRIMARY KEY DEFAULT lower(substr(md5(random()::text), 1, 10)),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`}
            </pre>
          </div>
        </div>
      </motion.div>

      {/* Editor Modal */}
      {showEditor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-serif text-xl text-gray-900">
                {editingSignal ? 'Edit Signal' : 'New Signal'}
              </h2>
              <button
                onClick={() => setShowEditor(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-sm text-gray-600 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter signal title..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#bf635c]/30"
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm text-gray-600 mb-2">Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description..."
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#bf635c]/30 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm text-gray-600 mb-2">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your signal content here... (Markdown supported)"
                    rows={12}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#bf635c]/30 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 font-mono text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#5e3535] text-white font-mono text-sm rounded-xl hover:bg-[#4a2a2a] transition-colors"
              >
                Save Draft
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Signals List */}
      {signals.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <span className="text-4xl mb-4 block">⚡</span>
          <h3 className="font-serif text-xl text-gray-900 mb-2">No signals yet</h3>
          <p className="font-mono text-sm text-gray-500 mb-6">
            Create your first signal to get started
          </p>
          <button
            onClick={handleCreateNew}
            className="px-6 py-3 bg-[#5e3535] text-white font-mono text-sm rounded-xl hover:bg-[#4a2a2a] transition-colors"
          >
            Create Signal
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-serif text-lg text-gray-900">{signal.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full font-mono text-xs ${
                      signal.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {signal.status}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-gray-500 mb-2">{signal.excerpt}</p>
                  <p className="font-mono text-xs text-gray-400">
                    Created: {new Date(signal.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(signal)}
                    className="px-3 py-1 font-mono text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
