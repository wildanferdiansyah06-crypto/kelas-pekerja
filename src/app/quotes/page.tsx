'use client';

import { useState, useEffect, useRef } from "react";
import { Send, Share2, Quote, Sparkles, Coffee } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/src/lib/supabase";
import { useLanguage } from "@/src/contexts/LanguageContext";

interface QuoteItem {
  id: number;
  text: string;
  textEn?: string;
  author: string;
  authorEn?: string;
  category?: string;
  categoryEn?: string;
  created_at?: string;
}

// Fallback quotes when Supabase is not configured
const FALLBACK_QUOTES: QuoteItem[] = [
  {
    id: 1,
    text: "Kopi tidak menyelesaikan masalah, tapi kopi membuat masalah terasa bisa diselesaikan.",
    textEn: "Coffee doesn't solve problems, but coffee makes problems feel solvable.",
    author: "Pekerja Shift Malam",
    authorEn: "Night Shift Worker",
    category: "Kopi",
    categoryEn: "Coffee"
  },
  {
    id: 2,
    text: "Shift terakhir selalu yang terpanjang, tapi juga yang paling berharga.",
    textEn: "The last shift is always the longest, but also the most valuable.",
    author: "Karyawan Loyal",
    authorEn: "Loyal Employee",
    category: "Kehidupan",
    categoryEn: "Life"
  },
  {
    id: 3,
    text: "Satu cangkir kopi, ribuan cerita.",
    textEn: "One cup of coffee, thousands of stories.",
    author: "Barista Senior",
    authorEn: "Senior Barista",
    category: "Refleksi",
    categoryEn: "Reflection"
  },
  {
    id: 4,
    text: "Lelah itu wajar, menyerah itu pilihan.",
    textEn: "Feeling tired is natural, giving up is a choice.",
    author: "Kepala Shift",
    authorEn: "Shift Supervisor",
    category: "Filosofi",
    categoryEn: "Philosophy"
  },
  {
    id: 5,
    text: "Senyum pelanggan adalah bonus gaji terbaik.",
    textEn: "A customer's smile is the best paycheck bonus.",
    author: "Staff Frontline",
    authorEn: "Frontline Staff",
    category: "Kehidupan",
    categoryEn: "Life"
  }
];

export default function QuotesPage() {
  const { t, language } = useLanguage();
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
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
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch quotes from Supabase
  useEffect(() => {
    const fetchQuotes = async () => {
      if (!isSupabaseConfigured) {
        setQuotes(FALLBACK_QUOTES);
        setUsingFallback(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase!
          .from('quotes')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching quotes:', error);
          setQuotes(FALLBACK_QUOTES);
          setUsingFallback(true);
        } else if (data && data.length > 0) {
          setQuotes(data);
          setUsingFallback(false);
        } else {
          setQuotes(FALLBACK_QUOTES);
          setUsingFallback(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setQuotes(FALLBACK_QUOTES);
        setUsingFallback(true);
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
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        scrollContainer.scrollTop = scrollPosition;

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

  const handleShare = async (quote: QuoteItem) => {
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
      navigator.clipboard.writeText(shareText);
      alert('Quote disalin ke clipboard!');
    }
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--kp-bg-base)' }}>

      {/* Background ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,116,0.04),transparent_60%)]" />
        <div className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,165,116,0.03),transparent_60%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute top-[20%] left-[10%] animate-firefly particle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[30%] right-[15%] animate-firefly particle" style={{ animationDelay: '2s' }} />

      {/* ═══════════════════════════════
          HEADER
      ═══════════════════════════════ */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-16 sm:pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-ui font-medium tracking-wider uppercase mb-6 glass animate-fade-in-up"
            style={{ color: 'var(--kp-accent)', borderColor: 'rgba(212, 165, 116, 0.2)' }}
          >
            <Coffee size={12} />
            {language === 'en' ? 'Worker Words' : 'Kata-Kata Pekerja'}
          </div>

          <h1
            className="typography-h1 mb-6 animate-slide-in-up delay-100"
            style={{ color: 'var(--kp-text-primary)' }}
          >
            {t.hero.recentQuotes}
          </h1>
          <p
            className="font-body text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200"
            style={{ color: 'var(--kp-text-secondary)' }}
          >
            {language === 'en' 
              ? 'A collection of words to accompany your coffee in the middle of a long shift.'
              : 'Kumpulan kata-kata yang menemani secangkir kopi di tengah shift yang panjang.'}
          </p>

          {/* Decorative divider */}
          <div className="mt-12 flex justify-center items-center gap-6">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-[var(--kp-accent)] opacity-40" />
            <Quote size={18} style={{ color: 'var(--kp-accent)' }} className="opacity-60" />
            <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-[var(--kp-accent)] opacity-40" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════
          QUOTES LIST
      ═══════════════════════════════ */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'rgba(212, 165, 116, 0.3)', borderTopColor: 'var(--kp-accent)' }} />
              <span className="font-ui text-sm" style={{ color: 'var(--kp-text-muted)' }}>{t.common.loading}</span>
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-2xl">
              <Coffee size={32} className="mx-auto mb-4 opacity-30" style={{ color: 'var(--kp-accent)' }} />
              <p className="font-ui text-sm" style={{ color: 'var(--kp-text-muted)' }}>{language === 'en' ? 'No quotes available yet.' : 'Belum ada quote tersedia.'}</p>
            </div>
          ) : (
            <>
              {usingFallback && (
                <div className="mb-8 text-center py-3 px-6 rounded-full glass inline-flex items-center gap-2 mx-auto" style={{ display: 'flex', maxWidth: 'fit-content', margin: '0 auto 2rem auto', border: '1px solid rgba(212, 165, 116, 0.1)' }}>
                  <Sparkles size={14} style={{ color: 'var(--kp-accent)' }} />
                  <p className="text-sm font-ui" style={{ color: 'var(--kp-text-muted)' }}>
                    {language === 'en' ? 'Demo Mode — Using default quotes' : 'Mode Demo — Menggunakan quotes default'}
                  </p>
                </div>
              )}

              <div
                ref={scrollContainerRef}
                className="space-y-6 overflow-y-auto max-h-[600px] pr-2 hide-scrollbar"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {quotes.map((quote, index) => (
                  <div
                    key={quote.id}
                    className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Decorative quote mark */}
                    <div
                      className="absolute top-4 left-6 font-display text-7xl leading-none select-none pointer-events-none"
                      style={{ color: 'var(--kp-accent)', opacity: 0.08 }}
                    >
                      &ldquo;
                    </div>

                    {/* Hover glow */}
                    <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(212,165,116,0.06)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <p
                      className="relative z-10 font-display text-xl md:text-2xl italic leading-relaxed mb-6"
                      style={{ color: 'var(--kp-text-primary)' }}
                    >
                      {language === 'en' && quote.textEn ? quote.textEn : quote.text}
                    </p>

                    <div className="relative z-10 flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--kp-border-medium)' }}>
                      <div>
                        <p className="font-ui text-sm font-medium mb-1" style={{ color: 'var(--kp-text-secondary)' }}>
                          — {language === 'en' && quote.authorEn ? quote.authorEn : quote.author}
                        </p>
                        {quote.category && (
                          <span
                            className="inline-block px-3 py-1 rounded-full text-[10px] font-ui font-semibold tracking-wider uppercase border"
                            style={{
                              color: 'var(--kp-accent)',
                              borderColor: 'rgba(212, 165, 116, 0.2)',
                              background: 'rgba(212, 165, 116, 0.05)',
                            }}
                          >
                            {language === 'en' && quote.categoryEn ? quote.categoryEn : quote.category}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleShare(quote)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full font-ui text-xs font-medium transition-all duration-300"
                        style={{
                          background: 'rgba(212, 165, 116, 0.1)',
                          color: 'var(--kp-accent)',
                          border: '1px solid rgba(212, 165, 116, 0.2)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(212, 165, 116, 0.2)';
                          e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 165, 116, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        title="Share quote"
                      >
                        <Share2 size={14} />
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════
          SUBMIT SECTION
      ═══════════════════════════════ */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {!isSupabaseConfigured ? (
            <div className="glass-card py-4 px-6 rounded-full inline-flex items-center gap-2">
              <Sparkles size={14} style={{ color: 'var(--kp-text-muted)' }} />
              <p className="text-sm font-ui" style={{ color: 'var(--kp-text-muted)' }}>
                Submit quote dinonaktifkan (Supabase belum dikonfigurasi)
              </p>
            </div>
          ) : (
            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-ui text-sm font-semibold transition-all duration-400"
              style={{
                background: showSubmitForm ? 'transparent' : 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
                color: showSubmitForm ? 'var(--kp-text-primary)' : '#0a0908',
                border: showSubmitForm ? '1px solid rgba(212, 165, 116, 0.3)' : 'none',
                boxShadow: showSubmitForm ? 'none' : '0 0 20px rgba(212, 165, 116, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (!showSubmitForm) {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 165, 116, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!showSubmitForm) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <Send size={16} />
              {showSubmitForm ? 'Tutup Form' : 'Kirim Quote'}
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════
          SUBMIT FORM
      ═══════════════════════════════ */}
      {showSubmitForm && (
        <div className="relative z-10 px-6 pb-32 animate-fade-in-up">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8 sm:p-10">
              <h2 className="font-display text-2xl sm:text-3xl mb-2" style={{ color: 'var(--kp-text-primary)' }}>
                Kirim Quote Kamu
              </h2>
              <p className="font-body text-sm mb-8" style={{ color: 'var(--kp-text-muted)' }}>
                Kata-kata terbaikmu akan ditinjau sebelum ditampilkan.
              </p>

              <form onSubmit={handleSubmitQuote} className="space-y-5">
                <div>
                  <label className="block text-xs font-ui font-semibold tracking-wider uppercase mb-2" style={{ color: 'var(--kp-accent)' }}>
                    Quote
                  </label>
                  <textarea
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="Tulis quote yang ingin kamu bagikan..."
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl font-body text-base resize-none glass outline-none transition-all duration-300 focus:border-[rgba(212,165,116,0.4)] placeholder-[var(--kp-text-subtle)]"
                    style={{ color: 'var(--kp-text-primary)' }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-ui font-semibold tracking-wider uppercase mb-2" style={{ color: 'var(--kp-accent)' }}>
                      Penulis
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Nama penulis atau sumber"
                      className="w-full px-5 py-3 rounded-xl font-ui text-sm glass outline-none transition-all duration-300 focus:border-[rgba(212,165,116,0.4)] placeholder-[var(--kp-text-subtle)]"
                      style={{ color: 'var(--kp-text-primary)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-ui font-semibold tracking-wider uppercase mb-2" style={{ color: 'var(--kp-accent)' }}>
                      Kategori
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl font-ui text-sm glass outline-none transition-all duration-300 focus:border-[rgba(212,165,116,0.4)]"
                      style={{
                        color: 'var(--kp-text-primary)',
                        backgroundColor: 'rgba(13, 11, 9, 0.6)',
                      }}
                    >
                      <option value="Kehidupan">Kehidupan</option>
                      <option value="Kopi">Kopi</option>
                      <option value="Refleksi">Refleksi</option>
                      <option value="Filosofi">Filosofi</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full py-3.5 rounded-xl font-ui text-sm font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
                    color: '#0a0908',
                    boxShadow: '0 0 20px rgba(212, 165, 116, 0.15)',
                  }}
                >
                  {submitStatus === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#0a0908 transparent #0a0908 #0a0908' }} />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Kirim Quote
                    </>
                  )}
                </button>

                {submitMessage && (
                  <p className={`text-sm font-ui text-center ${
                    submitStatus === "success" ? "text-emerald-400" : "text-red-400"
                  }`}>
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
