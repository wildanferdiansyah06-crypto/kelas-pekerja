// src/components/BookPreviewModal.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Clock, Eye, ArrowRight } from "lucide-react";
import { Book } from "@/src/types";

interface BookPreviewModalProps {
  book: Book & { slug: string };
  isOpen: boolean;
  onClose: () => void;
}

export default function BookPreviewModal({ book, isOpen, onClose }: BookPreviewModalProps) {
  // Lock body scroll when modal open
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

  if (!isOpen) return null;

  const author = (book as any).author || "Kelas Pekerja";
  const previewText = book.excerpt 
    ? book.excerpt.length > 300 
      ? book.excerpt.substring(0, 300) + "..." 
      : book.excerpt
    : "Belum ada preview untuk buku ini.";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#faf8f5] dark:bg-[#1a1816] rounded-2xl shadow-2xl"
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

        <div className="grid md:grid-cols-[280px_1fr] gap-0">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[300px]">
            {book.cover ? (
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 280px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#2b2b2b]/5">
                <span className="text-6xl opacity-10">📖</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Category */}
            <span className="inline-flex items-center gap-2 text-[10px] tracking-wider uppercase opacity-50 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {book.category || "Umum"}
            </span>

            {/* Title */}
            <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
              {book.title}
            </h2>

            {/* Subtitle */}
            {book.subtitle && (
              <p className="text-sm opacity-60 mb-4">{book.subtitle}</p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs opacity-40 mb-6">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {book.readTime || "5 min read"}
              </span>
              <span>•</span>
              <span>{book.pages || "?"} halaman</span>
              <span>•</span>
              <span>{author}</span>
            </div>

            {/* Preview Text */}
            <div className="prose-custom mb-8 flex-grow">
              <p className="text-base leading-relaxed opacity-70">
                "{previewText}"
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-[#2b2b2b]/10 dark:border-[#e8e0d5]/10">
              <Link
                href={`/buku/${book.slug}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#2b2b2b] text-[#e8e0d5] dark:bg-[#e8e0d5] dark:text-[#2b2b2b] rounded-full font-medium hover:opacity-90 transition-opacity"
                onClick={onClose}
              >
                Baca Selengkapnya
                <ArrowRight size={16} />
              </Link>
              
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-[#2b2b2b]/20 dark:border-[#e8e0d5]/20 rounded-full hover:border-[#2b2b2b]/40 dark:hover:border-[#e8e0d5]/40 transition-colors"
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
