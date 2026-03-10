✅ Home page (page.tsx) completed

// src/app/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, BookOpen, Coffee, Clock } from 'lucide-react';
import { getFeaturedBooks, getConfig, getBooks } from '@/src/lib/api';
import BookCard from '@/src/components/BookCard';
import RandomCoffeeThought from '@/src/components/RandomCoffeeThought';

export const metadata: Metadata = {
  title: 'Kelas Pekerja — Arsip Sunyi Orang-Orang yang Tetap Bekerja',
  description: 'Catatan tentang malam, kopi, dan kehidupan. Ditulis perlahan, untuk dibaca perlahan.',
};

export const revalidate = 3600;

export default async function HomePage() {
  // Fetch data in parallel
  const [featuredBooks, config, allBooks] = await Promise.all([
    getFeaturedBooks(2),
    getConfig(),
    getBooks({ limit: 4 }),
  ]);

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1816] text-[#2b2b2b] dark:text-[#e8e0d5] transition-colors duration-700">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop"
            alt="Kopi dan buku"
            fill
            className="object-cover opacity-40 scale-105 animate-breathe"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/30 via-[#faf8f5]/60 to-[#faf8f5] dark:from-[#1a1816]/70 dark:via-[#1a1816]/50 dark:to-[#1a1816]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-8 opacity-60 animate-fade-in-slow">
            Sebuah Buku Oleh
          </p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-6 animate-fade-in-slower">
            <span className="block opacity-90">Kelas Pekerja</span>
            <span className="block italic text-[#8b7355] text-4xl md:text-6xl mt-2">
              Arsip Sunyi Orang-Orang yang Tetap Bekerja
            </span>
          </h1>

          <p className="font-serif italic text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed opacity-60 animate-fade-in-slowest">
            "{config.site.tagline}"
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-slowest">
            <Link
              href="/buku"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 
                       bg-[#2b2b2b] dark:bg-[#e8e0d5] text-white dark:text-[#1a1816]
                       rounded-full hover:opacity-90 transition-all text-sm tracking-wider"
            >
              <BookOpen size={18} />
              <span>Jelajahi Buku</span>
            </Link>

            <Link
              href="#tentang"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 
                       border border-[#8b7355]/30 rounded-full
                       hover:bg-[#8b7355]/5 transition-all text-sm tracking-wider opacity-80"
            >
              <span>Tentang Kami</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <Link 
              href="#tentang"
              className="flex flex-col items-center gap-2 text-xs tracking-[0.3em] uppercase opacity-40 hover:opacity-80 transition-opacity"
            >
              <span>Scroll</span>
              <ChevronDown size={16} className="animate-bounce" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang Section */}
      <section id="tentang" className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-[#8b7355]/30 mx-auto mb-12" />

          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">Tentang</p>

          <h2 className="font-serif text-3xl md:text-4xl leading-snug mb-8 opacity-90">
            Ini bukan buku motivasi.<br/>
            <span className="italic text-[#8b7355] opacity-70">Ini bukan panduan hidup.</span>
          </h2>

          <div className="space-y-6 text-[15px] leading-[1.8] opacity-70 font-light">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px] first-letter:text-[#8b7355] first-letter:opacity-60">
              Ini adalah catatan-catatan dari seseorang yang masih belajar hadir—untuk dirinya sendiri, untuk orang-orang yang ia cintai, untuk hari-hari yang kadang terlalu berat untuk dilalui sendirian.
            </p>
            <p>
              Ditulis dalam keheningan malam, di sudut kedai kopi yang hampir tutup, di antara lagu-lagu yang terlalu jujur untuk didengar sendirian.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-[#8b7355]/10">
            <p className="font-serif italic text-[#8b7355] text-lg opacity-60">
              "{config.author.manifesto}"
            </p>
          </div>
        </div>
      </section>

      {/* Buku Unggulan */}
      <section className="py-32 px-6 bg-[#f5f0e8]/30 dark:bg-[#2a2826]/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">Pilihan Editor</p>
            <h3 className="font-serif text-3xl md:text-4xl opacity-90 mb-4">Buku Unggulan</h3>
            <p className="text-sm opacity-60 max-w-md mx-auto">
              Dua buku yang paling banyak membantu pembaca menemukan makna dalam keheningan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {featuredBooks.books.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/buku"
              className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase 
                       opacity-60 hover:opacity-100 transition-all"
            >
              <span>Lihat Semua Buku</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Random Coffee Thought */}
      <RandomCoffeeThought />

      {/* Stats Section */}
      <section className="py-24 px-6 border-t border-[#8b7355]/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-serif text-[#8b7355]">{allBooks.total}</div>
              <div className="text-xs uppercase tracking-wider opacity-40">Buku</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-serif text-[#8b7355]">44</div>
              <div className="text-xs uppercase tracking-wider opacity-40">Catatan</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-serif text-[#8b7355]">2.5k+</div>
              <div className="text-xs uppercase tracking-wider opacity-40">Pembaca</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-serif text-[#8b7355]">∞</div>
              <div className="text-xs uppercase tracking-wider opacity-40">Kopi</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Coffee className="w-12 h-12 mx-auto mb-6 text-[#8b7355] opacity-60" />
          <h3 className="font-serif text-2xl md:text-3xl mb-4 opacity-90">
            Siap untuk menemani harimu?
          </h3>
          <p className="text-sm opacity-60 mb-8">
            Mulai dengan buku pertama, atau dapatkan inspirasi random dari catatan kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buku"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 
                       bg-[#8b7355] text-white rounded-full
                       hover:bg-[#6b5635] transition-all text-sm tracking-wider"
            >
              <BookOpen size={18} />
              <span>Mulai Membaca</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
