'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'Blogs', href: '/blogs' },
  { label: 'Signals', href: '/signals' },
  { label: 'Podcasts', href: '/podcasts' },
  { label: 'Partner', href: '/partner' },
];

export default function Header() {
  return (
    <header className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-7xl h-[90px] flex items-center justify-center px-16 py-6 z-10">
      <nav className="flex items-center justify-center gap-10 p-2.5">
        <div className="flex items-start gap-14">
          <div className="flex items-center justify-center gap-2.5">
            <Link href="/" className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="Ground Zero Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative flex items-center justify-center gap-2.5 font-mono text-md text-white/85 tracking-tighter font-thin pb-1 group"
          >
            <span className="group-hover:text-white transition-colors duration-200">
              {item.label}
            </span>

            {/* Left line that grows from left */}
            <span className="absolute bottom-0 left-0 h-[2px] bg-white/90 w-0 group-hover:w-1/2 transition-all duration-300 ease-out" />

            {/* Right line that grows from right */}
            <span className="absolute bottom-0 right-0 h-[2px] bg-white/90 w-0 group-hover:w-1/2 transition-all duration-300 ease-out" />

            {/* Subtle glow behind text */}
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-sm blur-sm -z-10 transition-all duration-200" />
          </Link>
        ))}
      </nav>
    </header>
  );
}
