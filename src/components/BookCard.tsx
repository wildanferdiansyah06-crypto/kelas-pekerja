'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bookmark, 
  ArrowUpRight, 
  ArrowRight, 
  Eye, 
  Clock,
  BookOpen,
  Flame,
  ArrowUp
} from 'lucide-react';
import { Book } from '@/src/types';

interface BookCardProps {
  book: Book;
  index?: number;
  variant?: 'default' | 'compact' | 'featured';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function BookCard({ 
  book, 
  index = 0, 
  variant = 'default',
  href,
  onClick,
  className = ''
}: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const animationDelay = `${index * 100}ms`;
  
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const cardContent = (
    <article
      className="relative h-full group"
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
        className={`relative w-full mb-6 overflow-hidden rounded-2xl
                   shadow-[0_8px_30px_-12px_rgba(0,0,0,0.2)]
                   group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]
                   group-hover:-translate-y-2
                   transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                   ${isCompact ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
      >
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Category Badge */}
        <div className={`absolute top-4 left-4 z-10
                     bg-white/15 backdrop-blur-md border border-white/25 text-white/95
                     transition-all duration-500
                     ${isHovered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
          <span className="px-3 py-1.5 rounded-full text-xs font-medium">
            {book.category}
          </span>
        </div>

        {/* View Icon */}
        <div
          className={`absolute top-4 right-4 w-11 h-11 rounded-full z-10
                     bg-white/15 backdrop-blur-md border border-white/25
                     flex items-center justify-center
                     transition-all duration-500 ease-out
                     ${isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-2"}`}
        >
          <Eye size={18} className="text-white/90" />
        </div>

        {/* Bottom Meta Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <div className="flex items-center gap-3 text-white/80 text-xs mb-3 flex-wrap">
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
              <Clock size={11} />
              {book.readTime || "5 menit"}
            </span>
            
            {(book.stats?.views ?? 0) > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Eye size={11} />
                  {formatViews(book.stats?.views ?? 0)}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white/95 text-sm font-medium tracking-wide flex items-center gap-2">
              Baca sekarang
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[8rem] md:text-[10rem] text-white/[0.04] font-light pointer-events-none select-none">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-3 px-1">
        <h3 className={`font-serif leading-[1.15] text-stone-800 dark:text-[#e8e0d5] 
                       group-hover:text-stone-600 dark:group-hover:text-[#d4ccc0]
                       transition-all duration-300
                       ${isCompact ? 'text-xl md:text-2xl' : 'text-2xl md:text-[1.85rem]'}`}>
          {book.title}
        </h3>

        {book.subtitle && (
          <p className="text-sm text-stone-500 dark:text-stone-400 font-medium tracking-wide line-clamp-1">
            {book.subtitle}
          </p>
        )}

        <p className="text-[15px] leading-[1.7] text-stone-500 dark:text-stone-400 line-clamp-2 
                      group-hover:text-stone-600 dark:group-hover:text-stone-300 
                      transition-colors duration-300">
          &ldquo;{book.preview}&rdquo;
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-stone-200 dark:border-stone-700/50">
          <div className="flex items-center gap-3">
            <button 
              className={`p-2 rounded-full transition-all duration-300
                         ${isBookmarked 
                           ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' 
                           : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                         }`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsBookmarked(!isBookmarked);
              }}
              aria-label={isBookmarked ? "Hapus bookmark" : "Bookmark"}
            >
              <Bookmark size={14} className={isBookmarked ? "fill-current" : ""} />
            </button>
            <span className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-medium">
              {book.category}
            </span>
          </div>

          <div className={`flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400
                          transition-all duration-300
                          ${isHovered ? "opacity-100 translate-x-0" : "opacity-60 -translate-x-1"}`}>
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
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </article>
  );

  if (onClick) {
    return (
      <div 
        onClick={onClick} 
        className="block w-full cursor-pointer h-full"
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
      className="block w-full h-full"
    >
      {cardContent}
    </Link>
  );
}
