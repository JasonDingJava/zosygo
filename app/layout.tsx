import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { generateSiteSchemaJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://www.zosygo.com"),
  title: {
    default: "Elden Ring Build Calculator, Guides & Boss Strategies | Zosygo",
    template: "%s | Zosygo",
  },
  description: "Elden Ring build calculator, starting class guide, weapon comparisons, boss strategies, and walkthroughs. Plan your perfect Tarnished build with Zosygo's free tools and detailed guides.",
  keywords: ["Elden Ring build calculator", "Elden Ring builds", "Elden Ring boss guides", "Elden Ring weapons", "Elden Ring walkthrough", "Elden Ring starting class", "Elden Ring best build", "Elden Ring guide", "Elden Ring wiki", "Zosygo"],
  alternates: {
    canonical: "https://www.zosygo.com",
    languages: { "x-default": "https://www.zosygo.com" },
  },
  openGraph: {
    title: "Elden Ring Build Calculator, Guides & Boss Strategies | Zosygo",
    description: "Elden Ring build calculator, starting class guide, weapon comparisons, boss strategies, and walkthroughs. Plan your perfect Tarnished build with Zosygo's free tools.",
    siteName: "Zosygo",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.zosygo.com/images/og-default.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elden Ring Build Calculator, Guides & Boss Strategies | Zosygo",
    description: "Elden Ring build calculator, starting class guide, weapon comparisons, boss strategies, and walkthroughs. Plan your perfect Tarnished build with Zosygo's free tools.",
    images: [{ url: "https://www.zosygo.com/images/og-default.jpg" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "zosygo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`} suppressHydrationWarning>
      <head>
        {/* Google AdSense auto-ads */}
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6804860985615859"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6W0J7EYBWW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6W0J7EYBWW', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}

        {/* JSON-LD: Site-wide schema (WebSite + Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSiteSchemaJsonLd()),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#08080c] text-zinc-100">
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
      </body>
    </html>
  );
}