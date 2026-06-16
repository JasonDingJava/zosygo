import Link from "next/link";
import type { Game } from "@/lib/games";

interface FooterProps {
  games?: Game[];
}

export default function Footer({ games: propGames }: FooterProps) {
  const year = new Date().getFullYear();
  const allGames = propGames ?? [];

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#06060a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-black">
                Z
              </span>
              Zosygo
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              Game guides, builds, and boss strategies crafted by gamers, for gamers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Games
            </h3>
            <ul className="mt-4 space-y-2">
              {allGames.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={`/${game.slug}`}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {game.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/elden-ring/builds" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Elden Ring Builds
                </Link>
              </li>
              <li>
                <Link href="/elden-ring/bosses" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Elden Ring Bosses
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              External Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://eldenring.wiki.fextralife.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  Fextralife Wiki
                </a>
              </li>
              <li>
                <a
                  href="https://www.bandainamcoent.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  Bandai Namco
                </a>
              </li>
              <li>
                <a
                  href="https://store.steampowered.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  Steam
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            &copy; {year} Zosygo. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">Built by gamers, for gamers.</p>
        </div>
      </div>
    </footer>
  );
}