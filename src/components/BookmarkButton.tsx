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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(item);
      }}
      className={`p-2 rounded-full transition-all duration-300 bg-white/90 backdrop-blur-md border border-white/30 shadow-lg ${
        bookmarked 
          ? 'text-[#8b7355]' 
          : 'text-gray-600 hover:text-[#8b7355]'
      }`}
      title={bookmarked ? 'Hapus dari simpanan' : 'Simpan untuk nanti'}
    >
      {bookmarked ? <Check size={20} /> : <Bookmark size={20} />}
    </button>
  );
}
