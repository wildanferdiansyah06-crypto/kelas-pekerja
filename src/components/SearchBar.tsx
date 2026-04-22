'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  initialSearch?: string;
}

export default function SearchBar({ initialSearch = '' }: SearchBarProps) {
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }

    params.delete('page');
    router.push(`/buku?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari buku..."
        className="w-full px-4 py-2.5 rounded-full font-sans text-sm
                 focus:outline-none focus:ring-2 transition-all duration-200"
        style={{
          backgroundColor: 'var(--kp-bg-surface)',
          border: '1px solid var(--kp-border)',
          color: 'var(--kp-text-primary)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--kp-accent)';
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--kp-accent)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--kp-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </form>
  );
}
