import { Cinzel } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Privacy Policy | Zosygo",
  description: "Zosygo privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className={cinzel.variable}>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
            <li aria-hidden className="text-zinc-700">/</li>
            <li className="text-zinc-500">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: June 16, 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Zosygo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at zosygo.com.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <h3 className="font-display text-base font-semibold text-zinc-300 mt-4">2.1 Automatically Collected Information</h3>
            <p className="mt-2">
              When you visit Zosygo, we may automatically collect certain information through Google Analytics, including:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Pages visited and time spent on each page</li>
              <li>Referring website or search engine</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Approximate geographic location (city/country level)</li>
            </ul>

            <h3 className="font-display text-base font-semibold text-zinc-300 mt-4">2.2 Information You Provide</h3>
            <p className="mt-2">
              We do not currently require user accounts or registration. If you contact us via email, we will receive the information you provide in your message.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">3. Cookies</h2>
            <p>
              Zosygo uses cookies and similar tracking technologies to improve your experience and analyze site traffic.
            </p>
            <h3 className="font-display text-base font-semibold text-zinc-300 mt-4">3.1 Types of Cookies We Use</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Analytics Cookies:</strong> We use Google Analytics to understand how visitors interact with our site. These cookies collect anonymous information about browsing behavior.</li>
              <li><strong>Advertising Cookies:</strong> We use Google AdSense to display ads. AdSense may use cookies to serve personalized ads based on your browsing history.</li>
              <li><strong>Functional Cookies:</strong> These cookies enable core site functionality and are necessary for the site to work properly.</li>
            </ul>
            <h3 className="font-display text-base font-semibold text-zinc-300 mt-4">3.2 Managing Cookies</h3>
            <p className="mt-2">
              You can control cookies through your browser settings. Disabling cookies may affect certain features of our site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">4. Google Services</h2>
            <p>
              We use the following Google services on Zosygo:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Google Analytics</strong> — for traffic analysis and usage patterns</li>
              <li><strong>Google AdSense</strong> — for displaying advertisements</li>
            </ul>
            <p className="mt-2">
              Google&apos;s use of information collected through these services is governed by Google&apos;s Privacy Policy. You can learn more about how Google uses data at{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[#c9a227] hover:underline">
                Google&apos;s Partner Sites Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">5. Third-Party Links</h2>
            <p>
              Our site contains links to third-party websites, including Fextralife Wiki, Bandai Namco, and Steam. We are not responsible for the privacy practices of these external sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">7. Children&apos;s Privacy</h2>
            <p>
              Zosygo is not intended for children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:contact@zosygo.com" className="text-[#c9a227] hover:underline">contact@zosygo.com</a>.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}