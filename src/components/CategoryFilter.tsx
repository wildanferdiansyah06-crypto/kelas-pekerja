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
            "flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-200",
            activeCategory === cat
              ? ""
              : ""
          )}
          style={{
            backgroundColor: activeCategory === cat ? 'var(--kp-accent)' : 'var(--kp-bg-surface)',
            borderColor: activeCategory === cat ? 'var(--kp-accent)' : 'var(--kp-border)',
            color: activeCategory === cat ? 'var(--kp-text-on-dark)' : 'var(--kp-text-secondary)',
          }}
          onMouseEnter={(e) => {
            if (activeCategory !== cat) {
              e.currentTarget.style.borderColor = 'var(--kp-accent)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeCategory !== cat) {
              e.currentTarget.style.borderColor = 'var(--kp-border)';
            }
          }}
        >
          {CATEGORY_LABELS[cat] || cat}
          <span className={cn(
            "text-xs font-sans",
            activeCategory === cat ? "opacity-70" : "opacity-40"
          )}>
            ({counts[cat] || 0})
          </span>
        </Link>
      ))}
    </div>
  );
}
