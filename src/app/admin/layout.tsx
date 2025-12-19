'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { adminAuthClient, isAdminEmail } from '@/lib/admin-auth';
import type { User } from '@supabase/supabase-js';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const { data: { session } } = await adminAuthClient.auth.getSession();

      if (!session || !isAdminEmail(session.user.email || '')) {
        router.push('/admin/login');
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = adminAuthClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/admin/login');
      } else if (session && isAdminEmail(session.user.email || '')) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    await adminAuthClient.auth.signOut();
    router.push('/admin/login');
  };

  // Show login page without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#bf635c] via-[#e79c7f] to-[#fcf7d9]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="font-mono text-white/80">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/subscribers', label: 'Subscribers', icon: '📧' },
    { href: '/admin/blogs', label: 'Blog Submissions', icon: '📝' },
    { href: '/admin/signals', label: 'Signals', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#5e3535] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="font-serif text-2xl">GroundZero</h1>
          <p className="font-mono text-xs text-white/60 mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-sm transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="mb-3">
            <p className="font-mono text-xs text-white/60">Signed in as</p>
            <p className="font-mono text-sm text-white truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-mono text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
