'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ReaderTheme = 'light' | 'sepia' | 'dark' | 'espresso';
export type ReaderFontSize = 's' | 'm' | 'l' | 'xl';
export type ReaderFontFamily = 'serif' | 'sans';

interface ReaderContextType {
  theme: ReaderTheme;
  setTheme: (theme: ReaderTheme) => void;
  fontSize: ReaderFontSize;
  setFontSize: (size: ReaderFontSize) => void;
  fontFamily: ReaderFontFamily;
  setFontFamily: (font: ReaderFontFamily) => void;
  themeStyles: {
    bg: string;
    text: string;
    textMuted: string;
    textHeading: string;
    border: string;
    accent: string;
    card: string;
    sidebar: string;
  };
  fontSizeClass: string;
  fontFamilyClass: string;
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

const PREFS_KEY = 'kelas_pekerja_reader_prefs';

const THEME_DATA: Record<ReaderTheme, {
  bg: string; text: string; textMuted: string; textHeading: string;
  border: string; accent: string; card: string; sidebar: string;
  bgColor: string; textColor: string; mutedColor: string; headingColor: string;
  borderColor: string; accentColor: string; cardColor: string;
}> = {
  light: {
    bg: 'bg-[#FBF9F5]', text: 'text-[#2D2B28]', textMuted: 'text-[#6E6A63]',
    textHeading: 'text-[#1A1918]', border: 'border-[#EAE5DC]', accent: 'text-[#8B7355]',
    card: 'bg-[#F3EFE6]', sidebar: 'bg-[#F5F1E8]',
    bgColor: '#FBF9F5', textColor: '#2D2B28', mutedColor: '#6E6A63',
    headingColor: '#1A1918', borderColor: '#EAE5DC', accentColor: '#8B7355', cardColor: '#F3EFE6',
  },
  sepia: {
    bg: 'bg-[#F4ECD8]', text: 'text-[#3D3122]', textMuted: 'text-[#75644E]',
    textHeading: 'text-[#261E14]', border: 'border-[#E2D4B9]', accent: 'text-[#A0522D]',
    card: 'bg-[#EAE0C7]', sidebar: 'bg-[#ECE2C9]',
    bgColor: '#F4ECD8', textColor: '#3D3122', mutedColor: '#75644E',
    headingColor: '#261E14', borderColor: '#E2D4B9', accentColor: '#A0522D', cardColor: '#EAE0C7',
  },
  dark: {
    bg: 'bg-[#18181B]', text: 'text-[#E4E4E7]', textMuted: 'text-[#A1A1AA]',
    textHeading: 'text-[#FAFAFA]', border: 'border-[#27272A]', accent: 'text-[#D4A574]',
    card: 'bg-[#27272A]/70', sidebar: 'bg-[#18181B]',
    bgColor: '#18181B', textColor: '#E4E4E7', mutedColor: '#A1A1AA',
    headingColor: '#FAFAFA', borderColor: '#27272A', accentColor: '#D4A574', cardColor: 'rgba(39,39,42,0.7)',
  },
  espresso: {
    bg: 'bg-[#0D0B0A]', text: 'text-[#D4C4B5]', textMuted: 'text-[#8C7D70]',
    textHeading: 'text-[#F5ECE5]', border: 'border-[#26201C]', accent: 'text-[#D49E55]',
    card: 'bg-[#1A1614]/80', sidebar: 'bg-[#0F0D0C]',
    bgColor: '#0D0B0A', textColor: '#D4C4B5', mutedColor: '#8C7D70',
    headingColor: '#F5ECE5', borderColor: '#26201C', accentColor: '#D49E55', cardColor: 'rgba(26,22,20,0.8)',
  },
};

const FONT_SIZE_VALUES: Record<ReaderFontSize, { size: string; lineHeight: string }> = {
  s:  { size: '1rem',     lineHeight: '1.8' },
  m:  { size: '1.125rem', lineHeight: '1.875' },
  l:  { size: '1.25rem',  lineHeight: '1.9' },
  xl: { size: '1.5rem',   lineHeight: '2.0' },
};

const FONT_SIZE_CLASSES: Record<ReaderFontSize, string> = {
  s:  'text-base sm:text-lg leading-[1.8] sm:leading-[1.85]',
  m:  'text-lg sm:text-xl leading-[1.85] sm:leading-[1.9]',
  l:  'text-xl sm:text-2xl leading-[1.9] sm:leading-[1.95]',
  xl: 'text-2xl sm:text-3xl leading-[1.95] sm:leading-[2.0]',
};

const FONT_FAMILY_VALUES: Record<ReaderFontFamily, string> = {
  serif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  sans:  "'Inter', system-ui, sans-serif",
};

const FONT_FAMILY_CLASSES: Record<ReaderFontFamily, string> = {
  serif: 'font-display',
  sans:  'font-body',
};

// Inject CSS custom properties into :root so all book content can inherit them
function applyReaderCSSVars(theme: ReaderTheme, fontSize: ReaderFontSize, fontFamily: ReaderFontFamily) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const t = THEME_DATA[theme];
  const fs = FONT_SIZE_VALUES[fontSize];
  const ff = FONT_FAMILY_VALUES[fontFamily];

  root.style.setProperty('--reader-bg', t.bgColor);
  root.style.setProperty('--reader-text', t.textColor);
  root.style.setProperty('--reader-muted', t.mutedColor);
  root.style.setProperty('--reader-heading', t.headingColor);
  root.style.setProperty('--reader-border-color', t.borderColor);
  root.style.setProperty('--reader-accent', t.accentColor);
  root.style.setProperty('--reader-card', t.cardColor);
  root.style.setProperty('--reader-font-size', fs.size);
  root.style.setProperty('--reader-line-height', fs.lineHeight);
  root.style.setProperty('--reader-font-family', ff);
}

export const ReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ReaderTheme>('sepia');
  const [fontSize, setFontSizeState] = useState<ReaderFontSize>('m');
  const [fontFamily, setFontFamilyState] = useState<ReaderFontFamily>('serif');

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const t: ReaderTheme = parsed.theme || 'sepia';
        const fs: ReaderFontSize = parsed.fontSize || 'm';
        const ff: ReaderFontFamily = parsed.fontFamily || 'serif';
        setThemeState(t);
        setFontSizeState(fs);
        setFontFamilyState(ff);
        applyReaderCSSVars(t, fs, ff);
      } else {
        applyReaderCSSVars('sepia', 'm', 'serif');
      }
    } catch (e) {
      console.error('Failed to load reader preferences:', e);
      applyReaderCSSVars('sepia', 'm', 'serif');
    }
  }, []);

  // Keep CSS vars in sync whenever any preference changes
  useEffect(() => {
    applyReaderCSSVars(theme, fontSize, fontFamily);
  }, [theme, fontSize, fontFamily]);

  const savePrefs = (updates: Partial<{ theme: ReaderTheme; fontSize: ReaderFontSize; fontFamily: ReaderFontFamily }>) => {
    try {
      const current = { theme, fontSize, fontFamily, ...updates };
      localStorage.setItem(PREFS_KEY, JSON.stringify(current));
    } catch (e) {
      console.error('Failed to save reader preferences:', e);
    }
  };

  const setTheme = (newTheme: ReaderTheme) => {
    setThemeState(newTheme);
    savePrefs({ theme: newTheme });
  };

  const setFontSize = (newSize: ReaderFontSize) => {
    setFontSizeState(newSize);
    savePrefs({ fontSize: newSize });
  };

  const setFontFamily = (newFont: ReaderFontFamily) => {
    setFontFamilyState(newFont);
    savePrefs({ fontFamily: newFont });
  };

  return (
    <ReaderContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        themeStyles: THEME_DATA[theme],
        fontSizeClass: FONT_SIZE_CLASSES[fontSize],
        fontFamilyClass: FONT_FAMILY_CLASSES[fontFamily],
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
};

export const useReader = (): ReaderContextType => {
  const context = useContext(ReaderContext);
  if (!context) {
    throw new Error('useReader must be used within a ReaderProvider');
  }
  return context;
};
