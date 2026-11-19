import type { Metadata, Viewport } from "next";
import { Anton, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MARK_PULSE } from "@/components/Logo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

// Free stand-ins for the reference site's commercial faces:
// Anton for the condensed display headlines, Hanken Grotesk for everything else.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: "Structured health intelligence from places that have never had any. Piloting in Kampala, Uganda.",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f7f4e8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${hanken.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal,.rise-line>span,.head-line>span{opacity:1!important;transform:none!important}.reveal-media{clip-path:none!important}.stat,.stat .media{transform:none!important}.stat__cover,.splash{display:none!important}`}</style>
        </noscript>

        <div className="splash" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#c9f44b" />
            <path d={MARK_PULSE} fill="none" stroke="#100d10" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />

        {process.env.NODE_ENV === "production" && (
          <Script src="https://gc.zgo.at/count.js" data-goatcounter={site.goatcounter} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
