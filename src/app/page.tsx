import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-white overflow-hidden">
      <Header />

      <main className="relative flex-1 flex items-center justify-center w-full overflow-hidden">
        {/* SVG Filter Definition */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="figmaNoiseFilter" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feTurbulence type="fractalNoise" baseFrequency="1.2" stitchTiles="stitch" numOctaves="4" result="noise" seed="2400"/>
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
            </feComponentTransfer>
            <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"/>
            <feFlood floodColor="rgba(143, 44, 31, 0.2)" result="color1Flood"/>
            <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
            <feMerge>
              <feMergeNode in="shape"/>
              <feMergeNode in="color1"/>
            </feMerge>
          </filter>
        </svg>

        {/* Background with gradient and images */}
        <div
          className="absolute inset-0 bg-linear-to-b from-[#bf635c] via-[#e79c7f] via-60% to-[#fcf7d9] overflow-hidden"
          style={{ filter: 'url(#figmaNoiseFilter)' }}
        >

          {/* Cloud images - centered */}
          <div className="absolute -left-1/5 -bottom-32 w-[1038px] h-[461px] 2xl:scale-150 opacity-90">
            <Image
              src="/clouds.png"
              alt=""
              fill
              className="object-cover object-center pointer-events-none"
            />
          </div>
          <div className="absolute -right-1/5 -bottom-32 w-[1038px] h-[461px] 2xl:scale-150 opacity-90">
            <Image
              src="/clouds.png"
              alt=""
              fill
              className="object-cover object-center pointer-events-none"
            />
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center gap-12 pt-0 pb-20">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <h1 className="flex flex-col items-center gap-px font-serif text-[68px] leading-18 tracking-tighter">
              <span className="w-max text-white">
                Exploring the ideas and breakthroughs
              </span>
              <span className="w-max text-white/85">
                shaping the future of AI and tech
              </span>
            </h1>
            <p className="max-w-[620px]  font-mono font-normal text-lg leading-normal text-white/65 tracking-tight">
              Your friendly neighborhood space exploring AI/ML and tech, with occasional notes, conversations, and summaries.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            {/* Youtube/Primary Button */}
            <button className="relative flex items-center justify-center h-12 w-max px-6 gap-4 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]">
              <span className="font-mono font-medium text-xl leading-normal text-[#5e3535] tracking-tight">
                Youtube
              </span>
              <Image
                src="/youtube-logo.svg"
                alt="Twitter"
                width={28}
                height={28}
                className="object-contain opacity-80"
              />
            </button>

            {/* Twitter/X Button */}
            <button className="relative flex items-center justify-center h-12 w-17 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]">
              <Image
                src="/twitter-logo.svg"
                alt="Twitter"
                width={28}
                height={28}
                className="object-contain opacity-80"
              />
            </button>

            {/* Discord Button */}
            <button className="relative flex items-center justify-center h-12 w-17 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]">
              <Image
                src="/discord-logo.svg"
                alt="Discord"
                width={32}
                height={32}
                className="object-contain opacity-80"
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
