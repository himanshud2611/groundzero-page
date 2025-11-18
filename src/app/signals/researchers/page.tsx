"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSignalsLogo from "@/components/AnimatedSignalsLogo";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const sessionStructure = [
  "We are structuring the sessions for an hour (we can add ~20mins, if you feel the need while shooting/recording)",
  "The starting minutes can be a hook to what are you building and why should anyone care? I guess, creating slides (with text and animations) will make it more aligned.",
  "Next could be describing the core idea - let’s say breaking down what you're actually doing. Assume technical audience but don't assume they know your specific domain. You can show code, papers, diagrams - whatever makes it clear.",
  "We can push more towards what isn’t talk most of the time - your thought process while working on it, the fallbacks, ifs and buts or any interesting moment you have seen in the process or want to talk about.",
  "Next might be your thoughts on where is this going? what's still broken? what would you do with more time/resources? what does this unlock? you might want to answer questions or POVs you observe daily on twitter on this topic of your specialization.",
  "Open Question for Community. For the work you done, it might be the case that you have come up with many other scenarios or other problem statements in mind to experiment on. We can share 1 or 2 of those problem statements for the open community. Ground Zero will reward bounties for the best approximate solution response to that problem, after our internal discussion.",
];

const recordingTips = [
  "Screen Recording + Webcam (picture-in-picture works). Starting 2 minutes just with webcam (no screen sharing) - introducing yourself will be nice. You can use OBS Studio or Riverside or Zoom for recording. Reach out if you need any support.",
  "Make sure the video is recorded in high quality. 1080p minimum. with clear audio.",
  "You can show your actual work environment - IDE, notebooks, terminal, whatever. Keep the slides handy, if possible.",
  "If you hit a bug or something breaks, keep it in. This is gonna be everything RAW.",
  "Share your raw file with us - we will create a teaser video, do basic editing if needed and will post on GroundZero YT. The distribution and amplification of groundzero and our shared network will make it reach to wide audience.",
];

const resourceSections = [
  {
    title: "Dedicated researcher pages on the Ground Zero site",
    points: [
      "You will get own page with SIGNALS episode(s), bio, links to work & contact info",
      "Basically your portfolio page you can link to",
    ],
  },
  {
    title: "Written deep-dives/blog posts",
    points: [
      "Extract key insights from video into a written article on Ground Zero",
      "Research paper breakdowns published on groundzeroai.in to extend long-form reach",
      "You or someone on your team writes it, review and publish",
      "Different format reaches different audience (some people prefer reading)",
    ],
  },
  {
    title: "Clip library with timestamps",
    points: [
      "Breaking session into 2-3 min clips on specific topics",
      "Easier to share, more viral potential",
      "You can use these clips for your own social",
    ],
  },
  {
    title: "Technical resource hub",
    points: [
      'If you mention tools, papers, code repos in session - compiling those into a "resources from this episode" section',
      "Makes it immediately useful.",
      "We collect \"Open problems\" callouts from your episode so the community can riff and respond",
    ],
  },
  {
    title: "Connect them with relevant people",
    points: [
      "After the episode, actively intro to 2-3 people from network doing adjacent work",
      "This is probably bring more value.",
    ],
  },
];

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

const renderPointContent = (point: string): ReactNode => {
  if (point.includes("\"resources from this episode\"")) {
    return (
      <>
        If you mention tools, papers, code repos in session - compiling those into a &quot;
        <em>resources from this episode</em>
        &quot; section
      </>
    );
  }

  if (point.includes("groundzeroai.in")) {
    return (
      <>
        Research paper breakdowns published on {" "}
        <ExternalLink href="https://groundzeroai.in">groundzeroai.in</ExternalLink>{" "}
        to extend long-form reach
      </>
    );
  }

  return point;
};

export default function ResearchersSignalsPage() {
  return (
    <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.67' numOctaves='3' stitchTiles='stitch' seed='2400'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23454545'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <Header />

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

      <main className="relative flex-1 w-full pt-32 px-0 sm:px-10 md:px-16">
        <motion.article
          className="relative z-10 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-2 mb-12">
            <motion.div
              className="flex items-center justify-center gap-2.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedSignalsLogo size={48} className="shrink-0" />
              <h1 className="font-mono font-normal text-[38px] leading-none tracking-[-0.4px] text-white">
                SIGNALS
              </h1>
            </motion.div>
            <motion.p
              className="font-serif text-[29px] leading-normal tracking-[-1.55px] text-white/75 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              For Researchers and Hackers
            </motion.p>
          </div>

          <motion.div
            className="max-w-[860px] mx-auto pb-28"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-14">
              <section className="space-y-5 pl-6">
                <p className="text-[#f7cfa2] font-serif text-[20px]">
                  <strong>For researchers and hackers</strong>
                </p>
                <div className="space-y-3 max-w-2xl">
                  <p className="font-mono text-white/85 text-[14px] md:text-[16px] leading-7">
                    Hi. Welcome to SIGNALS. I really appreciate your presence here and we are looking forward to coming with high signal and tasteful content about the absolutely amazing work you have done and been doing.
                  </p>
                  <p className="font-mono text-white/85 text-[14px] md:text-[16px] leading-7">
                    This doc serves as the reference of the process about how we are approaching SIGNALS for researchers and how everyone can make the most out of it. This is a kind of raw draft for content guidelines.
                  </p>
                </div>
              </section>

              <div className="h-px bg-white/10" />

              <section className="space-y-6 border-l-2 border-white/10 pl-6">
                <p className="font-serif text-[#f7cfa2] text-[22px] leading-tight">Session flow</p>
                <ul className="space-y-3">
                  {sessionStructure.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-white/85 text-[14px] md:text-[16px] leading-7 flex gap-3"
                    >
                      <span className="text-white/50 mt-1">•</span>
                      <span className="max-w-3xl text-white/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-5 border-l-2 border-white/10 pl-6">
                <p className="font-serif text-[#f7cfa2] text-[22px] leading-tight">Recording tips</p>
                <ul className="space-y-3">
                  {recordingTips.map((tip) => (
                    <li
                      key={tip}
                      className="font-mono text-white/85 text-[14px] md:text-[16px] leading-7 flex gap-3"
                    >
                      <span className="text-white/50 mt-1">•</span>
                      <span className="max-w-3xl text-white/85">{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="h-px bg-white/10" />

              {resourceSections.map(({ title, points }) => (
                <section
                  key={title}
                  className="space-y-3 border-l-2 border-white/10 pl-6"
                >
                  <p className="font-serif text-[#f7cfa2] text-[22px] leading-tight">
                    {title}
                  </p>
                  <ul className="space-y-2">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="font-mono text-white/85 text-[14px] md:text-[16px] leading-7 flex gap-3"
                      >
                        <span className="text-white/50 mt-1">•</span>
                        <span className="max-w-3xl text-white/85">{renderPointContent(point)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <div className="h-px bg-white/10" />

              <section className="space-y-5 border-l border-white/15 pl-6">
                <p className="font-mono text-white/85 text-[14px] md:text-[16px] leading-7">
                  These are some pointers we are coming up with and beyond excited to host you.
                </p>
                <p className="font-mono text-white/85 text-[14px] md:text-[16px] leading-7">
                  Got any questions or anything to discuss? Reach out anytime:
                </p>
                <div className="font-mono text-white/85 text-[14px] md:text-[16px] leading-7 space-y-2">
                  <p>
                    DM me <ExternalLink href="https://x.com/himanshustwts">@himanshustwts</ExternalLink>
                  </p>
                  <p>
                    Isha (Community Lead) <ExternalLink href="https://x.com/slowdownisha">@slowdownisha</ExternalLink>
                  </p>
                </div>
                <p className="font-mono text-white/90 text-[14px] md:text-[16px] leading-7 bg-white/5 border border-white/10 px-5 py-4">
                  <strong>PS:</strong> These are just guidelines to help you structure your thoughts. Ultimately, this is your work and your voice. If you want to do something completely different, go for it. The goal is just to make sure what you&apos;re sharing lands well and people actually get value from it. You know your work better than anyone - we&apos;re here to share an open platform for anyone and help amplify it.
                </p>
              </section>
            </div>
          </motion.div>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}
