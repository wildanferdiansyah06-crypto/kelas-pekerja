"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PenLine } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

function getRelativeTime(dateString: string, lang: 'id' | 'en' = 'id'): string {
  try {
    if (!dateString) return lang === 'en' ? "Unknown date" : "Tanggal tidak diketahui";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return lang === 'en' ? "Invalid date" : "Tanggal tidak valid";

    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return lang === 'en' ? "Today" : "Hari ini";
    if (diffInDays === 1) return lang === 'en' ? "Yesterday" : "Kemarin";
    if (diffInDays < 7) return lang === 'en' ? `${diffInDays} days ago` : `${diffInDays} hari lalu`;
    if (diffInDays < 30) return lang === 'en' ? `${Math.floor(diffInDays / 7)} weeks ago` : `${Math.floor(diffInDays / 7)} minggu lalu`;
    return lang === 'en' ? `${Math.floor(diffInDays / 30)} months ago` : `${Math.floor(diffInDays / 30)} bulan lalu`;
  } catch {
    return lang === 'en' ? "Unknown date" : "Tanggal tidak diketahui";
  }
}

interface HomePageClientProps {
  featuredBooks: any[];
  latestBooks: any[];
  mostRelatable: any[];
  allBooks?: any[];
}

function getSimpleGreeting(hour: number, lang: 'id' | 'en'): string {
  if (lang === 'en') {
    if (hour >= 4 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Late night?';
  }
  if (hour >= 4 && hour < 12) return 'Selamat pagi';
  if (hour >= 12 && hour < 17) return 'Selamat siang';
  if (hour >= 17 && hour < 21) return 'Selamat sore';
  return 'Masih terjaga?';
}

export default function HomePageClient({
  featuredBooks = [],
  latestBooks = [],
  mostRelatable = [],
  allBooks = []
}: HomePageClientProps) {
  const { language, t } = useLanguage();
  const id = language === 'id';

  const greeting = React.useMemo(() => {
    return getSimpleGreeting(new Date().getHours(), language);
  }, [language]);

  const totalBooks = allBooks.length || featuredBooks.length + latestBooks.length + mostRelatable.length;

  if (!featuredBooks.length && !latestBooks.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-12 rounded-2xl" style={{ border: '1px solid var(--kp-border-medium)' }}>
          <p className="text-red-400 mb-4 font-ui">Terjadi kesalahan pada halaman</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full font-ui text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{
              background: 'var(--kp-accent)',
              color: '#0a0908',
            }}
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">

      {/* ════════════════════════════════════════════════
          HERO — Clean, no stock photo, honest copy
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center">
        {/* Simple dark gradient background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(212, 165, 116, 0.06) 0%, transparent 60%), var(--kp-bg-base)',
            }}
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--kp-bg-base)] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            {/* Simple greeting */}
            <p
              className="font-ui text-sm tracking-wide mb-6 opacity-60"
              style={{ color: 'var(--kp-accent)' }}
            >
              {greeting}
            </p>

            {/* One honest headline */}
            <h1 className="typography-h1 mb-8" style={{ color: 'var(--kp-text-primary)' }}>
              {id
                ? 'Tulisan dari orang-orang yang kerja tiap hari.'
                : 'Writing from people who work every day.'}
            </h1>

            {/* Short, real description */}
            <p
              className="font-body text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl opacity-70"
              style={{ color: 'var(--kp-text-secondary)' }}
            >
              {id
                ? 'Kelas Pekerja adalah arsip cerita, refleksi, dan tulisan pendek. Ditulis oleh dan untuk mereka yang menghabiskan sebagian besar hidupnya bekerja.'
                : 'Kelas Pekerja is an archive of stories, reflections, and short writings. Written by and for those who spend most of their lives working.'}
            </p>

            {/* Clean action buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/buku"
                className="px-7 py-3 rounded-full font-ui text-sm font-semibold transition-all duration-300 flex items-center gap-2 hover:opacity-90"
                style={{
                  background: 'var(--kp-accent)',
                  color: '#0a0908',
                }}
              >
                {t.booksPage.startReading}
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/tentang"
                className="px-7 py-3 rounded-full font-ui text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{
                  border: '1px solid var(--kp-border-strong)',
                  color: 'var(--kp-text-secondary)',
                }}
              >
                {t.nav.about}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          INI TEMPAT APA? — Straight-to-the-point
      ════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-12 items-start">
            {/* Left — what this is */}
            <div>
              <h2
                className="font-ui text-xs font-medium tracking-[0.2em] uppercase mb-5"
                style={{ color: 'var(--kp-text-muted)' }}
              >
                {id ? 'Tentang tempat ini' : 'About this place'}
              </h2>
              <p
                className="font-body text-xl leading-relaxed"
                style={{ color: 'var(--kp-text-secondary)' }}
              >
                {id
                  ? 'Bukan media. Bukan blog motivasi. Ini cuma kumpulan tulisan dari orang biasa — soal kerja, capek, pulang malam, dan hal-hal kecil yang jarang diceritakan.'
                  : "Not a media outlet. Not a motivational blog. Just a collection of writing from ordinary people — about work, exhaustion, late nights, and small things rarely told."}
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-full" style={{ background: 'var(--kp-border-medium)' }} />

            {/* Right — stats / concrete info */}
            <div>
              <h2
                className="font-ui text-xs font-medium tracking-[0.2em] uppercase mb-5"
                style={{ color: 'var(--kp-text-muted)' }}
              >
                {id ? 'Sejauh ini' : 'So far'}
              </h2>
              <div className="space-y-4">
                <div>
                  <span className="font-display text-4xl" style={{ color: 'var(--kp-text-primary)' }}>
                    {totalBooks || '—'}
                  </span>
                  <span className="font-body text-base ml-3" style={{ color: 'var(--kp-text-muted)' }}>
                    {id ? 'tulisan tersimpan' : 'writings archived'}
                  </span>
                </div>
                <p
                  className="font-body text-base leading-relaxed opacity-70"
                  style={{ color: 'var(--kp-text-secondary)' }}
                >
                  {id
                    ? 'Refleksi, cerita, filosofi, dan catatan perjalanan — semuanya dari perspektif kelas pekerja.'
                    : 'Reflections, stories, philosophy, and travel notes — all from the working class perspective.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURED BOOKS — Horizontal cards, no fluff
      ════════════════════════════════════════════════ */}
      {featuredBooks.length > 0 && (
        <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--kp-bg-surface)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 sm:mb-12 flex items-end justify-between">
              <div>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-4xl"
                  style={{ color: 'var(--kp-text-primary)' }}
                >
                  {id ? 'Pilihan' : 'Featured'}
                </h2>
                <p className="font-body text-sm sm:text-base mt-2 opacity-60" style={{ color: 'var(--kp-text-secondary)' }}>
                  {id ? 'Beberapa tulisan yang menurut kami layak dibaca duluan.' : 'A few writings we think are worth reading first.'}
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {featuredBooks.map((book, index) => (
                <article key={book?.id || `featured-${index}`} className="group">
                  <Link href={`/buku/${book?.slug || '#'}`} className="block">
                    <div
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 p-4 sm:p-6 md:p-8 rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                      style={{
                        border: '1px solid var(--kp-border)',
                        background: 'var(--kp-bg-muted)',
                      }}
                    >
                      {/* Cover image */}
                      {book?.cover && (
                        <div className="relative w-full sm:w-44 md:w-56 lg:w-64 aspect-[16/9] sm:aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={book.cover}
                            alt={book?.title || 'Book cover'}
                            fill
                            sizes="(max-width: 390px) 100vw, 256px"
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex flex-col justify-between flex-1 min-h-0">
                        <div>
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                            <span
                              className="font-ui text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-2 sm:px-2.5 py-1 rounded"
                              style={{
                                color: 'var(--kp-accent)',
                                background: 'rgba(212, 165, 116, 0.08)',
                              }}
                            >
                              {book?.category || 'Umum'}
                            </span>
                            <span className="font-ui text-xs" style={{ color: 'var(--kp-text-muted)' }}>
                              {book?.readTime || '5 menit'}
                            </span>
                          </div>

                          <h3
                            className="font-display text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 leading-tight"
                            style={{ color: 'var(--kp-text-primary)' }}
                          >
                            {book?.title || 'Tanpa Judul'}
                          </h3>

                          <p
                            className="font-body text-sm sm:text-base md:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3 opacity-70"
                            style={{ color: 'var(--kp-text-secondary)' }}
                          >
                            {book?.subtitle || book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                          </p>
                        </div>

                        <div
                          className="flex items-center gap-2 mt-4 sm:mt-6 font-ui text-sm transition-colors duration-200"
                          style={{ color: 'var(--kp-text-muted)' }}
                        >
                          <span className="group-hover:text-[var(--kp-accent)] transition-colors">
                            {id ? 'Baca' : 'Read'}
                          </span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 group-hover:text-[var(--kp-accent)] transition-all" />
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
      <section className="py-14 tablet:py-20 laptop:py-28 px-4 tablet:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 tablet:mb-12 flex items-end justify-between">
            <div>
              <h2
                className="font-display text-2xl tablet:text-3xl laptop:text-4xl"
                style={{ color: 'var(--kp-text-primary)' }}
              >
                {id ? 'Terbaru' : 'Latest'}
              </h2>
              <p className="font-body text-sm tablet:text-base mt-2 opacity-60" style={{ color: 'var(--kp-text-secondary)' }}>
                {id ? 'Tulisan yang baru masuk.' : 'Recently added.'}
              </p>
            </div>
            <Link
              href="/buku"
              className="hidden tablet:inline-flex items-center gap-2 font-ui text-sm transition-opacity hover:opacity-100 opacity-60"
              style={{ color: 'var(--kp-accent)' }}
            >
              {id ? 'Semua tulisan' : 'All writings'}
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y" style={{ borderColor: 'var(--kp-border)' }}>
            {latestBooks.map((book, index) => (
              <article key={book?.id || `latest-${index}`} className="group">
                <Link
                  href={`/buku/${book?.slug || '#'}`}
                  className="flex flex-col gap-2 py-5 tablet:py-6 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="font-display text-lg tablet:text-xl laptop:text-2xl group-hover:text-[var(--kp-accent)] transition-colors duration-200 leading-snug"
                      style={{ color: 'var(--kp-text-primary)' }}
                    >
                      {book?.title || 'Tanpa Judul'}
                    </h3>
                    <ArrowRight
                      size={16}
                      className="opacity-0 group-hover:opacity-60 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                      style={{ color: 'var(--kp-text-muted)' }}
                    />
                  </div>
                  <p
                    className="font-body text-sm tablet:text-base line-clamp-1 opacity-60"
                    style={{ color: 'var(--kp-text-secondary)' }}
                  >
                    {book?.excerpt || 'Tidak ada deskripsi.'}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className="font-ui text-[10px] tracking-wider uppercase"
                      style={{ color: 'var(--kp-text-muted)' }}
                    >
                      {book?.category || 'Umum'}
                    </span>
                    <span className="w-1 h-1 rounded-full opacity-30" style={{ background: 'var(--kp-text-muted)' }} />
                    <span
                      className="font-ui text-[10px] sm:text-xs opacity-50"
                      style={{ color: 'var(--kp-text-muted)' }}
                    >
                      {getRelativeTime(book?.publishedAt || new Date().toISOString(), language)}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-6 tablet:mt-8 tablet:hidden">
            <Link
              href="/buku"
              className="inline-flex items-center gap-2 font-ui text-sm"
              style={{ color: 'var(--kp-accent)' }}
            >
              {id ? 'Lihat semua' : 'See all'}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* PALING BANYAK DIBACA */}
      {mostRelatable.length > 0 && (
        <section className="py-14 tablet:py-20 laptop:py-28 px-4 tablet:px-6" style={{ background: 'var(--kp-bg-surface)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 tablet:mb-12">
              <h2
                className="font-display text-2xl tablet:text-3xl laptop:text-4xl"
                style={{ color: 'var(--kp-text-primary)' }}
              >
                {id ? 'Paling banyak dibaca' : 'Most read'}
              </h2>
              <p className="font-body text-sm tablet:text-base mt-2 opacity-60" style={{ color: 'var(--kp-text-secondary)' }}>
                {id ? 'Yang paling sering dibuka orang.' : 'The ones people open most.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 gap-4 tablet:gap-6">
              {mostRelatable.map((book, index) => (
                <article key={book?.id || `relatable-${index}`} className="group">
                  <Link href={`/buku/${book?.slug || '#'}`} className="block h-full">
                    <div
                      className="p-4 tablet:p-6 laptop:p-7 rounded-xl h-full flex flex-col transition-all duration-300 hover:translate-y-[-2px]"
                      style={{
                        border: '1px solid var(--kp-border)',
                        background: 'var(--kp-bg-muted)',
                      }}
                    >
                      <span
                        className="font-display text-4xl tablet:text-5xl mb-3 tablet:mb-5 block opacity-20"
                        style={{ color: 'var(--kp-accent)' }}
                      >
                        {index + 1}
                      </span>

                      <div className="flex-1">
                        <span
                          className="font-ui text-[10px] tracking-wider uppercase"
                          style={{ color: 'var(--kp-text-muted)' }}
                        >
                          {book?.category || 'Umum'}
                        </span>

                        <h3
                          className="font-display text-base sm:text-lg tablet:text-xl laptop:text-2xl mt-1.5 mb-2 tablet:mb-3 group-hover:text-[var(--kp-accent)] transition-colors duration-200 leading-snug"
                          style={{ color: 'var(--kp-text-primary)' }}
                        >
                          {book?.title || 'Tanpa Judul'}
                        </h3>

                        <p
                          className="font-body text-xs sm:text-sm leading-relaxed line-clamp-2 tablet:line-clamp-3 opacity-60"
                          style={{ color: 'var(--kp-text-secondary)' }}
                        >
                          {book?.excerpt || 'Tidak ada deskripsi.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 tablet:mt-6 pt-3 tablet:pt-4" style={{ borderTop: '1px solid var(--kp-border)' }}>
                        <span className="font-ui text-xs" style={{ color: 'var(--kp-text-muted)' }}>
                          {book?.readTime || '5 menit'}
                        </span>
                        <ArrowRight
                          size={14}
                          className="opacity-30 group-hover:opacity-80 group-hover:translate-x-1 transition-all"
                          style={{ color: 'var(--kp-accent)' }}
                        />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════
          CTA — Simple, no floating icons or aurora
      ════════════════════════════════════════════════ */}

      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <PenLine
            size={28}
            className="mx-auto mb-6 opacity-40"
            style={{ color: 'var(--kp-accent)' }}
          />

          <h2
            className="font-display text-3xl md:text-4xl mb-4"
            style={{ color: 'var(--kp-text-primary)' }}
          >
            {id ? 'Punya cerita?' : 'Got a story?'}
          </h2>

          <p
            className="font-body text-lg mb-10 opacity-60"
            style={{ color: 'var(--kp-text-secondary)' }}
          >
            {id
              ? 'Kalau kamu punya tulisan soal kerja, hidup, atau apa pun yang jarang dibicarakan — tulis di sini. Nggak perlu bagus, yang penting jujur.'
              : "If you have something to write about work, life, or anything rarely talked about — write it here. It doesn't have to be good, just honest."}
          </p>

          <Link
            href="/tulis"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-ui text-sm font-semibold transition-all duration-300 hover:opacity-90"
            style={{
              background: 'var(--kp-accent)',
              color: '#0a0908',
            }}
          >
            <PenLine size={16} />
            {id ? 'Tulis Sesuatu' : 'Write Something'}
          </Link>
        </div>
      </section>

    </div>
  );
}
