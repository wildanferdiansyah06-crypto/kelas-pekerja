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

  // pecah path jadi segment
  const segments = pathname.split("/").filter(Boolean);

  /**
   * Reader mode hanya untuk:
   * /buku/[slug]
   */
  const isBookReader =
    segments.length === 2 && segments[0] === "buku";

  return (
    <>
      {/* Navbar */}
      {!isBookReader && <Navbar />}

      <main className={`min-h-screen ${!isBookReader ? "pt-16" : ""}`}>
        {children}
      </main>

      {/* Footer */}
      {!isBookReader && <Footer />}
    </>
  );
}
