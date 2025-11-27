"use client";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUpDelayed } from "@/lib/animations";

interface CategoryDropdownProps {
    categories: string[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
    isOpen: boolean;
    onToggle: () => void;
    /** If true, shows mobile-optimized styling */
    isMobile?: boolean;
}

export default function CategoryDropdown({
    categories,
    selectedCategory,
    onCategorySelect,
    isOpen,
    onToggle,
    isMobile = false,
}: CategoryDropdownProps) {
    const handleSelect = (category: string) => {
        onCategorySelect(category);
        onToggle(); // Close dropdown after selection
    };

    return (
        <motion.div
            className={isMobile ? "relative md:hidden" : "absolute top-0 right-0 hidden md:block"}
            {...fadeInUpDelayed(0.3)}
        >
            <div className="relative">
                <button
                    onClick={onToggle}
                    className={`flex items-center gap-2 rounded-full border border-white/20 bg-white/5 text-white/80 font-mono text-sm tracking-tight hover:text-white hover:border-white/40 hover:bg-white/10 transition-all ${
                        isMobile ? 'px-4 py-1.5' : 'px-4 py-2'
                    }`}
                >
                    <span>Category</span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute mt-2 w-56 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-xl overflow-hidden z-50 ${
                                isMobile ? 'left-1/2 -translate-x-1/2' : 'left-0'
                            }`}
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleSelect(category)}
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
    );
}
