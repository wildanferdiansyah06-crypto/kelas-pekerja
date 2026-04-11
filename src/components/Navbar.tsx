"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react";
import { useTheme } from "@/src/components/ThemeProvider";
import { useNavbar } from "@/src/contexts/NavbarContext";
import { useSession, signOut } from "next-auth/react";

const navigation = [
{ label: "Beranda", href: "/" },
{ label: "Buku", href: "/buku" },
{ label: "Tulisan", href: "/tulisan" },
{ label: "Bookmark", href: "/bookmark" },
{ label: "Tentang", href: "/tentang" },
];

export default function Navbar() {
const pathname = usePathname();
const { theme, toggleTheme } = useTheme();
const { isVisible: contextVisible } = useNavbar();
const { data: session } = useSession();

const [isMenuOpen, setIsMenuOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [scrollVisible, setScrollVisible] = useState(true);
const lastScrollYRef = useRef(0);

useEffect(() => {
setMounted(true);
}, []);

// Auto-hide navbar on scroll - Performance optimized
useEffect(() => {
  if (!mounted) return;

  let ticking = false;
  const scrollThreshold = 100;
  let scrollDirection = 'up';
  let lastScrollTime = 0;
  const throttleDelay = 16; // ~60fps
  
  const handleScroll = () => {
    const now = performance.now();
    if (now - lastScrollTime < throttleDelay) return;
    
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
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
            if (!scrollVisible) setScrollVisible(true);
          } 
          // Hide when scrolling down and past threshold
          else if (scrollDirection === 'down' && currentScrollY > scrollThreshold) {
            if (scrollVisible) setScrollVisible(false);
          } 
          // Show when scrolling up
          else if (scrollDirection === 'up') {
            if (!scrollVisible) setScrollVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          lastScrollTime = now;
        } catch (error) {
          console.error('Navbar scroll error:', error);
        }
        ticking = false;
      });
    }
  };

  // Initial scroll position
  lastScrollYRef.current = window.scrollY || document.documentElement.scrollTop;

  // Use passive listener for better performance
  window.addEventListener('scroll', handleScroll, { passive: true, capture: false });
  
  return () => {
    window.removeEventListener('scroll', handleScroll, { capture: false });
  };
}, [mounted, scrollVisible]);

// Combine scroll visibility with context visibility
const finalVisibility = scrollVisible && contextVisible;

if (!mounted) return null;

return (
<nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-[#3d2817]/90 dark:bg-[#1a1816]/90 border-b border-[#8b7355]/20 transition-transform duration-300 ease-out will-change-transform transform-gpu ${
  finalVisibility ? 'translate-y-0' : '-translate-y-full'
}`}>

  {/* Container diperlebar */}
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

    {/* Logo */}
    <Link
      href="/"
      className="font-serif text-lg tracking-wider text-[#f4e4d4] opacity-90 hover:opacity-100 transition-opacity duration-200 transform-gpu will-change-transform"
    >
      Kelas Pekerja
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-8">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm tracking-wider text-[#d4a574] transition-all duration-200 transform-gpu will-change-transform ${
            pathname === item.href
              ? "text-[#f4e4d4] font-medium"
              : "hover:text-[#f4e4d4]"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>

    {/* Right Controls */}
    <div className="flex items-center gap-3">

      {/* User Profile Display */}
      {session?.user ? (
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b7355]/10 border border-[#8b7355]/20">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-[#d4a574] truncate max-w-[120px]">
              {session.user.name || 'User'}
            </span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm tracking-wider text-[#d4a574] hover:text-[#f4e4d4] hover:bg-[#8b7355]/20 transition-all duration-200 transform-gpu will-change-transform"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <Link
          href="/auth/signin"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm tracking-wider text-[#d4a574] hover:text-[#f4e4d4] hover:bg-[#8b7355]/20 transition-all duration-200 transform-gpu will-change-transform"
        >
          <User size={16} />
          <span>Masuk</span>
        </Link>
      )}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-[#d4a574] hover:text-[#f4e4d4] hover:bg-[#8b7355]/20 transition-all duration-200 transform-gpu will-change-transform"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-full text-[#d4a574] hover:text-[#f4e4d4] hover:bg-[#8b7355]/20 transition-all duration-200 transform-gpu will-change-transform"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

    </div>
  </div>

  {/* Mobile Menu */}
  <div className={`md:hidden transition-all duration-300 ease-out overflow-hidden will-change-transform transform-gpu ${
    isMenuOpen ? 'max-h-64 opacity-100 border-t border-[#8b7355]/20 bg-[#3d2817] dark:bg-[#1a1816]' : 'max-h-0 opacity-0'
  }`}>
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">

      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className={`text-sm transition-all duration-200 transform-gpu will-change-transform ${
            pathname === item.href
              ? "text-[#f4e4d4] font-medium"
              : "text-[#d4a574] hover:text-[#f4e4d4]"
          }`}
        >
          {item.label}
        </Link>
      ))}

      {/* Mobile User Profile Display */}
      {session?.user && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#8b7355]/10 border border-[#8b7355]/20">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span className="text-sm text-[#d4a574] truncate max-w-[120px]">
            {session.user.name || 'User'}
          </span>
        </div>
      )}

      {/* Mobile Login/Logout Button */}
      {session ? (
        <button
          onClick={() => {
            signOut({ callbackUrl: '/' });
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2 text-sm transition-all duration-200 transform-gpu will-change-transform text-[#d4a574] hover:text-[#f4e4d4]"
        >
          <LogOut size={16} />
          <span>Keluar</span>
        </button>
      ) : (
        <Link
          href="/auth/signin"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 text-sm transition-all duration-200 transform-gpu will-change-transform text-[#d4a574] hover:text-[#f4e4d4]"
        >
          <User size={16} />
          <span>Masuk</span>
        </Link>
      )}

    </div>
  </div>
</nav>

);
}
