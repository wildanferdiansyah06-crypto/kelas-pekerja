import { client } from "@/src/sanity/lib/client";

// Get or create user by email
export async function getOrCreateUser(email: string, name?: string, image?: string) {
  console.log('getOrCreateUser called with email:', email);
  const query = `*[_type == "user" && email == $email][0]`;
  const existingUser = await client.fetch(query, { email });

  if (existingUser) {
    console.log('Found existing user:', existingUser._id);
    console.log('Existing user bookmarks count:', existingUser.bookmarks?.length || 0);
    return existingUser;
  }

  // Create new user
  console.log('Creating new user with email:', email);
  const newUser = await client.create({
    _type: "user",
    email,
    name: name || "",
    image: image || "",
    bookmarks: [],
    readingProgress: [],
    createdAt: new Date().toISOString(),
  });

  console.log('Created new user:', newUser._id);
  return newUser;
}

// Add bookmark to user
export async function addBookmark(userId: string, itemId: string, itemType: "book" | "post") {
  console.log('addBookmark called:', { userId, itemId, itemType });
  const query = `*[_type == "user" && _id == $userId][0]`;
  const user = await client.fetch(query, { userId });

  if (!user) {
    throw new Error("User not found");
  }

  console.log('Current bookmarks count:', user.bookmarks?.length || 0);
  console.log('Current bookmarks:', user.bookmarks);

  const existingBookmark = user.bookmarks?.find(
    (b: any) => b._id === itemId
  );

  if (existingBookmark) {
    console.log('Bookmark already exists, skipping');
    return user; // Already bookmarked
  }

  // Fetch the actual book/post data to store
  const contentQuery = itemType === "book"
    ? `*[_type == "book" && _id == $itemId][0]{_id, title, subtitle, cover, slug}`
    : `*[_type == "post" && _id == $itemId][0]{_id, title, slug}`;

  const content = await client.fetch(contentQuery, { itemId });

  if (!content) {
    throw new Error(`${itemType} not found`);
  }

  console.log('Content fetched:', content);

  const updatedUser = await client.patch(userId).setIfMissing({ bookmarks: [] }).append("bookmarks", [
    {
      ...content,
      _type: itemType,
    },
  ]).commit();

  console.log('Bookmark added successfully. New bookmarks count:', updatedUser.bookmarks?.length);

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
  console.log('getUserBookmarks called with userId:', userId);
  const query = `*[_type == "user" && _id == $userId][0]{bookmarks}`;
  const user = await client.fetch(query, { userId });

  console.log('Retrieved user bookmarks count:', user?.bookmarks?.length || 0);
  console.log('Retrieved bookmarks:', user?.bookmarks);

  return user?.bookmarks || [];
}

// Get user reading progress
export async function getUserReadingProgress(userId: string) {
  const query = `*[_type == "user" && _id == $userId][0]{readingProgress}`;
  const user = await client.fetch(query, { userId });

  return user?.readingProgress || [];
}
