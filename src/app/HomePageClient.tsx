"use client";

import React from "react";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, PenLine, Coffee, Eye, Infinity } from "lucide-react";

function getRelativeTime(dateString: string): string {
  try {
    if (!dateString) return "Tanggal tidak diketahui";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Tanggal tidak valid";
    
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Hari ini";
    if (diffInDays === 1) return "Kemarin";
    if (diffInDays < 7) return `${diffInDays} hari lalu`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu lalu`;
    return `${Math.floor(diffInDays / 30)} bulan lalu`;
  } catch (error) {
    return "Tanggal tidak diketahui";
  }
}

interface HomePageClientProps {
  featuredBooks: any[];
  allBooks: any[];
  latestBooks: any[];
  mostRelatable: any[];
  totalViews: number;
  totalDownloads: number;
  config: any;
}

export default function HomePageClient({ 
  featuredBooks = [], 
  allBooks = [], 
  latestBooks = [], 
  mostRelatable = [], 
  totalViews = 0, 
  totalDownloads = 0, 
  config = {} 
}: HomePageClientProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    try {
      setMounted(true);
    } catch (error) {
      console.error('Error in HomePageClient mount:', error);
      setHasError(true);
    }
  }, []);
  
  const isDark = mounted && theme === "dark";

  // Error boundary fallback
  if (hasError) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Terjadi kesalahan pada halaman</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative ${isDark ? 'bg-gradient-to-br from-[#0f0e0c] via-[#1a1815] to-[#0d0c0a]' : 'bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08]'} ${isDark ? 'text-[#e8e0d5]' : 'text-[#d4a574]'} transition-colors duration-500`}>
        {/* HERO */}
        <section className="relative flex items-center justify-center px-6 py-20 overflow-hidden">
          {/* Background Image with Gradient Fade */}
          <div className="absolute inset-0 z-0">
            {/* Coffee aesthetic background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1920&q=80')] bg-cover bg-center bg-no-repeat" />
            {/* Gradient overlay - fade to bottom */}
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-[#0f0e0c]/70 via-[#1a1815]/50 to-[#0f0e0c]' : 'bg-gradient-to-b from-[#2c1810]/60 via-[#3d2817]/40 to-[#2c1810]'}`} />
            {/* Additional gradient for better text readability */}
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-[#1a1815]/30 via-transparent to-[#0f0e0c]/50' : 'bg-gradient-to-br from-[#3d2817]/20 via-transparent to-[#1a0e08]/30'}`} />
          </div>

          {/* Animated Background Layer */}
          <div className="absolute inset-0 z-0">
            {/* Coffee bean illustrations - always visible */}
            <div className="absolute top-20 left-10 w-32 h-32 opacity-40 rotate-12 animate-pulse">
              <div className={`w-full h-full ${isDark ? 'bg-gradient-to-br from-[#8b7355]/30 to-[#654321]/15' : 'bg-gradient-to-br from-[#c7b299]/30 to-[#8b7355]/15'} rounded-full blur-3xl`}></div>
            </div>
            <div className="absolute top-40 right-20 w-24 h-24 opacity-35 -rotate-6 animate-pulse" style={{ animationDelay: '2s' }}>
              <div className={`w-full h-full ${isDark ? 'bg-gradient-to-tr from-[#a0522d]/20 to-[#8b7355]/10' : 'bg-gradient-to-tr from-[#d2691e]/20 to-[#c7b299]/10'} rounded-full blur-2xl`}></div>
            </div>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 opacity-30 rotate-45 animate-pulse" style={{ animationDelay: '4s' }}>
              <div className={`w-full h-full ${isDark ? 'bg-gradient-to-r from-[#8b7355]/15 to-[#a0522d]/8' : 'bg-gradient-to-r from-[#cd853f]/15 to-[#8b7355]/8'} rounded-full blur-2xl`}></div>
            </div>
            
            {/* Steam/coffee vapor effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20">
              <div className={`w-full h-full ${isDark ? 'bg-gradient-radial from-[#f4e4d4]/15 via-transparent to-transparent' : 'bg-gradient-radial from-[#f5deb3]/15 via-transparent to-transparent'} animate-pulse`}></div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-1/3 left-1/4 w-64 h-64 opacity-8">
              <div className={`w-full h-full border-2 ${isDark ? 'border-[#8b7355]/25' : 'border-[#8b7355]/25'} rounded-full animate-spin`} style={{ animationDuration: '60s' }}></div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 opacity-8">
              <div className={`w-full h-full border ${isDark ? 'border-[#8b7355]/20' : 'border-[#8b7355]/25'} rounded-full animate-spin`} style={{ animationDuration: '45s', animationDirection: 'reverse' }}></div>
            </div>
            
            {/* Additional floating elements */}
            <div className="absolute top-1/4 right-1/3 w-20 h-20 opacity-25 animate-bounce" style={{ animationDuration: '8s' }}>
              <div className={`w-full h-full ${isDark ? 'bg-gradient-to-br from-[#a0522d]/20 to-transparent' : 'bg-gradient-to-br from-[#d2691e]/20 to-transparent'} rounded-full blur-xl`}></div>
            </div>
            <div className="absolute bottom-1/4 left-1/3 w-16 h-16 opacity-20 animate-pulse" style={{ animationDelay: '3s' }}>
              <div className={`w-full h-full ${isDark ? 'bg-gradient-to-tr from-[#8b7355]/15 to-transparent' : 'bg-gradient-to-tr from-[#c7b299]/15 to-transparent'} rounded-full blur-lg`}></div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-20 pb-32">
            <p className={`text-[11px] tracking-[0.4em] uppercase mb-8 ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} font-medium`}>
              Sebuah Ruang untuk
            </p>

            <h1 className={`font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 ${isDark ? 'text-[#faf0e6]' : 'text-[#f4e4d4]'}`}>
              Kelas Pekerja
            </h1>

            <p className={`text-xl md:text-2xl ${isDark ? 'text-[#c4b5a0]' : 'text-[#8b7355]'} dark:text-[#c4b5a0] mb-4 max-w-2xl mx-auto leading-relaxed`}>
              Di antara sunyi dan langkah, kita menemukan makna.
            </p>

            <p className={`text-sm md:text-base ${isDark ? 'text-[#e8d4c4]' : 'text-[#a8a298]'} max-w-md mx-auto mb-12 leading-relaxed drop-shadow-sm`}>
              {config?.tagline || "Tentang malam yang tak pernah benar-benar tidur, kopi yang menghangatkan, dan cerita-cerita yang tersimpan di antara detik-detik yang terlewat."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/buku"
                className={`group inline-flex items-center gap-3 px-8 py-4 ${isDark ? 'bg-[#8b7355]' : 'bg-[#8b7355]'} text-white rounded-full hover:${isDark ? 'bg-[#c7b299]' : 'bg-[#c7b299]'} transition-all duration-300 text-sm tracking-wider font-medium relative z-30`}
              >
                <BookOpen size={18} />
                Mulai Membaca
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/tulis"
                className={`inline-flex items-center gap-2 px-8 py-4 border ${isDark ? 'border-[#8b7355]/40' : 'border-[#8b7355]/20'} rounded-full ${isDark ? 'text-[#c4b5a0]' : 'text-[#d4a574]'} hover:${isDark ? 'border-[#8b7355]' : 'border-[#8b7355]'} hover:${isDark ? 'text-[#e8e0d5]' : 'text-[#f4e4d4]'} transition-all duration-300 text-sm tracking-wider relative z-30`}
              >
                <PenLine size={18} />
                Tulis Cerita
              </Link>
            </div>

          </div>

          {/* Coffee Equipment Illustrations - Bottom of Hero */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
            {/* Gradient fade overlay */}
            <div className={`h-32 ${isDark ? 'bg-gradient-to-t from-[#0f0e0c] to-transparent' : 'bg-gradient-to-t from-[#2c1810] to-transparent'}`} />
            
            {/* Coffee decorations container */}
            <div className={`relative h-48 ${isDark ? 'bg-[#0f0e0c]' : 'bg-[#2c1810]'} overflow-hidden`}>
              {/* Coffee beans scattered */}
              <div className="absolute bottom-4 left-[10%] opacity-40">
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#8b7355]' : 'text-[#8b7355]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-8 left-[20%] opacity-30 rotate-45">
                <svg width="20" height="30" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#a08060]' : 'text-[#a08060]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-2 left-[30%] opacity-50 -rotate-12">
                <svg width="28" height="42" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#6b5a45]' : 'text-[#6b5a45]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-6 left-[45%] opacity-35 rotate-90">
                <svg width="22" height="34" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#c7b299]' : 'text-[#c7b299]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-3 left-[60%] opacity-45 -rotate-30">
                <svg width="26" height="40" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#8b7355]' : 'text-[#8b7355]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-8 left-[75%] opacity-25 rotate-60">
                <svg width="18" height="28" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#a08060]' : 'text-[#a08060]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-5 left-[85%] opacity-40 -rotate-15">
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#6b5a45]' : 'text-[#6b5a45]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-10 left-[5%] opacity-30 rotate-120">
                <svg width="20" height="32" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#8b7355]' : 'text-[#8b7355]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-2 left-[95%] opacity-35 -rotate-45">
                <svg width="22" height="34" viewBox="0 0 24 36" fill="none" className={`${isDark ? 'text-[#c7b299]' : 'text-[#c7b299]'}`}>
                  <ellipse cx="12" cy="18" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8 Q15 12 12 18 Q9 24 12 28" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>

              {/* Coffee cup illustration */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-20">
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className={`${isDark ? 'text-[#8b7355]' : 'text-[#8b7355]'}`}>
                  {/* Cup body */}
                  <path d="M20 20 L25 60 Q30 70 60 70 Q90 70 95 60 L100 20 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Cup handle */}
                  <path d="M100 30 Q115 30 115 45 Q115 55 95 55" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Steam lines */}
                  <path d="M40 15 Q45 5 40 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                  <path d="M60 15 Q65 5 60 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                  <path d="M80 15 Q85 5 80 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                  {/* Saucer */}
                  <ellipse cx="60" cy="75" rx="45" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>

              {/* Coffee grinder silhouette */}
              <div className="absolute bottom-0 left-[15%] opacity-15">
                <svg width="80" height="100" viewBox="0 0 80 100" fill="none" className={`${isDark ? 'text-[#6b5a45]' : 'text-[#6b5a45]'}`}>
                  {/* Base */}
                  <rect x="25" y="70" width="30" height="25" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Body */}
                  <path d="M30 70 L35 40 L45 40 L50 70 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Hopper */}
                  <path d="M35 40 L30 20 L50 20 L45 40 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Handle */}
                  <circle cx="40" cy="15" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <line x1="40" y1="15" x2="65" y2="10" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="68" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Drawer */}
                  <rect x="32" y="78" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>

              {/* French press silhouette */}
              <div className="absolute bottom-0 right-[15%] opacity-15">
                <svg width="70" height="90" viewBox="0 0 70 90" fill="none" className={`${isDark ? 'text-[#6b5a45]' : 'text-[#6b5a45]'}`}>
                  {/* Glass body */}
                  <rect x="20" y="30" width="30" height="50" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Lid */}
                  <rect x="18" y="25" width="34" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Plunger handle */}
                  <line x1="35" y1="25" x2="35" y2="10" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="35" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Spout */}
                  <path d="M50 35 L60 40 L50 45" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Base */}
                  <rect x="18" y="78" width="34" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Coffee leaves decoration */}
              <div className="absolute bottom-4 right-[5%] opacity-20">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={`${isDark ? 'text-[#8b7355]' : 'text-[#8b7355]'}`}>
                  <path d="M30 60 Q30 30 10 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M30 60 Q30 30 50 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <ellipse cx="10" cy="18" rx="6" ry="10" transform="rotate(-30 10 18)" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <ellipse cx="50" cy="18" rx="6" ry="10" transform="rotate(30 50 18)" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <ellipse cx="8" cy="15" rx="4" ry="7" transform="rotate(-45 8 15)" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <ellipse cx="52" cy="15" rx="4" ry="7" transform="rotate(45 52 15)" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

      {/* INI TEMPAT APA? */}
      <section className="py-32 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className={`text-[10px] tracking-[0.4em] uppercase mb-6 ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} `}>
            Ini Tempat Apa?
          </p>

          <h2 className={`font-serif text-2xl sm:text-4xl md:text-5xl leading-tight mb-8 ${isDark ? 'text-[#faf0e6]' : 'text-[#f4e4d4]'}`}>
              Bukan tentang puncak.
              <br />
              <span className={`italic ${isDark ? 'text-[#c7b299]' : 'text-[#c7b299]'} `}>Ini tentang perjalanan yang tak terhitung.</span>
            </h2>

          <div className={`space-y-4 text-sm sm:text-lg md:text-xl leading-relaxed ${isDark ? 'text-[#a8a298]' : 'text-[#8b7355]'}`}>
            <p>Bangun pagi saat dunia masih terbungkus kabut.</p>
            <p>Pulang malam dengan bayangan semakin panjang.</p>
            <p className={isDark ? 'text-[#c4b5a0]' : 'text-[#a8a298]'}>Dan hal-hal yang hanya bisa diucapkan dalam keheningan.</p>
          </div>

          <div className={`mt-16 flex justify-center gap-8 ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'}`}>
            <div className={`w-24 h-px ${isDark ? 'bg-[#c7b299]/30' : 'bg-[#d4a574]/30'}`} />
            <Coffee size={20} className="opacity-60" />
            <div className={`w-24 h-px ${isDark ? 'bg-[#c7b299]/30' : 'bg-[#d4a574]/30'}`} />
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      {featuredBooks.length > 0 && (
        <section className={`py-24 px-6 border-t ${isDark ? 'border-neutral-800/30' : 'border-[#8b4513]/30'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <p className={`text-[10px] tracking-[0.4em] uppercase mb-4 ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'}`}>
                Pilihan Editor
              </p>
              <h3 className={`font-serif text-3xl md:text-4xl mb-3 ${isDark ? 'text-[#f5f0e8]' : 'text-[#f4e4d4]'}`}>
                Buku Unggulan
              </h3>
              <p className={`text-sm ${isDark ? 'text-[#c7b299]' : 'text-[#8b7355]'} max-w-md mx-auto`}>
                Dua karya yang menembus keheningan, membantu pembaca menemukan makna dalam sunyi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {featuredBooks.map((book, index) => (
                <article key={book?.id || `featured-${index}`} className="group cursor-pointer">
                  <Link href={`/buku/${book?.slug || '#'}`} className="block">
                    <div className={`${isDark ? 'bg-neutral-900/40 backdrop-blur-sm' : 'bg-[#3d2817]/60 backdrop-blur-sm'} rounded-lg overflow-hidden border ${isDark ? 'border-neutral-800/50' : 'border-[#8b4513]/30'} group-hover:${isDark ? 'border-neutral-700/50' : 'border-[#8b7355]/40'} transition-all duration-300`}>
                      {book?.cover && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <Image 
                            src={book.cover} 
                            alt={book?.title || 'Book cover'}
                            width={640}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className={`flex items-center gap-2 text-[10px] tracking-wider uppercase ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} mb-3`}>
                          <span>{book?.category || 'Umum'}</span>
                          <span>â¢</span>
                          <span>{book?.pages || '0'} halaman</span>
                        </div>

                        <h4 className={`font-serif text-xl mb-2 ${isDark ? 'text-[#e8e0d5]' : 'text-[#f4e4d4]'} group-hover:${isDark ? 'text-[#faf0e6]' : 'text-[#faf0e6]'} transition-colors`}>
                          {book?.title || 'Tanpa Judul'}
                        </h4>
                        
                        <p className={`text-sm ${isDark ? 'text-[#a8a298]' : 'text-[#8b7355]'} line-clamp-2 mb-4`}>
                          {book?.subtitle || book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                        </p>

                        <div className={`flex items-center justify-between text-xs ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'}`}>
                          <span>{book?.readTime || '5 menit'}</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TULISAN TERBARU */}
      <section className={`py-24 px-6 border-t ${isDark ? 'border-neutral-800/30' : 'border-[#8b4513]/30'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className={`text-[10px] tracking-[0.4em] uppercase mb-4 ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'}`}>
              Tulisan Terbaru
            </p>
            <h3 className={`font-serif text-3xl md:text-4xl mb-3 ${isDark ? 'text-[#f5f0e8]' : 'text-[#f4e4d4]'}`}>
              Jejak-jejak yang baru saja tertinggal.
            </h3>
            <p className={`text-sm ${isDark ? 'text-[#c7b299]' : 'text-[#8b7355]'}`}>
              Setiap minggu, sebuah cerita baru. Baca dengan perlahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBooks.map((book, index) => (
              <article key={book?.id || `latest-${index}`} className="group cursor-pointer">
                <Link href={`/buku/${book?.slug || '#'}`} className="block">
                  <div className={`${isDark ? 'bg-neutral-900/40 backdrop-blur-sm' : 'bg-[#3d2817]/60 backdrop-blur-sm'} rounded-lg p-8 h-full border ${isDark ? 'border-neutral-800/50' : 'border-[#8b4513]/30'} group-hover:${isDark ? 'border-neutral-700/50' : 'border-[#8b7355]/40'} group-hover:-translate-y-1 transition-all duration-300`}>
                    
                    <div className={`flex items-center gap-2 text-[10px] tracking-wider uppercase ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} mb-4`}>
                      <span>{getRelativeTime(book?.publishedAt || new Date().toISOString())}</span>
                      <span>â¢</span>
                      <span>{book?.readTime || '5 menit'}</span>
                    </div>

                    <h4 className={`font-serif text-xl mb-3 ${isDark ? 'text-[#e8e0d5]' : 'text-[#f4e4d4]'} group-hover:${isDark ? 'text-[#faf0e6]' : 'text-[#faf0e6]'} transition-colors`}>
                      {book?.title || 'Tanpa Judul'}
                    </h4>
                    
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#a8a298]' : 'text-[#8b7355]'} line-clamp-3`}>
                      {book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                    </p>

                    <div className={`mt-6 flex items-center gap-2 text-xs ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} group-hover:${isDark ? 'text-[#c4b5a0]' : 'text-[#f4e4d4]'} transition-colors`}>
                      <span>Baca selengkapnya</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/buku"
              className={`inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} hover:${isDark ? 'text-[#e8e0d5]' : 'text-[#f4e4d4]'} transition-colors`}
            >
              Lihat Semua Tulisan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PALING BANYAK DIRASA */}
      <section className={`py-24 px-6 ${isDark ? 'bg-gradient-to-br from-[#1a1815]/50 via-[#0f0e0c]/50 to-[#0d0c0a]/50' : 'bg-gradient-to-br from-[#8b4513]/30 via-[#3d2817]/80 to-[#2c1810]'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className={`text-[10px] tracking-[0.4em] uppercase mb-4 ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'}`}>
              Paling Banyak Dirasa
            </p>
            <h3 className={`font-serif text-3xl md:text-4xl mb-3 ${isDark ? 'text-[#f5f0e8]' : 'text-[#f4e4d4]'}`}>
              Kata-kata yang membuat banyak orang terdiam sejenak.
            </h3>
            <p className={`text-sm ${isDark ? 'text-[#c7b299]' : 'text-[#8b7355]'}`}>
              Bukan karena ramai. Tapi karena menyentuh bagian dalam yang sama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mostRelatable.length > 0 ? mostRelatable.map((book, index) => (
              <article key={book?.id || `relatable-${index}`} className="group cursor-pointer relative">
                <Link href={`/buku/${book?.slug || '#'}`} className="block">
                  <div className={`absolute -top-3 left-6 ${isDark ? 'bg-[#c7b299]' : 'bg-[#8b7355]'} ${isDark ? 'text-[#0f0e0c]' : 'text-[#f4e4d4]'} text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-medium z-10`}>
                    Paling Dibaca
                  </div>

                  <div className={`${isDark ? 'bg-neutral-900/40 backdrop-blur-sm' : 'bg-[#3d2817]/60 backdrop-blur-sm'} rounded-lg p-8 h-full pt-10 border ${isDark ? 'border-neutral-800/50' : 'border-[#8b4513]/30'} group-hover:${isDark ? 'border-neutral-700/50' : 'border-[#8b7355]/40'} group-hover:-translate-y-1 transition-all duration-300`}>
                    
                    <h4 className={`font-serif text-xl mb-3 ${isDark ? 'text-[#e8e0d5]' : 'text-[#f4e4d4]'} group-hover:${isDark ? 'text-[#faf0e6]' : 'text-[#faf0e6]'} transition-colors`}>
                      {book?.title || 'Tanpa Judul'}
                    </h4>
                    
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#a8a298]' : 'text-[#8b7355]'} line-clamp-3 mb-4`}>
                      {book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                    </p>

                    <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-[#6b5a45]' : 'text-[#a8a298]'} mb-4`}>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {book?.stats?.views?.toLocaleString() || '0'}
                      </span>
                      <span>{book?.readTime || '5 menit'}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className={`${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} group-hover:${isDark ? 'text-[#c4b5a0]' : 'text-[#f4e4d4]'} transition-colors`}>
                        Baca selengkapnya
                      </span>
                      <ArrowRight size={14} className={`${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} group-hover:${isDark ? 'text-[#e8e0d5]' : 'text-[#f4e4d4]'} group-hover:translate-x-1 transition-all`} />
                    </div>
                  </div>
                </Link>
              </article>
            )) : (
              <div className={`col-span-3 text-center py-12 ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'}`}>
                <p>Lebih banyak cerita akan segera hadir...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={`py-24 px-6 border-t ${isDark ? 'border-neutral-800/30' : 'border-[#8b4513]/30'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className={`text-3xl font-serif ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} mb-2`}>
              {allBooks.length}
            </div>
            <div className={`text-xs uppercase tracking-wider ${isDark ? 'text-[#6b5a45]' : 'text-[#a8a298]'}`}>Buku</div>
          </div>

          <div>
            <div className={`text-3xl font-serif ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} mb-2`}>
              {totalViews.toLocaleString()}
            </div>
            <div className={`text-xs uppercase tracking-wider ${isDark ? 'text-[#6b5a45]' : 'text-[#a8a298]'}`}>Dibaca</div>
          </div>

          <div>
            <div className={`flex items-center justify-center ${isDark ? 'text-[#c7b299]' : 'text-[#d4a574]'} mb-2`}>
              <Infinity size={32} />
            </div>
            <div className={`text-xs uppercase tracking-wider ${isDark ? 'text-[#6b5a45]' : 'text-[#a8a298]'}`}>Kopi</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 px-6 border-t ${isDark ? 'border-neutral-800/30' : 'border-[#8b4513]/30'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/tulis"
            className={`inline-flex items-center gap-3 px-10 py-5 ${isDark ? 'bg-[#8b7355]' : 'bg-[#8b7355]'} ${isDark ? 'text-[#0f0e0c]' : 'text-[#f4e4d4]'} rounded-full hover:${isDark ? 'bg-[#c7b299]' : 'bg-[#c7b299]'} transition-all duration-300 text-sm tracking-wider font-medium shadow-lg ${isDark ? 'shadow-[#c7b299]/20 hover:shadow-[#c7b299]/30' : 'shadow-[#8b7355]/20 hover:shadow-[#8b7355]/30'}`}
          >
            <PenLine size={18} />
            Tulis Cerita Pertamamu
          </Link>
        </div>
      </section>

    </div>
  );
}
