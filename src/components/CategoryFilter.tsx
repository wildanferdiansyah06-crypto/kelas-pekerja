// src/components/CategoryFilter.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/src/lib/utils";

interface CategoryFilterProps {
  activeCategory?: string;
  books: { category?: string }[];
}

const CATEGORY_LABELS: Record<string, string> = {
  'all': 'Semua',
  'barista': 'Barista',
  'cafe': 'Cafe',
  'retail': 'Retail',
  'kantoran': 'Kantoran',
  'kitchen': 'Kitchen',
  'umum': 'Umum',
};

export default function CategoryFilter({ activeCategory = 'all', books }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  
  // Hitung count per kategori
  const counts = books.reduce((acc, book) => {
    const cat = book.category?.toLowerCase() || 'umum';
    acc[cat] = (acc[cat] || 0) + 1;
    acc['all'] = (acc['all'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // FIX: Extract unique categories dengan cara yang type-safe
  const allCategories = books.map(b => b.category?.toLowerCase() || 'umum');
  const uniqueCategoriesSet = new Set(allCategories);
  const uniqueCategories = ['all', ...Array.from(uniqueCategoriesSet)];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-full">
      {uniqueCategories.map((cat) => (
        <Link
          key={cat}
          href={`/buku?category=${cat}`}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm whitespace-nowrap transition-all duration-300",
            activeCategory === cat
              ? "border-[#8b7355] bg-[#8b7355] text-[#f4e4d4] dark:border-[#e8e0d5] dark:bg-[#e8e0d5] dark:text-[#2b2b2b]"
              : "border-[#d4d0c8] text-[#4a4a4a] hover:border-[#8b7355] hover:text-[#2d2d2d] hover:bg-[#e5e2dd]/30 dark:border-[#e8e0d5]/20 dark:text-[#cbb8a5] dark:hover:border-[#e8e0d5]/40 dark:hover:text-[#f4e4d4]"
          )}
        >
          {CATEGORY_LABELS[cat] || cat}
          <span className={cn(
            "text-xs",
            activeCategory === cat ? "opacity-70" : "opacity-40"
          )}>
            ({counts[cat] || 0})
          </span>
        </Link>
      ))}
    </div>
  );
}
