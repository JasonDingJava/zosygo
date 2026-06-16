import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getLocalizedGame, getLocalizedGames } from "@/lib/getLocalizedGames";
import { getGameSlugs, CATEGORIES } from "@/lib/games";
import { getArticleBySlug, getArticlesForGame } from "@/lib/articles";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import ContentParagraphs from "@/components/ContentParagraphs";

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
  const article = getArticleBySlug(articleSlug, slug);
  if (!article) return {};

  return {
    title: `${article.title} | Zosygo`,
    description: article.metaDescription,
    alternates: {
      canonical: `https://zosygo.com/${slug}/${article.category}/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://zosygo.com/${slug}/${article.category}/${article.slug}`,
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
      index: slug === "elden-ring",
      follow: true,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug, category, article: articleSlug } = await params;

  const game = await getLocalizedGame(slug, "en");
  if (!game) notFound();

  const article = getArticleBySlug(articleSlug, slug);
  if (!article) notFound();

  const otherArticles = getArticlesForGame(slug).filter(
    (a) => a.slug !== article.slug
  );

  const siteUrl = "https://zosygo.com";
  const catLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const breadcrumb = [
    { name: "Zosygo", url: `${siteUrl}/` },
    { name: game.name, url: `${siteUrl}/${slug}` },
    { name: catLabel, url: `${siteUrl}/${slug}/${category}` },
    { name: article.title, url: `${siteUrl}/${slug}/${category}/${article.slug}` },
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
              <li>
                <Link href={`/${slug}/${category}`} className="text-[#b8956a]/80 hover:text-[#c9a227]">
                  {catLabel}
                </Link>
              </li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li className="line-clamp-1 max-w-[200px] text-zinc-500">{article.title}</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            {article.metaDescription}
          </p>

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
            return (
              <div key={i} className={section.image ? "mb-10" : ""}>
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
                      src={`/images/articles/${section.image}`}
                      alt={section.imageAlt || section.heading}
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

        {/* Build Calculator CTA — only on Elden Ring build/weapon articles */}
        {slug === "elden-ring" && (category === "builds" || category === "weapons") && (
          <section className="mt-6 rounded-sm border border-[#c9a227]/20 bg-gradient-to-r from-[#0a0a0f] to-[#1a1508] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-white">⚔️ Try the Elden Ring Build Calculator</h3>
                <p className="mt-1 text-sm text-zinc-400">Plan your perfect build with real-time stat calculations and weapon AR comparisons.</p>
              </div>
              <Link
                href="/elden-ring/tools/build-calculator"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-6 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all hover:scale-[1.02]"
              >
                Open Calculator
              </Link>
            </div>
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
