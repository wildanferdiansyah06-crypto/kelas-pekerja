'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ChevronRight, Check, Feather } from 'lucide-react';
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

export default function ArsipSunyiPage() {
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

  if (!mounted) return null;

  const id = language === 'id';
  const darkMode = readerTheme === 'dark' || readerTheme === 'espresso';

  // Uses reader theme system — consistent with other books
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
    { num: 0, title: id ? 'Pengantar' : 'Prelude', subtitle: id ? 'Di Ambang Kesunyian' : 'On the Edge of Silence' },
    { num: 1, title: 'I',   subtitle: id ? 'Malam yang Berbeda'    : 'A Different Night' },
    { num: 2, title: 'II',  subtitle: id ? 'Dua Burung, Satu Senja': 'Two Birds, One Dusk' },
    { num: 3, title: 'III', subtitle: id ? 'Melawan Takdir'        : 'Fighting Destiny' },
    { num: 4, title: 'IV',  subtitle: id ? 'Arsip Sunyi'           : 'The Silent Archive' },
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
            {id ? 'Arsip Sunyi' : 'The Silent Archive'}
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
                {done ? <Check size={14} strokeWidth={2.5} className={`mx-auto ${t.accent}`} /> : (ch.num === 0 ? '✦' : ['I','II','III','IV'][ch.num-1])}
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

  // Prose block styles — wide enough to breathe, never wider than optimal reading width
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

          {/* Full-bleed hero — matches di-atas-cangkir padding system */}
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-28 pb-24 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Label */}
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className={`font-serif text-xs tracking-[0.4em] uppercase mb-8 ${t.muted}`}
              >
                {id ? 'Catatan Malam' : 'Midnight Note'}
              </motion.p>

              {/* Title — left aligned, large, breathes */}
              <motion.h1
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 1.1 }}
                className={`font-serif font-bold leading-[1.0] tracking-tight ${t.heading} mb-6`}
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
              >
                Arsip
                <br />
                <span className={`italic font-light ${t.accent}`} style={{ fontSize: '0.9em' }}>
                  Sunyi
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
                  ? 'Sayap yang telah gugur di ambang kesunyian.'
                  : 'Fallen wings at the edge of silence.'}
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

        {/* ─── Content wrapper: full-bleed, generous padding, no double centering ─── */}
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

            {/* ─── BAGIAN I ─── */}
            <motion.section
              id="bagian-1" data-chapter={1}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className={`py-20 sm:py-28 border-b ${t.border}`}
            >
              <RunningHead roman="I" subtitle={id ? 'Malam yang Berbeda' : 'A Different Night'} accent={t.accent} muted={t.muted} accentHex={t.accentHex} />
              <div className={prose}>
                <p>
                  {id
                    ? 'Malam ini turun dengan cara yang berbeda dari malam-malam yang sudah-sudah. Ada bobot yang tak biasa di dalamnya, seolah langit sendiri sedang menahan napas, menunggu sesuatu selesai diucapkan sebelum ia mengizinkan dini hari datang. Aku duduk di depan layar yang masih menyala, di antara baris-baris manuskrip yang belum sempat kurampungkan, dan untuk pertama kalinya dalam waktu yang lama, aku tidak tahu lagi kalimat apa yang hendak kutulis.'
                    : "This night descends differently from all the nights before. There is an unusual weight to it, as if the sky itself is holding its breath, waiting for something to be spoken before it allows the dawn to arrive. I sit before the glowing screen, among lines of a manuscript I haven't managed to finish, and for the first time in a long time, I no longer know what words to write."}
                </p>

                <Dots accentHex={t.accentHex} />

                <PullQuote muted={t.muted} accentHex={t.accentHex}>
                  {id
                    ? 'Kopi di gelasku telah lama kehilangan hangatnya. Lucu sekali—betapa banyak hal dalam hidup yang akhirnya mendingin semata-mata karena kita terlalu lama menatapnya, alih-alih meminumnya selagi masih ada waktu.'
                    : "The coffee in my glass has long lost its warmth. How funny—how many things in life turn cold simply because we stare at them too long, instead of drinking them while there is still time."}
                </PullQuote>

                <p>
                  {id
                    ? 'Barangkali begitu pula dengan hati. Barangkali begitu pula dengan kita.'
                    : 'Perhaps it is the same with the heart. Perhaps it is the same with us.'}
                </p>
                <p>
                  {id
                    ? 'Ada ruang yang tiba-tiba menganga di tengah dada. Bukan luka yang berdarah—sebab luka semacam itu masih menyisakan sesuatu untuk ditekan, untuk disembuhkan, atau untuk sekadar dibuktikan bahwa ia pernah ada. Yang ini berbeda: sebuah kekosongan yang tidak berbunyi, yang tak bisa diisi oleh derau mesin, oleh ketikan aksara, ataupun oleh hiruk-pikuk kota yang tak pernah benar-benar tidur.'
                    : "There is a space that suddenly gapes in the middle of my chest. Not a bleeding wound—for such wounds still leave something to press, to heal, or merely to prove they existed. This one is different: a soundless void, unfillable by the hum of machines, the tapping of keys, or the commotion of a city that never truly sleeps."}
                </p>
              </div>
            </motion.section>

            {/* ─── BAGIAN II ─── */}
            <motion.section
              id="bagian-2" data-chapter={2}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className={`py-20 sm:py-28 border-b ${t.border}`}
            >
              <RunningHead roman="II" subtitle={id ? 'Dua Burung, Satu Senja' : 'Two Birds, One Dusk'} accent={t.accent} muted={t.muted} accentHex={t.accentHex} />
              <div className={prose}>
                <p>
                  {id
                    ? 'Aku masih menyimpan satu kepercayaan lama, sebagaimana anak-anak menyimpan dongeng sebelum tidur: bahwa dua jiwa yang ditakdirkan bersua akan selalu menemukan jalan pulang satu sama lain, walau dipisahkan oleh berapa pun lautan.'
                    : "I still harbor an old belief, the way children keep bedtime stories: that two souls destined to meet will always find their way back to each other, no matter how many oceans separate them."}
                </p>
                <p>
                  {id
                    ? 'Senyummu yang tenang—tidak berlebihan, tidak mencari-cari perhatian, hanya hadir sewajarnya seperti cahaya pagi yang menyelinap dari sela gorden—pernah mekar bagai musim semi yang singkat di tengah dadaku yang telah lama kemarau. Kusimpan ia diam-diam, tanpa berani berharap ia akan bertahan lebih lama dari satu musim.'
                    : "Your calm smile—unassuming, not seeking attention, merely present like morning light slipping through curtains—once bloomed like a brief spring in my chest that had long been a drought. I kept it quietly, not daring to hope it would last longer than a single season."}
                </p>
                <p>
                  {id
                    ? 'Kini aku mengerti. Bukan senyum itu yang keliru. Yang keliru adalah aku, yang terlalu berani menaruh mimpi panjang pada sesuatu yang sejak semula hanya ditakdirkan untuk singgah.'
                    : "Now I understand. It wasn't the smile that was mistaken. The mistake was mine, daring too much to hang a long dream on something destined only to pass by."}
                </p>

                <Dots accentHex={t.accentHex} />

                <p>
                  {id
                    ? 'Sebab kita, kutahu sekarang, hanyalah dua musafir yang kebetulan berpapasan di satu dermaga senja—saling mengagumi cahaya masing-masing sejenak, sebelum kapal kita melanjutkan haluan yang berbeda. Kau menatap ke arah kaki langit yang jauh, ke arah dunia luas yang sudah lama memanggil namamu. Aku tetap berdiri di sini, di tanah yang sama sejak aku lahir, memeluk bayanganmu yang perlahan pudar ditelan jarak dan kabut laut.'
                    : "For we, I know now, are but two travelers who happened to cross paths on a twilight pier—admiring each other's light for a moment, before our ships continued on different courses. You gazed toward the distant horizon, toward the vast world that had long been calling your name. I remained standing here, on the same ground since I was born, embracing your shadow slowly fading into distance and sea mist."}
                </p>

                <PullQuote muted={t.muted} accentHex={t.accentHex}>
                  {id
                    ? 'Cinta jarang keliru menaruh dua jenis burung dalam satu senja. Yang sering keliru hanyalah harapan kita sendiri, yang keras kepala mengira keduanya bisa memiliki langit yang sama.'
                    : 'Love rarely errs in placing two kinds of birds in the same dusk. What often errs is our own hope, stubbornly assuming both could share the same sky.'}
                </PullQuote>

                <p>
                  {id
                    ? 'Aku tidak menyalahkanmu untuk itu. Ada burung yang memang dilahirkan untuk mengarungi musim, mengikuti garis migrasi yang sudah tertulis jauh sebelum mereka sempat mengerti artinya sendiri. Dan ada pula yang dilahirkan untuk tinggal—menjaga dermaga, menyalakan lampu bagi kapal-kapal yang pulang, membiarkan angin muson lewat tanpa pernah benar-benar ikut terbang bersamanya.'
                    : "I don't blame you for it. There are birds born to cross the seasons, following migratory lines inscribed long before they could comprehend their meaning. And there are those born to stay—guarding the pier, lighting lamps for returning ships, letting the monsoon winds pass without ever truly flying with them."}
                </p>
              </div>
            </motion.section>

            {/* ─── BAGIAN III ─── */}
            <motion.section
              id="bagian-3" data-chapter={3}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className={`py-20 sm:py-28 border-b ${t.border}`}
            >
              <RunningHead roman="III" subtitle={id ? 'Melawan Takdir' : 'Fighting Destiny'} accent={t.accent} muted={t.muted} accentHex={t.accentHex} />
              <div className={prose}>
                <p>
                  {id
                    ? 'Maka, sempat kuputuskan untuk melawan takdirku sendiri. Kukumpulkan sisa napas dan keberanian yang kupunya. Kurentangkan apa yang tersisa dari sayapku, bersiap menyeberangi lautan badai menujumu—hanya untuk mendapati, sebelum sayap itu sempat terkepak sekali pun, kau telah menutup jendelamu, perlahan namun pasti.'
                    : "And so, I once decided to fight my own destiny. I gathered the rest of my breath and courage. I stretched what remained of my wings, preparing to cross the stormy seas toward you—only to find, before those wings could flap even once, that you had closed your window, slowly but surely."}
                </p>

                <PullQuote muted={t.muted} accentHex={t.accentHex}>
                  {id
                    ? '"Kita tidak sedang memandang langit yang sama," katamu, dengan suara yang tetap lembut, tanpa amarah, tanpa keinginan untuk melukai.'
                    : '"We are not looking at the same sky," you said, with a voice that remained gentle, without anger, without the desire to hurt.'}
                </PullQuote>

                <p>
                  {id
                    ? 'Kau memintaku menyimpan nyala ini untuk perapian yang lain, di suatu hari, di suatu tempat yang belum kutahu.'
                    : "You asked me to save this flame for another hearth, someday, somewhere I have yet to know."}
                </p>
                <p>
                  {id
                    ? 'Aku pikir aku akan lebih siap menghadapi penolakan yang datang dengan suara keras—dengan pintu yang dibanting, dengan kata-kata yang bisa kubalas atau kusesali bersama. Tapi penolakan yang datang selembut ini tidak menyisakan apa pun untuk dilawan. Tidak ada perang yang bisa kunyatakan usai. Tidak ada musuh yang bisa kutuduh atas jatuhnya seorang pengelana yang terlalu percaya diri hendak menyeberangi laut. Aku hanya tenggelam, sunyi-sunyi, ke dalam satu kesadaran: bahwa tidak ada yang bisa diperjuangkan atas nama seseorang yang sudah menentukan arah anginnya sendiri.'
                    : "I thought I would be more prepared for a rejection that came with loud noises—with slammed doors, with words I could retort or regret together. But a rejection this gentle leaves nothing to fight against. There is no war I can declare over. No enemy I can accuse of downing an overconfident traveler attempting to cross the sea. I only sink, quietly, into one realization: that nothing can be fought for in the name of someone who has already set their own wind's direction."}
                </p>

                <Dots accentHex={t.accentHex} />

                <p>
                  {id
                    ? 'Maka karena aku mencintaimu—bahkan dalam kemustahilan yang pahit ini—aku memilih diam. Aku menghentikan langkahku tepat ketika aku baru saja belajar caranya berlari ke arahmu. Kutarik kembali kata-kata yang sempat tumpah di ujung lidah, kulipat ia serapi mungkin, dan kusimpan di laci paling dalam dari arsip sunyi tempat aku tinggal sekarang.'
                    : "And so because I love you—even in this bitter impossibility—I choose to be silent. I stop my steps right when I was just learning how to run toward you. I pull back the words that spilled at the tip of my tongue, fold them as neatly as possible, and store them in the deepest drawer of the silent archive where I now live."}
                </p>
                <p>
                  {id
                    ? 'Sebab mencintai seseorang, kupikir, tidak selalu berarti memintanya untuk tinggal. Kadang mencintai berarti membiarkan seseorang menyelesaikan pelayarannya sendiri—meskipun itu berarti pelayaran itu tidak akan pernah menyertakan namamu di dalam daftar pelabuhan yang ia singgahi.'
                    : "Because loving someone, I think, doesn't always mean asking them to stay. Sometimes loving means letting someone complete their own voyage—even if it means that voyage will never include your name in the list of ports they call upon."}
                </p>
              </div>
            </motion.section>

            {/* ─── BAGIAN IV ─── */}
            <motion.section
              id="bagian-4" data-chapter={4}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
              className="py-20 sm:py-28"
            >
              <RunningHead roman="IV" subtitle={id ? 'Arsip Sunyi' : 'The Silent Archive'} accent={t.accent} muted={t.muted} accentHex={t.accentHex} />
              <div className={prose}>
                <p>
                  {id
                    ? 'Sekarang tidak ada lagi harapan yang berisik. Perasaanku padamu tidak mati—ia hanya kehilangan suaranya, seperti lonceng dermaga yang masih berdiri meski tak ada lagi kapal yang singgah.'
                    : "Now there are no more noisy hopes. My feelings for you did not die—they merely lost their voice, like a pier bell still standing though no ships call anymore."}
                </p>
                <p>
                  {id
                    ? 'Aku akan kembali pada pekerjaanku, pada rutinitas malam yang hening, menjadi manusia biasa yang merawat sendiri patah hatinya, di antara baris-baris manuskrip yang harus tetap dirampungkan meski hati sedang tidak utuh.'
                    : "I will return to my work, to the silent night routines, becoming an ordinary human nursing his own heartbreak, among lines of a manuscript that must be finished even when the heart is not whole."}
                </p>
                <p>
                  {id
                    ? 'Namamu akan tetap menjadi bait terindah yang pernah kutulis. Tapi ia juga akan menjadi satu-satunya puisi yang kupilih untuk tidak pernah lagi kubacakan dengan suara lantang. Cukup untukku saja. Cukup untuk malam-malam seperti ini, ketika kopi mendingin dan manuskrip menunggu diselesaikan oleh seseorang yang baru saja belajar menulis dengan hati yang retak.'
                    : "Your name will remain the most beautiful verse I have ever written. But it will also be the only poem I choose to never read aloud again. Enough for me alone. Enough for nights like this, when the coffee cools and the manuscript waits to be finished by someone who just learned to write with a cracked heart."}
                </p>
                <p>
                  {id
                    ? 'Biarlah Tuhan yang menyimpan sisa cerita kita, sebagaimana Ia menyimpan seluruh cerita yang dipaksa selesai sebelum sempat benar-benar dimulai.'
                    : "Let God keep the rest of our story, just as He keeps all stories forced to end before they truly begin."}
                </p>

                <Dots accentHex={t.accentHex} />

                <PullQuote muted={t.muted} accentHex={t.accentHex}>
                  {id
                    ? 'Di duniaku malam ini, kisah itu telah usai, bahkan sebelum bab pertamanya sempat kutulis sampai titik. Dan barangkali begitulah caranya sebagian cerita memang harus berakhir: bukan dengan luka yang menganga, melainkan dengan kesunyian yang, pada akhirnya, punya keindahannya sendiri.'
                    : 'In my world tonight, the story has ended, even before I could write its first chapter to the period. And perhaps that is how some stories are meant to end: not with a gaping wound, but with a silence that, in the end, has a beauty of its own.'}
                </PullQuote>
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
