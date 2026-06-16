import { Cinzel } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Contact | Zosygo",
  description: "Get in touch with the Zosygo team.",
};

export default function ContactPage() {
  return (
    <div className={cinzel.variable}>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li className="text-zinc-500">Contact</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl font-bold text-white">Contact</h1>
        <p className="mt-2 text-sm text-zinc-500">Have a question, suggestion, or found a bug? We&apos;d love to hear from you.</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-400">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-display text-lg font-semibold text-white mb-3">Email</h2>
            <p>
              <a href="mailto:contact@zosygo.com" className="text-[#c9a227] hover:underline">
                contact@zosygo.com
              </a>
            </p>
            <p className="mt-2 text-zinc-500">
              We aim to respond within 48 hours.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-display text-lg font-semibold text-white mb-3">What You Can Reach Us About</h2>
            <ul className="space-y-2">
              <li>✦ Bug reports or site issues</li>
              <li>✦ Content suggestions or corrections</li>
              <li>✦ Build calculator feedback</li>
              <li>✦ Advertising or partnership inquiries</li>
              <li>✦ General questions</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}