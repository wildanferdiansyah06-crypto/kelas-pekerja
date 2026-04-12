import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import "../styles/performance.css";

import { ThemeProvider } from "@/src/components/ThemeProvider";
import { NavbarProvider } from "@/src/contexts/NavbarContext";
import dynamic from 'next/dynamic';
import LayoutWrapper from "@/src/components/LayoutWrapper";
import { SpeedInsights } from '@vercel/speed-insights/next';
import SessionProvider from "@/src/components/Providers";

// Dynamic import for ReadingProgress to reduce initial bundle
const ReadingProgress = dynamic(() => import("@/src/components/ReadingProgress"), {
  ssr: false,
  loading: () => null,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
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
    site: "@iamwildan",
    creator: "@iamwildan",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f8fafc",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased transition-colors duration-500 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 text-slate-700 dark:bg-gradient-to-br dark:from-[#1a1816] dark:via-[#2c2420] dark:to-[#1a1816] dark:text-[#e8e0d5] noise-texture subtle-variation`}
      >
        <SessionProvider>
          <ThemeProvider>
            <NavbarProvider>
              <ReadingProgress />

              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </NavbarProvider>
          </ThemeProvider>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
