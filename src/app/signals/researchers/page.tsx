"use client";

import SignalsTemplate, {
  ExternalLink,
  type ResourceSection,
} from "@/components/signals/SignalsTemplate";
import type { ReactNode } from "react";

const sessionStructure = [
  "We are structuring the sessions for an hour (we can add ~20mins, if you feel the need while shooting/recording)",
  "The starting minutes can be a hook to what are you building and why should anyone care? I guess, creating slides (with text and animations) will make it more aligned.",
  "Next could be describing the core idea - let's say breaking down what you're actually doing. Assume technical audience but don't assume they know your specific domain. You can show code, papers, diagrams - whatever makes it clear.",
  "We can push more towards what isn't talk most of the time - your thought process while working on it, the fallbacks, ifs and buts or any interesting moment you have seen in the process or want to talk about.",
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

const resourceSections: ResourceSection[] = [
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

  if (point.includes("groundzeroai.in")) {
    return (
      <>
        Research paper breakdowns published on{" "}
        <ExternalLink href="https://groundzeroai.in">groundzeroai.in</ExternalLink> to extend
        long-form reach
      </>
    );
  }

  return point;
};

export default function ResearchersSignalsPage() {
  return (
    <SignalsTemplate
      audienceType="researchers"
      sessionStructure={sessionStructure}
      recordingTips={recordingTips}
      resourceSections={resourceSections}
      renderPointContent={renderPointContent}
    />
  );
}
