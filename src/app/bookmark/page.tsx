'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/src/components/ThemeProvider';
import BookCard from '@/src/components/BookCard';
import { Book } from '@/src/types';

export default function BookmarkPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load bookmark slugs from localStorage
    try {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setBookmarks(savedBookmarks);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }, []);

  useEffect(() => {
    // Fetch all books
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books that are bookmarked
  const bookmarkedBooks = books.filter(book => bookmarks.includes(book.slug));

  const handleRemoveBookmark = (slug: string) => {
    try {
      const updatedBookmarks = bookmarks.filter(b => b !== slug);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  return (
    <main className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-[#0f0e0c] via-[#1a1815] to-[#0d0c0a]' : 'bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08]'}`}>
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-[11px] tracking-[0.5em] uppercase mb-6 font-medium ${isDark ? 'text-[#d4a574]' : 'text-[#d4a574]'}`}>
            Tersimpan
          </p>

          <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight ${isDark ? 'text-[#f4e4d4]' : 'text-[#f4e4d4]'}`}>
            Bookmark
          </h1>

          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6 ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>
            Buku yang lo simpan untuk dibaca nanti.
          </p>

          <div className={`flex items-center justify-center gap-6 text-sm ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>
            <span className="flex items-center gap-2">
              <span className={`font-semibold ${isDark ? 'text-[#d4a574]' : 'text-[#d4a574]'}`}>{bookmarkedBooks.length}</span> buku tersimpan
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b7355] dark:border-[#a08060] mx-auto mb-4"></div>
              <p className={`text-[#8b7355] dark:text-[#a08060] text-sm`}>Memuat...</p>
            </div>
          ) : bookmarkedBooks.length === 0 ? (
            <div className="text-center py-32">
              <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105 ${isDark ? 'bg-[#e8e0d5]/5' : 'bg-[#3d2817]/10'}`}>
                <svg
                  className="w-10 h-10 opacity-30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <p className={`font-serif text-2xl opacity-60 mb-4 ${isDark ? 'text-[#f4e4d4]' : 'text-[#8b7355]'}`}>
                Belum ada bookmark
              </p>
              <p className={`text-base opacity-40 max-w-md mx-auto mb-8 ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>
                Simpan buku yang menarik dengan mengklik tombol bookmark di setiap kartu buku.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20">
              {bookmarkedBooks.map((book, index) => (
                <BookCard
                  key={book.slug}
                  book={book}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
