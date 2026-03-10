✅ BookCard component created

// src/components/BookCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, ArrowUpRight, Clock, BookOpen } from 'lucide-react';
import { Book } from '@/src/types';

interface BookCardProps {
  book: Book;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/buku/${book.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative aspect-[4/3] mb-6 overflow-hidden rounded-sm 
                    shadow-[0_4px_20px_-10px_rgba(0,0,0,0.15)] 
                    group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] 
                    group-hover:-translate-y-2
                    transition-all duration-500 ease-out"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover opacity-90 
                     group-hover:opacity-100 group-hover:scale-[1.05] 
                     transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        {/* View indicator */}
        <div className={`absolute top-4 right-4 w-10 h-10 rounded-full 
                        bg-white/10 backdrop-blur-sm 
                        flex items-center justify-center
                        transition-all duration-300
                        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Eye size={18} className="text-white/80" />
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <span className="w-6 h-px bg-white/40"></span>
          <p className="text-white/70 text-xs tracking-wider flex items-center gap-1">
            Baca selengkapnya
            <ArrowUpRight size={12} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
          </p>
        </div>
      </div>

      <div className="space-y-3 group-hover:translate-y-1 transition-transform duration-300">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase opacity-40">
          <span className="px-2 py-1 rounded-full bg-[#8b7355]/10 text-[#8b7355]">
            {book.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-current"></span>
          <span className="flex items-center gap-1">
            <BookOpen size={10} />
            {book.pages} halaman
          </span>
          <span className="w-1 h-1 rounded-full bg-current"></span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {book.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl opacity-80 group-hover:opacity-100 transition-opacity leading-tight">
          {book.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed opacity-60 line-clamp-2">
          {book.excerpt}
        </p>

        {/* Stats */}
        {book.stats && (
          <div className="flex items-center gap-4 text-xs opacity-40 pt-2">
            <span>{book.stats.views.toLocaleString('id-ID')} dibaca</span>
            <span>{book.stats.downloads} diunduh</span>
          </div>
        )}
      </div>
    </Link>
  );
}
