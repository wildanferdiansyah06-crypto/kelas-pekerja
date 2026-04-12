"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

interface Quote {
  id: number;
  text: string;
  category: string;
  mood: string;
}

export default function RandomCoffeeThought() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const res = await fetch("/data/quotes.json");
        const data = await res.json();

        setQuotes(data.quotes);

        const random =
          data.quotes[Math.floor(Math.random() * data.quotes.length)];

        setCurrentQuote(random);
      } catch (err) {
        console.error("Failed to load quotes:", err);
      }
    };

    loadQuotes();
  }, []);

  const randomThought = () => {
    if (quotes.length === 0) return;

    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(random);
  };

  return (
    <section className="py-32 px-6 text-center relative z-10">
      <div className="max-w-xl mx-auto">
        <p className="font-ui text-xs tracking-widest uppercase mb-4" style={{ opacity: 0.4 }}>
          Butuh teman ngopi?
        </p>

        <h3 className="font-display text-3xl md:text-4xl mb-6" style={{ opacity: 0.9 }}>
          Random Coffee Thought
        </h3>

        <p className="font-body text-sm mb-10" style={{ opacity: 0.6 }}>
          Klik tombol di bawah untuk mendapatkan pemikiran random yang cocok menemani secangkir kopi.
        </p>

        <div className="min-h-[80px] flex items-center justify-center mb-10 p-6 rounded-lg" style={{ backgroundColor: 'var(--kp-bg-surface)', border: '1px solid var(--kp-border)' }}>
          {currentQuote && (
            <p className="font-display text-lg italic leading-relaxed animate-fade-in" style={{ color: 'var(--kp-accent)' }}>
              &ldquo;{currentQuote.text}&rdquo;
            </p>
          )}
        </div>

        <button
          onClick={randomThought}
          className="inline-flex items-center gap-2 px-8 py-4 font-ui text-sm font-medium rounded-full transition-colors duration-200"
          style={{
            backgroundColor: 'var(--kp-accent)',
            color: 'var(--kp-text-on-dark)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--kp-text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--kp-accent)';
          }}
        >
          <RefreshCcw size={16} />
          Random Thought
        </button>
      </div>
    </section>
  );
}
