import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Elden Ring Build Planner 2026 – Calculator & Stat Optimizer | Zosygo",
    description:
      "Create, optimize, and share your Elden Ring builds. Plan stats, weapons, armor, talismans, and spells with real-time calculations and damage optimization.",
    openGraph: {
      title: "Elden Ring Build Planner 2026 – Calculator & Stat Optimizer",
      description:
        "Create, optimize, and share your Elden Ring builds. Plan stats, weapons, armor, talismans, and spells with real-time calculations and damage optimization.",
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
