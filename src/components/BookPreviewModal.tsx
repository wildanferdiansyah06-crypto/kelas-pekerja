"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Clock, ArrowRight, BookOpen, Flame, Eye } from "lucide-react";
import { Book } from "@/src/types";

interface BookPreviewModalProps {
  book: (Book & { slug: string }) | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookPreviewModal({ book, isOpen, onClose }: BookPreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Focus close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-md transition-opacity duration-300 animate-fade-in" 
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] overflow-y-auto bg-[#faf8f5] dark:bg-[#141210] rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl ring-1 ring-stone-200 dark:ring-stone-800"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleTabKey}
        style={{ 
          animation: 'modal-enter 0.35s cubic-bezier(0.25, 0.1, 0.25, 1) forwards'
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 p-2 sm:p-2.5 rounded-full bg-stone-100/90 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500/50 touch-manipulation"
          aria-label="Tutup preview"
        >
          <X size={16} className="sm:size-5" strokeWidth={2} />
        </button>

        {/* Mobile Layout */}
        <div className="flex flex-col sm:hidden">
          {/* Cover Image */}
          <div className="relative aspect-[4/5] min-h-[200px] overflow-hidden">
            {book.cover ? (
              <>
                <Image
                  src={book.cover}
                  alt={`Cover buku ${book.title}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="100vw"
                  priority
                />
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-800">
                <BookOpen size={32} className="text-stone-400 dark:text-stone-600 mb-3" />
                <span className="text-sm text-stone-500 dark:text-stone-500">Tidak ada cover</span>
              </div>
            )}
            
            {/* Featured Badge */}
            {book.featured && (
              <div className="absolute top-2 left-2 z-10">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                  <Flame size={10} className="fill-current" />
                  <span>Featured</span>
                </div>
              </div>
            )}

            {/* Category Badge */}
            <div className={`absolute ${book.featured ? 'top-8' : 'top-2'} left-2 z-10`}>
              <span className="px-2 py-1 rounded-full text-xs font-medium tracking-wide bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 backdrop-blur-sm shadow-sm ring-1 ring-stone-200 dark:ring-stone-700">
                {book.category || "Umum"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <h2 
                id="modal-title"
                className="font-serif text-xl leading-[1.1] mb-2 text-stone-800 dark:text-[#e8e4df]"
              >
                {book.title}
              </h2>

              {book.subtitle && (
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                  {book.subtitle}
                </p>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-4 pb-3 border-b border-stone-200 dark:border-stone-700/50">
              <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/50 px-2 py-1 rounded-full text-sm">
                <Clock size={12} />
                <span className="truncate">{book.readTime || "5 menit baca"}</span>
              </span>
              
              {book.stats?.views !== undefined && (
                <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/50 px-2 py-1 rounded-full text-sm">
                  <Eye size={12} />
                  <span className="truncate">{formatViews(book.stats.views)} dibaca</span>
                </span>
              )}
              
              <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/50 px-2 py-1 rounded-full text-sm">
                <BookOpen size={12} />
                <span className="truncate">{author}</span>
              </span>
            </div>

            {/* Preview Text */}
            <div className="flex-grow mb-4">
              <p className="text-sm leading-[1.7] text-stone-600 dark:text-stone-300 font-serif">
                &ldquo;{previewText}&rdquo;
              </p>
            </div>

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {book.tags.slice(0, 4).map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 pt-2 mt-auto">
              <Link
                href={`/buku/${book.slug}`}
                className="group flex items-center justify-center gap-2 w-full px-4 py-3 bg-stone-800 dark:bg-[#c9a66b] text-stone-50 dark:text-stone-900 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm touch-manipulation"
                onClick={onClose}
              >
                Baca Selengkapnya
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-stone-400/50 touch-manipulation"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:grid sm:grid-cols-[320px_1fr] md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr] gap-0">
          {/* Cover Image Section */}
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
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-800">
                <BookOpen size={40} className="text-stone-400 dark:text-stone-600 mb-4" />
                <span className="text-sm text-stone-500 dark:text-stone-500">Tidak ada cover</span>
              </div>
            )}
            
            {/* Featured Badge */}
            {book.featured && (
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                  <Flame size={10} className="fill-current" />
                  <span>Featured</span>
                </div>
              </div>
            )}

            {/* Category Badge */}
            <div className={`absolute ${book.featured ? 'top-12' : 'top-3'} left-3 z-10`}>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 backdrop-blur-sm shadow-sm ring-1 ring-stone-200 dark:ring-stone-700">
                {book.category || "Umum"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col h-full overflow-y-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[450px] lg:max-h-[500px]">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h2 
                id="modal-title"
                className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.1] mb-2 sm:mb-3 text-stone-800 dark:text-[#e8e4df]"
              >
                {book.title}
              </h2>

              {book.subtitle && (
                <p className="text-sm sm:text-base lg:text-lg text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                  {book.subtitle}
                </p>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-stone-200 dark:border-stone-700/50">
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

            {/* Preview Text */}
            <div className="flex-grow mb-4 sm:mb-6">
              <p className="text-sm sm:text-base md:text-[17px] leading-[1.7] sm:leading-[1.85] text-stone-600 dark:text-stone-300 font-serif">
                &ldquo;{previewText}&rdquo;
              </p>
            </div>

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
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

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 pt-2 sm:pt-4 mt-auto">
              <Link
                href={`/buku/${book.slug}`}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 bg-stone-800 dark:bg-[#c9a66b] text-stone-50 dark:text-stone-900 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm sm:text-base touch-manipulation"
                onClick={onClose}
              >
                Baca Selengkapnya
                <ArrowRight size={14} className="sm:size-[16px] transition-transform group-hover:translate-x-1" />
              </Link>
              
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-stone-400/50 touch-manipulation"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
