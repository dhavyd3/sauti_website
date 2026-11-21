import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageTransitions } from "@/components/PageTransitions";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

// Served from sautihealth.com itself, so phones make no extra trip to Google.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    title: `${site.name} · ${site.slogan}`,
    description: "AI emergency dispatch that understands callers in 50+ languages, on any phone.",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  ...(site.googleSiteVerification ? { verification: { google: site.googleSiteVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <PageTransitions />
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
