'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createAdminServerClient } from '@/lib/admin-auth';

interface Campaign {
  id: string;
  title: string;
  subtitle: string | null;
  subject: string;
  sent_at: string;
  total_recipients: number;
  successful_sends: number;
  failed_sends: number;
  is_test: boolean;
  test_email: string | null;
}

interface Send {
  id: string;
  email: string;
  status: 'success' | 'failed';
  sent_at: string;
  error_message: string | null;
}

export default function NewsletterHistoryPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [sends, setSends] = useState<Send[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSends, setLoadingSends] = useState(false);
  const [showTestEmails, setShowTestEmails] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, [showTestEmails]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/newsletter-history');
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      const data = await response.json();
      setCampaigns(
        showTestEmails
          ? data.campaigns
          : data.campaigns.filter((c: Campaign) => !c.is_test)
      );
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSends = async (campaignId: string) => {
    setLoadingSends(true);
    try {
      const response = await fetch(`/api/newsletter-history/${campaignId}`);
      if (!response.ok) throw new Error('Failed to fetch sends');
      const data = await response.json();
      setSends(data.sends);
    } catch (error) {
      console.error('Error fetching sends:', error);
    } finally {
      setLoadingSends(false);
    }
  };

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    fetchSends(campaign.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSuccessRate = (campaign: Campaign) => {
    if (campaign.total_recipients === 0) return 0;
    return Math.round((campaign.successful_sends / campaign.total_recipients) * 100);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-gray-900">Newsletter History</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">
            View all sent newsletters and their delivery status
          </p>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-mono text-sm cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showTestEmails}
              onChange={(e) => setShowTestEmails(e.target.checked)}
              className="w-4 h-4"
            />
            Show test emails
          </label>
          <Link
            href="/admin/email-newsletter"
            className="px-4 py-2 bg-[#bf635c] text-white font-mono text-sm rounded-xl hover:bg-[#a85550] transition-colors"
          >
            Send Newsletter
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaigns List */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-mono text-sm font-semibold text-gray-900">
              All Campaigns ({campaigns.length})
            </h2>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {loading ? (
              <div className="p-8 text-center text-gray-500 font-mono text-sm">
                Loading campaigns...
              </div>
            ) : campaigns.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-mono text-sm">
                No campaigns found
              </div>
            ) : (
              campaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  onClick={() => handleCampaignClick(campaign)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedCampaign?.id === campaign.id
                      ? 'bg-[#bf635c]/5 border-l-4 border-l-[#bf635c]'
                      : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-base text-gray-900 truncate">
                          {campaign.title}
                        </h3>
                        {campaign.is_test && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-mono text-xs rounded">
                            TEST
                          </span>
                        )}
                      </div>
                      {campaign.subtitle && (
                        <p className="font-mono text-xs text-gray-600 mb-2 truncate">
                          {campaign.subtitle}
                        </p>
                      )}
                      <p className="font-mono text-xs text-gray-500">
                        {formatDate(campaign.sent_at)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="font-mono text-xs text-gray-900">
                        {campaign.successful_sends}/{campaign.total_recipients}
                      </div>
                      <div
                        className={`px-2 py-0.5 rounded font-mono text-xs ${
                          getSuccessRate(campaign) === 100
                            ? 'bg-green-100 text-green-700'
                            : getSuccessRate(campaign) >= 90
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {getSuccessRate(campaign)}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {selectedCampaign ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-lg text-gray-900 mb-1">
                      {selectedCampaign.title}
                    </h2>
                    {selectedCampaign.subtitle && (
                      <p className="font-mono text-sm text-gray-600 mb-2">
                        {selectedCampaign.subtitle}
                      </p>
                    )}
                    <p className="font-mono text-xs text-gray-500">
                      Sent: {formatDate(selectedCampaign.sent_at)}
                    </p>
                    {selectedCampaign.is_test && selectedCampaign.test_email && (
                      <p className="font-mono text-xs text-blue-600 mt-1">
                        Test email sent to: {selectedCampaign.test_email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-mono text-xs text-gray-500 mb-1">Total</div>
                    <div className="font-mono text-xl text-gray-900">
                      {selectedCampaign.total_recipients}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-mono text-xs text-gray-500 mb-1">Success</div>
                    <div className="font-mono text-xl text-green-600">
                      {selectedCampaign.successful_sends}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-mono text-xs text-gray-500 mb-1">Failed</div>
                    <div className="font-mono text-xl text-red-600">
                      {selectedCampaign.failed_sends}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                {loadingSends ? (
                  <div className="p-8 text-center text-gray-500 font-mono text-sm">
                    Loading recipients...
                  </div>
                ) : sends.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 font-mono text-sm">
                    No sends found
                  </div>
                ) : (
                  sends.map((send) => (
                    <div
                      key={send.id}
                      className="p-4 border-b border-gray-100 flex items-start justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-gray-900 mb-1 truncate">
                          {send.email}
                        </p>
                        <p className="font-mono text-xs text-gray-500">
                          {formatDate(send.sent_at)}
                        </p>
                        {send.error_message && (
                          <p className="font-mono text-xs text-red-600 mt-1">
                            Error: {send.error_message}
                          </p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 rounded font-mono text-xs shrink-0 ${
                          send.status === 'success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {send.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="font-mono text-sm text-gray-500">
                  Select a campaign to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
