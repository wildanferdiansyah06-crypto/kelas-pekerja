'use client';

import { Bookmark, Check } from 'lucide-react';
import { useBookmarks } from '@/src/hooks/useBookmarks';

interface BookmarkButtonProps {
  item: {
    id: string;
    type: 'book' | 'post';
    title: string;
    slug: string;
  };
}

export default function BookmarkButton({ item }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, isLoaded } = useBookmarks();

  const bookmarked = isBookmarked(item.id);

  if (!isLoaded) {
    return (
      <button className="p-2 rounded-full opacity-30">
        <Bookmark size={20} />
      </button>
    );
  }

  return (
    <button
      onClick={() => toggleBookmark(item)}
      className={`p-2 rounded-full transition-all duration-300 ${
        bookmarked 
          ? 'bg-[#8b7355]/20 text-[#8b7355]' 
          : 'hover:bg-[#8b7355]/10 opacity-60 hover:opacity-100'
      }`}
      title={bookmarked ? 'Hapus dari simpanan' : 'Simpan untuk nanti'}
    >
      {bookmarked ? <Check size={20} /> : <Bookmark size={20} />}
    </button>
  );
}
