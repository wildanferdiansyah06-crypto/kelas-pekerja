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

  const isBookPage = pathname?.startsWith("/buku");

  return (
    <>
      {/* Navbar hanya untuk halaman normal */}
      {!isBookPage && <Navbar />}

      {/* halaman buku tidak butuh padding karena tidak ada navbar */}
      <main className={`${!isBookPage ? "pt-16" : ""} min-h-screen`}>
        {children}
      </main>

      {/* Footer juga hanya halaman normal */}
      {!isBookPage && <Footer />}
    </>
  );
}
