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
      <section className="py-32 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-8 opacity-60">
            Sebuah Buku Oleh
          </p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-6">
            <span className="block opacity-90">Kelas Pekerja</span>
            <span className="block italic text-[#8b7355] text-4xl md:text-6xl mt-2">
              Arsip Sunyi Orang-Orang yang Tetap Bekerja
            </span>
          </h1>

          <p className="font-serif italic text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed opacity-60">
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
