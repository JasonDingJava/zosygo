import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGames, getGameBySlug } from "@/lib/games";
import type { Metadata } from "next";

const GAME_TOOLS: Record<string, { name: string; description: string; href: string; icon: string }[]> = {
  "elden-ring": [
    {
      name: "Build Calculator",
      description: "Plan and optimize your Elden Ring character build. Allocate stats, pick weapons, and see real-time AR calculations with game-accurate formulas.",
      href: "/elden-ring/tools/build-calculator",
      icon: "⚔️",
    },
    {
      name: "Weapon AR Calculator",
      description: "Compare Attack Rating across all weapons. Set stats, upgrade level, and see scaling breakdown.",
      href: "/elden-ring/tools/weapon-ar-calculator",
      icon: "⚔️",
    },
    {
      name: "Rune Level Calculator",
      description: "Calculate runes needed for any level range from 1 to 713. See cost curves, farming estimates, and preset level targets.",
      href: "/elden-ring/tools/rune-level-calculator",
      icon: "💀",
    },
    {
      name: "Boss Weakness Finder",
      description: "Search boss weaknesses, resistances, and strategy recommendations. Coming soon.",
      href: "#",
      icon: "🐉",
    },
  ],
};

export function generateStaticParams() {
  const games = getAllGames();
  return games
    .filter((g) => GAME_TOOLS[g.slug]?.length)
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "elden-ring") return {};
  return {
    title: "Elden Ring Tools — Build Calculator, Weapon Guides & Boss Strategies",
    description: "Free Elden Ring tools including Build Calculator, weapon guides, and boss strategy resources. Plan your perfect build with game-accurate stat calculations.",
    openGraph: {
      title: "Elden Ring Tools — Build Calculator, Weapon Guides & Boss Strategies",
      description: "Free Elden Ring tools including Build Calculator, weapon guides, and boss strategy resources.",
    },
  };
}

const FAQ = [
  {
    q: "What Elden Ring tools are available?",
    a: "Three tools are live: the Elden Ring Build Calculator for full character planning, the Weapon AR Calculator for comparing 123 weapons' Attack Rating, and the Rune Level Calculator for planning rune costs from level 1 to 713. More tools coming soon.",
  },
  {
    q: "Is the Elden Ring Build Calculator accurate?",
    a: "Yes. The Build Calculator uses game-accurate formulas for HP, FP, Stamina, equip load, and weapon Attack Rating. The Weapon AR Calculator uses the same engine for weapon damage calculations. Soft caps and stat scaling match Elden Ring's actual in-game calculations.",
  },
  {
    q: "How do I use the Build Calculator?",
    a: "Select your starting class, adjust stat sliders (1-99), choose up to 3 weapons with upgrade levels, and view real-time results. You can save and share your build via URL.",
  },
  {
    q: "What weapons are in the Build Calculator?",
    a: "The calculator includes 123 weapons from all categories: straight swords, greatswords, katanas, curved swords, spears, hammers, axes, daggers, and more.",
  },
];

const RELATED_GUIDES = [
  { title: "Rune Level Calculator", href: "/elden-ring/tools/rune-level-calculator" },
  { title: "Weapon AR Calculator", href: "/elden-ring/tools/weapon-ar-calculator" },
  { title: "Best Dexterity Build", href: "/elden-ring/builds/elden-ring-pure-dex-bleed-build" },
  { title: "Moonveil Intelligence Build", href: "/elden-ring/builds/moonveil-intelligence-build" },
  { title: "Elden Ring Builds", href: "/elden-ring/builds" },
  { title: "Elden Ring Bosses", href: "/elden-ring/bosses" },
  { title: "Elden Ring Weapons", href: "/elden-ring/weapons" },
];

export default function ToolsPage({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const game = getGameBySlug(slug);
    if (!game) notFound();

    const tools = GAME_TOOLS[slug];
    if (!tools?.length) notFound();

    const isEldenRing = slug === "elden-ring";

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          name: "Elden Ring Tools",
          description: "Free Elden Ring tools including Build Calculator, weapon guides, and boss strategy resources.",
          url: "https://www.zosygo.com/elden-ring/tools",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zosygo.com" },
              { "@type": "ListItem", position: 2, name: "Elden Ring", item: "https://www.zosygo.com/elden-ring" },
              { "@type": "ListItem", position: 3, name: "Tools", item: "https://www.zosygo.com/elden-ring/tools" },
            ],
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {isEldenRing && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}

        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li><Link href={`/${slug}`} className="hover:underline" style={{ color: game.accentColor }}>{game.name}</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li className="text-zinc-500">Tools</li>
          </ol>
        </nav>

        {/* H1 + Hero */}
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {isEldenRing ? "Elden Ring Tools" : `${game.name} Tools`}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          {isEldenRing
            ? "Free Elden Ring tools to help you plan, optimize, and master your build. Create optimized builds, compare weapons, and explore boss strategies."
            : `Community-built tools to help you plan, optimize, and master ${game.name}.`}
        </p>

        {/* Tool Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => {
            if (tool.href === "#") {
              return (
                <div
                  key={tool.name}
                  className="group rounded-sm border border-white/5 bg-[#0a0a0f] p-6 opacity-60 cursor-default transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-2xl">{tool.icon}</span>
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-600">
                        {tool.name}
                        <span className="ml-3 inline-block rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">Coming Soon</span>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{tool.description}</p>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={tool.name}
                href={tool.href}
                className="group rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-6 transition-all hover:border-[#c9a227]/30 hover:bg-[#12121a]"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-2xl">{tool.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-white group-hover:text-[#e8d5a3]">{tool.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">{tool.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* SEO Content — Elden Ring only */}
        {isEldenRing && (
          <>
            <section className="mt-16 border-t border-[#b8956a]/10 pt-12">
              <h2 className="font-display text-2xl font-bold text-white">What Is the Elden Ring Build Calculator?</h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                The Elden Ring Build Calculator is a free online tool that lets you plan and optimize your character build for Elden Ring.
                With game-accurate formulas for stat calculations, weapon scaling, and equip load, you can experiment with different
                stat allocations, weapons, and starting classes without respeccing in-game.
              </p>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                Whether you are building a <Link href="/elden-ring/builds/elden-ring-pure-dex-bleed-build" className="text-[#c9a227] underline-offset-2 hover:underline">Dexterity bleed build</Link>,
                a <Link href="/elden-ring/builds/moonveil-intelligence-build" className="text-[#c9a227] underline-offset-2 hover:underline">Moonveil Intelligence build</Link>,
                or a pure Strength tank, the calculator gives you precise numbers for HP, FP, Stamina, equip load, and weapon Attack Rating.
                The tool supports 123 weapons across all categories with exact in-game scaling and soft cap mechanics.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-white">How To Use the Elden Ring Build Calculator</h2>
              <ol className="mt-6 space-y-4">
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/20 text-sm font-bold text-[#c9a227]">1</span>
                  <div>
                    <h3 className="font-semibold text-white">Choose Your Starting Class</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">Select from all 10 starting classes. Each class determines your base stats and starting level.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/20 text-sm font-bold text-[#c9a227]">2</span>
                  <div>
                    <h3 className="font-semibold text-white">Allocate Your Stats</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">Use the stat sliders to set Vigor, Mind, Endurance, Strength, Dexterity, Intelligence, Faith, and Arcane from 1 to 99. The calculator shows soft cap warnings when you pass key thresholds.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/20 text-sm font-bold text-[#c9a227]">3</span>
                  <div>
                    <h3 className="font-semibold text-white">Select Weapons</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">Choose up to 3 weapons from 123 options. Set upgrade levels (+0 to +25) and toggle two-handing to see the 1.5x Strength bonus.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/20 text-sm font-bold text-[#c9a227]">4</span>
                  <div>
                    <h3 className="font-semibold text-white">View Results &amp; Share</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">See real-time HP, FP, Stamina, equip load, and weapon Attack Rating. Share your build via URL with one click.</p>
                  </div>
                </li>
              </ol>
            </section>

            <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
              <h2 className="font-display text-2xl font-bold text-white">Recommended Builds</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link href="/elden-ring/builds/elden-ring-pure-dex-bleed-build" className="group rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-5 transition-all hover:border-[#c9a227]/30">
                  <h3 className="font-semibold text-white group-hover:text-[#e8d5a3]">Pure Dexterity Bleed Build</h3>
                  <p className="mt-1 text-sm text-zinc-500">High DPS bleed build using Rivers of Blood or Bloodhound's Fang. 60 Vigor, 80 Dexterity.</p>
                </Link>
                <Link href="/elden-ring/builds/moonveil-intelligence-build" className="group rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-5 transition-all hover:border-[#c9a227]/30">
                  <h3 className="font-semibold text-white group-hover:text-[#e8d5a3]">Moonveil Intelligence Build</h3>
                  <p className="mt-1 text-sm text-zinc-500">Intelligence-based samurai build using Moonveil katana. 50 Vigor, 80 Intelligence.</p>
                </Link>
                <Link href="/elden-ring/builds" className="group rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-5 transition-all hover:border-[#c9a227]/30">
                  <h3 className="font-semibold text-white group-hover:text-[#e8d5a3]">All Elden Ring Builds →</h3>
                  <p className="mt-1 text-sm text-zinc-500">Browse all builds including Strength, Faith, Arcane, and hybrid builds.</p>
                </Link>
              </div>
            </section>

            <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
              <h2 className="font-display text-2xl font-bold text-white">Frequently Asked Questions</h2>
              <div className="mt-6 space-y-4">
                {FAQ.map((item, i) => (
                  <details key={i} className="group rounded-sm border border-white/10 bg-[#12121a]">
                    <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#e8d5a3]">
                      {item.q}
                      <svg className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="border-t border-white/5 px-4 py-3">
                      <p className="text-sm leading-relaxed text-zinc-400">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
              <h2 className="font-display text-xl font-bold text-white">Related Guides</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {RELATED_GUIDES.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] px-4 py-2.5 text-sm font-medium text-[#e8d5a3] transition-all hover:border-[#c9a227]/30 hover:bg-[#12121a]"
                  >
                    {guide.title}
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    );
  });
}