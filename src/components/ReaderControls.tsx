'use client';

import React, { useState } from 'react';
import { Settings2, X, Sun, Moon, Coffee, BookOpen, Type, Sliders } from 'lucide-react';
import { useReader, ReaderTheme, ReaderFontSize } from '@/src/contexts/ReaderContext';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface ReaderControlsProps {
  chapters?: { id: string; title: string; icon?: string }[];
  activeChapter?: string;
  onChapterSelect?: (id: string) => void;
  progress?: number;
}

export default function ReaderControls({
  chapters,
  activeChapter,
  onChapterSelect,
  progress = 0,
}: ReaderControlsProps) {
  const { language } = useLanguage();
  const { theme, setTheme, fontSize, setFontSize, fontFamily, setFontFamily } = useReader();
  const [isOpen, setIsOpen] = useState(false);
  const [showToc, setShowToc] = useState(false);

  const themes: { id: ReaderTheme; label: string; icon: React.ReactNode; previewBg: string; previewText: string }[] = [
    { id: 'light', label: language === 'en' ? 'Light' : 'Terang', icon: <Sun size={14} />, previewBg: '#FBF9F5', previewText: '#2D2B28' },
    { id: 'sepia', label: 'Sepia', icon: <BookOpen size={14} />, previewBg: '#F4ECD8', previewText: '#3D3122' },
    { id: 'dark', label: language === 'en' ? 'Dark' : 'Gelap', icon: <Moon size={14} />, previewBg: '#18181B', previewText: '#E4E4E7' },
    { id: 'espresso', label: 'Espresso', icon: <Coffee size={14} />, previewBg: '#0D0B0A', previewText: '#D4C4B5' },
  ];

  const fontSizes: { id: ReaderFontSize; label: string }[] = [
    { id: 's', label: 'S' },
    { id: 'm', label: 'M' },
    { id: 'l', label: 'L' },
    { id: 'xl', label: 'XL' },
  ];

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/10">
        <div
          className="h-full transition-all duration-200"
          style={{
            width: `${progress}%`,
            backgroundColor: theme === 'espresso' ? '#D49E55' : theme === 'sepia' ? '#A0522D' : '#8B7355',
          }}
        />
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {chapters && chapters.length > 0 && (
          <button
            onClick={() => setShowToc(!showToc)}
            className="p-3.5 rounded-full shadow-xl backdrop-blur-md border transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme === 'dark' || theme === 'espresso' ? 'rgba(30, 27, 24, 0.9)' : 'rgba(255, 252, 247, 0.95)',
              borderColor: 'rgba(212, 165, 116, 0.3)',
              color: 'var(--kp-accent)',
            }}
            title={language === 'en' ? 'Table of Contents' : 'Daftar Isi'}
          >
            <BookOpen size={18} />
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-full shadow-xl backdrop-blur-md border transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: theme === 'dark' || theme === 'espresso' ? 'rgba(30, 27, 24, 0.9)' : 'rgba(255, 252, 247, 0.95)',
            borderColor: 'rgba(212, 165, 116, 0.3)',
            color: 'var(--kp-accent)',
          }}
          title={language === 'en' ? 'Reader Settings' : 'Pengaturan Baca'}
        >
          <Sliders size={18} />
          <span className="text-xs font-ui font-semibold uppercase tracking-wider hidden sm:inline">
            {language === 'en' ? 'Reading Mode' : 'Mode Baca'}
          </span>
        </button>
      </div>

      {/* Settings Modal Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all duration-300 animate-slide-in-up"
            style={{
              backgroundColor: theme === 'dark' ? '#242427' : theme === 'espresso' ? '#161311' : theme === 'sepia' ? '#ECE2C9' : '#FFFFFF',
              color: theme === 'dark' || theme === 'espresso' ? '#F4F4F5' : '#27272A',
              borderColor: 'rgba(212, 165, 116, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2 font-ui font-bold text-base">
                <Settings2 size={18} style={{ color: 'var(--kp-accent)' }} />
                <span>{language === 'en' ? 'Reading Comfort' : 'Kenyamanan Membaca'}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme Picker */}
              <div>
                <label className="block text-xs font-ui font-semibold uppercase tracking-wider mb-3 opacity-60">
                  {language === 'en' ? 'Paper / Theme Mode' : 'Warna Kertas / Mode'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all duration-200 ${
                        theme === t.id ? 'ring-2 ring-[var(--kp-accent)] scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: t.previewBg,
                        color: t.previewText,
                        borderColor: theme === t.id ? 'var(--kp-accent)' : 'rgba(0,0,0,0.1)',
                      }}
                    >
                      {t.icon}
                      <span className="text-[10px] font-ui font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-xs font-ui font-semibold uppercase tracking-wider mb-3 opacity-60">
                  {language === 'en' ? 'Text Size' : 'Ukuran Huruf'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {fontSizes.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFontSize(f.id)}
                      className={`py-2.5 rounded-xl border text-sm font-ui font-semibold transition-all duration-200 ${
                        fontSize === f.id ? 'bg-[var(--kp-accent)] text-white border-[var(--kp-accent)]' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-xs font-ui font-semibold uppercase tracking-wider mb-3 opacity-60">
                  {language === 'en' ? 'Font Style' : 'Gaya Tulisan'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFontFamily('serif')}
                    className={`p-3 rounded-xl border font-display text-sm flex items-center justify-center gap-2 transition-all ${
                      fontFamily === 'serif' ? 'bg-[var(--kp-accent)] text-white border-[var(--kp-accent)]' : 'bg-black/5 dark:bg-white/5'
                    }`}
                  >
                    <Type size={16} />
                    <span>{language === 'en' ? 'Classic (Serif)' : 'Klasik (Serif)'}</span>
                  </button>
                  <button
                    onClick={() => setFontFamily('sans')}
                    className={`p-3 rounded-xl border font-body text-sm flex items-center justify-center gap-2 transition-all ${
                      fontFamily === 'sans' ? 'bg-[var(--kp-accent)] text-white border-[var(--kp-accent)]' : 'bg-black/5 dark:bg-white/5'
                    }`}
                  >
                    <Type size={16} />
                    <span>{language === 'en' ? 'Modern (Sans)' : 'Modern (Sans)'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table of Contents Drawer */}
      {showToc && chapters && chapters.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowToc(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl p-6 max-h-[80vh] overflow-y-auto shadow-2xl border"
            style={{
              backgroundColor: theme === 'dark' ? '#242427' : theme === 'espresso' ? '#161311' : theme === 'sepia' ? '#ECE2C9' : '#FFFFFF',
              color: theme === 'dark' || theme === 'espresso' ? '#F4F4F5' : '#27272A',
              borderColor: 'rgba(212, 165, 116, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10 dark:border-white/10">
              <h3 className="font-display font-bold text-lg">{language === 'en' ? 'Table of Contents' : 'Daftar Isi Buku'}</h3>
              <button onClick={() => setShowToc(false)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    if (onChapterSelect) onChapterSelect(ch.id);
                    setShowToc(false);
                    const el = document.getElementById(ch.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${
                    activeChapter === ch.id ? 'bg-[var(--kp-accent)]/15 font-semibold text-[var(--kp-accent)]' : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs opacity-50">{ch.icon || '✦'}</span>
                  <span className="text-sm font-ui">{ch.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
