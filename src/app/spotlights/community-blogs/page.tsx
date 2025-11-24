"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import LightsBackground from "@/components/common/LightsBackground";
import { motion, AnimatePresence } from "framer-motion";
import BlogSubmissionPopup from "@/components/BlogSubmissionPopup";
import { fadeInUp, fadeInUpDelayed, glowAnimation, textGlowAnimation } from "@/lib/animations";

export default function CommunityBlogs() {
    const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
            <BackgroundNoise />
            <Header />
            <LightsBackground />

            <main className="relative flex-1 w-full pt-32 px-4 sm:px-10 md:px-16 pb-20">
                {/* Content */}
                <motion.article
                    className="relative z-10 w-full max-w-3xl mx-auto"
                    {...fadeInUp}
                >
                    {/* Title Section with Submit Button */}
                    <div className="flex flex-col items-center gap-4 mb-8 md:mb-12 w-full">
                        <motion.h1
                            className="font-serif font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.4px] text-white text-center"
                            {...fadeInUpDelayed(0.2)}
                        >
                            Community Blogs
                        </motion.h1>

                        {/* Submit Button with glow - centered below title */}
                        <motion.button
                            onClick={() => setIsSubmitPopupOpen(true)}
                            className="gap-2 w-max px-4 py-1.5 rounded-full border border-white/20 text-white/80 font-mono text-sm tracking-tight hover:text-white hover:border-white/40 transition-colors"
                            {...fadeInUpDelayed(0.4)}
                            {...glowAnimation}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Submit +</span>
                        </motion.button>
                    </div>

                    {/* Coming Soon Section */}
                    <motion.div
                        className="flex flex-col items-center justify-center gap-4 py-16 md:py-20"
                        {...fadeInUpDelayed(0.5)}
                    >
                        <div className="text-center space-y-4">
                            <div className="font-serif text-[24px] md:text-[28px] text-white/90">
                                Coming Soon
                            </div>
                            <button
                                onClick={() => setIsSubmitPopupOpen(true)}
                                className="inline-flex items-center gap-2 font-mono text-[14px] md:text-[15px] text-white/70 hover:text-white transition-colors group"
                            >
                                <span>Submit your Blog</span>
                                <motion.span
                                    className="text-white/50 group-hover:text-white/80"
                                    {...textGlowAnimation}
                                >
                                    →
                                </motion.span>
                            </button>
                            <p className="font-mono text-[12px] md:text-[13px] text-white/40 mt-2">
                                Page updates after every 24hr
                            </p>
                        </div>
                    </motion.div>
                </motion.article>
            </main>

            <Footer />

            {/* Submission Popup */}
            <BlogSubmissionPopup
                isOpen={isSubmitPopupOpen}
                onClose={() => setIsSubmitPopupOpen(false)}
            />
        </div>
    );
}
