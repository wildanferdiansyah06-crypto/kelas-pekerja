'use client';

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { addBookmark as addBookmarkToSanity, removeBookmark as removeBookmarkFromSanity, getUserBookmarks, updateReadingProgress } from "@/src/lib/user";

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
const { data: session, status } = useSession();

/* =========================
LOAD BOOKMARKS
========================= */

useEffect(() => {
const loadBookmarks = async () => {
  if (status === "loading") return;

  if (session?.user && session.user.id) {
    // Load from Sanity if user is logged in and has user ID
    try {
      const sanityBookmarks = await getUserBookmarks(session.user.id);

      const transformedBookmarks = sanityBookmarks.map((b: any) => ({
        id: b._id,
        type: b._type,
        title: b.title,
        slug: b.slug?.current || b.slug,
        savedAt: new Date().toISOString(),
      }));

      setBookmarks(transformedBookmarks);
    } catch {
      // Fallback to localStorage
      loadLocalBookmarks();
    }
  } else {
    // Load from localStorage if user is not logged in
    loadLocalBookmarks();
  }

  setIsLoaded(true);
};

loadBookmarks();
}, [session, status]);

const loadLocalBookmarks = () => {
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
  console.error("Failed to load bookmarks from localStorage:", error);
}
};

/* =========================
SAVE BOOKMARKS
========================= */

useEffect(() => {
if (!isLoaded) return;
if (typeof window === "undefined") return;

// Only save to localStorage if user is not logged in
if (!session?.user) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(bookmarks)
    );
  } catch (error) {
    console.error("Failed to save bookmarks to localStorage:", error);
  }
}

}, [bookmarks, isLoaded, session]);

/* =========================
ACTIONS
========================= */

const addBookmark = useCallback(
async (item: Omit<BookmarkedItem, "savedAt">) => {
  if (session?.user && session.user.id) {
    // Add to Sanity if user is logged in and has user ID
    try {
      await addBookmarkToSanity(session.user.id, item.id, item.type);

      // Save reading progress when bookmarking a book
      if (item.type === "book") {
        const doc = document.documentElement;
        const scrollHeight = doc.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY || window.pageYOffset;
        const progress = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0;
        await updateReadingProgress(session.user.id, item.slug, progress);
      }

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
    } catch (error) {
      console.error("Failed to add bookmark to Sanity:", error);
    }
  } else {
    // Add to localStorage if user is not logged in
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
  }
},
[session]
);

const removeBookmark = useCallback(
async (id: string) => {
  if (session?.user && session.user.id) {
    // Remove from Sanity if user is logged in and has user ID
    try {
      await removeBookmarkFromSanity(session.user.id, id);

      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Failed to remove bookmark from Sanity:", error);
    }
  } else {
    // Remove from localStorage if user is not logged in
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }
},
[session]
);

const isBookmarked = useCallback(
(id: string) => bookmarks.some((b) => b.id === id),
[bookmarks]
);

const toggleBookmark = useCallback(
async (item: Omit<BookmarkedItem, "savedAt">) => {
  if (isBookmarked(item.id)) {
    await removeBookmark(item.id);
  } else {
    await addBookmark(item);
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
