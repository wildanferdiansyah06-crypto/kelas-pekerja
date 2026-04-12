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
        <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{ opacity: 0.4, color: 'var(--kp-text-muted)' }}>
          Butuh teman ngopi?
        </p>

        <h3 className="font-serif text-3xl md:text-4xl mb-6" style={{ opacity: 0.9, color: 'var(--kp-text-primary)' }}>
          Random Coffee Thought
        </h3>

        <p className="font-serif text-sm mb-10" style={{ opacity: 0.6, color: 'var(--kp-text-secondary)' }}>
          Klik tombol di bawah untuk mendapatkan pemikiran random yang cocok menemani secangkir kopi.
        </p>

        <div className="relative rounded-2xl overflow-hidden p-8 mb-10" style={{ background: 'linear-gradient(to bottom right, var(--kp-accent-light), var(--kp-bg-surface))', border: '1px solid var(--kp-border)' }}>
          {/* Dekoratif quote mark */}
          <div className="absolute top-4 left-6 text-8xl leading-none select-none" style={{ color: 'var(--kp-accent)', opacity: 0.2, fontFamily: 'var(--font-display)' }}>
            &ldquo;
          </div>

          {currentQuote && (
            <p className="relative z-10 font-serif text-xl italic leading-relaxed animate-fade-in" style={{ color: 'var(--kp-text-primary)' }}>
              {currentQuote.text}
            </p>
          )}

          <div className="flex items-center justify-between mt-6">
            <span className="text-sm font-medium font-sans" style={{ color: 'var(--kp-text-muted)' }}>
              — Coffee Thought
            </span>
            <button
              onClick={randomThought}
              className="px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'var(--kp-accent)',
                color: 'var(--kp-text-on-dark)',
              }}
            >
              Acak Quote ↺
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
