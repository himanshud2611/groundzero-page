'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { adminAuthClient, isAdminEmail } from '@/lib/admin-auth';
import type { User } from '@supabase/supabase-js';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#2d2222] to-[#1a1a1a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#e79c7f]/20 border-t-[#e79c7f] rounded-full animate-spin" />
          <p className="font-mono text-sm text-white/40 tracking-wide">Loading</p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      )
    },
    {
      href: '/admin/blogs',
      label: 'Blog Submissions',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    },
    {
      href: '/admin/signals',
      label: 'Signals',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#161616] border-b border-white/5 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="GroundZero"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-serif text-base text-white/90">GroundZero</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#161616] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="GroundZero"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <h1 className="font-serif text-lg text-white/90 leading-none">GroundZero</h1>
              <p className="font-mono text-[10px] text-white/30 mt-0.5 tracking-widest uppercase">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setSidebarOpen(false)}>
                    <motion.div
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-[13px] transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#bf635c]/20 to-transparent text-white border-l-2 border-[#e79c7f]'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <span className={isActive ? 'text-[#e79c7f]' : ''}>{item.icon}</span>
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
              <span className="font-mono text-xs text-white/60 uppercase">
                {user?.email?.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[11px] text-white/30 uppercase tracking-wider">Signed in</p>
              <p className="font-mono text-xs text-white/60 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg font-mono text-xs text-white/50 hover:text-white/70 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
