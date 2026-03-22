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

    const title = String(body.title || "");
    const author = String(body.author || "Anonymous");
    const email = String(body.email || "Tidak disertakan");
    const category = String(body.category || "lainnya");
    const content = String(body.content || "");

    if (!title.trim() || !content.trim()) {
      return NextResponse.json(
        { error: "Judul dan cerita wajib diisi" },
        { status: 400 }
      );
    }

    const message = `
📝 ${title}

${content.slice(0, 1000)}

✍️ ${author}
🏷️ ${category}
📧 ${email}
`;

    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    });

    const responseText = await discordResponse.text();

    if (!discordResponse.ok) {
      return NextResponse.json(
        { error: "Discord error: " + responseText },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Ceritamu berhasil dikirim!",
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
