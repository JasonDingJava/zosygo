import type { Metadata } from "next";
import type { Game } from "./games";
import { getAllGames } from "./games";

// ─── Configuration ──────────────────────────────────────────────────────────

const SITE_NAME = "Zosygo";
const SITE_URL = "https://www.zosygo.com";
const SITE_DEFAULT_IMAGE = `${SITE_URL}/images/og-default.jpg`;

export function getSiteUrl(path = ""): string {
  return `${SITE_URL}${path}`;
}



// ─── Resolve OG/Twitter images ──────────────────────────────────────────────

export function resolveImages(
  imageUrl?: string,
  width?: number,
  height?: number
): { url: string; width?: number; height?: number }[] {
  if (!imageUrl) {
    return [{ url: SITE_DEFAULT_IMAGE }];
  }
  const url = imageUrl.startsWith("http")
    ? imageUrl
    : `${SITE_URL}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
  return [{ url, width, height }];
}

// ─── Hreflang ───────────────────────────────────────────────────────────────

/**
 * Generate the `alternates.languages` map for hreflang tags.
 * Each locale maps to its fully-qualified URL.
 * Includes an "x-default" entry pointing to the English version.
 */
export function generateAlternateLanguages(path: string): Record<string, string> {
  return { "x-default": `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` };
}

// ─── Structured Data: WebSite + Organization (site-wide) ────────────────────

export function generateSiteSchemaJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        description:
          "Game guides hub and game wiki featuring walkthroughs, builds, and boss strategies.",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
      },
    ],
  };
}

// ─── Structured Data: BreadcrumbList ────────────────────────────────────────

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Structured Data: FAQPage ───────────────────────────────────────────────

export function generateFaqJsonLd(
  faq: { question: string; answer: string }[]
) {
  if (!faq || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Structured Data: ItemList (homepage) ───────────────────────────────────

export function generateHomeJsonLd(games?: Game[]) {
  const allGames = games ?? getAllGames() ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Game Guides & Walkthroughs",
    description: "Featured game wikis and walkthrough hubs on Zosygo.",
    url: getSiteUrl("/"),
    itemListElement: allGames.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${game.name} Guides & Walkthroughs`,
      url: getSiteUrl(`/${game.slug}`),
    })),
  };
}

// ─── Structured Data: VideoGame (game page) ─────────────────────────────────

export function generateGameJsonLd(game: Game) {
  const ogImageUrl = game.ogImage
    ? `${SITE_URL}${game.ogImage}`
    : game.heroImage
      ? `${SITE_URL}${game.heroImage}`
      : SITE_DEFAULT_IMAGE;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": `${SITE_URL}/${game.slug}/#game`,
    name: game.name,
    description: game.description,
    image: ogImageUrl,
    genre: game.genres,
    gamePlatform: game.platforms,
    datePublished: game.releaseDate,
    author: {
      "@type": "Organization",
      name: game.developer,
    },
    publisher: {
      "@type": "Organization",
      name: game.publisher,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    url: getSiteUrl(`/${game.slug}`),
    keywords: game.keywords?.join(", "),
  };

  return schema;
}

// ─── Metadata: Homepage ─────────────────────────────────────────────────────

export function generateHomeMetadata(): Metadata {
  const title =
    "Game Guides Hub — Game Wiki, Walkthroughs & Boss Strategies | Zosygo";
  const description =
    "Zosygo is your game guides hub and game wiki for walkthroughs, meta builds, boss strategies, and complete coverage of Elden Ring, GTA 6, Cyberpunk 2077, and more.";

  const images = [{ url: SITE_DEFAULT_IMAGE, width: 1200, height: 630 }];

  return {
    title,
    description,
    keywords: [
      "game guides hub",
      "game wiki",
      "walkthroughs",
      "boss strategies",
      "game builds",
      "video game guides",
      "Elden Ring guide",
      "GTA 6 guide",
      "Cyberpunk 2077 guide",
      "Zosygo",
    ],
    alternates: {
      canonical: getSiteUrl("/"),
      languages: generateAlternateLanguages(""),
    },
    openGraph: {
      title,
      description,
      url: getSiteUrl("/"),
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ─── Metadata: Game Page ────────────────────────────────────────────────────

/**
 * Generate SEO-optimized metadata for a game page.
 * Uses keyword-rich title templates for better search rankings.
 * Automatically includes FAQPage JSON-LD when game.faq is present.
 */
export function generateGameMetadata(game: Game): Metadata {
  // SEO-optimized title templates per game
  const titleTemplates: Record<string, string> = {
    "elden-ring":
      "Elden Ring Builds, Boss Guides & Walkthroughs — Complete Wiki",
    "gta6": "GTA 6 News, Guides & Leaks — Grand Theft Auto VI Coverage",
    "cyberpunk2077":
      "Cyberpunk 2077 Builds, Phantom Liberty Guides & Walkthroughs",
    "path-of-exile-2":
      "Path of Exile 2 Builds, Boss Guides & Endgame Atlas — PoE 2 Wiki",
  };

  const title = titleTemplates[game.slug]
    ? `${titleTemplates[game.slug]} | ${SITE_NAME}`
    : `${game.name} — Guides, Builds & Walkthroughs | ${SITE_NAME}`;

  const ogUrl = `${SITE_URL}/${game.slug}`;
  const images = resolveImages(game.ogImage || game.heroImage, 1200, 630);

  // Conditionally include FAQPage JSON-LD as a meta script tag
  const faqJsonLd =
    game.faq && game.faq.length > 0
      ? generateFaqJsonLd(game.faq)
      : null;

  // Pass JSON-LD via other meta tags (will be rendered in the page component)
  const other: Record<string, string> = {};
  if (faqJsonLd) {
    other["application/ld+json"] = JSON.stringify(faqJsonLd);
  }

  return {
    title,
    description: game.description,
    keywords: game.keywords,
    alternates: {
      canonical: ogUrl,
      languages: generateAlternateLanguages(game.slug),
    },
    openGraph: {
      title,
      description: game.description,
      url: ogUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: game.description,
      images,
    },
    robots: {
      index: game.slug === "elden-ring",
      follow: true,
    },
    other: Object.keys(other).length > 0 ? other : undefined,
  };
}