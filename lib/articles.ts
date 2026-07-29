// lib/articles.ts — Game article content definitions
import extraArticles from "./articles1";
import articles2Articles from "./articles2";
import articles3Articles from "./articles3";
import articles4Articles from "./articles4";
import articles5Articles from "./articles5";
import articles6Articles from "./articles6";
import articles7Articles from "./articles7";
import nightreignArticles from "./articles-nightreign";
import extracted1 from "./articles_1";
import extracted2 from "./articles_2";
import extracted3 from "./articles_3";
import extracted4 from "./articles_4";
import extracted5 from "./articles_5";

export interface ArticleBase {
  slug: string;
  category: "builds" | "bosses" | "weapons" | "walkthroughs";
  gameSlug: string;
  difficulty?: "beginner" | "intermediate" | "advanced" | "expert";
  readTimeMinutes: number;
  order: number;
}

export interface ArticleContent {
  title: string;
  metaDescription: string;
  sections: ArticleSection[];
  internalLinks: InternalLink[];
}

export interface ArticleSectionTable {
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  heading: string;
  level: 1 | 2 | 3 | 4;
  content: string;
  image?: string;
  imageAlt?: string;
  table?: ArticleSectionTable;
}

export interface InternalLink {
  href: string;
  anchorText: string;
}

export interface Article extends ArticleBase {
  title: string;
  h1?: string;
  toc?: { heading: string; anchor: string }[];
  metaDescription: string;
  sections: ArticleSection[];
  internalLinks: InternalLink[];
  keyTakeaways?: { label: string; value: string }[];
}

export const articles: Article[] = [
  ...extraArticles,
  ...articles2Articles,
  ...articles3Articles,
  ...articles4Articles,
  ...articles5Articles,
  ...articles6Articles,
  ...articles7Articles,
  ...nightreignArticles,
  ...extracted1,
  ...extracted2,
  ...extracted3,
  ...extracted4,
  ...extracted5,
];

export function getArticlesForGame(
  gameSlug: string,
  category?: string
): Article[] {
  return articles.filter(
    (a) =>
      a.gameSlug === gameSlug &&
      (category ? a.category === category : true)
  );
}

export function getArticleBySlug(
  slug: string,
  gameSlug: string
): Article | undefined {
  return articles.find((a) => a.slug === slug && a.gameSlug === gameSlug);
}

export function getAllArticleSlugs(): { slug: string; gameSlug: string; category: string }[] {
  return articles.map((a) => ({ slug: a.slug, gameSlug: a.gameSlug, category: a.category }));
}

export const ARTICLE_CATEGORIES = ["builds", "bosses", "weapons", "walkthroughs"] as const;
