"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Clock, BookOpen } from "lucide-react";
import { Book } from "@/src/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useReader } from "@/src/contexts/ReaderContext";
import { getLocalizedBook } from "@/src/lib/utils";
import BookmarkButton from "@/src/components/BookmarkButton";
import ShareButtons from "@/src/components/ShareButtons";
import ReadingProgressRestore from "@/src/components/ReadingProgressRestore";
import ReaderControls from "@/src/components/ReaderControls";

interface BookDetailClientProps {
  book: Book;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const { language } = useLanguage();
  const { themeStyles, fontSizeClass, fontFamilyClass } = useReader();
  const localizedBook = getLocalizedBook(book, language);

  const backText = language === 'en' ? 'Back to Bookshelf' : 'Kembali ke Rak';
  const pagesText = language === 'en' ? 'pages' : 'halaman';
  const readsText = language === 'en' ? 'reads' : 'kali dibaca';
  const downloadsText = language === 'en' ? 'downloads' : 'kali diunduh';
  const downloadBtnText = language === 'en' ? 'Download Book' : 'Unduh Buku';
  const readOnlineBtnText = language === 'en' ? 'Read Online' : 'Baca Online';

  return (
    <main className={`transition-colors duration-500 w-full min-h-screen ${themeStyles.bg} ${themeStyles.text} ${fontFamilyClass}`}>
      <ReadingProgressRestore />
      <ReaderControls />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm" style={{ backgroundColor: 'rgba(250,247,242,0.94)', borderBottom: '1px solid var(--kp-border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/buku"
            className="flex items-center gap-2 text-sm font-ui transition-colors duration-200 hover:opacity-100 text-kp-text-muted opacity-70"
          >
            <ArrowLeft size={18} />
            <span>{backText}</span>
          </Link>

          <div className="flex items-center gap-2">
            <ShareButtons title={localizedBook.title} />
            <BookmarkButton
              item={{
                id: localizedBook.id,
                type: "book",
                title: localizedBook.title,
                slug: localizedBook.slug,
              }}
            />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* COVER */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden" style={{ boxShadow: 'var(--kp-shadow-lg)' }}>
              <Image
                src={localizedBook.cover}
                alt={localizedBook.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* CONTENT */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 font-ui text-xs tracking-widest uppercase" style={{ opacity: 0.4 }}>
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    color: 'var(--kp-accent)',
                    backgroundColor: 'var(--kp-accent-faint)',
                  }}
                >
                  {localizedBook.category}
                </span>

                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {localizedBook.pages} {pagesText}
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {localizedBook.readTime}
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl leading-tight">
                {localizedBook.title}
              </h1>

              {localizedBook.subtitle && (
                <p className="font-body text-lg italic" style={{ opacity: 0.6 }}>
                  {localizedBook.subtitle}
                </p>
              )}

              <p className={`max-w-[68ch] ${fontSizeClass} opacity-85 leading-relaxed`}>
                {localizedBook.excerpt}
              </p>




              {localizedBook.preview && (
                <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--kp-bg-surface)', borderLeft: '2px solid var(--kp-accent)' }}>
                  <p className="font-display italic text-sm" style={{ opacity: 0.6 }}>
                    "{localizedBook.preview}"
                  </p>
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {localizedBook.downloadUrl && (
                  <a
                    href={localizedBook.downloadUrl}
                    className="flex items-center justify-center gap-2 px-6 py-3 font-ui text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-[var(--kp-accent)]"
                    style={{
                      backgroundColor: 'var(--kp-text-primary)',
                      color: 'var(--kp-bg-base)',
                    }}
                  >
                    <Download size={18} />
                    {downloadBtnText}
                  </a>
                )}

                <Link
                  href={`/buku/${localizedBook.slug}/baca`}
                  className="flex items-center justify-center gap-2 px-6 py-3 font-ui text-sm font-normal rounded-lg transition-colors duration-200 hover:opacity-100"
                  style={{
                    border: '1px solid var(--kp-border)',
                    opacity: 0.7,
                  }}
                >
                  <BookOpen size={18} />
                  {readOnlineBtnText}
                </Link>
              </div>

              {localizedBook.tags && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {localizedBook.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-ui rounded-full"
                      style={{
                        backgroundColor: 'var(--kp-bg-surface)',
                        opacity: 0.6,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
