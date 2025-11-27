"use client";
import { motion } from "framer-motion";
import { Blog } from "@/types/blog";

interface BlogCardProps {
    blog: Blog;
    index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
    return (
        <motion.div
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
    );
}
