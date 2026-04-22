const JAVA_API_URL = process.env.NEXT_PUBLIC_JAVA_API_URL || 'http://localhost:8080/api';

export async function fetchBooks(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append('category', params.category);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.featured) queryParams.append('featured', 'true');
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const response = await fetch(`${JAVA_API_URL}/books?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
}

export async function fetchBookBySlug(slug: string) {
  const response = await fetch(`${JAVA_API_URL}/books/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch book');
  return response.json();
}

export async function fetchQuotes(category?: string) {
  const queryParams = category ? `?category=${category}` : '';
  const response = await fetch(`${JAVA_API_URL}/quotes${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch quotes');
  return response.json();
}

export async function submitQuote(quote: { text: string; author: string; category?: string }) {
  const response = await fetch(`${JAVA_API_URL}/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quote),
  });
  if (!response.ok) throw new Error('Failed to submit quote');
  return response.json();
}

export async function fetchStories(category?: string) {
  const queryParams = category ? `?category=${category}` : '';
  const response = await fetch(`${JAVA_API_URL}/stories${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch stories');
  return response.json();
}

export async function fetchStoryBySlug(slug: string) {
  const response = await fetch(`${JAVA_API_URL}/stories/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch story');
  return response.json();
}

export async function submitStory(story: {
  slug: string;
  title: string;
  content: string;
  author?: string;
  category?: string;
  coverImage?: string;
}) {
  const response = await fetch(`${JAVA_API_URL}/stories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(story),
  });
  if (!response.ok) throw new Error('Failed to submit story');
  return response.json();
}

export async function getBookView(slug: string) {
  const response = await fetch(`${JAVA_API_URL}/book-views/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch book view');
  return response.json();
}

export async function incrementBookView(slug: string) {
  const response = await fetch(`${JAVA_API_URL}/book-views/increment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  });
  if (!response.ok) throw new Error('Failed to increment view');
  return response.json();
}

export async function getAllBookViews() {
  const response = await fetch(`${JAVA_API_URL}/book-views`);
  if (!response.ok) throw new Error('Failed to fetch all book views');
  return response.json();
}

export async function subscribeNewsletter(email: string) {
  const response = await fetch(`${JAVA_API_URL}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Failed to subscribe newsletter');
  return response.json();
}
