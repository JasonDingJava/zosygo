import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getLocalizedGame } from "@/lib/getLocalizedGames";
import { getGameBySlug } from "@/lib/games";
import { generateBreadcrumbJsonLd, generateAlternateLanguages, generateFaqJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://www.zosygo.com";
const NIGHTREIGN_PATH = "/elden-ring/nightreign";
const NIGHTREIGN_URL = `${SITE_URL}${NIGHTREIGN_PATH}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "elden-ring") return {};

  const title = "Elden Ring Nightreign — Character Builds, Boss Guides & Walkthroughs | Zosygo";
  const description =
    "Comprehensive Elden Ring Nightreign guides covering FromSoftware's standalone co-op survival game. Character builds for all 8 heroes, boss strategies, weapon picks, relic upgrades, and 3-day cycle walkthroughs.";

  return {
    title,
    description,
    keywords: [
      "Elden Ring Nightreign",
      "Nightreign guides",
      "Nightreign builds",
      "Nightreign characters",
      "Nightreign Wylder build",
      "Nightreign Recluse build",
      "Nightreign bosses",
      "Nightreign weapons",
      "Nightreign walkthrough",
      "Elden Ring co-op survival",
      "FromSoftware Nightreign",
      "Nightreign tips",
      "Zosygo Nightreign",
    ],
    alternates: {
      canonical: NIGHTREIGN_URL,
      languages: generateAlternateLanguages(NIGHTREIGN_PATH),
    },
    openGraph: {
      title: "Elden Ring Nightreign — Complete Guide Hub | Zosygo",
      description:
        "Master Nightreign with detailed character builds for Wylder, Recluse, Duchess, Guardian, and more. Boss guides, weapon stats, and day-cycle strategies for FromSoftware's co-op roguelite.",
      url: NIGHTREIGN_URL,
      siteName: "Zosygo",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/elden-ring-og.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Elden Ring Nightreign — Complete Guide Hub | Zosygo",
      description:
        "Character builds, boss guides, weapons, and walkthroughs for Nightreign — the co-op survival game from FromSoftware.",
      images: [`${SITE_URL}/images/elden-ring-og.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const NIGHTREIGN_CATEGORIES = [
  {
    slug: "builds",
    label: "Character Builds",
    description:
      "Optimized builds for all 8 Nightreign characters — Wylder, Recluse, Duchess, Guardian, Ironeye, Dutiful, Seeker, and Wildcard. Find the perfect fit for your team.",
    icon: "⚔️",
  },
  {
    slug: "bosses",
    label: "Boss Guides",
    description:
      "Day 3 boss strategies covering attack patterns, phase transitions, and team coordination. Includes the Nightlord and other cycle-ending encounters.",
    icon: "👹",
  },
  {
    slug: "weapons",
    label: "Weapons & Gear",
    description:
      "Nightreign weapon stats, upgrade paths, and synergy guides. Learn which weapons pair best with each character's unique abilities.",
    icon: "🗡️",
  },
  {
    slug: "walkthroughs",
    label: "Walkthroughs",
    description:
      "Step-by-step guides through the 3-day cycle — map routes, relic priorities, upgrade strategies, and how to survive the closing circle.",
    icon: "📜",
  },
];

export default async function NightreignPage({ params }: Props) {
  const { slug } = await params;

  if (slug !== "elden-ring") {
    notFound();
  }

  const game = getGameBySlug("elden-ring");
  if (!game) {
    notFound();
  }

  const accentColor = "#c9a227";
  const accentGlow = "rgba(201, 162, 39, 0.35)";

  const siteUrl = "https://www.zosygo.com";
  const breadcrumb = [
    { name: "Zosygo", url: siteUrl },
    { name: game.name, url: `${siteUrl}/elden-ring` },
    { name: "Nightreign", url: `${siteUrl}/elden-ring/nightreign` },
  ];

  const jsonLdSchemas = [
    generateBreadcrumbJsonLd(breadcrumb),
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Elden Ring: Nightreign",
      description:
        "A standalone co-op survival game set in a fractured version of the Lands Between. Up to 3 players choose from 8 unique characters with distinct abilities to survive a 3-day cycle of exploration and boss fights.",
      applicationCategory: "GameApplication",
      operatingSystem: "Windows, PlayStation 5, Xbox Series X|S",
      author: {
        "@type": "Organization",
        name: "FromSoftware",
      },
      publisher: {
        "@type": "Organization",
        name: "Bandai Namco Entertainment",
      },
      offers: {
        "@type": "Offer",
        price: "39.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      image: `${siteUrl}/images/elden-ring-og.jpg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Elden Ring Nightreign Guides",
      description: "Character builds, boss guides, weapon coverage, and walkthroughs for Nightreign.",
      url: `${siteUrl}/elden-ring/nightreign`,
      itemListElement: NIGHTREIGN_CATEGORIES.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Nightreign ${cat.label}`,
        url: `${siteUrl}/elden-ring/nightreign/${cat.slug}`,
      })),
    },
    generateFaqJsonLd([
      {
        question: "Do I need to own Elden Ring to play Nightreign?",
        answer: "No. Nightreign is a standalone title that does not require Elden Ring. It is available for individual purchase at $39.99 on Windows, PlayStation 5, and Xbox Series X|S.",
      },
      {
        question: "How many players can play Nightreign?",
        answer: "Nightreign supports up to 3 players in co-op. Matches can also be played solo or with 2 players, though the difficulty is tuned for teams of 3.",
      },
      {
        question: "How does the 3-day cycle work?",
        answer: "Each match consists of 3 in-game days. During Day 1 and Day 2, players explore the map, fight enemies, find weapons, level up, and collect Runes. As each day progresses, a closing circle shrinks the playable area. On Day 3, a final boss spawns. Defeating the boss completes the run.",
      },
      {
        question: "How many characters are in Nightreign?",
        answer: "There are 8 playable characters: Wylder (all-rounder swordsman), Recluse (magic user), Duchess (agile assassin), Guardian (heavy tank), Ironeye (ranged specialist), Dutiful (support hybrid), Seeker (speed-focused scout), and Wildcard (random ability character).",
      },
      {
        question: "Are there permanent upgrades in Nightreign?",
        answer: "Yes. Runes earned during runs can be spent on Relics — permanent upgrades that persist across sessions. Relics provide stat boosts, new starting equipment, or unlock special abilities.",
      },
      {
        question: "Is Nightreign coming to last-gen consoles?",
        answer: "Nightreign is confirmed for Windows, PlayStation 5, and Xbox Series X|S. There is no announced support for PlayStation 4 or Xbox One at this time.",
      },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchemas),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#b8956a]/10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${accentGlow}, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
              <li>
                <Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">
                  Zosygo
                </Link>
              </li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li>
                <Link
                  href="/elden-ring"
                  className="text-[#b8956a]/80 hover:text-[#c9a227]"
                >
                  Elden Ring
                </Link>
              </li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li className="text-zinc-500">Nightreign</li>
            </ol>
          </nav>

          <div className="flex flex-wrap gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
                border: `1px solid ${accentColor}33`,
              }}
            >
              Standalone Expansion
            </span>
            <span
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
                border: `1px solid ${accentColor}33`,
              }}
            >
              Co-op Survival
            </span>
            <span
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
                border: `1px solid ${accentColor}33`,
              }}
            >
              Roguelite
            </span>
          </div>

          <h1
            className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ textShadow: `0 0 80px ${accentGlow}` }}
          >
            Elden Ring: Nightreign
          </h1>

          <p
            className="mt-4 text-lg font-medium italic sm:text-xl"
            style={{ color: accentColor }}
          >
            Survive the night. Conquer the cycle.
          </p>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Nightreign is a standalone co-op survival game set in a fractured version
            of the Lands Between. Up to 3 players choose from 8 unique characters,
            each with their own abilities and ultimate skills, to survive a 3-day cycle
            of exploration and boss fights. Think Elden Ring meets roguelite — with a
            shrinking circle keeping the pressure on.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Developer
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">FromSoftware</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Publisher
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">Bandai Namco</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Release
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">2025</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Price
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">$39.99</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/elden-ring/nightreign/builds"
              className="inline-flex h-14 items-center justify-center rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-8 text-base font-bold uppercase tracking-wider text-black shadow-[0_0_40px_rgba(251,191,36,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)]"
            >
              ⚔️ Browse Builds
            </Link>
            <Link
              href="/elden-ring/nightreign/bosses"
              className="inline-flex h-14 items-center justify-center rounded-sm border border-[#b8956a]/30 px-8 text-base font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:border-[#c9a227]/50"
            >
              👹 Boss Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Nightreign Guides
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Everything you need to master the 3-day cycle, from character builds to
          final boss strategies.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NIGHTREIGN_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/elden-ring/nightreign/${cat.slug}`}
              className="group relative overflow-hidden rounded-sm border border-white/10 bg-[#12121a] p-6 transition-all hover:border-white/20 hover:bg-[#1a1a24]"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse 120% 80% at 50% -10%, ${accentGlow}, transparent 70%)`,
                }}
              />
              <div className="relative">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-white group-hover:underline">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#b8956a]/10">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Nightreign FAQ
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Frequently asked questions about Elden Ring Nightreign.
          </p>
          <div className="mt-8 space-y-4">
            <details className="group rounded-sm border border-white/10 bg-[#12121a]">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#c9a227]">
                Do I need to own Elden Ring to play Nightreign?
                <svg className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-white/5 px-4 py-3">
                <p className="text-sm leading-relaxed text-zinc-400">No. Nightreign is a standalone title that does not require Elden Ring. It is available for individual purchase at $39.99 on Windows, PlayStation 5, and Xbox Series X|S.</p>
              </div>
            </details>
            <details className="group rounded-sm border border-white/10 bg-[#12121a]">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#c9a227]">
                How many players can play Nightreign?
                <svg className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-white/5 px-4 py-3">
                <p className="text-sm leading-relaxed text-zinc-400">Nightreign supports up to 3 players in co-op. Matches can also be played solo or with 2 players, though the difficulty is tuned for teams of 3.</p>
              </div>
            </details>
            <details className="group rounded-sm border border-white/10 bg-[#12121a]">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#c9a227]">
                How does the 3-day cycle work?
                <svg className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-white/5 px-4 py-3">
                <p className="text-sm leading-relaxed text-zinc-400">Each match consists of 3 in-game days. During Day 1 and Day 2, players explore the map, fight enemies, find weapons, level up, and collect Runes. As each day progresses, a closing circle shrinks the playable area. On Day 3, a final boss (the Nightlord or another cycle-ending encounter) spawns. Defeating the boss completes the run, while death ends the session.</p>
              </div>
            </details>
            <details className="group rounded-sm border border-white/10 bg-[#12121a]">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#c9a227]">
                How many characters are in Nightreign?
                <svg className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-white/5 px-4 py-3">
                <p className="text-sm leading-relaxed text-zinc-400">There are 8 playable characters in Nightreign: Wylder (all-rounder swordsman), Recluse (magic user), Duchess (agile assassin), Guardian (heavy tank), Ironeye (ranged specialist), Dutiful (support hybrid), Seeker (speed-focused scout), and Wildcard (random ability character). Each has unique weapons, skills, and an Ultimate ability.</p>
              </div>
            </details>
            <details className="group rounded-sm border border-white/10 bg-[#12121a]">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#c9a227]">
                Are there permanent upgrades in Nightreign?
                <svg className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-white/5 px-4 py-3">
                <p className="text-sm leading-relaxed text-zinc-400">Yes. Runes earned during runs can be spent on Relics — permanent upgrades that persist across sessions. Relics provide stat boosts, new starting equipment, or unlock special abilities. This roguelite progression system encourages repeated playthroughs.</p>
              </div>
            </details>
            <details className="group rounded-sm border border-white/10 bg-[#12121a]">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#c9a227]">
                Is Nightreign coming to last-gen consoles?
                <svg className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-white/5 px-4 py-3">
                <p className="text-sm leading-relaxed text-zinc-400">Nightreign is confirmed for Windows, PlayStation 5, and Xbox Series X|S. There is no announced support for PlayStation 4 or Xbox One at this time.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* About Nightreign */}
      <section className="border-t border-[#b8956a]/10 bg-[#0a0a12]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            About Elden Ring: Nightreign
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400">
            <p>
              <strong className="text-white">Elden Ring: Nightreign</strong> is a standalone
              cooperative survival game developed by FromSoftware and published by Bandai
              Namco Entertainment. Unlike the base game, Nightreign is designed exclusively
              for up to 3 players working together to survive a 3-day cycle of exploration,
              combat, and boss encounters.
            </p>
            <p>
              The game features <strong className="text-white">8 unique characters</strong> —
              Wylder, Recluse, Duchess, Guardian, Ironeye, Dutiful, Seeker, and Wildcard —
              each with their own signature weapons, unique abilities, and powerful Ultimate
              skills. The map is a fractured version of Limgrave that shifts each session,
              with a closing circle similar to battle royale games that forces players
              toward the Day 3 boss arena.
            </p>
            <p>
              Between rounds, players spend Runes on permanent upgrades called Relics,
              unlock new weapons, and discover synergies between character abilities.
              The game costs <strong className="text-white">$39.99</strong> and does not
              require ownership of the original Elden Ring.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Elden Ring */}
      <section className="border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-lg font-bold text-white">
                Looking for the main game?
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Return to the full Elden Ring guide hub for builds, bosses, weapons,
                and walkthroughs for the base game.
              </p>
            </div>
            <Link
              href="/elden-ring"
              className="shrink-0 rounded-sm border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
            >
              ← Back to Elden Ring
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
