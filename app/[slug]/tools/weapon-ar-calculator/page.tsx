import type { Metadata } from "next";
import WeaponARPage from "./weapon-ar-client";

export const metadata: Metadata = {
  title: "Elden Ring Weapon AR Calculator & Damage Scaling Tool — Compare All 123 Weapons",
  description:
    "Elden Ring Weapon AR Calculator & Damage Scaling Tool. Compare Attack Rating, optimize weapon damage, and find the best weapon damage setup for your build. Use as a Damage Calculator and Weapon Scaling Calculator.",
  openGraph: {
    title: "Elden Ring Weapon AR Calculator & Damage Scaling Tool",
    description:
      "Compare AR across all Elden Ring weapons. Real-time stat scaling, upgrade levels, and damage type breakdown. Use as a Damage Calculator and Weapon Scaling Calculator.",
    type: "website",
  },
  alternates: {
    canonical: "/elden-ring/tools/weapon-ar-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Elden Ring Weapon AR Calculator & Damage Scaling Tool",
      description:
        "Compare Attack Rating and damage scaling for all 123 Elden Ring weapons. Optimize weapon damage setups, compare scaling across builds. Use as a Damage Calculator and Weapon Scaling Calculator.",
      url: "https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a Weapon AR Calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An Attack Rating (AR) Calculator shows how much damage a weapon deals based on your stats, upgrade level, and weapon scaling. It calculates physical and elemental damage separately for every weapon in Elden Ring.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use the Weapon AR Calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Set your Strength, Dexterity, Intelligence, Faith, and Arcane stats using the sliders, then adjust the upgrade level and two-handing toggle. The table instantly updates to show every weapon's Attack Rating. Check multiple weapons to compare their AR side by side.",
          },
        },
        {
          "@type": "Question",
          name: "How many weapons are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All 123 Elden Ring weapons are supported, including straight swords, greatswords, katanas, curved swords, spears, hammers, axes, daggers, colossal weapons, and more. Each weapon's scaling, stat requirements, and upgrade multipliers are game-accurate.",
          },
        },
        {
          "@type": "Question",
          name: "Does the calculator include two-handing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Toggle two-handing on and your Strength stat is multiplied by 1.5x for meeting requirements and calculating damage scaling, just like in Elden Ring.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between AR and actual damage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Attack Rating (AR) is the weapon's raw damage before enemy defenses. Actual damage depends on the target's damage negation and resistances. The calculator shows AR so you can compare weapons against each other directly.",
          },
        },
        {
          "@type": "Question",
          name: "How is weapon damage calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Weapon damage is calculated from the weapon's base damage, its stat scaling multipliers (based on STR/DEX/INT/FTH/ARC), and your current stats. Upgrade level increases both base damage and scaling. Two-handing multiplies your Strength by 1.5x for scaling calculations.",
          },
        },
        {
          "@type": "Question",
          name: "What is scaling in Elden Ring?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scaling determines how much bonus damage you get from your stats. Each weapon has scaling grades (S/A/B/C/D/E) for Strength, Dexterity, Intelligence, Faith, and Arcane. Higher grades and higher stats give more bonus damage. Scaling improves as you upgrade the weapon.",
          },
        },
        {
          "@type": "Question",
          name: "Why is my damage low?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Low damage is usually caused by mismatched stats and weapon scaling. If your weapon scales primarily with Strength but you invested in Dexterity, you'll deal less damage. Check the weapon's scaling grades and ensure your stats align. Also check that you've upgraded the weapon and meet the stat requirements.",
          },
        },
      ],
    },
  ],
};

export default function WeaponARPageWrapper() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WeaponARPage />
    </>
  );
}
