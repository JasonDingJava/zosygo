// lib/search.ts — Article search utility

import { articles, Article } from "./articles";

export interface SearchResult {
  article: Article;
  score: number;
  matches: {
    title: boolean;
    description: boolean;
    slug: boolean;
  };
}

export interface SearchOptions {
  query: string;
  gameSlug?: string;
  limit?: number;
}

export function searchArticles(options: SearchOptions): SearchResult[] {
  const { query, gameSlug, limit = 20 } = options;

  if (!query || query.trim().length === 0) {
    return [];
  }

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const article of articles) {
    // Filter by game
    if (gameSlug && article.gameSlug !== gameSlug) {
      continue;
    }

    const title = article.title.toLowerCase();
    const description = article.metaDescription.toLowerCase();
    const slug = article.slug.toLowerCase();

    let score = 0;
    const matches = { title: false, description: false, slug: false };

    // Exact title match = highest score
    if (title === q) {
      score += 100;
      matches.title = true;
    } else if (title.includes(q)) {
      // Title contains query
      score += 50;
      matches.title = true;
      // Bonus for word boundary match
      if (new RegExp(`\\b${escapeRegex(q)}\\b`).test(title)) {
        score += 20;
      }
    }

    // Description match
    if (description.includes(q)) {
      score += 20;
      matches.description = true;
      if (new RegExp(`\\b${escapeRegex(q)}\\b`).test(description)) {
        score += 10;
      }
    }

    // Slug match (lower priority)
    if (slug.includes(q)) {
      score += 10;
      matches.slug = true;
    }

    if (score > 0) {
      results.push({ article, score, matches });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  // Return top results
  return results.slice(0, limit);
}

export function getSearchSuggestions(query: string, gameSlug?: string): string[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const q = query.toLowerCase().trim();
  const suggestions = new Set<string>();

  for (const article of articles) {
    if (gameSlug && article.gameSlug !== gameSlug) continue;

    const title = article.title.toLowerCase();
    const words = title.split(/\s+/);

    for (const word of words) {
      // Suggest words that start with the query (at least 3 chars)
      if (word.length >= 3 && word.startsWith(q) && word !== q) {
        suggestions.add(word.charAt(0).toUpperCase() + word.slice(1));
      }
    }

    // Suggest full title if it starts with query
    if (title.startsWith(q) && title !== q) {
      suggestions.add(article.title);
    }
  }

  return Array.from(suggestions).slice(0, 5);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}