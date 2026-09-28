import type { Metadata } from "next";
import "@fontsource/newsreader/300.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/mrs-saint-delafield/400.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wednesdayfurniture.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wednesday — Furniture made in Utrecht",
    template: "%s · Wednesday",
  },
  description:
    "Wednesday is one maker, one workshop in Utrecht — furniture built for the room it goes in. Solid spruce and pine, cut and joined by hand.",
  openGraph: {
    title: "Wednesday — Furniture made in Utrecht",
    description:
      "Furniture built for the room it goes in. Solid spruce and pine, cut and joined by hand.",
    url: siteUrl,
    siteName: "Wednesday",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "var(--font-sans), sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Wednesday",
              description: "Furniture maker in Utrecht, NL — made-to-measure cabinets, tables, shelves and light fittings.",
              areaServed: "Utrecht, NL",
              email: "contact@wednesdayfurniture.com",
              url: siteUrl,
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
