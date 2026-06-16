import { Cinzel } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Disclaimer | Zosygo",
  description: "Zosygo disclaimer — affiliate disclosure, content accuracy, and legal notices.",
};

export default function DisclaimerPage() {
  return (
    <div className={cinzel.variable}>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li className="text-zinc-500">Disclaimer</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl font-bold text-white">Disclaimer</h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: June 16, 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Content Disclaimer</h2>
            <p>
              The content on Zosygo is provided for general informational and entertainment purposes only. While we strive to keep information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the content.
            </p>
            <p className="mt-3">
              Game mechanics, stats, and balance may change with patches and updates. Always verify critical information in-game.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Trademark Disclaimer</h2>
            <p>
              Elden Ring is a registered trademark of Bandai Namco Entertainment Inc. and FromSoftware Inc. All other trademarks, game titles, and copyrights are the property of their respective owners.
            </p>
            <p className="mt-3">
              Zosygo is an independent fan project. We are not affiliated with, endorsed by, sponsored by, or officially connected to Bandai Namco Entertainment Inc., FromSoftware Inc., or any of their subsidiaries or affiliates.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">External Links Disclaimer</h2>
            <p>
              Zosygo may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Affiliate Disclosure</h2>
            <p>
              Zosygo may use affiliate links. If you click on an affiliate link and make a purchase, we may receive a small commission at no additional cost to you. We only recommend products and services that we believe provide value to our audience.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Advertising Disclaimer</h2>
            <p>
              Zosygo displays advertisements through Google AdSense. The presence of ads does not constitute an endorsement of the advertised products or services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Limitation of Liability</h2>
            <p>
              In no event shall Zosygo be liable for any loss or damage arising from the use of this website or reliance on any content provided herein.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">Contact</h2>
            <p>
              If you have any questions about this disclaimer, please contact us at{" "}
              <a href="mailto:contact@zosygo.com" className="text-[#c9a227] hover:underline">contact@zosygo.com</a>.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}