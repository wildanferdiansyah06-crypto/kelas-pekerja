import { NextResponse } from "next/server";
import configData from "@/public/data/config.json";

export async function GET() {
  try {
    return NextResponse.json(configData, {
      headers: {
        "Cache-Control": "public, s-maxage=86400"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 }
    );
  }
}
