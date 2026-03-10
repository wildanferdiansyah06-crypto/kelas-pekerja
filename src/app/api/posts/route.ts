import { NextResponse } from "next/server";
import postsData from "@/public/data/posts.json";

export async function GET() {
  try {
    return NextResponse.json(postsData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
