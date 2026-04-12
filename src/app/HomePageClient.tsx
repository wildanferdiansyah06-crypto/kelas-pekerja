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
    <div className="relative transition-colors duration-500" style={{ backgroundColor: 'var(--kp-bg-base)', color: 'var(--kp-text-primary)' }}>
        {/* HERO */}
        <section className="relative flex items-center justify-center px-6 py-20 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-20 pb-32">
            <div
              className="font-ui text-xs font-medium tracking-widest uppercase mb-8 flex items-center justify-center gap-2"
              style={{ color: 'var(--kp-accent)' }}
            >
              <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--kp-accent-light)' }}></div>
              Sebuah Ruang untuk
            </div>

            <h1
              className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6"
              style={{ color: 'var(--kp-text-primary)', lineHeight: '1.1' }}
            >
              Kelas<br /><em style={{ color: 'var(--kp-accent)', fontStyle: 'italic' }}>Pekerja</em>
            </h1>

            <p
              className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ color: 'var(--kp-text-secondary)' }}
            >
              Di antara sunyi dan langkah, kita menemukan makna. Tentang malam yang tak pernah benar-benar tidur, kopi yang menghangatkan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/buku"
                className="group inline-flex items-center gap-3 px-7 py-3 rounded-full font-ui text-sm font-medium transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--kp-text-primary)',
                  color: 'var(--kp-bg-base)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kp-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kp-text-primary)';
                }}
              >
                Mulai Membaca
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/tulis"
                className="inline-flex items-center gap-2 px-7 py-3 font-ui text-sm font-normal transition-colors duration-200"
                style={{ color: 'var(--kp-text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--kp-text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--kp-text-muted)';
                }}
              >
                Tulis Cerita →
              </Link>
            </div>

          </div>

          {/* Stat Bar */}
          <div
            className="flex gap-12 px-12 py-5"
            style={{
              backgroundColor: 'var(--kp-bg-surface)',
              borderTop: '1px solid var(--kp-border)',
            }}
          >
            <div className="flex items-baseline gap-1.5">
              <div className="font-display text-2xl" style={{ color: 'var(--kp-text-primary)' }}>
                {allBooks.length}
              </div>
              <div className="font-ui text-xs" style={{ color: 'var(--kp-text-muted)' }}>
                Buku
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <div className="font-display text-2xl" style={{ color: 'var(--kp-text-primary)' }}>
                {totalViews.toLocaleString()}
              </div>
              <div className="font-ui text-xs" style={{ color: 'var(--kp-text-muted)' }}>
                Dibaca
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <div className="font-display text-2xl" style={{ color: 'var(--kp-text-primary)' }}>
                ∞
              </div>
              <div className="font-ui text-xs" style={{ color: 'var(--kp-text-muted)' }}>
                Kopi
              </div>
            </div>
          </div>
        </section>

      {/* INI TEMPAT APA? */}
      <section className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="font-ui text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--kp-text-muted)' }}
          >
            Ini Tempat Apa?
          </div>

          <h2
            className="font-display text-2xl sm:text-4xl md:text-5xl leading-tight mb-8"
            style={{ color: 'var(--kp-text-primary)' }}
          >
            Bukan tentang puncak.
            <br />
            <em style={{ color: 'var(--kp-accent)', fontStyle: 'italic' }}>Ini tentang perjalanan yang tak terhitung.</em>
          </h2>

          <div className="space-y-4 font-body text-base md:text-lg leading-relaxed" style={{ color: 'var(--kp-text-secondary)' }}>
            <p>Bangun pagi saat dunia masih terbungkus kabut.</p>
            <p>Pulang malam dengan bayangan semakin panjang.</p>
            <p style={{ color: 'var(--kp-text-primary)' }}>Dan hal-hal yang hanya bisa diucapkan dalam keheningan.</p>
          </div>

          <div className="mt-12 flex justify-center gap-8" style={{ color: 'var(--kp-accent-light)' }}>
            <div className="w-24 h-px" style={{ backgroundColor: 'var(--kp-accent-faint)' }} />
            <Coffee size={20} className="opacity-60" />
            <div className="w-24 h-px" style={{ backgroundColor: 'var(--kp-accent-faint)' }} />
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      {featuredBooks.length > 0 && (
        <section className="py-24 px-6 border-t" style={{ borderColor: 'var(--kp-border)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div
                className="font-ui text-xs font-medium tracking-widest uppercase mb-2"
                style={{ color: 'var(--kp-text-muted)' }}
              >
                Pilihan Editor
              </div>
              <h3
                className="font-display text-2xl md:text-3xl mb-3"
                style={{ color: 'var(--kp-text-primary)' }}
              >
                Buku Unggulan
              </h3>
              <p className="font-body text-sm" style={{ color: 'var(--kp-text-secondary)' }}>
                Dua karya yang menembus keheningan, membantu pembaca menemukan makna dalam sunyi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {featuredBooks.map((book, index) => (
                <article key={book?.id || `featured-${index}`} className="group cursor-pointer">
                  <Link href={`/buku/${book?.slug || '#'}`} className="block">
                    <div
                      className="rounded-lg overflow-hidden border transition-all duration-200"
                      style={{
                        backgroundColor: 'var(--kp-bg-base)',
                        borderColor: 'var(--kp-border)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--kp-border-medium)';
                        e.currentTarget.style.boxShadow = 'var(--kp-shadow-md)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--kp-border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
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

                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="font-ui text-xs font-medium tracking-widest uppercase px-2 py-1 rounded"
                            style={{
                              color: 'var(--kp-accent)',
                              backgroundColor: 'var(--kp-accent-faint)',
                            }}
                          >
                            {book?.category || 'Umum'}
                          </span>
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--kp-text-subtle)' }}></div>
                          <span className="font-ui text-xs" style={{ color: 'var(--kp-text-muted)' }}>
                            {book?.readTime || '5 menit'}
                          </span>
                        </div>

                        <h4
                          className="font-display text-lg mb-2"
                          style={{ color: 'var(--kp-text-primary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--kp-accent)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--kp-text-primary)';
                          }}
                        >
                          {book?.title || 'Tanpa Judul'}
                        </h4>

                        <p className="font-body text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--kp-text-secondary)' }}>
                          {book?.subtitle || book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                        </p>
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
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--kp-bg-base)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div
              className="font-ui text-xs font-medium tracking-widest uppercase mb-2"
              style={{ color: 'var(--kp-text-muted)' }}
            >
              Tulisan Terbaru
            </div>
            <h3
              className="font-display text-2xl md:text-3xl mb-3"
              style={{ color: 'var(--kp-text-primary)' }}
            >
              Jejak-jejak yang baru saja tertinggal.
            </h3>
            <p className="font-body text-sm" style={{ color: 'var(--kp-text-secondary)' }}>
              Setiap minggu, sebuah cerita baru. Baca dengan perlahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestBooks.map((book, index) => (
              <article key={book?.id || `latest-${index}`} className="group cursor-pointer">
                <Link href={`/buku/${book?.slug || '#'}`} className="block">
                  <div
                    className="rounded-lg p-6 h-full border transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--kp-bg-base)',
                      borderColor: 'var(--kp-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--kp-border-medium)';
                      e.currentTarget.style.boxShadow = 'var(--kp-shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--kp-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="font-ui text-xs font-medium tracking-widest uppercase px-2 py-1 rounded"
                        style={{
                          color: 'var(--kp-accent)',
                          backgroundColor: 'var(--kp-accent-faint)',
                        }}
                      >
                        {book?.category || 'Umum'}
                      </span>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--kp-text-subtle)' }}></div>
                      <span className="font-ui text-xs" style={{ color: 'var(--kp-text-muted)' }}>
                        {getRelativeTime(book?.publishedAt || new Date().toISOString())}
                      </span>
                    </div>

                    <h4
                      className="font-display text-lg mb-3"
                      style={{ color: 'var(--kp-text-primary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--kp-accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--kp-text-primary)';
                      }}
                    >
                      {book?.title || 'Tanpa Judul'}
                    </h4>

                    <p className="font-body text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--kp-text-secondary)' }}>
                      {book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-ui" style={{ color: 'var(--kp-text-muted)' }}>
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
              className="inline-flex items-center gap-2 text-sm font-ui tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'var(--kp-text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--kp-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--kp-text-muted)';
              }}
            >
              Lihat Semua Tulisan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PALING BANYAK DIRASA */}
      <section
        className="py-24 px-6 border-t border-b"
        style={{
          backgroundColor: 'var(--kp-bg-surface)',
          borderColor: 'var(--kp-border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div
              className="font-ui text-xs font-medium tracking-widest uppercase mb-2"
              style={{ color: 'var(--kp-text-muted)' }}
            >
              Paling Banyak Dirasa
            </div>
            <h3
              className="font-display text-2xl md:text-3xl mb-3"
              style={{ color: 'var(--kp-text-primary)' }}
            >
              Kata-kata yang membuat banyak orang terdiam sejenak.
            </h3>
            <p className="font-body text-sm" style={{ color: 'var(--kp-text-secondary)' }}>
              Bukan karena ramai. Tapi karena menyentuh bagian dalam yang sama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mostRelatable.length > 0 ? mostRelatable.map((book, index) => (
              <article key={book?.id || `relatable-${index}`} className="group cursor-pointer relative">
                <Link href={`/buku/${book?.slug || '#'}`} className="block">
                  <div
                    className="absolute -top-3 left-6 text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-medium z-10"
                    style={{
                      backgroundColor: 'var(--kp-accent)',
                      color: 'var(--kp-bg-base)',
                    }}
                  >
                    Paling Dibaca
                  </div>

                  <div
                    className="rounded-lg p-6 h-full pt-10 border transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--kp-bg-base)',
                      borderColor: 'var(--kp-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--kp-border-medium)';
                      e.currentTarget.style.boxShadow = 'var(--kp-shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--kp-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h4
                      className="font-display text-lg mb-3"
                      style={{ color: 'var(--kp-text-primary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--kp-accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--kp-text-primary)';
                      }}
                    >
                      {book?.title || 'Tanpa Judul'}
                    </h4>

                    <p className="font-body text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: 'var(--kp-text-secondary)' }}>
                      {book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-ui mb-4" style={{ color: 'var(--kp-text-muted)' }}>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {book?.stats?.views?.toLocaleString() || '0'}
                      </span>
                      <span>{book?.readTime || '5 menit'}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-ui" style={{ color: 'var(--kp-text-muted)' }}>
                      <span>Baca selengkapnya</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </article>
            )) : (
              <div className="col-span-3 text-center py-12" style={{ color: 'var(--kp-text-muted)' }}>
                <p>Lebih banyak cerita akan segera hadir...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: 'var(--kp-bg-invert)' }}>
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-display text-2xl mb-4"
            style={{ color: 'var(--kp-text-on-dark)' }}
          >
            Punya cerita yang ingin dibagikan?
          </h2>
          <p
            className="font-body text-base mb-8"
            style={{ color: 'rgba(245,240,232,0.5)' }}
          >
            Setiap cerita berharga. Tulis cerita pertamamu dan bergabung dengan kelas pekerja lain.
          </p>
          <Link
            href="/tulis"
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full font-ui text-sm font-medium transition-colors duration-200"
            style={{
              backgroundColor: 'var(--kp-bg-base)',
              color: 'var(--kp-text-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--kp-accent-faint)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
            }}
          >
            <PenLine size={18} />
            Tulis Cerita Pertamamu
          </Link>
        </div>
      </section>

    </div>
  );
}
