"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchArticles, SearchResult } from "@/lib/search";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gameSlug?: string;
  gameName?: string;
}

export default function SearchDialog({ isOpen, onClose, gameSlug, gameName }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Debounced search
  const doSearch = useCallback((q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    const r = searchArticles({ query: q, gameSlug, limit: 10 });
    setResults(r);
    setSelectedIndex(-1);
  }, [gameSlug]);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        navigateToArticle(results[selectedIndex]);
      } else if (query.trim().length > 0) {
        // Go to search results page
        const params = new URLSearchParams({ q: query.trim() });
        if (gameSlug) params.set("game", gameSlug);
        onClose();
        router.push(`/search?${params.toString()}`);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const navigateToArticle = (result: SearchResult) => {
    onClose();
    router.push(`/${result.article.gameSlug}/${result.article.category}/${result.article.slug}`);
  };

  if (!isOpen) return null;

  const searchUrl = query.trim()
    ? `/search?q=${encodeURIComponent(query.trim())}${gameSlug ? `&game=${gameSlug}` : ""}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-xl mx-4 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-700">
          <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`搜索${gameName ? ` ${gameName}` : "所有游戏"}...`}
            className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-base"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-zinc-500 hover:text-zinc-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-zinc-500 bg-zinc-800 rounded border border-zinc-700">
            ESC
          </kbd>
          <button onClick={onClose} className="ml-1 p-1 text-zinc-500 hover:text-zinc-300 transition-colors" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, idx) => {
                const article = result.article;
                const catLabel = getCategoryLabel(article.category);
                return (
                  <button
                    key={article.slug}
                    onClick={() => navigateToArticle(result)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      idx === selectedIndex ? "bg-zinc-800" : "hover:bg-zinc-800/50"
                    }`}
                  >
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase shrink-0">
                      {catLabel}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-white truncate">{article.title}</div>
                      <div className="text-xs text-zinc-500 truncate mt-0.5">{article.metaDescription}</div>
                    </div>
                    <svg className="w-4 h-4 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}

              {/* View all results */}
              {searchUrl && (
                <Link
                  href={searchUrl}
                  onClick={onClose}
                  className="block px-4 py-3 text-center text-sm text-[#c9a227] hover:bg-zinc-800 transition-colors border-t border-zinc-700"
                >
                  {results.length >= 10
                    ? `查看全部 "${query}" 的结果 →`
                    : `搜索 "${query}" →`}
                </Link>
              )}
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="px-4 py-8 text-center text-zinc-500">
              <p>未找到匹配的文章</p>
              {searchUrl && (
                <Link
                  href={searchUrl}
                  onClick={onClose}
                  className="inline-block mt-2 text-sm text-[#c9a227] hover:underline"
                >
                  搜索 "{query}" →
                </Link>
              )}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-zinc-600 text-sm">
              输入至少 2 个字符开始搜索
            </div>
          )}
        </div>
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