import { NextRequest, NextResponse } from "next/server";
import { submitStory } from "@/src/lib/java-api";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    // Parse form data (multipart/form-data)
    const formData = await request.formData();

    const title = String(formData.get("title") || "");
    const author = String(formData.get("author") || "Anonymous");
    const email = String(formData.get("email") || "Tidak disertakan");
    const category = String(formData.get("category") || "lainnya");
    const content = String(formData.get("content") || "");
    const fileCount = parseInt(String(formData.get("fileCount") || "0"));

    if (!title.trim() || !content.trim()) {
      return NextResponse.json(
        { error: "Judul dan cerita wajib diisi" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Save to Java backend
    const storyData = await submitStory({
      slug,
      title,
      content,
      author,
      category,
    });

    if (!storyData.success) {
      console.error("Java backend error:", storyData);
      return NextResponse.json(
        { error: "Gagal menyimpan cerita ke database" },
        { status: 500 }
      );
    }

    // Collect files for Discord
    const files: File[] = [];
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file-${i}`) as File | null;
      if (file && file.size > 0) {
        // Check file size (Discord limit: 25MB)
        if (file.size > 25 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File ${file.name} terlalu besar (max 25MB)` },
            { status: 400 }
          );
        }
        files.push(file);
      }
    }

    // Build Discord message
    const truncatedContent = content.length > 1500
      ? content.slice(0, 1500) + "...\n\n*(Cerita dipotong, lihat full di dashboard)*"
      : content;

    const message = `
📝 **${title}**

${truncatedContent}

✍️ ${author}
🏷️ ${category}
📧 ${email}
📎 ${files.length > 0 ? `${files.length} file dilampirkan` : "Tidak ada lampiran"}
🆔 ID: ${storyData.story?.id}
`;

    // Prepare Discord webhook payload
    const discordFormData = new FormData();

    // Add JSON payload
    discordFormData.append("payload_json", JSON.stringify({
      content: message,
      allowed_mentions: { parse: [] } // Disable mentions for safety
    }));

    // Add files
    files.forEach((file, index) => {
      discordFormData.append(`files[${index}]`, file, file.name);
    });

    // Send to Discord
    if (!DISCORD_WEBHOOK_URL) {
      console.error("Discord webhook URL not configured");
      return NextResponse.json(
        { error: "Webhook tidak ditemukan di env" },
        { status: 500 }
      );
    }

    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      body: discordFormData,
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
        message: "Ceritamu berhasil dikirim!",
        filesUploaded: files.length,
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
