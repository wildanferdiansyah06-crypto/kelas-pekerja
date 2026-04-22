import { NextRequest, NextResponse } from "next/server";
import { subscribeNewsletter } from "@/src/lib/java-api";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email tidak valid" },
        { status: 400 }
      );
    }

    // Save to Java backend
    const result = await subscribeNewsletter(email);

    if (!result.success) {
      console.error("Java backend error:", result);
      return NextResponse.json(
        { error: "Gagal subscribe newsletter" },
        { status: 500 }
      );
    }

    // Build Discord message
    const message = `
📬 **Newsletter Subscription**

Ada yang baru subscribe newsletter!

📧 ${email}
📅 ${new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
`;

    // Send to Discord notification
    if (DISCORD_WEBHOOK_URL) {
      try {
        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: message,
            allowed_mentions: { parse: [] }, // Disable mentions for safety
          }),
        });

        if (!discordResponse.ok) {
          console.error("Discord error:", await discordResponse.text());
        }
      } catch (discordError) {
        console.error("Discord send error:", discordError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Terima kasih! Kamu akan mendapatkan notifikasi cerita baru.",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
