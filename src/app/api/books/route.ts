import { NextRequest, NextResponse } from "next/server";
import booksData from "@/public/data/books.json";
import { Book } from "@/src/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");

    // Cast JSON data ke Book[]
    let books = booksData.books as Book[];

    // Filter category
    if (category && category !== "all") {
      books = books.filter((book) => book.category === category);
    }

    // Filter featured
    if (featured === "true") {
      books = books.filter((book) => book.featured);
    }

    // Search
    if (search) {
      const searchLower = search.toLowerCase();

      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.excerpt.toLowerCase().includes(searchLower) ||
          book.tags?.some((tag) =>
            tag.toLowerCase().includes(searchLower)
          )
      );
    }

    // Sort newest first
    books = books.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

    // Limit results
    if (limit) {
      books = books.slice(0, parseInt(limit));
    }

    return NextResponse.json(
      {
        books,
        total: books.length,
        filters: { category, featured, search },
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
