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
    const text = String(body.text || "").trim();
    const author = String(body.author || "Anonymous").trim();
    const category = String(body.category || "Lainnya").trim();

    if (!text || !author) {
      return NextResponse.json(
        { error: "Quote dan penulis wajib diisi" },
        { status: 400 }
      );
    }

    // Build Discord message
    const message = `
💭 **Quote Baru**

"${text}"

✍️ ${author}
🏷️ ${category}
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
        message: "Quote berhasil dikirim! Terima kasih sudah berbagi.",
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
