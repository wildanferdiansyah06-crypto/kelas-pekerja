"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Clock, ArrowRight } from "lucide-react";
import { Book } from "@/src/types";

interface BookPreviewModalProps {
  book: (Book & { slug: string }) | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookPreviewModal({ book, isOpen, onClose }: BookPreviewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !book) return null;

  const author = (book as any).author || "Kelas Pekerja";
  const previewText = book.excerpt 
    ? book.excerpt.length > 400 
      ? book.excerpt.substring(0, 400) + "..." 
      : book.excerpt
    : "Belum ada preview untuk buku ini.";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" 
        style={{ animation: 'fade-in 0.2s ease-out' }}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#faf8f5] dark:bg-[#1a1816] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-up 0.3s ease-out' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-[320px_1fr] gap-0">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[280px] md:min-h-[500px]">
            {book.cover ? (
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 320px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#2b2b2b]/5">
                <svg className="w-20 h-20 opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/90 dark:bg-black/80 text-[#2b2b2b] dark:text-[#e8e0d5] backdrop-blur-sm">
                {book.category || "Umum"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 flex flex-col">
            {/* Title */}
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-3 text-[#2b2b2b] dark:text-[#e8e0d5]">
              {book.title}
            </h2>

            {/* Subtitle */}
            {book.subtitle && (
              <p className="text-lg opacity-60 mb-4">{book.subtitle}</p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm opacity-50 mb-8 pb-6 border-b border-[#2b2b2b]/10 dark:border-[#e8e0d5]/10">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {book.readTime || "5 min read"}
              </span>
              <span>•</span>
              <span>{book.pages || "?"} halaman</span>
              <span>•</span>
              <span>{author}</span>
            </div>

            {/* Preview Text */}
            <div className="flex-grow mb-8">
              <p className="text-[17px] leading-[1.8] opacity-70 font-serif">
                &ldquo;{previewText}&rdquo;
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href={`/buku/${book.slug}`}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#2b2b2b] text-[#e8e0d5] dark:bg-[#e8e0d5] dark:text-[#2b2b2b] rounded-full font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                onClick={onClose}
              >
                Baca Selengkapnya
                <ArrowRight size={18} />
              </Link>
              
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-[#2b2b2b]/20 dark:border-[#e8e0d5]/20 rounded-full hover:border-[#2b2b2b]/40 dark:hover:border-[#e8e0d5]/40 transition-colors text-sm font-medium"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
