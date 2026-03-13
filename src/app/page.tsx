import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Coffee } from "lucide-react";
import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";
import BookCard from "@/src/components/BookCard";
import RandomCoffeeThought from "@/src/components/RandomCoffeeThought";

export const metadata: Metadata = {
  title: "Kelas Pekerja — Arsip Sunyi Orang-Orang yang Tetap Bekerja",
  description:
    "Catatan tentang malam, kopi, dan kehidupan. Ditulis perlahan, untuk dibaca perlahan.",
};

export const revalidate = 3600;

export default async function HomePage() {
  const [featuredBooks, configData, allBooks] = await Promise.all([
    getFeaturedBooks(2),
    getConfig(),
    getBooks({ limit: 4 }),
  ]);

  const config: any = configData;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 px-6 text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/30266551/pexels-photo-30266551/free-photo-of-cozy-autumn-coffee-with-old-books-and-music.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1920')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fafaf9]/90 via-[#fafaf9]/70 to-[#fafaf9] dark:from-[#1a1816]/90 dark:via-[#1a1816]/70 dark:to-[#1a1816]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-10 opacity-50 font-medium">
            Sebuah Buku Oleh
          </p>

          {/* Typography yang lebih aesthetic */}
          <div className="mb-10 space-y-4">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#1a1816] dark:text-[#e8e0d5]">
              Kelas Pekerja
            </h1>
            
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-[#8b7355]/40" />
              <p className="font-serif italic text-xl md:text-2xl text-[#6b5a45] dark:text-[#a08060] tracking-wide">
                Arsip Sunyi Orang-Orang yang Tetap Bekerja
              </p>
              <div className="h-px w-12 bg-[#8b7355]/40" />
            </div>
          </div>

          <p className="font-serif italic text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed opacity-60">
            &ldquo;{config?.site?.tagline || "Catatan tentang malam, kopi, dan kehidupan"}&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buku"
              className="inline-flex items-center gap-2 px-8 py-4 
              bg-[#2b2b2b] dark:bg-[#e8e0d5] text-white dark:text-[#1a1816]
              rounded-full hover:opacity-90 transition-all text-sm tracking-wider"
            >
              <BookOpen size={18} />
              Jelajahi Buku
            </Link>

            <Link
              href="/tentang"
              className="inline-flex items-center gap-2 px-8 py-4 
              border border-[#8b7355]/30 rounded-full
              hover:bg-[#8b7355]/5 transition-all text-sm tracking-wider opacity-80"
            >
              Tentang Kami
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-[#8b7355]/30 mx-auto mb-12" />

          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">
            Tentang
          </p>

          <h2 className="font-serif text-3xl md:text-4xl leading-snug mb-8">
            Ini bukan buku motivasi.
            <br />
            <span className="italic text-[#8b7355] opacity-70">
              Ini bukan panduan hidup.
            </span>
          </h2>

          <div className="space-y-6 text-[15px] leading-[1.9] opacity-70">
            <p>
              Ini adalah catatan-catatan dari seseorang yang masih belajar
              hadir—untuk dirinya sendiri, untuk orang-orang yang ia cintai,
              untuk hari-hari yang kadang terlalu berat untuk dilalui sendirian.
            </p>

            <p>
              Ditulis dalam keheningan malam, di sudut kedai kopi yang hampir
              tutup, di antara lagu-lagu yang terlalu jujur untuk didengar
              sendirian.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-[#8b7355]/10">
            <p className="font-serif italic text-[#8b7355] text-lg opacity-60">
              &ldquo;{config?.author?.manifesto || "Tetap hadir, tetap bekerja, tetap hidup."}&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">
              Pilihan Editor
            </p>

            <h3 className="font-serif text-3xl md:text-4xl mb-4">
              Buku Unggulan
            </h3>

            <p className="text-sm opacity-60 max-w-md mx-auto">
              Dua buku yang paling banyak membantu pembaca menemukan makna
              dalam keheningan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {featuredBooks?.books?.map((book: any, index: number) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/buku"
              className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              Lihat Semua Buku
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <RandomCoffeeThought />

      <section className="py-24 px-6 border-t border-[#8b7355]/10 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-3xl font-serif text-[#8b7355]">
              {allBooks?.total || 0}
            </div>
            <div className="text-xs uppercase tracking-wider opacity-40">Buku</div>
          </div>

          <div>
            <div className="text-3xl font-serif text-[#8b7355]">44</div>
            <div className="text-xs uppercase tracking-wider opacity-40">Catatan</div>
          </div>

          <div>
            <div className="text-3xl font-serif text-[#8b7355]">2.5k+</div>
            <div className="text-xs uppercase tracking-wider opacity-40">Pembaca</div>
          </div>

          <div>
            <div className="text-3xl font-serif text-[#8b7355]">∞</div>
            <div className="text-xs uppercase tracking-wider opacity-40">Kopi</div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Coffee className="w-12 h-12 mx-auto mb-6 text-[#8b7355] opacity-60" />

          <h3 className="font-serif text-2xl md:text-3xl mb-4">
            Siap untuk menemani harimu?
          </h3>

          <p className="text-sm opacity-60 mb-8">
            Mulai dengan buku pertama, atau dapatkan inspirasi random dari
            catatan kami.
          </p>

          <Link
            href="/buku"
            className="inline-flex items-center gap-2 px-8 py-4 
            bg-[#8b7355] text-white rounded-full
            hover:bg-[#6b5635] transition-all text-sm tracking-wider"
          >
            <BookOpen size={18} />
            Mulai Membaca
          </Link>
        </div>
      </section>
    </div>
  );
}
