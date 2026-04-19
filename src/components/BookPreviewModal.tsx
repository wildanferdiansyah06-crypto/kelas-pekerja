"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Clock, ArrowRight, BookOpen, Flame, Eye } from "lucide-react";
import { Book } from "@/src/types";
import { useNavbar } from "@/src/contexts/NavbarContext";

interface BookPreviewModalProps {
  book: (Book & { slug: string }) | null;
  index?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookPreviewModal({ book, index = 0, isOpen, onClose }: BookPreviewModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
      {/* Mobile: centered popup, smaller size */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[min(500px,calc(100vw-32px))] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl max-h-[88vh] md:max-h-[80vh] rounded-2xl md:rounded-3xl bg-[#faf9f7] dark:bg-[#141210] shadow-2xl ring-1 ring-[#e5e2dd] dark:ring-stone-800 flex flex-col transform-gpu will-change-transform overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleTabKey}
        style={{
          animation: 'modal-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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

        {/* ─── MOBILE LAYOUT (Stacked) ─── */}
        <div className="flex flex-col md:hidden flex-1 overflow-hidden h-full">
          {/* Visual Handle for Mobile Sheet Look */}
          <div className="flex justify-center pt-2 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-stone-300 dark:bg-stone-700 opacity-50" />
          </div>

          {/* Cover — with BookCard style overlays for mobile */}
          <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-900 group">
            {book.cover ? (
              <>
                <Image
                  src={book.cover}
                  alt={`Cover buku ${book.title}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Decorative Index Number (01, 02, etc) */}
                <div className="absolute top-2 left-4 font-serif text-6xl text-white/10 font-light pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Eye Icon Top Right */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <Eye size={20} className="text-white/80" />
                </div>

                {/* Bottom Metadata Overlay */}
                <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
                  <div className="flex items-center gap-3 text-white/80 text-[11px] font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {book.readTime || "5 menit"}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/40" />
                    <span>{book.chapters?.length || book.pages || 'N/A'} bab</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-semibold tracking-wide">
                    Baca selengkapnya
                    <ArrowRight size={12} className="opacity-80" />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <BookOpen size={32} className="text-stone-400 dark:text-stone-600 mb-2" />
                <span className="text-xs text-stone-500 dark:text-stone-500">Tidak ada cover</span>
              </div>
            )}
          </div>

          {/* Scrollable content — improved padding and typography */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="px-5 py-4 flex flex-col gap-4">

              {/* Title & subtitle — larger and clearer */}
              <div>
                <h2
                  id="modal-title"
                  className="font-serif text-xl sm:text-2xl leading-tight mb-2 text-stone-900 dark:text-[#e8e4df] font-semibold"
                >
                  {book.title}
                </h2>
                {book.subtitle && (
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                    {book.subtitle}
                  </p>
                )}
              </div>

              {/* Category Badge below image in content section for mobile */}
              <div className="flex flex-wrap gap-2 mb-1">
                {book.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20">
                    FEATURED
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                  {book.category || "Umum"}
                </span>
              </div>


              {/* Preview text — better line height and font size */}
              <p className="text-[15px] leading-[1.7] text-stone-600 dark:text-stone-300 font-serif italic opacity-90">
                &ldquo;{previewText}&rdquo;
              </p>

              {/* Tags — consistent sizing */}
              {book.tags && book.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {book.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 border border-stone-200/50 dark:border-stone-700/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA — rearranged side-by-side on mobile */}
          <div className="shrink-0 px-5 pb-6 pt-3 border-t border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-[#141210]/80 backdrop-blur-xl flex gap-x-3">
            <Link
              href={`/buku/${book.slug}`}
              className="group flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-stone-900 dark:bg-[#c9a66b] text-white dark:text-stone-950 rounded-lg font-semibold text-[13px] shadow-lg shadow-black/5 active:scale-[0.98] transition-all touch-manipulation"
              onClick={onClose}
            >
              <span className="truncate">Baca Buku</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center px-3 py-2.5 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors duration-200 text-[13px] font-medium touch-manipulation"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* ─── TABLET/DESKTOP LAYOUT (Side-by-Side) ─── */}
        <div className="hidden md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[380px_1fr] xl:grid-cols-[440px_1fr] gap-0 h-full">

          {/* Cover Column — ensuring it perfectly follows the grid height */}
          <div className="relative h-full min-h-[400px] overflow-hidden bg-stone-100 dark:bg-stone-900">
            {book.cover ? (
              <>
                <Image
                  src={book.cover}
                  alt={`Cover buku ${book.title}`}
                  fill
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, (max-width: 1280px) 420px, 480px"
                  priority
                />
                {/* Refined gradient for desktop depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-30 pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <BookOpen size={40} className="text-stone-400 dark:text-stone-600 mb-4" />
                <span className="text-sm text-stone-500 dark:text-stone-500 font-medium">Tidak ada cover</span>
              </div>
            )}

            <div className="absolute top-5 left-6 z-10 flex flex-col gap-2.5">
              {book.featured && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl">
                  <Flame size={12} className="fill-current" />
                  <span>FEATURED</span>
                </div>
              )}
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 backdrop-blur-md shadow-lg ring-1 ring-stone-200/50 dark:ring-stone-700/50 w-fit">
                {book.category || "Umum"}
              </span>
            </div>
          </div>

          {/* Content — with safe padding to avoid close button overlap */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 pt-14 md:pt-16 lg:pt-20 flex flex-col h-full overflow-y-auto">
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
