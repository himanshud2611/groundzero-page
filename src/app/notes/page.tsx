"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import LightsBackground from "@/components/common/LightsBackground";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInUpDelayed } from "@/lib/animations";

const notes = [
    {
        title: "This Conversation Might Change How You See Autonomous Research!",
        tagParts: [
            { text: "Episode with " },
            { text: "Francesco", href: "https://x.com/tensorqt" },
            { text: " from Paradigma" },
        ],
        date: "16 May 2026",
        href: "https://open.substack.com/pub/himanshustwts/p/this-conversation-might-change-how?r=4pkows&utm_campaign=post-expanded-share&utm_medium=post%20viewer",
    },
    {
        title: "I Talked with Arcee AI for 100 Minutes and Everyone Needs to Know This",
        tagParts: [
            { text: "Episode with " },
            { text: "Lucas", href: "https://x.com/latkins" },
            { text: " and " },
            { text: "Varun", href: "https://x.com/stochasticchasm" },
            { text: " from Arcee AI" },
        ],
        date: "10 Apr 2026",
        href: "https://open.substack.com/pub/himanshustwts/p/i-talked-with-arcee-ai-for-100-minutes?r=4pkows&utm_campaign=post-expanded-share&utm_medium=post%20viewer",
    },
];

export default function Notes() {
    return (
        <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
            <BackgroundNoise />
            <Header />
            <LightsBackground />

            <main className="relative flex-1 w-full pt-32 px-4 sm:px-10 md:px-16 pb-20">
                <motion.article
                    className="relative z-10 w-full max-w-3xl mx-auto"
                    {...fadeInUp}
                >
                    <div className="flex flex-col items-center gap-4 mb-8 md:mb-10">
                        <motion.h1
                            className="font-serif font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.4px] text-white text-center"
                            {...fadeInUpDelayed(0.2)}
                        >
                            Notes from the Podcasts
                        </motion.h1>
                        <motion.a
                            href="https://groundzero1.substack.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center justify-center h-10 md:h-12 px-5 md:px-6 gap-2 md:gap-3 bg-white/10 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.1)] cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Image
                                src="/substack-icon.svg"
                                alt="Substack"
                                width={20}
                                height={20}
                                className="w-[16px] h-[16px] md:w-5 md:h-5 opacity-90"
                            />
                            <span className="relative font-mono font-medium text-sm md:text-base text-white/90 tracking-tight">
                                View Substack
                            </span>
                        </motion.a>
                    </div>

                    <motion.div
                        className="divide-y divide-white/10"
                        {...fadeInUpDelayed(0.4)}
                    >
                        {notes.map((note, index) => (
                            <motion.div
                                key={note.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5 + index * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <a
                                    href={note.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-baseline justify-between gap-4 py-5 md:py-6 hover:opacity-70 transition-opacity duration-200"
                                >
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="font-serif text-[17px] md:text-[20px] text-white/85 tracking-[-0.3px] leading-snug">
                                            {note.title}
                                        </span>
                                        <span className="font-mono text-[11px] md:text-[12px] text-white/40 tracking-tight">
                                            {note.tagParts.map((part, i) =>
                                                part.href ? (
                                                    <span
                                                        key={i}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            window.open(part.href, "_blank");
                                                        }}
                                                        className="text-[#628bb2]/80 hover:text-[#628bb2] underline underline-offset-2 cursor-pointer transition-colors duration-200"
                                                    >
                                                        {part.text}
                                                    </span>
                                                ) : (
                                                    <span key={i}>{part.text}</span>
                                                )
                                            )}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[13px] md:text-[14px] text-white/30 tracking-tight shrink-0 whitespace-nowrap">
                                        {note.date}
                                    </span>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.article>
            </main>
            <Footer />
        </div>
    );
}
