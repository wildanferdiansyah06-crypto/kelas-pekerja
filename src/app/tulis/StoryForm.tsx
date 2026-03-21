"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function StoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      email: formData.get("email"),
      category: formData.get("category"),
      content: formData.get("content"),
    };

    try {
      const response = await fetch("/api/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim");
      }

      setIsSuccess(true);
      e.currentTarget.reset();

    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto mb-6 text-[#8b7355]" />
        <h2 className="font-serif text-2xl mb-4 text-[#f5f0e8]">
          Ceritamu Sudah Terkirim
        </h2>
        <p className="text-[#a09080] mb-8">
          Terima kasih sudah berbagi. Kami akan review dan kabari kalau sudah dipublikasikan.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-[#8b7355] hover:text-[#e8e0d5] transition-colors text-sm"
        >
          Tulis cerita lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Judul */}
      <div>
        <label 
          htmlFor="title" 
          className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
        >
          Judul Cerita *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Misal: 'Malam di Sudut Kedai'"
          className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
            text-[#e8e0d5] placeholder-[#6b5a45]
            focus:border-[#8b7355]/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Nama */}
      <div>
        <label 
          htmlFor="author" 
          className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
        >
          Nama Kamu (Boleh Samaran)
        </label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Bisa nama asli atau inisial"
          className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
            text-[#e8e0d5] placeholder-[#6b5a45]
            focus:border-[#8b7355]/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
        >
          Email (Opsional)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email@kamu.com"
          className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
            text-[#e8e0d5] placeholder-[#6b5a45]
            focus:border-[#8b7355]/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Kategori */}
      <div>
        <label 
          htmlFor="category" 
          className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
        >
          Tema Cerita
        </label>
        <select
          id="category"
          name="category"
          className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
            text-[#e8e0d5] focus:border-[#8b7355]/50 focus:outline-none transition-colors
            appearance-none cursor-pointer"
        >
          <option value="">Pilih tema...</option>
          <option value="kehidupan">Kehidupan</option>
          <option value="kerja">Kerja</option>
          <option value="malam">Malam</option>
          <option value="kopi">Kopi</option>
          <option value="proses">Proses</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>

      {/* Cerita */}
      <div>
        <label 
          htmlFor="content" 
          className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
        >
          Ceritamu *
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          placeholder="Tulis apa yang kamu rasakan. Tidak ada yang salah di sini..."
          className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
            text-[#e8e0d5] placeholder-[#6b5a45] leading-relaxed
            focus:border-[#8b7355]/50 focus:outline-none transition-colors resize-none"
        />
        <p className="text-xs text-[#6b5a45] mt-2">
          Bisa pendek, bisa panjang. Bebas.
        </p>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 
            bg-[#8b7355] text-[#0f0e0c] rounded-full
            hover:bg-[#a08060] transition-all duration-300 
            text-sm tracking-wider font-medium
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0f0e0c]/30 border-t-[#0f0e0c] rounded-full animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send size={18} />
              Kirim Cerita
            </>
          )}
        </button>
        
        <p className="text-xs text-[#6b5a45] text-center mt-4">
          Ceritamu akan direview dulu sebelum dipublikasikan.
        </p>
      </div>
    </form>
  );
}
