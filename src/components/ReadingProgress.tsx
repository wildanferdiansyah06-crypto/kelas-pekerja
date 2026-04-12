'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { getOrCreateUser, updateReadingProgress } from '@/src/lib/user';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();
  const pathname = usePathname();
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);
  const tickingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Extract book ID from pathname if it's a book page
    if (pathname.startsWith('/buku/')) {
      const parts = pathname.split('/');
      const bookSlug = parts[2];
      setCurrentBookId(bookSlug);
    } else {
      setCurrentBookId(null);
    }
  }, [pathname]);

  const updateProgress = useCallback(() => {
    const doc = document.documentElement;

    if (!doc) return;

    const scrollHeight = doc.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY || window.pageYOffset;

    if (scrollHeight <= 0) {
      setProgress(0);
      return;
    }

    const value = (scrolled / scrollHeight) * 100;
    setProgress(value);

    // Save progress to Sanity for logged-in users (debounced)
    if (session?.user && currentBookId) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const user = await getOrCreateUser(
            session.user.email || "",
            session.user.name || "",
            session.user.image || ""
          );
          if (currentBookId) {
            await updateReadingProgress(user._id, currentBookId, Math.round(value));
          }
        } catch (error) {
          console.error('Failed to save reading progress:', error);
        }
      }, 2000); // Increased debounce to 2 seconds for better performance
    }
  }, [session, currentBookId]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          updateProgress();
          tickingRef.current = false;
        });
      }
    };

    // Initial progress
    updateProgress();

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [updateProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-[#e5e2dd] dark:bg-[#8b7355]/10 pointer-events-none">
      <div
        className="h-full bg-[#6a6a6a] dark:bg-[#8b7355] transition-all duration-150 will-change-transform"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
