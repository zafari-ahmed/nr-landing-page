import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Loaded via a classic <link> tag below (see <head>) instead of next/font/google.
// next/font fetches font files from Google at BUILD time, which fails in
// network-restricted build environments (CI runners without outbound
// internet, sandboxed containers, etc). A <link> tag fetches at request
// time in the browser instead, exactly like the original Vite site did in
// index.html, so it's more portable across hosting/CI setups. If your
// deployment always has build-time internet access and you want
// self-hosted fonts (no third-party request from visitors' browsers),
// swap this back to next/font/google.

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Aviation & Civil Engineering Construction`,
    template: `%s | ${siteConfig.name}`,
  },
  alternates: {
    canonical: '/',
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Aviation & Civil Engineering Construction`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Aviation & Civil Engineering Construction`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    sameAs: [siteConfig.social.linkedin],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- intentional: applies globally from the root layout, the rule just can't detect that in App Router */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Providers>
          <div className="min-h-screen">
            <Navigation />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
