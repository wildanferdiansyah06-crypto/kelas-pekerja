✅ layout.tsx created

// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { ThemeProvider } from "@/src/components/ThemeProvider";

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
  description: "Catatan tentang malam, kopi, dan kehidupan. Ditulis perlahan, untuk dibaca perlahan.",
  keywords: ["kelas pekerja", "catatan malam", "kopi", "tulisan", "refleksi", "barista", "pekerja"],
  authors: [{ name: "Wildan Ferdiansyah" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kelaspekerja.id",
    siteName: "Kelas Pekerja",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Kelas Pekerja",
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_iamwildan_",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
