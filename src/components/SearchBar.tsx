'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

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

  const clearSearch = () => {
    setSearch('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.push(`/buku?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1">
      <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--kp-text-muted)' }}>🔍</span>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari buku..."
        className="w-full pl-10 pr-10 py-3 rounded-xl font-sans text-sm
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

      {search && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2
                   opacity-40 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--kp-text-muted)' }}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
