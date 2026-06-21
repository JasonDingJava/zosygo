import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGameBySlug } from "@/lib/games";
import { getArticlesForGame } from "@/lib/articles";
import { generateBreadcrumbJsonLd, generateAlternateLanguages } from "@/lib/seo";
import ArticleCard from "@/components/ArticleCard";

type Props = {
  params: Promise<{ slug: string; category: string }>;
};

const SITE_URL = "https://www.zosygo.com";

const NIGHTREIGN_CATEGORIES = ["builds", "bosses", "weapons", "walkthroughs"] as const;

const TITLE_TEMPLATES: Record<string, string> = {
  builds: "Elden Ring Nightreign Character Builds — Best Builds for Every Hero | Zosygo",
  bosses: "Elden Ring Nightreign Boss Guides — Nightlord & All Boss Strategies | Zosygo",
  weapons: "Elden Ring Nightreign Weapons — Stats, Upgrades & Best Gear | Zosygo",
  walkthroughs: "Elden Ring Nightreign Walkthrough — 3-Day Cycle Complete Guide | Zosygo",
};

const DESCRIPTION_TEMPLATES: Record<string, string> = {
  builds:
    "Discover the best Elden Ring Nightreign character builds for Wylder, Recluse, Duchess, Guardian, Ironeye, Dutiful, Seeker, and Wildcard. Team compositions, relic setups, ultimate skill synergies, and top-tier strategies for FromSoftware's co-op roguelite.",
  bosses:
    "Complete Elden Ring Nightreign boss guide covering all Day 3 encounters including the Nightlord. Detailed attack patterns, phase transitions, team coordination strategies, and recommended character picks for every boss fight.",
  weapons:
    "Complete Elden Ring Nightreign weapons guide covering stats, upgrade paths, and best-in-slot picks. Learn which weapons synergize best with each character's unique abilities and relic upgrades.",
  walkthroughs:
    "Step-by-step Elden Ring Nightreign walkthrough covering the full 3-day cycle. Map routes, relic priorities, upgrade strategies, circle survival tips, and everything you need to beat the Nightlord.",
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  builds: [
    "Nightreign character builds",
    "Nightreign Wylder build",
    "Nightreign Recluse build",
    "Nightreign Duchess build",
    "Nightreign Guardian build",
    "Nightreign Ironeye build",
    "Nightreign Dutiful build",
    "Nightreign Seeker build",
    "Nightreign Wildcard build",
    "Nightreign team comps",
    "Nightreign relic setups",
    "best Nightreign characters",
  ],
  bosses: [
    "Nightreign bosses",
    "Nightreign boss guide",
    "Nightreign Nightlord",
    "Nightreign day 3 boss",
    "Nightreign boss strategies",
    "Nightreign phase transitions",
    "Nightreign co-op boss fights",
    "Elden Ring Nightreign bosses",
  ],
  weapons: [
    "Nightreign weapons",
    "Nightreign weapon guide",
    "Nightreign weapon stats",
    "Nightreign best weapons",
    "Nightreign weapon upgrades",
    "Nightreign relic weapons",
    "Nightreign weapon synergies",
  ],
  walkthroughs: [
    "Nightreign walkthrough",
    "Nightreign day cycle guide",
    "Nightreign 3-day cycle",
    "Nightreign map routes",
    "Nightreign relic priorities",
    "Nightreign upgrade strategy",
    "Nightreign survival guide",
    "Elden Ring Nightreign guide",
  ],
};

const CATEGORY_DATA: Record<string, { label: string; description: string; content: string }> = {
  builds: {
    label: "Character Builds",
    description:
      "Optimized builds for all 8 Nightreign characters — Wylder, Recluse, Duchess, Guardian, Ironeye, Dutiful, Seeker, and Wildcard. Find the perfect fit for your team.",
    content:
      "Nightreign features 8 distinct playable characters, each with unique weapons, skills, and Ultimate abilities. Our character build guides break down every hero's strengths, optimal relic setups, stat priorities, and team synergies. Whether you prefer the aggressive Wylder, the tactical Recluse, or the versatile Wildcard, find the perfect build to survive the 3-day cycle. We also cover the best team compositions for 3-player co-op, explaining which character combos work best against specific bosses and map layouts.",
  },
  bosses: {
    label: "Boss Guides",
    description:
      "Day 3 boss strategies covering attack patterns, phase transitions, and team coordination. Includes the Nightlord and other cycle-ending encounters.",
    content:
      "Nightreign's Day 3 boss encounters are the ultimate test of teamwork and preparation. Our boss guides cover every cycle-ending enemy, including the Nightlord and other final encounters. Each guide details attack patterns, phase transitions, safe zones, and recommended team compositions. Learn how to position during each phase, when to use Ultimate abilities, and which character picks give you the best chance of victory. We also cover the optional mini-bosses that appear during Day 1 and Day 2 exploration.",
  },
  weapons: {
    label: "Weapons & Gear",
    description:
      "Nightreign weapon stats, upgrade paths, and synergy guides. Learn which weapons pair best with each character's unique abilities.",
    content:
      "Weapons in Nightreign are found during exploration, each run offering a different pool of gear to discover. Our weapon guides cover all available weapon types, including their stats, upgrade paths, and best-in-slot picks for each character. Learn which weapons synergize with Wylder's aggressive playstyle, which ranged options complement Ironeye's kit, and how to identify the most valuable relic upgrades for your build. We also rank the best weapons for each character and explain the upgrade materials you should prioritize.",
  },
  walkthroughs: {
    label: "Walkthroughs",
    description:
      "Step-by-step guides through the 3-day cycle — map routes, relic priorities, upgrade strategies, and how to survive the closing circle.",
    content:
      "Mastering Nightreign's 3-day cycle requires efficient routing, smart resource management, and coordinated team movement. Our walkthroughs provide step-by-step strategies for every phase of a run. Learn optimal Day 1 and Day 2 exploration routes that maximize loot and XP gain while staying ahead of the closing circle. Understand which relic upgrades to prioritize, how to manage your team's Runes, and when to push for boss fights vs. continue farming. Survive the night, conquer the cycle, and beat the Nightlord.",
  },
};

export function generateStaticParams() {
  const params: { slug: string; category: string }[] = [];
  for (const cat of NIGHTREIGN_CATEGORIES) {
    params.push({ slug: "elden-ring", category: cat });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category } = await params;
  if (slug !== "elden-ring" || !NIGHTREIGN_CATEGORIES.includes(category as any)) return {};

  const title = TITLE_TEMPLATES[category] ?? `Elden Ring Nightreign ${CATEGORY_DATA[category].label} | Zosygo`;
  const description = DESCRIPTION_TEMPLATES[category] ?? CATEGORY_DATA[category].description;
  const canonical = `${SITE_URL}/elden-ring/nightreign/${category}`;
  const path = `/elden-ring/nightreign/${category}`;

  return {
    title,
    description,
    keywords: CATEGORY_KEYWORDS[category] ?? [
      `Nightreign ${category}`,
      `Elden Ring Nightreign ${category}`,
      "Nightreign guide",
      "Zosygo Nightreign",
    ],
    alternates: {
      canonical,
      languages: generateAlternateLanguages(path),
    },
    openGraph: {
      title: `Elden Ring Nightreign ${CATEGORY_DATA[category].label}`,
      description,
      url: canonical,
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
      title: `Elden Ring Nightreign ${CATEGORY_DATA[category].label}`,
      description,
      images: [`${SITE_URL}/images/elden-ring-og.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function NightreignCategoryPage({ params }: Props) {
  const { slug, category } = await params;

  if (slug !== "elden-ring" || !NIGHTREIGN_CATEGORIES.includes(category as any)) {
    notFound();
  }

  const game = getGameBySlug("elden-ring");
  if (!game) notFound();

  const catData = CATEGORY_DATA[category];
  const catLabel = catData.label;
  const accentColor = "#c9a227";
  const accentGlow = "rgba(201, 162, 39, 0.35)";

  const articles = getArticlesForGame("nightreign", category);

  const breadcrumb = [
    { name: "Zosygo", url: SITE_URL },
    { name: "Elden Ring", url: `${SITE_URL}/elden-ring` },
    { name: "Nightreign", url: `${SITE_URL}/elden-ring/nightreign` },
    { name: catLabel, url: `${SITE_URL}/elden-ring/nightreign/${category}` },
  ];

  const jsonLdSchemas = [
    generateBreadcrumbJsonLd(breadcrumb),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Elden Ring Nightreign ${catLabel}`,
      description: catData.description,
      url: `${SITE_URL}/elden-ring/nightreign/${category}`,
      itemListElement: articles.map((article, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: article.title,
        url: `${SITE_URL}/elden-ring/${article.slug}`,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchemas),
        }}
      />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-[#b8956a]/10">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${accentGlow}, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
              <li>
                <Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Zosygo</Link>
              </li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li>
                <Link href="/elden-ring" className="text-[#b8956a]/80 hover:text-[#c9a227]">Elden Ring</Link>
              </li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li>
                <Link href="/elden-ring/nightreign" className="text-[#b8956a]/80 hover:text-[#c9a227]">Nightreign</Link>
              </li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li className="text-zinc-500">{catLabel}</li>
            </ol>
          </nav>

          <h1
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            style={{ textShadow: `0 0 40px ${accentGlow}` }}
          >
            Nightreign {catLabel}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {catData.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {NIGHTREIGN_CATEGORIES.filter((c) => c !== category).map((c) => (
              <Link
                key={c}
                href={`/elden-ring/nightreign/${c}`}
                className="rounded-sm border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
              >
                Nightreign {CATEGORY_DATA[c].label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {articles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                gameSlug="elden-ring"
                accentColor={accentColor}
              />
            ))}
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white">{catLabel} Coming Soon</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
              We are building out comprehensive Nightreign {category} guides. Check
              back soon for detailed character builds, boss strategies, weapon comparisons, and walkthroughs.
            </p>
          </>
        )}

        {/* Other category links */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NIGHTREIGN_CATEGORIES.filter((c) => c !== category).map((c) => (
            <Link
              key={c}
              href={`/elden-ring/nightreign/${c}`}
              className="group relative overflow-hidden rounded-sm border border-white/10 bg-[#12121a] p-5 transition-all hover:border-white/20 hover:bg-[#1a1a24]"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse 120% 80% at 50% -10%, ${accentGlow}, transparent 70%)` }}
              />
              <div className="relative">
                <h3 className="text-sm font-bold text-white group-hover:underline">
                  {CATEGORY_DATA[c].label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {CATEGORY_DATA[c].description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Introduction (placed below articles) */}
      <section className="border-t border-[#b8956a]/10 bg-[#0a0a12]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            About Nightreign {catLabel}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400">
            {catData.content.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Back */}
      <section className="border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/elden-ring/nightreign"
            className="text-sm font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-[#c9a227]"
          >
            ← Back to Nightreign
          </Link>
        </div>
      </section>
    </>
  );
}
