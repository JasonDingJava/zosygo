import { Cinzel } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Terms of Service | Zosygo",
  description: "Zosygo terms of service — rules, disclaimers, and usage guidelines.",
};

export default function TermsPage() {
  return (
    <div className={cinzel.variable}>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li className="text-zinc-500">Terms of Service</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl font-bold text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: June 16, 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Zosygo (zosygo.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use our site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              Zosygo provides game guides, build calculators, boss strategies, and related content for video games, primarily Elden Ring. All content is provided for informational and entertainment purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">3. Intellectual Property</h2>
            <p>
              All original content on Zosygo — including guides, tools, calculators, and written articles — is the property of Zosygo unless otherwise noted. You may not reproduce, distribute, or create derivative works without our permission.
            </p>
            <p className="mt-2">
              Game names, trademarks, and related imagery are the property of their respective owners. Elden Ring is a trademark of Bandai Namco Entertainment Inc. and FromSoftware Inc.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">4. User Conduct</h2>
            <p>By using Zosygo, you agree not to:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Use the site for any illegal purpose</li>
              <li>Attempt to disrupt or damage the site&apos;s functionality</li>
              <li>Scrape, crawl, or extract content without authorization</li>
              <li>Misrepresent your affiliation with Zosygo</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">5. Disclaimer</h2>
            <p>
              Zosygo provides content &ldquo;as is&rdquo; without any warranty, express or implied. We do not guarantee the accuracy, completeness, or timeliness of any content. Game mechanics and stats may change with patches and updates.
            </p>
            <p className="mt-2">
              Zosygo is an independent fan project. We are not affiliated with, endorsed by, or sponsored by Bandai Namco Entertainment Inc., FromSoftware Inc., or any other game publisher.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              Zosygo shall not be liable for any damages arising from the use or inability to use our site or content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">7. External Links</h2>
            <p>
              Our site may contain links to third-party websites. We are not responsible for the content or practices of these external sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href="mailto:contact@zosygo.com" className="text-[#c9a227] hover:underline">contact@zosygo.com</a>.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}