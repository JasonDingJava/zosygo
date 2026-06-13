import { MetadataRoute } from "next";
import { getAllGames } from "@/lib/games";
import { getAllArticleSlugs } from "@/lib/articles";

const SITE_URL = "https://zosygo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  entries.push({
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  entries.push({
    url: `${SITE_URL}/tools`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // Game pages
  const games = getAllGames();
  for (const game of games) {
    entries.push({
      url: `${SITE_URL}/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Game tool pages
    entries.push({
      url: `${SITE_URL}/${game.slug}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    // Category pages
    for (const category of ["builds", "bosses", "weapons", "walkthroughs"] as const) {
      entries.push({
        url: `${SITE_URL}/${game.slug}/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Elden Ring specific tools
  entries.push({
    url: `${SITE_URL}/elden-ring/tools/build-calculator`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // Article pages
  const articleSlugs = getAllArticleSlugs();
  for (const { slug, gameSlug, category } of articleSlugs) {
    entries.push({
      url: `${SITE_URL}/${gameSlug}/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
