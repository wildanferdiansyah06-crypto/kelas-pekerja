'use client';

import { useState, useEffect } from 'react';
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
  const [showBookmarkToast, setShowBookmarkToast] = useState(false);

  const animationDelay = `${index * 100}ms`;

  // Load bookmark state from localStorage on mount
  useEffect(() => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(book.slug));
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      setIsBookmarked(false);
    }
  }, [book.slug]);

  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const newBookmarked = !isBookmarked;

      if (newBookmarked) {
        if (!bookmarks.includes(book.slug)) {
          bookmarks.push(book.slug);
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          setShowBookmarkToast(true);
          setTimeout(() => setShowBookmarkToast(false), 2000);
        }
      } else {
        const index = bookmarks.indexOf(book.slug);
        if (index > -1) {
          bookmarks.splice(index, 1);
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
      }

      setIsBookmarked(newBookmarked);
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };
  
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
      className="relative h-full group cursor-pointer card-hover rounded-2xl overflow-hidden"
      style={{
        opacity: 0,
        animationDelay,
        animation: 'fade-in-up 0.6s ease-out forwards',
        backgroundColor: 'var(--kp-bg-surface)',
        border: '1px solid var(--kp-border)',
        boxShadow: 'var(--kp-shadow-md)',
      }}
    >
      {/* Card Image Area */}
      <div
        className="relative aspect-[2/3] overflow-hidden"
      >
        {book.cover && (
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-sm text-white border border-white/20">
          {book.category || 'Umum'}
        </div>
        {/* Bookmark button */}
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-[var(--kp-accent)] transition-all duration-200"
          onClick={handleBookmarkToggle}
          aria-label={isBookmarked ? "Hapus bookmark" : "Bookmark"}
        >
          <Bookmark size={14} className={isBookmarked ? "fill-current" : ""} />
        </button>
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Card Body */}
      <div style={{ padding: '0.75rem' }}>
        {/* Title */}
        <h3
          className="font-serif font-semibold text-sm leading-[1.3] mb-1 line-clamp-2 group-hover:text-[var(--kp-accent)] transition-colors"
          style={{ color: 'var(--kp-text-primary)' }}
        >
          {book.title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-[10px] font-sans mt-1" style={{ color: 'var(--kp-text-muted)' }}>
          <span>{book.chapters?.length || book.pages || 'N/A'} bab</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {book.readTime || '5 menit'}
          </span>
        </div>
      </div>

      {/* Bookmark Toast Notification */}
      {showBookmarkToast && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full text-sm font-medium animate-bounce"
          style={{
            backgroundColor: 'var(--kp-bg-invert)',
            color: 'var(--kp-text-on-dark)',
            boxShadow: 'var(--kp-shadow-md)',
          }}
        >
          ✓ Ditambahkan ke bookmark
        </div>
      )}

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
