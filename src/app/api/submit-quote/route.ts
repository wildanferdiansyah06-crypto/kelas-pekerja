import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
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

    // Save to Supabase (not approved by default)
    const { data: quoteData, error: dbError } = await supabase
      .from('quotes')
      .insert({
        text,
        author,
        category,
        is_approved: false, // Requires admin approval
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Gagal menyimpan quote ke database" },
        { status: 500 }
      );
    }

    // Send to Discord notification
    if (DISCORD_WEBHOOK_URL) {
      const message = `
💭 **Quote Baru (Perlu Approval)**

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
🆔 ID: ${quoteData.id}
`;

      try {
        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: message,
            allowed_mentions: { parse: [] },
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
        message: "Quote berhasil dikirim! Menunggu approval admin untuk ditampilkan di website.",
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
