'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import Image from 'next/image';

// Generate random values for meteors outside component
const meteorTimings = Array.from({ length: 20 }, () => ({
  duration: 2 + Math.random() * 2,
  repeatDelay: 3 + Math.random() * 5,
}));

export default function Partner() {
  const [copied, setCopied] = useState(false);
  const email = 'ground0ai.lab@gmail.com';

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
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = ((clientX / innerWidth) - 0.5) * 15;
    const y = ((clientY / innerHeight) - 0.5) * 15;

    mouseX.set(x);
    mouseY.set(y);

    mouseXInverted.set(-x * 1.2);
    mouseYInverted.set(-y * 1.2);
  };

  const handleCopyEmail = async () => {
    try {
      // Fallback for older browsers
      if (!navigator.clipboard) {
        // Use the older execCommand method
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Try fallback method even if clipboard API exists but fails
      try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy also failed:', fallbackErr);
      }
    }
  };

  return (
    <div
      className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1e3a5f]"
      onMouseMove={handleMouseMove}
    >
      {/* Main gradient background - lighter, more vibrant blue */}
      <div className="absolute inset-0 bg-linear-to-br from-[#1e3a5f] via-[#2d5a8f] to-[#4a7bb7]" />

      {/* Background with noise */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.67' numOctaves='3' stitchTiles='stitch' seed='2400'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Cloud images with parallax */}
      <motion.div
        className="absolute -left-1/5 -bottom-44 md:-bottom-32 w-[1038px] h-[461px] 2xl:scale-150 opacity-25"
        style={{
          x: cloudLeftX,
          y: cloudLeftY,
        }}
      >
        <Image
          src="/clouds.png"
          alt=""
          fill
          className="object-cover object-center pointer-events-none"
        />
      </motion.div>
      <motion.div
        className="absolute -right-1/5 -bottom-44 md:-bottom-32 w-[1038px] h-[461px] 2xl:scale-150 opacity-25"
        style={{
          x: cloudRightX,
          y: cloudRightY,
        }}
        animate={{
          x: [0, -5, 0],
        }}
        transition={{
          duration: 8,
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

      {/* Meteor shower effect */}
      {meteorTimings.map((timing, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-[60px] bg-linear-to-b from-white/60 to-transparent rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `-10%`,
            rotate: -225,
          }}
          animate={{
            x: [0, 300],
            y: [0, 300],
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

      <Header />

      <main className="relative flex-1 w-full pt-32 pb-24 px-5 sm:px-10 md:px-16">
        <motion.article
          className="relative z-10 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-[40px] md:text-[52px] leading-none tracking-[-0.4px] md:tracking-[-1.2px] text-white">
              Partner with us
            </h1>
          </motion.div>

          {/* Content Container */}
          <motion.div
            className="max-w-[800px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Text Content */}
            <div className="bg-white/[0.05] backdrop-blur-xl px-5 md:px-12 py-8 md:py-12 border border-white/20">
              <p className="font-mono font-normal text-[15px] md:text-[18px] leading-relaxed md:leading-relaxed tracking-tight text-white/80 text-justify">
                We&apos;re building Ground Zero for researchers, builders, and founders doing amazing work. If you're a startup or brand that wants to collaborate or support what we're creating here, reach out. We're open to partnerships and creating values for each other.
              </p>

              <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-white/8">
                <p className="font-mono font-normal text-[15px] md:text-[16px] leading-normal tracking-[-1.02px] text-white/60 mb-4 md:mb-5">
                  Email
                </p>
                <div className="flex items-center gap-3 flex-row">
                  <a
                    href={`mailto:${email}`}
                    className="font-mono font-normal text-[15px] md:text-[18px] text-white/90 hover:text-white transition-colors duration-200"
                  >
                    {email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 font-mono cursor-pointer text-[13px] md:text-[14px] text-white/50 hover:text-white/80 transition-all duration-200 ml-2 px-3 py-1.5"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="shrink-0" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="shrink-0" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.article>
      </main>
    </div>
  );
}
