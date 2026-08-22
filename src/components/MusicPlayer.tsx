'use client';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { useReader } from '@/src/contexts/ReaderContext';
import { Music, PlayCircle, PauseCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
  audioSrc: string;
}

export default function MusicPlayer({ audioSrc }: MusicPlayerProps) {
  const { language } = useLanguage();
  const { theme, themeStyles } = useReader();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = {
    bg: themeStyles.bg,
    text: themeStyles.text,
    muted: themeStyles.textMuted,
    border: themeStyles.border,
    card: themeStyles.card,
    accent: themeStyles.accent,
  };

  const darkMode = theme === 'dark' || theme === 'espresso';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`mt-12 sm:mt-16 p-6 sm:p-8 mx-auto w-full max-w-[92%] sm:max-w-md rounded-3xl border ${t.border} ${t.card} flex flex-col items-center justify-center text-center gap-4 sm:gap-5 transition-all duration-500 shadow-sm`}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-all duration-700 ${isPlaying ? 'scale-110 shadow-lg' : ''} ${t.border}`} style={{ backgroundColor: darkMode ? 'rgba(201,168,108,0.08)' : 'rgba(125,90,60,0.08)' }}>
        <Music className={`${t.accent} ${isPlaying ? 'animate-pulse' : ''}`} size={24} />
      </div>

      <div className="px-2">
        <h3 className={`font-serif font-semibold text-lg sm:text-xl tracking-tight ${t.text}`}>
          {language === 'en' ? 'Music Recommendation' : 'Rekomendasi Musik'}
        </h3>
        <p className={`font-serif text-xs sm:text-sm ${t.muted} mt-2 max-w-sm mx-auto leading-relaxed opacity-80`}>
          {language === 'en'
            ? 'Play this curated track to accompany the feelings left by this story.'
            : 'Putar lagu yang telah dikurasi ini untuk menemani perasaan yang ditinggalkan oleh cerita ini.'}
        </p>
      </div>

      <button
        onClick={togglePlay}
        className={`mt-2 inline-flex justify-center items-center gap-2.5 w-full sm:w-auto min-w-[200px] px-8 py-3.5 sm:py-3 rounded-full font-serif text-sm font-medium border ${t.border} hover:opacity-80 active:scale-95 transition-all ${t.accent} ${isPlaying ? 'opacity-90 shadow-inner' : 'shadow-sm'}`}
        style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)' }}
      >
        {isPlaying ? (
          <>
            <PauseCircle size={18} strokeWidth={2} />
            {language === 'en' ? 'Pause Music' : 'Jeda Musik'}
          </>
        ) : (
          <>
            <PlayCircle size={18} strokeWidth={2} />
            {language === 'en' ? 'Play Music' : 'Putar Musik'}
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1.5 mt-3 h-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-1 rounded-full animate-pulse"
              style={{
                backgroundColor: darkMode ? '#c9a86c' : '#7d5a3c',
                height: `${Math.random() * 60 + 40}%`,
                animationDelay: `${i * 0.15}s`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
