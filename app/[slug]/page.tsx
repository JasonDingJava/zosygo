import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GamePageContent from "@/components/GamePageContent";
import { getLocalizedGame, getLocalizedGames } from "@/lib/getLocalizedGames";
import { getGameSlugs } from "@/lib/games";
import { generateGameMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};
export function generateStaticParams() {
  return getGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getLocalizedGame(slug, "en");
  if (!game) return {};

  return generateGameMetadata(game);
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;

  const game = await getLocalizedGame(slug, "en");
  if (!game) {
    notFound();
  }

  const allGames = await getLocalizedGames("en");
  const otherGames = allGames.filter((g) => g.slug !== slug);

  return <GamePageContent game={game} />;
}