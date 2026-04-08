"use client";

import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine, Coffee, Eye } from "lucide-react";
import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";
import Footer from "@/src/components/Footer";

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Hari ini";
  if (diffInDays === 1) return "Kemarin";
  if (diffInDays < 7) return `${diffInDays} hari lalu`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu lalu`;
  return `${Math.floor(diffInDays / 30)} bulan lalu`;
}

export default async function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const featuredData = await getFeaturedBooks(2);
  const config = await getConfig();
  const allBooksData = await getBooks({ limit: 6 });
  
  const featuredBooks = featuredData.books;
  const allBooks = allBooksData.books;
  const latestBooks = allBooks.slice(0, 3);
  
  const featuredSlugs = new Set(latestBooks.map(b => b.slug));
  const mostRelatable = allBooks
    .filter(b => b.featured && !featuredSlugs.has(b.slug))
    .slice(0, 3);
  
  if (mostRelatable.length < 3) {
    const remaining = allBooks.filter(b => !featuredSlugs.has(b.slug) && !mostRelatable.find(m => m.slug === b.slug));
    mostRelatable.push(...remaining.slice(0, 3 - mostRelatable.length));
  }
  
  const totalViews = allBooks.reduce((sum, book) => sum + (book.stats?.views || 0), 0);
  const totalDownloads = allBooks.reduce((sum, book) => sum + (book.stats?.downloads || 0), 0);
  
  return (
    <div className={`relative min-h-screen ${isDark ? 'bg-[#faf9f7]' : 'bg-gradient-to-br from-[#faf9f7] via-[#f8f7e6] to-[#e8e5d6]'} ${isDark ? 'text-[#2d2a26]' : 'text-[#2b2a26]'} dark:text-[#e8e0d5] transition-colors duration-500`}>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
          <div className="absolute inset-0 z-0">
            {/* Light theme animated background */}
            <div className="absolute inset-0">
              {/* Coffee bean illustrations */}
              <div className="absolute top-20 left-10 w-32 h-32 opacity-30 rotate-12 animate-pulse">
                <div className={`w-full h-full ${isDark ? 'bg-gradient-to-br from-[#8b7355]/20 to-[#654321]/10' : 'bg-gradient-to-br from-[#c7b299]/20 to-[#8b7355]/10'} rounded-full blur-3xl`}></div>
              </div>
              <div className="absolute top-40 right-20 w-24 h-24 opacity-25 -rotate-6 animate-pulse" style={{ animationDelay: '2s' }}>
                <div className={`w-full h-full ${isDark ? 'bg-gradient-to-tr from-[#a0522d]/15 to-[#8b7355]/8' : 'bg-gradient-to-tr from-[#d2691e]/15 to-[#c7b299]/8'} rounded-full blur-2xl`}></div>
              </div>
              <div className="absolute bottom-32 left-1/4 w-40 h-40 opacity-20 rotate-45 animate-pulse" style={{ animationDelay: '4s' }}>
                <div className={`w-full h-full ${isDark ? 'bg-gradient-to-r from-[#8b7355]/10 to-[#a0522d]/5' : 'bg-gradient-to-r from-[#cd853f]/10 to-[#8b7355]/5'} rounded-full blur-2xl`}></div>
              </div>
              
              {/* Steam/coffee vapor effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-15">
                <div className={`w-full h-full ${isDark ? 'bg-gradient-radial from-[#f4e4d4]/10 via-transparent to-transparent' : 'bg-gradient-radial from-[#f5deb3]/10 via-transparent to-transparent'} animate-pulse`}></div>
              </div>
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-[#faf9f7]/80 via-transparent to-[#faf9f7]/95' : 'bg-gradient-to-br from-[#faf9f7]/80 via-transparent to-[#e8e5d6]'} `}></div>
              
              {/* Decorative circles */}
              <div className="absolute top-1/3 left-1/4 w-64 h-64 opacity-5">
                <div className={`w-full h-full border-2 ${isDark ? 'border-[#8b7355]/20' : 'border-[#8b7355]/20'} rounded-full animate-spin`} style={{ animationDuration: '60s' }}></div>
              </div>
              <div className="absolute bottom-1/3 right-1/4 w-48 h-48 opacity-5">
                <div className={`w-full h-full border ${isDark ? 'border-[#8b7355]/15' : 'border-[#8b7355]/20'} rounded-full animate-spin`} style={{ animationDuration: '45s', animationDirection: 'reverse' }}></div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className={`text-[11px] tracking-[0.4em] uppercase mb-8 ${isDark ? 'text-[#a08060]' : 'text-[#8b7355]'} font-medium`}>
              Sebuah Ruang untuk
            </p>
            
            <h1 className={`font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 ${isDark ? 'text-[#f5f0e8]' : 'text-[#1a1816]'} dark:text-[#f5f0e8]`}>
              Kelas Pekerja
            </h1>
            
            <p className={`text-xl md:text-2xl ${isDark ? 'text-[#c4b5a0]' : 'text-[#5c5346]'} dark:text-[#c4b5a0] mb-4 max-w-2xl mx-auto leading-relaxed`}>
              Di antara sunyi dan langkah, kita menemukan makna.
            </p>
            
            <p className={`text-sm md:text-base ${isDark ? 'text-[#a08060]' : 'text-[#8b7355]'} max-w-md mx-auto mb-12 leading-relaxed opacity-80`}>
              {config.tagline || "Tentang malam yang tak pernah benar-benar tidur, kopi yang menghangatkan, dan cerita-cerita yang tersimpan di antara detik-detik yang terlewat."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/buku"
                className={`group inline-flex items-center gap-3 px-8 py-4 ${isDark ? 'bg-[#c7b299]' : 'bg-[#2d2a26]'} dark:${isDark ? 'bg-[#1a1816]' : 'bg-[#e8e0d5]'} text-white rounded-full hover:${isDark ? 'bg-[#8b7355]' : 'bg-[#1a1816]'} transition-all duration-300 text-sm tracking-wider font-medium`}
              >
                <BookOpen size={18} />
                Mulai Membaca
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/tulis"
                className={`inline-flex items-center gap-2 px-8 py-4 border ${isDark ? 'border-[#8b7355]/40' : 'border-[#8b7355]/20'} rounded-full ${isDark ? 'text-[#c4b5a0]' : 'text-[#5c5346]'} dark:${isDark ? 'text-[#c4b5a0]' : 'text-[#2d2a26]'} hover:${isDark ? 'border-[#8b7355]' : 'border-[#8b7355]'} hover:${isDark ? 'text-[#2d2a26]' : 'text-[#1a1816]'} transition-all duration-300 text-sm tracking-wider`}
              >
                <PenLine size={18} />
                Tulis Cerita
              </Link>
            </div>

          </div>
        </section>

      {/* INI TEMPAT APA? */}
      <section className="py-32 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className={`text-[10px] tracking-[0.4em] uppercase mb-6 ${isDark ? 'text-[#a08060]' : 'text-[#8b7355]'} `}>
            Ini Tempat Apa?
          </p>

          <h2 className={`font-serif text-4xl md:text-5xl leading-tight mb-8 ${isDark ? 'text-[#f5f0e8]' : 'text-[#1a1816]'} dark:text-[#f5f0e8]`}>
              Bukan tentang puncak.
              <br />
              <span className={`italic ${isDark ? 'text-[#a08060]' : 'text-[#8b7355]'} `}>Ini tentang perjalanan yang tak terhitung.</span>
            </h2>

          <div className="space-y-4 text-lg md:text-xl leading-relaxed text-[#6b6055] dark:text-[#a09080]">
            <p>Bangun pagi saat dunia masih terbungkus kabut.</p>
            <p>Pulang malam dengan bayangan semakin panjang.</p>
            <p className={`text-[#5c5346] dark:text-[#c4b5a0]`}>Dan hal-hal yang hanya bisa diucapkan dalam keheningan.</p>
          </div>

          <div className="mt-16 flex justify-center gap-8 text-[#8b7355] dark:text-[#a08060]">
            <div className={`w-24 h-px ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#8b7355]/30'} dark:bg-[#a08060]/30`} />
            <Coffee size={20} className="opacity-60" />
            <div className={`w-24 h-px ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#8b7355]/30'} dark:bg-[#a08060]/30`} />
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      {featuredBooks.length > 0 && (
        <section className="py-24 px-6 border-t border-[#8b7355]/10 dark:border-[#a08060]/10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4 text-[#8b7355] dark:text-[#a08060]">
                Pilihan Editor
              </p>
              <h3 className="font-serif text-3xl md:text-4xl mb-3 text-[#1a1816] dark:text-[#f5f0e8]">
                Buku Unggulan
              </h3>
              <p className="text-sm text-[#8b7355] dark:text-[#a08060] max-w-md mx-auto">
                Dua karya yang menembus keheningan, membantu pembaca menemukan makna dalam sunyi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {featuredBooks.map((book) => (
                <article key={book.id} className="group cursor-pointer">
                  <Link href={`/buku/${book.slug}`} className="block">
                    <div className="bg-[#f5f3ef] dark:bg-[#1a1816] rounded-lg overflow-hidden border border-[#8b7355]/10 dark:border-[#a08060]/10 group-hover:border-[#8b7355]/30 dark:group-hover:border-[#a08060]/30 transition-all duration-300">
                      {book.cover && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img 
                            src={book.cover} 
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-[#8b7355] dark:text-[#a08060] mb-3">
                          <span>{book.category}</span>
                          <span>•</span>
                          <span>{book.pages} halaman</span>
                        </div>

                        <h4 className="font-serif text-xl mb-2 text-[#2d2a26] dark:text-[#e8e0d5] group-hover:text-[#1a1816] dark:group-hover:text-[#f5f0e8] transition-colors">
                          {book.title}
                        </h4>
                        
                        <p className="text-sm text-[#6b6055] dark:text-[#a09080] line-clamp-2 mb-4">
                          {book.subtitle || book.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-[#8b7355] dark:text-[#a08060]">
                          <span>{book.readTime}</span>
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
      <section className="py-24 px-6 border-t border-[#8b7355]/10 dark:border-[#a08060]/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4 text-[#8b7355] dark:text-[#a08060]">
              Tulisan Terbaru
            </p>
            <h3 className="font-serif text-3xl md:text-4xl mb-3 text-[#1a1816] dark:text-[#f5f0e8]">
              Jejak-jejak yang baru saja tertinggal.
            </h3>
            <p className="text-sm text-[#8b7355] dark:text-[#a08060]">
              Setiap minggu, sebuah cerita baru. Baca dengan perlahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBooks.map((book) => (
              <article key={book.id} className="group cursor-pointer">
                <Link href={`/buku/${book.slug}`} className="block">
                  <div className="bg-[#f5f3ef] dark:bg-[#1a1816] rounded-lg p-8 h-full border border-[#8b7355]/10 dark:border-[#a08060]/10 group-hover:border-[#8b7355]/30 dark:group-hover:border-[#a08060]/30 group-hover:-translate-y-1 transition-all duration-300">
                    
                    <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-[#8b7355] dark:text-[#a08060] mb-4">
                      <span>{getRelativeTime(book.publishedAt)}</span>
                      <span>•</span>
                      <span>{book.readTime}</span>
                    </div>

                    <h4 className="font-serif text-xl mb-3 text-[#2d2a26] dark:text-[#e8e0d5] group-hover:text-[#1a1816] dark:group-hover:text-[#f5f0e8] transition-colors">
                      {book.title}
                    </h4>
                    
                    <p className="text-sm leading-relaxed text-[#6b6055] dark:text-[#a09080] line-clamp-3">
                      {book.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs text-[#8b7355] dark:text-[#a08060] group-hover:text-[#5c5346] dark:group-hover:text-[#c4b5a0] transition-colors">
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
              className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-[#8b7355] dark:text-[#a08060] hover:text-[#2d2a26] dark:hover:text-[#e8e0d5] transition-colors"
            >
              Lihat Semua Tulisan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PALING BANYAK DIRASA */}
      <section className="py-24 px-6 bg-[#f5f3ef] dark:bg-[#1a1816]/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4 text-[#8b7355] dark:text-[#a08060]">
              Paling Banyak Dirasa
            </p>
            <h3 className="font-serif text-3xl md:text-4xl mb-3 text-[#1a1816] dark:text-[#f5f0e8]">
              Kata-kata yang membuat banyak orang terdiam sejenak.
            </h3>
            <p className="text-sm text-[#8b7355] dark:text-[#a08060]">
              Bukan karena ramai. Tapi karena menyentuh bagian dalam yang sama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mostRelatable.length > 0 ? mostRelatable.map((book) => (
              <article key={book.id} className="group cursor-pointer relative">
                <Link href={`/buku/${book.slug}`} className="block">
                  <div className="absolute -top-3 left-6 bg-[#8b7355] dark:bg-[#a08060] text-[#faf9f7] dark:text-[#0f0e0c] text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-medium z-10">
                    Paling Dibaca
                  </div>

                  <div className="bg-[#faf9f7] dark:bg-[#0f0e0c] rounded-lg p-8 h-full pt-10 border border-[#8b7355]/20 dark:border-[#a08060]/20 group-hover:border-[#8b7355]/40 dark:group-hover:border-[#a08060]/40 group-hover:-translate-y-1 transition-all duration-300">
                    
                    <h4 className="font-serif text-xl mb-3 text-[#2d2a26] dark:text-[#e8e0d5] group-hover:text-[#1a1816] dark:group-hover:text-[#f5f0e8] transition-colors">
                      {book.title}
                    </h4>
                    
                    <p className="text-sm leading-relaxed text-[#6b6055] dark:text-[#a09080] line-clamp-3 mb-4">
                      {book.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-[#9a8b7a] dark:text-[#6b5a45] mb-4">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {book.stats?.views?.toLocaleString() || 0}
                      </span>
                      <span>{book.readTime}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8b7355] dark:text-[#a08060] group-hover:text-[#5c5346] dark:group-hover:text-[#c4b5a0] transition-colors">
                        Baca selengkapnya
                      </span>
                      <ArrowRight size={14} className="text-[#8b7355] dark:text-[#a08060] group-hover:text-[#2d2a26] dark:group-hover:text-[#e8e0d5] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </article>
            )) : (
              <div className="col-span-3 text-center py-12 text-[#8b7355] dark:text-[#a08060]">
                <p>Lebih banyak cerita akan segera hadir...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6 border-t border-[#8b7355]/10 dark:border-[#a08060]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-3xl font-serif text-[#8b7355] dark:text-[#a08060] mb-2">
              {allBooks.length}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#9a8b7a] dark:text-[#6b5a45]">Buku</div>
          </div>

          <div>
            <div className="text-3xl font-serif text-[#8b7355] dark:text-[#a08060] mb-2">
              {totalViews.toLocaleString()}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#9a8b7a] dark:text-[#6b5a45]">Dibaca</div>
          </div>

          <div>
            <div className="text-3xl font-serif text-[#8b7355] dark:text-[#a08060] mb-2">
              {totalDownloads.toLocaleString()}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#9a8b7a] dark:text-[#6b5a45]">Diunduh</div>
          </div>

          <div>
            <div className="text-3xl font-serif text-[#8b7355] dark:text-[#a08060] mb-2">∞</div>
            <div className="text-xs uppercase tracking-wider text-[#9a8b7a] dark:text-[#6b5a45]">Kopi</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-[#8b7355]/10 dark:border-[#a08060]/10">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/tulis"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#2d2a26] dark:bg-[#8b7355] text-[#faf9f7] dark:text-[#0f0e0c] rounded-full hover:bg-[#1a1816] dark:hover:bg-[#a08060] transition-all duration-300 text-sm tracking-wider font-medium shadow-lg shadow-[#8b7355]/20 dark:shadow-[#a08060]/20 hover:shadow-[#8b7355]/30 dark:hover:shadow-[#a08060]/30"
          >
            <PenLine size={18} />
            Tulis Cerita Pertamamu
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
