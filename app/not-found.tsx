import Link from "next/link";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

export default function NotFound() {
  return (
    <div className={`${cinzel.variable} min-h-[70vh] flex items-center justify-center`}>
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="relative">
          <p className="text-[120px] font-bold leading-none text-[#c9a227]/10 sm:text-[160px] select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Page Not Found</h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                The page you are looking for does not exist or has been moved.
                Explore Elden Ring tools and guides instead.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500">Popular Destinations</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-8 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-[1.02]"
            >
              🏠 Home
            </Link>
            <Link
              href="/elden-ring/tools/build-calculator"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-[#b8956a]/30 px-8 text-sm font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:border-[#c9a227]/50"
            >
              ⚔️ Build Planner
            </Link>
            <Link
              href="/elden-ring"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-[#b8956a]/30 px-8 text-sm font-semibold uppercase tracking-wider text-[#e8d5a3] transition-colors hover:border-[#c9a227]/50"
            >
              📖 Elden Ring Hub
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href="/elden-ring/builds" className="text-xs text-zinc-500 underline-offset-2 hover:text-[#c9a227] hover:underline">Builds</Link>
            <Link href="/elden-ring/bosses" className="text-xs text-zinc-500 underline-offset-2 hover:text-[#c9a227] hover:underline">Bosses</Link>
            <Link href="/elden-ring/weapons" className="text-xs text-zinc-500 underline-offset-2 hover:text-[#c9a227] hover:underline">Weapons</Link>
            <Link href="/elden-ring/tools" className="text-xs text-zinc-500 underline-offset-2 hover:text-[#c9a227] hover:underline">Tools</Link>
          </div>
        </div>
      </div>
    </div>
  );
}