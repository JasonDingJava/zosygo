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
  metadataBase: new URL("https://zosygo.com"),
  title: {
    default: "Zosygo — Game Guides Hub",
    template: "%s | Zosygo",
  },
  description: "Zosygo is your game guides hub and game wiki for walkthroughs, meta builds, boss strategies, and complete coverage of Elden Ring, GTA 6, Cyberpunk 2077, and more.",
  keywords: ["game guides hub", "game wiki", "walkthroughs", "boss strategies", "game builds", "Elden Ring guide", "GTA 6 guide", "Cyberpunk 2077 guide", "Zosygo"],
  alternates: {
    canonical: "https://zosygo.com",
    languages: { "x-default": "https://zosygo.com" },
  },
  openGraph: {
    title: "Zosygo — Game Guides Hub",
    description: "Zosygo is your game guides hub and game wiki for walkthroughs, meta builds, boss strategies, and complete coverage of Elden Ring, GTA 6, Cyberpunk 2077, and more.",
    siteName: "Zosygo",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://zosygo.com/images/og-default.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zosygo — Game Guides Hub",
    description: "Zosygo is your game guides hub and game wiki for walkthroughs, meta builds, boss strategies, and complete coverage of Elden Ring, GTA 6, Cyberpunk 2077, and more.",
    images: [{ url: "https://zosygo.com/images/og-default.jpg" }],
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

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