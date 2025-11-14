'use client';
import { useEffect } from 'react';
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
  useEffect(() => {
    // Load Tally script
    const script = document.createElement('script');
    script.innerHTML = `var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}`;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-[#141414] overflow-hidden">
      <Header />

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1816] via-[#141414] to-[#161412] opacity-60 pointer-events-none" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20 pointer-events-none" />

      {/* Fine grain texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />

      <main className="relative flex-1 w-full pt-32 pb-24 px-6 sm:px-10 md:px-16">
        {/* Content */}
        <motion.article
          className="relative z-10 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title Section */}
          <div className="text-left mb-12">
            <motion.h1
              className="font-mono font-normal text-center text-[28px] sm:text-[32px] md:text-[36px] leading-tight tracking-tight text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              SIGNALS
            </motion.h1>
          </div>

          {/* Content Container with subtle border */}
          <motion.div
            className="max-w-3xl mx-auto space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Text Content */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 sm:p-10 md:p-12 backdrop-blur-sm">
              <div className="space-y-8">
                {paragraphs.map((text, index) => (
                  <motion.p
                    key={index}
                    style={{ textAlignLast: "left" }}
                    className={`font-mono font-light text-[15px] sm:text-[16px] md:text-[17px] leading-[1.9] text-white/75 tracking-tight text-justify ${index === paragraphs.length - 1 ? 'pt-2' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Form Container */}
            <motion.div
              className="bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-sm p-6 sm:p-8 md:p-10 h-max"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <iframe
                data-tally-src="https://tally.so/embed/LZZ9qv?alignLeft=1&hideTitle=1&transparentBackground=1"
                width="100%"
                height="893"
                title="SIGNALS Application Form"
                style={{ border: 'none' }}
              />
            </motion.div>
          </motion.div>
        </motion.article>
      </main>
    </div>
  );
}
