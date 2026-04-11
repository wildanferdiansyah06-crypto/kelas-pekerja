'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { getOrCreateUser, updateReadingProgress } from '@/src/lib/user';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();
  const pathname = usePathname();
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    let saveTimeout: NodeJS.Timeout;

    const updateProgress = () => {
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
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(async () => {
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
        }, 1000); // Debounce for 1 second
      }
    };

    updateProgress();

    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      clearTimeout(saveTimeout);
    };
  }, [session, currentBookId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-[#8b7355]/10">
      <div
        className="h-full bg-[#8b7355] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
