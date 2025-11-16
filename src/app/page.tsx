'use client';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-white overflow-hidden">
      <Header />

      <main
        className="relative flex-1 flex items-center justify-center w-full overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #bf635c 0%, #e79c7f 60%, #fcf7d9 100%)' }}
      >
        <HeroBackground />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 pt-0 pb-20 md:pb-20 px-4 md:px-0">
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
            <h1 className="flex flex-col items-center gap-px font-serif text-[56px] md:text-[68px] leading-14 md:leading-18 tracking-[-3.92px] md:tracking-tighter">
              <motion.span
                className="w-full max-w-[342px] md:w-max md:max-w-none text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Shaping the frontier while 
              </motion.span>
              <motion.span
                className="w-full max-w-[342px] md:w-max md:max-w-none text-white/85"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              >
                exploring ideas <span className='md:hidden'><br /></span> and intelligence
              </motion.span>
            </h1>
            <motion.p
              className="w-full max-w-[337px] md:max-w-[620px] px-0 font-mono font-normal text-[14px] md:text-lg leading-normal md:leading-normal text-white/65 tracking-[-0.84px] md:tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              Your friendly neighborhood creative space shaping the frontier of tech, with occasional conversations and notes.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-row items-start gap-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Youtube/Primary Button */}
            <a href="https://www.youtube.com/@Ground_ZeroYT" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="relative flex items-center justify-center h-10 md:h-12 w-max px-[22px] md:px-6 gap-2.5 md:gap-4 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] cursor-pointer"
                whileHover={{
                  scale: 1.01,
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0px 4px 4px 0px rgba(255, 255, 255, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <span className="relative font-mono font-medium text-[16px] md:text-xl leading-normal text-[#5e3535] tracking-[-0.8px] md:tracking-tight">
                  Youtube
                </span>
                <Image
                  src="/youtube-logo.svg"
                  alt="Youtube"
                  width={22}
                  height={22}
                  className="relative object-contain opacity-80 md:w-7 md:h-7"
                />
              </motion.button>
            </a>

            {/* Twitter/X Button */}
            <a href="https://x.com/groundzero_twt" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="relative flex items-center justify-center h-10 md:h-12 w-[42px] md:w-17 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] cursor-pointer"
                whileHover={{
                  scale: 1.01,
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0px 4px 4px 0px rgba(255, 255, 255, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Image
                  src="/twitter-logo.svg"
                  alt="Twitter"
                  width={22}
                  height={22}
                  className="relative object-contain opacity-80 md:w-7 md:h-7"
                />
              </motion.button>
            </a>

            {/* Discord Button */}
            <a href="https://discord.gg/aChCV3cbyn" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="relative flex items-center justify-center h-10 md:h-12 w-11 md:w-17 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] cursor-pointer"
                whileHover={{
                  scale: 1.01,
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0px 4px 4px 0px rgba(255, 255, 255, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Image
                  src="/discord-logo.svg"
                  alt="Discord"
                  width={24}
                  height={24}
                  className="relative object-contain opacity-80 md:w-8 md:h-8"
                />
              </motion.button>
            </a>

            {/* Instagram Button */}
            <a href="https://instagram.com/groundzero_ig" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="relative flex items-center justify-center h-10 md:h-12 w-[42px] md:w-17 bg-white/57 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] cursor-pointer"
                whileHover={{
                  scale: 1.01,
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0px 4px 4px 0px rgba(255, 255, 255, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Image
                  src="/instagram-logo.svg"
                  alt="Instagram"
                  width={22}
                  height={22}
                  className="relative object-contain opacity-80 md:size-6"
                />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </main>
      <Footer fixed color="text-[#C88367]/60" />
    </div>
  );
}
