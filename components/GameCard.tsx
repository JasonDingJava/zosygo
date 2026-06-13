import Image from "next/image";
import Link from "next/link";
import type { Game, Category } from "@/lib/games";
import { CATEGORIES } from "@/lib/games";

interface GameCardProps {
  game: Game;
  variant?: "default" | "portal";
  featured?: boolean;
}

const CATEGORY_EMOJI: Record<Category, string> = {
  builds: "⚔️",
  bosses: "👹",
  weapons: "🗡️",
  walkthroughs: "📜",
};

export default function GameCard({
  game,
  variant = "portal",
  featured = false,

}: GameCardProps) {
    const isPortal = variant === "portal";

  return (
    <article
      className={`group relative flex flex-col overflow-hidden transition-all duration-300 ${
        isPortal
          ? "rounded-sm border border-[#b8956a]/20 bg-[#0a0a0f] hover:border-[#c9a227]/40 hover:shadow-[0_0_40px_rgba(201,162,39,0.12)]"
          : "rounded-2xl border border-white/10 bg-[#12121a] hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
      } ${featured && isPortal ? "lg:col-span-2 lg:flex-row" : ""}`}
    >
      {isPortal && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.06),transparent_60%)]" />
          <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l border-t border-[#c9a227]/30" />
          <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r border-t border-[#c9a227]/30" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b border-l border-[#c9a227]/30" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b border-r border-[#c9a227]/30" />
        </>
      )}

      <Link
        href={`/${game.slug}`}
        title={`${game.name} game wiki, walkthroughs, and boss strategies`}
        className={`relative block overflow-hidden ${
          featured && isPortal ? "lg:w-2/5 lg:shrink-0" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            isPortal
              ? featured
                ? "h-48 sm:h-56 lg:h-full lg:min-h-[220px]"
                : "h-44 sm:h-48"
              : "h-40"
          }`}
        >
          {/* Background image — prefers card image, falls back to hero */}
          {(game.image || game.heroImage) ? (
            <Image
              src={(game.image || game.heroImage)!}
              alt={game.imageAlt || `${game.name} game guide thumbnail`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={
                featured && isPortal
                  ? "(max-width: 1024px) 100vw, 40vw"
                  : isPortal
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    : "(max-width: 640px) 100vw, 50vw"
              }
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: isPortal
                  ? `linear-gradient(160deg, ${game.accentGlow} 0%, #0a0a0f 45%, #050508 100%)`
                  : `linear-gradient(135deg, ${game.accentGlow} 0%, #12121a 60%, #08080c 100%)`,
              }}
            />
          )}
          {/* Gradient overlay for text readability */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 75% 25%, ${game.accentColor} 0%, transparent 55%)`,
            }}
          />
          {isPortal && <div className="portal-grain absolute inset-0 opacity-[0.15]" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <span
              className="inline-block rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
              style={{
                backgroundColor: `${game.accentColor}22`,
                color: game.accentColor,
                border: `1px solid ${game.accentColor}44`,
              }}
            >
              {game.genres[0]}
            </span>
            {isPortal && (
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#b8956a]/80">
                "Link"
              </span>
            )}
          </div>
        </div>
      </Link>

      <div
        className={`relative flex flex-1 flex-col ${
          isPortal ? "p-5 sm:p-6" : "p-5"
        }`}
      >
        <Link href={`/${game.slug}`} className="block">
          <h2
            className={`font-bold text-white transition-colors group-hover:text-[#e8d5a3] ${
              isPortal
                ? featured
                  ? "font-display text-2xl sm:text-3xl"
                  : "font-display text-xl sm:text-2xl"
                : "text-xl"
            }`}
          >
            {game.name}
          </h2>
          <p
            className={`mt-1 italic ${
              isPortal ? "text-sm text-[#b8956a]/70" : "text-sm text-zinc-500"
            }`}
          >
            {game.tagline}
          </p>
        </Link>

        <p
          className={`mt-3 flex-1 leading-relaxed line-clamp-3 ${
            isPortal ? "text-sm text-zinc-400" : "text-sm text-zinc-400"
          }`}
        >
          {game.description}
        </p>

        {isPortal && (
          <nav aria-label={`${game.name} guide categories`} className="mt-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/${game.slug}/${cat}`}
                    className="inline-flex items-center gap-1 text-xs text-zinc-500 underline-offset-2 transition-colors hover:text-[#c9a227] hover:underline"
                  >
                    <span aria-hidden>{CATEGORY_EMOJI[cat]}</span>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {game.platforms.slice(0, 3).map((platform) => (
            <span
              key={platform}
              className={`rounded-sm px-2 py-0.5 text-xs ${
                isPortal
                  ? "border border-white/5 bg-white/[0.03] text-zinc-500"
                  : "rounded-md bg-white/5 text-zinc-500"
              }`}
            >
              {platform}
            </span>
          ))}
        </div>

        <Link
          href={`/${game.slug}`}
          className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
            isPortal
              ? "uppercase tracking-wider text-[#c9a227] hover:text-[#e8d5a3]"
              : ""
          }`}
          style={isPortal ? undefined : { color: game.accentColor }}
        >
          {isPortal ? "Link" : "Link"}
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
