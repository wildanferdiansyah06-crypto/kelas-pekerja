import { NextRequest, NextResponse } from "next/server";
import quotesData from "@/public/data/quotes.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const mood = searchParams.get("mood");
    const limit = searchParams.get("limit") || "10";

    let quotes = quotesData.quotes;

    if (category) {
      quotes = quotes.filter((q) => q.category === category);
    }

    if (mood) {
      quotes = quotes.filter((q) => q.mood === mood);
    }

    quotes = quotes.slice(0, parseInt(limit));

    return NextResponse.json(
      {
        quotes,
        total: quotes.length
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600"
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
