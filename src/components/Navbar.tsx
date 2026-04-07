"use client";

import { useState, useEffect, useRef } from "react";
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
const [isVisible, setIsVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
const scrollTimeoutRef = useRef<NodeJS.Timeout>();

useEffect(() => {
setMounted(true);
}, []);

// Auto-hide navbar on scroll
useEffect(() => {
  if (!mounted) return;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Hide navbar when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }

    // Always show navbar at the top
    if (currentScrollY <= 0) {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  // Throttle scroll events
  const throttledHandleScroll = () => {
    if (!scrollTimeoutRef.current) {
      scrollTimeoutRef.current = setTimeout(() => {
        handleScroll();
        scrollTimeoutRef.current = undefined;
      }, 16); // ~60fps
    }
  };

  window.addEventListener('scroll', throttledHandleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', throttledHandleScroll);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  };
}, [mounted, lastScrollY]);

if (!mounted) return null;

return (
<nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-[#faf8f5]/90 dark:bg-[#1a1816]/90 border-b border-[#8b7355]/10 transition-all duration-300 ease-in-out ${
  isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
}`}>

  {/* Container diperlebar */}
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

    {/* Logo */}
    <Link
      href="/"
      className="font-serif text-lg tracking-wider opacity-80 hover:opacity-100 transition-all duration-200 hover:scale-105 transform"
    >
      Kelas Pekerja
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-8">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm tracking-wider transition-all duration-200 hover:scale-105 transform ${
            pathname === item.href
              ? "opacity-100 font-medium"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>

    {/* Right Controls */}
    <div className="flex items-center gap-3">

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-[#8b7355]/10 transition-all duration-200 hover:scale-110 transform"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-full hover:bg-[#8b7355]/10 transition-all duration-200 hover:scale-110 transform"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

    </div>
  </div>

  {/* Mobile Menu */}
  <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
    isMenuOpen ? 'max-h-64 opacity-100 border-t border-[#8b7355]/10 bg-[#faf8f5] dark:bg-[#1a1816]' : 'max-h-0 opacity-0'
  }`}>
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">

      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className={`text-sm transition-all duration-200 transform hover:translate-x-1 ${
            pathname === item.href
              ? "opacity-100 font-medium"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          {item.label}
        </Link>
      ))}

    </div>
  </div>
</nav>

);
}
