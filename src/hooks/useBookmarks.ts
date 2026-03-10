'use client';

import { useState, useEffect, useCallback } from 'react';
import { Book } from '@/src/types';

interface BookmarkedItem {
  id: string;
  type: 'book' | 'post';
  title: string;
  slug: string;
  savedAt: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kelas-pekerja-bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kelas-pekerja-bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoaded]);

  const addBookmark = useCallback((item: Omit<BookmarkedItem, 'savedAt'>) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === item.id)) return prev;
      return [...prev, { ...item, savedAt: new Date().toISOString() }];
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some(b => b.id === id);
  }, [bookmarks]);

  const toggleBookmark = useCallback((item: Omit<BookmarkedItem, 'savedAt'>) => {
    if (isBookmarked(item.id)) {
      removeBookmark(item.id);
    } else {
      addBookmark(item);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  const clearAll = useCallback(() => {
    setBookmarks([]);
  }, []);

  // Get only book bookmarks
  const bookBookmarks = bookmarks.filter(b => b.type === 'book');

  // Get only post bookmarks
  const postBookmarks = bookmarks.filter(b => b.type === 'post');

  return {
    bookmarks,
    bookBookmarks,
    postBookmarks,
    isLoaded,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    clearAll,
    count: bookmarks.length
  };
}
