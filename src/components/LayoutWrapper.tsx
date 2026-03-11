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

  const isBookPage = pathname.startsWith("/buku");

  return (
    <>
      {!isBookPage && <Navbar />}

      <main className="min-h-screen">
        {children}
      </main>

      {!isBookPage && <Footer />}
    </>
  );
}
