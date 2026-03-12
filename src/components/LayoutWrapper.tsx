"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  /**
   * Reader mode hanya aktif di halaman buku:
   * /buku/slug
   * tapi tidak di:
   * /buku
   */
  const isBookReader =
    pathname?.startsWith("/buku/") && pathname !== "/buku";

  return (
    <>
      {/* Navbar hanya muncul di halaman normal */}
      {!isBookReader && <Navbar />}

      <main
        className={`min-h-screen ${
          !isBookReader ? "pt-16" : ""
        }`}
      >
        {children}
      </main>

      {/* Footer hanya muncul di halaman normal */}
      {!isBookReader && <Footer />}
    </>
  );
}
