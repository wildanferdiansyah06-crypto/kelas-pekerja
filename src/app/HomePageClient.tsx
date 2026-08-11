"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PenLine, Coffee, Sparkles } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

function getRelativeTime(dateString: string, lang: 'id' | 'en' = 'id'): string {
  try {
    if (!dateString) return lang === 'en' ? "Unknown date" : "Tanggal tidak diketahui";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return lang === 'en' ? "Invalid date" : "Tanggal tidak valid";
    
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return lang === 'en' ? "Today" : "Hari ini";
    if (diffInDays === 1) return lang === 'en' ? "Yesterday" : "Kemarin";
    if (diffInDays < 7) return lang === 'en' ? `${diffInDays} days ago` : `${diffInDays} hari lalu`;
    if (diffInDays < 30) return lang === 'en' ? `${Math.floor(diffInDays / 7)} weeks ago` : `${Math.floor(diffInDays / 7)} minggu lalu`;
    return lang === 'en' ? `${Math.floor(diffInDays / 30)} months ago` : `${Math.floor(diffInDays / 30)} bulan lalu`;
  } catch {
    return lang === 'en' ? "Unknown date" : "Tanggal tidak diketahui";
  }
}

interface HomePageClientProps {
  featuredBooks: any[];
  latestBooks: any[];
  mostRelatable: any[];
}

// ─── Time-based mood engine ───────────────────────────────────────────────────
type TimeSlot = 'subuh' | 'pagi' | 'siang' | 'sore' | 'malam' | 'dini';

interface TimeContext {
  slot: TimeSlot;
  greeting: { id: string; en: string };
  heroLines: { line1: { id: string; en: string }; line2: { id: string; en: string }; line3: { id: string; en: string } };
  subtitle: { id: string; en: string };
  badge: { id: string; en: string };
  featuredLabel: { id: string; en: string };
  featuredDesc: { id: string; en: string };
  latestLabel: { id: string; en: string };
  latestDesc: { id: string; en: string };
  relatableLabel: { id: string; en: string };
  relatableDesc: { id: string; en: string };
  ctaTitle: { id: string; en: string };
  ctaDesc: { id: string; en: string };
  moodCategories: string[]; // book categories to prioritize
}

function getTimeContext(hour: number): TimeContext {
  if (hour >= 4 && hour < 8) {
    return {
      slot: 'subuh',
      greeting: { id: 'Selamat subuh', en: 'Early morning' },
      heroLines: {
        line1: { id: 'Masih gelap.', en: 'Still dark.' },
        line2: { id: 'Kamu sudah bergerak.', en: 'You\'re already moving.' },
        line3: { id: 'Dan itu cukup.', en: 'That\'s enough.' },
      },
      subtitle: { id: 'Untuk yang berangkat sebelum matahari sempat menyapa — kamu tidak sendirian.', en: 'For those who leave before the sun has a chance to greet you — you\'re not alone.' },
      badge: { id: 'Subuh bersama kelas pekerja', en: 'Dawn with the working class' },
      featuredLabel: { id: 'Untuk perjalanan berangkat', en: 'For the morning commute' },
      featuredDesc: { id: 'Kata-kata yang menemani langkah pertama hari ini.', en: 'Words to accompany your first steps of the day.' },
      latestLabel: { id: 'Baru terseduh', en: 'Freshly brewed' },
      latestDesc: { id: 'Paling pas dibaca di kereta, bus, atau sambil menunggu kendaraan.', en: 'Best read on the train, bus, or while waiting for your ride.' },
      relatableLabel: { id: 'Paling banyak dirasa', en: 'Most deeply felt' },
      relatableDesc: { id: 'Tulisan yang menyentuh bagian dalam — bahkan di pagi yang masih gelap.', en: 'Writing that touches something deep, even in the darkness of early morning.' },
      ctaTitle: { id: 'Ada cerita dari pagi-pagi kamu?', en: 'Got a story from your early morning?' },
      ctaDesc: { id: 'Tulis apa yang kamu rasakan sebelum dunia terbangun. Kami mendengarkan.', en: 'Write what you feel before the world wakes up. We\'re listening.' },
      moodCategories: ['kehidupan', 'proses', 'refleksi'],
    };
  }
  if (hour >= 8 && hour < 12) {
    return {
      slot: 'pagi',
      greeting: { id: 'Selamat pagi', en: 'Good morning' },
      heroLines: {
        line1: { id: 'Rutinitas dimulai.', en: 'The routine begins.' },
        line2: { id: 'Di sela-selanya,', en: 'In between,' },
        line3: { id: 'ada makna tersembunyi.', en: 'meaning hides.' },
      },
      subtitle: { id: 'Bacaan ringan untuk pagi yang padat — karena makna tidak selalu butuh banyak waktu.', en: 'Light reading for a busy morning — because meaning doesn\'t always need much time.' },
      badge: { id: 'Pagi yang bermakna', en: 'A meaningful morning' },
      featuredLabel: { id: 'Pilihan untuk pagi ini', en: 'This morning\'s picks' },
      featuredDesc: { id: 'Karya yang bisa selesai sebelum meeting pertama.', en: 'Work that can be finished before your first meeting.' },
      latestLabel: { id: 'Terbaru dari arsip', en: 'Latest from the archive' },
      latestDesc: { id: 'Tulisan segar dari sesama pekerja — untuk dibaca kapanpun kamu punya jeda.', en: 'Fresh writing from fellow workers — for whenever you find a break.' },
      relatableLabel: { id: 'Paling banyak dirasa', en: 'Most deeply felt' },
      relatableDesc: { id: 'Cerita yang mungkin sudah pernah kamu alami, tapi belum pernah kamu ceritakan.', en: 'Stories you may have lived through but never told.' },
      ctaTitle: { id: 'Ceritakan pagimu', en: 'Tell us about your morning' },
      ctaDesc: { id: 'Ada momen di pagi ini yang layak diabadikan? Tuliskan di sini.', en: 'Is there a moment from this morning worth preserving? Write it here.' },
      moodCategories: ['proses', 'kehidupan', 'cerita'],
    };
  }
  if (hour >= 12 && hour < 15) {
    return {
      slot: 'siang',
      greeting: { id: 'Selamat siang', en: 'Good afternoon' },
      heroLines: {
        line1: { id: 'Setengah hari terlewat.', en: 'Half a day gone.' },
        line2: { id: 'Sejenak berhenti,', en: 'Pause for a moment,' },
        line3: { id: 'lalu lanjutkan.', en: 'then carry on.' },
      },
      subtitle: { id: 'Di tengah hiruk-pikuk siang — sebait cerita bisa jadi jeda yang paling kamu butuhkan.', en: 'In the middle of the midday bustle — a few sentences might be exactly the break you need.' },
      badge: { id: 'Jeda siang literasi', en: 'Midday reading break' },
      featuredLabel: { id: 'Untuk istirahat siangmu', en: 'For your lunch break' },
      featuredDesc: { id: 'Bacaan yang menemani makan siang atau jeda sejenak dari rutinitas.', en: 'Reading to accompany lunch or a brief escape from the routine.' },
      latestLabel: { id: 'Tulisan terbaru', en: 'Latest writings' },
      latestDesc: { id: 'Cerita dari mereka yang juga sedang menyeduh kopi siang ini.', en: 'Stories from those who are also brewing afternoon coffee right now.' },
      relatableLabel: { id: 'Paling banyak dirasa', en: 'Most deeply felt' },
      relatableDesc: { id: 'Bukan karena ramai. Tapi karena menyentuh bagian dalam yang sama.', en: 'Not because of the noise. But because it touches the same place inside.' },
      ctaTitle: { id: 'Istirahat siang dengan menulis', en: 'Spend lunch break writing' },
      ctaDesc: { id: 'Kadang cerita terbaik lahir di sela-sela istirahat yang sebentar.', en: 'Sometimes the best stories are born in brief moments of rest.' },
      moodCategories: ['cerita', 'kehidupan', 'renungan'],
    };
  }
  if (hour >= 15 && hour < 19) {
    return {
      slot: 'sore',
      greeting: { id: 'Selamat sore', en: 'Good evening' },
      heroLines: {
        line1: { id: 'Perjalanan pulang', en: 'The way home' },
        line2: { id: 'selalu lebih panjang', en: 'always feels longer' },
        line3: { id: 'dari yang kita kira.', en: 'than we think.' },
      },
      subtitle: { id: 'Untuk yang sedang dalam perjalanan pulang — sambil membawa lebih banyak dari sekadar tas.', en: 'For those on the way home — carrying more than just a bag.' },
      badge: { id: 'Sore di perjalanan', en: 'Evening commute' },
      featuredLabel: { id: 'Menemani perjalananmu', en: 'Accompanying your journey' },
      featuredDesc: { id: 'Tulisan yang enak dibaca sambil melaju — di bus, kereta, atau sekadar menunggu.', en: 'Writing that reads well on the move — on a bus, train, or just waiting.' },
      latestLabel: { id: 'Sore ini di arsip', en: 'This evening in the archive' },
      latestDesc: { id: 'Cerita-cerita baru yang mungkin mencerminkan perjalanan sore ini.', en: 'New stories that might mirror this evening\'s journey.' },
      relatableLabel: { id: 'Paling banyak dirasa', en: 'Most deeply felt' },
      relatableDesc: { id: 'Kata-kata yang pernah membuat orang berhenti sejenak di perjalanan pulang.', en: 'Words that have made people pause on their way home.' },
      ctaTitle: { id: 'Apa yang kamu bawa pulang hari ini?', en: 'What are you bringing home today?' },
      ctaDesc: { id: 'Bukan hanya barang bawaan. Tapi cerita, rasa lelah, atau momen kecil yang terlupakan.', en: 'Not just belongings. But stories, exhaustion, or small forgotten moments.' },
      moodCategories: ['refleksi', 'cerita', 'filosofi'],
    };
  }
  if (hour >= 19 && hour < 23) {
    return {
      slot: 'malam',
      greeting: { id: 'Selamat malam', en: 'Good night' },
      heroLines: {
        line1: { id: 'Hari ini sudah selesai.', en: 'Today is done.' },
        line2: { id: 'Tapi masih ada', en: 'But there\'s still' },
        line3: { id: 'yang belum terucap.', en: 'what\'s left unspoken.' },
      },
      subtitle: { id: 'Di bawah lampu yang mulai redup — ada cerita yang menunggu untuk didengar.', en: 'Under the dimming lights — there are stories waiting to be heard.' },
      badge: { id: 'Arsip sunyi malam', en: 'Night\'s quiet archive' },
      featuredLabel: { id: 'Untuk malam ini', en: 'For tonight' },
      featuredDesc: { id: 'Tulisan terpilih yang paling pas dibaca saat dunia mulai sunyi.', en: 'Selected writing best read when the world begins to quiet down.' },
      latestLabel: { id: 'Baru ditulis', en: 'Freshly written' },
      latestDesc: { id: 'Cerita yang lahir dari malam-malam seperti malam ini.', en: 'Stories born from nights just like this one.' },
      relatableLabel: { id: 'Paling banyak dirasa', en: 'Most deeply felt' },
      relatableDesc: { id: 'Kata-kata yang membuat banyak orang terdiam sejenak di tengah malam.', en: 'Words that made many people pause in the middle of the night.' },
      ctaTitle: { id: 'Rasa lelah yang tidak sempat diceritakan', en: 'Exhaustion that never found words' },
      ctaDesc: { id: 'Sebelum tidur, tuliskan satu hal yang ingin kamu ceritakan. Kami membaca.', en: 'Before you sleep, write one thing you\'ve been wanting to say. We\'ll read it.' },
      moodCategories: ['renungan', 'refleksi', 'filosofi'],
    };
  }
  // dini hari: 23:00 – 04:00
  return {
    slot: 'dini',
    greeting: { id: 'Masih terjaga', en: 'Still awake' },
    heroLines: {
      line1: { id: 'Dini hari membawa', en: 'The small hours carry' },
      line2: { id: 'kejujuran', en: 'an honesty' },
      line3: { id: 'yang siang tak berani.', en: 'daylight doesn\'t dare.' },
    },
    subtitle: { id: 'Untuk yang masih terjaga — karena dini hari punya kejujuran yang siang tak berani.', en: 'For those still awake — because the small hours hold a truth that daylight doesn\'t dare.' },
    badge: { id: 'Dini hari di arsip sunyi', en: 'Small hours in the quiet archive' },
    featuredLabel: { id: 'Untuk yang masih terjaga', en: 'For the still-awake' },
    featuredDesc: { id: 'Tulisan yang hanya bisa benar-benar dipahami di jam seperti ini.', en: 'Writing that can only truly be understood at an hour like this.' },
    latestLabel: { id: 'Suara dari keheningan', en: 'Voices from the silence' },
    latestDesc: { id: 'Cerita-cerita yang paling sunyi — untuk malam yang paling panjang.', en: 'The quietest stories — for the longest nights.' },
    relatableLabel: { id: 'Paling banyak dirasa', en: 'Most deeply felt' },
    relatableDesc: { id: 'Kata-kata yang tetap terasa bahkan saat semua orang lain sudah tidur.', en: 'Words that still resonate even when everyone else is asleep.' },
    ctaTitle: { id: 'Ada yang ingin kamu tulis malam ini?', en: 'Something you want to write tonight?' },
    ctaDesc: { id: 'Dini hari adalah waktu paling jujur untuk menulis. Kami ada di sini.', en: 'The small hours are the most honest time to write. We\'re here.' },
    moodCategories: ['filosofi', 'renungan', 'refleksi'],
  };
}

export default function HomePageClient({
  featuredBooks = [],
  latestBooks = [],
  mostRelatable = []
}: HomePageClientProps) {
  const { language, t } = useLanguage();

  // Compute time context once on mount — stable per visit
  const timeCtx = React.useMemo(() => {
    const hour = new Date().getHours();
    return getTimeContext(hour);
  }, []);

  const id = language === 'id';


  if (!featuredBooks.length && !latestBooks.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center glass-card p-12 rounded-2xl">
          <p className="text-red-400 mb-4 font-ui">Terjadi kesalahan pada halaman</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full font-ui text-sm font-medium transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
              color: '#0a0908',
            }}
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      
      {/* Decorative Particle Elements */}
      <div className="absolute top-[20%] left-[10%] animate-firefly particle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[25%] right-[20%] animate-firefly particle" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-[40%] left-[30%] animate-firefly particle" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-[15%] right-[10%] animate-firefly particle" style={{ animationDelay: '0.8s' }} />
      
      {/* HERO SECTION - Midnight Library Vibe */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/30266551/pexels-photo-30266551/free-photo-of-cozy-autumn-coffee-with-old-books-and-music.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1920"
            alt="Hero background"
            fill
            priority
            className="object-cover object-center animate-breathe transform scale-105"
          />
          {/* Multi-layered cinematic gradient */}
          <div className="absolute inset-0" 
               style={{ 
                 background: 'linear-gradient(145deg, rgba(10, 9, 8, 0.95) 0%, rgba(19, 17, 16, 0.8) 50%, rgba(26, 23, 20, 0.95) 100%)' 
               }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[rgba(10,9,8,0.5)] to-[rgba(10,9,8,1)]" />
          {/* Bottom fade out to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--kp-bg-base)] via-[rgba(10,9,8,0.8)] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 w-full pt-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Left side - Typography */}
            <div className="flex-1 max-w-2xl text-center md:text-left">
              {/* Animated Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium mb-8 font-ui animate-fade-in-up glow-amber glass"
                style={{ 
                  color: 'var(--kp-accent)', 
                  borderColor: 'rgba(212, 165, 116, 0.2)' 
                }}
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>{id ? timeCtx.badge.id : timeCtx.badge.en}</span>
              </div>

              {/* Cinematic Heading */}
              <h1 className="typography-h1 mb-6 animate-slide-in-up delay-100" style={{ color: 'var(--kp-text-primary)' }}>
                <span className="block animate-text-reveal">{id ? timeCtx.heroLines.line1.id : timeCtx.heroLines.line1.en}</span>
                <span className="block animate-text-reveal" style={{ animationDelay: '0.4s' }}>{id ? timeCtx.heroLines.line2.id : timeCtx.heroLines.line2.en}</span>
                <span className="block italic text-glow animate-text-reveal" style={{ color: 'var(--kp-accent)', animationDelay: '0.8s' }}>{id ? timeCtx.heroLines.line3.id : timeCtx.heroLines.line3.en}</span>
              </h1>

              {/* Subtext */}
              <p className="font-serif text-lg sm:text-xl lg:text-2xl mb-10 leading-relaxed max-w-lg mx-auto md:mx-0 animate-fade-in-up delay-300 text-balance opacity-80" 
                 style={{ color: 'var(--kp-text-secondary)' }}>
                {id ? timeCtx.subtitle.id : timeCtx.subtitle.en}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start animate-fade-in-up delay-500">
                <Link
                  href="/buku"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-ui text-sm font-semibold transition-all duration-400 text-center flex items-center justify-center gap-2 group"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)', 
                    color: '#0a0908',
                    boxShadow: '0 0 20px rgba(212, 165, 116, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(212, 165, 116, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {t.booksPage.startReading}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/tentang"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full border font-ui text-sm font-medium transition-all duration-400 text-center glass hover:bg-[rgba(212,165,116,0.1)]" 
                  style={{ 
                    borderColor: 'rgba(212, 165, 116, 0.3)', 
                    color: 'var(--kp-text-primary)' 
                  }}
                >
                  {t.nav.about}
                </Link>
              </div>
            </div>
            
            {/* Right side - Abstract Visual/Book representation */}
            <Link href="/buku" className="hidden lg:block relative w-full max-w-sm aspect-[3/4] animate-float-slow delay-700 group">
              <div className="absolute inset-0 rounded-2xl glass-card overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(212,165,116,0.3)] group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,165,116,0.15)] to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full border border-[rgba(212,165,116,0.3)] flex items-center justify-center mb-6 glow-amber group-hover:scale-110 transition-transform duration-300">
                    <PenLine size={24} style={{ color: 'var(--kp-accent)' }} />
                  </div>
                  <h3 className="font-display text-2xl italic mb-4" style={{ color: 'var(--kp-text-primary)' }}>{language === 'en' ? 'Silent Archive' : 'Arsip Sunyi'}</h3>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--kp-accent)] to-transparent mb-4 opacity-50" />
                  <p className="font-body text-sm" style={{ color: 'var(--kp-text-muted)' }}>{t.footer.description}</p>
                </div>
                {/* Simulated pages edge effect */}
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-l from-[rgba(255,255,255,0.1)] to-transparent" />
                <div className="absolute top-0 right-1 bottom-0 w-[1px] bg-[rgba(255,255,255,0.05)]" />
                <div className="absolute top-0 right-3 bottom-0 w-[1px] bg-[rgba(255,255,255,0.05)]" />
              </div>
              <div className="absolute -inset-4 rounded-[2rem] border border-[rgba(212,165,116,0.1)] blur-[1px] -z-10 animate-glow-pulse group-hover:border-[rgba(212,165,116,0.3)] transition-colors duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* INI TEMPAT APA? - The Philosophy Section */}
      <section className="py-24 sm:py-32 px-6 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(212,165,116,0.03)] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div
            className="font-ui text-xs font-medium tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--kp-accent)' }}
          >
            Ini Tempat Apa?
          </div>

          <h2
            className="typography-h2 mb-10"
            style={{ color: 'var(--kp-text-primary)' }}
          >
            Bukan tentang pencapaian puncak.
            <br />
            <em className="text-glow" style={{ color: 'var(--kp-accent)' }}>Ini tentang perjalanan yang tak terhitung.</em>
          </h2>

          <div className="space-y-6 font-body text-lg md:text-xl leading-relaxed text-balance" style={{ color: 'var(--kp-text-secondary)' }}>
            <p className="opacity-80">Bangun pagi saat dunia masih terbungkus kabut.</p>
            <p className="opacity-80">Pulang malam dengan bayangan semakin panjang.</p>
            <p className="text-xl md:text-2xl mt-8 italic" style={{ color: 'var(--kp-text-primary)' }}>Dan hal-hal yang hanya bisa diucapkan dalam keheningan.</p>
          </div>

          <div className="mt-16 flex justify-center items-center gap-6">
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[var(--kp-accent)] opacity-40" />
            <Coffee size={24} style={{ color: 'var(--kp-accent)' }} className="opacity-80 drop-shadow-[0_0_8px_rgba(212,165,116,0.5)]" />
            <div className="w-32 h-[1px] bg-gradient-to-l from-transparent to-[var(--kp-accent)] opacity-40" />
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS - Spotlight Showcase */}
      {featuredBooks.length > 0 && (
        <section className="py-24 sm:py-32 px-6 relative">
          {/* Subtle separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.2)] to-transparent" />
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <div
                className="font-ui text-xs font-medium tracking-[0.3em] uppercase mb-4"
                style={{ color: 'var(--kp-text-muted)' }}
              >
                {id ? timeCtx.featuredLabel.id : timeCtx.featuredLabel.en}
              </div>
              <h3
                className="typography-h2 mb-4"
                style={{ color: 'var(--kp-text-primary)' }}
              >
                {id ? 'Buku Unggulan' : 'Featured Books'}
              </h3>
              <p className="font-body text-lg opacity-80" style={{ color: 'var(--kp-text-secondary)' }}>
                {id ? timeCtx.featuredDesc.id : timeCtx.featuredDesc.en}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {featuredBooks.map((book, index) => (
                <article key={book?.id || `featured-${index}`} className="group cursor-pointer">
                  <Link href={`/buku/${book?.slug || '#'}`} className="block h-full">
                    <div
                      className="glass-card rounded-2xl overflow-hidden h-full flex flex-col"
                    >
                      {book?.cover && (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <div className="absolute inset-0 bg-[rgba(10,9,8,0.2)] group-hover:bg-transparent transition-colors duration-500 z-10" />
                          <Image
                            src={book.cover}
                            alt={book?.title || 'Book cover'}
                            width={800}
                            height={500}
                            className="w-full h-full object-cover transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {/* Inner shadow overlay */}
                          <div className="absolute inset-0 shadow-[inset_0_-40px_40px_-20px_rgba(10,9,8,0.9)] z-20 pointer-events-none" />
                        </div>
                      )}

                      <div className="p-8 lg:p-10 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                          <span
                            className="font-ui text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border"
                            style={{
                              color: 'var(--kp-accent)',
                              borderColor: 'rgba(212, 165, 116, 0.2)',
                              background: 'rgba(212, 165, 116, 0.05)',
                            }}
                          >
                            {book?.category || 'Umum'}
                          </span>
                          <span className="font-ui text-xs opacity-70" style={{ color: 'var(--kp-text-muted)' }}>
                            {book?.readTime || '5 menit'}
                          </span>
                        </div>

                        <h4
                          className="font-display text-3xl mb-4 group-hover:text-glow transition-all duration-300"
                          style={{ color: 'var(--kp-text-primary)' }}
                        >
                          {book?.title || 'Tanpa Judul'}
                        </h4>

                        <p className="font-body text-base lg:text-lg leading-relaxed line-clamp-2 opacity-80 mb-6 flex-1" style={{ color: 'var(--kp-text-secondary)' }}>
                          {book?.subtitle || book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-auto font-ui text-sm font-medium transition-colors"
                             style={{ color: 'var(--kp-text-muted)' }}>
                          <span className="group-hover:text-[var(--kp-accent)] transition-colors duration-300">Baca Kisahnya</span>
                          <ArrowRight size={16} className="group-hover:translate-x-2 group-hover:text-[var(--kp-accent)] transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TULISAN TERBARU */}
      <section className="py-24 sm:py-32 px-6 relative" style={{ backgroundColor: 'var(--kp-bg-surface)' }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4a574\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 md:flex md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div
                className="font-ui text-xs font-medium tracking-[0.3em] uppercase mb-4"
                style={{ color: 'var(--kp-text-muted)' }}
              >
                {id ? timeCtx.latestLabel.id : timeCtx.latestLabel.en}
              </div>
              <h3
                className="typography-h2 mb-4"
                style={{ color: 'var(--kp-text-primary)' }}
              >
                {id ? 'Jejak-jejak yang baru tertinggal.' : 'Traces freshly left behind.'}
              </h3>
              <p className="font-body text-lg opacity-80" style={{ color: 'var(--kp-text-secondary)' }}>
                {id ? timeCtx.latestDesc.id : timeCtx.latestDesc.en}
              </p>
            </div>
            
            <Link
              href="/buku"
              className="hidden md:inline-flex items-center gap-2 text-sm font-ui tracking-widest uppercase transition-all duration-300 group"
              style={{ color: 'var(--kp-accent)' }}
            >
              <span className="group-hover:text-glow">Lihat Semua</span>
              <ArrowRight size={16} className="group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestBooks.map((book, index) => (
              <article key={book?.id || `latest-${index}`} className="group cursor-pointer">
                <Link href={`/buku/${book?.slug || '#'}`} className="block h-full">
                  <div
                    className="glass-card rounded-2xl p-8 h-full flex flex-col relative overflow-hidden"
                  >
                    {/* Hover glow effect behind content */}
                    <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(212,165,116,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none scale-50 group-hover:scale-100" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <span
                          className="font-ui text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded border"
                          style={{
                            color: 'var(--kp-accent)',
                            borderColor: 'rgba(212, 165, 116, 0.2)',
                            background: 'rgba(212, 165, 116, 0.05)',
                          }}
                        >
                          {book?.category || 'Umum'}
                        </span>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--kp-border-strong)' }}></div>
                        <span className="font-ui text-xs" style={{ color: 'var(--kp-text-muted)' }}>
                          {getRelativeTime(book?.publishedAt || new Date().toISOString())}
                        </span>
                      </div>

                      <h4
                        className="font-display text-2xl mb-4 group-hover:text-glow transition-colors duration-300"
                        style={{ color: 'var(--kp-text-primary)' }}
                      >
                        {book?.title || 'Tanpa Judul'}
                      </h4>

                      <p className="font-body text-base leading-relaxed line-clamp-3 opacity-70 mb-8 flex-1" style={{ color: 'var(--kp-text-secondary)' }}>
                        {book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--kp-border-medium)' }}>
                        <div className="flex items-center gap-2 text-xs font-ui font-medium transition-colors duration-300" 
                             style={{ color: 'var(--kp-text-muted)' }}>
                          <span className="group-hover:text-[var(--kp-accent)]">Mulai Membaca</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:bg-[rgba(212,165,116,0.1)] group-hover:border-[rgba(212,165,116,0.3)] transition-all duration-300"
                             style={{ borderColor: 'var(--kp-border)' }}>
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 group-hover:text-[var(--kp-accent)] transition-transform" style={{ color: 'var(--kp-text-muted)' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/buku"
              className="inline-flex items-center gap-2 text-sm font-ui tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'var(--kp-accent)' }}
            >
              Lihat Semua Tulisan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PALING BANYAK DIRASA */}
      <section className="py-24 sm:py-32 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[rgba(212,165,116,0.02)] to-transparent pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-1/3 h-full bg-gradient-to-r from-[rgba(212,165,116,0.02)] to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 text-center">
            <div
              className="font-ui text-xs font-medium tracking-[0.3em] uppercase mb-4 glow-amber inline-block px-4 py-1.5 rounded-full border glass"
              style={{ color: 'var(--kp-accent)', borderColor: 'rgba(212, 165, 116, 0.2)' }}
            >
              {id ? timeCtx.relatableLabel.id : timeCtx.relatableLabel.en}
            </div>
            <h3
              className="typography-h2 mb-4"
              style={{ color: 'var(--kp-text-primary)' }}
            >
              {id ? 'Kata-kata yang membuat banyak orang terdiam sejenak.' : 'Words that made many people pause.'}
            </h3>
            <p className="font-body text-lg opacity-80" style={{ color: 'var(--kp-text-secondary)' }}>
              {id ? timeCtx.relatableDesc.id : timeCtx.relatableDesc.en}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mostRelatable.length > 0 ? mostRelatable.map((book, index) => (
              <article key={book?.id || `relatable-${index}`} className={`group cursor-pointer relative ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <Link href={`/buku/${book?.slug || '#'}`} className="block h-full">
                  <div
                    className={`glass-card rounded-2xl h-full flex flex-col border transition-all duration-500 overflow-hidden ${index === 0 ? 'p-10 lg:p-16' : 'p-8 pt-12'}`}
                  >
                    {/* Label Paling Dibaca */}
                    {index === 0 && (
                      <div className="absolute top-6 right-6">
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--kp-accent)' }}></span>
                          <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: 'var(--kp-accent)' }}></span>
                        </span>
                      </div>
                    )}
                    
                    {index !== 0 && (
                       <div
                         className="absolute top-0 left-8 text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-b-md font-ui font-semibold shadow-md"
                         style={{
                           background: 'linear-gradient(180deg, var(--kp-accent), #b8834e)',
                           color: '#0a0908',
                         }}
                       >
                         Terpopuler
                       </div>
                    )}

                    <div className="flex-1 flex flex-col justify-center">
                      <h4
                        className={`font-display mb-6 group-hover:text-glow transition-all duration-300 ${index === 0 ? 'text-3xl lg:text-5xl leading-tight' : 'text-2xl'}`}
                        style={{ color: 'var(--kp-text-primary)' }}
                      >
                        {book?.title || 'Tanpa Judul'}
                      </h4>

                      <p className={`font-body leading-relaxed opacity-80 mb-8 flex-1 ${index === 0 ? 'text-lg lg:text-xl line-clamp-4' : 'text-base line-clamp-3'}`} style={{ color: 'var(--kp-text-secondary)' }}>
                        {book?.excerpt || 'Tidak ada deskripsi tersedia.'}
                      </p>
                    </div>

                    <div className={`flex items-center justify-between border-t pt-6 ${index === 0 ? 'mt-8' : 'mt-4'}`} style={{ borderColor: 'var(--kp-border-medium)' }}>
                      <div className="flex items-center gap-4 text-xs font-ui" style={{ color: 'var(--kp-text-muted)' }}>
                        <span className="flex items-center gap-1.5 glass px-2.5 py-1 rounded-full">
                          <Coffee size={14} style={{ color: 'var(--kp-accent)' }} />
                          {book?.readTime || '5 m'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-ui font-medium transition-colors" style={{ color: 'var(--kp-accent)' }}>
                        <span className="group-hover:text-glow hidden sm:inline">Mulai Baca</span>
                        <div className="w-8 h-8 rounded-full bg-[rgba(212,165,116,0.1)] border border-[rgba(212,165,116,0.2)] flex items-center justify-center group-hover:bg-[rgba(212,165,116,0.2)] transition-all">
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            )) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 glass-card rounded-2xl">
                <Coffee size={32} className="mx-auto mb-4 opacity-30" style={{ color: 'var(--kp-text-primary)' }} />
                <p className="font-ui text-sm tracking-widest uppercase" style={{ color: 'var(--kp-text-muted)' }}>Lebih banyak cerita sedang diseduh...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA - The Invitation */}
      <section className="relative py-32 px-6 text-center overflow-hidden border-t" style={{ borderColor: 'var(--kp-border)' }}>
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 opacity-20 animate-aurora" 
             style={{ 
               background: 'linear-gradient(45deg, var(--kp-bg-base) 0%, rgba(212, 165, 116, 0.1) 50%, var(--kp-bg-base) 100%)',
             }} />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 animate-firefly particle" />
        <div className="absolute bottom-1/3 right-1/4 animate-firefly particle" style={{ animationDelay: '1s' }} />
             
        <div className="relative z-10 max-w-3xl mx-auto glass-card p-12 sm:p-16 rounded-[2rem]">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-[rgba(212,165,116,0.3)] flex items-center justify-center glow-amber animate-float">
            <PenLine size={24} style={{ color: 'var(--kp-accent)' }} />
          </div>
          
          <h2
            className="typography-h2 mb-6"
            style={{ color: 'var(--kp-text-primary)' }}
          >
            {id ? timeCtx.ctaTitle.id : timeCtx.ctaTitle.en}
          </h2>
          
          <p
            className="font-body text-lg sm:text-xl mb-10 text-balance opacity-80 max-w-xl mx-auto"
            style={{ color: 'var(--kp-text-secondary)' }}
          >
            {id ? timeCtx.ctaDesc.id : timeCtx.ctaDesc.en}
          </p>
          
          <Link
            href="/tulis"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-ui text-sm font-semibold transition-all duration-400 group relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
              color: '#0a0908',
              boxShadow: '0 0 30px rgba(212, 165, 116, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 50px rgba(212, 165, 116, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 165, 116, 0.2)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            {/* Animated shine effect */}
            <span className="absolute inset-0 w-[150%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent -translate-x-full group-hover:animate-ink-spread" />
            
            <span className="relative z-10 flex items-center gap-2">
              <PenLine size={18} />
              Tulis Cerita Pertamamu
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}
