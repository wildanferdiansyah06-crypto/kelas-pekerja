'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowUpRight, Clock, ArrowRight } from "lucide-react";
import { Book } from "@/src/types";

interface BookCardProps {
  book: Book;
  index?: number;
  href?: string;
  onClick?: () => void;
}

export default function BookCard({ book, index = 0, href, onClick }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const linkHref = href ?? `/buku/${book.slug ?? ""}`;

  if (!book?.slug && !href) {
    console.warn("BookCard missing slug:", book);
  }

  const cardContent = (
    <article
      className="relative cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative aspect-[16/10] w-full mb-8 overflow-hidden rounded-lg
                   shadow-[0_8px_30px_-12px_rgba(0,0,0,0.2)]
                   group-hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.4)]
                   group-hover:-translate-y-3
                   transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
      >
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover opacity-95
                     group-hover:opacity-100 group-hover:scale-[1.08]
                     transition-all duration-1000 ease-out"
          sizes="(max-width:768px) 100vw,
                 (max-width:1200px) 50vw,
                 33vw"
          priority={index < 2}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        <div
          className={`absolute top-5 right-5 w-12 h-12 rounded-full
                     bg-white/15 backdrop-blur-md border border-white/20
                     flex items-center justify-center
                     transition-all duration-500
                     ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        >
          <Eye size={20} className="text-white/90" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-4 text-white/80 text-xs mb-3">
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {book.readTime || '5 menit'}
            </span>

            <span className="w-1 h-1 rounded-full bg-white/50" />

            <span>{book.chapters?.length || book.pages || 'N/A'} bab</span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white/90 text-sm font-medium tracking-wide flex items-center gap-2">
              Baca selengkapnya
              <ArrowUpRight
                size={16}
                className={`transition-all duration-500 ${
                  isHovered ? "translate-x-1 -translate-y-1" : ""
                }`}
              />
            </p>
          </div>
        </div>

        <div className="absolute top-5 left-5 font-serif text-6xl text-white/10 font-light">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif text-2xl md:text-3xl leading-[1.15] opacity-85 group-hover:opacity-100 transition-all duration-300" style={{ color: 'var(--kp-text-primary)' }}>
          {book.title}
        </h3>

        <p className="text-base leading-[1.7] opacity-60 line-clamp-3" style={{ color: 'var(--kp-text-secondary)' }}>
          {book.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--kp-border)' }}>
          {book.stats ? (
            <div className="flex items-center gap-4 text-xs opacity-40" style={{ color: 'var(--kp-text-muted)' }}>
              <span className="flex items-center gap-1.5">
                <Eye size={12} />
                {book.stats.views.toLocaleString("id-ID")} dibaca
              </span>
            </div>
          ) : (
            <div className="text-xs opacity-40" style={{ color: 'var(--kp-text-muted)' }}>Kelas Pekerja</div>
          )}

          <div className="flex items-center gap-1 text-xs font-medium opacity-60" style={{ color: 'var(--kp-text-muted)' }}>
            Lihat detail
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </article>
  );

  if (onClick) {
    return (
      <div 
        onClick={onClick} 
        className="group block w-full"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={linkHref}
      prefetch
      className="group block w-full"
    >
      {cardContent}
    </Link>
  );
}
