"use client";

import { useState } from "react";
import { RefreshCcw, Send } from "lucide-react";

interface Quote {
  id: number;
  text: string;
  author: string;
  category?: string;
  submittedBy?: string;
  submittedAt?: string;
}

const dummyQuotes: Quote[] = [
  {
    id: 1,
    text: "Hari ini mungkin berat, tapi kamu sudah sampai di sini — dan itu sudah lebih dari cukup.",
    author: "Kelas Pekerja",
    category: "Kehidupan",
  },
  {
    id: 2,
    text: "Kopi itu seperti kehidupan, terkadang pahit di awal tapi manis di akhir jika kamu sabar menikmatinya.",
    author: "Barista Bijak",
    category: "Kopi",
  },
  {
    id: 3,
    text: "Jangan bandingkan prosesmu dengan highlight orang lain. Mereka juga punya chapter yang tidak mereka share.",
    author: "Anonim",
    category: "Refleksi",
  },
  {
    id: 4,
    text: "Shift malam itu bukan hukuman, itu adalah waktu di mana dunia tidur dan kamu bertumbuh.",
    author: "Pekerja Malam",
    category: "Kehidupan",
  },
  {
    id: 5,
    text: "Kadang hal terbaik yang bisa kamu lakukan bukan menyelesaikan semua masalah, tapi cukup hadir dan bertahan.",
    author: "Kelas Pekerja",
    category: "Filosofi",
  },
  {
    id: 6,
    text: "Kopi tidak akan menyelesaikan masalahmu, tapi setidaknya kamu akan lebih kuat untuk menghadapinya.",
    author: "Pecinta Kopi",
    category: "Kopi",
  },
  {
    id: 7,
    text: "Setiap shift yang selesai adalah kemenangan kecil yang layak dirayakan dengan secangkir kopi.",
    author: "Kelas Pekerja",
    category: "Kehidupan",
  },
  {
    id: 8,
    text: "Jangan lupa istirahat. Bukan karena kamu lemah, tapi karena kamu butuh mengisi ulang untuk tetap kuat.",
    author: "Self-Care",
    category: "Refleksi",
  },
];

export default function QuotesPage() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(dummyQuotes[0]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  // Form state
  const [quoteText, setQuoteText] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Kehidupan");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * dummyQuotes.length);
    setCurrentQuote(dummyQuotes[randomIndex]);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quoteText.trim() || !author.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Quote dan penulis wajib diisi");
      return;
    }

    setSubmitStatus("loading");

    try {
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: quoteText,
          author: author,
          category: category,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(data.message || "Quote berhasil dikirim!");
        setQuoteText("");
        setAuthor("");
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Gagal mengirim quote");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--kp-bg-base)' }}>
      {/* Header */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4 text-center"
            style={{ color: 'var(--kp-text-primary)' }}
          >
            ☕ Quote Pekerja
          </h1>
          <p
            className="font-serif text-lg text-center max-w-2xl mx-auto"
            style={{ color: 'var(--kp-text-secondary)' }}
          >
            Kumpulan kata-kata yang menemani secangkir kopi di tengah shift yang panjang.
          </p>
        </div>
      </div>

      {/* Main Quote Display */}
      <div className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden p-8 md:p-12"
            style={{
              background: 'linear-gradient(to bottom right, var(--kp-accent-light), var(--kp-bg-surface))',
              border: '1px solid var(--kp-border)',
            }}
          >
            {/* Decorative quote mark */}
            <div
              className="absolute top-6 left-8 text-8xl leading-none select-none"
              style={{ color: 'var(--kp-accent)', opacity: 0.2, fontFamily: 'var(--font-display)' }}
            >
              &ldquo;
            </div>

            <p
              className="relative z-10 font-serif text-2xl md:text-3xl italic leading-relaxed mb-6"
              style={{ color: 'var(--kp-text-primary)' }}
            >
              {currentQuote.text}
            </p>

            <div className="flex items-center justify-between mt-8">
              <div>
                <p
                  className="font-sans text-sm font-medium"
                  style={{ color: 'var(--kp-text-muted)' }}
                >
                  — {currentQuote.author}
                </p>
                {currentQuote.category && (
                  <span
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--kp-accent-light)',
                      color: 'var(--kp-accent)',
                      border: '1px solid var(--kp-border)',
                    }}
                  >
                    {currentQuote.category}
                  </span>
                )}
              </div>
              <button
                onClick={getRandomQuote}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'var(--kp-accent)',
                  color: 'var(--kp-text-on-dark)',
                }}
              >
                <RefreshCcw size={16} />
                Quote Baru
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-6 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: showSubmitForm ? 'var(--kp-bg-surface)' : 'var(--kp-accent)',
              color: showSubmitForm ? 'var(--kp-text-primary)' : 'var(--kp-text-on-dark)',
              border: '1px solid var(--kp-border)',
            }}
          >
            <Send size={16} />
            {showSubmitForm ? 'Tutup Form' : 'Kirim Quote'}
          </button>
        </div>
      </div>

      {/* Submit Form */}
      {showSubmitForm && (
        <div className="px-6 pb-32">
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: 'var(--kp-bg-surface)',
                border: '1px solid var(--kp-border)',
              }}
            >
              <h2
                className="font-serif text-2xl font-bold mb-6"
                style={{ color: 'var(--kp-text-primary)' }}
              >
                Kirim Quote Kamu
              </h2>
              
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2 font-sans"
                    style={{ color: 'var(--kp-text-secondary)' }}
                  >
                    Quote
                  </label>
                  <textarea
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="Tulis quote yang ingin kamu bagikan..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg text-sm resize-none"
                    style={{
                      backgroundColor: 'var(--kp-bg-base)',
                      border: '1px solid var(--kp-border)',
                      color: 'var(--kp-text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2 font-sans"
                    style={{ color: 'var(--kp-text-secondary)' }}
                  >
                    Penulis
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nama penulis atau sumber"
                    className="w-full px-4 py-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: 'var(--kp-bg-base)',
                      border: '1px solid var(--kp-border)',
                      color: 'var(--kp-text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2 font-sans"
                    style={{ color: 'var(--kp-text-secondary)' }}
                  >
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: 'var(--kp-bg-base)',
                      border: '1px solid var(--kp-border)',
                      color: 'var(--kp-text-primary)',
                    }}
                  >
                    <option value="Kehidupan">Kehidupan</option>
                    <option value="Kopi">Kopi</option>
                    <option value="Refleksi">Refleksi</option>
                    <option value="Filosofi">Filosofi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--kp-accent)',
                    color: 'var(--kp-text-on-dark)',
                  }}
                >
                  {submitStatus === "loading" ? "Mengirim..." : "Kirim Quote"}
                </button>

                {submitMessage && (
                  <p
                    className={`text-sm ${
                      submitStatus === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
