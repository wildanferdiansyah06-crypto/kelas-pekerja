"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
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
      className="px-3 py-1 rounded-full font-mono text-xs tracking-widest"
      style={{
        background: 'rgba(212, 165, 116, 0.08)',
        color: 'var(--kp-accent)',
        border: '1px solid rgba(212, 165, 116, 0.1)',
      }}
    >
      {time}
    </div>
  );
}

export default function Navbar() {
const pathname = usePathname();
const { isVisible: contextVisible } = useNavbar();
const { data: session } = useSession();

const [isMenuOpen, setIsMenuOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [scrollVisible, setScrollVisible] = useState(true);
const [hasScrolled, setHasScrolled] = useState(false);
const lastScrollYRef = useRef(0);

useEffect(() => {
setMounted(true);
}, []);

// Auto-hide navbar on scroll - Performance optimized for mobile
useEffect(() => {
  if (!mounted) return;

  let ticking = false;
  const scrollThreshold = 50;
  let scrollDirection = 'up';
  let lastScrollTime = 0;
  const throttleDelay = 100;
  
  const handleScroll = () => {
    const now = performance.now();
    if (now - lastScrollTime < throttleDelay) return;
    
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        try {
          const currentScrollY = window.scrollY || document.documentElement.scrollTop;
          const lastScrollY = lastScrollYRef.current;
          
          setHasScrolled(currentScrollY > 20);
          
          if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
          } else if (currentScrollY < lastScrollY) {
            scrollDirection = 'up';
          }
          
          if (currentScrollY <= 0) {
            if (!scrollVisible) setScrollVisible(true);
          } 
          else if (scrollDirection === 'down' && currentScrollY > scrollThreshold) {
            if (scrollVisible) setScrollVisible(false);
          } 
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

  lastScrollYRef.current = window.scrollY || document.documentElement.scrollTop;

  window.addEventListener('scroll', handleScroll, { passive: true, capture: false });
  
  return () => {
    window.removeEventListener('scroll', handleScroll, { capture: false });
  };
}, [mounted, scrollVisible]);

const finalVisibility = scrollVisible && contextVisible;

if (!mounted) return null;

return (
<>
<nav
  className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${finalVisibility ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
  style={{
    paddingTop: hasScrolled ? '0' : '8px',
    paddingLeft: hasScrolled ? '0' : '12px',
    paddingRight: hasScrolled ? '0' : '12px',
  }}
>
  <div
    className="transition-all duration-500"
    style={{
      background: hasScrolled ? 'rgba(10, 9, 8, 0.85)' : 'rgba(10, 9, 8, 0.5)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: hasScrolled ? '0' : '16px',
      border: hasScrolled ? 'none' : '1px solid rgba(212, 165, 116, 0.06)',
      borderBottom: hasScrolled ? '1px solid rgba(212, 165, 116, 0.06)' : 'none',
      boxShadow: hasScrolled 
        ? '0 4px 30px rgba(0, 0, 0, 0.3)' 
        : '0 8px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 165, 116, 0.03)',
    }}
  >
    <div className="max-w-7xl mx-auto px-5 sm:px-6 tablet:px-12 h-14 sm:h-16 flex items-center justify-between">

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 group"
      >
        <span 
          className="text-xl sm:text-2xl font-display font-light tracking-wide transition-all duration-300 group-hover:text-glow"
          style={{ color: 'var(--kp-accent)' }}
        >
          Kelas Pekerja
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden tablet:flex items-center gap-8">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative font-ui text-sm font-normal transition-all duration-300 py-1 group"
            style={{
              color: pathname === item.href ? 'var(--kp-accent)' : 'var(--kp-text-muted)',
            }}
            onMouseEnter={(e) => {
              if (pathname !== item.href) {
                e.currentTarget.style.color = 'var(--kp-text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== item.href) {
                e.currentTarget.style.color = 'var(--kp-text-muted)';
              }
            }}
          >
            {item.label}
            {/* Animated underline */}
            <span 
              className="absolute bottom-0 left-0 h-px transition-all duration-300"
              style={{
                width: pathname === item.href ? '100%' : '0%',
                background: 'linear-gradient(90deg, transparent, var(--kp-accent), transparent)',
              }}
            />
            <span 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-full transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--kp-accent), transparent)',
                display: pathname === item.href ? 'none' : 'block',
              }}
            />
          </Link>
        ))}
      </div>

      {/* Mobile Navigation - Horizontal Scroll */}
      <div className="tablet:hidden flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide flex-1 mx-3 sm:mx-4">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-ui text-xs sm:text-sm font-normal whitespace-nowrap transition-colors duration-200 px-2 py-1"
            style={{
              color: pathname === item.href ? 'var(--kp-accent)' : 'var(--kp-text-muted)',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Clock Widget - Desktop */}
      <div className="hidden tablet:block">
        <ClockWidget />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">

        {/* User Profile Display - Desktop */}
        {session?.user ? (
          <div className="hidden tablet:flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(212, 165, 116, 0.06)',
                border: '1px solid rgba(212, 165, 116, 0.08)',
              }}
            >
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                  style={{ boxShadow: '0 0 10px rgba(212, 165, 116, 0.2)' }}
                />
              )}
              <span
                className="text-sm truncate max-w-[120px] font-ui"
                style={{ color: 'var(--kp-text-secondary)' }}
              >
                {session.user.name || 'User'}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-ui transition-all duration-300"
              style={{ color: 'var(--kp-text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--kp-accent)';
                e.currentTarget.style.background = 'rgba(212, 165, 116, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--kp-text-muted)';
                e.currentTarget.style.background = 'transparent';
              }}
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="hidden tablet:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-ui font-medium transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
              color: '#0a0908',
              boxShadow: '0 0 20px rgba(212, 165, 116, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 165, 116, 0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Masuk
          </Link>
        )}

        {/* User Profile Display - Mobile */}
        {session?.user && (
          <div
            className="tablet:hidden flex items-center gap-2 px-2 py-1 rounded-full"
            style={{
              background: 'rgba(212, 165, 116, 0.06)',
              border: '1px solid rgba(212, 165, 116, 0.08)',
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
          className="tablet:hidden p-2 rounded-full font-ui transition-all duration-300"
          style={{ color: 'var(--kp-text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--kp-accent)';
            e.currentTarget.style.background = 'rgba(212, 165, 116, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--kp-text-muted)';
            e.currentTarget.style.background = 'transparent';
          }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>
    </div>
  </div>

  {/* Mobile Menu Panel */}
  <div
    className={`tablet:hidden transition-all duration-400 ease-out overflow-hidden ${
      isMenuOpen ? 'max-h-40 sm:max-h-48 opacity-100' : 'max-h-0 opacity-0'
    }`}
    style={{
      background: 'rgba(10, 9, 8, 0.9)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: isMenuOpen ? '1px solid rgba(212, 165, 116, 0.06)' : 'none',
      marginLeft: hasScrolled ? '0' : '12px',
      marginRight: hasScrolled ? '0' : '12px',
      borderRadius: hasScrolled ? '0' : '0 0 16px 16px',
    }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3">

      {/* Mobile User Profile Full Display */}
      {session?.user && (
        <div
          className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full"
          style={{
            background: 'rgba(212, 165, 116, 0.06)',
            border: '1px solid rgba(212, 165, 116, 0.08)',
          }}
        >
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
            />
          )}
          <span
            className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[120px] font-ui"
            style={{ color: 'var(--kp-text-secondary)' }}
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
          className="flex items-center gap-2 text-xs sm:text-sm font-ui transition-colors duration-200 px-2 py-2"
          style={{ color: 'var(--kp-text-muted)' }}
        >
          <LogOut size={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Keluar</span>
        </button>
      ) : (
        <Link
          href="/auth/signin"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 text-xs sm:text-sm font-ui transition-colors duration-200 px-2 py-2"
          style={{ color: 'var(--kp-accent)' }}
        >
          <User size={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Masuk</span>
        </Link>
      )}

    </div>
  </div>

</nav>

{/* Ambient glow line under navbar */}
<div 
  className={`fixed top-14 sm:top-16 left-0 right-0 z-[99] h-px transition-opacity duration-500 pointer-events-none ${finalVisibility ? 'opacity-100' : 'opacity-0'}`}
  style={{
    background: 'linear-gradient(90deg, transparent, rgba(212, 165, 116, 0.1), transparent)',
  }}
/>
</>
);
}
