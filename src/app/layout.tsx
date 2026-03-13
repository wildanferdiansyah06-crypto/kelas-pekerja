import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/src/components/ThemeProvider";
import ReadingProgress from "@/src/components/ReadingProgress";
import LayoutWrapper from "@/src/components/LayoutWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kelas Pekerja — Arsip Sunyi Orang-Orang yang Tetap Bekerja",
    template: "%s | Kelas Pekerja",
  },
  description:
    "Catatan tentang malam, kopi, dan kehidupan. Ditulis perlahan, untuk dibaca perlahan.",
  keywords: [
    "kelas pekerja",
    "catatan malam",
    "kopi",
    "tulisan",
    "refleksi",
    "barista",
    "pekerja",
  ],
  authors: [{ name: "Wildan Ferdiansyah" }],
  creator: "Wildan Ferdiansyah",
  metadataBase: new URL("https://kelaspekerja.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kelaspekerja.site",
    siteName: "Kelas Pekerja",
    title: "Kelas Pekerja — Arsip Sunyi Orang-Orang yang Tetap Bekerja",
    description:
      "Catatan tentang malam, kopi, dan kehidupan. Ditulis perlahan, untuk dibaca perlahan.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kelas Pekerja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_iamwildan_",
    creator: "@_iamwildan_",
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
  return (
    <html lang="id" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased transition-colors duration-500`}
      >
        <ThemeProvider>
          {/* progress membaca */}
          <ReadingProgress />

          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
