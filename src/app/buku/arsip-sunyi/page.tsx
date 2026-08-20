'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, BookOpen, X, ChevronRight, Check, Archive } from 'lucide-react';
import { useReader } from '@/src/contexts/ReaderContext';
import ReaderControls from '@/src/components/ReaderControls';
import { useLanguage } from '@/src/contexts/LanguageContext';

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
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
      const chapterEls = document.querySelectorAll('[data-chapter]');
      let current = 0;
      const newlyCompleted: number[] = [];
      chapterEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const num = Number(el.getAttribute('data-chapter'));
        if (rect.top < window.innerHeight * 0.5) {
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

  // Custom palette for Arsip Sunyi: deep navy-indigo + warm amber
  const palette = {
    heroBg: darkMode
      ? 'bg-[#0d0f1a]'
      : 'bg-[#f0eee7]',
    heroText: darkMode ? 'text-[#e8e2d5]' : 'text-[#1e1b14]',
    accent: darkMode ? 'text-[#c8a97e]' : 'text-[#7a4f2e]',
    accentHex: darkMode ? '#c8a97e' : '#7a4f2e',
    accentBg: darkMode ? 'bg-[#1e1a10]/60' : 'bg-[#faf5ec]/80',
    accentBorder: darkMode ? 'border-[#c8a97e]/25' : 'border-[#7a4f2e]/25',
    navyAccent: darkMode ? 'bg-[#1a1d30]' : 'bg-[#e8e3d8]',
    muted: darkMode ? 'text-[#8a8070]' : 'text-[#9a8878]',
    border: darkMode ? 'border-[#2a2830]' : 'border-[#d5cec4]',
    card: darkMode ? 'bg-[#131520]/70' : 'bg-[#f7f3ec]/80',
    sidebar: darkMode ? 'bg-[#0e1020]' : 'bg-[#f5f0e8]',
    floatBg: darkMode ? 'bg-[#0e1020]/90' : 'bg-[#f5f0e8]/90',
    starColor: darkMode ? 'rgba(200,169,126,0.5)' : 'rgba(122,79,46,0.25)',
    dividerColor: darkMode ? 'rgba(200,169,126,0.15)' : 'rgba(122,79,46,0.15)',
    indigoGlow: darkMode
      ? 'radial-gradient(ellipse at 20% 40%, rgba(60,55,120,0.25) 0%, transparent 60%)'
      : 'radial-gradient(ellipse at 20% 40%, rgba(180,170,220,0.15) 0%, transparent 60%)',
    amberGlow: darkMode
      ? 'radial-gradient(ellipse at 80% 60%, rgba(150,100,40,0.12) 0%, transparent 50%)'
      : 'radial-gradient(ellipse at 80% 60%, rgba(200,150,80,0.1) 0%, transparent 50%)',
  };

  const chapters = [
    { num: 0, title: id ? 'Pengantar' : 'Prelude', subtitle: id ? 'Di Ambang Kesunyian' : 'On the Edge of Silence' },
    { num: 1, title: 'I', subtitle: id ? 'Malam yang Berbeda' : 'A Different Night' },
    { num: 2, title: 'II', subtitle: id ? 'Dua Burung, Satu Senja' : 'Two Birds, One Dusk' },
    { num: 3, title: 'III', subtitle: id ? 'Melawan Takdir' : 'Fighting Destiny' },
    { num: 4, title: 'IV', subtitle: id ? 'Arsip Sunyi' : 'The Silent Archive' },
  ];

  const fadeIn = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const sectionFade = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  };

  // Dot separator (from original text)
  const dotSeparator = (
    <div className="flex items-center justify-center gap-3 my-14">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ backgroundColor: palette.accentHex, opacity: 0.5 }}
        />
      ))}
    </div>
  );

  // Inline letter-style quote block
  const LetterQuote = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`relative my-12 mx-2 sm:mx-8 p-8 sm:p-10 rounded-2xl border ${palette.accentBorder} ${palette.accentBg}`}
      style={{ boxShadow: darkMode ? 'inset 0 1px 0 rgba(200,169,126,0.05)' : 'inset 0 1px 0 rgba(122,79,46,0.05)' }}
    >
      {/* Corner ornament */}
      <div
        className="absolute top-4 left-5 font-serif text-4xl leading-none select-none"
        style={{ color: palette.accentHex, opacity: 0.18 }}
      >
        &ldquo;
      </div>
      <div className={`font-serif text-xl sm:text-2xl italic font-light leading-relaxed ${palette.accent} pl-6`}>
        {children}
      </div>
    </div>
  );

  // Running chapter title bar
  const ChapterHeader = ({ roman, subtitle }: { roman: string; subtitle: string }) => (
    <div className="flex items-center gap-5 mb-14">
      <span
        className={`font-serif text-sm tracking-[0.35em] uppercase font-semibold ${palette.accent} opacity-80 flex-shrink-0`}
      >
        {roman}
      </span>
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, ${palette.accentHex}30, transparent)` }} />
      <span className={`font-serif text-sm sm:text-base italic ${palette.muted} flex-shrink-0`}>
        {subtitle}
      </span>
    </div>
  );

  return (
    <div
      className={`${palette.heroBg} ${palette.heroText} ${fontFamilyClass} reader-page transition-colors duration-700 min-h-screen w-full`}
    >
      <ReaderControls progress={readingProgress} />

      {/* ─── FLOATING TOC ─── */}
      <AnimatePresence>
        {readingProgress > 5 && (
          <motion.button
            initial={prefersReducedMotion ? { opacity: 1 } : { x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onClick={() => setSidebarOpen(true)}
            className={`fixed bottom-8 left-8 z-40 flex items-center gap-3 px-6 py-4 rounded-full ${palette.floatBg} backdrop-blur-md border ${palette.accentBorder} shadow-2xl ${palette.accent} font-serif tracking-wide`}
            style={{ boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.12)' }}
          >
            <BookOpen size={17} strokeWidth={1.5} />
            <span className="hidden sm:inline text-sm font-medium">
              {id ? 'Daftar Isi' : 'Contents'}
            </span>
            <span className={`text-xs ml-1 pl-3 border-l ${palette.accentBorder} ${palette.muted} font-serif`}>
              {String(activeChapter).padStart(2, '0')}/{chapters.length - 1}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 bottom-0 w-full sm:w-[380px] ${palette.sidebar} z-50 overflow-y-auto shadow-2xl border-r ${palette.border}`}
            >
              <div className="pt-24 sm:pt-28 p-8 sm:p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl border ${palette.accentBorder} ${palette.accentBg} flex-shrink-0`}
                    >
                      <Archive size={20} strokeWidth={1.5} className={palette.accent} />
                    </div>
                    <div>
                      <h2 className={`font-serif font-bold text-lg ${palette.heroText}`}>
                        {id ? 'Daftar Isi' : 'Table of Contents'}
                      </h2>
                      <p className={`text-xs mt-1 ${palette.muted} font-serif italic tracking-wide`}>
                        {id ? 'Arsip Sunyi' : 'The Silent Archive'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-[#1e2035]' : 'hover:bg-[#e0dbd2]'} transition-colors duration-300 mt-1`}
                  >
                    <X size={20} strokeWidth={1.5} className={palette.muted} />
                  </button>
                </div>

                {/* Progress */}
                <div className={`mb-8 p-5 rounded-2xl ${palette.card} border ${palette.border}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-sm ${palette.muted} font-serif`}>
                      {id ? 'Progress Membaca' : 'Reading Progress'}
                    </span>
                    <span className={`text-sm font-serif ${palette.accent} font-semibold`}>
                      {Math.round((completedChapters.length / chapters.length) * 100)}%
                    </span>
                  </div>
                  <div
                    className="w-full h-[2px] rounded-full overflow-hidden"
                    style={{ backgroundColor: palette.dividerColor }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: palette.accentHex }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Chapter list */}
                <nav className="space-y-1 pb-20">
                  {chapters.map((ch, idx) => {
                    const isCompleted = completedChapters.includes(ch.num);
                    const isActive = activeChapter === ch.num;
                    return (
                      <motion.a
                        key={ch.num}
                        href={ch.num === 0 ? '#pengantar' : `#bagian-${ch.num}`}
                        onClick={() => setSidebarOpen(false)}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100 }}
                        className={`group flex items-center gap-4 p-4 rounded-xl text-sm transition-all duration-300 ${
                          isActive
                            ? `${palette.accentBg} border ${palette.accentBorder}`
                            : isCompleted
                            ? `${palette.card} border ${palette.border}`
                            : ''
                        }`}
                      >
                        <span
                          className={`font-serif font-bold flex-shrink-0 w-7 text-center text-base ${isCompleted || isActive ? palette.accent : palette.muted}`}
                        >
                          {isCompleted
                            ? <Check size={16} strokeWidth={2.5} className={palette.accent} />
                            : ch.num === 0 ? '✦'
                            : ['I','II','III','IV'][ch.num - 1]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-serif font-medium text-sm truncate ${isActive ? palette.accent : isCompleted ? palette.heroText : palette.muted}`}>
                            {ch.title}
                          </p>
                          <p className={`text-xs mt-0.5 truncate ${palette.muted} font-serif italic`}>{ch.subtitle}</p>
                        </div>
                        {isActive && <ChevronRight size={14} strokeWidth={2} className={palette.accent} />}
                      </motion.a>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════════════ MAIN CONTENT ═══════════════════════ */}
      <main className="pt-0 pb-32 font-serif antialiased reader-content">

        {/* ─── HERO ─── */}
        <motion.section
          id="pengantar"
          data-chapter={0}
          initial="hidden" animate="visible" variants={fadeIn}
          className="relative flex items-center justify-center min-h-screen px-6 sm:px-8 overflow-hidden"
          style={{ backgroundColor: darkMode ? '#0b0d18' : '#efece4' }}
        >
          {/* Atmospheric glows */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: palette.indigoGlow }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: palette.amberGlow }} />

          {/* Stars / fireflies */}
          {!prefersReducedMotion && [...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full"
              style={{
                backgroundColor: palette.accentHex,
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{
                duration: 2.5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'easeInOut',
              }}
            />
          ))}

          <div className="max-w-3xl mx-auto w-full text-center relative z-10 pt-24 pb-28">
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Ornament */}
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-14 border ${palette.accentBorder} ${palette.accentBg}`}
                style={{ boxShadow: `0 0 40px ${palette.accentHex}15` }}
              >
                <Feather size={28} strokeWidth={1} className={palette.accent} />
              </div>

              {/* Tagline */}
              <p
                className={`text-xs tracking-[0.4em] uppercase mb-6 font-sans font-medium ${palette.muted}`}
              >
                {id ? 'Sebuah Catatan Malam' : 'A Midnight Note'}
              </p>

              <h1 className={`font-serif font-bold tracking-tight leading-[1.05] mb-4 ${palette.heroText}`}
                style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
              >
                {id ? 'Arsip' : 'The Silent'}
                <br />
                <span className={`italic font-light ${palette.accent}`}>
                  {id ? 'Sunyi' : 'Archive'}
                </span>
              </h1>

              <p
                className={`font-serif italic font-light tracking-wide max-w-xl mx-auto leading-relaxed mt-6 mb-14 ${palette.muted}`}
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
              >
                {id
                  ? 'Sayap yang telah gugur di ambang kesunyian.'
                  : 'Fallen wings at the edge of silence.'}
              </p>

              {/* Decorative line */}
              <div className="flex items-center gap-5 justify-center mb-10">
                <div className="w-16 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${palette.accentHex}40)` }} />
                <span style={{ color: palette.accentHex, opacity: 0.5, fontSize: '0.5rem' }}>●</span>
                <div className="w-16 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${palette.accentHex}40)` }} />
              </div>

              <button
                onClick={() => setSidebarOpen(true)}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-serif border ${palette.accentBorder} ${palette.accentBg} ${palette.accent} hover:shadow-lg transition-all duration-500 tracking-widest text-xs uppercase`}
                style={{ boxShadow: `0 4px 24px ${palette.accentHex}10` }}
              >
                <BookOpen size={16} strokeWidth={1.5} />
                {id ? 'Mulai Membaca' : 'Start Reading'}
              </button>
            </motion.div>
          </div>

          {/* Scroll nudge */}
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${palette.muted}`}
          >
            <span className="text-xs font-serif tracking-[0.3em] uppercase opacity-50">
              {id ? 'Gulir ke bawah' : 'Scroll down'}
            </span>
            <div className="w-[1px] h-12" style={{ background: `linear-gradient(to bottom, ${palette.accentHex}40, transparent)` }} />
          </motion.div>
        </motion.section>

        {/* ─── BAGIAN I ─── */}
        <motion.section
          id="bagian-1" data-chapter={1}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
          className="relative max-w-2xl mx-auto px-6 sm:px-10 py-24 sm:py-32"
          style={{ borderBottom: `1px solid ${palette.dividerColor}` }}
        >
          <ChapterHeader
            roman="I"
            subtitle={id ? 'Malam yang Berbeda' : 'A Different Night'}
          />

          <div className={`space-y-7 text-lg sm:text-xl leading-[2] ${palette.heroText}`}
            style={{ fontWeight: 300 }}>
            <p>
              {id
                ? 'Malam ini turun dengan cara yang berbeda dari malam-malam yang sudah-sudah. Ada bobot yang tak biasa di dalamnya, seolah langit sendiri sedang menahan napas, menunggu sesuatu selesai diucapkan sebelum ia mengizinkan dini hari datang.'
                : 'This night descends differently from all the nights before. There is an unusual weight to it, as if the sky itself is holding its breath, waiting for something to be spoken before it allows the dawn to arrive.'}
            </p>
            <p>
              {id
                ? 'Aku duduk di depan layar yang masih menyala, di antara baris-baris manuskrip yang belum sempat kurampungkan, dan untuk pertama kalinya dalam waktu yang lama, aku tidak tahu lagi kalimat apa yang hendak kutulis.'
                : 'I sit before the glowing screen, among lines of a manuscript I haven\'t managed to finish, and for the first time in a long time, I no longer know what words to write.'}
            </p>

            {dotSeparator}

            <LetterQuote>
              {id
                ? 'Kopi di gelasku telah lama kehilangan hangatnya. Lucu sekali—betapa banyak hal dalam hidup yang akhirnya mendingin semata-mata karena kita terlalu lama menatapnya, alih-alih meminumnya selagi masih ada waktu.'
                : 'The coffee in my glass has long lost its warmth. How funny—how many things in life turn cold simply because we stare at them too long, instead of drinking them while there is still time.'}
            </LetterQuote>

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
          className="relative max-w-2xl mx-auto px-6 sm:px-10 py-24 sm:py-32"
          style={{ borderBottom: `1px solid ${palette.dividerColor}` }}
        >
          <ChapterHeader
            roman="II"
            subtitle={id ? 'Dua Burung, Satu Senja' : 'Two Birds, One Dusk'}
          />

          <div className={`space-y-7 text-lg sm:text-xl leading-[2] ${palette.heroText}`}
            style={{ fontWeight: 300 }}>
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

            {dotSeparator}

            <p>
              {id
                ? 'Sebab kita, kutahu sekarang, hanyalah dua musafir yang kebetulan berpapasan di satu dermaga senja—saling mengagumi cahaya masing-masing sejenak, sebelum kapal kita melanjutkan haluan yang berbeda. Kau menatap ke arah kaki langit yang jauh, ke arah dunia luas yang sudah lama memanggil namamu. Aku tetap berdiri di sini, di tanah yang sama sejak aku lahir, memeluk bayanganmu yang perlahan pudar ditelan jarak dan kabut laut.'
                : "For we, I know now, are but two travelers who happened to cross paths on a twilight pier—admiring each other's light for a moment, before our ships continued on different courses. You gazed toward the distant horizon, toward the vast world that had long been calling your name. I remained standing here, on the same ground since I was born, embracing your shadow slowly fading into distance and sea mist."}
            </p>

            <LetterQuote>
              {id
                ? 'Cinta jarang keliru menaruh dua jenis burung dalam satu senja. Yang sering keliru hanyalah harapan kita sendiri, yang keras kepala mengira keduanya bisa memiliki langit yang sama.'
                : 'Love rarely errs in placing two kinds of birds in the same dusk. What often errs is our own hope, stubbornly assuming both could share the same sky.'}
            </LetterQuote>

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
          className="relative max-w-2xl mx-auto px-6 sm:px-10 py-24 sm:py-32"
          style={{ borderBottom: `1px solid ${palette.dividerColor}` }}
        >
          <ChapterHeader
            roman="III"
            subtitle={id ? 'Melawan Takdir' : 'Fighting Destiny'}
          />

          <div className={`space-y-7 text-lg sm:text-xl leading-[2] ${palette.heroText}`}
            style={{ fontWeight: 300 }}>
            <p>
              {id
                ? 'Maka, sempat kuputuskan untuk melawan takdirku sendiri. Kukumpulkan sisa napas dan keberanian yang kupunya. Kurentangkan apa yang tersisa dari sayapku, bersiap menyeberangi lautan badai menujumu—hanya untuk mendapati, sebelum sayap itu sempat terkepak sekali pun, kau telah menutup jendelamu, perlahan namun pasti.'
                : "And so, I once decided to fight my own destiny. I gathered the rest of my breath and courage. I stretched what remained of my wings, preparing to cross the stormy seas toward you—only to find, before those wings could flap even once, that you had closed your window, slowly but surely."}
            </p>

            <LetterQuote>
              {id
                ? '"Kita tidak sedang memandang langit yang sama," katamu, dengan suara yang tetap lembut, tanpa amarah, tanpa keinginan untuk melukai. Kau memintaku menyimpan nyala ini untuk perapian yang lain, di suatu hari, di suatu tempat yang belum kutahu.'
                : '"We are not looking at the same sky," you said, with a voice that remained gentle, without anger, without the desire to hurt. You asked me to save this flame for another hearth, someday, somewhere I have yet to know.'}
            </LetterQuote>

            <p>
              {id
                ? 'Aku pikir aku akan lebih siap menghadapi penolakan yang datang dengan suara keras—dengan pintu yang dibanting, dengan kata-kata yang bisa kubalas atau kusesali bersama. Tapi penolakan yang datang selembut ini tidak menyisakan apa pun untuk dilawan.'
                : "I thought I would be more prepared for a rejection that came with loud noises—with slammed doors, with words I could retort or regret together. But a rejection this gentle leaves nothing to fight against."}
            </p>
            <p>
              {id
                ? 'Tidak ada perang yang bisa kunyatakan usai. Tidak ada musuh yang bisa kutuduh atas jatuhnya seorang pengelana yang terlalu percaya diri hendak menyeberangi laut. Aku hanya tenggelam, sunyi-sunyi, ke dalam satu kesadaran: bahwa tidak ada yang bisa diperjuangkan atas nama seseorang yang sudah menentukan arah anginnya sendiri.'
                : "There is no war I can declare over. No enemy I can accuse of downing an overconfident traveler attempting to cross the sea. I only sink, quietly, into one realization: that nothing can be fought for in the name of someone who has already set their own wind's direction."}
            </p>

            {dotSeparator}

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
          className="relative max-w-2xl mx-auto px-6 sm:px-10 py-24 sm:py-32"
        >
          <ChapterHeader
            roman="IV"
            subtitle={id ? 'Arsip Sunyi' : 'The Silent Archive'}
          />

          <div className={`space-y-7 text-lg sm:text-xl leading-[2] ${palette.heroText}`}
            style={{ fontWeight: 300 }}>
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

            {dotSeparator}

            <LetterQuote>
              {id
                ? 'Di duniaku malam ini, kisah itu telah usai, bahkan sebelum bab pertamanya sempat kutulis sampai titik. Dan barangkali begitulah caranya sebagian cerita memang harus berakhir: bukan dengan luka yang menganga, melainkan dengan kesunyian yang, pada akhirnya, punya keindahannya sendiri.'
                : 'In my world tonight, the story has ended, even before I could write its first chapter to the period. And perhaps that is how some stories are meant to end: not with a gaping wound, but with a silence that, in the end, has a beauty of its own.'}
            </LetterQuote>

            <p>
              {id
                ? 'Biarlah Tuhan yang menyimpan sisa cerita kita, sebagaimana Ia menyimpan seluruh cerita yang dipaksa selesai sebelum sempat benar-benar dimulai.'
                : "Let God keep the rest of our story, just as He keeps all stories forced to end before they truly begin."}
            </p>
          </div>

          {/* ─── Closing ornament ─── */}
          <div className="text-center mt-24 pt-16" style={{ borderTop: `1px dashed ${palette.dividerColor}` }}>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-[1px]" style={{ backgroundColor: palette.accentHex, opacity: 0.3 }} />
                <Feather size={16} strokeWidth={1} className={`${palette.accent} opacity-40`} />
                <div className="w-10 h-[1px]" style={{ backgroundColor: palette.accentHex, opacity: 0.3 }} />
              </div>
              <p className={`font-serif text-sm italic ${palette.muted} opacity-50 tracking-widest`}>
                {id ? '— Selesai —' : '— End —'}
              </p>
              <p className={`font-serif text-xs ${palette.muted} opacity-30 tracking-[0.2em] uppercase`}>
                Arsip Sunyi · 2026
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
