import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "elden-ring") return { robots: { index: false, follow: false } };

  return {
    title: "Elden Ring Build Calculator — Plan Your Perfect Build | Zosygo",
    description:
      "Free Elden Ring Build Calculator with game-accurate stat formulas. Plan your character build, compare weapon AR, and optimize stats for any playstyle.",
    openGraph: {
      title: "Elden Ring Build Calculator — Plan Your Perfect Build",
      description:
        "Free Elden Ring Build Calculator with game-accurate stat formulas. Plan your character build, compare weapon AR, and optimize stats for any playstyle.",
      url: "https://zosygo.com/elden-ring/tools/build-calculator",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://zosygo.com/elden-ring/tools/build-calculator",
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
