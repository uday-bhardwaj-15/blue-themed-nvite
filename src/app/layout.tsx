import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "@/styles.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inshu & Archit — Wedding Invitation | November 25, 2026",
  description:
    "You are warmly invited to the wedding of Inshu & Archit on November 25, 2026 at The Regis Resort, Meerut. Open the envelope for the full invitation.",
  authors: [{ name: "Inshu & Archit" }],
  openGraph: {
    title: "Inshu & Archit — Wedding Invitation | November 25, 2026",
    description:
      "You are warmly invited to the wedding of Inshu & Archit on November 25, 2026 at The Regis Resort, Meerut. Open the envelope for the full invitation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inshu & Archit — Wedding Invitation | November 25, 2026",
    description:
      "You are warmly invited to the wedding of Inshu & Archit on November 25, 2026 at The Regis Resort, Meerut. Open the envelope for the full invitation.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorantGaramond.variable} ${ebGaramond.variable}`}
    >
      <body className="antialiased font-body bg-background text-foreground selection:bg-primary/20">
        {children}
      </body>
    </html>
  );
}
