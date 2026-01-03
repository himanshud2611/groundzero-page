"use client";

import SignalsTemplate, { type ResourceSection } from "@/components/signals/SignalsTemplate";
import type { ReactNode } from "react";

const sessionStructure = [
  "We are structuring the session for 30-50 mins.",
  "The starting minutes can be a hook - What you've built? Product in few sentences. What problem does it solve? Who's it for?",
  "Next you can focus on - Why you built it? What was broken? What frustrated you? Why existing solutions sucked? This is your origin story but keep it tight.",
  "The 5-10mins are interesting - How you built it? - Technical decisions. Why this stack? What tradeoffs did you make? What almost killed the project? Show the product, walk through key features, explain the architecture if it's interesting. It might be the case that you won't want to talk about each and everything here, though anything you want to share - go for it. This is educational stuff about your product which everyone want to hear. EDUCATE THEM.",
  "The new few minutes you can focus on - What you learned? What surprised you? What would you do differently? What's harder than it looks? You can talk more about the specialized area of your product or tool and how it is changing or converging to something.",
  "The next minutes you can share - What's next? Maybe a Roadmap, open problems, where you need help or anything you would like to share.",
];

const sessionTips = [
  "Product demos should be live and it would be awesome if you are demonstrating every feature of it.",
  "If something's janky or half-built, just say it. It attracts audience more as you are pretty much natural about everything.",
  "Talk through your thinking, not just what the product does.",
];

const recordingTips = [
  "Screen Recording + Webcam (picture-in-picture works). Starting 2 minutes just with webcam (no screen sharing) - introducing yourself will be nice. You can use OBS Studio or Riverside or Zoom for recording. Reach out if you need any support.",
  "Make sure the video is recorded in high quality. 1080p minimum. with clear audio.",
  "You can show your actual work environment - IDE, notebooks, terminal, whatever. Keep the slides handy, if possible.",
  "If you hit a bug or something breaks, keep it in. This is gonna be everything RAW.",
  "Share your raw file with us - we will create a teaser video, do basic editing if needed and will post on GroundZero YT. The distribution and amplification of groundzero on X/YT and our shared network will make it reach to wide audience.",
];

const resourceSections: ResourceSection[] = [
  {
    title: "Dedicated founder pages on the Ground Zero site",
    points: [
      "You will get your own page with SIGNALS episode(s), bio, links to your work, contact info",
      "Basically your portfolio page you can link to",
    ],
  },
  {
    title: "Written deep-dives/blog posts",
    points: [
      "Extract key insights from video into a written article on Ground Zero",
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
    ],
  },
  {
    title: "Connect you with relevant people",
    points: [
      "After your episode, actively intro to 2-3 people from network doing adjacent work",
      "This is probably bring more value.",
    ],
  },
];

const renderPointContent = (point: string): ReactNode => {
  if (point.includes('"resources from this episode"')) {
    return (
      <>
        If you mention tools, papers, code repos in session - compiling those into a &quot;
        <em>resources from this episode</em>
        &quot; section
      </>
    );
  }

  return point;
};

export default function FoundersSignalsPage() {
  return (
    <SignalsTemplate
      audienceType="founders"
      sessionStructure={sessionStructure}
      recordingTips={recordingTips}
      sessionTips={sessionTips}
      resourceSections={resourceSections}
      renderPointContent={renderPointContent}
    />
  );
}
