"use client";

import { useState, useCallback } from "react";
import { Send, CheckCircle, EyeOff, User, PenLine } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

type IdentityMode = "real" | "pen" | "anon";

const ANON_NAMES_ID = [
  "Seorang dari Malam",
  "Kelas Pekerja",
  "Tanpa Nama",
  "Seseorang yang Kelelahan",
  "Dari Balik Bar",
  "Pekerja Tanpa Wajah",
  "Yang Tidak Sempat Tidur",
  "Penumpang Kereta Terakhir",
];

const ANON_NAMES_EN = [
  "Someone from the Night",
  "The Working Class",
  "No Name",
  "Someone Exhausted",
  "From Behind the Bar",
  "A Faceless Worker",
  "The One Who Couldn't Sleep",
  "Last Train Passenger",
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function StoryForm() {
  const { language } = useLanguage();
  const id = language === "id";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [identityMode, setIdentityMode] = useState<IdentityMode>("real");
  const [penName, setPenName] = useState("");
  const [anonName] = useState(() =>
    pickRandom(id ? ANON_NAMES_ID : ANON_NAMES_EN)
  );

  const getAuthorValue = useCallback(() => {
    if (identityMode === "anon") return anonName;
    if (identityMode === "pen") return penName || anonName;
    return ""; // real — user fills in the form field
  }, [identityMode, penName, anonName]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      author: identityMode === "real" ? formData.get("author") : getAuthorValue(),
      email: formData.get("email"),
      category: formData.get("category"),
      content: formData.get("content"),
      identityMode,
    };

    try {
      const response = await fetch("/api/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || (id ? "Gagal mengirim" : "Submission failed"));
      }

      setIsSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : (id ? "Terjadi kesalahan" : "An error occurred"));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto mb-6 text-[#8b7355]" />
        <h2 className="font-serif text-2xl mb-4 text-[#f5f0e8]">
          {id ? "Ceritamu Sudah Terkirim" : "Your Story Has Been Sent"}
        </h2>
        <p className="text-[#a09080] mb-8">
          {id
            ? "Terima kasih sudah berbagi. Kami akan review dan kabari kalau sudah dipublikasikan."
            : "Thank you for sharing. We'll review it and let you know when it's published."}
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-[#8b7355] hover:text-[#e8e0d5] transition-colors text-sm"
        >
          {id ? "Tulis cerita lain" : "Write another story"}
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
          {id ? "Judul Cerita *" : "Story Title *"}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder={id ? "Misal: 'Malam di Sudut Kedai'" : "E.g. 'Night at the Corner Shop'"}
          className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
            text-[#e8e0d5] placeholder-[#6b5a45]
            focus:border-[#8b7355]/50 focus:outline-none transition-colors"
        />
      </div>

      {/* ─── Identitas ─── */}
      <div>
        <p className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-3">
          {id ? "Identitas Penulis" : "Author Identity"}
        </p>

        {/* Mode selector */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {(
            [
              {
                mode: "real" as IdentityMode,
                icon: <User size={14} />,
                label: id ? "Nama Asli" : "Real Name",
                desc: id ? "Tampil dengan nama kamu" : "Show your real name",
              },
              {
                mode: "pen" as IdentityMode,
                icon: <PenLine size={14} />,
                label: id ? "Nama Pena" : "Pen Name",
                desc: id ? "Pilih nama samaran" : "Choose a pseudonym",
              },
              {
                mode: "anon" as IdentityMode,
                icon: <EyeOff size={14} />,
                label: id ? "Anonim" : "Anonymous",
                desc: id ? "Sepenuhnya tersembunyi" : "Fully hidden",
              },
            ] as const
          ).map(({ mode, icon, label, desc }) => (
            <button
              key={mode}
              type="button"
              onClick={() => setIdentityMode(mode)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-300 ${
                identityMode === mode
                  ? "border-[#8b7355]/60 bg-[#8b7355]/10 text-[#c9a86c]"
                  : "border-[#8b7355]/15 bg-[#1a1816] text-[#6b5a45] hover:border-[#8b7355]/30 hover:text-[#9b8060]"
              }`}
            >
              {icon}
              <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
              <span className="text-[9px] leading-tight opacity-70">{desc}</span>
            </button>
          ))}
        </div>

        {/* Identity input fields */}
        {identityMode === "real" && (
          <input
            type="text"
            id="author"
            name="author"
            placeholder={id ? "Nama kamu" : "Your name"}
            className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
              text-[#e8e0d5] placeholder-[#6b5a45]
              focus:border-[#8b7355]/50 focus:outline-none transition-colors"
          />
        )}

        {identityMode === "pen" && (
          <div className="space-y-2">
            <input
              type="text"
              value={penName}
              onChange={(e) => setPenName(e.target.value)}
              placeholder={id ? "Masukkan nama pena kamu..." : "Enter your pen name..."}
              className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
                text-[#e8e0d5] placeholder-[#6b5a45]
                focus:border-[#8b7355]/50 focus:outline-none transition-colors"
            />
            <p className="text-[10px] text-[#6b5a45] pl-1">
              {id
                ? "Nama ini yang akan muncul di tulisanmu."
                : "This name will appear on your writing."}
            </p>
          </div>
        )}

        {identityMode === "anon" && (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-[#8b7355]/15 bg-[#8b7355]/5">
            <EyeOff size={16} className="text-[#8b7355] flex-shrink-0" />
            <div>
              <p className="text-[#c9a86c] text-sm font-medium">{anonName}</p>
              <p className="text-[#6b5a45] text-[10px] mt-0.5">
                {id
                  ? "Nama ini yang akan mewakilimu. Email (jika diisi) hanya untuk notifikasi, tidak dipublikasikan."
                  : "This name will represent you. Email (if filled) is only for notifications, not published."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
        >
          {id ? "Email (Opsional)" : "Email (Optional)"}
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
          {id ? "Tema Cerita" : "Story Theme"}
        </label>
        <select
          id="category"
          name="category"
          className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
            text-[#e8e0d5] focus:border-[#8b7355]/50 focus:outline-none transition-colors
            appearance-none cursor-pointer"
        >
          <option value="">{id ? "Pilih tema..." : "Pick a theme..."}</option>
          <option value="kehidupan">{id ? "Kehidupan" : "Life"}</option>
          <option value="kerja">{id ? "Kerja" : "Work"}</option>
          <option value="malam">{id ? "Malam" : "Night"}</option>
          <option value="kopi">{id ? "Kopi" : "Coffee"}</option>
          <option value="proses">{id ? "Proses" : "Process"}</option>
          <option value="lainnya">{id ? "Lainnya" : "Other"}</option>
        </select>
      </div>

      {/* Cerita */}
      <div>
        <label
          htmlFor="content"
          className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
        >
          {id ? "Ceritamu *" : "Your Story *"}
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          placeholder={
            id
              ? "Tulis apa yang kamu rasakan. Tidak ada yang salah di sini..."
              : "Write what you feel. Nothing is wrong here..."
          }
          className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
            text-[#e8e0d5] placeholder-[#6b5a45] leading-relaxed
            focus:border-[#8b7355]/50 focus:outline-none transition-colors resize-none"
        />
        <p className="text-xs text-[#6b5a45] mt-2">
          {id ? "Bisa pendek, bisa panjang. Bebas." : "Short or long. Entirely free."}
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
              {id ? "Mengirim..." : "Sending..."}
            </>
          ) : (
            <>
              <Send size={18} />
              {id ? "Kirim Cerita" : "Send Story"}
            </>
          )}
        </button>

        <p className="text-xs text-[#6b5a45] text-center mt-4">
          {id
            ? "Ceritamu akan direview dulu sebelum dipublikasikan."
            : "Your story will be reviewed before being published."}
        </p>
      </div>
    </form>
  );
}
