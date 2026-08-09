'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Moon, X, ChevronRight, Check, Quote, Wind } from 'lucide-react';
import { useReader } from '@/src/contexts/ReaderContext';
import ReaderControls from '@/src/components/ReaderControls';
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function SunyiYangKutinggaliPage() {
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
    { num: 0, title: id ? 'Pengantar' : 'Prelude', subtitle: id ? 'Menggambar, Bukan Menceritakan' : 'Portraying, Not Narrating' },
    { num: 1, title: 'I', subtitle: id ? 'Kota yang Tak Pernah Tidur' : 'The City That Never Sleeps' },
    { num: 2, title: 'II', subtitle: id ? 'Kau Datang' : 'You Arrived' },
    { num: 3, title: 'III', subtitle: id ? 'Cinta yang Pelan' : 'The Slow Love' },
    { num: 4, title: 'IV', subtitle: id ? 'Hari di Tebing' : 'The Day on the Cliff' },
    { num: 5, title: 'V', subtitle: id ? 'Perpisahan' : 'The Farewell' },
    { num: 6, title: 'VI', subtitle: id ? 'Dua Jenis Sunyi' : 'Two Kinds of Silence' },
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
                        {id ? 'Sunyi yang Kutinggali' : 'The Silence I Inhabit'}
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
                          {isCompleted ? <Check size={18} strokeWidth={2} /> : ch.num === 0 ? '✦' : ['I','II','III','IV','V','VI'][ch.num - 1]}
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
                  <>Sunyi yang<br /><span className={`${theme.accent} italic font-light`}>Kutinggali</span></>
                ) : (
                  <>The Silence<br /><span className={`${theme.accent} italic font-light`}>I Inhabit</span></>
                )}
              </h1>

              <div className={`w-24 h-[1px] mx-auto ${darkMode ? 'bg-[#c9a86c]/40' : 'bg-[#7d5a3c]/40'} mb-8`} />

              <p className={`text-xl sm:text-2xl ${theme.textSubheading} italic mb-12 font-serif font-light tracking-wide max-w-2xl mx-auto leading-relaxed`}>
                {id
                  ? 'Bukan cerita yang berjalan menurut waktu, melainkan gambaran tentang keadaan hati yang, untuk sesaat, berhenti menjadi ramai.'
                  : 'It is not a story that runs by the clock, but a portrait of a heart that, for a moment, ceased its noise.'}
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
              {id ? 'Kota yang Tak Pernah Tidur' : 'The City That Never Sleeps'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              {id
                ? 'Sunyi, aku ingin bercerita tentang kita berdua. Tapi bagaimana aku bisa menyusunmu dalam urutan waktu, sedangkan kau sendiri tak pernah tunduk pada jam atau kalender?'
                : 'In this silence, I want to tell the story of us both. But how can I arrange you in chronological order, when you yourself never bowed to clocks or calendars?'}
            </p>
            <p>
              {id
                ? 'Maka biarkan aku menggambarkanmu saja, bukan menceritakanmu—sebab kau bukan peristiwa yang terjadi lalu selesai, kau adalah keadaan yang masih menghuni dadaku sampai sekarang.'
                : 'So let me merely describe you, rather than narrate you—for you are not an event that happened and ended; you are a state of being that still resides within my chest to this day.'}
            </p>

            <div className={accentLine}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                {id
                  ? 'Ada sebuah dunia yang berjalan begitu cepat sehingga manusia lupa cara mendengar dirinya sendiri.'
                  : 'There is a world that moves so fast that people forget how to listen to themselves.'}
              </p>
            </div>

            <p>
              {id
                ? 'Aku salah satu penghuninya. Bertahun-tahun aku hidup sebagai tawanan di dalam kepalaku sendiri—sebuah kota yang tak pernah tidur, dipenuhi suara-suara yang saling menyalip: pertanyaan yang tak pernah menunggu dijawab, penyesalan yang datang lebih cepat daripada kesalahan itu sendiri, ketakutan yang mengenakan seribu wajah agar tak dikenali sebagai ketakutan.'
                : 'I am one of its inhabitants. For years I lived as a captive inside my own head—a city that never sleeps, filled with overlapping voices: questions that never wait for answers, regrets that arrive faster than the mistakes themselves, fears wearing a thousand faces so as not to be recognized as fear.'}
            </p>
            <p>
              {id
                ? 'Aku belajar tersenyum pada dunia supaya dunia tak bertanya lebih jauh. Senyum itu topeng yang paling ringan, dan karena itu paling mudah dipakai setiap hari.'
                : 'I learned to smile at the world so the world wouldn\'t ask further. A smile is the lightest of masks, and therefore the easiest to wear every day.'}
            </p>
            <p>
              {id
                ? 'Manusia-manusia yang datang dan pergi di hadapanku mengira aku baik-baik saja, sebab aku pandai kelihatan baik-baik saja. Mereka tak tahu, di balik setiap tawa yang kuberikan, ada ruangan sunyi yang kukunci rapat-rapat, tempat aku duduk sendirian bersama gema pertanyaan yang tak pernah selesai kutanyakan pada siapa pun: untuk apa semua ini, dan mengapa aku harus terus berjalan sementara tak tahu ke mana arah yang benar.'
                : "The people who came and went before me thought I was fine, because I was good at appearing fine. They didn't know that behind every laugh I offered, there was a quiet room I kept tightly locked, a place where I sat alone with the echo of questions I never finished asking anyone: what is all this for, and why must I keep walking when I don't know which way is right."}
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
              {id ? 'Kau Datang' : 'You Arrived'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              {id
                ? 'Lalu kau datang—tanpa pengumuman, tanpa alasan, seperti hujan yang tak pernah meminta izin pada bumi yang akan menerimanya.'
                : "Then you came—without announcement, without reason, like rain that never asks permission from the earth that will receive it."}
            </p>
            <p>
              {id
                ? 'Aku tak bisa menyebutkan tanggalnya. Waktu itu sendiri seperti berhenti berlagak penting begitu kau berjalan masuk.'
                : "I cannot name the date. Time itself seemed to stop pretending to be important the moment you walked in."}
            </p>
            <p>
              {id
                ? 'Kau memilih tempat paling redup, seolah cahaya adalah sesuatu yang tak lagi kau butuhkan untuk dikenali. Kau tak membawa kegelisahan yang biasa dibawa orang-orang—tak ada yang perlu kau buktikan, tak ada yang perlu kau tunjukkan. Kau hanya ada, sepenuhnya, dan keberadaanmu saja membuat ruangan di sekitarmu ikut belajar caranya diam.'
                : "You chose the dimmest spot, as if light were something you no longer needed to be recognized. You didn't carry the restlessness people usually carry—there was nothing you needed to prove, nothing you needed to show. You simply existed, entirely, and your mere presence made the room around you learn how to be quiet."}
            </p>

            <div className={accentLine}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                {id
                  ? 'Aku memperhatikanmu dari balik uap yang naik dari cangkir-cangkir yang kuseduh sepanjang hari.'
                  : "I watched you from behind the steam rising from the cups I brewed all day."}
              </p>
            </div>

            <p>
              {id
                ? 'Ada sesuatu di wajahmu yang tak bisa kunamai. Bukan kecantikan yang biasa dipuja orang. Lebih seperti ketenangan yang berhasil pulang ke rumahnya sendiri, sementara aku masih tersesat mencari jalan pulang ke dalam diriku.'
                : "There was something in your face I couldn't name. Not the kind of beauty people usually worship. More like a calmness that had finally found its way home, while I was still lost, looking for the way back into myself."}
            </p>
            <p>
              {id
                ? 'Aku tak ingat lagi kapan tepatnya tangan kita bersentuhan untuk pertama kali—yang kuingat hanya bahwa kepalaku, untuk sesaat, berhenti berbicara. Bukan diam yang kupaksakan seperti biasa kulakukan tiap malam sebelum tidur, melainkan diam yang datang sendiri, seolah seluruh kebisingan di dalam diriku akhirnya menemukan alasan untuk berhenti berteriak.'
                : "I no longer remember exactly when our hands touched for the first time—all I remember is that my head, for a moment, stopped talking. Not the forced silence I usually imposed on myself every night before sleep, but a silence that arrived on its own, as if all the noise inside me had finally found a reason to stop screaming."}
            </p>
            <p>
              {id
                ? 'Kau menatapku dengan mata yang seperti sudah lama mengenal seluruh pertanyaanku, bahkan sebelum aku sempat mengucapkannya.'
                : "You looked at me with eyes that seemed to have long known all my questions, even before I had the chance to voice them."}
            </p>
            <p>
              {id
                ? 'Sejak saat itu kita mulai berbagi waktu, meski aku tak bisa lagi mengurutkan bagaimana caranya. Yang kuingat hanyalah percakapan-percakapan panjang di meja-meja yang kosong, tempat aku menumpahkan seluruh ketakutanku tentang hidup yang terasa berulang tanpa arti, tentang Tuhan yang kadang terasa jauh, tentang eksistensi yang kadang terasa seperti hukuman tanpa sebab.'
                : "Since then we began sharing time, though I can no longer sort out how. All I remember are long conversations at empty tables, where I poured out all my fears about a life that felt pointlessly repetitive, about a God who sometimes felt distant, about an existence that sometimes felt like an unprovoked punishment."}
            </p>
            <p>
              {id
                ? <>Kau tak pernah membantahku. Kau juga tak pernah membenarkanku begitu saja. Kau hanya mendengarkan sampai aku selesai—dan entah kenapa, di dekatmu, satu pertanyaan mulai tumbuh sendiri dalam kepalaku: <em>kalau hari ini satu-satunya hari yang kupunya, apakah aku akan tetap menjalani semuanya persis seperti tadi pagi?</em></>
                : <>You never argued with me. You never blindly validated me either. You simply listened until I was finished—and somehow, near you, a single question began to grow on its own inside my head: <em>if today were the only day I had, would I still live through it all exactly as I did this morning?</em></>}
            </p>
            <p>
              {id
                ? 'Aku tak pernah menjawabnya. Tapi pertanyaan itu tinggal, mengendap, diam-diam mengubah cara aku memandang setiap hal kecil yang dulu kulewati tanpa kusadari.'
                : "I never answered it. But the question stayed, settled, quietly altering the way I looked at every little thing I used to pass by without noticing."}
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
              {id ? 'Cinta yang Pelan' : 'The Slow Love'}
            </span>
          </div>

          <div className={`rounded-2xl p-10 sm:p-14 mb-12 border ${theme.border} ${theme.card} text-center`}>
            <p className={`text-2xl sm:text-3xl font-serif italic font-light leading-relaxed ${theme.textHeading}`}>
              {id
                ? '&ldquo;Cinta yang kutemukan bersamamu datang seperti sunyi itu sendiri: pelan-pelan, tanpa suara, mengisi ruangan tanpa pernah terasa memenuhi.&rdquo;'
                : '"The love I found with you came like silence itself: slowly, soundlessly, filling the space without ever making it feel full."'}
            </p>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              {id
                ? 'Cinta, kalau memang itu nama yang tepat untuk apa yang tumbuh di antara kita, bukanlah sesuatu yang datang dengan gemuruh seperti yang digambarkan orang-orang dalam puisi dan lagu.'
                : "Love, if that is indeed the right name for what grew between us, was not something that arrived with the roar people describe in poems and songs."}
            </p>
            <p>
              {id
                ? 'Ia tak menuntut apa-apa dariku selain kejujuran untuk duduk bersama keburukan-keburukan yang selama ini kusembunyikan bahkan dari diriku sendiri.'
                : "It demanded nothing of me but the honesty to sit with the flaws I had been hiding, even from myself."}
            </p>
          </div>
        </motion.section>

        {/* ─── BAGIAN IV ─── */}
        <motion.section
          id="bagian-4" data-chapter={4}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className={`font-serif text-base tracking-[0.2em] uppercase antialiased ${theme.accent} opacity-70`}>IV</span>
            {divider}
            <span className={`font-serif text-base sm:text-lg italic antialiased ${theme.textMuted}`}>
              {id ? 'Hari di Tebing' : 'The Day on the Cliff'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              {id
                ? 'Ada satu hari—aku menyebutnya hari karena tak ada kata lain, meski aku tak lagi ingat itu hari apa dalam seminggu—kau membawaku pergi jauh dari segala yang biasa kukenal. Kita mendaki sesuatu yang lebih menyerupai bagian dari diri kita sendiri daripada sekadar tebing berbatu: jalan yang licin, jalan yang tak pernah kutempuh, jalan yang mengharuskan aku memercayai langkahku sendiri untuk pertama kalinya dalam waktu yang sangat lama.'
                : "There was a day—I call it a day because there is no other word, though I no longer remember what day of the week it was—when you took me far away from everything I knew. We climbed something that resembled a part of ourselves more than just a rocky cliff: a slippery path, a path I had never taken, a path that required me to trust my own steps for the first time in a very long time."}
            </p>
            <p>
              {id
                ? 'Kau berjalan di depan, tak sekali pun ragu, seolah kau tahu bahwa tersesat hanyalah nama lain untuk belum sampai.'
                : "You walked ahead, not doubting for a second, as if you knew that being lost was just another name for not having arrived yet."}
            </p>

            <div className={accentLine}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                {id
                  ? 'Di ujung jalan itu, dunia membuka diri jadi laut.'
                  : "At the end of that path, the world opened itself into the sea."}
              </p>
            </div>

            <p>
              {id
                ? 'Bukan laut yang pernah kulihat di kartu pos atau di layar ponsel, tapi laut yang seperti sudah menunggu di sana sejak sebelum ada nama untuk kata "menunggu".'
                : 'Not the sea I had seen on postcards or phone screens, but a sea that seemed to have been waiting there since before there was a name for the word "waiting".'}
            </p>
            <p>
              {id
                ? 'Kita duduk berdampingan di atas kayu yang dingin, tak bicara, membiarkan ombak mengambil alih semua kalimat yang biasanya perlu kuucapkan supaya dunia tahu aku ada.'
                : "We sat side by side on a piece of cold wood, not speaking, letting the waves take over all the sentences I usually needed to say just so the world knew I existed."}
            </p>
            <p>
              {id
                ? 'Dan di sanalah, entah pada hitungan ombak yang keberapa, kepalaku—kota yang tak pernah tidur itu—akhirnya padam satu per satu lampunya. Bukan karena kupaksa lewat cara-cara yang biasa kupelajari dari buku-buku dan video-video yang menjanjikan ketenangan dalam lima langkah mudah. Ia padam dengan sendirinya, seperti kota mana pun yang akhirnya lelah menyalakan diri sepanjang malam.'
                : "And it was there, on I don't know which count of the waves, that my head—that city that never sleeps—finally turned off its lights one by one. Not because I forced it through the methods I usually learned from books and videos promising peace in five easy steps. It went out on its own, like any city that finally tires of keeping itself lit all night."}
            </p>
            <p>
              {id
                ? 'Aku tak lagi bertanya mengapa aku ada. Aku hanya ada, sesederhana ombak yang datang lalu pergi tanpa perlu penjelasan.'
                : "I no longer asked why I existed. I just was, as simple as a wave that comes and goes without the need for an explanation."}
            </p>
            <p>
              {id
                ? 'Dan dalam kesederhanaan itu, dalam kekosongan yang untuk sekali saja tidak menuntut apa-apa dariku, aku menemukan sesuatu yang mungkin bisa disebut Tuhan—bukan Tuhan yang tinggal di kitab-kitab atau di ujung doa yang dihafal, melainkan Tuhan yang tinggal di dalam sunyi yang, untuk sekali saja, membiarkan aku menjadi tak berarti tanpa merasa hancur karenanya.'
                : "And in that simplicity, in that emptiness that for once demanded nothing of me, I found something that might be called God—not the God who lives in holy books or at the end of memorized prayers, but a God who resides in the silence that, for once, allowed me to be insignificant without feeling shattered by it."}
            </p>
          </div>
        </motion.section>

        {/* ─── BAGIAN V ─── */}
        <motion.section
          id="bagian-5" data-chapter={5}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className={`font-serif text-base tracking-[0.2em] uppercase antialiased ${theme.accent} opacity-70`}>V</span>
            {divider}
            <span className={`font-serif text-base sm:text-lg italic antialiased ${theme.textMuted}`}>
              {id ? 'Perpisahan' : 'The Farewell'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              {id
                ? 'Tapi begitulah hukum yang tak pernah tertulis di mana pun, dan karena itu paling sering dilupakan orang: setiap kedamaian datang membawa jam pasirnya sendiri, dan pasir itu tak pernah berhenti jatuh hanya karena kita memohon.'
                : "But such is the unwritten law, and therefore most often forgotten by people: every peace comes carrying its own hourglass, and the sand never stops falling just because we beg it to."}
            </p>
            <p>
              {id
                ? 'Kau harus kembali—ke sebuah dunia yang sudah menantimu jauh sebelum aku belajar mengenal namamu, ke kehidupan yang tak pernah punya ruang untuk menyimpan namaku di dalamnya.'
                : "You had to return—to a world that had been waiting for you long before I learned your name, to a life that never had the space to keep my name in it."}
            </p>
            <p>
              {id
                ? 'Perpisahan kita tak punya drama yang biasa dimiliki perpisahan-perpisahan dalam cerita. Tak ada tangis yang pecah, tak ada kalimat yang diteriakkan ke udara supaya semesta ikut mendengar dan bersedih bersama kita. Yang ada hanya keheningan yang lebih berat dari biasanya, seperti udara sebelum hujan yang tahu dirinya akan turun tapi memilih menunggu waktu yang tepat.'
                : "Our parting had none of the drama usually found in storybook farewells. There were no shattered tears, no sentences screamed into the air so the universe would listen and grieve with us. There was only a silence heavier than usual, like the air before the rain, knowing it will fall but choosing to wait for the exact right time."}
            </p>

            <div className={accentLine}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                {id
                  ? 'Kau memelukku sebelum pergi—atau mungkin aku yang memelukmu, aku sudah tak bisa lagi membedakan siapa yang lebih dulu membutuhkan pelukan itu.'
                  : "You hugged me before you left—or perhaps I hugged you, I could no longer tell who needed the embrace first."}
              </p>
            </div>

            <p>
              {id
                ? 'Dalam pelukan itu aku menitipkan satu doa yang tak pernah kuucapkan lantang: bahwa apa pun yang tumbuh di antara kita tak akan benar-benar mati, hanya berpindah bentuk jadi sesuatu yang lebih senyap, seperti abu yang tetap menyimpan bentuk kayu meski apinya sudah lama padam.'
                : "Within that embrace I slipped in a prayer I never spoke aloud: that whatever had grown between us would never truly die, but only shift into a quieter form, like ash that retains the shape of the wood even though the fire has long gone out."}
            </p>
            <p>
              {id
                ? 'Kau berjalan pergi tanpa menoleh, dan bayang-bayang menelanmu perlahan seperti malam menelan senja—bukan sekaligus, tapi sedikit demi sedikit, sampai tak ada lagi batas yang bisa kutunjuk sebagai saat persisnya kau benar-benar hilang.'
                : "You walked away without looking back, and the shadows swallowed you slowly the way the night swallows the dusk—not all at once, but little by little, until there was no longer a boundary I could point to as the exact moment you were truly gone."}
            </p>
            <p>
              {id
                ? 'Aku pulang sendirian malam itu, membawa satu jenis sunyi yang belum pernah kukenal sebelumnya.'
                : "I walked home alone that night, carrying a kind of silence I had never known before."}
            </p>
          </div>
        </motion.section>

        {/* ─── BAGIAN VI ─── */}
        <motion.section
          id="bagian-6" data-chapter={6}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className={`font-serif text-base tracking-[0.2em] uppercase antialiased ${theme.accent} opacity-70`}>VI</span>
            {divider}
            <span className={`font-serif text-base sm:text-lg italic antialiased ${theme.textMuted}`}>
              {id ? 'Dua Jenis Sunyi' : 'Two Kinds of Silence'}
            </span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              {id
                ? 'Sebab ada dua jenis sunyi, kutemukan kemudian. Ada sunyi yang lahir dari kehilangan, yang menganga dan meminta untuk diisi—dan ada sunyi yang lahir dari kepenuhan, yang tak lagi butuh apa-apa untuk merasa lengkap.'
                : "Because there are two kinds of silence, I discovered later. There is a silence born of loss, gaping and begging to be filled—and there is a silence born of fullness, which no longer needs anything to feel complete."}
            </p>

            <div className={`rounded-2xl p-10 sm:p-14 my-12 border ${theme.border} ${theme.card} text-center`}>
              <p className={`text-2xl sm:text-3xl font-serif italic font-light leading-relaxed ${theme.textHeading}`}>
                {id
                  ? '&ldquo;Yang kau tinggalkan untukku, ternyata, adalah yang kedua.&rdquo;'
                  : '"What you left for me, it turned out, was the latter."'}
              </p>
            </div>

            <p>
              {id
                ? 'Dunia masih berjalan secepat biasanya esok paginya. Manusia-manusia masih datang membawa keluhan yang sama tentang atasan dan kekasih yang tak kunjung membalas pesan. Aku masih memakai senyum yang sama seperti seragam yang sama.'
                : "The world still moved as fast as usual the next morning. People still came carrying the same complaints about bosses and lovers who wouldn't reply to their messages. I still wore the same smile like the same uniform."}
            </p>
            <p>
              {id
                ? 'Tapi di dalam diriku, kota yang dulu tak pernah tidur itu kini punya satu ruangan yang selalu tenang, apa pun yang terjadi di ruangan-ruangan lainnya—dan di ruangan itulah kau tinggal, atau mungkin bukan kau, melainkan segala yang kau ajarkan tentang caranya diam tanpa merasa kosong.'
                : "But inside me, the city that once never slept now has one room that is always calm, no matter what happens in the other rooms—and in that room you reside, or perhaps not you, but everything you taught me about how to be silent without feeling empty."}
            </p>
            <p>
              {id
                ? 'Sudut paling redup di kedai itu masih kosong sampai sekarang. Aku tak lagi menunggunya terisi oleh siapa pun. Aku membiarkannya kosong, sebab beberapa ruang memang diciptakan untuk tetap menjadi milik seseorang yang sudah pergi, dan itu bukan kesedihan—itu semacam penghormatan.'
                : "The dimmest corner in the shop remains empty to this day. I no longer wait for it to be filled by anyone. I let it be empty, because some spaces are indeed created to remain belonging to someone who has left, and that is not sadness—it is a kind of reverence."}
            </p>

            <div className={accentLine}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                {id
                  ? 'Hanya sunyi. Sunyi yang, kali ini, bukan lagi penjara—melainkan rumah yang akhirnya kutinggali sepenuh hati, entah sampai kapan.'
                  : "Only silence. A silence that, this time, is no longer a prison—but a home I finally inhabit with all my heart, I don't know until when."}
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
