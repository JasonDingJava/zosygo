import Image from "next/image";
import type { Game } from "@/lib/games";

interface GameHeroProps {
  game: Game;
  locale?: string;
}

export default function GameHero({ game, locale }: GameHeroProps) {
  
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
                "Game Guide"
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">{game.developer}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                "Game Guide"
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">{game.publisher}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                "Game Guide"
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
                "Game Guide"
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">
                {game.platforms.join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
