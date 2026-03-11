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

  // cek apakah halaman buku
  const isBookPage = pathname?.startsWith("/buku");

  return (
    <>
      {/* Navbar hanya muncul di halaman normal */}
      {!isBookPage && <Navbar />}

      {/* Main content */}
      <main
        className={`min-h-screen ${
          isBookPage
            ? "pt-24 md:pt-28 px-4"
            : "pt-16"
        }`}
      >
        {children}
      </main>

      {/* Footer hanya muncul di halaman normal */}
      {!isBookPage && <Footer />}
    </>
  );
}
