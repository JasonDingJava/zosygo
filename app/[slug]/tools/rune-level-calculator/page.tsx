import type { Metadata } from "next";
import RuneLevelClient from "./rune-level-client";

export const metadata: Metadata = {
  title: "Elden Ring Rune Level Calculator – Rune Cost & Level Planner (2026)",
  description:
    "Free Elden Ring Rune Level Calculator. Use as a Level Up Calculator, Rune Cost Calculator, and Character Level Planner. Find out how many runes from 1 to 150, 200, or any level.",
  openGraph: {
    title: "Elden Ring Rune Level Calculator – Rune Cost & Level Planner (2026)",
    description:
      "Free Elden Ring Rune Level Calculator. Use as a Level Up Calculator, Rune Cost Calculator, and Character Level Planner. See costs for level 150, 200, and more.",
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
      name: "Elden Ring Rune Level Calculator – Rune Cost & Level Planner (2026)",
      description:
        "Free Elden Ring Rune Level Calculator. Use as a Level Up Calculator, Rune Cost Calculator, and Character Level Planner. See rune costs for level 150, 200, or any target.",
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
        {
          "@type": "Question",
          name: "How many runes do I need for level 150?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "From level 1, you need approximately 12.5 million runes to reach level 150. From level 100, you need about 8.7 million more. Use this calculator to get the exact number for your current level.",
          },
        },
        {
          "@type": "Question",
          name: "What is the fastest rune farming method?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The fastest rune farming method in Elden Ring is using the Sacred Relic Sword's Wave of Gold at Palace Approach Ledge-Road, earning about 60,000 runes per 25-second run. Early-game alternatives include the Mohgwyn bird (17,500 runes per 15s) or Greyoll's Dragon (75,000 runes once).",
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