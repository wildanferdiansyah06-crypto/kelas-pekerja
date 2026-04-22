'use client';

import Link from 'next/link';
import { Bookmark, Trash2, ArrowLeft, BookOpen, FileText } from 'lucide-react';
import { useBookmarks } from '@/src/hooks/useBookmarks';

export default function BookmarksPage() {
  const { bookmarks, bookBookmarks, postBookmarks, removeBookmark, clearAll, isLoaded } = useBookmarks();

  if (!isLoaded) {
    return (
      <main className="bg-[#faf8f5] dark:bg-[#1a1816] pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#faf8f5] dark:bg-[#1a1816] text-[#2b2b2b] dark:text-[#e8e0d5] pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl mb-2">Simpanan</h1>
            <p className="text-sm opacity-60">
              {bookmarks.length > 0 
                ? `${bookmarks.length} item tersimpan` 
                : 'Belum ada yang disimpan'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {bookmarks.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 text-sm 
                         text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 
                         rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Hapus Semua</span>
              </button>
            )}
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm 
                       hover:bg-[#8b7355]/10 rounded-lg transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Kembali</span>
            </Link>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <Bookmark className="w-16 h-16 mx-auto mb-6 opacity-20" />
            <h3 className="font-serif text-xl mb-2 opacity-60">Belum Ada Simpanan</h3>
            <p className="text-sm opacity-40 mb-6 max-w-sm mx-auto">
              Simpan buku atau tulisan yang ingin kamu baca nanti. Mereka akan muncul di sini.
            </p>
            <Link
              href="/buku"
              className="inline-flex items-center gap-2 px-6 py-3 
                       bg-[#8b7355] text-white rounded-full
                       hover:bg-[#6b5635] transition-colors text-sm"
            >
              <BookOpen size={18} />
              <span>Jelajahi Buku</span>
            </Link>
          </div>
        ) : (
          /* Bookmarks List */
          <div className="space-y-6">
            {/* Books Section */}
            {bookBookmarks.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-wider opacity-40 mb-4 flex items-center gap-2">
                  <BookOpen size={14} />
                  Buku ({bookBookmarks.length})
                </h2>
                <div className="grid gap-4">
                  {bookBookmarks.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="group flex items-center justify-between p-4 
                               bg-white dark:bg-[#2a2826] rounded-lg
                               shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link
                        href={`/buku/${bookmark.slug}`}
                        className="flex-1 min-w-0"
                      >
                        <h3 className="font-medium truncate group-hover:text-[#8b7355] transition-colors">
                          {bookmark.title}
                        </h3>
                        <p className="text-xs opacity-40 mt-1">
                          Disimpan {new Date(bookmark.savedAt).toLocaleDateString('id-ID')}
                        </p>
                      </Link>

                      <button
                        onClick={() => removeBookmark(bookmark.id)}
                        className="p-2 opacity-0 group-hover:opacity-100 
                                 hover:bg-red-50 dark:hover:bg-red-900/20 
                                 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Posts Section */}
            {postBookmarks.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-wider opacity-40 mb-4 flex items-center gap-2">
                  <FileText size={14} />
                  Tulisan ({postBookmarks.length})
                </h2>
                <div className="grid gap-4">
                  {postBookmarks.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="group flex items-center justify-between p-4 
                               bg-white dark:bg-[#2a2826] rounded-lg
                               shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link
                        href={`/tulisan/${bookmark.slug}`}
                        className="flex-1 min-w-0"
                      >
                        <h3 className="font-medium truncate group-hover:text-[#8b7355] transition-colors">
                          {bookmark.title}
                        </h3>
                        <p className="text-xs opacity-40 mt-1">
                          Disimpan {new Date(bookmark.savedAt).toLocaleDateString('id-ID')}
                        </p>
                      </Link>

                      <button
                        onClick={() => removeBookmark(bookmark.id)}
                        className="p-2 opacity-0 group-hover:opacity-100 
                                 hover:bg-red-50 dark:hover:bg-red-900/20 
                                 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
