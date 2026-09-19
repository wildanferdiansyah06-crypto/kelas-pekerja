'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ChevronRight, Feather } from 'lucide-react';
import { useReader } from '@/src/contexts/ReaderContext';
import ReaderControls from '@/src/components/ReaderControls';
import { useLanguage } from '@/src/contexts/LanguageContext';

// ---------------------------------------------------------------------------
// Sub-components — defined OUTSIDE the page component to satisfy React rules
// ---------------------------------------------------------------------------

function Dots({ accentHex }: { accentHex: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-14 select-none" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1 h-1 rounded-full"
          style={{ backgroundColor: accentHex, opacity: 0.5 }}
        />
      ))}
    </div>
  );
}

function PullQuote({
  children,
  muted,
  accentHex,
}: {
  children: React.ReactNode;
  muted: string;
  accentHex: string;
}) {
  return (
    <blockquote
      className={`my-12 pl-6 border-l-2 ${muted}`}
      style={{ borderColor: `${accentHex}50` }}
    >
      <p className={`font-serif italic font-light leading-relaxed text-xl sm:text-2xl ${muted}`}>
        {children}
      </p>
    </blockquote>
  );
}

function RunningHead({
  roman,
  subtitle,
  accent,
  muted,
  accentHex,
}: {
  roman: string;
  subtitle: string;
  accent: string;
  muted: string;
  accentHex: string;
}) {
  return (
    <div className="flex items-baseline gap-4 mb-12 sm:mb-16">
      <span className={`font-serif text-xs tracking-[0.4em] uppercase font-semibold ${accent} flex-shrink-0`}>
        {roman}
      </span>
      <span
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, ${accentHex}30, transparent)` }}
      />
      <span className={`font-serif text-sm italic ${muted} flex-shrink-0`}>{subtitle}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------

export default function SayapPatahPage() {
  const { language } = useLanguage();
  const { theme: readerTheme, themeStyles, fontFamilyClass } = useReader();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(Math.min((scrollTop / docHeight) * 100, 100));

      const chapterEls = document.querySelectorAll('[data-chapter]');
      let current = 0;
      const newlyCompleted: number[] = [];
      chapterEls.forEach((el) => {
        const num = Number(el.getAttribute('data-chapter'));
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          newlyCompleted.push(num);
          current = num;
        }
      });
      setActiveChapter(current);
      setCompletedChapters((prev) => Array.from(new Set([...prev, ...newlyCompleted])));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);


  const id = language === 'id';
  const darkMode = readerTheme === 'dark' || readerTheme === 'espresso';

  // Uses reader theme system
  const t = {
    bg: themeStyles.bg,
    text: themeStyles.text,
    muted: themeStyles.textMuted,
    heading: themeStyles.textHeading,
    border: themeStyles.border,
    accent: themeStyles.accent,
    card: themeStyles.card,
    sidebar: themeStyles.sidebar,
    // Accent color values for inline styles
    accentHex: darkMode ? '#c9a86c' : '#7d5a3c',
    mutedHex: darkMode ? 'rgba(180,160,120,0.45)' : 'rgba(100,75,55,0.35)',
  };

  const chapters = [
    { num: 0, title: id ? 'Pengantar' : 'Prelude', subtitle: id ? 'Di Lorong Gedung Kaca' : 'In the Corridors of the Glass Tower' },
    { num: 1, title: 'I',   subtitle: id ? 'Tiran Petir' : 'The Lightning Tyrant' },
    { num: 2, title: 'II',  subtitle: id ? 'Utusan Berdasi' : 'The Tie-Wearing Messenger' },
    { num: 3, title: 'III', subtitle: id ? 'Semesta Menjawab' : 'The Universe Answers' },
    { num: 4, title: 'IV',  subtitle: id ? 'Menuju Kebebasan Sejati' : 'Towards True Freedom' },
  ];

  const fadeIn = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  };
  const sectionFade = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  // TOC section
  const sidebarContent = (
    <div className="pt-24 sm:pt-28 p-7 sm:p-10">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className={`font-serif font-semibold text-lg ${t.heading} mb-1`}>
            {id ? 'Daftar Isi' : 'Table of Contents'}
          </h2>
          <p className={`text-xs font-serif italic ${t.muted} tracking-wide`}>
            {id ? 'Sayap-Sayap Patah di Gedung Kaca' : 'Broken Wings in the Glass Tower'}
          </p>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
        >
          <X size={18} strokeWidth={1.5} className={t.muted} />
        </button>
      </div>

      {/* Reading progress bar */}
      <div className={`mb-8 p-4 rounded-xl ${t.card} border ${t.border}`}>
        <div className="flex justify-between mb-2.5">
          <span className={`text-xs font-serif ${t.muted}`}>{id ? 'Progress' : 'Progress'}</span>
          <span className={`text-xs font-serif font-semibold ${t.accent}`}>
            {Math.round((completedChapters.length / chapters.length) * 100)}%
          </span>
        </div>
        <div className="h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: `${t.accentHex}15` }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: t.accentHex }}
            initial={{ width: 0 }}
            animate={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Chapters */}
      <nav className="space-y-0.5 pb-20">
        {chapters.map((ch, idx) => {
          const done = completedChapters.includes(ch.num);
          const active = activeChapter === ch.num;
          return (
            <motion.a
              key={ch.num}
              href={ch.num === 0 ? '#pengantar' : `#bagian-${ch.num}`}
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04, type: 'spring', stiffness: 120, damping: 20 }}
              className={`flex items-center gap-3.5 px-3 py-3.5 rounded-xl text-sm transition-colors duration-200 ${
                active
                  ? `${t.card} border ${t.border}`
                  : darkMode ? 'hover:bg-white/4' : 'hover:bg-black/4'
              }`}
            >
              <span className={`font-serif text-sm font-semibold w-7 text-center flex-shrink-0 ${done || active ? t.accent : t.muted}`}>
                {done ? <Feather size={14} strokeWidth={2.5} className={`mx-auto ${t.accent}`} /> : (ch.num === 0 ? '✦' : ['I','II','III','IV'][ch.num-1])}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`font-serif text-sm truncate ${active ? t.heading : done ? t.text : t.muted}`}>{ch.title}</p>
                <p className={`text-xs font-serif italic truncate mt-0.5 ${t.muted}`} style={{ opacity: 0.7 }}>{ch.subtitle}</p>
              </div>
              {active && <ChevronRight size={13} strokeWidth={2} className={t.muted} />}
            </motion.a>
          );
        })}
      </nav>
    </div>
  );

  const prose = `space-y-7 text-base sm:text-lg lg:text-xl xl:text-2xl leading-[1.9] ${t.text} font-light max-w-4xl`;

  return (
    <div className={`${t.bg} ${t.text} ${fontFamilyClass} reader-page transition-colors duration-500 min-h-screen w-full`}>
      <ReaderControls progress={readingProgress} />

      {/* ─── Floating TOC trigger ─── */}
      <AnimatePresence>
        {readingProgress > 5 && (
          <motion.button
            initial={prefersReducedMotion ? {} : { x: -64, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? {} : { x: -64, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            onClick={() => setSidebarOpen(true)}
            className={`fixed bottom-8 left-8 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full ${darkMode ? 'bg-[#1a1714]/90' : 'bg-[#f5f1e8]/90'} backdrop-blur-lg border ${t.border} shadow-lg ${t.accent} font-serif`}
          >
            <BookOpen size={15} strokeWidth={1.5} />
            <span className="hidden sm:inline text-xs tracking-wide">
              {id ? 'Daftar Isi' : 'Contents'}
            </span>
            <span className={`text-xs pl-2.5 border-l ${t.border} ${t.muted}`}>
              {String(activeChapter).padStart(2,'0')}/{chapters.length - 1}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Sidebar ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className={`fixed left-0 top-0 bottom-0 w-full sm:w-[360px] ${t.sidebar} z-50 overflow-y-auto border-r ${t.border}`}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <main className="pb-32 font-serif antialiased reader-content">

        {/* ─── HERO ─── */}
        <motion.section
          id="pengantar" data-chapter={0}
          initial="hidden" animate="visible" variants={fadeIn}
          className={`relative w-full min-h-screen flex items-center border-b ${t.border} overflow-hidden`}
        >
          {/* Subtle ambient glow — minimal */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ background: darkMode
              ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,108,0.06) 0%, transparent 100%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(125,90,60,0.05) 0%, transparent 100%)'
            }}
          />

          {/* Full-bleed hero */}
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-28 pb-24 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Label */}
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className={`font-serif text-xs tracking-[0.4em] uppercase mb-8 ${t.muted}`}
              >
                {id ? 'Refleksi' : 'Reflection'}
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 1.1 }}
                className={`font-serif font-bold leading-[1.0] tracking-tight ${t.heading} mb-6`}
                style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
              >
                Sayap-Sayap Patah
                <br />
                <span className={`italic font-light ${t.accent}`} style={{ fontSize: '0.85em' }}>
                  di Gedung Kaca
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.9 }}
                className={`font-serif italic font-light ${t.muted} mb-10 max-w-xl`}
                style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7 }}
              >
                {id
                  ? 'Sebuah elegi tentang harga diri, penindasan birokrasi, dan keberanian kelas pekerja untuk merebut kembali kemerdekaannya dari meja jagal korporat.'
                  : 'An elegy on dignity, bureaucratic oppression, and the courage of the working class to reclaim their freedom from the corporate slaughterhouse.'}
              </motion.p>

              {/* Divider + CTA row */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center gap-6"
              >
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full border ${t.border} ${t.accent} font-serif text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-80`}
                >
                  <BookOpen size={14} strokeWidth={1.5} />
                  {id ? 'Mulai Membaca' : 'Start Reading'}
                </button>
                <div
                  className="h-px flex-1 max-w-[80px]"
                  style={{ background: `linear-gradient(to right, ${t.accentHex}30, transparent)` }}
                />
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute bottom-8 right-8 sm:right-12 flex flex-col items-end gap-2 ${t.muted}`}
          >
            <span className="text-xs font-serif tracking-[0.25em] uppercase opacity-40 writing-mode-vertical hidden sm:inline">
              {id ? 'Gulir' : 'Scroll'}
            </span>
            <div
              className="w-px h-10"
              style={{ background: `linear-gradient(to bottom, transparent, ${t.accentHex}40)` }}
            />
          </motion.div>
        </motion.section>

        {/* ─── Content wrapper ─── */}
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

            {/* ─── PENGANTAR (Bagian 0 dilanjut sedikit di sini sebelum Bagian I kalau perlu, tapi dipisah per paragraf) ─── */}
            <motion.section
              id="bagian-0"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className={`py-20 sm:py-28 border-b ${t.border}`}
            >
              <div className={prose}>
                <p>
                  Mereka bilang pekerjaan adalah ibadah, namun di lorong-lorong gedung kaca ini, ia tak lebih dari meja jagal tempat harga diri disembelih. Aku melangkah masuk ke dalam perut raksasa industri, membawa kepingan harapan dan lima hari peluh yang belum terbayar. Di tanah ini, keringat seorang pekerja tidak diukur dari seberapa keras ia memeras tulang, melainkan dari kedipan mata seorang tiran yang duduk di singgasana kemurkaan.
                </p>

                <p>
                  Di balik jendela-jendela tinggi yang memantulkan terik matahari Jakarta, kami berbaris layaknya mesin bernyawa. Kami menukar detak jantung dengan janji-janji stabilitas yang rapuh. Udara di dalam ruangan pendingin ini tidak pernah terasa segar; ia pengap oleh ambisi-ambisi serakah dan ketakutan para pekerja yang saling berebut remah roti.
                </p>

                <PullQuote muted={t.muted} accentHex={t.accentHex}>
                  Di sini, nilai seorang manusia direduksi menjadi sekadar deretan angka di lembar neraca, di mana keringat menguap tanpa pernah benar-benar dihargai.
                </PullQuote>
              </div>
            </motion.section>

            {/* ─── BAGIAN I ─── */}
            <motion.section
              id="bagian-1" data-chapter={1}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className={`py-20 sm:py-28 border-b ${t.border}`}
            >
              <RunningHead roman="I" subtitle={id ? 'Tiran Petir' : 'The Lightning Tyrant'} accent={t.accent} muted={t.muted} accentHex={t.accentHex} />
              <div className={prose}>
                <p>
                  Sebuah impresi pertama, kata mereka. Hanya karena sebuah pandangan mata yang tak berkenan, titah sang Tiran Petir—seorang penguasa dari daratan seberang yang lupa akan nalar—dijatuhkan.
                </p>
                <p>
                  Lima hari penuh aku merajut rencana, menyusuri lorong-lorong kampus, dan merangkai panggung untuk sebuah pertunjukan yang mereka puja. Namun, dengan satu kibasan tangan yang arogan, namaku dihapus dari daftar manusia yang pantas dihidupi.
                </p>

                <Dots accentHex={t.accentHex} />

                <PullQuote muted={t.muted} accentHex={t.accentHex}>
                  Di dunia kelas pekerja yang keras ini, nasibmu tidak dipahat oleh dedikasi atau seberapa tajam akalmu bekerja, melainkan oleh suasana hati sang penguasa yang bahkan tak mampu mengingat wajah siapa yang baru saja ia rekrut.
                </PullQuote>

                <p>
                  Padahal, lima hari itu bukanlah sekadar angka di atas kertas. Lima hari itu adalah jejak langkah kaki yang menyusuri aspal panas, suara yang serak membangun relasi, dan malam-malam yang direnggut untuk menyusun rencana yang megah. Aku menuangkan segenap jiwa pada sebuah proyek yang tak pernah kumiliki. Betapa ironisnya, segala dedikasi itu hancur lebur hanya karena penguasa melihatku bukan sebagai manusia yang bernapas, melainkan sebagai noda kecil yang mengganggu pemandangan estetik kerajaannya.
                </p>
              </div>
            </motion.section>

            {/* ─── BAGIAN II ─── */}
            <motion.section
              id="bagian-2" data-chapter={2}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className={`py-20 sm:py-28 border-b ${t.border}`}
            >
              <RunningHead roman="II" subtitle={id ? 'Utusan Berdasi' : 'The Tie-Wearing Messenger'} accent={t.accent} muted={t.muted} accentHex={t.accentHex} />
              <div className={prose}>
                <p>
                  Lalu datanglah sang utusan berdasi, kurir bermulut manis yang berlindung di balik tameng bahasa birokrasi dan kebijakan korporat. Ia berbicara tentang kompensasi dan matematika yang merendahkan: memecah upah minimum kotaku menjadi kepingan-kepingan recehan harian yang harus kuperjuangkan layaknya pengemis.
                </p>
                <p>
                  Bibirnya merangkai kata-kata maaf yang kosong, menutupi kebusukan ruang direksi yang berbau ketakutan, intrik, dan miskoordinasi. Mereka menyodorkan kembali rantai yang sama, sebuah kebaikan palsu berupa tawaran posisi mengambang hingga akhir bulan, seolah waktu, pikiran, dan tenaga manusia hanyalah barang loakan yang bisa disewa saat butuh dan dibuang saat jemu.
                </p>
                
                <Dots accentHex={t.accentHex} />

                <p>
                  Sang utusan duduk di seberang layar, menyembunyikan nuraninya di balik pedoman perusahaan. Di matanya, aku melihat pantulan ketidakberdayaan yang sama; ia hanyalah pion lain yang ditugaskan membersihkan kekacauan sang raja. Kami berdebat tentang matematika yang paling menyedihkan di dunia: menghitung nilai harian dari harga diri seorang manusia.
                </p>
                
                <p>
                  Mereka memaksa kita percaya bahwa menuntut hak adalah sebuah bentuk kelancangan.
                </p>
              </div>
            </motion.section>

            {/* ─── BAGIAN III ─── */}
            <motion.section
              id="bagian-3" data-chapter={3}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className={`py-20 sm:py-28 border-b ${t.border}`}
            >
              <RunningHead roman="III" subtitle={id ? 'Semesta Menjawab' : 'The Universe Answers'} accent={t.accent} muted={t.muted} accentHex={t.accentHex} />
              <div className={prose}>
                <p>
                  Namun, sayap-sayap yang patah oleh sistem ini belum sepenuhnya lumpuh. Di tengah malam yang bisu, di ruang kecil kos-kosanku yang menjadi saksi bisu kelelahan, aku berteriak ke dalam ruang hampa digital. Aku membeberkan luka yang disembunyikan rapat-rapat oleh sang raksasa.
                </p>
                <p>
                  Dan semesta menjawab.
                </p>
                <p>
                  Suara-suara dari sudut kota membalas, tangan-tangan tak terlihat dari sesama jiwa yang lelah merengkuhku, menyadarkan bahwa aku tak merintih sendirian. Para pekerja yang pernah dikhianati berbisik tentang perlawanan, memvalidasi bahwa sistem korporat inilah yang sakit, bukan diriku. Jaringan-jaringan sinyal itu membawa suaraku menembus dinding-dinding kedap suara raksasa industri.
                </p>

                <PullQuote muted={t.muted} accentHex={t.accentHex}>
                  Balasan yang datang bukanlah sekadar kata-kata empati, melainkan gemuruh kemarahan dari ribuan dada yang pernah merasakan perih yang sama.
                </PullQuote>

                <p>
                  Mereka adalah para pekerja yang dipaksa menelan ludah, yang haknya dikebiri oleh sistem yang memuja kapital di atas kemanusiaan. Dalam kebersamaan tanpa wajah itu, aku menemukan kekuatan yang sempat dirampas. Raksasa ini gemetar ketika kebenaran kecil diutarakan dengan lantang.
                </p>
              </div>
            </motion.section>

            {/* ─── BAGIAN IV ─── */}
            <motion.section
              id="bagian-4" data-chapter={4}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className="py-20 sm:py-28"
            >
              <RunningHead roman="IV" subtitle={id ? 'Menuju Kebebasan Sejati' : 'Towards True Freedom'} accent={t.accent} muted={t.muted} accentHex={t.accentHex} />
              <div className={prose}>
                <p>
                  Aku akan melangkah menyelesaikan sisa bulan ini, bukan sebagai hamba yang takluk pada penguasa labil, melainkan sebagai jiwa merdeka yang sedang mengasah senjatanya dalam diam. Biarkan mereka panik mengejar tenggat waktu acara dan menyusun proposal palsu. Di atas meja negosiasi yang dingin ini, aku tidak lagi menunduk.
                </p>
                <p>
                  Aku merampas kembali hakku, mengumpulkan serpihan sayapku, dan bersiap untuk terbang ke langit yang lebih luas—meninggalkan sangkar besi mereka yang perlahan membusuk dari dalam.
                </p>

                <Dots accentHex={t.accentHex} />

                <PullQuote muted={t.muted} accentHex={t.accentHex}>
                  Karena pada akhirnya, meja jagal ini bukanlah tempat akhirku. Ini hanyalah satu babak kelam yang mengajarkanku cara mengenali wajah penindasan.
                </PullQuote>

                <p>
                  Aku akan mengambil setiap sen yang menjadi hakku, menyerap setiap ilmu yang tersisa dari kekacauan ini, lalu pergi tanpa menoleh ke belakang. Di luar gedung raksasa ini, masih ada langit tanpa batas yang tidak dikuasai oleh tiran-tiran pelupa.
                </p>
                <p>
                  Sayap ini mungkin pernah patah, namun dari patahan itulah ia tumbuh menjadi lebih tajam, siap membawaku melintasi badai menuju kebebasan yang sejati.
                </p>
              </div>

              {/* Closing */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-24 pt-12 flex items-center gap-5"
                style={{ borderTop: `1px dashed ${t.accentHex}20` }}
              >
                <Feather size={14} strokeWidth={1.2} className={`${t.muted} flex-shrink-0 opacity-40`} />
                <span className={`font-serif text-xs italic ${t.muted} opacity-40 tracking-widest`}>
                  {id ? '— Selesai —' : '— End —'}
                </span>
              </motion.div>

            </motion.section>

        </div>
      </main>
    </div>
  );
}
