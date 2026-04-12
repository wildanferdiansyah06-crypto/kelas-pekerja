import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Lora, DM_Sans } from "next/font/google";
import "./globals.css";
import "../styles/performance.css";

import { ThemeProvider } from "@/src/components/ThemeProvider";
import { NavbarProvider } from "@/src/contexts/NavbarContext";
import ReadingProgress from "@/src/components/ReadingProgress";
import LayoutWrapper from "@/src/components/LayoutWrapper";
import { SpeedInsights } from '@vercel/speed-insights/next';
import SessionProvider from "@/src/components/Providers";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  weight: ["400"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500"],
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
  themeColor: "#7c5c3a",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${dmSerifDisplay.variable} ${lora.variable} ${dmSans.variable} font-body antialiased transition-colors duration-500`}
        style={{
          backgroundColor: 'var(--kp-bg-base)',
          color: 'var(--kp-text-primary)',
        }}
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
