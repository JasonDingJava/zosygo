"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Game } from "@/lib/games";
import { getAllGames } from "@/lib/games";
import AuthButton from "./auth/AuthButton";
import SearchDialog from "./SearchDialog";

interface NavbarProps {
  games?: Game[];
  locale?: string;
}

export default function Navbar({ games: propGames }: NavbarProps) {
  const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const locale = "en";
  const allGames = propGames ?? getAllGames();
  const activeGame = allGames.find((game) => pathname.includes(game.slug));

  
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08080c]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-black">
            Z
          </span>
          <span className="group-hover:text-violet-300 transition-colors">
            Zosygo
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/" || pathname === "/"
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </Link>

          <Link
            href="/tools"
            className={`text-sm font-medium transition-colors ${
              pathname === "/tools"
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Tools
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
            >
              {activeGame ? activeGame.name : "Games"}
              <svg
                className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#12121a] py-1 shadow-2xl shadow-black/50"
              >
                {allGames.map((game) => (
                  <li key={game.slug}>
                    <Link
                      href={`/${game.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                      style={{
                        borderLeft:
                          activeGame?.slug === game.slug
                            ? `3px solid ${game.accentColor}`
                            : "3px solid transparent",
                      }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: game.accentColor }}
                      />
                      {game.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <AuthButton />
        </div>

        {/* Mobile search + hamburger side by side */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#08080c] px-4 py-4 md:hidden">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <button
            onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
            className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5"
          >
            Search
          </button>
          <p className="mt-4 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            "Games"
          </p>
          {allGames.map((game) => (
            <Link
              key={game.slug}
              href={`/${game.slug}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
              onClick={() => setMenuOpen(false)}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: game.accentColor }}
              />
              {game.name}
            </Link>
          ))}
        </div>
      )}

      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        gameSlug={activeGame?.slug}
        gameName={activeGame?.name}
      />
    </header>
  );
}