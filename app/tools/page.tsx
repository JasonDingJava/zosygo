import Link from "next/link";
import { getAllGames } from "@/lib/games";
import { Cinzel } from "next/font/google";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

const GAME_TOOLS: Record<string, { name: string; description: string; href: string; icon: string }[]> = {
  "elden-ring": [
    {
      name: "Build Planner",
      description: "Plan and optimize your Elden Ring character build. Allocate stats, pick weapons, see real-time AR calculations.",
      href: "/elden-ring/tools/build-calculator",
      icon: "⚔️",
    },
    {
      name: "Weapon AR Calculator",
      description: "Compare Attack Rating across all 123 weapons. Adjust stats, upgrade level, and see scaling breakdown instantly.",
      href: "/elden-ring/tools/weapon-ar-calculator",
      icon: "🗡️",
    },
    {
      name: "Rune Level Calculator",
      description: "Calculate runes needed for any level range from 1 to 713. Interactive cost curve, farming time estimates, and preset targets.",
      href: "/elden-ring/tools/rune-level-calculator",
      icon: "💀",
    },
  ],
};

export default function ToolsHubPage() {
  const games = getAllGames().filter((g) => GAME_TOOLS[g.slug]?.length);

  const jsonLdSchemas = [
    generateBreadcrumbJsonLd([
      { name: "Zosygo", url: "https://www.zosygo.com" },
      { name: "Game Tools", url: "https://www.zosygo.com/tools" },
    ]),
  ];

  return (
    <div className={cinzel.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }} />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li className="text-zinc-500">Tools</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Game Tools</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Community-built tools to help you plan, optimize, and master your favorite games.
        </p>

        {games.length === 0 && (
          <p className="mt-10 text-zinc-500">No tools available yet. Check back soon!</p>
        )}

        {games.map((game) => (
          <div key={game.slug} className="mt-12">
            <div className="flex items-center gap-3 border-b border-[#b8956a]/10 pb-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: game.accentColor }} />
              <h2 className="font-display text-xl font-bold text-white">{game.name}</h2>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {GAME_TOOLS[game.slug].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-6 transition-all hover:border-[#c9a227]/30 hover:bg-[#12121a]"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-2xl">{tool.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#e8d5a3]">{tool.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{tool.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}