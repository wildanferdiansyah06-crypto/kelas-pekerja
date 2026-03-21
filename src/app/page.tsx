import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine, Coffee } from "lucide-react";
import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";
import BookCard from "@/src/components/BookCard";

export const metadata: Metadata = {
  title: "Kelas Pekerja — Tempat Cerita Orang yang Tetap Jalan",
  description:
    "Tentang malam, kopi, kerja, dan hal-hal yang sering kita pendam sendiri. Ditulis perlahan, untuk dibaca perlahan.",
};

export const revalidate = 3600;

export default async function HomePage() {
  const [featuredBooks, configData, allBooks] = await Promise.all([
    getFeaturedBooks(2),
    getConfig(),
    getBooks({ limit: 6 }),
  ]);

  const config: any = configData;
  const latestBooks = allBooks?.books?.slice(0, 3) || [];
  const mostRelatable = allBooks?.books?.slice(3, 6) || [];

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-[#e8e0d5]">
      {/* ============================================
          1. HERO SECTION
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/30266551/pexels-photo-30266551/free-photo-of-cozy-autumn-coffee-with-old-books-and-music.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1920')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0e0c]/80 via-[#0f0e0c]/90 to-[#0f0e0c]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[11px] tracking-[0.4em] uppercase mb-8 text-[#8b7355] font-medium">
            Sebuah Ruang untuk
          </p>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 text-[#f5f0e8]">
            Kelas Pekerja
          </h1>
          
          <p className="text-xl md:text-2xl text-[#c4b5a0] mb-4 max-w-2xl mx-auto leading-relaxed">
            Tempat cerita orang-orang yang tetap jalan, meski capek.
          </p>

          <p className="text-sm md:text-base text-[#8b7355] max-w-md mx-auto mb-12 leading-relaxed opacity-80">
            Tentang malam, kopi, kerja, dan hal-hal yang sering kita pendam sendiri.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/buku"
              className="group inline-flex items-center gap-3 px-8 py-4 
              bg-[#e8e0d5] text-[#0f0e0c] rounded-full 
              hover:bg-[#f5f0e8] transition-all duration-300 text-sm tracking-wider font-medium"
            >
              <BookOpen size={18} />
              Mulai Baca
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/tulis"
              className="inline-flex items-center gap-2 px-8 py-4 
              border border-[#8b7355]/40 rounded-full text-[#c4b5a0]
              hover:border-[#8b7355] hover:text-[#e8e0d5] transition-all duration-300 text-sm tracking-wider"
            >
              <PenLine size={18} />
              Tulis Cerita
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-[#8b7355] to-transparent" />
        </div>
      </section>

      {/* ============================================
          2. INI TEMPAT APA SIH?
          ============================================ */}
      <section className="py-32 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6 text-[#8b7355]">
            Ini Tempat Apa Sih?
          </p>

          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8 text-[#f5f0e8]">
            Kelas Pekerja bukan tentang sukses.
            <br />
            <span className="italic text-[#8b7355]">Ini tentang bertahan.</span>
          </h2>

          <div className="space-y-4 text-lg md:text-xl leading-relaxed text-[#a09080]">
            <p>Tentang bangun pagi meski gak ada motivasi.</p>
            <p>Tentang pulang malam tapi kepala masih penuh.</p>
            <p className="text-[#c4b5a0]">
              Dan tentang hal-hal yang gak selalu bisa kita ceritakan ke siapa-siapa.
            </p>
          </div>

          <div className="mt-16 flex justify-center gap-8 text-[#8b7355]">
            <div className="w-24 h-px bg-[#8b7355]/30" />
            <Coffee size={20} className="opacity-60" />
            <div className="w-24 h-px bg-[#8b7355]/30" />
          </div>
        </div>
      </section>

      {/* ============================================
          3. TULISAN TERBARU
          ============================================ */}
      <section className="py-24 px-6 border-t border-[#8b7355]/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4 text-[#8b7355]">
              Tulisan Terbaru
            </p>
            <h3 className="font-serif text-3xl md:text-4xl mb-3 text-[#f5f0e8]">
              Cerita-cerita yang baru saja ditinggalkan di sini.
            </h3>
            <p className="text-sm text-[#8b7355]">
              Update setiap minggu. Baca pelan-pelan aja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBooks.map((book: any, index: number) => (
              <article 
                key={book.id} 
                className="group cursor-pointer"
              >
                <Link href={`/buku/${book.slug}`} className="block">
                  <div className="bg-[#1a1816] rounded-lg p-8 h-full 
                    border border-[#8b7355]/10 
                    group-hover:border-[#8b7355]/30 
                    group-hover:-translate-y-1 
                    transition-all duration-300">
                    
                    <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-[#8b7355] mb-4">
                      <span>{book.date || "2 hari lalu"}</span>
                      <span>•</span>
                      <span>{book.readTime || "4 min read"}</span>
                    </div>

                    <h4 className="font-serif text-xl mb-3 text-[#e8e0d5] group-hover:text-[#f5f0e8] transition-colors">
                      {book.title}
                    </h4>
                    
                    <p className="text-sm leading-relaxed text-[#a09080] line-clamp-3">
                      {book.excerpt || "Preview cerita yang akan membawa kamu ke sudut-sudut pikiran yang mungkin sering kamu kunjungi sendirian..."}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs text-[#8b7355] group-hover:text-[#c4b5a0] transition-colors">
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
              className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-[#8b7355] hover:text-[#e8e0d5] transition-colors"
            >
              Lihat Semua Tulisan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          4. PALING BANYAK DIRASA
          ============================================ */}
      <section className="py-24 px-6 bg-[#1a1816]/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4 text-[#8b7355]">
              Paling Banyak Dirasa
            </p>
            <h3 className="font-serif text-3xl md:text-4xl mb-3 text-[#f5f0e8]">
              Tulisan yang paling banyak bikin orang diem sebentar.
            </h3>
            <p className="text-sm text-[#8b7355]">
              Bukan karena viral. Tapi karena relate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mostRelatable.map((book: any, index: number) => (
              <article 
                key={book.id} 
                className="group cursor-pointer relative"
              >
                <Link href={`/buku/${book.slug}`} className="block">
                  {/* Badge */}
                  <div className="absolute -top-3 left-6 bg-[#8b7355] text-[#0f0e0c] text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-medium z-10">
                    Paling Dibaca
                  </div>

                  <div className="bg-[#0f0e0c] rounded-lg p-8 h-full pt-10
                    border border-[#8b7355]/20 
                    group-hover:border-[#8b7355]/40 
                    group-hover:-translate-y-1 
                    transition-all duration-300">
                    
                    <h4 className="font-serif text-xl mb-3 text-[#e8e0d5] group-hover:text-[#f5f0e8] transition-colors">
                      {book.title}
                    </h4>
                    
                    <p className="text-sm leading-relaxed text-[#a09080] line-clamp-3">
                      {book.excerpt || "Cerita ini resonansi kuat dengan banyak pembaca..."}
                    </p>

                    <div className="mt-6 flex items-center justify-between text-xs">
                      <span className="text-[#8b7355]">{book.readTime || "5 min read"}</span>
                      <ArrowRight size={14} className="text-[#8b7355] group-hover:text-[#e8e0d5] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          5. CTA: IKUT NULIS
          ============================================ */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-[#8b7355]/5" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <PenLine className="w-12 h-12 mx-auto mb-8 text-[#8b7355] opacity-80" />
          
          <h3 className="font-serif text-3xl md:text-4xl mb-6 text-[#f5f0e8]">
            Gak semua hal harus dipendam sendiri.
          </h3>
          
          <p className="text-lg text-[#a09080] mb-4 max-w-xl mx-auto leading-relaxed">
            Kalau lo punya cerita, tulis di sini.
          </p>
          <p className="text-sm text-[#8b7355] mb-10">
            Gak perlu sempurna. Yang penting, jujur.
          </p>

          <Link
            href="/tulis"
            className="inline-flex items-center gap-3 px-10 py-5 
            bg-[#8b7355] text-[#0f0e0c] rounded-full
            hover:bg-[#a08060] transition-all duration-300 text-sm tracking-wider font-medium
            shadow-lg shadow-[#8b7355]/20 hover:shadow-[#8b7355]/30"
          >
            <PenLine size={18} />
            Tulis Cerita
          </Link>

          {/* Testimoni mini */}
          <div className="mt-16 pt-8 border-t border-[#8b7355]/20">
            <p className="text-sm italic text-[#8b7355] max-w-md mx-auto">
              "Awalnya ragu, tapi ternyata banyak yang ngerasa sama."
            </p>
            <p className="text-xs text-[#6b5a45] mt-2">— Raka, Jakarta</p>
          </div>
        </div>
      </section>

      {/* ============================================
          6. FOOTER SIGNATURE
          ============================================ */}
      <footer className="py-24 px-6 border-t border-[#8b7355]/10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Signature Quote */}
          <div className="mb-16 space-y-2">
            <p className="font-serif text-2xl md:text-3xl text-[#c4b5a0]">
              Gak semua orang kuat.
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#c4b5a0]">
              Tapi banyak yang tetap jalan.
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#8b7355] italic">
              Dan mungkin, lo salah satunya.
            </p>
          </div>

          {/* Simple Nav */}
          <div className="flex justify-center gap-8 mb-12 text-sm text-[#8b7355]">
            <Link href="/buku" className="hover:text-[#e8e0d5] transition-colors">Buku</Link>
            <Link href="/tentang" className="hover:text-[#e8e0d5] transition-colors">Tentang</Link>
            <Link href="/tulis" className="hover:text-[#e8e0d5] transition-colors">Tulis</Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#6b5a45]">
            <Coffee size={14} />
            <span>Kelas Pekerja © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
