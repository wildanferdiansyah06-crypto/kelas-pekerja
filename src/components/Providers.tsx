'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { LanguageProvider } from '@/src/contexts/LanguageContext';
import { ReaderProvider } from '@/src/contexts/ReaderContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <LanguageProvider>
        <ReaderProvider>{children}</ReaderProvider>
      </LanguageProvider>
    </NextAuthSessionProvider>
  );
}

