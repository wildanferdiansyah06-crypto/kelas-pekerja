"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowUpRight, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Book } from "@/src/types";

interface BookCardProps {
  book: Book;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/buku/${book.slug}`}
      className="group block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article 
        className="relative"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Cover Container - Lebih besar dengan aspect ratio landscape yang lebih lebar */}
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

          {/* Gradient overlay yang lebih dramatis */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          
          {/* Side accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top right view button - lebih besar */}
          <div
            className={`absolute top-5 right-5 w-12 h-12 rounded-full
                       bg-white/15 backdrop-blur-md border border-white/20
                       flex items-center justify-center
                       transition-all duration-500 ease-out
                       ${isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-2"}`}
          >
            <Eye size={20} className="text-white/90" />
          </div>

          {/* Bottom content overlay - lebih prominent */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {/* Category badge floating */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-white/20 backdrop-blur-sm border border-white/10
                         text-white text-[10px] tracking-wider uppercase font-medium
                         mb-4 transition-all duration-500
                         ${isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              <BookOpen size={12} />
              {book.category}
            </div>

            {/* Quick info bar */}
            <div className="flex items-center gap-4 text-white/80 text-xs mb-3">
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {book.readTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/50" />
              <span>{book.pages} halaman</span>
            </div>

            {/* CTA text dengan arrow animasi */}
            <div className="flex items-center justify-between">
              <p className="text-white/90 text-sm font-medium tracking-wide flex items-center gap-2">
                Baca selengkapnya
                <ArrowUpRight
                  size={16}
                  className={`transition-all duration-500 ${
                    isHovered ? "translate-x-1 -translate-y-1 scale-110" : ""
                  }`}
                />
              </p>

              {/* Progress indicator */}
              <div 
                className={`h-0.5 bg-white/30 rounded-full overflow-hidden w-24 transition-all duration-500
                           ${isHovered ? "opacity-100" : "opacity-0"}`}
              >
                <div className="h-full bg-white/80 w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </div>
          </div>

          {/* Corner number decoration */}
          <div className="absolute top-5 left-5 font-serif text-6xl md:text-7xl text-white/10 font-light select-none pointer-events-none">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content below image - lebih spacious */}
        <div className="space-y-4 group-hover:translate-y-1 transition-transform duration-500">
          {/* Meta row */}
          <div className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase opacity-50">
            <span className="px-2.5 py-1 rounded-md bg-[#8b7355]/10 text-[#8b7355] dark:bg-[#a89070]/20 dark:text-[#c4b59d] font-medium">
              {book.category}
            </span>

            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />

            <span className="flex items-center gap-1.5 opacity-70">
              <BookOpen size={11} />
              {book.pages} halaman
            </span>

            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />

            <span className="flex items-center gap-1.5 opacity-70">
              <Clock size={11} />
              {book.readTime}
            </span>
          </div>

          {/* Title - lebih besar dan bold */}
          <h3 className="font-serif text-2xl md:text-3xl lg:text-[2rem] leading-[1.15] opacity-85 group-hover:opacity-100 transition-all duration-300">
            {book.title}
          </h3>

          {/* Excerpt - lebih panjang */}
          <p className="text-base leading-[1.7] opacity-60 line-clamp-3 group-hover:opacity-70 transition-opacity duration-300">
            {book.excerpt}
          </p>

          {/* Stats & Action row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2b2b2b]/5 dark:border-[#e8e0d5]/5">
            {book.stats ? (
              <div className="flex items-center gap-4 text-xs opacity-40">
                <span className="flex items-center gap-1.5">
                  <Eye size={12} />
                  {book.stats.views.toLocaleString("id-ID")} dibaca
                </span>
                <span>{book.stats.downloads} diunduh</span>
              </div>
            ) : (
              <div className="text-xs opacity-40">Kelas Pekerja</div>
            )}

            {/* Arrow indicator */}
            <div 
              className={`flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-60 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0`}
            >
              Lihat detail
              <ArrowRight size={14} className={isHovered ? "translate-x-1" : ""} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
