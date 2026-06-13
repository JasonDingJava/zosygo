import { getAllGames, getGameBySlug } from "./games";

/**
 * Get all games (English only).
 */
export async function getLocalizedGames(_locale: string) {
  return getAllGames();
}

/**
 * Get a single game by slug (English only).
 */
export async function getLocalizedGame(slug: string, _locale: string) {
  return getGameBySlug(slug);
}
