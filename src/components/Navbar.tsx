"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/src/components/ThemeProvider";

const navigation = [
{ label: "Beranda", href: "/" },
{ label: "Buku", href: "/buku" },
{ label: "Tulisan", href: "/tulisan" },
{ label: "Tentang", href: "/tentang" },
];

export default function Navbar() {
const pathname = usePathname();
const { theme, toggleTheme } = useTheme();

const [isMenuOpen, setIsMenuOpen] = useState(false);
const [mounted, setMounted] = useState(false);

/* =========================
HYDRATION SAFE
========================= */

useEffect(() => {
setMounted(true);
}, []);

if (!mounted) return null;

return (
<nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-[#faf8f5]/80 dark:bg-[#1a1816]/80 border-b border-[#8b7355]/10">

  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

    {/* Logo */}
    <Link
      href="/"
      className="font-serif text-lg tracking-wider opacity-80 hover:opacity-100"
    >
      Kelas Pekerja
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-8">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm tracking-wider transition-opacity ${
            pathname === item.href
              ? "opacity-100"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>

    {/* Right Section */}
    <div className="flex items-center gap-3">

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-[#8b7355]/10 transition"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-full hover:bg-[#8b7355]/10"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

    </div>
  </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <div className="md:hidden border-t border-[#8b7355]/10 bg-[#faf8f5] dark:bg-[#1a1816]">

      <div className="px-6 py-6 flex flex-col gap-4">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className={`text-sm ${
              pathname === item.href
                ? "opacity-100"
                : "opacity-60"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

    </div>
  )}
</nav>

);
}
