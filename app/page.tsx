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

const ELDEN_RING = getAllGames().find(g => g.slug === "elden-ring")!;

const SITE_FAQ = [
  {
    question: "What is the Elden Ring Build Calculator?",
    answer: "The Elden Ring Build Calculator is a free online tool that lets you plan and optimize your character builds. Allocate stats, pick weapons, and see real-time Attack Rating calculations with game-accurate formulas.",
  },
  {
    question: "How does the Build Calculator work?",
    answer: "Select your starting class, adjust stat sliders from 1 to 99, choose up to 3 weapons, and see instant results for HP, FP, Stamina, equip load, and weapon Attack Rating. The calculator uses game-accurate formulas for damage scaling and soft caps.",
  },
  {
    question: "What is the best Elden Ring build for beginners?",
    answer: "A Strength/Faith Paladin build with 55 Vigor, 25 Mind, 30 Endurance, 50 Strength, and 60 Faith is versatile for both melee combat and incantations. The Vagabond or Confessor starting classes work well.",
  },
  {
    question: "Is Zosygo free to use?",
    answer: "Yes, Zosygo is completely free. All build calculators, guides, walkthroughs, and wiki content are accessible without any subscription or account.",
  },
  {
    question: "How often are builds and guides updated?",
    answer: "Content is updated regularly to reflect game patches, new discoveries, and community strategies. Elden Ring receives priority updates following patches and DLC releases.",
  },
];

export default function HomePage() {
  const game = ELDEN_RING;
  const otherGames = getAllGames().filter(g => g.slug !== "elden-ring");
  const homeUrl = "https://zosygo.com";

  const jsonLdSchemas: any[] = [
    generateHomeJsonLd([game]),
    generateBreadcrumbJsonLd([
      { name: "Zosygo", url: homeUrl },
      { name: "Elden Ring Tools & Guides", url: homeUrl },
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
    { id: "weapons", title: "Weapons", description: "Comprehensive reference for weapons, items, and game mechanics." },
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
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9a227]">{"Elden Ring Tools &amp; Guides"}</p>
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">{"Elden Ring Build Calculator, Weapon Guides &amp; Builds"}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {"Create optimized builds, compare weapons, and explore boss strategies for Elden Ring. Zosygo is the premier tool hub for Tarnished seeking the perfect build."}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/elden-ring/tools/build-calculator" className="inline-flex h-14 items-center justify-center rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-10 text-base font-bold uppercase tracking-wider text-black shadow-[0_0_40px_rgba(251,191,36,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)]">
                ⚔️ Elden Ring Build Calculator
              </Link>
              <Link href="/elden-ring" className="inline-flex h-12 items-center justify-center rounded-sm border border-[#b8956a]/30 px-8 text-sm font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:border-[#c9a227]/50 hover:bg-[#c9a227]/5">{"Explore Elden Ring Guides"}</Link>
              <Link href="/elden-ring/tools" className="inline-flex h-12 items-center justify-center rounded-sm border border-[#b8956a]/30 px-8 text-sm font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:border-[#c9a227]/50 hover:text-[#e8d5a3]">{"More Tools"}</Link>
            </div>
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">{"Featured Game"}</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">{"Elden Ring"}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">{"Build calculators, weapon guides, boss strategies, and walkthroughs for the Lands Between."}</p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
          <GameCard key={game.slug} game={game} variant="portal" featured={true} />
        </div>

        <div className="mt-16 border-t border-[#b8956a]/10 pt-12">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600">{"Additional Game Hubs"}</h3>
          <p className="mt-2 text-sm text-zinc-500">{"More game hubs are coming soon. Stay tuned for guides covering additional titles."}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherGames.map((g) => (
              <div key={g.slug} className="rounded-sm border border-white/5 bg-[#0a0a0f]/50 px-5 py-4 opacity-60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{g.name}</span>
                  <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white">{"Elden Ring Guide Categories"}</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 sm:text-base">{"Explore Elden Ring guides by category."}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hubSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24 rounded-sm border border-[#b8956a]/10 bg-[#0a0a0f] p-6">
                <h3 className="font-display text-lg font-semibold text-[#e8d5a3]">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{section.description}</p>
                <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                  <li>
                    <Link href={`/elden-ring/${section.id}`} className="text-sm text-[#c9a227] underline-offset-2 transition-colors hover:text-white hover:underline">Elden Ring {section.title}</Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#b8956a]/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Elden Ring Build Calculator &mdash; Plan Your Perfect Build</h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-400">
              The Elden Ring Build Calculator lets you plan, optimize, and share your character builds with game-accurate formulas. Whether you are building a <Link href="/elden-ring" className="text-[#c9a227] underline-offset-2 hover:underline">Pure Strength tank</Link>, a Dexterity bleed build, or an Intelligence mage, our calculator gives you precise stat outputs, weapon Attack Rating, equip load analysis, and soft cap warnings.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white">Real-Time Stat Calculations</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">Adjust any stat from 1 to 99 and see instant updates to HP, FP, Stamina, Rune Level, and equip load. Game-accurate formulas match Elden Ring's actual calculation curves including soft caps.</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white">Weapon AR Comparison</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">Select from 123 weapons and see exact Attack Rating with physical and elemental damage breakdowns. Check stat requirements and upgrade levels instantly.</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white">Build Presets &amp; Sharing</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">Start from presets like Pure Strength, Bleed, or Mage builds. Share your builds via URL with one click.</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white">Boss Strategy Guides</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">Conquer every boss with detailed strategy guides. Learn attack patterns, phase transitions, and optimal positioning for Margit, Godrick, Malenia, and more.</p>
              </div>
            </div>

            <div id="tools" className="mt-16 scroll-mt-24">
              <h3 className="text-xl font-bold text-white">Elden Ring Tools</h3>
              <div className="mt-6 space-y-3">
                <Link href="/elden-ring/tools/build-calculator" className="group block rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4 transition-all hover:border-[#c9a227]/30 hover:bg-[#12121a]">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚔️</span>
                    <div>
                      <span className="text-base font-semibold text-[#e8d5a3] group-hover:text-white">Elden Ring Build Calculator</span>
                      <p className="mt-0.5 text-sm text-zinc-500">Plan and optimize your character build with real-time stat calculations.</p>
                    </div>
                  </div>
                </Link>
                <div className="group block rounded-sm border border-white/5 bg-[#0a0a0f]/50 p-4 opacity-60">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔍</span>
                    <div>
                      <span className="text-base font-semibold text-zinc-600">Weapon Finder</span>
                      <span className="ml-3 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">Coming Soon</span>
                      <p className="mt-0.5 text-sm text-zinc-600">Find weapons by stat requirements, damage type, and scaling.</p>
                    </div>
                  </div>
                </div>
                <div className="group block rounded-sm border border-white/5 bg-[#0a0a0f]/50 p-4 opacity-60">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🐉</span>
                    <div>
                      <span className="text-base font-semibold text-zinc-600">Boss Weakness Finder</span>
                      <span className="ml-3 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">Coming Soon</span>
                      <p className="mt-0.5 text-sm text-zinc-600">Search boss weaknesses, resistances, and strategy recommendations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-bold text-white">Popular Elden Ring Guides</h3>
              <div className="mt-6 space-y-3">
                <div className="rounded-sm border border-white/10 bg-[#12121a] p-4">
                  <Link href="/elden-ring/builds" className="text-base font-semibold text-[#c9a227] hover:underline">Elden Ring Builds</Link>
                  <p className="mt-1 text-sm text-zinc-500">Meta builds for every playstyle — Strength, Dexterity, Intelligence, Faith, Arcane, and hybrid builds.</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link href="/elden-ring/tools/build-calculator" className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">Build Calculator</Link>
                    <Link href="/elden-ring/builds" className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">All Builds</Link>
                  </div>
                </div>
                <div className="rounded-sm border border-white/10 bg-[#12121a] p-4">
                  <Link href="/elden-ring/bosses" className="text-base font-semibold text-[#c9a227] hover:underline">Elden Ring Bosses</Link>
                  <p className="mt-1 text-sm text-zinc-500">Detailed boss strategies for Margit, Godrick, Malenia, Radahn, and every boss in the Lands Between.</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link href="/elden-ring/bosses" className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">All Boss Guides</Link>
                  </div>
                </div>
                <div className="rounded-sm border border-white/10 bg-[#12121a] p-4">
                  <Link href="/elden-ring/weapons" className="text-base font-semibold text-[#c9a227] hover:underline">Elden Ring Weapons</Link>
                  <p className="mt-1 text-sm text-zinc-500">Weapon guides covering Moonveil, Rivers of Blood, Bloodhound's Fang, Dark Moon Greatsword, and more.</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link href="/elden-ring/tools/build-calculator" className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">Build Calculator</Link>
                    <Link href="/elden-ring/weapons" className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-white hover:underline">All Weapons</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Homepage FAQ Section */}
      <section id="faq" className="scroll-mt-24 border-t border-[#b8956a]/10 bg-[#050508]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Elden Ring Build Calculator — FAQ</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Everything you need to know about the Elden Ring Build Calculator and Zosygo.
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
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{"Ready to Optimize Your Build?"}</h2>
            <p className="mt-4 max-w-xl text-sm text-zinc-500 sm:text-base">{"Plan your perfect Elden Ring build with the Build Calculator. Try the presets or create your own."}</p>
            <nav aria-label={"Elden Ring Tools"} className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/elden-ring/tools/build-calculator" className="rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all hover:scale-[1.02]">
                Open Build Calculator
              </Link>
              <Link href="/elden-ring" className="rounded-sm border border-[#b8956a]/30 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:border-[#c9a227]/50">
                Explore Elden Ring Hub
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
