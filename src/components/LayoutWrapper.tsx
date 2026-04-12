"use client";

import dynamic from 'next/dynamic';

// Dynamic imports to reduce initial bundle size
const Navbar = dynamic(() => import("@/src/components/Navbar"), {
  loading: () => <div className="h-16 w-full bg-slate-50 dark:bg-[#1a1816]" />,
  ssr: true,
});

const Footer = dynamic(() => import("@/src/components/Footer"), {
  loading: () => <div className="h-20 w-full bg-slate-50 dark:bg-[#1a1816]" />,
  ssr: true,
});

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
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
