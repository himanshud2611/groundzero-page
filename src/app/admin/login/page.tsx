'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { adminAuthClient, isAdminEmail } from '@/lib/admin-auth';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if email is in admin whitelist
    if (!isAdminEmail(email)) {
      setError('Access denied. You are not authorized to access the admin panel.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await adminAuthClient.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#bf635c] via-[#e79c7f] to-[#fcf7d9]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-black/10 shadow-2xl p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-[#5e3535] mb-2">GroundZero</h1>
            <p className="font-mono text-sm text-[#5e3535]/60">Admin Panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl"
            >
              <p className="font-mono text-sm text-red-600">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-mono text-sm text-[#5e3535]/80 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/80 border border-black/20 rounded-xl font-mono text-[#5e3535] placeholder-[#5e3535]/40 focus:outline-none focus:ring-2 focus:ring-[#bf635c]/50 focus:border-transparent transition-all"
                placeholder="admin@groundzero.ai"
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-[#5e3535]/80 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/80 border border-black/20 rounded-xl font-mono text-[#5e3535] placeholder-[#5e3535]/40 focus:outline-none focus:ring-2 focus:ring-[#bf635c]/50 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5e3535] text-white font-mono font-medium rounded-xl hover:bg-[#4a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center font-mono text-xs text-[#5e3535]/50">
            Access restricted to authorized administrators only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
