import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";
import fs from "fs";
import path from "path";
import { getLocalizedGame, getLocalizedGames } from "@/lib/getLocalizedGames";
import { getGameSlugs, CATEGORIES } from "@/lib/games";
import { getArticleBySlug, getArticlesForGame } from "@/lib/articles";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import ContentParagraphs from "@/components/ContentParagraphs";

// Deterministic random selection based on article slug
function pickRandomImages(articleSlug: string, count: number, gameSlug?: string): string[] {
  // Use article slug as seed for deterministic selection
  let hash = 0;
  for (let i = 0; i < articleSlug.length; i++) {
    const chr = articleSlug.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }

  // Try game-specific directory first, then fall back to articles/
  const dirsToTry = gameSlug
    ? [path.join(process.cwd(), "public", "images", gameSlug), path.join(process.cwd(), "public", "images", "articles")]
    : [path.join(process.cwd(), "public", "images", "articles")];

  let files: string[] = [];
  for (const dir of dirsToTry) {
    try {
      files = fs.readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i));
      if (files.length > 0) break;
    } catch {
      continue;
    }
  }

  if (files.length === 0) return [];

  // Fisher-Yates shuffle seeded with the hash
  const shuffled = [...files];
  let seed = Math.abs(hash);
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 16807) % 2147483647;
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Determine which images directory to use for a given game
function getImageDir(gameSlug: string): string {
  const gameDir = path.join(process.cwd(), "public", "images", gameSlug);
  if (fs.existsSync(gameDir)) {
    return `/images/${gameSlug}`;
  }
  return "/images/articles";
}

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
    category: string;
    article: string;
  }>;
};

export function generateStaticParams() {
  const slugs = getGameSlugs();
  const params: {
    locale: string;
    slug: string;
    category: string;
    article: string;
  }[] = [];
  for (const locale of ["en"]) {
    for (const gameSlug of slugs) {
      const articles = getArticlesForGame(gameSlug);
      for (const article of articles) {
        params.push({
          locale,
          slug: gameSlug,
          category: article.category,
          article: article.slug,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, article: articleSlug } = await params;
  const game = await getLocalizedGame(slug, "en");
  if (!game) return {};
  let article = getArticleBySlug(articleSlug, slug);
  if (!article && slug === "elden-ring") {
    article = getArticleBySlug(articleSlug, "nightreign");
  }
  if (!article) return {};

  const isNightreign = article.gameSlug === "nightreign";
  const nightreignPrefix = isNightreign ? "/nightreign" : "";

  return {
    title: `${article.title} | Zosygo`,
    description: article.metaDescription,
    alternates: {
      canonical: `https://www.zosygo.com/${slug}${nightreignPrefix}/${article.category}/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://www.zosygo.com/${slug}${nightreignPrefix}/${article.category}/${article.slug}`,
      siteName: "Zosygo",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug, category, article: articleSlug } = await params;

  const game = await getLocalizedGame(slug, "en");
  if (!game) notFound();

  let article = getArticleBySlug(articleSlug, slug);
  if (!article && slug === "elden-ring") {
    // Also check Nightreign articles under /elden-ring/nightreign/
    article = getArticleBySlug(articleSlug, "nightreign");
  }
  if (!article) notFound();

  // Redirect Nightreign articles to correct path
  if (article.gameSlug === "nightreign" && slug === "elden-ring") {
    redirect(`/elden-ring/nightreign/${article.category}/${article.slug}`);
  }

  const isNightreign = article.gameSlug === "nightreign";
  const nightreignPrefix = isNightreign ? "/nightreign" : "";

  const otherArticles = getArticlesForGame(slug).filter(
    (a) => a.slug !== article.slug
  );
  // If this is a Nightreign article under elden-ring slug, also include Nightreign articles
  if (otherArticles.length === 0 && article.gameSlug === "nightreign") {
    otherArticles.push(...getArticlesForGame("nightreign").filter(
      (a) => a.slug !== article.slug
    ));
  }

  // Pick 3 random images for articles without manually set images
  const imageBaseDir = getImageDir(article.gameSlug);
  const randomImages = pickRandomImages(article.slug, 3, article.gameSlug);
  // Sections that get random images: first, middle, and ~2/3
  const sectionCount = article.sections.length;
  const randomImageSectionIndices = [
    0,
    Math.floor(sectionCount / 2),
    Math.floor(sectionCount * 2 / 3),
  ].filter((idx, pos, arr) => arr.indexOf(idx) === pos); // deduplicate

  const siteUrl = "https://www.zosygo.com";
  const catLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const breadcrumb = [
    { name: "Zosygo", url: `${siteUrl}/` },
    { name: game.name, url: `${siteUrl}/${slug}` },
    ...(isNightreign ? [{ name: "Nightreign", url: `${siteUrl}/${slug}/nightreign` }] : []),
    { name: catLabel, url: `${siteUrl}/${slug}${nightreignPrefix}/${category}` },
    { name: article.title, url: `${siteUrl}/${slug}${nightreignPrefix}/${category}/${article.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateBreadcrumbJsonLd(breadcrumb),
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.metaDescription,
              author: { "@type": "Organization", name: "Zosygo" },
              publisher: {
                "@type": "Organization",
                name: "Zosygo",
                logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` },
              },
              url: `${siteUrl}/${slug}/${category}/${article.slug}`,
              mainEntityOfPage: `${siteUrl}/${slug}/${category}/${article.slug}`,
            },
          ]),
        }}
      />

      <section className="relative overflow-hidden border-b border-[#b8956a]/10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${game.accentGlow}, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
              {breadcrumb.map((crumb, ci) => (
                <React.Fragment key={ci}>
                  {ci > 0 && <li aria-hidden className="text-zinc-700">/</li>}
                  <li>
                    {ci < breadcrumb.length - 1 ? (
                      <Link href={crumb.url} className="text-[#b8956a]/80 hover:text-[#c9a227]">
                        {crumb.name}
                      </Link>
                    ) : (
                      <span className="line-clamp-1 max-w-[200px] text-zinc-500">{crumb.name}</span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>

          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            {(() => {
              // Parse markdown links in metaDescription: [text](url)
              const text = article.metaDescription;
              const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
              if (parts.length <= 1) return text;
              const result: React.ReactNode[] = [];
              for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                if (linkMatch) {
                  result.push(
                    <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-[#c9a227] hover:text-[#dbb83a] underline underline-offset-2 transition-colors">{linkMatch[1]}</a>
                  );
                } else {
                  result.push(<React.Fragment key={i}>{part}</React.Fragment>);
                }
              }
              return result;
            })()}
          </p>

          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mt-8 rounded-md border border-[#c9a227]/30 bg-gradient-to-br from-[#1a1508] to-[#12121a] p-6 shadow-[0_0_30px_rgba(201,162,39,0.08)]">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h2 className="text-base font-bold uppercase tracking-widest text-[#c9a227]">
                  Quick Summary
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {article.keyTakeaways.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 border-b border-white/5 pb-3 last:border-0 sm:border-b-0 sm:pb-0">
                    <span className="mt-0.5 shrink-0 text-sm text-[#c9a227]">▸</span>
                    <div>
                      <span className="text-sm font-bold text-white">{item.label}:</span>
                      <span className="ml-1 text-sm leading-relaxed text-zinc-400">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Build Planner CTA — only on Elden Ring build/weapon articles */}
          {slug === "elden-ring" && (category === "builds" || category === "weapons") && (
            <section className="mt-8 rounded-sm border border-[#c9a227]/20 bg-gradient-to-r from-[#0a0a0f] to-[#1a1508] p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">⚔️ Try the Elden Ring Build Planner</h3>
                  <p className="mt-1 text-sm text-zinc-400">Create, optimize, and share your perfect Elden Ring build. Plan your stats, weapons, armor, talismans, and spells with real-time calculations.</p>
                </div>
                <Link
                  href="/elden-ring/tools/build-calculator"
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-6 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all hover:scale-[1.02]"
                >
                  Open Build Planner
                </Link>
              </div>
            </section>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span>{article.readTimeMinutes} min read</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <Link href={`/${slug}/${category}`} className="text-[#b8956a]/80 hover:text-[#c9a227]">
              {game.name} {catLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Article content */}
        <article className="prose prose-invert prose-zinc max-w-none">
          {article.sections.map((section, i) => {
            const Tag = section.level === 1 ? "h1" : section.level === 2 ? "h2" : "h3";
            // Show a random image if this section doesn't have a manual image
            // and its index is in the randomImageSectionIndices list
            const randomImgIndex = randomImageSectionIndices.indexOf(i);
            const showRandomImage = randomImgIndex !== -1 && !section.image;
            return (
              <div key={i} className={section.image || showRandomImage ? "mb-10" : ""}>
                {section.heading && <div className="mb-2" />}
                <Tag
                  className={
                    section.level === 2
                      ? "text-2xl font-bold text-white mt-10"
                      : section.level === 3
                      ? "text-lg font-semibold text-zinc-300 mt-6"
                      : "text-white"
                  }
                  id={section.heading.toLowerCase().replace(/\s+/g, "-")}
                >
                  {section.heading}
                </Tag>
                {section.image && (
                  <div className="relative mt-4 mb-6 aspect-video w-full overflow-hidden rounded-sm border border-white/10">
                    <Image
                      src={`${imageBaseDir}/${section.image}`}
                      alt={section.imageAlt || section.heading}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 896px"
                      loading="lazy"
                    />
                  </div>
                )}
                {showRandomImage && randomImages.length > randomImgIndex && (
                  <div className="relative mt-4 mb-6 aspect-video w-full overflow-hidden rounded-sm border border-white/10">
                    <Image
                      src={`${imageBaseDir}/${randomImages[randomImgIndex]}`}
                      alt={`${article.title} screenshot ${randomImgIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 896px"
                      loading="lazy"
                    />
                  </div>
                )}
                <ContentParagraphs content={section.content} />
                {section.table && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          {section.table.headers.map((header, hi) => (
                            <th key={hi} className="px-4 py-2 text-left font-semibold text-[#c9a227]">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, ri) => (
                          <tr key={ri} className="border-b border-white/5 hover:bg-white/[0.02]">
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-4 py-2 text-zinc-400">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </article>

        {/* Internal links */}
        {article.internalLinks.length > 0 && (
          <section className="mt-12 rounded-sm border border-white/10 bg-[#12121a] p-6">
            <h2 className="text-lg font-bold text-white">Related Guides</h2>
            <ul className="mt-4 space-y-2">
              {article.internalLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href.startsWith("/") ? link.href : `/${link.href}`}
                    className="text-sm text-[#c9a227] underline-offset-2 hover:underline"
                  >
                    {link.anchorText} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>

      {/* More guides in this category */}
      {otherArticles.length > 0 && (
        <section className="border-t border-[#b8956a]/10 bg-[#050508]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-white">
              More {game.name} {catLabel} Guides
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherArticles.slice(0, 6).map((a) => (
                <Link
                  key={a.slug}
                  href={`/${slug}/${a.category}/${a.slug}`}
                  className="group rounded-sm border border-white/10 bg-[#12121a] p-4 transition-colors hover:border-white/20"
                >
                  <p className="text-sm font-semibold text-white group-hover:underline line-clamp-2">
                    {a.title}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                    {a.metaDescription}
                  </p>
                  <p className="mt-2 text-xs text-zinc-600">{a.readTimeMinutes} min read</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
