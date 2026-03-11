"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

const ScrollReveal = ({ children, delay = 0 }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

interface PhilosophyCardProps {
  number: string;
  title: string;
  content: string;
}

const PhilosophyCard = ({ number, title, content }: PhilosophyCardProps) => (
  <div className="group relative p-8 md:p-10 rounded-sm border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700 transition-all duration-700">
    <span className="absolute top-6 right-6 text-6xl font-serif text-neutral-800/50 group-hover:text-neutral-700/50 transition-colors duration-500">
      {number}
    </span>

    <div className="relative z-10">
      <h3 className="text-sm tracking-[0.2em] uppercase text-neutral-500 mb-4 group-hover:text-neutral-400 transition-colors">
        {title}
      </h3>

      <p className="text-neutral-300 leading-[1.8] text-lg font-light">
        {content}
      </p>
    </div>
  </div>
);

interface StorySectionProps {
  title: string;
  paragraphs: string[];
  highlight?: string;
}

const StorySection = ({ title, paragraphs, highlight }: StorySectionProps) => (
  <ScrollReveal>
    <div className="mb-20 md:mb-32">
      <h2 className="text-2xl md:text-3xl font-serif mb-8 text-neutral-200">
        {title}
      </h2>

      <div className="space-y-6">
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="text-lg md:text-xl text-neutral-400 leading-[1.9] font-light"
          >
            {para}
          </p>
        ))}

        {highlight && (
          <blockquote className="mt-8 pl-6 border-l-2 border-neutral-700">
            <p className="text-xl md:text-2xl font-serif italic text-neutral-300 leading-relaxed">
              {highlight}
            </p>
          </blockquote>
        )}
      </div>
    </div>
  </ScrollReveal>
);

/* ====== FIX ADA DI SINI ====== */
/* JSX.Element DIHAPUS */

export default function TentangPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-[#e8e8e8] selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-800/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-900/20 rounded-full blur-[128px]" />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">

          <ScrollReveal>
            <div className="space-y-6">
              <span className="inline-block text-xs tracking-[0.4em] uppercase text-neutral-600 mb-4">
                Sebuah Ruang untuk yang Terlupakan
              </span>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-[0.9] text-white">
                Tentang
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
              Kelas Pekerja adalah ruang sunyi untuk mencatat kehidupan yang berjalan pelan,
              yang seringkali terlewatkan oleh dunia yang terburu-buru.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* CONTENT */}
      <article className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">

          <StorySection
            title="Asal Muasal"
            paragraphs={[
              "Tempat ini lahir dari kegelisahan sederhana yang menggerogoti di malam-malam sunyi.",
              "Bahwa begitu banyak orang bekerja setiap hari, menjalani hidupnya dengan tenang, tetapi kisah mereka hampir tidak pernah dituliskan.",
              "Kelas Pekerja lahir dari keyakinan bahwa setiap kehidupan—seberapa biasa pun—mengandung keindahan yang patut disimpan."
            ]}
            highlight="Karena terkadang, yang paling sederhana justru yang paling dekat dengan kebenaran hidup."
          />

        </div>
      </article>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          <span className="text-xs tracking-[0.3em] uppercase text-neutral-700">
            Kelas Pekerja © {new Date().getFullYear()}
          </span>

          <div className="flex gap-8">
            <span className="text-xs tracking-wider text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer">
              Arsip
            </span>
            <span className="text-xs tracking-wider text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer">
              Kirim Tulisan
            </span>
            <span className="text-xs tracking-wider text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer">
              Kontak
            </span>
          </div>

        </div>
      </footer>

    </main>
  );
}
