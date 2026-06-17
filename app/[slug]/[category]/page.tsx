import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getLocalizedGame, getLocalizedGames } from "@/lib/getLocalizedGames";
import { getAllGames, type Game } from "@/lib/games";import { getGameSlugs, CATEGORIES, type Category } from "@/lib/games";
import { getArticlesForGame } from "@/lib/articles";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";

type Props = {
  params: Promise<{ slug: string; category: string }>;
};
export function generateStaticParams() {
  const slugs = getGameSlugs();
  const params: { slug: string; category: string }[] = [];
  for (const slug of slugs) {
    for (const cat of CATEGORIES) {
      params.push({ slug, category: cat });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category } = await params;
  const game = await getLocalizedGame(slug, "en");
  if (!game) return {};

  const catLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const title = `${game.name} ${catLabel} — Guides, Tips & Strategies | Zosygo`;
  const description = `Comprehensive ${game.name} ${category} guides covering everything you need to know.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.zosygo.com/${slug}/${category}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.zosygo.com/${slug}/${category}`,
      siteName: "Zosygo",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: slug === "elden-ring",
      follow: true,
    },
  };
}

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  builds: "Optimized character builds for every playstyle, from beginner-friendly setups to min-maxed endgame configurations.",
  bosses: "Detailed boss strategy guides covering attack patterns, weaknesses, phase transitions, and recommended gear.",
  weapons: "Complete weapon coverage including stats, upgrade paths, best-in-slot picks, and build synergies.",
  walkthroughs: "Step-by-step walkthroughs guiding you through every quest, area, and encounter from start to finish.",
};

export default async function CategoryPage({ params }: Props) {
  const { slug, category } = await params;

  if (!CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const game = await getLocalizedGame(slug, "en");
  if (!game) {
    notFound();
  }

  const allGames = await getLocalizedGames("en");
  const otherGames = allGames.filter((g) => g.slug !== slug);
  const cat = category as Category;
  const catLabel = category.charAt(0).toUpperCase() + category.slice(1);

  const articles = getArticlesForGame(slug, category);
  const hasArticles = articles.length > 0;

  const siteUrl = "https://www.zosygo.com";
  const breadcrumb = [
    { name: "Zosygo", url: siteUrl },
    { name: game.name, url: `${siteUrl}/${slug}` },
    { name: catLabel, url: `${siteUrl}/${slug}/${category}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(breadcrumb)),
        }}
      />

      <section className="relative overflow-hidden border-b border-[#b8956a]/10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${game.accentGlow}, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
              <li>
                <Link href={`/`} className="text-[#b8956a]/80 hover:text-[#c9a227]">
                  Zosygo
                </Link>
              </li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li>
                <Link href={`/${slug}`} className="text-[#b8956a]/80 hover:text-[#c9a227]">
                  {game.name}
                </Link>
              </li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li className="text-zinc-500">{catLabel}</li>
            </ol>
          </nav>

          <h1
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            style={{ textShadow: `0 0 40px ${game.accentGlow}` }}
          >
            {game.name} {catLabel}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {CATEGORY_DESCRIPTIONS[cat]}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c !== cat).map((c) => (
              <Link
                key={c}
                href={`/${slug}/${c}`}
                className="rounded-sm border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
              >
                {game.name} {c.charAt(0).toUpperCase() + c.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {hasArticles ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                gameSlug={slug}
                
                accentColor={game.accentColor}
              />
            ))}
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white">
              {catLabel} Coming Soon
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
              We are building out comprehensive {game.name} {category} guides. Check back soon for detailed walkthroughs, build calculators, boss strategies, and weapon comparisons.
            </p>
          </>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c}
              category={c}
              gameSlug={slug}
              gameName={game.name}
              
              accentColor={game.accentColor}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-white">More Game Guides</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Explore guides for other games on Zosygo.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherGames.slice(0, 6).map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="group flex items-center gap-3 rounded-sm border border-white/10 bg-[#12121a] p-4 transition-colors hover:border-white/20"
              >
                <span
                  className="h-8 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: other.accentColor }}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white group-hover:underline">
                    {other.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-zinc-500">{other.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
