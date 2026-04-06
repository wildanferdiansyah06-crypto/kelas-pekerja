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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8"
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
        className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-[#faf8f5] dark:bg-[#141210] rounded-3xl shadow-2xl ring-1 ring-stone-200 dark:ring-stone-800"
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
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100/90 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          aria-label="Tutup preview"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="grid md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-0">
          {/* Cover Image Section */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full min-h-[300px] md:min-h-[550px] overflow-hidden">
            {book.cover ? (
              <>
                <Image
                  src={book.cover}
                  alt={`Cover buku ${book.title}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width:768px) 100vw, 420px"
                  priority
                />
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-800">
                <BookOpen size={48} className="text-stone-400 dark:text-stone-600 mb-4" />
                <span className="text-sm text-stone-500 dark:text-stone-500">Tidak ada cover</span>
              </div>
            )}
            
            {/* Featured Badge */}
            {book.featured && (
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                  <Flame size={12} className="fill-current" />
                  <span>Featured</span>
                </div>
              </div>
            )}

            {/* Category Badge */}
            <div className={`absolute ${book.featured ? 'top-14' : 'top-4'} left-4 z-10`}>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 backdrop-blur-sm shadow-sm ring-1 ring-stone-200 dark:ring-stone-700">
                {book.category || "Umum"}
              </span>
            </div>

            {/* Bottom gradient for mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#faf8f5] dark:from-[#141210] to-transparent md:hidden" />
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col h-full overflow-y-auto max-h-[50vh] md:max-h-[550px]">
            {/* Header */}
            <div className="mb-6">
              <h2 
                id="modal-title"
                className="font-serif text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.1] mb-3 text-stone-800 dark:text-[#e8e4df]"
              >
                {book.title}
              </h2>

              {book.subtitle && (
                <p className="text-lg text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                  {book.subtitle}
                </p>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400 mb-8 pb-6 border-b border-stone-200 dark:border-stone-700/50">
              <span className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/50 px-3 py-1.5 rounded-full">
                <Clock size={14} />
                {book.readTime || "5 menit baca"}
              </span>
              
              {book.stats?.views !== undefined && (
                <span className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/50 px-3 py-1.5 rounded-full">
                  <Eye size={14} />
                  {formatViews(book.stats.views)} dibaca
                </span>
              )}
              
              <span className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/50 px-3 py-1.5 rounded-full">
                <BookOpen size={14} />
                {author}
              </span>
            </div>

            {/* Preview Text */}
            <div className="flex-grow mb-8">
              <p className="text-[16px] md:text-[17px] leading-[1.85] text-stone-600 dark:text-stone-300 font-serif">
                &ldquo;{previewText}&rdquo;
              </p>
            </div>

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {book.tags.slice(0, 4).map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-auto">
              <Link
                href={`/buku/${book.slug}`}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-stone-800 dark:bg-[#c9a66b] text-stone-50 dark:text-stone-900 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                onClick={onClose}
              >
                Baca Selengkapnya
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-stone-400/50"
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