✅ Navbar component created

// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Clock, Bookmark } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useBookmarks } from '@/src/hooks/useBookmarks';

const navigation = [
  { label: 'Beranda', href: '/' },
  { label: 'Buku', href: '/buku' },
  { label: 'Tentang', href: '/tentang' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const { count } = useBookmarks();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#faf8f5]/90 dark:bg-[#1a1816]/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-lg tracking-wider opacity-80 hover:opacity-100 transition-opacity"
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
                    pathname === item.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Time Widget */}
              <div className="hidden sm:flex items-center gap-2 text-xs opacity-60">
                <Clock size={14} />
                <span className="font-mono tracking-wider">{formatTime(currentTime)}</span>
              </div>

              {/* Bookmarks */}
              <Link
                href="/simpanan"
                className="relative p-2 rounded-full hover:bg-[#8b7355]/10 transition-colors opacity-60 hover:opacity-100"
                title="Simpanan"
              >
                <Bookmark size={18} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8b7355] text-white text-xs rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#8b7355]/10 transition-colors opacity-60 hover:opacity-100"
                title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-[#8b7355]/10 transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#faf8f5]/95 dark:bg-[#1a1816]/95 backdrop-blur-md border-b border-[#8b7355]/10 animate-fade-in">
            <div className="px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm tracking-wider py-2 ${
                    pathname === item.href ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Time */}
              <div className="flex items-center gap-2 text-xs opacity-40 pt-4 border-t border-[#8b7355]/10">
                <Clock size={14} />
                <span className="font-mono tracking-wider">{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Grain Overlay */}
      <div className="grain-overlay" />
    </>
  );
        }
