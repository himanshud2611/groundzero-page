"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BlogSubmissionPopup from "@/components/BlogSubmissionPopup";

export default function CommunityBlogs() {
    const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
            {/* Background with noise */}
            <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.67' numOctaves='3' stitchTiles='stitch' seed='2400'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23454545'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "256px 256px",
                }}
            />

            <Header />

            {/* Lights background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <Image
                    src="/signals-page-lights.svg"
                    alt=""
                    width={1440}
                    height={872}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-auto max-w-none"
                    priority
                />
            </div>

            <main className="relative flex-1 w-full pt-32 px-4 sm:px-10 md:px-16 pb-20">
                {/* Content */}
                <motion.article
                    className="relative z-10 w-full max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Title Section with Submit Button */}
                    <div className="flex flex-col items-center gap-4 mb-8 md:mb-12 w-full">
                        <motion.h1
                            className="font-serif font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.4px] text-white text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            Community Blogs
                        </motion.h1>

                        {/* Submit Button with glow - centered below title */}
                        <motion.button
                            onClick={() => setIsSubmitPopupOpen(true)}
                            className="gap-2 w-max px-4 py-1.5 rounded-full border border-white/20 text-white/80 font-mono text-sm tracking-tight hover:text-white hover:border-white/40 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                boxShadow: [
                                    '0 0 10px rgba(255, 255, 255, 0.3)',
                                    '0 0 20px rgba(255, 255, 255, 0.6)',
                                    '0 0 10px rgba(255, 255, 255, 0.3)',
                                ],
                            }}
                            transition={{
                                opacity: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                                y: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                                boxShadow: {
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                },
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Submit +</span>
                        </motion.button>
                    </div>

                    {/* Coming Soon Section */}
                    <motion.div
                        className="flex flex-col items-center justify-center gap-4 py-16 md:py-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                        }}
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
                                    animate={{
                                        textShadow: [
                                            '0 0 5px rgba(255, 255, 255, 0.3)',
                                            '0 0 10px rgba(255, 255, 255, 0.6)',
                                            '0 0 5px rgba(255, 255, 255, 0.3)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
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
