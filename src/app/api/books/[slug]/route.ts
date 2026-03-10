import { NextResponse } from "next/server";
import booksData from "@/public/data/books.json";

export async function GET(request: Request, context: any) {
  try {
    const slug = context.params.slug;

    const book = booksData.books.find((b: any) => b.slug === slug);

    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ book });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}
