✅ RandomCoffeeThought component created

// src/components/RandomCoffeeThought.tsx
'use client';

import { useState } from 'react';
import { Coffee, RefreshCw, Quote } from 'lucide-react';
import { Quote as QuoteType } from '@/src/types';

export default function RandomCoffeeThought() {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<QuoteType[]>([]);

  const getRandomQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quotes/random');
      const data = await res.json();

      if (data.quote) {
        setQuote(data.quote);
        setHistory(prev => [data.quote, ...prev].slice(0, 5)); // Keep last 5
      }
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">
            Butuh teman ngopi?
          </p>
          <h3 className="font-serif text-3xl md:text-4xl opacity-90 mb-4">
            Random Coffee Thought
          </h3>
          <p className="text-sm opacity-60">
            Klik tombol di bawah untuk mendapatkan pemikiran random yang cocok menemani secangkir kopi.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={getRandomQuote}
          disabled={loading}
          className="group relative inline-flex items-center gap-3 px-8 py-4 
                     bg-[#8b7355] text-white rounded-full
                     hover:bg-[#6b5635] 
                     transition-all duration-300 ease-out
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-[0_10px_30px_-10px_rgba(139,115,85,0.5)]
                     hover:shadow-[0_20px_40px_-10px_rgba(139,115,85,0.6)]
                     hover:scale-105"
        >
          <Coffee 
            size={20} 
            className={`transition-transform duration-500 ${loading ? 'animate-spin' : 'group-hover:rotate-12'}`} 
          />
          <span className="text-sm tracking-wider font-medium">
            {loading ? 'Menyeduh...' : 'Random Thought'}
          </span>
          <RefreshCw 
            size={16} 
            className={`opacity-60 transition-transform duration-300 ${loading ? 'animate-spin' : ''}`} 
          />
        </button>

        {/* Quote Display */}
        {quote && (
          <div className="mt-12 p-8 md:p-12 rounded-2xl 
                          bg-gradient-to-br from-[#8b7355]/5 to-transparent
                          border border-[#8b7355]/10
                          animate-fade-in">
            <Quote size={32} className="mx-auto mb-6 text-[#8b7355]/30" />

            <blockquote className="font-serif text-xl md:text-2xl leading-relaxed opacity-80 mb-6">
              "{quote.text}"
            </blockquote>

            <div className="flex items-center justify-center gap-3 text-xs opacity-40">
              <span className="px-3 py-1 rounded-full bg-[#8b7355]/10">
                #{String(quote.id).padStart(2, '0')}
              </span>
              <span>•</span>
              <span className="capitalize">{quote.category}</span>
              <span>•</span>
              <span className="capitalize">{quote.mood}</span>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 1 && (
          <div className="mt-8 text-xs opacity-40">
            <p className="mb-2">Riwayat terakhir:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {history.slice(1).map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setQuote(q)}
                  className="px-3 py-1 rounded-full bg-black/5 hover:bg-black/10 
                           transition-colors"
                >
                  #{String(q.id).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
        }
