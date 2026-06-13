import Link from "next/link";
import GameHero from "@/components/GameHero";
import CategoryCard from "@/components/CategoryCard";
import { getAllGames, CATEGORIES, type Game } from "@/lib/games";
import {
  generateGameJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";

interface GamePageContentProps {
  game: Game;
}

const SECTION_IDS = {
  overview: "overview",
  builds: "best-builds",
  bosses: "boss-guides",
  tips: "tips-strategies",
  faq: "faq",
} as const;

export default function GamePageContent({
  game,
}: GamePageContentProps) {



  const gameUrl = `https://zosygo.com/${game.slug}`;

  const jsonLdSchemas: any[] = [
    generateGameJsonLd(game),
    generateBreadcrumbJsonLd([
      { name: "Zosygo", url: "https://zosygo.com" },
      { name: game.name, url: gameUrl },
    ]),
  ];

  if (game.faq && game.faq.length > 0) {
    jsonLdSchemas.push(generateFaqJsonLd(game.faq));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchemas),
        }}
      />

      <GameHero game={game}  />

      {/* Anchor navigation bar */}
      <nav
        aria-label="Section navigation"
        className="sticky top-0 z-30 border-b border-white/5 bg-[#08080c]/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {[
            { id: SECTION_IDS.overview, label: game.name },
            { id: SECTION_IDS.builds, label: `${game.name} Builds` },
            { id: SECTION_IDS.bosses, label: `${game.name} Boss Guides` },
            { id: SECTION_IDS.tips, label: `${game.name} Tips & Strategies` },
            ...(game.faq && game.faq.length > 0
              ? [{ id: SECTION_IDS.faq, label: "FAQ" }]
              : []),
          ].map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:bg-white/5 hover:text-[#e8d5a3]"
            >
              {section.label}
            </a>
          ))}
          {/* Tool links */}
          {game.slug === "elden-ring" && (
            <>
              <Link
                href={`/${game.slug}/tools`}
                className="shrink-0 rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:bg-white/5 hover:text-[#e8d5a3]"
              >
                🛠 Tools
              </Link>
              <Link
                href={`/${game.slug}/tools/build-calculator`}
                className="shrink-0 rounded-sm bg-gradient-to-r from-amber-600 to-yellow-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:from-amber-500 hover:to-yellow-500"
              >
                ⚔️ Build Calculator
              </Link>
            </>
          )}
          {/* Category links */}
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/${game.slug}/${cat}`}
              className="shrink-0 rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:bg-white/5 hover:text-[#e8d5a3]"
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <section
        id={SECTION_IDS.overview}
        className="scroll-mt-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {game.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              {game.longDescription}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">{"Developer"}</p>
                <p className="mt-1 text-sm font-semibold text-white">{game.developer}</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">{"Publisher"}</p>
                <p className="mt-1 text-sm font-semibold text-white">{game.publisher}</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">{"Release"}</p>
                <p className="mt-1 text-sm font-semibold text-white">{game.releaseDate}</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">{"Platforms"}</p>
                <p className="mt-1 text-sm font-semibold text-white">{game.platforms.join(", ")}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-sm border border-[#b8956a]/20 bg-[#b8956a]/10 px-3 py-1 text-xs font-medium text-[#e8d5a3]"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Category cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat}
                  category={cat}
                  gameSlug={game.slug}
                  gameName={game.name}
                  
                  accentColor={game.accentColor}
                />
              ))}
              {/* Tool card - only for Elden Ring for now */}
              {game.slug === "elden-ring" && (
                <div className="col-span-2">
                  <Link
                    href={`/${game.slug}/tools/build-calculator`}
                    className="group flex items-center gap-4 rounded-sm border border-amber-600/40 bg-gradient-to-r from-amber-900/30 to-yellow-900/20 p-5 transition-all hover:border-amber-500/60 hover:from-amber-900/40 hover:to-yellow-900/30"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-2xl">
                      ⚔️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-amber-400 group-hover:text-amber-300">Elden Ring Build Calculator</h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        Calculate optimal builds with real-time stats, weapon scaling, and smart attribute suggestions. Compare weapons, check soft caps, and find your perfect build.
                      </p>
                    </div>
                    <div className="shrink-0 text-amber-500 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-10 rounded-sm border border-white/10 bg-[#12121a] p-6">
              <h2 className="text-lg font-semibold text-white">{"Coming Soon"}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[].map((item: string) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: game.accentColor }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              {"More Game Guides"}
            </h2>
            <ul className="mt-4 space-y-3">
              {getAllGames().filter((g: Game) => g.slug !== game.slug).slice(0, 4).map((other: any) => (
                <li key={other.slug}>
                  <Link
                    href={`/${other.slug}`}
                    className="group flex items-center gap-3 rounded-sm border border-white/10 bg-[#12121a] p-4 transition-colors hover:border-white/20"
                  >
                    <span
                      className="h-10 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: other.accentColor }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white group-hover:underline">
                        {other.name}
                      </p>
                      <p className="line-clamp-1 text-xs text-zinc-500">{other.tagline}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={"/"}
              className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {"Back to All Games"}
            </Link>
          </aside>
        </div>
      </section>

      {/* Builds — link to category page */}
      <section id={SECTION_IDS.builds} className="scroll-mt-20 border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {`${game.name} Builds`}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-400">
                Discover the most powerful builds for {game.name}. From min-maxed meta setups to creative
                off-meta experiments, our build guides cover every playstyle and patch.
              </p>
            </div>
            <Link
              href={`/${game.slug}/builds`}
              className="hidden shrink-0 rounded-sm border border-[#b8956a]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:bg-[#b8956a]/10 sm:inline-flex"
            >
              All Builds &rarr;
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">Starter Builds</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Beginner-friendly builds that are easy to assemble and effective throughout the game.
              </p>
              <Link
                href={`/${game.slug}/builds`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Browse builds &rarr;
              </Link>
            </div>
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">Meta Builds</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Top-tier builds optimized for maximum damage, survivability, or utility in the current patch.
              </p>
              <Link
                href={`/${game.slug}/builds`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Browse builds &rarr;
              </Link>
            </div>
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">PvP Builds</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Specialized builds for player-vs-player combat, invasions, and duels.
              </p>
              <Link
                href={`/${game.slug}/builds`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Browse builds &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Boss Guides — link to category page */}
      <section id={SECTION_IDS.bosses} className="scroll-mt-20 border-t border-[#b8956a]/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {`${game.name} Boss Guides`}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-400">
                Master every boss encounter with our detailed strategy guides. Learn attack patterns,
                weaknesses, phase transitions, and optimal strategies for each boss.
              </p>
            </div>
            <Link
              href={`/${game.slug}/bosses`}
              className="hidden shrink-0 rounded-sm border border-[#b8956a]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:bg-[#b8956a]/10 sm:inline-flex"
            >
              All Bosses &rarr;
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">Main Bosses</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Complete guides for story-critical bosses including strategies, recommended levels, and gear.
              </p>
              <Link
                href={`/${game.slug}/bosses`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Browse bosses &rarr;
              </Link>
            </div>
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">Optional Bosses</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Guides for optional and secret bosses with unique rewards and challenging mechanics.
              </p>
              <Link
                href={`/${game.slug}/bosses`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Browse bosses &rarr;
              </Link>
            </div>
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">Boss Rush</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Boss rush mode strategies and speed-kill techniques for experienced players.
              </p>
              <Link
                href={`/${game.slug}/bosses`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Browse bosses &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tips — link to walkthroughs category page */}
      <section id={SECTION_IDS.tips} className="scroll-mt-20 border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {`${game.name} Tips & Strategies`}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-400">
                Essential tips, tricks, and strategies to enhance your {game.name} experience. From
                early-game progression to endgame optimization.
              </p>
            </div>
            <Link
              href={`/${game.slug}/walkthroughs`}
              className="hidden shrink-0 rounded-sm border border-[#b8956a]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:bg-[#b8956a]/10 sm:inline-flex"
            >
              Walkthroughs &rarr;
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">Early Game Tips</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Everything you need to know for a strong start — essential items, early builds, and progression routes.
              </p>
              <Link
                href={`/${game.slug}/walkthroughs`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Walkthroughs &rarr;
              </Link>
            </div>
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">Advanced Mechanics</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Deep dives into game mechanics, hidden systems, and optimization techniques for experienced players.
              </p>
              <Link
                href={`/${game.slug}/walkthroughs`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Walkthroughs &rarr;
              </Link>
            </div>
            <div className="rounded-sm border border-white/10 bg-[#12121a] p-5">
              <h3 className="text-base font-semibold text-white">Collectibles & Secrets</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Complete guides for collectibles, hidden items, secret areas, and missable content.
              </p>
              <Link
                href={`/${game.slug}/walkthroughs`}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline-offset-2 hover:text-[#c9a227] hover:underline"
              >
                Walkthroughs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {game.faq && game.faq.length > 0 && (
        <section id={SECTION_IDS.faq} className="scroll-mt-20 border-t border-[#b8956a]/10">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{game.name} FAQ</h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-400">
              Frequently asked questions about {game.name}.
            </p>
            <div className="mt-8 space-y-4">
              {game.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-sm border border-white/10 bg-[#12121a]"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#e8d5a3]">
                    {item.question}
                    <svg
                      className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-white/5 px-4 py-3">
                    <p className="text-sm leading-relaxed text-zinc-400">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Games */}
      <section className="border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white">More Game Guides</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Explore guides, builds, and walkthroughs for more games.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getAllGames().filter((g: Game) => g.slug !== game.slug).slice(0, 4).map((other: any) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="group rounded-sm border border-white/10 bg-[#12121a] p-5 transition-colors hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-8 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: other.accentColor }}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white group-hover:underline">
                      {other.name}
                    </p>
                    <p className="line-clamp-1 text-xs text-zinc-500">{other.tagline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
