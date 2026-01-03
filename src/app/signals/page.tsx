"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import LightsBackground from "@/components/common/LightsBackground";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSignalsLogo from "@/components/AnimatedSignalsLogo";
import { fadeInUp, fadeInUpDelayed } from "@/lib/animations";

const paragraphs = [
    {
        text: "I've been thinking about what work looks like post-AGI. I guess it will feel less like grinding and more like choosing the problems that actually matter to you and a cross-section of world. The thing is - researchers and builders are already living this. They're shipping experimental models, breaking paradigms, building tools that change how we work.",
    },
    {
        text: "But here's what keeps me up: the pace is insane. So much incredible work either gets lost in feeds, never leaves the lab, or just... disappears. The people doing the most interesting things often don't have the bandwidth or platform to show what they're actually building. And that sucks.",
    },
    {
        text: "So we're building ",
        highlight: true,
        continuation:
            " on Ground Zero. It's pretty simple - an open platform for two groups: researchers and builders creating novel work, and founders shipping products that matter. The idea is to give you a space to show the real stuff. Not the polished launch video. Not the marketing deck. The messy parts. The pivots. The \"we tried this and it broke so we did that instead\" moments. The technical tradeoffs nobody talks about because they're too in the weeds.",
    },
    {
        text: "You keep full ownership of everything. We're here to help more people see what you're doing. Publish a video content on Ground Zero Youtube. We'll help with writings if you want it, feature your work on the Ground Zero page, push it through networks that actually care, and connect you with people working on adjacent problems. The goal is exposure to people who get it, organic connections, and a place where experimental work doesn't get lost.",
    },
    {
        text: "If you're building something real and want to showcase to the community, we are here to give you an open platform.",
    },
];

export default function Signals() {
    useEffect(() => {
        // Load Tally script
        const script = document.createElement("script");
        script.innerHTML = `var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}`;
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
            <BackgroundNoise />
            <Header />
            <LightsBackground />

            <main className="relative flex-1 w-full pt-32 px-0 sm:px-10 md:px-16">
                {/* Content */}
                <motion.article
                    className="relative z-10 w-full max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Title Section */}
                    <div className="flex flex-col items-center gap-2 mb-8">
                        <motion.div
                            className="flex items-center justify-center gap-2.5 md:gap-4 flex-wrap"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <div className="flex items-center gap-2.5">
                                <AnimatedSignalsLogo
                                    size={48}
                                    className="shrink-0"
                                />
                                <h1 className="font-mono font-normal text-[40px] leading-none tracking-[-0.4px] text-white">
                                    SIGNALS
                                </h1>
                            </div>
                            <motion.a
                                href="/signals/episodes"
                                className="relative inline-flex items-center justify-center h-10 px-5 gap-2 bg-[#628bb2]/20 backdrop-blur-lg rounded-full overflow-hidden shadow-[inset_0px_4px_4px_0px_rgba(98,139,178,0.1)] border border-[#628bb2]/30 cursor-pointer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    boxShadow: [
                                        '0 0 10px rgba(98, 139, 178, 0.3)',
                                        '0 0 20px rgba(98, 139, 178, 0.6)',
                                        '0 0 10px rgba(98, 139, 178, 0.3)',
                                    ],
                                }}
                                transition={{
                                    opacity: { duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                                    scale: { duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                                    boxShadow: {
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor: 'rgba(98, 139, 178, 0.3)',
                                    borderColor: 'rgba(98, 139, 178, 0.5)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative font-mono font-medium text-sm text-white/90 tracking-tight">
                                    Watch Episodes
                                </span>
                                <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </motion.a>
                        </motion.div>
                        <motion.p
                            className="font-serif text-[31px] leading-normal tracking-[-1.55px] text-white/75 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            Making the Work Visible
                        </motion.p>
                    </div>

                    {/* Content Container */}
                    <motion.div
                        className="max-w-[800px] mx-auto pb-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {/* Text Content */}
                        <div className="bg-white/5 px-8 md:px-8 py-8 md:py-10 flex flex-col items-center justify-center gap-2.5">
                            <div className="w-full space-y-4">
                                {paragraphs.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="font-mono font-normal text-[15px] md:text-[17px] leading-normal tracking-[-1.02px] text-white/80 text-justify"
                                    >
                                        {paragraph.highlight ? (
                                            <>
                                                {paragraph.text}
                                                <span className="inline-flex items-center gap-1.5 align-middle">
                                                    <Image
                                                        src="/signals-logo.svg"
                                                        alt=""
                                                        width={20}
                                                        height={20}
                                                        className="inline-block"
                                                    />
                                                    <span className="bg-linear-to-r from-[#628bb2] via-[#7a9fc4] to-[#8fb3d6] bg-clip-text text-transparent font-semibold">
                                                        SIGNALS
                                                    </span>
                                                </span>
                                                {paragraph.continuation}
                                            </>
                                        ) : (
                                            paragraph.text
                                        )}
                                    </p>
                                ))}
                            </div>
                            <div className="font-mono font-normal text-[17px] leading-normal tracking-[-1.02px] text-white w-full mt-4">
                                <p>
                                    <span>- </span>
                                    <a
                                        href="https://x.com/himanshustwts"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#628bb2] hover:text-[#7a9fc4] transition-colors duration-200"
                                    >
                                        @himanshustwts
                                    </a>
                                </p>
                                <div className="flex flex-col md:flex-row items-center md:justify-between w-full mt-4 gap-3 md:gap-0">
                                    <motion.a
                                        href="/signals/upcoming-guests"
                                        className="gap-2 w-full md:w-max px-4 py-1.5 rounded-full border border-white/20 text-white/80 font-mono text-sm tracking-tight hover:text-white hover:border-white/40 transition-colors text-center"
                                        animate={{
                                            boxShadow: [
                                                '0 0 10px rgba(255, 255, 255, 0.3)',
                                                '0 0 20px rgba(255, 255, 255, 0.6)',
                                                '0 0 10px rgba(255, 255, 255, 0.3)',
                                            ],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        Upcoming Guests →
                                    </motion.a>
                                    <motion.a
                                        href="#signals-form"
                                        className="gap-2 w-full md:w-max px-4 py-1.5 rounded-full border border-white/20 text-white/80 font-mono text-sm tracking-tight hover:text-white hover:border-white/40 transition-colors text-center"
                                        animate={{
                                            boxShadow: [
                                                '0 0 10px rgba(255, 255, 255, 0.3)',
                                                '0 0 20px rgba(255, 255, 255, 0.6)',
                                                '0 0 10px rgba(255, 255, 255, 0.3)',
                                            ],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        Share your signal ↴
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        {/* Form Container */}
                        <div
                            id="signals-form"
                            className="bg-white/5 px-5 md:px-8 "
                        >
                            {/* <div className="flex justify-start mb-6">
                                <Image
                                    src="/signals-logo.svg"
                                    alt="Signals"
                                    className='opacity-50'
                                    width={72}
                                    height={72}
                                />
                            </div> */}
                            <iframe
                                data-tally-src="https://tally.so/embed/pbbyQ8?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                                width="100%"
                                height="1323"
                                title="This is your spot."
                                style={{ border: "none" }}
                            />
                        </div>
                    </motion.div>
                </motion.article>
            </main>
            <Footer />
        </div>
    );
}
