import { NextRequest, NextResponse } from "next/server";

// TODO: Integrasi dengan database (Prisma + PostgreSQL/Supabase) atau CMS (Sanity, Strapi)
// Untuk sekarang, hanya log dan return success

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { title, author, email, category, content } = body;

    // Validasi basic
    if (!title || !content) {
      return NextResponse.json(
        { error: "Judul dan cerita wajib diisi" },
        { status: 400 }
      );
    }

    // TODO: Simpan ke database
    console.log("New story submission:", {
      title,
      author: author || "Anonymous",
      email: email || null,
      category: category || "lainnya",
      content: content.substring(0, 100) + "...", // Log preview
      submittedAt: new Date().toISOString(),
    });

    // TODO: Kirim notifikasi email (Resend/EmailJS)
    // TODO: Simpan ke draft untuk review

    return NextResponse.json(
      { 
        success: true, 
        message: "Ceritamu berhasil dikirim. Akan kami review segera." 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error submitting story:", error);
    return NextResponse.json(
      { error: "Gagal mengirim cerita. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
