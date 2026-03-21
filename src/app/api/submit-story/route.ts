import { NextRequest, NextResponse } from "next/server";

// Ambil dari env var, fallback ke hardcoded untuk testing (hapus fallback di production!)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 
  "https://discord.com/api/webhooks/1484984129568379041/F8izxYUheowfTbczX9cj6LPJjYFrE-VdUjUq28m3dyd6KMfJ6FB6iuFONevBGj4QAnk8";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, email, category, content } = body;

    // Validasi wajib
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Judul dan cerita wajib diisi" },
        { status: 400 }
      );
    }

    const authorName = author?.trim() || "Anonymous";
    const categoryName = category || "lainnya";
    const emailText = email?.trim() || "Tidak disertakan";
    const contentLength = content.length;

    // Kirim ke Discord dengan timeout
    if (DISCORD_WEBHOOK_URL) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 detik timeout

        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Kelas Pekerja",
            avatar_url: "https://cdn-icons-png.flaticon.com/512/2829/2829768.png",
            embeds: [
              {
                title: `📝 ${title.trim()}`,
                url: "https://kelas-pekerja.vercel.app/tulisan",
                description: content.trim().length > 1900 
                  ? content.trim().substring(0, 1900) + "...\n\n*(cerita terlalu panjang, dipotong)*"
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
                    name: "📊 Panjang",
                    value: `${contentLength} karakter`,
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
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!discordResponse.ok) {
          const errorText = await discordResponse.text();
          console.error("Discord API Error:", discordResponse.status, errorText);
        } else {
          console.log("✅ Notifikasi Discord terkirim:", title.trim());
        }
      } catch (discordError) {
        if (discordError instanceof Error && discordError.name === 'AbortError') {
          console.error("❌ Timeout kirim ke Discord");
        } else {
          console.error("❌ Gagal kirim ke Discord:", discordError);
        }
        // Continue - jangan block user kalau Discord gagal
      }
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
