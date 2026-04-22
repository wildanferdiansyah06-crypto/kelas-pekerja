'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08] dark:from-[#1a1816] dark:via-[#0f0e0c] dark:to-[#0d0c0a]">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-[#f4e4d4] dark:text-[#faf0e6] mb-4">
            Kelas Pekerja
          </h1>
          <p className="text-[#8b7355] dark:text-[#c7b299]">
            Simpan progres dan bookmark kamu di semua device
          </p>
        </div>

        <div className="bg-[#3d2817]/50 dark:bg-[#1a1815]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#8b7355]/20">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? 'Masuk...' : 'Masuk dengan Google'}
          </button>

          <p className="mt-6 text-center text-sm text-[#8b7355] dark:text-[#a8a298]">
            Dengan masuk, kamu setuju dengan ketentuan layanan kami
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#d4a574] dark:text-[#c7b299] hover:text-[#f4e4d4] dark:hover:text-[#e8e0d5] transition-colors"
          >
            <LogIn size={16} />
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
