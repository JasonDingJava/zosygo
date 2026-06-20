import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "elden-ring") return { robots: { index: false, follow: false } };

  return {
    title: "Elden Ring Build Calculator & Stat Optimizer — Plan, Compare & Optimize | Zosygo",
    description:
      "Free Elden Ring Build Calculator & Stat Optimizer. Plan your perfect build, compare weapon AR, optimize stats for any playstyle. Use as a Build Planner, Damage Calculator, and Meta Build tool.",
    openGraph: {
      title: "Elden Ring Build Calculator & Stat Optimizer — Plan, Compare & Optimize",
      description:
        "Free Elden Ring Build Calculator & Stat Optimizer. Plan your perfect build, compare weapon AR, optimize stats for any playstyle. Use as a Build Planner, Damage Calculator, and Meta Build tool.",
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
