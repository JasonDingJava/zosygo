import { MetadataRoute } from "next";
import { getAllGames } from "@/lib/games";
import { getAllArticleSlugs } from "@/lib/articles";

const SITE_URL = "https://www.zosygo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ── homepage ──
  // priority 1.0, daily
  entries.push({
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // ── tool_page: /elden-ring/tools/* ──
  // priority 1.0, daily
  entries.push({
    url: `${SITE_URL}/elden-ring/tools`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });
  entries.push({
    url: `${SITE_URL}/elden-ring/tools/build-calculator`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });
  entries.push({
    url: `${SITE_URL}/elden-ring/tools/weapon-ar-calculator`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });
  entries.push({
    url: `${SITE_URL}/elden-ring/tools/rune-level-calculator`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });
  // Article entries
  entries.push({
    url: `${SITE_URL}/elden-ring/walkthroughs/how-many-runes-to-reach-level-150`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });
  entries.push({
    url: `${SITE_URL}/elden-ring/walkthroughs/how-many-runes-to-reach-level-200`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // ── nightreign_hub: /elden-ring/nightreign ──
  // priority 0.9, weekly
  entries.push({
    url: `${SITE_URL}/elden-ring/nightreign`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // ── nightreign_category: /elden-ring/nightreign/(builds|bosses|weapons|walkthroughs) ──
  // priority 0.8, weekly
  for (const category of ["builds", "weapons", "bosses", "walkthroughs"] as const) {
    entries.push({
      url: `${SITE_URL}/elden-ring/nightreign/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // ── hub_page: /elden-ring ──
  // priority 0.95, weekly
  entries.push({
    url: `${SITE_URL}/elden-ring`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.95,
  });

  // ── category_page: /elden-ring/(builds|weapons) ──
  // priority 0.8, weekly
  for (const category of ["builds", "weapons"] as const) {
    entries.push({
      url: `${SITE_URL}/elden-ring/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // ── category_page_low: /elden-ring/(bosses|walkthroughs) ──
  // priority 0.5, monthly
  for (const category of ["bosses", "walkthroughs"] as const) {
    entries.push({
      url: `${SITE_URL}/elden-ring/${category}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // ── article_page ──
  // priority 0.8, weekly
  const articleSlugs = getAllArticleSlugs();
  const eldenRingArticles = articleSlugs.filter((a) => a.gameSlug === "elden-ring");
  const nightreignArticles = articleSlugs.filter((a) => a.gameSlug === "nightreign");
  for (const { slug, gameSlug, category } of eldenRingArticles) {
    entries.push({
      url: `${SITE_URL}/${gameSlug}/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // ── nightreign_article: /elden-ring/nightreign/[category]/[slug] ──
  // priority 0.8, weekly
  for (const { slug, gameSlug, category } of nightreignArticles) {
    entries.push({
      url: `${SITE_URL}/elden-ring/nightreign/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // ── other_game_root: /(?!elden-ring).* ──
  // priority 0.3, monthly
  const otherGames = getAllGames().filter((g) => g.slug !== "elden-ring");
  for (const game of otherGames) {
    entries.push({
      url: `${SITE_URL}/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  // ── other_game_category: /.*/(builds|weapons|bosses|walkthroughs) ──
  // priority 0.1, monthly
  for (const game of otherGames) {
    for (const category of ["builds", "weapons", "bosses", "walkthroughs"] as const) {
      entries.push({
        url: `${SITE_URL}/${game.slug}/${category}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.1,
      });
    }
  }

  return entries;
}
