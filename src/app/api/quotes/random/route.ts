import { NextResponse } from "next/server";
import quotesData from "@/public/data/quotes.json";

export async function GET() {
  try {
    const quotes = quotesData.quotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    return NextResponse.json(
      {
        quote,
        total: quotes.length
      },
      {
        headers: {
          "Cache-Control": "no-store, must-revalidate"
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}
