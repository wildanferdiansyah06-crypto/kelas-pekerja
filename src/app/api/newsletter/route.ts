import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json(
        { error: "Webhook tidak ditemukan di env" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const email = String(body.email || "").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email tidak valid" },
        { status: 400 }
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

    // Send to Discord
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

    const responseText = await discordResponse.text();

    if (!discordResponse.ok) {
      console.error("Discord error:", responseText);
      return NextResponse.json(
        { error: "Gagal mengirim ke Discord: " + responseText },
        { status: 500 }
      );
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
