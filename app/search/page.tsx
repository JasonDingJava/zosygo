import { Suspense } from "react";
import { Cinzel } from "next/font/google";
import Link from "next/link";
import SearchResults from "./SearchResults";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Search | Zosygo",
  description: "Search game guides, builds, boss strategies, and tools on Zosygo.",
};

export default function SearchPage() {
  return (
    <div className={cinzel.variable}>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white">Search</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Find guides, builds, and boss strategies across all games.
        </p>
        <Suspense fallback={<div className="mt-8 text-zinc-500">Loading...</div>}>
          <SearchResults />
        </Suspense>
      </section>
    </div>
  );
}