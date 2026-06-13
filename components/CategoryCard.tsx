import Link from "next/link";
import type { Category } from "@/lib/games";

interface CategoryCardProps {
  category: Category;
  gameSlug: string;
  gameName: string;
  accentColor: string;
}

const CATEGORY_META: Record<Category, { icon: string; description: string }> = {
  builds: {
    icon: "⚔️",
    description: "Optimized character builds, stat allocations, and gear recommendations.",
  },
  bosses: {
    icon: "👹",
    description: "Boss strategy guides with attack patterns, weaknesses, and phase transitions.",
  },
  weapons: {
    icon: "🗡️",
    description: "Weapon stats, upgrade paths, and best-in-slot recommendations.",
  },
  walkthroughs: {
    icon: "📜",
    description: "Step-by-step walkthroughs from start to endgame content.",
  },
};

export default function CategoryCard({
  category,
  gameSlug,
  gameName,

  accentColor,
}: CategoryCardProps) {
  const meta = CATEGORY_META[category];
  const label = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Link
      href={`/${gameSlug}/${category}`}
      className="group rounded-sm border border-white/10 bg-[#12121a] p-5 transition-all hover:border-white/20 hover:bg-[#1a1a24]"
    >
      <div className="flex items-start gap-4">
        <span className="text-2xl" aria-hidden>{meta.icon}</span>
        <div className="min-w-0 flex-1">
          <h3
            className="text-base font-semibold transition-colors group-hover:underline"
            style={{ color: accentColor }}
          >
            {gameName} {label}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">
            {meta.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-zinc-400 transition-colors group-hover:text-white">
            Browse {label}
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
