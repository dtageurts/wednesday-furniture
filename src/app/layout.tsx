import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wednesdayfurniture.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wednesday — solid wood furniture, made by hand in Amsterdam",
    template: "%s · Wednesday",
  },
  description:
    "Solid wood furniture made by hand in Amsterdam by one maker. Pieces in fixed sizes, or send a photo of what you have in mind.",
  openGraph: {
    title: "Wednesday — solid wood furniture, made by hand in Amsterdam",
    description:
      "Solid wood furniture made by hand in Amsterdam by one maker. Pieces in fixed sizes, or send a photo of what you have in mind.",
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
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=gambetta@400,500,400i&f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Wednesday",
              description:
                "Furniture maker in Amsterdam, NL — made-to-measure cabinets, tables, shelves and light fittings.",
              areaServed: "Amsterdam, NL",
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
