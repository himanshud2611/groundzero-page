'use client';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

const paragraphs = [
  "I've been thinking about what work looks like post-AGI. It'll feel less like grinding and more like choosing the problems that actually matter to you. The thing is - researchers and builders are already living this. They're shipping experimental models, breaking paradigms, building tools that change how we work.",
  "But here's what keeps me up: the pace is insane. So much incredible work either gets buried in feeds, never leaves the lab, or just... disappears. The people doing the most interesting things often don't have the bandwidth or platform to show what they're actually building. And that sucks.",
  "So we're building SIGNALS on Ground Zero. It's pretty simple - an open platform for two groups: researchers and builders creating novel work, and founders shipping products that matter. The idea is to give you a space to show the real stuff. Not the polished launch video. Not the marketing deck. The messy parts. The pivots. The \"we tried this and it broke so we did that instead\" moments. The technical tradeoffs nobody talks about because they're too in the weeds.",
  "You keep full ownership of everything. We're not here to take your content and build on it - we're here to help more people see what you're doing. We'll help with technical writing if you want it, feature your work on the Ground Zero page, push it through networks that actually care, and connect you with people working on adjacent problems. The goal is exposure to people who get it, organic connections, and a place where experimental work doesn't get lost.",
  "If you're building something real and want to show it, we want to help."
];

export default function Signals() {
  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-[#0a0a0a] overflow-hidden">
      <Header />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pointer-events-none" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />

      <main className="relative flex-1 w-full pt-32 pb-20 px-6 sm:px-10 md:px-16">
        {/* Content */}
        <motion.article
          className="relative z-10 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title Section */}
          <div className="text-center mb-12">
            <motion.h1
              className="font-serif font-medium text-[48px] sm:text-[56px] md:text-[64px] leading-none tracking-tight text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              SIGNALS
            </motion.h1>
            <motion.p
              className="font-sans text-[20px] sm:text-[22px] md:text-[24px] text-white/50 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Making the Work Visible
            </motion.p>
          </div>

          {/* Body Content */}
          <motion.div
            className="space-y-7 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {paragraphs.map((text, index) => (
              <motion.p
                key={index}
                style={{ textAlignLast: "center"}}
                className={`font-mono font-thin text-[15px] sm:text-[16px] md:text-[17px] leading-[1.8] text-white/80 tracking-tighter text-justify  ${index === paragraphs.length - 1 ? 'pt-3' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </motion.article>
      </main>
    </div>
  );
}
