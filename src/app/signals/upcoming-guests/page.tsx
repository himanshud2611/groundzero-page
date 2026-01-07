"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSignalsLogo from "@/components/AnimatedSignalsLogo";

const upcomingGuests = [
    {
        name: "Ali Behrouz",
        role: "Research Intern, Google",
        project: "Titans, Atlas, Nested Learning",
        twitter: "behrouz_ali",
        image: "/ali-behrouz.jpg",
        youtubeUrl: "https://youtu.be/3WqZIja7kdA",
    },
    {
        name: "Ajinkya Mulay",
        role: "Research Scientist, Meta",
        project: "Enabling training/inference of sparse models from the ground up with theoretical grounding",
        twitter: "ajinkya_mulay_",
        image: "/ajinkya-mulay.jpg",
    },
];

export default function UpcomingGuests() {
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

            <main className="relative flex-1 w-full pt-32 px-4 sm:px-10 md:px-16">
                <motion.article
                    className="relative z-10 w-full max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Title Section */}
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <motion.div
                            className="flex items-center justify-center gap-2.5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <AnimatedSignalsLogo
                                size={48}
                                className="shrink-0"
                            />
                            <h1 className="font-mono font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.4px] text-white text-center">
                                Upcoming Guests on Signals
                            </h1>
                        </motion.div>
                    </div>

                    {/* Guest Cards */}
                    <motion.div
                        className="space-y-6 pb-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {upcomingGuests.map((guest, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.5 + index * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Profile Picture */}
                                    <motion.div
                                        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 bg-white/10 border-2 border-white/20"
                                        animate={{
                                            boxShadow: [
                                                '0 0 5px rgba(255, 255, 255, 0.2)',
                                                '0 0 10px rgba(255, 255, 255, 0.4)',
                                                '0 0 5px rgba(255, 255, 255, 0.2)',
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        <Image
                                            src={guest.image}
                                            alt={guest.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>

                                    {/* Guest Info */}
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <h2 className="font-mono font-semibold text-2xl md:text-3xl text-white mb-1">
                                                {guest.name}
                                            </h2>
                                            <p className="font-mono text-base md:text-lg text-white/70">
                                                {guest.role}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <span className="font-mono text-base text-white/50 shrink-0">
                                                    Project:
                                                </span>
                                                <span className="font-mono text-sm text-white/80 leading-relaxed pt-0.5">
                                                    {guest.project}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-base text-white/50">
                                                    X/Twitter:
                                                </span>
                                                <a
                                                    href={`https://x.com/${guest.twitter}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-mono text-base text-[#628bb2] hover:text-[#7a9fc4] transition-colors duration-200 pt-0.5"
                                                >
                                                    @{guest.twitter}
                                                </a>
                                            </div>
                                            {guest.youtubeUrl && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <a
                                                        href={guest.youtubeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 font-mono text-base text-[#FF1D36] hover:text-[#ff4d5a] transition-colors duration-200"
                                                    >
                                                        <Image
                                                            src="/youtube-logo.svg"
                                                            alt="YouTube"
                                                            width={20}
                                                            height={20}
                                                        />
                                                        <span>Episode is live →</span>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.article>
            </main>
            <Footer />
        </div>
    );
}
