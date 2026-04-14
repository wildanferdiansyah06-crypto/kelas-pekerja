"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
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

// Clock component
function ClockWidget() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="px-3 py-1 rounded-full font-mono text-sm"
      style={{
        backgroundColor: 'var(--kp-accent-light)',
        color: 'var(--kp-text-primary)',
      }}
    >
      {time}
    </div>
  );
}

export default function Navbar() {
const pathname = usePathname();
const { theme } = useTheme();
const { isVisible: contextVisible } = useNavbar();
const { data: session } = useSession();

const [isMenuOpen, setIsMenuOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [scrollVisible, setScrollVisible] = useState(true);
const lastScrollYRef = useRef(0);

useEffect(() => {
setMounted(true);
}, []);

// Auto-hide navbar on scroll - Performance optimized for mobile
useEffect(() => {
  if (!mounted) return;

  let ticking = false;
  const scrollThreshold = 50; // Reduced threshold for better mobile UX
  let scrollDirection = 'up';
  let lastScrollTime = 0;
  const throttleDelay = 100; // Increased throttle for better mobile performance (10fps instead of 60fps)
  
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
<nav
  className={`fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-200 ease-out ${finalVisibility ? 'translate-y-0' : '-translate-y-full'}`}
  style={{
    backgroundColor: 'var(--kp-bg-base)',
    borderBottom: '1px solid var(--kp-border)',
  }}
>
  {/* Container */}
  <div className="max-w-7xl mx-auto px-6 tablet:px-12 h-16 flex items-center justify-between">

    {/* Logo */}
    <Link
      href="/"
      className="flex items-center gap-2.5 font-serif text-xl font-bold"
      style={{ color: 'var(--kp-accent)' }}
    >
      Kelas Pekerja
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-8">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="font-ui text-sm font-normal transition-all duration-200 border-b-2"
          style={{
            color: pathname === item.href ? 'var(--kp-text-primary)' : 'var(--kp-text-muted)',
            fontWeight: pathname === item.href ? '500' : '400',
            borderColor: pathname === item.href ? 'var(--kp-accent)' : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (pathname !== item.href) {
              e.currentTarget.style.color = 'var(--kp-text-primary)';
              e.currentTarget.style.borderColor = 'var(--kp-accent)';
            }
          }}
          onMouseLeave={(e) => {
            if (pathname !== item.href) {
              e.currentTarget.style.color = 'var(--kp-text-muted)';
              e.currentTarget.style.borderColor = 'transparent';
            }
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>

    {/* Mobile Navigation - Horizontal Scroll */}
    <div className="md:hidden flex items-center gap-4 overflow-x-auto scrollbar-hide flex-1 mx-4">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="font-ui text-sm font-normal whitespace-nowrap transition-colors duration-150"
          style={{
            color: pathname === item.href ? 'var(--kp-text-primary)' : 'var(--kp-text-muted)',
            fontWeight: pathname === item.href ? '500' : '400',
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>

    {/* Clock Widget - Desktop */}
    <div className="hidden md:block">
      <ClockWidget />
    </div>

    {/* Right Controls */}
    <div className="flex items-center gap-3 shrink-0">

      {/* User Profile Display - Desktop */}
      {session?.user ? (
        <div className="hidden md:flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{
              backgroundColor: 'var(--kp-bg-surface)',
              borderColor: 'var(--kp-border)',
            }}
          >
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span
              className="text-sm truncate max-w-[120px]"
              style={{ color: 'var(--kp-text-muted)' }}
            >
              {session.user.name || 'User'}
            </span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-ui transition-colors duration-200"
            style={{ color: 'var(--kp-text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--kp-text-primary)';
              e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--kp-text-muted)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <Link
          href="/auth/signin"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-ui font-medium transition-colors duration-200"
          style={{
            backgroundColor: 'var(--kp-text-primary)',
            color: 'var(--kp-bg-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--kp-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--kp-text-primary)';
          }}
        >
          Masuk
        </Link>
      )}

      {/* User Profile Display - Mobile */}
      {session?.user && (
        <div
          className="md:hidden flex items-center gap-2 px-2 py-1 rounded-full border"
          style={{
            backgroundColor: 'var(--kp-bg-surface)',
            borderColor: 'var(--kp-border)',
          }}
        >
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-full font-ui transition-colors duration-200"
        style={{ color: 'var(--kp-text-muted)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--kp-text-primary)';
          e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--kp-text-muted)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

    </div>
  </div>

  {/* Mobile Menu - User Actions Only */}
  <div
    className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
      isMenuOpen ? 'max-h-48 opacity-100 border-t' : 'max-h-0 opacity-0'
    }`}
    style={{
      borderColor: 'var(--kp-border)',
      backgroundColor: 'var(--kp-bg-base)',
    }}
  >
    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">

      {/* Mobile User Profile Full Display */}
      {session?.user && (
        <div
          className="flex items-center gap-3 px-3 py-2 rounded-full border"
          style={{
            backgroundColor: 'var(--kp-bg-surface)',
            borderColor: 'var(--kp-border)',
          }}
        >
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span
            className="text-sm truncate max-w-[120px]"
            style={{ color: 'var(--kp-text-muted)' }}
          >
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
          className="flex items-center gap-2 text-sm font-ui transition-colors duration-200"
          style={{ color: 'var(--kp-text-muted)' }}
        >
          <LogOut size={16} />
          <span>Keluar</span>
        </button>
      ) : (
        <Link
          href="/auth/signin"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 text-sm font-ui transition-colors duration-200"
          style={{ color: 'var(--kp-text-muted)' }}
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
