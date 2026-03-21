import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, PenLine, Send, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Tulis Cerita — Kelas Pekerja",
  description: "Gak semua hal harus dipendam sendiri. Tulis ceritamu di sini.",
};

export default function TulisPage() {
  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#e8e0d5]">
      {/* Header */}
      <header className="px-6 py-6 border-b border-[#8b7355]/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#e8e0d5] transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>
          
          <div className="flex items-center gap-2">
            <Coffee size={18} className="text-[#8b7355]" />
            <span className="font-serif text-lg">Kelas Pekerja</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12">
            <PenLine className="w-12 h-12 mx-auto mb-6 text-[#8b7355] opacity-80" />
            
            <h1 className="font-serif text-3xl md:text-4xl mb-4 text-[#f5f0e8]">
              Tulis Ceritamu
            </h1>
            
            <p className="text-[#a09080] leading-relaxed">
              Gak perlu sempurna. Gak perlu panjang. 
              <br />
              Yang penting, jujur.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Judul */}
            <div>
              <label 
                htmlFor="title" 
                className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
              >
                Judul Cerita
              </label>
              <input
                type="text"
                id="title"
                name="title"
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
                Email (Opsional, untuk update)
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
                Ceritamu
              </label>
              <textarea
                id="content"
                name="content"
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
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 
                  bg-[#8b7355] text-[#0f0e0c] rounded-full
                  hover:bg-[#a08060] transition-all duration-300 
                  text-sm tracking-wider font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                Kirim Cerita
              </button>
              
              <p className="text-xs text-[#6b5a45] text-center mt-4">
                Ceritamu akan direview dulu sebelum dipublikasikan.
              </p>
            </div>
          </form>

          {/* Note */}
          <div className="mt-16 pt-8 border-t border-[#8b7355]/10">
            <p className="text-sm text-[#8b7355] text-center leading-relaxed">
              &ldquo;Gak semua orang kuat. Tapi banyak yang tetap jalan. 
              Dan mungkin, dengan menulis, kita bisa jalan bareng.&rdquo;
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
