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

  // reader mode hanya untuk halaman buku slug
  const isBookReader =
    pathname?.startsWith("/buku/") && pathname.split("/").length > 2;

  return (
    <>
      {/* Navbar hanya untuk halaman normal */}
      {!isBookReader && <Navbar />}

      <main
        className={`min-h-screen ${
          isBookReader
            ? "pt-28 md:pt-32 px-4"
            : "pt-16"
        }`}
      >
        {children}
      </main>

      {/* Footer hanya untuk halaman normal */}
      {!isBookReader && <Footer />}
    </>
  );
}
