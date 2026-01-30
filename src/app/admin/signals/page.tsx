'use client';

import { motion } from 'framer-motion';

export default function SignalsPage() {
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
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div variants={item}>
          <h1 className="font-serif text-2xl lg:text-3xl text-white/90 tracking-tight">Signals</h1>
          <p className="font-mono text-sm text-white/30 mt-1">Signals submissions via Tally</p>
        </motion.div>

        {/* Tally Info Card */}
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/10 p-6 lg:p-8"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-mono text-base text-white/90 mb-2">Managed via Tally</h3>
              <p className="font-mono text-sm text-white/40 mb-5">
                View and manage all Signals responses in your Tally dashboard.
              </p>
              <a
                href="https://tally.so/forms/pbbyQ8/submissions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500 text-white font-mono text-sm rounded-xl hover:bg-violet-600 transition-colors"
              >
                Open Tally Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-gradient-to-b from-[#bf635c] to-[#e79c7f] rounded-full" />
            <h2 className="font-mono text-xs text-white/50 uppercase tracking-wider">Quick Links</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.a
              href="/signals"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-white/10 p-5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white/40 group-hover:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-serif text-base text-white/90 mb-1 group-hover:text-white transition-colors">Signals Page</h3>
              <p className="font-mono text-xs text-white/30">View the public signals page</p>
            </motion.a>

            <motion.a
              href="/signals/upcoming-guests"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-white/10 p-5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white/40 group-hover:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-base text-white/90 mb-1 group-hover:text-white transition-colors">Upcoming Guests</h3>
              <p className="font-mono text-xs text-white/30">View upcoming guests page</p>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
