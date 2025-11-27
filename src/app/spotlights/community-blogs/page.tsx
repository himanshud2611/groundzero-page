"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import LightsBackground from "@/components/common/LightsBackground";
import { motion } from "framer-motion";
import BlogSubmissionPopup from "@/components/BlogSubmissionPopup";
import CategoryDropdown from "@/components/community-blogs/CategoryDropdown";
import BlogCard from "@/components/community-blogs/BlogCard";
import { fadeInUp, fadeInUpDelayed, fadeInUpWithGlow } from "@/lib/animations";
import { communityBlogs, getAllCategories } from "@/data/communityBlogs";

export default function CommunityBlogs() {
    const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    // Get unique categories with "All" option
    const categories = ["All", ...getAllCategories()];

    // Filter blogs based on selected category
    const filteredBlogs = selectedCategory === "All"
        ? communityBlogs
        : communityBlogs.filter(blog => blog.category === selectedCategory);

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
                    {/* Title Section with Submit Button and Category Filter */}
                    <div className="flex flex-col items-center gap-4 mb-8 md:mb-12 w-full relative">
                        <motion.h1
                            className="font-serif font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.4px] text-white text-center"
                            {...fadeInUpDelayed(0.2)}
                        >
                            Community Blogs
                        </motion.h1>

                        {/* Category Filter - Desktop (Top Right) */}
                        <CategoryDropdown
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                            isOpen={isCategoryDropdownOpen}
                            onToggle={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                            isMobile={false}
                        />

                        {/* Action Buttons Container - Mobile + Desktop */}
                        <motion.div
                            className="flex items-center gap-3 w-full justify-center md:w-auto"
                            {...fadeInUpDelayed(0.3)}
                        >
                            {/* Category Filter - Mobile */}
                            <CategoryDropdown
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategorySelect={setSelectedCategory}
                                isOpen={isCategoryDropdownOpen}
                                onToggle={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                isMobile={true}
                            />

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
                            <BlogCard key={blog.id} blog={blog} index={index} />
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
