'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'Spotlights', href: '/spotlights' },
  { label: 'Signals', href: '/signals' },
  { label: 'Pods', href: '/podcasts' },
  { label: 'Partner', href: '/partner' },
];

export default function Header() {
  return (
    <header className="absolute left-0 top-0 w-full h-[90px] md:h-[90px] flex items-center justify-center md:justify-center px-[18px] md:px-16 py-3 md:py-6 z-10">
      <nav className="w-full flex items-center justify-between md:justify-center md:gap-10 p-2.5">
        <div className="flex items-start gap-14">
          <div className="flex items-center justify-center gap-2.5">
            <Link href="/" className="relative size-6 md:size-7">
              <Image
                src="/logo.svg"
                alt="Ground Zero Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-[18px] md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex items-center justify-center gap-2.5 font-mono text-[14px] text-white/85 tracking-[-0.7px] font-medium pb-1"
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-10">
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
        </div>
      </nav>
    </header>
  );
}
