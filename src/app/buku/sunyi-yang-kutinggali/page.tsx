'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Moon, X, ChevronRight, Check, Quote, Wind } from 'lucide-react';
import { useReader } from '@/src/contexts/ReaderContext';
import ReaderControls from '@/src/components/ReaderControls';
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function SunyiYangKutinggaliPage() {
  useLanguage();
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
    { num: 0, title: 'Pengantar', subtitle: 'Menggambar, Bukan Menceritakan' },
    { num: 1, title: 'I', subtitle: 'Kota yang Tak Pernah Tidur' },
    { num: 2, title: 'II', subtitle: 'Kau Datang' },
    { num: 3, title: 'III', subtitle: 'Cinta yang Pelan' },
    { num: 4, title: 'IV', subtitle: 'Hari di Tebing' },
    { num: 5, title: 'V', subtitle: 'Perpisahan' },
    { num: 6, title: 'VI', subtitle: 'Dua Jenis Sunyi' },
  ];

  const isChapterCompleted = (num: number) => completedChapters.includes(num);

  const fadeIn = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const sectionFade = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} ${fontFamilyClass} reader-page transition-colors duration-500 min-h-screen w-full`}>
      <ReaderControls progress={readingProgress} />

      {/* Floating Table of Contents Button */}
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
            <span className="hidden sm:inline text-sm font-medium">Daftar Isi</span>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
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
                      <h2 className={`font-serif font-bold text-xl ${theme.textHeading}`}>Daftar Isi</h2>
                      <p className={`text-sm ${theme.textMuted} font-serif italic`}>Sunyi yang Kutinggali</p>
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
                    <span className={`text-sm ${theme.textMuted} font-serif`}>Progress Membaca</span>
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

                {/* Chapter List */}
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
                          {isCompleted ? <Check size={18} strokeWidth={2} /> : ch.num === 0 ? '✦' : ['I', 'II', 'III', 'IV', 'V', 'VI'][ch.num - 1]}
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
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`relative flex items-center justify-center min-h-[92vh] px-6 sm:px-8 lg:px-12 border-b ${theme.border} overflow-hidden`}
        >
          {/* Ambient gradient */}
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-70 pointer-events-none`} />

          {/* Decorative circles */}
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
                Sunyi yang<br />
                <span className={`${theme.accent} italic font-light`}>Kutinggali</span>
              </h1>

              <div className={`w-24 h-[1px] mx-auto ${darkMode ? 'bg-[#c9a86c]/40' : 'bg-[#7d5a3c]/40'} mb-8`} />

              <p className={`text-xl sm:text-2xl ${theme.textSubheading} italic mb-12 font-serif font-light tracking-wide max-w-2xl mx-auto leading-relaxed`}>
                Bukan cerita yang berjalan menurut waktu, melainkan gambaran tentang keadaan hati yang, untuk sesaat, berhenti menjadi ramai.
              </p>

              <button
                onClick={() => setSidebarOpen(true)}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${theme.accentBg} ${theme.accent} font-serif border ${theme.accentBorder} hover:shadow-lg transition-all duration-500 tracking-wide text-sm uppercase`}
              >
                <BookOpen size={18} strokeWidth={1.5} />
                Mulai Membaca
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${theme.textMuted}`}
          >
            <span className="text-xs font-serif tracking-[0.2em] uppercase opacity-60">Gulir ke bawah</span>
            <div className={`w-[1px] h-10 ${darkMode ? 'bg-[#c9a86c]/30' : 'bg-[#7d5a3c]/30'}`} />
          </motion.div>
        </motion.section>

        {/* ─── BAGIAN I: Kota yang Tak Pernah Tidur ─── */}
        <motion.section
          id="bagian-1"
          data-chapter={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          {/* Chapter label */}
          <div className={`flex items-center gap-4 mb-12`}>
            <span className={`font-serif text-sm tracking-[0.3em] uppercase ${theme.accent} opacity-70`}>I</span>
            <div className={`flex-1 h-[1px] ${darkMode ? 'bg-[#c9a86c]/20' : 'bg-[#7d5a3c]/20'}`} />
            <span className={`font-serif text-sm italic ${theme.textMuted}`}>Kota yang Tak Pernah Tidur</span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              Sunyi, aku ingin bercerita tentang kita berdua. Tapi bagaimana aku bisa menyusunmu dalam urutan waktu, sedangkan kau sendiri tak pernah tunduk pada jam atau kalender?
            </p>
            <p>
              Maka biarkan aku menggambarkanmu saja, bukan menceritakanmu—sebab kau bukan peristiwa yang terjadi lalu selesai, kau adalah keadaan yang masih menghuni dadaku sampai sekarang.
            </p>

            <div className={`border-l-2 ${darkMode ? 'border-[#c9a86c]/40' : 'border-[#7d5a3c]/40'} pl-6 my-10`}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                Ada sebuah dunia yang berjalan begitu cepat sehingga manusia lupa cara mendengar dirinya sendiri.
              </p>
            </div>

            <p>
              Aku salah satu penghuninya. Bertahun-tahun aku hidup sebagai tawanan di dalam kepalaku sendiri—sebuah kota yang tak pernah tidur, dipenuhi suara-suara yang saling menyalip: pertanyaan yang tak pernah menunggu dijawab, penyesalan yang datang lebih cepat daripada kesalahan itu sendiri, ketakutan yang mengenakan seribu wajah agar tak dikenali sebagai ketakutan.
            </p>

            <p>
              Aku belajar tersenyum pada dunia supaya dunia tak bertanya lebih jauh. Senyum itu topeng yang paling ringan, dan karena itu paling mudah dipakai setiap hari.
            </p>

            <p>
              Manusia-manusia yang datang dan pergi di hadapanku mengira aku baik-baik saja, sebab aku pandai kelihatan baik-baik saja. Mereka tak tahu, di balik setiap tawa yang kuberikan, ada ruangan sunyi yang kukunci rapat-rapat, tempat aku duduk sendirian bersama gema pertanyaan yang tak pernah selesai kutanyakan pada siapa pun: untuk apa semua ini, dan mengapa aku harus terus berjalan sementara tak tahu ke mana arah yang benar.
            </p>
          </div>
        </motion.section>

        {/* ─── BAGIAN II: Kau Datang ─── */}
        <motion.section
          id="bagian-2"
          data-chapter={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className={`flex items-center gap-4 mb-12`}>
            <span className={`font-serif text-sm tracking-[0.3em] uppercase ${theme.accent} opacity-70`}>II</span>
            <div className={`flex-1 h-[1px] ${darkMode ? 'bg-[#c9a86c]/20' : 'bg-[#7d5a3c]/20'}`} />
            <span className={`font-serif text-sm italic ${theme.textMuted}`}>Kau Datang</span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              Lalu kau datang—tanpa pengumuman, tanpa alasan, seperti hujan yang tak pernah meminta izin pada bumi yang akan menerimanya.
            </p>
            <p>
              Aku tak bisa menyebutkan tanggalnya. Waktu itu sendiri seperti berhenti berlagak penting begitu kau berjalan masuk.
            </p>
            <p>
              Kau memilih tempat paling redup, seolah cahaya adalah sesuatu yang tak lagi kau butuhkan untuk dikenali. Kau tak membawa kegelisahan yang biasa dibawa orang-orang—tak ada yang perlu kau buktikan, tak ada yang perlu kau tunjukkan. Kau hanya ada, sepenuhnya, dan keberadaanmu saja membuat ruangan di sekitarmu ikut belajar caranya diam.
            </p>

            <div className={`border-l-2 ${darkMode ? 'border-[#c9a86c]/40' : 'border-[#7d5a3c]/40'} pl-6 my-10`}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                Aku memperhatikanmu dari balik uap yang naik dari cangkir-cangkir yang kuseduh sepanjang hari.
              </p>
            </div>

            <p>
              Ada sesuatu di wajahmu yang tak bisa kunamai. Bukan kecantikan yang biasa dipuja orang. Lebih seperti ketenangan yang berhasil pulang ke rumahnya sendiri, sementara aku masih tersesat mencari jalan pulang ke dalam diriku.
            </p>
            <p>
              Aku tak ingat lagi kapan tepatnya tangan kita bersentuhan untuk pertama kali—yang kuingat hanya bahwa kepalaku, untuk sesaat, berhenti berbicara. Bukan diam yang kupaksakan seperti biasa kulakukan tiap malam sebelum tidur, melainkan diam yang datang sendiri, seolah seluruh kebisingan di dalam diriku akhirnya menemukan alasan untuk berhenti berteriak.
            </p>
            <p>
              Kau menatapku dengan mata yang seperti sudah lama mengenal seluruh pertanyaanku, bahkan sebelum aku sempat mengucapkannya.
            </p>
            <p>
              Sejak saat itu kita mulai berbagi waktu, meski aku tak bisa lagi mengurutkan bagaimana caranya. Yang kuingat hanyalah percakapan-percakapan panjang di meja-meja yang kosong, tempat aku menumpahkan seluruh ketakutanku tentang hidup yang terasa berulang tanpa arti, tentang Tuhan yang kadang terasa jauh, tentang eksistensi yang kadang terasa seperti hukuman tanpa sebab.
            </p>
            <p>
              Kau tak pernah membantahku. Kau juga tak pernah membenarkanku begitu saja. Kau hanya mendengarkan sampai aku selesai—dan entah kenapa, di dekatmu, satu pertanyaan mulai tumbuh sendiri dalam kepalaku: <em>kalau hari ini satu-satunya hari yang kupunya, apakah aku akan tetap menjalani semuanya persis seperti tadi pagi?</em>
            </p>
            <p>
              Aku tak pernah menjawabnya. Tapi pertanyaan itu tinggal, mengendap, diam-diam mengubah cara aku memandang setiap hal kecil yang dulu kulewati tanpa kusadari.
            </p>
          </div>
        </motion.section>

        {/* ─── BAGIAN III: Cinta yang Pelan ─── */}
        <motion.section
          id="bagian-3"
          data-chapter={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className={`flex items-center gap-4 mb-12`}>
            <span className={`font-serif text-sm tracking-[0.3em] uppercase ${theme.accent} opacity-70`}>III</span>
            <div className={`flex-1 h-[1px] ${darkMode ? 'bg-[#c9a86c]/20' : 'bg-[#7d5a3c]/20'}`} />
            <span className={`font-serif text-sm italic ${theme.textMuted}`}>Cinta yang Pelan</span>
          </div>

          {/* Full-width atmospheric quote */}
          <div className={`rounded-2xl p-10 sm:p-14 mb-12 border ${theme.border} ${theme.card} text-center`}>
            <p className={`text-2xl sm:text-3xl font-serif italic font-light leading-relaxed ${theme.textHeading}`}>
              &ldquo;Cinta yang kutemukan bersamamu datang seperti sunyi itu sendiri: pelan-pelan, tanpa suara, mengisi ruangan tanpa pernah terasa memenuhi.&rdquo;
            </p>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              Cinta, kalau memang itu nama yang tepat untuk apa yang tumbuh di antara kita, bukanlah sesuatu yang datang dengan gemuruh seperti yang digambarkan orang-orang dalam puisi dan lagu.
            </p>
            <p>
              Ia tak menuntut apa-apa dariku selain kejujuran untuk duduk bersama keburukan-keburukan yang selama ini kusembunyikan bahkan dari diriku sendiri.
            </p>
          </div>
        </motion.section>

        {/* ─── BAGIAN IV: Hari di Tebing ─── */}
        <motion.section
          id="bagian-4"
          data-chapter={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className={`flex items-center gap-4 mb-12`}>
            <span className={`font-serif text-sm tracking-[0.3em] uppercase ${theme.accent} opacity-70`}>IV</span>
            <div className={`flex-1 h-[1px] ${darkMode ? 'bg-[#c9a86c]/20' : 'bg-[#7d5a3c]/20'}`} />
            <span className={`font-serif text-sm italic ${theme.textMuted}`}>Hari di Tebing</span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              Ada satu hari—aku menyebutnya hari karena tak ada kata lain, meski aku tak lagi ingat itu hari apa dalam seminggu—kau membawaku pergi jauh dari segala yang biasa kukenal. Kita mendaki sesuatu yang lebih menyerupai bagian dari diri kita sendiri daripada sekadar tebing berbatu: jalan yang licin, jalan yang tak pernah kutempuh, jalan yang mengharuskan aku memercayai langkahku sendiri untuk pertama kalinya dalam waktu yang sangat lama.
            </p>
            <p>
              Kau berjalan di depan, tak sekali pun ragu, seolah kau tahu bahwa tersesat hanyalah nama lain untuk belum sampai.
            </p>

            <div className={`border-l-2 ${darkMode ? 'border-[#c9a86c]/40' : 'border-[#7d5a3c]/40'} pl-6 my-10`}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                Di ujung jalan itu, dunia membuka diri jadi laut.
              </p>
            </div>

            <p>
              Bukan laut yang pernah kulihat di kartu pos atau di layar ponsel, tapi laut yang seperti sudah menunggu di sana sejak sebelum ada nama untuk kata "menunggu".
            </p>
            <p>
              Kita duduk berdampingan di atas kayu yang dingin, tak bicara, membiarkan ombak mengambil alih semua kalimat yang biasanya perlu kuucapkan supaya dunia tahu aku ada.
            </p>
            <p>
              Dan di sanalah, entah pada hitungan ombak yang keberapa, kepalaku—kota yang tak pernah tidur itu—akhirnya padam satu per satu lampunya. Bukan karena kupaksa lewat cara-cara yang biasa kupelajari dari buku-buku dan video-video yang menjanjikan ketenangan dalam lima langkah mudah. Ia padam dengan sendirinya, seperti kota mana pun yang akhirnya lelah menyalakan diri sepanjang malam.
            </p>
            <p>
              Aku tak lagi bertanya mengapa aku ada. Aku hanya ada, sesederhana ombak yang datang lalu pergi tanpa perlu penjelasan.
            </p>
            <p>
              Dan dalam kesederhanaan itu, dalam kekosongan yang untuk sekali saja tidak menuntut apa-apa dariku, aku menemukan sesuatu yang mungkin bisa disebut Tuhan—bukan Tuhan yang tinggal di kitab-kitab atau di ujung doa yang dihafal, melainkan Tuhan yang tinggal di dalam sunyi yang, untuk sekali saja, membiarkan aku menjadi tak berarti tanpa merasa hancur karenanya.
            </p>
          </div>
        </motion.section>

        {/* ─── BAGIAN V: Perpisahan ─── */}
        <motion.section
          id="bagian-5"
          data-chapter={5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28 border-b ${theme.border}`}
        >
          <div className={`flex items-center gap-4 mb-12`}>
            <span className={`font-serif text-sm tracking-[0.3em] uppercase ${theme.accent} opacity-70`}>V</span>
            <div className={`flex-1 h-[1px] ${darkMode ? 'bg-[#c9a86c]/20' : 'bg-[#7d5a3c]/20'}`} />
            <span className={`font-serif text-sm italic ${theme.textMuted}`}>Perpisahan</span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              Tapi begitulah hukum yang tak pernah tertulis di mana pun, dan karena itu paling sering dilupakan orang: setiap kedamaian datang membawa jam pasirnya sendiri, dan pasir itu tak pernah berhenti jatuh hanya karena kita memohon.
            </p>
            <p>
              Kau harus kembali—ke sebuah dunia yang sudah menantimu jauh sebelum aku belajar mengenal namamu, ke kehidupan yang tak pernah punya ruang untuk menyimpan namaku di dalamnya.
            </p>
            <p>
              Perpisahan kita tak punya drama yang biasa dimiliki perpisahan-perpisahan dalam cerita. Tak ada tangis yang pecah, tak ada kalimat yang diteriakkan ke udara supaya semesta ikut mendengar dan bersedih bersama kita. Yang ada hanya keheningan yang lebih berat dari biasanya, seperti udara sebelum hujan yang tahu dirinya akan turun tapi memilih menunggu waktu yang tepat.
            </p>

            <div className={`border-l-2 ${darkMode ? 'border-[#c9a86c]/40' : 'border-[#7d5a3c]/40'} pl-6 my-10`}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                Kau memelukku sebelum pergi—atau mungkin aku yang memelukmu, aku sudah tak bisa lagi membedakan siapa yang lebih dulu membutuhkan pelukan itu.
              </p>
            </div>

            <p>
              Dalam pelukan itu aku menitipkan satu doa yang tak pernah kuucapkan lantang: bahwa apa pun yang tumbuh di antara kita tak akan benar-benar mati, hanya berpindah bentuk jadi sesuatu yang lebih senyap, seperti abu yang tetap menyimpan bentuk kayu meski apinya sudah lama padam.
            </p>
            <p>
              Kau berjalan pergi tanpa menoleh, dan bayang-bayang menelanmu perlahan seperti malam menelan senja—bukan sekaligus, tapi sedikit demi sedikit, sampai tak ada lagi batas yang bisa kutunjuk sebagai saat persisnya kau benar-benar hilang.
            </p>
            <p>
              Aku pulang sendirian malam itu, membawa satu jenis sunyi yang belum pernah kukenal sebelumnya.
            </p>
          </div>
        </motion.section>

        {/* ─── BAGIAN VI: Dua Jenis Sunyi ─── */}
        <motion.section
          id="bagian-6"
          data-chapter={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionFade}
          className={`relative max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28`}
        >
          <div className={`flex items-center gap-4 mb-12`}>
            <span className={`font-serif text-sm tracking-[0.3em] uppercase ${theme.accent} opacity-70`}>VI</span>
            <div className={`flex-1 h-[1px] ${darkMode ? 'bg-[#c9a86c]/20' : 'bg-[#7d5a3c]/20'}`} />
            <span className={`font-serif text-sm italic ${theme.textMuted}`}>Dua Jenis Sunyi</span>
          </div>

          <div className={`space-y-8 text-lg sm:text-xl leading-[1.9] ${theme.text}`}>
            <p>
              Sebab ada dua jenis sunyi, kutemukan kemudian. Ada sunyi yang lahir dari kehilangan, yang menganga dan meminta untuk diisi—dan ada sunyi yang lahir dari kepenuhan, yang tak lagi butuh apa-apa untuk merasa lengkap.
            </p>

            <div className={`rounded-2xl p-10 sm:p-14 my-12 border ${theme.border} ${theme.card} text-center`}>
              <p className={`text-2xl sm:text-3xl font-serif italic font-light leading-relaxed ${theme.textHeading}`}>
                &ldquo;Yang kau tinggalkan untukku, ternyata, adalah yang kedua.&rdquo;
              </p>
            </div>

            <p>
              Dunia masih berjalan secepat biasanya esok paginya. Manusia-manusia masih datang membawa keluhan yang sama tentang atasan dan kekasih yang tak kunjung membalas pesan. Aku masih memakai senyum yang sama seperti seragam yang sama.
            </p>
            <p>
              Tapi di dalam diriku, kota yang dulu tak pernah tidur itu kini punya satu ruangan yang selalu tenang, apa pun yang terjadi di ruangan-ruangan lainnya—dan di ruangan itulah kau tinggal, atau mungkin bukan kau, melainkan segala yang kau ajarkan tentang caranya diam tanpa merasa kosong.
            </p>
            <p>
              Sudut paling redup di kedai itu masih kosong sampai sekarang. Aku tak lagi menunggunya terisi oleh siapa pun. Aku membiarkannya kosong, sebab beberapa ruang memang diciptakan untuk tetap menjadi milik seseorang yang sudah pergi, dan itu bukan kesedihan—itu semacam penghormatan.
            </p>

            <div className={`border-l-2 ${darkMode ? 'border-[#c9a86c]/40' : 'border-[#7d5a3c]/40'} pl-6 my-10`}>
              <Quote size={20} strokeWidth={1.5} className={`${theme.accent} mb-3 opacity-60`} />
              <p className={`text-xl sm:text-2xl italic font-light ${theme.textMuted} leading-relaxed`}>
                Hanya sunyi. Sunyi yang, kali ini, bukan lagi penjara—melainkan rumah yang akhirnya kutinggali sepenuh hati, entah sampai kapan.
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
            <p className={`font-serif text-sm italic ${theme.textMuted} opacity-60 tracking-wider`}>
              — Selesai —
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
