"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Share2 } from "lucide-react";
import { supabase } from "@/src/lib/supabase";

interface Quote {
  id: number;
  text: string;
  author: string;
  category?: string;
  created_at?: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [quoteText, setQuoteText] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Kehidupan");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Fetch quotes from Supabase
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching quotes:', error);
        } else if (data) {
          setQuotes(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        scrollContainer.scrollTop = scrollPosition;

        // Reset to top when reaching bottom
        if (scrollPosition >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
          scrollPosition = 0;
          scrollContainer.scrollTop = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, quotes]);

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
        setSubmitMessage(data.message || "Terima kasih!");
        setQuoteText("");
        setAuthor("");
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Gagal mengirim quote");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Terjadi kesalahan");
    }
  };

  const handleShare = async (quote: Quote) => {
    const shareText = `"${quote.text}" — ${quote.author} ☕`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quote Pekerja',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Quote disalin ke clipboard!');
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

      {/* Main Quote Display - Scrolling List */}
      <div className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-12" style={{ color: 'var(--kp-text-muted)' }}>
              Memuat quotes...
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-12" style={{ color: 'var(--kp-text-muted)' }}>
              Belum ada quote tersedia.
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--kp-accent) var(--kp-bg-surface)',
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="relative rounded-2xl overflow-hidden p-6 md:p-8 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(to bottom right, var(--kp-accent-light), var(--kp-bg-surface))',
                    border: '1px solid var(--kp-border)',
                  }}
                >
                  {/* Decorative quote mark */}
                  <div
                    className="absolute top-4 left-6 text-6xl leading-none select-none"
                    style={{ color: 'var(--kp-accent)', opacity: 0.2, fontFamily: 'var(--font-display)' }}
                  >
                    &ldquo;
                  </div>

                  <p
                    className="relative z-10 font-serif text-lg md:text-xl italic leading-relaxed mb-4"
                    style={{ color: 'var(--kp-text-primary)' }}
                  >
                    {quote.text}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p
                        className="font-sans text-sm font-medium"
                        style={{ color: 'var(--kp-text-muted)' }}
                      >
                        — {quote.author}
                      </p>
                      {quote.category && (
                        <span
                          className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--kp-accent-light)',
                            color: 'var(--kp-accent)',
                            border: '1px solid var(--kp-border)',
                          }}
                        >
                          {quote.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleShare(quote)}
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: 'var(--kp-accent)',
                          color: 'var(--kp-text-on-dark)',
                        }}
                        title="Share quote"
                      >
                        <Share2 size={14} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
