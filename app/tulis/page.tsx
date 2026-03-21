import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, PenLine, Coffee } from "lucide-react";
import StoryForm from "./StoryForm";

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
          <StoryForm />

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
