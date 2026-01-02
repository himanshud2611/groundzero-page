'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with TipTap
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
      <div className="text-gray-400 font-mono text-sm">Loading editor...</div>
    </div>
  ),
});

export default function EmailNewsletterPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const handleSendTest = async () => {
    if (!title.trim() || !content.trim()) {
      setResult({ success: false, message: 'Title and content are required' });
      return;
    }
    if (!testEmail.trim()) {
      setResult({ success: false, message: 'Enter a test email address' });
      return;
    }

    setSendingTest(true);
    setResult(null);

    try {
      const response = await fetch('/api/email-newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle, content, testEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: `Test email sent to ${testEmail}` });
      } else {
        setResult({ success: false, message: data.error || 'Failed to send test email' });
      }
    } catch {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSendingTest(false);
    }
  };

  const handleSend = async () => {
    if (!title.trim() || !content.trim()) {
      setResult({ success: false, message: 'Title and content are required' });
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to send this newsletter to ALL active subscribers?'
    );
    if (!confirmed) return;

    setSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/email-newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
        setTitle('');
        setSubtitle('');
        setContent('');
      } else {
        setResult({ success: false, message: data.error || 'Failed to send newsletter' });
      }
    } catch {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  // Generate preview HTML that matches email template
  const previewHtml = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Georgia, 'Times New Roman', serif;">
      <div style="padding: 40px 24px; background: #faf9f7;">
        <h1 style="color: #1a1a1a; font-size: 28px; margin: 0 0 8px 0; font-weight: 500; line-height: 1.3;">
          ${title || 'Newsletter Title'}
        </h1>
        ${subtitle ? `<p style="color: #666; font-size: 16px; margin: 0 0 28px 0; font-style: italic;">${subtitle}</p>` : '<div style="margin-bottom: 28px;"></div>'}
        <div style="color: #333; font-size: 17px; line-height: 1.75;">
          ${content || '<p style="color: #999;">Your content will appear here...</p>'}
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 40px 0 24px 0;" />
        <div style="text-align: center;">
          <p style="color: #888; font-size: 13px; font-family: 'Courier New', monospace; margin: 0 0 8px 0;">
            Ground Zero — Shaping the Frontier
          </p>
          <p style="color: #888; font-size: 12px; font-family: 'Courier New', monospace; margin: 0;">
            <a href="https://x.com/groundzero_twt" style="color: #bf635c; text-decoration: underline;">Follow us on X/Twitter</a>
          </p>
        </div>
      </div>
    </div>
  `;

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-gray-900">Send Newsletter</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">
            Compose and send to all active subscribers
          </p>
        </div>
        <Link
          href="/admin/newsletter-history"
          className="px-4 py-2 bg-gray-100 text-gray-700 font-mono text-sm rounded-xl hover:bg-gray-200 transition-colors"
        >
          View History
        </Link>
      </div>

      {/* Result Message */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl font-mono text-sm ${
            result.success
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {result.message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Editor Column */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Weekly AI Roundup"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-serif text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf635c]/30"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
              Subtitle (optional)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="The latest in AI research and development"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf635c]/30"
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
              Content *
            </label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your newsletter content here..."
            />
          </div>

          {/* Test Email Section */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label className="block font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
              Send Test Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf635c]/30"
              />
              <button
                onClick={handleSendTest}
                disabled={sendingTest || !title.trim() || !content.trim() || !testEmail.trim()}
                className="px-4 py-2 bg-gray-700 text-white font-mono text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {sendingTest ? 'Sending...' : 'Send Test'}
              </button>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={sending || !title.trim() || !content.trim()}
            className="w-full px-4 py-3 bg-[#5e3535] text-white font-mono text-sm rounded-xl hover:bg-[#4a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending to All Subscribers...' : 'Send to All Subscribers'}
          </button>
        </div>

        {/* Preview Column */}
        <div className="xl:sticky xl:top-8 xl:self-start">
          {/* Mobile Tabs */}
          <div className="flex gap-2 mb-4 xl:hidden">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-2 font-mono text-sm rounded-lg transition-colors ${
                activeTab === 'edit'
                  ? 'bg-[#5e3535] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 font-mono text-sm rounded-lg transition-colors ${
                activeTab === 'preview'
                  ? 'bg-[#5e3535] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Preview
            </button>
          </div>

          <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} xl:block`}>
            <label className="block font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
              Email Preview
            </label>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 font-mono text-xs text-gray-500">Email Preview</span>
                </div>
              </div>
              <div
                className="max-h-[600px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
