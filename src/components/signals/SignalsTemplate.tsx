"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSignalsLogo from "@/components/AnimatedSignalsLogo";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export interface ResourceSection {
  title: string;
  points: string[];
}

export interface SignalsTemplateProps {
  audienceType: "researchers" | "founders";
  sessionStructure: string[];
  recordingTips: string[];
  sessionTips?: string[];
  resourceSections: ResourceSection[];
  renderPointContent: (point: string) => ReactNode;
}

const ExternalLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    className="inline-flex items-center gap-1 text-[#8fb3d6] hover:text-white transition-colors"
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    <span>{children}</span>
    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
  </a>
);

export { ExternalLink };

export default function SignalsTemplate({
  audienceType,
  sessionStructure,
  recordingTips,
  sessionTips,
  resourceSections,
  renderPointContent,
}: SignalsTemplateProps) {
  return (
    <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
      {/* Background Noise SVG */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.35'/%3E%3C/svg%3E")`,
        }}
      />

      <Header />

      <main className="relative flex-1 w-full pt-32 px-4 sm:px-10 md:px-16 pb-20">
        <motion.article
          className="relative z-10 w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Hero Section */}
          <div className="mb-16">
            <div className="mb-6 flex items-start">
              <AnimatedSignalsLogo />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tight mb-6 leading-tight">
              SIGNALS for {audienceType === "researchers" ? "Researchers" : "Founders"}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {audienceType === "researchers"
                ? "Unscripted deep-dives with researchers building bleeding-edge AI. No polish, just raw technical depth and process."
                : "Unscripted product deep-dives with founders building in AI. No fluff, just real builders showing their work."}
            </p>
          </div>

          {/* What is SIGNALS Section */}
          <section className="mb-16 pb-16 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
              What is SIGNALS?
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                {audienceType === "researchers"
                  ? "It's a space for researchers to deep-dive into their work. Long-form, technical, unfiltered. Think of it as the research talk you'd give to a colleague, not a conference crowd."
                  : "It's a 30-50 minute session where you walk through what you've built, why it matters, and how you did it. Not a pitch deck, not marketing - just showing the actual product and your thinking behind it."}
              </p>
              {audienceType === "founders" && (
                <p>Think product walkthrough meets technical deep-dive.</p>
              )}
            </div>
          </section>

          {/* Session Structure */}
          <section className="mb-16 pb-16 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
              Session Structure
            </h2>
            <div className="space-y-6">
              {sessionStructure.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm text-white font-mono">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Session Tips (only for founders) */}
          {sessionTips && (
            <section className="mb-16 pb-16 border-b border-white/10">
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
                Session Tips
              </h2>
              <ul className="space-y-4">
                {sessionTips.map((tip, index) => (
                  <li key={index} className="flex gap-4 text-gray-300 leading-relaxed">
                    <span className="text-white/50">•</span>
                    <span className="flex-1">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Recording & Setup */}
          <section className="mb-16 pb-16 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
              Recording & Setup
            </h2>
            <ul className="space-y-4">
              {recordingTips.map((tip, index) => (
                <li key={index} className="flex gap-4 text-gray-300 leading-relaxed">
                  <span className="text-white/50">•</span>
                  <span className="flex-1">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What We'll Help You Build */}
          <section className="mb-16 pb-16 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
              What We'll Help You Build
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              We're not just posting a video. We'll build a complete content ecosystem around
              your session:
            </p>
            <div className="space-y-8">
              {resourceSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-serif text-white mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex gap-3 text-gray-300 leading-relaxed">
                        <span className="text-white/50">•</span>
                        <span className="flex-1">{renderPointContent(point)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Why Participate */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
              Why Participate?
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                {audienceType === "researchers"
                  ? "The best technical work often stays hidden in research labs. SIGNALS is a platform to share your process with people who actually get it - researchers, engineers, founders building adjacent things."
                  : "Most product content is either surface-level demos or overly polished marketing. SIGNALS is for builders who want to show their work to other builders - the real technical decisions, the hard problems, the stuff that actually matters."}
              </p>
              <p>
                It's less about marketing and more about contributing to the community's knowledge
                base. And honestly, just having a public record of your work and thinking.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center mt-16 pt-16 border-t border-white/10">
            <p className="text-gray-300 mb-6">
              If this sounds interesting, reach out. We'll set up a quick call to discuss your
              work and see if it's a fit.
            </p>
            <a
              href="https://x.com/groundzero_twt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Image src="/twitter.svg" alt="Twitter" width={20} height={20} />
              <span>DM us on Twitter</span>
            </a>
          </div>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}
