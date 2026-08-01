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

const THEME_STYLES: Record<ReaderTheme, {
  bg: string;
  text: string;
  textMuted: string;
  textHeading: string;
  border: string;
  accent: string;
  card: string;
  sidebar: string;
}> = {
  light: {
    bg: 'bg-[#FBF9F5]',
    text: 'text-[#2D2B28]',
    textMuted: 'text-[#6E6A63]',
    textHeading: 'text-[#1A1918]',
    border: 'border-[#EAE5DC]',
    accent: 'text-[#8B7355]',
    card: 'bg-[#F3EFE6]',
    sidebar: 'bg-[#F5F1E8]',
  },
  sepia: {
    bg: 'bg-[#F4ECD8]',
    text: 'text-[#3D3122]',
    textMuted: 'text-[#75644E]',
    textHeading: 'text-[#261E14]',
    border: 'border-[#E2D4B9]',
    accent: 'text-[#A0522D]',
    card: 'bg-[#EAE0C7]',
    sidebar: 'bg-[#ECE2C9]',
  },
  dark: {
    bg: 'bg-[#18181B]',
    text: 'text-[#E4E4E7]',
    textMuted: 'text-[#A1A1AA]',
    textHeading: 'text-[#FAFAFA]',
    border: 'border-[#27272A]',
    accent: 'text-[#D4A574]',
    card: 'bg-[#27272A]/70',
    sidebar: 'bg-[#18181B]',
  },
  espresso: {
    bg: 'bg-[#0D0B0A]',
    text: 'text-[#D4C4B5]',
    textMuted: 'text-[#8C7D70]',
    textHeading: 'text-[#F5ECE5]',
    border: 'border-[#26201C]',
    accent: 'text-[#D49E55]',
    card: 'bg-[#1A1614]/80',
    sidebar: 'bg-[#0F0D0C]',
  },
};

const FONT_SIZE_CLASSES: Record<ReaderFontSize, string> = {
  s: 'text-base sm:text-lg leading-[1.8] sm:leading-[1.85]',
  m: 'text-lg sm:text-xl leading-[1.85] sm:leading-[1.9]',
  l: 'text-xl sm:text-2xl leading-[1.9] sm:leading-[1.95]',
  xl: 'text-2xl sm:text-3xl leading-[1.95] sm:leading-[2.0]',
};

const FONT_FAMILY_CLASSES: Record<ReaderFontFamily, string> = {
  serif: 'font-display',
  sans: 'font-body',
};

export const ReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ReaderTheme>('sepia');
  const [fontSize, setFontSizeState] = useState<ReaderFontSize>('m');
  const [fontFamily, setFontFamilyState] = useState<ReaderFontFamily>('serif');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme) setThemeState(parsed.theme);
        if (parsed.fontSize) setFontSizeState(parsed.fontSize);
        if (parsed.fontFamily) setFontFamilyState(parsed.fontFamily);
      }
    } catch (e) {
      console.error('Failed to load reader preferences:', e);
    }
  }, []);

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
        themeStyles: THEME_STYLES[theme],
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
