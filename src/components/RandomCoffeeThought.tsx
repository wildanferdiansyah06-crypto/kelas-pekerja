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

  // fetch quotes dari public/data/quotes.json
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
    <section className="py-32 px-6 text-center">
      <div className="max-w-xl mx-auto">

        <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">
          Butuh teman ngopi?
        </p>

        <h3 className="font-serif text-3xl md:text-4xl mb-6 opacity-90">
          Random Coffee Thought
        </h3>

        <p className="text-sm opacity-60 mb-10">
          Klik tombol di bawah untuk mendapatkan pemikiran random yang cocok menemani secangkir kopi.
        </p>

        {/* Quote */}
        <div className="min-h-[80px] flex items-center justify-center mb-10">
          {currentQuote && (
            <p className="text-lg font-serif italic text-[#8b7355] leading-relaxed animate-fade-in">
              "{currentQuote.text}"
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={randomThought}
          className="inline-flex items-center gap-2 px-8 py-4 
                   bg-[#8b7355] text-white rounded-full
                   hover:bg-[#6b5635] transition-all text-sm tracking-wider"
        >
          <RefreshCcw size={16} />
          Random Thought
        </button>

      </div>
    </section>
  );
}
