import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import "../styles/performance.css";

import { ThemeProvider } from "@/src/components/ThemeProvider";
import { NavbarProvider } from "@/src/contexts/NavbarContext";
import ReadingProgress from "@/src/components/ReadingProgress";
import LayoutWrapper from "@/src/components/LayoutWrapper";
import { SpeedInsights } from '@vercel/speed-insights/next';
import SessionProvider from "@/src/components/Providers";
import AmbientBackground from "@/src/components/AmbientBackground";
import Script from "next/script";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600"],
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
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${cormorantGaramond.variable} ${inter.variable}`}>

        {/* CSS Animated Background — selalu terlihat, tidak bergantung WebGL */}
        <div id="bg-scene" aria-hidden="true">
          <div className="bg-blob bg-blob-1" />
          <div className="bg-blob bg-blob-2" />
          <div className="bg-blob bg-blob-3" />
          <div className="bg-blob bg-blob-4" />
          <div className="bg-blob bg-blob-5" />
        </div>

        <canvas id="gl" aria-hidden="true"></canvas>
        <div id="vignette"></div>
        <div id="grain"></div>
        <div className="cur-dot" id="cursor"></div>

        {/* Preloader */}
        <div id="pre">
          <div className="pre-in">
            <div className="pre-mark">
              <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <path d="M13 19h18l-2.6 12.4a2 2 0 0 1-2 1.6H17.6a2 2 0 0 1-2-1.6L13 19Z" stroke="#ece3d3" strokeWidth="1.4"/>
                <path d="M31 21c4 0 5.6 2 5.6 4.6S35 30 31 29.6" stroke="#c9903f" strokeWidth="1.4"/>
                <path d="M18 15c-1.6-1.6-1.6-3 0-4.6M23 15c-1.6-1.6-1.6-3 0-4.6" stroke="#d1602f" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="pre-word">KELAS PEKERJA</div>
            <div className="pre-bar"><i id="pre-fill"></i></div>
            <div className="pre-meta"><span>Menyalakan lampu malam&hellip;</span><b><span id="pre-pct">0</span>%</b></div>
          </div>
        </div>

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
        
        {/* Scripts */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/128/three.min.js" strategy="afterInteractive" />

        <AmbientBackground />
      </body>
    </html>
  );
}
