"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogSubmissionPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BlogSubmissionPopup({ isOpen, onClose }: BlogSubmissionPopupProps) {
    const [email, setEmail] = useState("");
    const [profileLink, setProfileLink] = useState("");
    const [blogLink, setBlogLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/blog-submissions/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    profileLink,
                    blogLink,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit");
            }

            setIsSubmitted(true);
            // Reset form
            setEmail("");
            setProfileLink("");
            setBlogLink("");

            // Close popup after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setEmail("");
            setProfileLink("");
            setBlogLink("");
            setError("");
            setIsSubmitted(false);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Popup */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            className="relative w-full max-w-md bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl pointer-events-auto"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Background noise */}
                            <div
                                className="absolute inset-0 opacity-[0.05] rounded-lg"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.67' numOctaves='3' stitchTiles='stitch' seed='2400'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23454545'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "repeat",
                                    backgroundSize: "256px 256px",
                                }}
                            />

                            <div className="relative p-6 md:p-8">
                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {!isSubmitted ? (
                                    <>
                                        {/* Title */}
                                        <h2 className="font-serif text-[24px] md:text-[28px] text-white mb-2">
                                            Submit Your Blog
                                        </h2>
                                        <p className="font-mono text-sm text-white/60 mb-6">
                                            Share your blog with Ground Zero
                                        </p>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block font-mono text-sm text-white/80 mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#628bb2]/50 focus:ring-1 focus:ring-[#628bb2]/50 transition-all"
                                                    placeholder="your@email.com"
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            {/* Profile Link */}
                                            <div>
                                                <label htmlFor="profileLink" className="block font-mono text-sm text-white/80 mb-2">
                                                    Twitter/LinkedIn Profile *
                                                </label>
                                                <input
                                                    type="url"
                                                    id="profileLink"
                                                    value={profileLink}
                                                    onChange={(e) => setProfileLink(e.target.value)}
                                                    required
                                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#628bb2]/50 focus:ring-1 focus:ring-[#628bb2]/50 transition-all"
                                                    placeholder="https://x.com/username"
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            {/* Blog Link */}
                                            <div>
                                                <label htmlFor="blogLink" className="block font-mono text-sm text-white/80 mb-2">
                                                    Direct Link to Blog Post *
                                                </label>
                                                <input
                                                    type="url"
                                                    id="blogLink"
                                                    value={blogLink}
                                                    onChange={(e) => setBlogLink(e.target.value)}
                                                    required
                                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#628bb2]/50 focus:ring-1 focus:ring-[#628bb2]/50 transition-all"
                                                    placeholder="https://yourblog.com"
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            {/* Error Message */}
                                            {error && (
                                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                                    <p className="font-mono text-sm text-red-400">{error}</p>
                                                </div>
                                            )}

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full px-6 py-3 bg-[#628bb2] hover:bg-[#7a9fc4] disabled:bg-white/10 text-white font-mono text-sm rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? "Submitting..." : "Submit"}
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    /* Success State */
                                    <div className="py-8 text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center"
                                        >
                                            <svg
                                                className="w-8 h-8 text-green-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </motion.div>
                                        <h3 className="font-serif text-[24px] text-white mb-2">
                                            Submitted Successfully!
                                        </h3>
                                        <p className="font-mono text-sm text-white/60">
                                            Your entry will be reviewed soon. Stay tuned.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
