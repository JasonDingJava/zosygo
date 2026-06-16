"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { searchArticles, SearchResult } from "@/lib/search";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const game = searchParams.get("game") || undefined;

  const [results, setResults] = useState<SearchResult[]>([]);
  const [input, setInput] = useState(q);
  const [gameFilter, setGameFilter] = useState(game || "");
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback((query: string, filterGame: string) => {
    if (query.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    const r = searchArticles({
      query: query.trim(),
      gameSlug: filterGame || undefined,
      limit: 30,
    });
    setResults(r);
    setSearched(true);
  }, []);

  // Initial search from URL params
  useEffect(() => {
    if (q) {
      setInput(q);
      doSearch(q, game || "");
    }
  }, [q, game, doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ q: input.trim() });
    if (gameFilter) params.set("game", gameFilter);
    window.history.replaceState(null, "", `/search?${params.toString()}`);
    doSearch(input, gameFilter);
  };

  return (
    <div className="mt-6">
      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-[#c9a227] transition-colors"
          />
        </div>
        <select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-300 outline-none focus:border-[#c9a227] transition-colors"
        >
          <option value="">All Games</option>
          <option value="elden-ring">Elden Ring</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-[#c9a227] px-5 py-3 text-sm font-semibold text-black hover:bg-[#d4b338] transition-colors"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-8">
        {searched && results.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-zinc-500">No matching articles found</p>
            <p className="mt-2 text-sm text-zinc-600">
              Try different keywords
            </p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p className="mb-6 text-sm text-zinc-500">
              {results.length >= 30 ? "30+ " : results.length} results{gameFilter ? ` (${gameFilter})` : ""}
            </p>
            <div className="space-y-4">
              {results.map((result) => {
                const article = result.article;
                const catLabel = getCategoryLabel(article.category);
                return (
                  <Link
                    key={article.slug}
                    href={`/${article.gameSlug}/${article.category}/${article.slug}`}
                    className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">
                        {catLabel}
                      </span>
                      <span className="text-xs text-zinc-600 uppercase">
                        {article.gameSlug}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{article.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{article.metaDescription}</p>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    builds: "Builds",
    bosses: "Bosses",
    weapons: "Weapons",
    walkthroughs: "Guides",
  };
  return map[category] || category;
}