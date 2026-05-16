'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const DESKTOP_METEOR_COUNT = 20;
const MOBILE_METEOR_COUNT = 6;

const meteorTimings = Array.from({ length: DESKTOP_METEOR_COUNT }, () => ({
  duration: 2 + Math.random() * 2,
  repeatDelay: 3 + Math.random() * 5,
}));

export default function HeroBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const cloudLeftX = useSpring(mouseX, springConfig);
  const cloudLeftY = useSpring(mouseY, springConfig);

  const mouseXInverted = useMotionValue(0);
  const mouseYInverted = useMotionValue(0);
  const cloudRightX = useSpring(mouseXInverted, { damping: 30, stiffness: 80 });
  const cloudRightY = useSpring(mouseYInverted, { damping: 30, stiffness: 80 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = ((clientX / innerWidth) - 0.5) * 15;
    const y = ((clientY / innerHeight) - 0.5) * 15;

    mouseX.set(x);
    mouseY.set(y);

    mouseXInverted.set(-x * 1.2);
    mouseYInverted.set(-y * 1.2);
  };

  const meteorCount = isMobile ? MOBILE_METEOR_COUNT : DESKTOP_METEOR_COUNT;
  const meteorTravel = isMobile ? 120 : 300;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
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
        style={{ filter: 'url(#figmaNoiseFilter)', WebkitFilter: 'url(#figmaNoiseFilter)' }}
      >
        {/* Cloud images — scaled down on mobile, parallax only on desktop */}
        <motion.div
          className="absolute -left-1/5 -bottom-20 md:-bottom-32 w-[520px] h-[230px] md:w-[1038px] md:h-[461px] 2xl:scale-150 opacity-90"
          style={{
            x: isMobile ? 0 : cloudLeftX,
            y: isMobile ? 0 : cloudLeftY,
          }}
          {...(isMobile && {
            animate: { x: [0, 3, 0] },
            transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          })}
        >
          <Image
            src="/clouds.png"
            alt=""
            fill
            className="object-cover object-center pointer-events-none"
          />
        </motion.div>
        <motion.div
          className="absolute -right-1/5 -bottom-20 md:-bottom-32 w-[520px] h-[230px] md:w-[1038px] md:h-[461px] 2xl:scale-150 opacity-90"
          style={{
            x: isMobile ? 0 : cloudRightX,
            y: isMobile ? 0 : cloudRightY,
          }}
          animate={{
            x: [0, isMobile ? -3 : -5, 0],
          }}
          transition={{
            duration: isMobile ? 12 : 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/clouds.png"
            alt=""
            fill
            className="object-cover object-center pointer-events-none"
          />
        </motion.div>

        {/* Meteor shower effect — fewer & shorter on mobile */}
        {meteorTimings.slice(0, meteorCount).map((timing, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 bg-linear-to-b from-white/60 to-transparent rounded-full h-[30px] md:h-[60px]"
            style={{
              left: `${10 + i * (isMobile ? 16 : 12)}%`,
              top: `-10%`,
              rotate: -225,
            }}
            animate={{
              x: [0, meteorTravel],
              y: [0, meteorTravel],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: timing.duration,
              repeat: Infinity,
              repeatDelay: timing.repeatDelay,
              ease: 'easeIn',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    </div>
  );
}
