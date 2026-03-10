'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/src/lib/api';

interface CategoryFilterProps {
  activeCategory?: string;
}

export default function CategoryFilter({ activeCategory = 'all' }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }

    // Reset to page 1 when changing category
    params.delete('page');

    router.push(`/buku?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all
            ${activeCategory === category.id 
              ? 'bg-[#8b7355] text-white' 
              : 'bg-[#8b7355]/10 text-[#8b7355] hover:bg-[#8b7355]/20'
            }`}
        >
          {category.label}
          <span className="ml-2 opacity-60">({category.count})</span>
        </button>
      ))}
    </div>
  );
}
