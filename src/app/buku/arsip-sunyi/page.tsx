'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Moon, X, ChevronRight, Check, Quote, Wind } from 'lucide-react';
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

  const theme = {
    bg: themeStyles.bg,
    text: themeStyles.text,
    textMuted: themeStyles.textMuted,
    textHeading: themeStyles.textHeading,
    textSubheading: themeStyles.textMuted,
    border: themeStyles.border,
    accent: themeStyles.accent,
    accentBg: themeStyles.card,
    accentBorder: themeStyles.border,
    sidebar: themeStyles.sidebar,
    card: themeStyles.card,
    float: darkMode ? 'bg-[#1c1915]/95' : 'bg-[#f5f1e8]/95',
    gradientFrom: darkMode ? 'from-[#1a1714]/40' : 'from-[#d9d0c1]/40',
    gradientTo: darkMode ? 'to-[#0a0908]/10' : 'to-[#f5f1e8]/20',
  };

  const chapters = [
    { num: 0, title: id ? 'Pengantar' : 'Prelude', subtitle: id ? 'Di Ambang Kesunyian' : 'On the Edge of Silence' },
    { num: 1, title: 'I', subtitle: id ? 'Malam yang Berbeda' : 'A Different Night' },
    { num: 2, title: 'II', subtitle: id ? 'Dua Burung, Satu Senja' : 'Two Birds, One Dusk' },
    { num: 3, title: 'III', subtitle: id ? 'Melawan Takdir' : 'Fighting Destiny' },
    { num: 4, title: 'IV', subtitle: id ? 'Arsip Sunyi' : 'The Silent Archive' },
  ];

  const isChapterCompleted = (num: number) => completedChapters.includes(num);

  const fadeIn = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } },
  };

  const sectionFade = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
  };

  const divider = (
    <div className={`flex-1 h-[1px] ${darkMode ? 'bg-[#c9a86c]/20' : 'bg-[#7d5a3c]/20'}`} />
  );

  const accentLine = `border-l-2 ${darkMode ? 'border-[#c9a86c]/40' : 'border-[#7d5a3c]/40'} pl-6 my-10`;

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} ${fontFamilyClass} reader-page transition-colors duration-500 min-h-screen w-full`}>
      <ReaderControls progress={readingProgress} />

      {/* Floating TOC Button */}
      <AnimatePresence>
        {readingProgress > 5 && (
          <motion.button
            initial={prefersReducedMotion ? { opacity: 1 } : { x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onClick={() => setSidebarOpen(true)}
            className={`fixed bottom-8 left-8 z-40 flex items-center gap-3 px-6 py-4 rounded-full ${theme.float} backdrop-blur-md border ${theme.border} shadow-xl ${theme.accent} font-serif tracking-wide`}
          >
            <BookOpen size={18} strokeWidth={1.5} />
            <span className="hidden sm:inline text-sm font-medium">
              {id ? 'Daftar Isi' : 'Contents'}
            </span>
            <span className={`text-xs ml-2 pl-3 border-l ${theme.border} ${theme.textMuted} font-serif`}>
              {String(activeChapter).padStart(2, '0')}/{chapters.length - 1}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 bottom-0 w-full sm:w-[400px] ${theme.sidebar} z-50 overflow-y-auto shadow-2xl`}
            >
              <div className="pt-24 sm:pt-28 p-8 sm:p-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full border ${theme.accentBorder} ${theme.accentBg}`}>
                      <Moon size={22} strokeWidth={1.5} className={theme.accent} />
                    </div>
                    <div>
                      <h2 className={`font-serif font-bold text-xl ${theme.textHeading}`}>
                        {id ? 'Daftar Isi' : 'Table of Contents'}
                      </h2>
                      <p className={`text-sm ${theme.textMuted} font-serif italic`}>
                        {id ? 'Arsip Sunyi' : 'The Silent Archive'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={`p-3 rounded-full ${darkMode ? 'hover:bg-[#2a2622]' : 'hover:bg-[#d4cfc4]'} transition-colors duration-300`}
                  >
                    <X size={22} strokeWidth={1.5} className={theme.textMuted} />
                  </button>
                </div>

                {/* Progress */}
                <div className={`mb-8 p-5 rounded-2xl ${theme.card} border ${theme.border}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-sm ${theme.textMuted} font-serif`}>
                      {id ? 'Progress Membaca' : 'Reading Progress'}
                    </span>
                    <span className={`text-sm font-serif ${theme.accent}`}>
                      {Math.round((completedChapters.length / chapters.length) * 100)}%
                    </span>
                  </div>
                  <div className={`w-full h-[3px] rounded-full ${darkMode ? 'bg-[#2a2622]' : 'bg-[#d4cfc4]'}`}>
                    <motion.div
                      className={`h-full rounded-full ${darkMode ? 'bg-[#c9a86c]' : 'bg-[#7d5a3c]'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Chapter list */}
                <nav className="space-y-1 pb-20">
                  {chapters.map((ch, idx) => {
                    const isCompleted = isChapterCompleted(ch.num);
                    const isActive = activeChapter === ch.num;
                    return (
                      <motion.a
                        key={ch.num}
                        href={ch.num === 0 ? '#pengantar' : `#bagian-${ch.num}`}
                        onClick={() => setSidebarOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100 }}
                        className={`group flex items-center gap-4 p-4 rounded-xl text-sm transition-all duration-300 ${
                          isActive
                            ? `${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder}`
                            : isCompleted
                            ? `${theme.card} ${theme.text} border ${theme.border}`
                            : `${theme.textMuted} hover:${theme.text}`
                        }`}
                      >
                        <span className={`text-lg font-serif font-bold flex-shrink-0 w-8 text-center ${isCompleted || isActive ? theme.accent : theme.textMuted}`}>
                          {isCompleted ? <Check size={18} strokeWidth={2} /> : ch.num === 0 ? '✦' : ['I','II','III','IV'][ch.num - 1]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-serif font-medium text-base truncate ${isActive || isCompleted ? theme.textHeading : theme.text}`}>
                            {ch.title}
                          </p>
                          <p className={`text-xs mt-1 truncate ${theme.textMuted} font-serif italic`}>{ch.subtitle}</p>
                        </div>
                        {isActive && <ChevronRight size={16} strokeWidth={2} />}
                      </motion.a>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="pt-0 pb-32 font-serif antialiased reader-content">

        {/* ─── HERO / PENGANTAR ─── */}
        <motion.section
          id="pengantar"
          data-chapter={0}
          initial="hidden" animate="visible" variants={fadeIn}
          className={`relative flex items-center justify-center min-h-[92vh] px-6 sm:px-8 lg:px-12 border-b ${theme.border} overflow-hidden`}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-70 pointer-events-none`} />
          <div
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: darkMode ? 'radial-gradient(circle, rgba(201,168,108,0.04) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(125,90,60,0.05) 0%, transparent 70%)' }}
          />

          <div className="max-w-3xl mx-auto w-full text-center relative z-10 pt-24 pb-20">
            <motion.div
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${theme.accentBg} border ${theme.accentBorder} mb-12`}>
                <Wind size={30} strokeWidth={1} className={theme.accent} />
              </div>

              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${theme.textHeading} mb-6 tracking-tight leading-[1.1] font-serif`}>
                {id ? (
                  <>Arsip<br /><span className={`${theme.accent} italic font-light`}>Sunyi</span></>
                ) : (
                  <>The Silent<br /><span className={`${theme.accent} italic font-light`}>Archive</span></>
                )}
              </h1>

              <div className={`w-24 h-[1px] mx-auto ${darkMode ? 'bg-[#c9a86c]/40' : 'bg-[#7d5a3c]/40'} mb-8`} />

              <p className={`text-xl sm:text-2xl ${theme.textSubheading} italic mb-12 font-serif font-light tracking-wide max-w-2xl mx-auto leading-relaxed`}>
                {id
                  ? 'Sayap yang telah gugur di ambang kesunyian.'
                  : 'Fallen wings at the edge of silence.'}
              </p>

              <button
                onClick={() => setSidebarOpen(true)}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${theme.accentBg} ${theme.accent} font-serif border ${theme.accentBorder} hover:shadow-lg transition-all duration-500 tracking-wide text-sm uppercase`}
              >
                <BookOpen size={18} strokeWidth={1.5} />
                {id ? 'Mulai Membaca' : 'Start Reading'}
              </button>
            </motion.div>
          </div>

          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${theme.textMuted}`}
          >
            <span className="text-xs font-serif tracking-[0.2em] uppercase opacity-60">
              {id ? 'Gulir ke bawah' : 'Scroll down'}
            </span>
            <div className={`w-[1px] h-10 ${darkMode ? 'bg-[#c9a86c]/30' : 'bg-[#7d5a3c]/30'}`} />
          </motion.div>
        </motion.section>

        {/* ─── BAGIAN I ─── */}
        <motion.section
          id="bagian-1" data-chapter={1}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className={`font-serif text-base tracking-[0.2em] uppercase antialiased ${theme.accent} opacity-70`}>I</span>
            {divider}
            <span className={`font-serif text-base sm:text-lg italic antialiased ${theme.textMuted}`}>
              {id ? 'Malam yang Berbeda' : 'A Different Night'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              {id
                ? 'Malam ini turun dengan cara yang berbeda dari malam-malam yang sudah-sudah. Ada bobot yang tak biasa di dalamnya, seolah langit sendiri sedang menahan napas, menunggu sesuatu selesai diucapkan sebelum ia mengizinkan dini hari datang. Aku duduk di depan layar yang masih menyala, di antara baris-baris manuskrip yang belum sempat kurampungkan, dan untuk pertama kalinya dalam waktu yang lama, aku tidak tahu lagi kalimat apa yang hendak kutulis.'
                : 'This night descends in a way different from the nights before. There is an unusual weight to it, as if the sky itself is holding its breath, waiting for something to be spoken before it allows the dawn to arrive. I sit before the glowing screen, among lines of a manuscript I haven\'t managed to finish, and for the first time in a long time, I no longer know what words to write.'}
            </p>

            <div className={accentLine}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                {id
                  ? 'Kopi di gelasku telah lama kehilangan hangatnya. Lucu sekali—betapa banyak hal dalam hidup yang akhirnya mendingin semata-mata karena kita terlalu lama menatapnya, alih-alih meminumnya selagi masih ada waktu.'
                  : 'The coffee in my glass has long lost its warmth. How funny—how many things in life eventually turn cold simply because we stare at them too long, instead of drinking them while there is still time.'}
              </p>
            </div>

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
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className={`font-serif text-base tracking-[0.2em] uppercase antialiased ${theme.accent} opacity-70`}>II</span>
            {divider}
            <span className={`font-serif text-base sm:text-lg italic antialiased ${theme.textMuted}`}>
              {id ? 'Dua Burung, Satu Senja' : 'Two Birds, One Dusk'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
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
            <p>
              {id
                ? 'Sebab kita, kutahu sekarang, hanyalah dua musafir yang kebetulan berpapasan di satu dermaga senja—saling mengagumi cahaya masing-masing sejenak, sebelum kapal kita melanjutkan haluan yang berbeda.'
                : "For we, I know now, are but two travelers who happened to cross paths on a twilight pier—admiring each other's light for a moment, before our ships continued on different courses."}
            </p>
            <p>
              {id
                ? 'Kau menatap ke arah kaki langit yang jauh, ke arah dunia luas yang sudah lama memanggil namamu. Aku tetap berdiri di sini, di tanah yang sama sejak aku lahir, memeluk bayanganmu yang perlahan pudar ditelan jarak dan kabut laut.'
                : "You gazed toward the distant horizon, toward the vast world that had long been calling your name. I remained standing here, on the same ground since I was born, embracing your shadow slowly fading into distance and sea mist."}
            </p>
            
            <div className={`rounded-2xl p-10 sm:p-14 my-12 border ${theme.border} ${theme.card} text-center`}>
              <p className={`text-2xl sm:text-3xl font-serif italic font-light leading-relaxed ${theme.textHeading}`}>
                {id
                  ? '&ldquo;Cinta jarang keliru menaruh dua jenis burung dalam satu senja. Yang sering keliru hanyalah harapan kita sendiri, yang keras kepala mengira keduanya bisa memiliki langit yang sama.&rdquo;'
                  : '"Love rarely errs in placing two kinds of birds in the same dusk. What often errs is our own hope, stubbornly assuming both could share the same sky."'}
              </p>
            </div>
            
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
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className={`font-serif text-base tracking-[0.2em] uppercase antialiased ${theme.accent} opacity-70`}>III</span>
            {divider}
            <span className={`font-serif text-base sm:text-lg italic antialiased ${theme.textMuted}`}>
              {id ? 'Melawan Takdir' : 'Fighting Destiny'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              {id
                ? 'Maka, sempat kuputuskan untuk melawan takdirku sendiri. Kukumpulkan sisa napas dan keberanian yang kupunya. Kurentangkan apa yang tersisa dari sayapku, bersiap menyeberangi lautan badai menujumu—hanya untuk mendapati, sebelum sayap itu sempat terkepak sekali pun, kau telah menutup jendelamu, perlahan namun pasti.'
                : "And so, I once decided to fight my own destiny. I gathered the rest of my breath and courage. I stretched what remained of my wings, preparing to cross the stormy seas toward you—only to find, before those wings could flap even once, that you had closed your window, slowly but surely."}
            </p>

            <div className={accentLine}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                {id
                  ? '"Kita tidak sedang memandang langit yang sama," katamu, dengan suara yang tetap lembut, tanpa amarah, tanpa keinginan untuk melukai.'
                  : '"We are not looking at the same sky," you said, with a voice that remained gentle, without anger, without the desire to hurt.'}
              </p>
            </div>

            <p>
              {id
                ? 'Kau memintaku menyimpan nyala ini untuk perapian yang lain, di suatu hari, di suatu tempat yang belum kutahu.'
                : "You asked me to save this flame for another hearth, someday, somewhere I have yet to know."}
            </p>
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
            <p>
              {id
                ? 'Maka karena aku mencintaimu—bahkan dalam kemustahilan yang pahit ini—aku memilih diam. Aku menghentikan langkahku tepat ketika aku baru saja belajar caranya berlari ke arahmu.'
                : "And so because I love you—even in this bitter impossibility—I choose to be silent. I stop my steps right when I was just learning how to run toward you."}
            </p>
            <p>
              {id
                ? 'Kutarik kembali kata-kata yang sempat tumpah di ujung lidah, kulipat ia serapi mungkin, dan kusimpan di laci paling dalam dari arsip sunyi tempat aku tinggal sekarang.'
                : "I pull back the words that spilled at the tip of my tongue, fold them as neatly as possible, and store them in the deepest drawer of the silent archive where I now live."}
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
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className={`font-serif text-base tracking-[0.2em] uppercase antialiased ${theme.accent} opacity-70`}>IV</span>
            {divider}
            <span className={`font-serif text-base sm:text-lg italic antialiased ${theme.textMuted}`}>
              {id ? 'Arsip Sunyi' : 'The Silent Archive'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
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

            <div className={`rounded-2xl p-10 sm:p-14 my-12 border ${theme.border} ${theme.card} text-center`}>
              <p className={`text-2xl sm:text-3xl font-serif italic font-light leading-relaxed ${theme.textHeading}`}>
                {id
                  ? '&ldquo;Di duniaku malam ini, kisah itu telah usai, bahkan sebelum bab pertamanya sempat kutulis sampai titik. Dan barangkali begitulah caranya sebagian cerita memang harus berakhir: bukan dengan luka yang menganga, melainkan dengan kesunyian yang, pada akhirnya, punya keindahannya sendiri.&rdquo;'
                  : '"In my world tonight, the story has ended, even before I could write its first chapter to the period. And perhaps that is how some stories are meant to end: not with a gaping wound, but with a silence that, in the end, has a beauty of its own."'}
              </p>
            </div>
          </div>

          {/* Closing ornament */}
          <div className="text-center mt-20 pt-12 border-t border-dashed" style={{ borderColor: darkMode ? 'rgba(201,168,108,0.15)' : 'rgba(125,90,60,0.15)' }}>
            <div className={`flex items-center justify-center gap-6 mb-6 ${theme.textMuted} opacity-40`}>
              <div className={`w-12 h-[1px] ${darkMode ? 'bg-[#c9a86c]' : 'bg-[#7d5a3c]'}`} />
              <span className="text-xl">✦</span>
              <div className={`w-12 h-[1px] ${darkMode ? 'bg-[#c9a86c]' : 'bg-[#7d5a3c]'}`} />
            </div>
            <p className={`font-serif text-base italic antialiased ${theme.textMuted} opacity-60 tracking-wider`}>
              {id ? '— Selesai —' : '— End —'}
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
