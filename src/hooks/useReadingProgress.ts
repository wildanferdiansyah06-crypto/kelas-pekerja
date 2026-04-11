'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { getUserReadingProgress } from '@/src/lib/user';

export function useReadingProgressRestore() {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const restoreProgress = async () => {
      if (!session?.user || !session.user.id) return;

      // Extract book slug from pathname
      if (pathname.startsWith('/buku/')) {
        const parts = pathname.split('/');
        const bookSlug = parts[2];

        if (!bookSlug) return;

        try {
          const progressData = await getUserReadingProgress(session.user.id);
          const bookProgress = progressData.find(
            (p: any) => p.bookSlug === bookSlug
          );

          if (bookProgress && bookProgress.progress > 0) {
            // Scroll to the saved position
            const scrollPosition = (bookProgress.progress / 100) * (document.documentElement.scrollHeight - window.innerHeight);
            window.scrollTo({
              top: scrollPosition,
              behavior: 'instant'
            });
          }
        } catch (error) {
          console.error('Failed to restore reading progress:', error);
        }
      }
    };

    restoreProgress();
  }, [session, pathname]);
}
