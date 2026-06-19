import type { Metadata } from "next";
import RuneLevelClient from "./rune-level-client";

export const metadata: Metadata = {
  title: "Elden Ring Rune Level Calculator — Cost from 1 to 713",
  description:
    "Calculate runes needed to level up in Elden Ring. Single level, level range, target level costs, farming time estimates, and interactive cost curve chart.",
  openGraph: {
    title: "Elden Ring Rune Level Calculator",
    description:
      "Calculate runes needed for any level range. Interactive cost chart, farming time estimates, and preset target levels.",
    type: "website",
  },
  alternates: {
    canonical: "/elden-ring/tools/rune-level-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Elden Ring Rune Level Calculator",
      description:
        "Calculate runes needed to level up in Elden Ring. Supports single level, level range, farming time estimates, and interactive cost curve chart.",
      url: "https://www.zosygo.com/elden-ring/tools/rune-level-calculator",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many runes does it take to level up in Elden Ring?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rune cost increases with each level. Level 2 costs 673 runes, level 50 costs about 12,900, and level 713 (max) costs over 1.7 billion total.",
          },
        },
        {
          "@type": "Question",
          name: "How many runes from level 1 to 100?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It takes approximately 3.8 million runes to reach level 100 from level 1.",
          },
        },
        {
          "@type": "Question",
          name: "How many runes from level 1 to 150?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It takes approximately 12.5 million runes to reach level 150 from level 1.",
          },
        },
        {
          "@type": "Question",
          name: "What is the max level in Elden Ring?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The max level is 713 (all stats at 99). This requires over 1.7 billion runes total.",
          },
        },
        {
          "@type": "Question",
          name: "How many runes per level at level 150?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "At level 150, each subsequent level costs approximately 170,000-180,000 runes.",
          },
        },
      ],
    },
  ],
};

export default function RuneLevelPageWrapper() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RuneLevelClient />
    </>
  );
}