"use client";

import Navbar from "@/src/components/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-16 relative z-0">
        {children}
      </main>

    </div>
  );
}
