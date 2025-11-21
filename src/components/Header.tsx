'use client';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'Signals', href: '/signals' },
  { label: 'Podcasts', href: '/podcasts' },
  { label: 'Spotlights', href: '/spotlights' },
  { label: 'Partner', href: '/partner' },
];

export default function Header() {
  return (
    <header className="absolute left-0 top-0 w-full h-20 md:h-[90px] flex items-center px-[18px] md:px-16 py-3 md:py-6 z-10">
      <nav className="w-full flex items-center justify-between md:justify-center md:gap-10 p-1.5">
        <Link href="/" className="relative size-7 md:size-8 shrink-0">
          <Image
            src="/logo.svg"
            alt="Ground Zero Logo"
            fill
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-4 md:hidden overflow-x-auto whitespace-nowrap pl-4 pr-1 py-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative font-mono text-[13px] text-white/85 tracking-[-0.5px] font-medium"
            >
              {item.label}
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
              <span className="absolute bottom-0 left-0 h-0.5 bg-white/90 w-0 group-hover:w-1/2 transition-all duration-300 ease-out" />

              {/* Right line that grows from right */}
              <span className="absolute bottom-0 right-0 h-0.5 bg-white/90 w-0 group-hover:w-1/2 transition-all duration-300 ease-out" />

              {/* Subtle glow behind text */}
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-sm blur-sm -z-10 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
