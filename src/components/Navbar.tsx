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
const lastScrollYRef = useRef(0);

useEffect(() => {
setMounted(true);
}, []);

// Auto-hide navbar on scroll
useEffect(() => {
  if (!mounted) return;

  let ticking = false;
  const scrollThreshold = 100;
  let scrollDirection = 'up';
  
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        try {
          const currentScrollY = window.scrollY || document.documentElement.scrollTop;
          const lastScrollY = lastScrollYRef.current;
          
          // Determine scroll direction
          if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
          } else if (currentScrollY < lastScrollY) {
            scrollDirection = 'up';
          }
          
          // Always show navbar at the top
          if (currentScrollY <= 0) {
            if (!isVisible) setIsVisible(true);
          } 
          // Hide when scrolling down and past threshold
          else if (scrollDirection === 'down' && currentScrollY > scrollThreshold) {
            if (isVisible) setIsVisible(false);
          } 
          // Show when scrolling up
          else if (scrollDirection === 'up') {
            if (!isVisible) setIsVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
        } catch (error) {
          console.error('Navbar scroll error:', error);
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  // Initial scroll position
  lastScrollYRef.current = window.scrollY || document.documentElement.scrollTop;

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [mounted, isVisible]);

if (!mounted) return null;

return (
<nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-[#faf8f5]/90 dark:bg-[#1a1816]/90 border-b border-[#8b7355]/10 transition-transform duration-300 ease-in-out will-change-transform ${
  isVisible ? 'translate-y-0' : '-translate-y-full'
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
