import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/games";

interface GameHeroProps {
  game: Game;
  locale?: string;
}

export default function GameHero({ game, locale }: GameHeroProps) {
  const isEldenRing = game.slug === "elden-ring";
  
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Hero background image with proper parent container */}
      {game.heroImage && (
        <div className="absolute inset-0">
          <Image
            src={game.heroImage}
            alt={game.imageAlt || `${game.name} banner`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={85}
          />
        </div>
      )}
      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(8,8,12,0.85) 0%, rgba(8,8,12,0.6) 50%, rgba(8,8,12,0.95) 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${game.accentGlow}, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${game.accentColor}18`,
                  color: game.accentColor,
                  border: `1px solid ${game.accentColor}33`,
                }}
              >
                {genre}
              </span>
            ))}
          </div>

          <h1
            className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{
              textShadow: `0 0 80px ${game.accentGlow}`,
            }}
          >
            {game.name}
          </h1>

          <p
            className="mt-4 text-lg font-medium italic sm:text-xl"
            style={{ color: game.accentColor }}
          >
            {game.tagline}
          </p>

          <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {game.longDescription}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Developer
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">{game.developer}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Publisher
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">{game.publisher}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Release Date
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">
                {new Date(game.releaseDate).toLocaleDateString(locale || "en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Platforms
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">
                {game.platforms.join(", ")}
              </dd>
            </div>
          </dl>

          {isEldenRing && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/elden-ring/tools/build-calculator"
                className="inline-flex h-14 items-center justify-center rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-8 text-base font-bold uppercase tracking-wider text-black shadow-[0_0_40px_rgba(251,191,36,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)]"
              >
                ⚔️ Build Planner
              </Link>
              <Link
                href="/elden-ring/tools"
                className="inline-flex h-14 items-center justify-center rounded-sm border border-[#b8956a]/30 px-8 text-base font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:border-[#c9a227]/50"
              >
                🛠 All Tools
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
