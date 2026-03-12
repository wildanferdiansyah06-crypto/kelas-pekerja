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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
};

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c] text-neutral-200 selection:bg-neutral-700 selection:text-white">

      {/* HERO */}
      <section className="py-28 px-6 text-center border-b border-neutral-900">
        <div className="max-w-2xl mx-auto">

          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase opacity-40 mb-4">
              Tentang
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-serif text-5xl md:text-6xl mb-6 text-white">
              Kelas Pekerja
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-lg opacity-60 leading-relaxed">
              Sebuah ruang sunyi untuk mencatat kehidupan yang berjalan pelan.
              Catatan tentang kerja, kopi, dan hari-hari yang sering terasa biasa,
              tetapi sebenarnya penuh makna.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-white">
              Asal Muasal
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg leading-[1.9] opacity-70 mb-6">
              Tempat ini lahir dari kegelisahan sederhana yang sering datang di
              malam-malam sunyi. Sebuah perasaan bahwa begitu banyak orang
              bekerja setiap hari, menjalani hidupnya dengan tenang,
              tetapi kisah mereka hampir tidak pernah dituliskan.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-lg leading-[1.9] opacity-70 mb-6">
              Kita hidup di dunia yang terlalu sering merayakan pencapaian
              besar. Padahal kehidupan juga terjadi di ruang-ruang kecil:
              di balik meja kerja, di perjalanan pulang yang panjang,
              di antara tegukan kopi yang perlahan mendingin.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-lg leading-[1.9] opacity-70 mb-10">
              Kelas Pekerja lahir dari keyakinan sederhana bahwa setiap
              kehidupan—seberapa biasa pun—mengandung keindahan yang patut
              disimpan.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <blockquote className="border-l-2 border-[#8b7355] pl-6 italic font-serif text-xl text-[#c7b299] leading-relaxed">
              Karena terkadang, yang paling sederhana justru yang paling dekat
              dengan kebenaran hidup.
            </blockquote>
          </ScrollReveal>

        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto text-center">

          <ScrollReveal>
            <h2 className="font-serif text-3xl mb-10 text-white">
              Filosofi
            </h2>
          </ScrollReveal>

          <div className="space-y-8 text-lg opacity-70 leading-[1.9]">

            <ScrollReveal delay={100}>
              <p>
                Kami percaya bahwa kehidupan sederhana juga layak untuk
                dicatat. Bahwa menulis bukan hanya milik penulis besar,
                tetapi milik siapa saja yang mencoba memahami hidupnya sendiri.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p>
                Tidak semua tulisan harus mengubah dunia. Kadang tulisan hanya
                perlu menemani seseorang melewati malam yang panjang.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p>
                Jika seseorang membaca tulisan di sini dan merasa hidupnya
                sedikit lebih dimengerti, maka tempat kecil ini sudah
                menjalankan tugasnya.
              </p>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          <span className="text-xs tracking-[0.3em] uppercase text-neutral-600">
            Kelas Pekerja © {new Date().getFullYear()}
          </span>

          <div className="flex gap-8 text-xs tracking-wider text-neutral-600">
            <span className="hover:text-neutral-400 transition cursor-pointer">
              Arsip
            </span>
            <span className="hover:text-neutral-400 transition cursor-pointer">
              Kirim Tulisan
            </span>
            <span className="hover:text-neutral-400 transition cursor-pointer">
              Kontak
            </span>
          </div>

        </div>
      </footer>

    </main>
  );
}
