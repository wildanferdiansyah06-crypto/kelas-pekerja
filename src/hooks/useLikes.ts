'use client';

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { addLike as addLikeToSanity, removeLike as removeLikeFromSanity, getUserLikedPosts } from "@/src/lib/user";

interface LikedItem {
  id: string;
  type: "post";
  title: string;
  slug: string;
  likedAt: string;
}

const STORAGE_KEY = "kelas-pekerja-likes";

export function useLikes() {
  const [likes, setLikes] = useState<LikedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session, status } = useSession();

  /* =========================
  LOAD LIKES
  ========================= */

  useEffect(() => {
    const loadLikes = async () => {
      if (status === "loading") return;

      if (session?.user && session.user.id) {
        // Load from Sanity if user is logged in and has user ID
        try {
          const sanityLikes = await getUserLikedPosts(session.user.id);

          const transformedLikes = sanityLikes.map((b: any) => ({
            id: b._id,
            type: b._type,
            title: b.title,
            slug: b.slug?.current || b.slug,
            likedAt: new Date().toISOString(),
          }));

          setLikes(transformedLikes);
        } catch {
          // Fallback to localStorage
          loadLocalLikes();
        }
      } else {
        // Load from localStorage if user is not logged in
        loadLocalLikes();
      }

      setIsLoaded(true);
    };

    loadLikes();
  }, [session, status]);

  const loadLocalLikes = () => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setLikes(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load likes from localStorage:", error);
    }
  };

  /* =========================
  SAVE LIKES
  ========================= */

  useEffect(() => {
    if (!isLoaded) return;
    if (typeof window === "undefined") return;

    // Only save to localStorage if user is not logged in
    if (!session?.user) {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(likes)
        );
      } catch (error) {
        console.error("Failed to save likes to localStorage:", error);
      }
    }

  }, [likes, isLoaded, session]);

  /* =========================
  ACTIONS
  ========================= */

  const addLike = useCallback(
    async (item: Omit<LikedItem, "likedAt">) => {
      if (session?.user && session.user.id) {
        // Add to Sanity if user is logged in and has user ID
        try {
          await addLikeToSanity(session.user.id, item.id, item.type);

          setLikes((prev) => {
            if (prev.some((b) => b.id === item.id)) return prev;

            return [
              ...prev,
              {
                ...item,
                likedAt: new Date().toISOString(),
              },
            ];
          });
        } catch (error) {
          console.error("Failed to add like to Sanity:", error);
        }
      } else {
        // Add to localStorage if user is not logged in
        setLikes((prev) => {
          if (prev.some((b) => b.id === item.id)) return prev;

          return [
            ...prev,
            {
              ...item,
              likedAt: new Date().toISOString(),
            },
          ];
        });
      }
    },
    [session]
  );

  const removeLike = useCallback(
    async (id: string) => {
      if (session?.user && session.user.id) {
        // Remove from Sanity if user is logged in and has user ID
        try {
          await removeLikeFromSanity(session.user.id, id);

          setLikes((prev) => prev.filter((b) => b.id !== id));
        } catch (error) {
          console.error("Failed to remove like from Sanity:", error);
        }
      } else {
        // Remove from localStorage if user is not logged in
        setLikes((prev) => prev.filter((b) => b.id !== id));
      }
    },
    [session]
  );

  const isLiked = useCallback(
    (id: string) => likes.some((b) => b.id === id),
    [likes]
  );

  const toggleLike = useCallback(
    async (item: Omit<LikedItem, "likedAt">) => {
      if (isLiked(item.id)) {
        await removeLike(item.id);
      } else {
        await addLike(item);
      }
    },
    [isLiked, addLike, removeLike]
  );

  const clearAll = useCallback(() => {
    setLikes([]);
  }, []);

  /* =========================
  DERIVED DATA
  ========================= */

  const postLikes = likes.filter((b) => b.type === "post");

  return {
    likes,
    postLikes,
    isLoaded,
    addLike,
    removeLike,
    isLiked,
    toggleLike,
    clearAll,
    count: likes.length,
  };
}
