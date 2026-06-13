import Link from "next/link";
import type { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  gameSlug: string;
  accentColor: string;
}

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "New Player",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "#2ecc71",
  intermediate: "#f39c12",
  advanced: "#e74c3c",
  expert: "#9b59b6",
};

export default function ArticleCard({
  article,
  gameSlug,
  accentColor,
}: ArticleCardProps) {
  const href = `/${gameSlug}/${article.category}/${article.slug}`;
  const difficultyLabel = article.difficulty
    ? DIFFICULTY_LABELS[article.difficulty]
    : null;
  const difficultyColor = article.difficulty
    ? DIFFICULTY_COLORS[article.difficulty]
    : null;

  return (
    <Link
      href={href}
      className="group block rounded-sm border border-white/10 bg-[#12121a] p-5 transition-all hover:border-white/20 hover:bg-[#1a1a24]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            className="text-base font-semibold text-white transition-colors group-hover:underline"
            style={{ color: "inherit" }}
          >
            {article.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 line-clamp-2">
            {article.metaDescription}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
        {difficultyLabel && (
          <span
            className="rounded-sm px-2 py-0.5 font-medium"
            style={{
              backgroundColor: `${difficultyColor || "#888"}18`,
              color: difficultyColor || "#888",
              border: `1px solid ${difficultyColor || "#888"}33`,
            }}
          >
            {difficultyLabel}
          </span>
        )}
        <span className="text-zinc-600">{article.readTimeMinutes} min read</span>
        <span
          className="ml-auto text-xs font-medium uppercase tracking-wider transition-colors group-hover:text-[#c9a227]"
          style={{ color: accentColor as string }}
        >
          Read Guide &rarr;
        </span>
      </div>
    </Link>
  );
}
