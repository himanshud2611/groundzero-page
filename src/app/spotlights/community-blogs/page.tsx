"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import LightsBackground from "@/components/common/LightsBackground";
import { motion, AnimatePresence } from "framer-motion";
import BlogSubmissionPopup from "@/components/BlogSubmissionPopup";
import { fadeInUp, fadeInUpDelayed, fadeInUpWithGlow } from "@/lib/animations";

// Temporary test data
const testBlogs = [
    {
        id: 1,
        title: "How your choice of Optimisers affect your training (and why you should care)",
        link: "https://hackmd.io/@l_WDq7lkQq29Pz-KD1JPNA/SJL6n1PYgg",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/ChinmayKak",
        authorHandle: "@ChinmayKak",
    },
    {
        id: 2,
        title: "Is your LLM a wordcel or a shape rotator?",
        link: "https://www.krsna.space/projects/cubeeval/Is-your-LLM-a-wordcel-or-a-shape-rotator",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/OccupyingM",
        authorHandle: "@OccupyingM",
    },
    {
        id: 3,
        title: "Multiscale Muon",
        link: "https://publish.obsidian.md/ueaj/Machine+Learning/Research+Ideas/Multiscale+Muon",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/_ueaj",
        authorHandle: "@_ueaj",
    },
    {
        id: 4,
        title: "Pico 8 Adventures",
        link: "https://namishh.com/blog/devlogs/pico",
        category: "Game Dev x Experiments",
        authorTwitter: "https://x.com/namishh__",
        authorHandle: "@namishh__",
    },
    {
        id: 5,
        title: "A (hopefully) rigorous introduction to maximum likelihood estimation",
        link: "https://kevindayve.github.io/math/likelihood-estimation",
        category: "AI x Maths",
        authorTwitter: "https://x.com/kevindave__",
        authorHandle: "@kevindave__",
    },
    {
        id: 6,
        title: "Reprogramming Stem Cells with GPT-4b Micro",
        link: "https://medium.com/@nabbo/reprogramming-stem-cells-with-gpt-4b-micro-0982cc598ef2",
        category: "AI x Biology",
        authorTwitter: "https://x.com/TensorTwerker",
        authorHandle: "@TensorTwerker",
    },
    {
        id: 7,
        title: "Optimizing a Layer Normalization Kernel with CUDA: a Worklog",
        link: "https://aryagxr.com/blogs/cuda-optimizing-layernorm",
        category: "AI Infra x Experiments",
        authorTwitter: "https://x.com/aryagxr",
        authorHandle: "@aryagxr",
    },
    {
        id: 8,
        title: "Attention sinks from the graph perspective",
        link: "https://publish.obsidian.md/the-tensor-throne/Transformers+as+GNNs/Attention+sinks+from+the+graph+perspective",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/tensorqt",
        authorHandle: "@tensorqt",
    },
];

export default function CommunityBlogs() {
    const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    // Get unique categories
    const categories = ["All", ...Array.from(new Set(testBlogs.map(blog => blog.category)))];

    // Filter blogs based on selected category
    const filteredBlogs = selectedCategory === "All"
        ? testBlogs
        : testBlogs.filter(blog => blog.category === selectedCategory);

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
                    {/* Title Section with Submit Button and Category Filter */}
                    <div className="flex flex-col items-center gap-4 mb-8 md:mb-12 w-full relative">
                        <motion.h1
                            className="font-serif font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.4px] text-white text-center"
                            {...fadeInUpDelayed(0.2)}
                        >
                            Community Blogs
                        </motion.h1>

                        {/* Category Filter - Desktop (Top Right) */}
                        <motion.div
                            className="absolute top-0 right-0 hidden md:block"
                            {...fadeInUpDelayed(0.3)}
                        >
                            <div className="relative">
                                <button
                                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/80 font-mono text-sm tracking-tight hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
                                >
                                    <span>Category</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu - Desktop */}
                                <AnimatePresence>
                                    {isCategoryDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 mt-2 w-56 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-xl overflow-hidden z-50"
                                        >
                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setIsCategoryDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 font-mono text-sm transition-colors ${
                                                        selectedCategory === category
                                                            ? 'bg-[#628bb2]/20 text-[#628bb2]'
                                                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                                                    }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Action Buttons Container - Mobile + Desktop */}
                        <motion.div
                            className="flex items-center gap-3 w-full justify-center md:w-auto"
                            {...fadeInUpDelayed(0.3)}
                        >
                            {/* Category Filter - Mobile */}
                            <div className="relative md:hidden">
                                <button
                                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/80 font-mono text-sm tracking-tight hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
                                >
                                    <span>Category</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu - Mobile */}
                                <AnimatePresence>
                                    {isCategoryDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-xl overflow-hidden z-50"
                                        >
                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setIsCategoryDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 font-mono text-sm transition-colors ${
                                                        selectedCategory === category
                                                            ? 'bg-[#628bb2]/20 text-[#628bb2]'
                                                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                                                    }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Submit Button with glow */}
                            <motion.button
                                onClick={() => setIsSubmitPopupOpen(true)}
                                className="gap-2 w-max px-4 py-1.5 rounded-full border border-white/20 text-white/80 font-mono text-sm tracking-tight hover:text-white hover:border-white/40 transition-colors"
                                {...fadeInUpWithGlow(0.4)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Submit +</span>
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Blog List */}
                    <motion.div
                        className="space-y-6"
                        {...fadeInUpDelayed(0.5)}
                    >
                        {filteredBlogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                className="group relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.6 + index * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {/* Blog Title */}
                                <a
                                    href={blog.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block font-serif text-[18px] md:text-[20px] leading-snug text-white hover:text-[#628bb2] transition-colors duration-200 mb-2"
                                >
                                    {blog.title}
                                </a>

                                {/* Metadata Line */}
                                <div className="flex items-center gap-2 font-mono text-[13px] md:text-[14px] text-white/50">
                                    <a
                                        href={blog.authorTwitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#7dd3c0] hover:text-[#a0e7d7] transition-colors duration-200"
                                    >
                                        {blog.authorHandle}
                                    </a>
                                    <span className="text-white/30">·</span>
                                    <span>{blog.category}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Note */}
                    <motion.p
                        className="mt-8 text-center font-mono text-sm text-white/40 italic"
                        {...fadeInUpDelayed(0.8)}
                    >
                        *The list is not ranked
                    </motion.p>

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
