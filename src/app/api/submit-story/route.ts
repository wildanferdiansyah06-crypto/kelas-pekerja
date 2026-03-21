import { NextRequest, NextResponse } from "next/server";

// ⚠️ PINDAHKAN KE .env.local SETELAH TESTING!
// DISCORD_WEBHOOK_URL=your_webhook_url_here
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1484977180336197894/GQPmH1NJ6PFpn0stTVQABogQP4fiDe3R_xCAVxG96A-qXrY0AG4cjfYogThhpX8S7MqU";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, email, category, content } = body;

    // Validasi
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Judul dan cerita wajib diisi" },
        { status: 400 }
      );
    }

    const authorName = author?.trim() || "Anonymous";
    const categoryName = category || "lainnya";
    const emailText = email?.trim() || "Tidak disertakan";

    // Kirim ke Discord
    try {
      const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Kelas Pekerja",
          avatar_url: "https://cdn-icons-png.flaticon.com/512/2829/2829768.png",
          embeds: [
            {
              title: `📝 ${title.trim()}`,
              url: "https://kelas-pekerja.vercel.app/tulisan", // Link ke website
              description: content.trim().length > 1900 
                ? content.trim().substring(0, 1900) + "...\n\n*(cerita dipotong, terlalu panjang)*"
                : content.trim(),
              color: 0x8b7355, // Warna coklat #8b7355
              fields: [
                {
                  name: "✍️ Penulis",
                  value: authorName,
                  inline: true,
                },
                {
                  name: "🏷️ Kategori",
                  value: categoryName,
                  inline: true,
                },
                {
                  name: "📧 Email",
                  value: emailText,
                  inline: true,
                },
                {
                  name: "📊 Statistik",
                  value: `${content.length} karakter`,
                  inline: true,
                },
              ],
              timestamp: new Date().toISOString(),
              footer: {
                text: "Kelas Pekerja — Cerita Baru Masuk",
                icon_url: "https://cdn-icons-png.flaticon.com/512/2829/2829768.png",
              },
            },
          ],
        }),
      });

      if (!discordResponse.ok) {
        console.error("Discord error:", await discordResponse.text());
      } else {
        console.log("✅ Notifikasi Discord terkirim!");
      }
    } catch (discordError) {
      console.error("❌ Gagal kirim ke Discord:", discordError);
      // Jangan return error ke user, biar tetap sukses meski Discord gagal
    }

    return NextResponse.json(
      {
        success: true,
        message: "Ceritamu berhasil dikirim! Akan kami review segera.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error submitting story:", error);
    return NextResponse.json(
      { error: "Gagal mengirim cerita. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
