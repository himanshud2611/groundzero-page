"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import LightsBackground from "@/components/common/LightsBackground";
import LaunchWaitlistForm from "@/components/LaunchWaitlistForm";
import { motion } from "framer-motion";

export default function LaunchSoonPage() {
  return (
    <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <BackgroundNoise opacity={0.15} />
      <LightsBackground className="opacity-40" />
      
      {/* Golden accent gradient top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#f4d37a] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <Header />

      <main className="relative flex-1 w-full pt-32 px-4 sm:px-10 md:px-16 pb-20 flex items-center justify-center">
        <motion.div 
          className="relative w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle glow behind the card */}
          <div className="absolute -inset-10 rounded-[40px] bg-radial-[circle_at_center]_from-[#f4d37a]/10_to-transparent blur-3xl opacity-50" />
          
          <div className="relative flex flex-col items-center text-center">
             {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f4d37a]/20 bg-[#f4d37a]/5 backdrop-blur-sm mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f4d37a] animate-pulse" />
              <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#f4d37a]/90">
                Frontier
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.1] text-white tracking-tight mb-8">
              <span className="block text-white/90">We are building Infrastructure</span>
              <span className="block text-white/90">
                for <span className="italic text-[#f4d37a]">Frontier Thinking</span>
              </span>
            </h1>

            {/* Launching Soon Text */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#f4d37a]/50" />
              <p className="font-mono text-sm md:text-base text-[#f4d37a]/80 tracking-[0.3em] uppercase">
                Launching Soon
              </p>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#f4d37a]/50" />
            </div>

            {/* Form Container */}
            <div className="w-full max-w-md">
              <LaunchWaitlistForm />
            </div>
          </div>
        </motion.div>
      </main>

      <Footer color="text-white/20" />
    </div>
  );
}
