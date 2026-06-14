import { MetadataRoute } from "next";
import { getAllGames } from "@/lib/games";
import { getAllArticleSlugs } from "@/lib/articles";

const SITE_URL = "https://zosygo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ── Top priority: Elden Ring pages ──
  entries.push({
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  entries.push({
    url: `${SITE_URL}/elden-ring`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.95,
  });

  entries.push({
    url: `${SITE_URL}/elden-ring/tools`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  entries.push({
    url: `${SITE_URL}/elden-ring/tools/build-calculator`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // Elden Ring category pages
  for (const category of ["builds", "bosses", "weapons", "walkthroughs"] as const) {
    entries.push({
      url: `${SITE_URL}/elden-ring/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Elden Ring articles
  const articleSlugs = getAllArticleSlugs();
  const eldenRingArticles = articleSlugs.filter((a) => a.gameSlug === "elden-ring");
  for (const { slug, gameSlug, category } of eldenRingArticles) {
    entries.push({
      url: `${SITE_URL}/${gameSlug}/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // ── Other game pages (lower priority) ──
  const otherGames = getAllGames().filter((g) => g.slug !== "elden-ring");
  for (const game of otherGames) {
    entries.push({
      url: `${SITE_URL}/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    });

    // Other game categories
    for (const category of ["builds", "bosses", "weapons", "walkthroughs"] as const) {
      entries.push({
        url: `${SITE_URL}/${game.slug}/${category}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.2,
      });
    }
  }

  return entries;
}
