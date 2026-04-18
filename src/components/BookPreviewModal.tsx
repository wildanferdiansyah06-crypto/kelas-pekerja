"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Clock, ArrowRight, BookOpen, Flame, Eye } from "lucide-react";
import { Book } from "@/src/types";
import { useNavbar } from "@/src/contexts/NavbarContext";

interface BookPreviewModalProps {
  book: (Book & { slug: string }) | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookPreviewModal({ book, isOpen, onClose }: BookPreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { hideNavbar, showNavbar } = useNavbar();

  // Lock body scroll and control navbar visibility
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      hideNavbar();
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      return () => {
        document.body.style.overflow = originalOverflow;
        showNavbar();
      };
    }
  }, [isOpen, hideNavbar, showNavbar]);

  // ESC key handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Focus trap
  const handleTabKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements || focusableElements.length === 0) return;
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }, []);

  if (!isOpen || !book) return null;

  const author = (book as any).author || "Kelas Pekerja";
  const previewText = book.preview || book.excerpt
    ? (book.preview || book.excerpt).length > 450
      ? (book.preview || book.excerpt).substring(0, 450) + "..."
      : (book.preview || book.excerpt)
    : "Belum ada preview untuk buku ini.";

  const formatViews = (views?: number) => {
    if (!views) return "0";
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl
          /* Mobile: slide up from bottom, rounded top corners only */
          max-h-[92vh] sm:max-h-[85vh] md:max-h-[80vh]
          rounded-t-2xl sm:rounded-xl md:rounded-2xl
          bg-[#faf9f7] dark:bg-[#141210]
          shadow-2xl ring-1 ring-[#e5e2dd] dark:ring-stone-800
          flex flex-col sm:block
          transform-gpu will-change-transform overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleTabKey}
        style={{
          animation: 'modal-enter 0.35s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
          transform: 'translateZ(0)'
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 sm:p-2.5 rounded-full bg-stone-100/90 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors duration-200 touch-manipulation"
          aria-label="Tutup preview"
        >
          <X size={16} className="sm:size-5" strokeWidth={2} />
        </button>

        {/* ─── MOBILE LAYOUT ─── */}
        <div className="flex flex-col sm:hidden flex-1 overflow-hidden">

          {/* Cover — fixed height banner, no conflicting aspect-ratio */}
          <div className="relative w-full h-52 shrink-0 overflow-hidden">
            {book.cover ? (
              <>
                <Image
                  src={book.cover}
                  alt={`Cover buku ${book.title}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-800">
                <BookOpen size={32} className="text-stone-400 dark:text-stone-600 mb-2" />
                <span className="text-sm text-stone-500 dark:text-stone-500">Tidak ada cover</span>
              </div>
            )}

            {/* Badges — stacked vertically, no overlap */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {book.featured && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg w-fit">
                  <Flame size={10} className="fill-current" />
                  <span>Featured</span>
                </div>
              )}
              <span className="px-2.5 py-1 rounded-full text-xs font-medium tracking-wide bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 backdrop-blur-sm shadow-sm ring-1 ring-stone-200 dark:ring-stone-700 w-fit">
                {book.category || "Umum"}
              </span>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-4 flex flex-col gap-3">

              {/* Title & subtitle */}
              <div>
                <h2
                  id="modal-title"
                  className="font-serif text-xl leading-tight mb-1.5 text-stone-800 dark:text-[#e8e4df]"
                >
                  {book.title}
                </h2>
                {book.subtitle && (
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                    {book.subtitle}
                  </p>
                )}
              </div>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2 pb-3 border-b border-stone-200 dark:border-stone-700/50">
                <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/50 px-2.5 py-1 rounded-full text-xs">
                  <Clock size={11} />
                  {book.readTime || "5 menit baca"}
                </span>
                {book.stats?.views !== undefined && (
                  <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/50 px-2.5 py-1 rounded-full text-xs">
                    <Eye size={11} />
                    {formatViews(book.stats.views)} dibaca
                  </span>
                )}
                <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/50 px-2.5 py-1 rounded-full text-xs">
                  <BookOpen size={11} />
                  {author}
                </span>
              </div>

              {/* Preview text */}
              <p className="text-sm leading-[1.75] text-stone-600 dark:text-stone-300 font-serif">
                &ldquo;{previewText}&rdquo;
              </p>

              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {book.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA — sticky at bottom, outside scroll area */}
          <div className="shrink-0 px-4 pb-6 pt-3 border-t border-stone-200 dark:border-stone-700/50 bg-[#faf9f7] dark:bg-[#141210] flex flex-col gap-2">
            <Link
              href={`/buku/${book.slug}`}
              className="group flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-stone-800 dark:bg-[#c9a66b] text-stone-50 dark:text-stone-900 rounded-full font-medium text-sm transition-opacity duration-200 touch-manipulation"
              onClick={onClose}
            >
              Baca Selengkapnya
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-full px-4 py-3 border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200 text-sm font-medium touch-manipulation"
            >
              Tutup Preview
            </button>
          </div>
        </div>

        {/* ─── DESKTOP LAYOUT (unchanged) ─── */}
        <div className="hidden sm:grid sm:grid-cols-[320px_1fr] md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr] gap-0">

          {/* Cover */}
          <div className="relative aspect-[4/5] sm:aspect-auto sm:h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden">
            {book.cover ? (
              <>
                <Image
                  src={book.cover}
                  alt={`Cover buku ${book.title}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width:640px) 280px, (max-width:768px) 320px, (max-width:1024px) 380px, (max-width:1280px) 420px, 480px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-800">
                <BookOpen size={40} className="text-stone-400 dark:text-stone-600 mb-4" />
                <span className="text-sm text-stone-500 dark:text-stone-500">Tidak ada cover</span>
              </div>
            )}

            {book.featured && (
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                  <Flame size={10} className="fill-current" />
                  <span>Featured</span>
                </div>
              </div>
            )}
            <div className={`absolute ${book.featured ? 'top-12' : 'top-3'} left-3 z-10`}>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 backdrop-blur-sm shadow-sm ring-1 ring-stone-200 dark:ring-stone-700">
                {book.category || "Umum"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col h-full overflow-y-auto max-h-[40vh] sm:max-h-[45vh] md:max-h-[350px] lg:max-h-[400px]">
            <div className="mb-3 sm:mb-4">
              <h2
                id="modal-title"
                className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.1] mb-1.5 sm:mb-2 text-stone-800 dark:text-[#e8e4df]"
              >
                {book.title}
              </h2>
              {book.subtitle && (
                <p className="text-sm sm:text-base lg:text-lg text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                  {book.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-stone-200 dark:border-stone-700/50">
              <span className="flex items-center gap-1 sm:gap-1.5 bg-stone-100 dark:bg-stone-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                <Clock size={12} className="sm:size-4" />
                <span className="truncate">{book.readTime || "5 menit baca"}</span>
              </span>
              {book.stats?.views !== undefined && (
                <span className="flex items-center gap-1 sm:gap-1.5 bg-stone-100 dark:bg-stone-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                  <Eye size={12} className="sm:size-4" />
                  <span className="truncate">{formatViews(book.stats.views)} dibaca</span>
                </span>
              )}
              <span className="flex items-center gap-1 sm:gap-1.5 bg-stone-100 dark:bg-stone-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                <BookOpen size={12} className="sm:size-4" />
                <span className="truncate">{author}</span>
              </span>
            </div>

            <div className="flex-grow mb-3 sm:mb-4">
              <p className="text-sm sm:text-base md:text-[17px] leading-[1.7] sm:leading-[1.85] text-stone-600 dark:text-stone-300 font-serif">
                &ldquo;{previewText}&rdquo;
              </p>
            </div>

            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {book.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 sm:px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 pt-2 sm:pt-4 mt-auto">
              <Link
                href={`/buku/${book.slug}`}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 bg-stone-800 dark:bg-[#c9a66b] text-stone-50 dark:text-stone-900 rounded-full font-medium transition-opacity duration-200 transform-gpu will-change-transform text-sm sm:text-base touch-manipulation"
                onClick={onClose}
              >
                Baca Selengkapnya
                <ArrowRight size={14} className="sm:size-[16px] transition-opacity duration-200" />
              </Link>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-opacity duration-200 transform-gpu will-change-transform text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-stone-400/50 touch-manipulation"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: translateY(40px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @media (min-width: 640px) {
          @keyframes modal-enter {
            from {
              opacity: 0;
              transform: scale(0.96) translateY(20px) translateZ(0);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0) translateZ(0);
            }
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
          will-change: opacity;
        }

        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .will-change-transform {
          will-change: transform;
        }

        .backdrop-blur-md {
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}
