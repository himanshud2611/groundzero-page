"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const spotlights = [
    {
        title: "Blogs and Resources",
        description: "Curated collection of top AI/ML blogs, handbooks, and learning resources from amazing researchers and practitioners",
        resourceCount: "37+",
        href: "/spotlights/blogs-and-resources",
    },
];

export default function Spotlights() {
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
                    className="relative z-10 w-full max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Title Section */}
                    <div className="flex flex-col items-center gap-3 mb-12 md:mb-16">
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
                            Spotlights by Ground Zero
                        </motion.h1>
                        <motion.p
                            className="font-mono text-base md:text-lg text-white/60 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            curated by{" "}
                            <a
                                href="https://x.com/himanshustwts"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#628bb2] hover:text-[#7a9fc4] transition-colors duration-200"
                            >
                                @himanshustwts
                            </a>
                        </motion.p>
                    </div>

                    {/* Spotlights Grid */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {spotlights.map((spotlight, index) => (
                            <motion.div
                                key={spotlight.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.5 + index * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <Link
                                    href={spotlight.href}
                                    className="group block bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-[#628bb2]/30 rounded-lg p-6 md:p-8 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            {/* Title */}
                                            <h2 className="font-serif text-[24px] md:text-[28px] leading-tight tracking-[-0.4px] text-white group-hover:text-[#628bb2] transition-colors duration-300">
                                                {spotlight.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="font-mono text-[14px] md:text-[15px] leading-relaxed text-white/60 group-hover:text-white/70 transition-colors duration-300">
                                                {spotlight.description}
                                            </p>

                                            {/* Resource Count */}
                                            <div className="flex items-center gap-2 pt-2">
                                                <div className="font-mono text-[12px] md:text-[13px] text-white/40 group-hover:text-[#628bb2]/70 transition-colors duration-300">
                                                    {spotlight.resourceCount} resources
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrow Icon */}
                                        <div className="shrink-0 mt-1">
                                            <svg
                                                className="w-6 h-6 text-white/30 group-hover:text-[#628bb2] transition-all duration-300 group-hover:translate-x-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.article>
            </main>
            <Footer />
        </div>
    );
}
