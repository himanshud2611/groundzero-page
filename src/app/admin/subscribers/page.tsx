'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
  is_active: boolean;
  created_at: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriberStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setSubscribers(subscribers.map(sub =>
        sub.id === id ? { ...sub, is_active: !currentStatus } : sub
      ));
    } catch (error) {
      console.error('Error updating subscriber:', error);
    }
  };

  const exportToCSV = () => {
    const filteredData = getFilteredSubscribers();
    const headers = ['Email', 'Status', 'Source', 'Subscribed At'];
    const rows = filteredData.map(sub => [
      sub.email,
      sub.is_active ? 'Active' : 'Inactive',
      sub.source,
      new Date(sub.subscribed_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getFilteredSubscribers = () => {
    return subscribers.filter(sub => {
      const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && sub.is_active) ||
        (filter === 'inactive' && !sub.is_active);
      return matchesSearch && matchesFilter;
    });
  };

  const filteredSubscribers = getFilteredSubscribers();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-gray-900">Newsletter Subscribers</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">
            {subscribers.length} total subscribers
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-[#5e3535] text-white font-mono text-sm rounded-xl hover:bg-[#4a2a2a] transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf635c]/30"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-mono text-sm rounded-xl transition-colors ${
                filter === f
                  ? 'bg-[#5e3535] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#bf635c] rounded-full animate-spin mx-auto" />
            <p className="font-mono text-sm text-gray-500 mt-4">Loading subscribers...</p>
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-mono text-gray-500">No subscribers found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-mono text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed
                </th>
                <th className="px-6 py-4 text-right font-mono text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSubscribers.map((subscriber, index) => (
                <motion.tr
                  key={subscriber.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm text-gray-900">{subscriber.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-xs font-medium ${
                        subscriber.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {subscriber.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm text-gray-500">{subscriber.source}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm text-gray-500">
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.is_active)}
                      className={`font-mono text-xs px-3 py-1 rounded-lg transition-colors ${
                        subscriber.is_active
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {subscriber.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
