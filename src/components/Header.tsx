import React from 'react';
import Image from 'next/image';

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
            <div className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="Ground Zero Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center justify-center gap-2.5 font-mono text-lg text-white/85 tracking-tighter font-thin`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
