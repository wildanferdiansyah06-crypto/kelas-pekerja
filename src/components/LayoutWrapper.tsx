"use client";

import Navbar from "@/src/components/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-16">
        {children}
      </main>
    </>
  );
}
