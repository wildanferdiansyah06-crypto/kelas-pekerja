import { client } from "@/src/sanity/lib/client";

// Get or create user by email
export async function getOrCreateUser(email: string, name?: string, image?: string) {
  const query = `*[_type == "user" && email == $email][0]`;
  const existingUser = await client.fetch(query, { email });

  if (existingUser) {
    // Update user data if name or image changed
    if (name && existingUser.name !== name) {
      await client.patch(existingUser._id).set({ name }).commit();
    }
    if (image && existingUser.image !== image) {
      await client.patch(existingUser._id).set({ image }).commit();
    }

    return existingUser;
  }

  // Create new user
  const newUser = await client.create({
    _type: "user",
    email,
    name: name || "",
    image: image || "",
    bookmarks: [],
    readingProgress: [],
    createdAt: new Date().toISOString(),
  });

  return newUser;
}

// Add bookmark to user
export async function addBookmark(userId: string, itemId: string, itemType: "book" | "post") {
  // Fetch the actual book/post data to store first
  const contentQuery = itemType === "book"
    ? `*[_type == "book" && _id == $itemId][0]{_id, title, subtitle, cover, slug}`
    : `*[_type == "post" && _id == $itemId][0]{_id, title, slug}`;

  const content = await client.fetch(contentQuery, { itemId });

  if (!content) {
    throw new Error(`${itemType} not found`);
  }

  // Fetch current user state
  const query = `*[_type == "user" && _id == $userId][0]`;
  const user = await client.fetch(query, { userId });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if bookmark already exists
  const existingBookmark = user.bookmarks?.find(
    (b: any) => b._id === itemId
  );

  if (existingBookmark) {
    return user; // Already bookmarked
  }

  // Add the bookmark
  const bookmarkData = {
    ...content,
    _type: itemType,
  };

  const updatedUser = await client.patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [bookmarkData])
    .commit();

  return updatedUser;
}

// Remove bookmark from user
export async function removeBookmark(userId: string, itemId: string) {
  const query = `*[_type == "user" && _id == $userId][0]`;
  const user = await client.fetch(query, { userId });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedBookmarks = user.bookmarks?.filter(
    (b: any) => b._id !== itemId
  );

  const updatedUser = await client.patch(userId).set({ bookmarks: updatedBookmarks }).commit();

  return updatedUser;
}

// Update reading progress
export async function updateReadingProgress(userId: string, bookSlug: string, progress: number) {
  const query = `*[_type == "user" && _id == $userId][0]`;
  const user = await client.fetch(query, { userId });

  if (!user) {
    throw new Error("User not found");
  }

  const existingProgress = user.readingProgress?.find(
    (p: any) => p.bookSlug === bookSlug
  );

  // Fetch book data to store by slug
  const bookQuery = `*[_type == "book" && slug.current == $bookSlug][0]{_id, title, slug}`;
  const book = await client.fetch(bookQuery, { bookSlug });

  if (!book) {
    throw new Error("Book not found");
  }

  if (existingProgress) {
    // Update existing progress
    const updatedProgress = user.readingProgress?.map((p: any) =>
      p.bookSlug === bookSlug
        ? { ...p, progress, lastReadAt: new Date().toISOString(), book }
        : p
    );

    const updatedUser = await client.patch(userId).set({ readingProgress: updatedProgress }).commit();
    return updatedUser;
  } else {
    // Add new progress
    const updatedUser = await client.patch(userId).setIfMissing({ readingProgress: [] }).append("readingProgress", [
      {
        bookSlug,
        book,
        progress,
        lastReadAt: new Date().toISOString(),
      },
    ]).commit();

    return updatedUser;
  }
}

// Get user bookmarks
export async function getUserBookmarks(userId: string) {
  const query = `*[_type == "user" && _id == $userId][0]{bookmarks}`;
  const user = await client.fetch(query, { userId });

  return user?.bookmarks || [];
}

// Get user reading progress
export async function getUserReadingProgress(userId: string) {
  const query = `*[_type == "user" && _id == $userId][0]{readingProgress}`;
  const user = await client.fetch(query, { userId });

  return user?.readingProgress || [];
}

// Add like to user
export async function addLike(userId: string, postId: string, postType: "post") {
  // Fetch the actual post data to store first
  const contentQuery = `*[_type == "post" && _id == $postId][0]{_id, title, slug}`;

  const content = await client.fetch(contentQuery, { postId });

  if (!content) {
    throw Error(`post not found`);
  }

  // Fetch current user state
  const query = `*[_type == "user" && _id == $userId][0]`;
  const user = await client.fetch(query, { userId });

  if (!user) {
    throw Error("User not found");
  }

  // Check if like already exists
  const existingLike = user.likedPosts?.find(
    (b: any) => b._id === postId
  );

  if (existingLike) {
    return user; // Already liked
  }

  // Add the like
  const likeData = {
    ...content,
    _type: postType,
  };

  const updatedUser = await client.patch(userId)
    .setIfMissing({ likedPosts: [] })
    .append("likedPosts", [likeData])
    .commit();

  return updatedUser;
}

// Remove like from user
export async function removeLike(userId: string, postId: string) {
  const query = `*[_type == "user" && _id == $userId][0]`;
  const user = await client.fetch(query, { userId });

  if (!user) {
    throw Error("User not found");
  }

  const updatedLikedPosts = user.likedPosts?.filter(
    (b: any) => b._id !== postId
  );

  const updatedUser = await client.patch(userId).set({ likedPosts: updatedLikedPosts }).commit();

  return updatedUser;
}

// Get user liked posts
export async function getUserLikedPosts(userId: string) {
  const query = `*[_type == "user" && _id == $userId][0]{likedPosts}`;
  const user = await client.fetch(query, { userId });

  return user?.likedPosts || [];
}
