'use client';

import { motion } from 'framer-motion';

export default function SignalsPage() {
  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif text-2xl md:text-3xl text-gray-900">Signals</h1>
        <p className="font-mono text-sm text-gray-500 mt-1">
          Signals submissions via Tally
        </p>
      </div>

      {/* Tally Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6"
      >
        <div className="flex items-start gap-3 md:gap-4">
          <span className="text-xl md:text-2xl">📊</span>
          <div>
            <h3 className="font-mono font-medium text-blue-800 mb-2 text-sm md:text-base">Managed via Tally</h3>
            <p className="font-mono text-xs md:text-sm text-blue-700 mb-4">
              View and manage all responses in your Tally dashboard.
            </p>
            <a
              href="https://tally.so/forms/pbbyQ8/submissions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-mono text-sm rounded-xl hover:bg-blue-700 transition-colors"
            >
              Open Tally Dashboard →
            </a>
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="https://groundzeroai.in/signals"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <span className="text-2xl mb-3 block">📄</span>
          <h3 className="font-serif text-lg text-gray-900 mb-1">Signals Page</h3>
          <p className="font-mono text-sm text-gray-500">View the public signals page</p>
        </a>
        <a
          href="https://groundzeroai.in/signals/upcoming-guests"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <span className="text-2xl mb-3 block">👥</span>
          <h3 className="font-serif text-lg text-gray-900 mb-1">Upcoming Guests</h3>
          <p className="font-mono text-sm text-gray-500">View upcoming guests page</p>
        </a>
      </div>
    </div>
  );
}
