"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

const resources = [
    { title: "Gen AI Handbook by Will Brown", url: "https://genai-handbook.github.io/", domain: "genai-handbook.github.io" },
    { title: "Biology of LLMs by Anthropic", url: "https://transformer-circuits.pub/2025/attribution-graphs/biology.html#dives-poems", domain: "transformer-circuits.pub" },
    { title: "Lil'Log", url: "https://lilianweng.github.io/", domain: "lilianweng.github.io" },
    { title: "Andrej Karpathy's Blog", url: "https://karpathy.github.io/", domain: "karpathy.github.io" },
    { title: "Chris Olah's Blog", url: "https://colah.github.io/", domain: "colah.github.io" },
    { title: "Chip Huyen's Blog", url: "https://huyenchip.com/blog/", domain: "huyenchip.com" },
    { title: "Language Models Newsletter", url: "https://newsletter.languagemodels.co/", domain: "newsletter.languagemodels.co" },
    { title: "Hamel Husain's Blog", url: "https://hamel.dev/", domain: "hamel.dev" },
    { title: "Neel Nanda's Blog", url: "https://www.neelnanda.io/", domain: "neelnanda.io" },
    { title: "Lucas Beyer's Articles", url: "https://lucasb.eyer.be/#articles", domain: "lucasb.eyer.be" },
    { title: "Simon Willison's Blog", url: "https://simonwillison.net/", domain: "simonwillison.net" },
    { title: "RLHF Book", url: "https://rlhfbook.com/", domain: "rlhfbook.com" },
    { title: "Sebastian Raschka's ML Q&AI", url: "https://sebastianraschka.com/books/ml-q-and-ai/#table-of-contents", domain: "sebastianraschka.com" },
    { title: "BentoML LLM Guide", url: "https://bentoml.com/llm/", domain: "bentoml.com" },
    { title: "Fast.ai", url: "https://www.fast.ai/", domain: "fast.ai" },
    { title: "Why Does GRPO Work?", url: "https://kalomaze.bearblog.dev/why-does-grpo-work/", domain: "kalomaze.bearblog.dev" },
    { title: "Swyx's Blog", url: "https://www.swyx.io/", domain: "swyx.io" },
    { title: "LessWrong", url: "https://www.lesswrong.com/", domain: "lesswrong.com" },
    { title: "Turing Machine Archive", url: "https://archive.uea.ac.uk/jtm/contents.htm", domain: "archive.uea.ac.uk" },
    { title: "Ilya 30u30", url: "https://github.com/jayxin/Ilya-30u30", domain: "github.com" },
    { title: "Deriving Muon", url: "https://jeremybernste.in/writing/deriving-muon", domain: "jeremybernste.in" },
    { title: "Tokenbender - RL from zero pretrain", url: "https://tokenbender.com/post.html?id=welcome", domain: "tokenbender.com" },
    { title: "Himanshu's Posts", url: "https://www.himanshustwts.com/posts", domain: "himanshustwts.com" },
    { title: "Deep Learning by Adam (OpenAI)", url: "https://github.com/adam-maj/deep-learning", domain: "github.com" },
    { title: "Ground Zero Substack", url: "https://groundzero1.substack.com/", domain: "groundzero1.substack.com" },
    { title: "Bycloud AI", url: "https://mail.bycloud.ai/", domain: "bycloud.ai" },
    { title: "Eugene Yan's Blog", url: "https://eugeneyan.com/", domain: "eugeneyan.com" },
    { title: "Letters from Lossfunk", url: "https://letters.lossfunk.com/", domain: "letters.lossfunk.com" },
    { title: "D2L.ai", url: "https://d2l.ai/", domain: "d2l.ai" },
    { title: "LLM Reasoning - Stanford CS 25", url: "https://dennyzhou.github.io/LLM-Reasoning-Stanford-CS-25.pdf", domain: "dennyzhou.github.io" },
    { title: "Frontier Soket - Muon QK Clip", url: "https://frontier.soket.ai/posts/muon_qk_clip/", domain: "frontier.soket.ai" },
    { title: "Vincent Weisser's AI Blog", url: "https://www.vincentweisser.com/ai", domain: "vincentweisser.com" },
    { title: "YALM - Andrew K Chan", url: "https://andrewkchan.dev/posts/yalm.html", domain: "andrewkchan.dev" },
    { title: "vLLM Distributed Serving", url: "https://docs.vllm.ai/en/latest/serving/distributed_serving.html#distributed-inference-strategies-for-a-single-model-replica", domain: "docs.vllm.ai" },
    { title: "Jiha Kim's Blog", url: "https://jiha-kim.github.io/", domain: "jiha-kim.github.io" },
    { title: "Advances in Foundation Agents", url: "https://arxiv.org/pdf/2504.01990", domain: "arxiv.org" },
    { title: "Machine Learning Mastery", url: "https://machinelearningmastery.com/blog/", domain: "machinelearningmastery.com" },
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
                    className="relative z-10 w-full max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Title Section */}
                    <div className="flex flex-col items-center gap-3 mb-12">
                        <motion.h1
                            className="font-serif font-normal text-[40px] leading-none tracking-[-0.4px] text-white"
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
                            className="font-mono text-lg text-white/60"
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

                    {/* Resources List */}
                    <motion.div
                        className="bg-white/5 px-6 md:px-10 py-8 md:py-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <ul className="space-y-2.5">
                            {resources.map((resource, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.5 + index * 0.02,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                                    >
                                        {/* Favicon */}
                                        <div className="shrink-0 w-5 h-5 relative rounded overflow-hidden bg-white/10">
                                            <img
                                                src={`https://www.google.com/s2/favicons?domain=${resource.domain}&sz=32`}
                                                alt=""
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                        </div>

                                        {/* Title and URL */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-mono text-[15px] md:text-[16px] text-white/90 group-hover:text-[#628bb2] transition-colors duration-200 wrap-break-word">
                                                {resource.title}
                                            </div>
                                            <div className="font-mono text-xs text-white/40 group-hover:text-white/50 transition-colors duration-200 truncate">
                                                {resource.domain}
                                            </div>
                                        </div>

                                        {/* External link icon */}
                                        <svg
                                            className="shrink-0 w-4 h-4 text-white/30 group-hover:text-[#628bb2] transition-colors duration-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Closing Section */}
                    <motion.div
                        className="mt-12 bg-white/5 px-6 md:px-10 py-8 md:py-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div className="space-y-6 font-mono text-[15px] md:text-[16px] text-white/70">
                            <p>
                                If you&apos;ve read till here, follow our newsletter{" "}
                                <a
                                    href="https://groundzero1.substack.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#628bb2] hover:text-[#7a9fc4] transition-colors duration-200"
                                >
                                    https://groundzero1.substack.com/
                                </a>
                            </p>
                            <p>
                                Expect more weekly drops on the latest in AI research, trends, and whatever&apos;s shaking up the scene.
                                Sub to the Substack, and catch us on X and YouTube for more. (Daniel Han&apos;s Podcast dropping soon)
                            </p>
                            <div className="space-y-2">
                                <p>
                                    Twitter/X:{" "}
                                    <a
                                        href="https://x.com/groundzero_twt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#628bb2] hover:text-[#7a9fc4] transition-colors duration-200"
                                    >
                                        Ground Zero
                                    </a>
                                </p>
                                <p>
                                    YouTube:{" "}
                                    <a
                                        href="https://www.youtube.com/@Ground_ZeroYT"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#628bb2] hover:text-[#7a9fc4] transition-colors duration-200"
                                    >
                                        ML, Maths and Podcasts
                                    </a>
                                </p>
                            </div>

                            {/* Podcast Screenshot */}
                            <div className="mt-6 rounded-lg overflow-hidden">
                                <Image
                                    src="/podcasts-screenshot.png"
                                    alt="Ground Zero Podcasts"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto"
                                />
                            </div>

                            <p className="text-white/50 italic mt-6">cyaa :)</p>
                        </div>
                    </motion.div>
                </motion.article>
            </main>
            <Footer />
        </div>
    );
}
