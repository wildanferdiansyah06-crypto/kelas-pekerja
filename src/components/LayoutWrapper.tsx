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

  const isBookReader =
    pathname?.startsWith("/buku/") && pathname.split("/").length > 2;

  return (
    <>
      {!isBookReader && <Navbar />}

      <main className={`min-h-screen ${!isBookReader ? "pt-16" : ""}`}>
        {children}
      </main>

      {!isBookReader && <Footer />}
    </>
  );
}
