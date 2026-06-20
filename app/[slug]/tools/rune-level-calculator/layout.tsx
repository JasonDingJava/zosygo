import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "elden-ring") return { robots: { index: false, follow: false } };

  return {
    title: "Elden Ring Rune Level Calculator — Cost from 1 to 713 | Zosygo",
    description:
      "Free Elden Ring Rune Level Calculator. Calculate runes needed for any level range, estimate farming time, and view the complete cost curve from level 1 to 713.",
    openGraph: {
      title: "Elden Ring Rune Level Calculator — Cost from 1 to 713",
      description:
        "Calculate runes needed for any level range. Interactive cost chart, farming time estimates, and preset target levels.",
      url: "https://www.zosygo.com/elden-ring/tools/rune-level-calculator",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.zosygo.com/elden-ring/tools/rune-level-calculator",
    },
  };
}

export default function RuneLevelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}