import { Cinzel } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "About | Zosygo",
  description: "Zosygo is an independent game tools and guides site focused on Elden Ring builds, calculators, and boss strategies.",
};

export default function AboutPage() {
  return (
    <div className={cinzel.variable}>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li className="text-zinc-500">About</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl font-bold text-white">About Zosygo</h1>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">What We Do</h2>
            <p>
              Zosygo is an independent game tools and guides platform. Our primary focus is Elden Ring — providing players with accurate build calculators, detailed boss strategies, weapon guides, and optimized builds for every playstyle.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">What Makes Us Different</h2>
            <ul className="space-y-3">
              <li>
                <strong className="text-zinc-300">Build Calculator</strong> — A fully interactive tool that lets you plan stats, pick weapons, and see real-time Attack Rating calculations with game-accurate formulas.
              </li>
              <li>
                <strong className="text-zinc-300">Practical Guides</strong> — No fluff, no filler. Every guide is written for players who want actionable advice, not lore essays.
              </li>
              <li>
                <strong className="text-zinc-300">Community-Focused</strong> — Built by gamers who understand what makes a good build guide vs. a bad one.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Our Philosophy</h2>
            <p>
              We believe game guides should be useful, not bloated. Every page on Zosygo exists because it helps someone beat a boss, optimize a build, or understand a game mechanic better. If it doesn&apos;t serve that purpose, it doesn&apos;t belong here.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Disclaimer</h2>
            <p>
              Zosygo is an independent fan project. We are not affiliated with, endorsed by, or sponsored by Bandai Namco Entertainment Inc., FromSoftware Inc., or any other game publisher. Elden Ring is a trademark of Bandai Namco Entertainment Inc.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Get in Touch</h2>
            <p>
              Questions, feedback, or just want to say hi?{" "}
              <Link href="/contact" className="text-[#c9a227] hover:underline">Contact us here</Link>.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}