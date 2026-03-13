'use client';

import { useState, useEffect, useCallback } from "react";

interface BookmarkedItem {
id: string;
type: "book" | "post";
title: string;
slug: string;
savedAt: string;
}

const STORAGE_KEY = "kelas-pekerja-bookmarks";

export function useBookmarks() {
const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
const [isLoaded, setIsLoaded] = useState(false);

/* =========================
LOAD BOOKMARKS
========================= */

useEffect(() => {
if (typeof window === "undefined") return;

try {
  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed)) {
      setBookmarks(parsed);
    }
  }
} catch (error) {
  console.error("Failed to load bookmarks:", error);
}

setIsLoaded(true);

}, []);

/* =========================
SAVE BOOKMARKS
========================= */

useEffect(() => {
if (!isLoaded) return;
if (typeof window === "undefined") return;

try {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(bookmarks)
  );
} catch (error) {
  console.error("Failed to save bookmarks:", error);
}

}, [bookmarks, isLoaded]);

/* =========================
ACTIONS
========================= */

const addBookmark = useCallback(
(item: Omit<BookmarkedItem, "savedAt">) => {
setBookmarks((prev) => {
if (prev.some((b) => b.id === item.id)) return prev;

    return [
      ...prev,
      {
        ...item,
        savedAt: new Date().toISOString(),
      },
    ];
  });
},
[]

);

const removeBookmark = useCallback((id: string) => {
setBookmarks((prev) => prev.filter((b) => b.id !== id));
}, []);

const isBookmarked = useCallback(
(id: string) => bookmarks.some((b) => b.id === id),
[bookmarks]
);

const toggleBookmark = useCallback(
(item: Omit<BookmarkedItem, "savedAt">) => {
if (isBookmarked(item.id)) {
removeBookmark(item.id);
} else {
addBookmark(item);
}
},
[isBookmarked, addBookmark, removeBookmark]
);

const clearAll = useCallback(() => {
setBookmarks([]);
}, []);

/* =========================
DERIVED DATA
========================= */

const bookBookmarks = bookmarks.filter((b) => b.type === "book");
const postBookmarks = bookmarks.filter((b) => b.type === "post");

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
count: bookmarks.length,
};
}
