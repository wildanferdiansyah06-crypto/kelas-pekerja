'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BookOpen, Check, MapPin } from 'lucide-react';
import { useReader } from "@/src/contexts/ReaderContext";
import ReaderControls from "@/src/components/ReaderControls";
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function BookBaliPage() {
  const { language } = useLanguage();
  const { themeStyles, fontFamilyClass, fontSizeClass } = useReader();
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  const chapters = [
    { num: 0, id: 'prolog', title: language === 'en' ? 'Prologue: Ground Zero' : 'Prolog: Titik Nol Ubud', subtitle: language === 'en' ? 'Between sea breeze and silent hills' : 'Di antara angin laut dan keheningan bukit' },
    { num: 1, id: 'bab-1', title: language === 'en' ? 'Chapter 1: Morning Coffee in Campuhan' : 'Bab 1: Kopi Pagi di Campuhan', subtitle: language === 'en' ? 'First drip under the misty trees' : 'Tetesan pertama di bawah embun kabut' },
    { num: 2, id: 'bab-2', title: language === 'en' ? 'Chapter 2: Sunset Over Kuta' : 'Bab 2: Senja di Pesisir Kuta', subtitle: language === 'en' ? 'When the sky turns amber' : 'Saat langit berubah menjadi jingga hangat' },
    { num: 3, id: 'bab-3', title: language === 'en' ? 'Chapter 3: Midnight Confessions' : 'Bab 3: Catatan Tengah Malam', subtitle: language === 'en' ? 'Writing story scripts under quiet stars' : 'Menuang naskah di bawah bintang sunyi' },
  ];

  const toggleChapterComplete = (num: number) => {
    if (completedChapters.includes(num)) {
      setCompletedChapters(completedChapters.filter(n => n !== num));
    } else {
      setCompletedChapters([...completedChapters, num]);
    }
  };

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} ${fontFamilyClass} min-h-screen relative transition-colors duration-500`}>
      <ReaderControls />

      {/* Sidebar Table of Contents */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] ${themeStyles.bg} z-50 border-r border-amber-500/20 p-6 overflow-y-auto shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-500/20">
                <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                  <Compass size={20} className="text-amber-500" />
                  {language === 'en' ? 'Contents' : 'Daftar Bab'}
                </h3>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-amber-500/10 text-xs font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {chapters.map((ch) => (
                  <button
                    key={ch.num}
                    onClick={() => {
                      setActiveChapter(ch.num);
                      setSidebarOpen(false);
                      const el = document.getElementById(ch.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      activeChapter === ch.num
                        ? 'border-amber-500 bg-amber-500/10 font-semibold'
                        : 'border-transparent hover:bg-amber-500/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-amber-500/80 mb-1">
                      <span>{ch.num === 0 ? 'Prolog' : `Bab ${ch.num}`}</span>
                      {completedChapters.includes(ch.num) && <Check size={14} className="text-green-500" />}
                    </div>
                    <div className="font-medium text-sm">{ch.title}</div>
                    <div className="text-xs opacity-60 truncate">{ch.subtitle}</div>
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Container - Laptop & Desktop Readable */}
      <main className="max-w-4xl lg:max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-16 lg:py-24 antialiased">
        
        {/* Header Hero */}
        <section className="mb-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-mono uppercase tracking-widest mb-6"
          >
            <MapPin size={14} />
            Book Bali — Naskah Cerita
          </motion.div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            BOOK BALI
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl opacity-80 max-w-2xl mx-auto mb-8">
            {language === 'en' 
              ? 'A dedicated canvas for your story script, dialogue, and Bali memories.' 
              : 'Ruang khusus untuk naskah cerita, skrip dialog, dan catatan perjalananmu di Bali.'}
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all shadow-lg"
            >
              <BookOpen size={18} />
              {language === 'en' ? 'Open Index' : 'Buka Daftar Bab'}
            </button>
          </div>
        </section>

        {/* Story Script Container */}
        <div className="space-y-24">
          
          {/* PROLOGUE */}
          <section id="prolog" className="scroll-mt-24 border-t border-amber-500/20 pt-12">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-500">Prolog</span>
              <button 
                onClick={() => toggleChapterComplete(0)}
                className={`text-xs flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                  completedChapters.includes(0) ? 'border-green-500 text-green-400' : 'border-amber-500/30 opacity-60'
                }`}
              >
                <Check size={14} />
                {completedChapters.includes(0) ? 'Selesai' : 'Tandai Selesai'}
              </button>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
              {language === 'en' ? 'Prologue: Ground Zero' : 'Prolog: Titik Nol Ubud'}
            </h2>

            <div className={`space-y-6 ${fontSizeClass} leading-relaxed`}>
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-amber-500 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                {language === 'en'
                  ? 'Bali always begins with quietness. Before the waves or the crowds, there is the scent of frangipani blossoms and fresh coffee brewing in morning mist.'
                  : 'Bali selalu dimulai dengan keheningan. Sebelum riuh ombak atau bising jalanan, ada aroma kamboja dan seduhan kopi pagi yang menembus kabut tipis Ubud.'}
              </p>

              <p>
                {language === 'en'
                  ? 'This script is your personal haven. Write your dialogues, character reflections, and scenes freely right here.'
                  : 'File ini adalah wadah khusus untuk naskah ceritamu. Tuliskan adegan, dialog, dan catatan naskahmu secara bebas di sini.'}
              </p>
            </div>
          </section>

          {/* CHAPTER 1 */}
          <section id="bab-1" className="scroll-mt-24 border-t border-amber-500/20 pt-12">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-500">Bab 01</span>
              <button 
                onClick={() => toggleChapterComplete(1)}
                className={`text-xs flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                  completedChapters.includes(1) ? 'border-green-500 text-green-400' : 'border-amber-500/30 opacity-60'
                }`}
              >
                <Check size={14} />
                {completedChapters.includes(1) ? 'Selesai' : 'Tandai Selesai'}
              </button>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
              {language === 'en' ? 'Chapter 1: Morning Coffee in Campuhan' : 'Bab 1: Kopi Pagi di Campuhan'}
            </h2>

            <div className={`space-y-6 ${fontSizeClass} leading-relaxed opacity-90`}>
              <p>
                {language === 'en'
                  ? '[Scene 1: Int. Coffee House - Morning]'
                  : '[Adegan 1: Int. Kedai Kopi - Pagi]'}
              </p>
              <blockquote className="pl-6 border-l-2 border-amber-500/50 italic opacity-80 font-serif my-6 py-2">
                {language === 'en'
                  ? '“Every journey brings a question, but coffee gives you the patience to wait for the answer.”'
                  : '“Setiap perjalanan membawa pertanyaan, tetapi kopi memberimu kesabaran untuk menunggu jawabannya.”'}
              </blockquote>
              <p className="italic opacity-60">
                (Tuliskan draf lanjutan naskah ceritamu di sini...)
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
