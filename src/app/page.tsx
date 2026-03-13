import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Coffee, Sparkles } from "lucide-react";
import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";
import BookCard from "@/src/components/BookCard";
import RandomCoffeeThought from "@/src/components/RandomCoffeeThought";

export const metadata: Metadata = {
  title: "Kelas Pekerja — Arsip Sunyi Orang-Orang yang Tetap Bekerja",
  description:
    "Catatan tentang malam, kopi, dan kehidupan. Ditulis perlahan, untuk dibaca perlahan.",
};

export const revalidate = 3600;

export default async function HomePage() {
  const [featuredBooks, configData, allBooks] = await Promise.all([
    getFeaturedBooks(2),
    getConfig(),
    getBooks({ limit: 4 }),
  ]);

  const config: any = configData;

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section dengan Background Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        {/* Background Image dengan Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/30266551/pexels-photo-30266551/free-photo-of-cozy-autumn-coffee-with-old-books-and-music.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1920')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1816]/80 via-[#1a1816]/60 to-[#1a1816]/90 backdrop-blur-[2px]" />
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#8b7355]/20 rounded-full animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${6 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge dengan animasi fade in */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-[#8b7355]/30 bg-[#1a1816]/50 backdrop-blur-sm animate-fade-in-up">
            <Sparkles size={14} className="text-[#8b7355] animate-pulse-slow" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#e8e0d5]/80">
              Sebuah Buku Oleh
            </p>
          </div>

          {/* Judul dengan animasi stagger */}
          <div className="space-y-2 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.95] tracking-tight">
              <span className="block text-[#e8e0d5] drop-shadow-2xl">
                Kelas Pekerja
              </span>
              <span className="block italic text-[#c4a77d] text-3xl md:text-5xl mt-4 font-light tracking-wide">
                Arsip Sunyi Orang-Orang 
                <span className="block mt-1">yang Tetap Bekerja</span>
              </span>
            </h1>
          </div>

          {/* Quote dengan animasi */}
          <div className="relative max-w-lg mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-[#8b7355]/20 font-serif">"</div>
            <p className="font-serif italic text-lg md:text-xl text-[#e8e0d5]/80 leading-relaxed pt-4">
              {config?.site?.tagline || "Catatan tentang malam, kopi, dan kehidupan"}
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#8b7355]/50 to-transparent mx-auto mt-6" />
          </div>

          {/* Buttons dengan hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Link
              href="/buku"
              className="group inline-flex items-center gap-3 px-8 py-4 
              bg-[#8b7355] text-white rounded-full 
              hover:bg-[#a08060] hover:scale-105 hover:shadow-lg hover:shadow-[#8b7355]/20
              transition-all duration-500 ease-out text-sm tracking-wider font-medium"
            >
              <BookOpen size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              Jelajahi Buku
              <ArrowRight size={16} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </Link>

            <Link
              href="/tentang"
              className="group inline-flex items-center gap-3 px-8 py-4 
              border border-[#e8e0d5]/30 text-[#e8e0d5] rounded-full
              hover:bg-[#e8e0d5]/10 hover:border-[#e8e0d5]/50 hover:scale-105
              transition-all duration-500 ease-out text-sm tracking-wider backdrop-blur-sm"
            >
              Tentang Kami
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
            <div className="w-6 h-10 border-2 border-[#8b7355]/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-[#8b7355]/60 rounded-full animate-scroll-indicator" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section dengan layout lebih rapi */}
      <section className="py-32 px-6 relative bg-[#0f0e0d]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left decorative line */}
            <div className="hidden md:block md:col-span-2">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#8b7355]/40 to-transparent mx-auto" />
            </div>

            <div className="md:col-span-8 text-center">
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-px bg-[#8b7355]/40" />
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#8b7355]/60">
                  Tentang
                </p>
                <div className="w-8 h-px bg-[#8b7355]/40" />
              </div>

              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8 text-[#e8e0d5]">
                Ini bukan buku motivasi.
                <span className="block italic text-[#8b7355]/70 mt-2 text-3xl md:text-4xl">
                  Ini bukan panduan hidup.
                </span>
              </h2>

              <div className="space-y-6 text-[16px] leading-[2] text-[#e8e0d5]/60 max-w-2xl mx-auto">
                <p className="hover:text-[#e8e0d5]/80 transition-colors duration-300">
                  Ini adalah catatan-catatan dari seseorang yang masih belajar
                  hadir—untuk dirinya sendiri, untuk orang-orang yang ia cintai,
                  untuk hari-hari yang kadang terlalu berat untuk dilalui sendirian.
                </p>

                <p className="hover:text-[#e8e0d5]/80 transition-colors duration-300">
                  Ditulis dalam keheningan malam, di sudut kedai kopi yang hampir
                  tutup, di antara lagu-lagu yang terlalu jujur untuk didengar
                  sendirian.
                </p>
              </div>

              <div className="mt-16 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#8b7355]/20 to-transparent" />
                </div>
                <p className="relative inline-block font-serif italic text-[#8b7355] text-xl px-8 bg-[#0f0e0d]">
                  "{config?.author?.manifesto || "Tetap hadir, tetap bekerja, tetap hidup."}"
                </p>
              </div>
            </div>

            <div className="hidden md:block md:col-span-2">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#8b7355]/40 to-transparent mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section dengan card layout yang lebih premium */}
      <section className="py-32 px-6 relative bg-[#141312]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header yang lebih rapi */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8">
            <div className="max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-[#8b7355]" />
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#8b7355]/60">
                  Pilihan Editor
                </p>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl text-[#e8e0d5] mb-4">
                Buku Unggulan
              </h3>
              <p className="text-[15px] text-[#e8e0d5]/50 leading-relaxed">
                Dua buku yang paling banyak membantu pembaca menemukan makna
                dalam keheningan.
              </p>
            </div>

            <Link
              href="/buku"
              className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-[#8b7355]/60 hover:text-[#8b7355] transition-colors duration-300"
            >
              Lihat Semua Buku
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Book Grid dengan gap yang lebih besar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {featuredBooks?.books?.map((book: any, index: number) => (
              <div 
                key={book.id} 
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#8b7355]/0 via-[#8b7355]/5 to-[#8b7355]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <BookCard book={book} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <RandomCoffeeThought />

      {/* Stats Section dengan design lebih modern */}
      <section className="py-24 px-6 relative bg-[#0f0e0d] border-y border-[#8b7355]/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: allBooks?.total || 0, label: "Buku", suffix: "" },
              { value: 44, label: "Catatan", suffix: "" },
              { value: 2.5, label: "Pembaca", suffix: "k+" },
              { value: "∞", label: "Kopi", suffix: "" },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group text-center p-6 rounded-2xl hover:bg-[#8b7355]/5 transition-all duration-500"
              >
                <div className="text-4xl md:text-5xl font-serif text-[#8b7355] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {typeof stat.value === 'number' && stat.value % 1 !== 0 ? stat.value.toFixed(1) : stat.value}
                  <span className="text-2xl md:text-3xl text-[#8b7355]/60">{stat.suffix}</span>
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#e8e0d5]/40 group-hover:text-[#e8e0d5]/60 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section dengan gradient background */}
      <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#141312] to-[#0f0e0d]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#8b7355]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8b7355]/5 rounded-full blur-3xl" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8b7355]/10 mb-8 group-hover:scale-110 transition-transform duration-500">
            <Coffee className="w-8 h-8 text-[#8b7355]" />
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-[#e8e0d5] mb-4 leading-tight">
            Siap untuk menemani harimu?
          </h3>
          
          <p className="text-[15px] text-[#e8e0d5]/50 mb-10 max-w-md mx-auto leading-relaxed">
            Mulai dengan buku pertama, atau dapatkan inspirasi random dari
            catatan kami.
          </p>

          <Link
            href="/buku"
            className="group inline-flex items-center gap-3 px-10 py-5 
            bg-[#8b7355] text-white rounded-full
            hover:bg-[#9a8265] hover:scale-105 hover:shadow-xl hover:shadow-[#8b7355]/20
            transition-all duration-500 ease-out text-sm tracking-wider font-medium"
          >
            <BookOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            Mulai Membaca
          </Link>
        </div>
      </section>

      {/* Tambahkan CSS untuk animasi custom */}
      <style jsx global>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          33% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          66% { transform: translateY(10px) translateX(-10px); opacity: 0.3; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        
        @keyframes scroll-indicator {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-scroll-indicator {
          animation: scroll-indicator 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
