import type { Metadata } from "next";
import WeaponARPage from "./weapon-ar-client";

export const metadata: Metadata = {
  title: "Elden Ring Weapon AR Calculator — Compare 123 Weapons Attack Rating",
  description:
    "Calculate and compare Attack Rating for all 123 Elden Ring weapons. Adjust stats, upgrade level, two-handing, and see real-time physical/elemental AR breakdowns with scaling info.",
  openGraph: {
    title: "Elden Ring Weapon AR Calculator",
    description:
      "Compare AR across all Elden Ring weapons. Real-time stat scaling, upgrade levels, and damage type breakdown.",
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
      name: "Elden Ring Weapon AR Calculator",
      description:
        "Calculate and compare Attack Rating for all 123 Elden Ring weapons. Adjust stats, upgrade level, two-handing, and see real-time physical/elemental AR breakdowns with scaling info.",
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
