import type { Metadata } from "next";
import WeaponARPage from "./weapon-ar-client";

export const metadata: Metadata = {
  title: "Elden Ring Weapon AR Calculator 2026 – Damage & Attack Rating Optimizer",
  description:
    "Calculate Elden Ring weapon Attack Rating, damage output, and scaling efficiency. Compare weapons, stats, upgrades, and infusions to find the strongest build for your character.",
  openGraph: {
    title: "Elden Ring Weapon AR Calculator 2026 – Damage & Attack Rating Optimizer",
    description:
      "Calculate Elden Ring weapon Attack Rating, damage output, and scaling efficiency. Compare weapons, stats, upgrades, and infusions to find the strongest build for your character.",
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
      name: "Elden Ring Weapon AR Calculator 2026 – Damage & Attack Rating Optimizer",
      description:
        "Calculate Elden Ring weapon Attack Rating, damage output, and scaling efficiency. Compare weapons, stats, upgrades, and infusions to find the strongest build for your character.",
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
          name: "What Is Attack Rating (AR) in Elden Ring?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Attack Rating (AR) is a weapon's total damage value before enemy defenses are applied. AR includes base weapon damage, upgrade level bonuses, and stat scaling from Strength, Dexterity, Intelligence, Faith, and Arcane. A weapon with higher AR does not always deal more real damage because enemy defenses and damage types affect the final result.",
          },
        },
        {
          "@type": "Question",
          name: "How Does the Elden Ring Weapon AR Calculator Work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The calculator uses Elden Ring weapon scaling formulas to estimate Attack Rating. The calculation considers weapon base damage, upgrade level, scaling coefficients, stat values, soft cap reductions, and two-handed Strength bonus. This allows you to test different builds without wasting upgrade materials.",
          },
        },
        {
          "@type": "Question",
          name: "What Does Weapon Scaling Mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Weapon scaling shows how much bonus damage a weapon receives from your attributes. Scaling grades range from S (excellent) to E (minimal). A weapon with high Strength scaling benefits from STR investment, while a weapon with high Intelligence scaling benefits from INT.",
          },
        },
        {
          "@type": "Question",
          name: "Why Does Two-Handing Increase Weapon Damage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Two-handing increases your effective Strength by 50%. For example, a character with 60 Strength becomes 90 effective Strength while two-handing. This increases AR on Strength-scaling weapons but does not affect Dexterity, Intelligence, Faith, or Arcane scaling.",
          },
        },
        {
          "@type": "Question",
          name: "Is AR the Same as Actual Damage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. AR represents your weapon's raw damage before enemy defenses. Actual damage depends on enemy resistance, damage type, armor absorption, and boss weaknesses. For example, a weapon with high Holy AR may perform poorly against enemies with strong Holy resistance.",
          },
        },
        {
          "@type": "Question",
          name: "How Many Weapons Does This Tool Support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The calculator supports 123 Elden Ring weapons, including greatswords, colossal swords, katanas, curved swords, spears, daggers, axes, hammers, twinblades, claws, fists, whips, bows, and more.",
          },
        },
        {
          "@type": "Question",
          name: "Can This Be Used as an Elden Ring Damage Calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The tool works as an Elden Ring damage comparison calculator by showing weapon Attack Rating under different stat setups. Use it to compare different weapons, builds, upgrade levels, and stat distributions. For exact boss damage, enemy defense and damage modifiers must also be considered.",
          },
        },
        {
          "@type": "Question",
          name: "Why Is My Weapon Damage Low?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Common reasons include: wrong stat investment (e.g., using a Strength weapon with mostly Dexterity), weapon upgrade too low, ignoring scaling benefits, and poor stat efficiency from investing beyond soft caps.",
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
