import { Cinzel } from "next/font/google";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import { getAllGames } from "@/lib/games";
import { generateHomeJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

const GAMES = getAllGames();

const SITE_FAQ = [
  {
    question: "What is Zosygo?",
    answer: "Zosygo is a game guides hub and game wiki providing walkthroughs, builds, boss strategies, and comprehensive coverage of popular video games like Elden Ring, GTA 6, Cyberpunk 2077, Baldur's Gate 3, and many more.",
  },
  {
    question: "What games does Zosygo cover?",
    answer: "Zosygo currently covers 13 games spanning action RPGs, open-world adventures, CRPGs, metroidvanias, and more. Each game has dedicated guides for builds, bosses, weapons, and walkthroughs.",
  },
  {
    question: "Is Zosygo free to use?",
    answer: "Yes, Zosygo is completely free. All guides, walkthroughs, and wiki content are accessible without any subscription or account.",
  },
  {
    question: "How often is content updated?",
    answer: "Content is updated regularly to reflect game patches, new discoveries, and community strategies. Major games like Elden Ring and Cyberpunk 2077 receive priority updates following patches and DLC releases.",
  },
  {
    question: "Can I contribute to Zosygo?",
    answer: "Zosygo is built by gamers for gamers. If you have expertise in a specific game or build, reach out to contribute guides and strategies to help the community.",
  },
];

export default function HomePage() {
  const games = GAMES;
  const homeUrl = "https://zosygo.com";

  const jsonLdSchemas: any[] = [
    generateHomeJsonLd(games),
    generateBreadcrumbJsonLd([
      { name: "Zosygo", url: homeUrl },
      { name: "Game Guides Hub", url: homeUrl },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: SITE_FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  const hubSections = [
    { id: "walkthroughs", title: "Walkthroughs", description: "Step-by-step guides through quests, missions, and main storylines." },
    { id: "builds", title: "Builds", description: "Min-maxed meta builds and creative setups for every playstyle." },
    { id: "bosses", title: "Bosses", description: "Detailed boss strategies, attack patterns, and phase guides." },
    { id: "wiki", title: "Wiki", description: "Comprehensive reference for game mechanics, items, and lore." },
  ];

  return (
    <div className={cinzel.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }} />

      <section className="portal-hero relative overflow-hidden border-b border-[#b8956a]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-30%,rgba(201,162,39,0.18),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(88,28,135,0.12),transparent_60%)]" />
        <div className="portal-grain absolute inset-0 opacity-[0.08]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
              <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">{"Home"}</Link></li>
              <li aria-hidden className="text-zinc-700">/</li>
              <li className="text-zinc-500">{"Game Guides Hub"}</li>
            </ol>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9a227]">{"Game Guides Hub"}</p>
              <h1 className="font-display mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">{"Game Guides Hub \u2014 Game Wiki, Walkthroughs &amp; Boss Strategies"}</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Game guides hub and game wiki providing walkthroughs, builds, boss strategies, and comprehensive coverage of popular video games.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/elden-ring/tools/build-calculator" className="inline-flex h-14 items-center justify-center rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-10 text-base font-bold uppercase tracking-wider text-black shadow-[0_0_40px_rgba(251,191,36,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)]">
                  ⚔️ Elden Ring Build Calculator
                </Link>
                <Link href="/#games" className="inline-flex h-12 items-center justify-center rounded-sm bg-gradient-to-r from-[#8b6914] via-[#c9a227] to-[#8b6914] px-8 text-sm font-bold uppercase tracking-wider text-[#0a0a0f] shadow-[0_0_30px_rgba(201,162,39,0.25)] transition-opacity hover:opacity-90">{"Browse All Games"}</Link>
                <Link href="/elden-ring" className="inline-flex h-12 items-center justify-center rounded-sm border border-[#b8956a]/30 px-8 text-sm font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:border-[#c9a227]/50 hover:bg-[#c9a227]/5">{"Explore Elden Ring"}</Link>
              </div>
            </div>
            <aside className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f]/80 p-6 backdrop-blur-sm">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#b8956a]">{"Quick Links"}</h2>
              <ul className="mt-5 space-y-3">
                {games.map((game) => (
                  <li key={game.slug}>
                    <Link href={`/${game.slug}`} className="group flex items-center justify-between gap-3 border-b border-white/5 pb-3 text-sm transition-colors last:border-0 last:pb-0">
                      <span className="font-medium text-zinc-300 group-hover:text-[#e8d5a3]">{game.name}</span>
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: game.accentColor }} />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-zinc-600">{"Select a game to view guides, builds, and walkthroughs."}</p>
            </aside>
          </div>
        </div>
      </section>

      <section aria-label={"Guide Categories"} className="border-b border-white/5 bg-[#050508]">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 sm:px-6 lg:px-8">
          {hubSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="rounded-sm border border-[#b8956a]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:border-[#c9a227]/30 hover:text-[#e8d5a3]">{section.title}</a>
          ))}
          <a href="#faq" className="rounded-sm border border-[#b8956a]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:border-[#c9a227]/30 hover:text-[#e8d5a3]">FAQ</a>
          
        </div>
      </section>

      <section id="games" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-[#b8956a]/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">{"Featured Games"}</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">{"Active Game Hubs"}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">{"Browse our collection of game guides, build calculators, and walkthroughs."}</p>
          </div>
          <p className="shrink-0 text-sm font-medium text-[#b8956a]/70">{`${games.length} Active Game Hubs`}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {games.map((game, index) => (
            <GameCard key={game.slug} game={game} variant="portal" featured={index === 0}  />
          ))}
        </div>
      </section>

      <section className="border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white">{"Game Categories"}</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 sm:text-base">{"Explore guides by category across all supported games."}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hubSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24 rounded-sm border border-[#b8956a]/10 bg-[#0a0a0f] p-6">
                <h3 className="font-display text-lg font-semibold text-[#e8d5a3]">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{section.description}</p>
                <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                  {games.map((game) => (
                    <li key={`${section.id}-${game.slug}`}>
                      <Link href={`/${game.slug}`} className="text-sm text-zinc-400 underline-offset-2 transition-colors hover:text-[#c9a227] hover:underline">{game.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#b8956a]/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Your Ultimate Game Guides Hub &mdash; Walkthroughs, Builds & Boss Strategies</h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-400">
              Zosygo is the premier destination for gamers seeking comprehensive game guides, detailed walkthroughs, meta builds, and expert boss strategies. Whether you are exploring the Lands Between in <Link href="/elden-ring" className="text-[#c9a227] underline-offset-2 hover:underline">Elden Ring</Link>, preparing for the return to Vice City in <Link href={`//gta6`} className="text-[#ff006e] underline-offset-2 hover:underline">GTA 6</Link>, or diving deep into Night City in <Link href={`//cyberpunk2077`} className="text-[#00f0ff] underline-offset-2 hover:underline">Cyberpunk 2077</Link>, we have the guides you need to elevate your gameplay.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white">Comprehensive Game Wiki</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">Our game wiki pages serve as complete reference guides for every title we cover. From lore deep-dives and character builds to map markers and collectible locations, our wiki content is designed to be the single source of truth for your gaming journey.</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white">Expert Walkthroughs</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">Step-by-step walkthroughs guide you through every quest, dungeon, and story mission. Whether you are a first-time player looking for direction or a veteran seeking missable content, our walkthroughs have you covered from start to finish.</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white">Meta Build Guides</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">Stay ahead of the meta with our regularly updated build guides. We cover everything from starter builds for new players to min-maxed endgame setups for PvE and PvP. Each build includes stat allocations, gear recommendations, and playstyle tips.</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white">Boss Strategy Guides</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">Conquer every boss with our detailed strategy guides. Learn attack patterns, phase transitions, elemental weaknesses, and optimal positioning. We break down each encounter so you go in prepared and come out victorious.</p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold text-white">Popular Game Guides</h3>
              <div className="mt-6 space-y-3">
                {games.map((game) => (
                  <div key={game.slug} className="rounded-sm border border-white/10 bg-[#12121a] p-4">
                    <Link href={`/${game.slug}`} className="text-base font-semibold hover:underline" style={{ color: game.accentColor }}>{game.name} Guides</Link>
                    <p className="mt-1 text-sm text-zinc-500">{game.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Link href={`/${game.slug}/builds`} className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">Builds</Link>
                      <Link href={`/${game.slug}/bosses`} className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">Bosses</Link>
                      <Link href={`/${game.slug}/weapons`} className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">Weapons</Link>
                      <Link href={`/${game.slug}/walkthroughs`} className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">Walkthroughs</Link>
                      {game.faq && game.faq.length > 0 && (
                        <Link href={`/${game.slug}#faq`} className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">FAQ</Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Homepage FAQ Section */}
      <section id="faq" className="scroll-mt-24 border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Everything you need to know about Zosygo and our game guides.
          </p>
          <div className="mt-8 space-y-4">
            {SITE_FAQ.map((item, i) => (
              <details key={i} className="group rounded-sm border border-white/10 bg-[#12121a]">
                <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#e8d5a3]">
                  {item.question}
                  <svg className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <section className="relative overflow-hidden border-t border-[#b8956a]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center rounded-sm border border-[#b8956a]/20 bg-[#0a0a0f] px-6 py-12 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{"Ready to Level Up?"}</h2>
            <p className="mt-4 max-w-xl text-sm text-zinc-500 sm:text-base">{"Jump into any game hub to start exploring guides, builds, and strategies."}</p>
            <nav aria-label={"All Game Guide Hubs"} className="mt-8 flex flex-wrap justify-center gap-3">
              {games.map((game) => (
                <Link key={game.slug} href={`/${game.slug}`} className="rounded-sm border px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02]" style={{ borderColor: `${game.accentColor}44`, color: game.accentColor, backgroundColor: `${game.accentColor}11` }}>{game.name}</Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
