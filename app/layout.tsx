import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { canonical, site } from "@/lib/store";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "NewsVeria — Verified Global News, Clearly Explained", template: "%s | NewsVeria" },
  description: site.description,
  alternates: { canonical: canonical("/") },
  openGraph: {
    type: "website",
    siteName: "NewsVeria",
    title: "NewsVeria — Verified Global News, Clearly Explained",
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image", title: "NewsVeria", description: site.description },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "NewsVeria",
    url: site.url,
    slogan: site.tagline,
    sameAs: [],
  };
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {ga ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`,
              }}
            />
          </>
        ) : null}
        <Header />
        <main className="wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
