import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Elden Ring Build Planner 2026 – Calculator, Damage & Stat Optimization | Zosygo",
    description:
      "Create and optimize Elden Ring builds with our interactive build planner. Calculate weapon damage, compare stats, test weapons, armor, talismans, and spells for your perfect build.",
    openGraph: {
      title: "Elden Ring Build Planner 2026 – Calculator, Damage & Stat Optimization",
      description:
        "Create and optimize Elden Ring builds with our interactive build planner. Calculate weapon damage, compare stats, test weapons, armor, talismans, and spells for your perfect build.",
      url: "https://www.zosygo.com/elden-ring/tools/build-calculator",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.zosygo.com/elden-ring/tools/build-calculator",
    },
  };
}

export default function BuildCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
