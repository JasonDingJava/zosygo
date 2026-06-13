import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGames, getGameBySlug } from "@/lib/games";

const GAME_TOOLS: Record<string, { name: string; description: string; href: string; icon: string }[]> = {
  "elden-ring": [
    {
      name: "Build Calculator",
      description: "Plan and optimize your Elden Ring character build. Allocate stats, pick weapons, and see real-time AR calculations.",
      href: "/elden-ring/tools/build-calculator",
      icon: "⚔️",
    },
  ],
};

export function generateStaticParams() {
  const games = getAllGames();
  return games
    .filter((g) => GAME_TOOLS[g.slug]?.length)
    .map((g) => ({ slug: g.slug }));
}

export default function ToolsPage({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const game = getGameBySlug(slug);
    if (!game) notFound();

    const tools = GAME_TOOLS[slug];
    if (!tools?.length) notFound();

    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li><Link href={`/${slug}`} className="text-[#b8956a]/80 hover:text-[#c9a227]" style={{ color: game.accentColor }}>{game.name}</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li className="text-zinc-500">Tools</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {game.name} Tools
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Community-built tools to help you plan, optimize, and master {game.name}.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-6 transition-all hover:border-[#c9a227]/30 hover:bg-[#12121a]"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 text-2xl">{tool.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-white group-hover:text-[#e8d5a3]">
                    {tool.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  });
}
