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
    <div className={`mt-16 p-6 rounded-2xl border ${t.border} ${t.card} flex flex-col items-center justify-center text-center gap-4 transition-all duration-500`}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-700 ${isPlaying ? 'scale-110 shadow-lg' : ''} ${t.border}`} style={{ backgroundColor: darkMode ? 'rgba(201,168,108,0.1)' : 'rgba(125,90,60,0.1)' }}>
        <Music className={`${t.accent} ${isPlaying ? 'animate-pulse' : ''}`} size={20} />
      </div>
      
      <div>
        <h3 className={`font-serif font-semibold text-lg ${t.text}`}>
          {language === 'en' ? 'Music Recommendation' : 'Rekomendasi Musik'}
        </h3>
        <p className={`font-serif text-sm ${t.muted} mt-1 max-w-md mx-auto`}>
          {language === 'en'
            ? 'Play this curated track to accompany the feelings left by this story.'
            : 'Putar lagu yang telah dikurasi ini untuk menemani perasaan yang ditinggalkan oleh cerita ini.'}
        </p>
      </div>

      <button
        onClick={togglePlay}
        className={`mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-serif text-sm border ${t.border} hover:opacity-80 transition-all ${t.accent} ${isPlaying ? 'opacity-80' : ''}`}
        style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
      >
        {isPlaying ? (
          <>
            <PauseCircle size={16} />
            {language === 'en' ? 'Pause Music' : 'Jeda Musik'}
          </>
        ) : (
          <>
            <PlayCircle size={16} />
            {language === 'en' ? 'Play Music' : 'Putar Musik'}
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1 mt-2 h-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className="w-1 rounded-full animate-pulse" 
              style={{ 
                backgroundColor: darkMode ? '#c9a86c' : '#7d5a3c', 
                height: `${Math.random() * 100 + 20}%`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0.6
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
