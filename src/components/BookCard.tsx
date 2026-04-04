"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowUpRight, Clock, ArrowRight, Bookmark } from "lucide-react";
import { Book } from "@/src/types";

interface BookCardProps {
  book: Book;
  index?: number;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "compact";
}

export default function BookCard({ 
  book, 
  index = 0, 
  href, 
  onClick,
  variant = "default" 
}: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryLabel = book.category 
    ? book.category.charAt(0).toUpperCase() + book.category.slice(1).toLowerCase()
    : "Umum";

  const previewText = book.excerpt 
    ? book.excerpt.length > 120 
      ? book.excerpt.substring(0, 120) + "..." 
      : book.excerpt
    : "Belum ada deskripsi untuk buku ini.";

  // Animation delay calculation
  const animationDelay = `${index * 100}ms`;
  
  const isCompact = variant === "compact";

  const cardContent = (
    <article
      className="relative h-full"
      style={{ 
        opacity: 0,
        animationDelay,
        animation: 'fade-in-up 0.6s ease-out forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`relative w-full mb-6 overflow-hidden rounded-xl
                   shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]
                   group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]
                   group-hover:-translate-y-2
                   transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                   ${isCompact ? 'aspect-[16/10]' : 'aspect-[16/10]'}`}
      >
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover opacity-95
                     group-hover:opacity-100 group-hover:scale-[1.08]
                     transition-all duration-1000 ease-out"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          priority={index < 2}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

        {/* Category Badge - Top Left */}
        <div 
          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide
                     bg-white/20 backdrop-blur-md border border-white/30 text-white/95
                     transition-all duration-500
                     ${isHovered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
        >
          {categoryLabel}
        </div>

        {/* View Icon - Top Right */}
        <div
          className={`absolute top-4 right-4 w-11 h-11 rounded-full
                     bg-white/15 backdrop-blur-md border border-white/20
                     flex items-center justify-center
                     transition-all duration-500 ease-out
                     ${isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-2"}`}
        >
          <Eye size={18} className="text-white/90" />
        </div>

        {/* Bottom Meta Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <div className="flex items-center gap-3 text-white/70 text-xs mb-3 flex-wrap">
            <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
              <Clock size={11} />
              {book.readTime || "5 menit"}
            </span>
            {book.pages && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                  {book.pages} halaman
                </span>
              </>
            )}
            {book.stats?.views && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                  <Eye size={11} />
                  {(book.stats.views / 1000).toFixed(1)}k
                </span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white/90 text-sm font-medium tracking-wide flex items-center gap-2">
              Baca preview
              <ArrowUpRight
                size={16}
                className={`transition-all duration-500 ${
                  isHovered ? "translate-x-1 -translate-y-1" : ""
                }`}
              />
            </p>
          </div>
        </div>

        {/* Index Number Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[8rem] md:text-[10rem] text-white/[0.03] font-light pointer-events-none select-none">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-3">
        <h3 className={`font-serif leading-[1.2] text-[#2b2b2b] dark:text-[#e8e0d5] opacity-90 group-hover:opacity-100 transition-all duration-300
          ${isCompact ? 'text-xl md:text-2xl' : 'text-2xl md:text-[1.75rem]'}`}>
          {book.title}
        </h3>

        {book.subtitle && (
          <p className="text-sm opacity-50 font-medium tracking-wide line-clamp-1">
            {book.subtitle}
          </p>
        )}

        <p className="text-[15px] leading-[1.7] opacity-55 line-clamp-2 group-hover:opacity-70 transition-opacity duration-300">
          &ldquo;{previewText}&rdquo;
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#2b2b2b]/5 dark:border-[#e8e0d5]/10">
          <div className="flex items-center gap-3">
            <button 
              className="p-2 rounded-full hover:bg-[#2b2b2b]/5 dark:hover:bg-[#e8e0d5]/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle bookmark logic
              }}
              aria-label="Bookmark"
            >
              <Bookmark size={14} className="opacity-40 hover:opacity-70 transition-opacity" />
            </button>
            <span className="text-[11px] uppercase tracking-wider opacity-35 font-medium">
              {book.category}
            </span>
          </div>

          <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-50 -translate-x-1"
          }`}>
            Lihat detail
            <ArrowRight size={14} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
          </div>
        </div>
      </div>

      {/* Global Styles for Animation */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </article>
  );

  // Render logic based on props
  if (onClick) {
    return (
      <div 
        onClick={onClick} 
        className="group block w-full cursor-pointer h-full"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        {cardContent}
      </div>
    );
  }

  const linkHref = href ?? `/buku/${book.slug}`;
  
  return (
    <Link 
      href={linkHref} 
      prefetch 
      className="group block w-full h-full"
    >
      {cardContent}
    </Link>
  );
}
