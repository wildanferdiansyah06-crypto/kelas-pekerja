'use client';

import React from 'react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
}

export default function LanguageSwitcher({ className = '', showIcon = true }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-full p-1 border transition-all duration-300 ${className}`} style={{ borderColor: 'var(--kp-border)', backgroundColor: 'var(--kp-bg-card, rgba(255,255,255,0.05))' }}>
      {showIcon && (
        <Globe size={15} className="ml-2 mr-1 opacity-60 text-kp-text-muted" />
      )}
      <button
        type="button"
        onClick={() => setLanguage('id')}
        aria-label="Switch to Indonesian"
        className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
          language === 'id'
            ? 'bg-kp-accent text-white shadow-sm font-semibold'
            : 'text-kp-text-muted hover:text-kp-text-primary hover:bg-black/5 dark:hover:bg-white/5'
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
        className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
          language === 'en'
            ? 'bg-kp-accent text-white shadow-sm font-semibold'
            : 'text-kp-text-muted hover:text-kp-text-primary hover:bg-black/5 dark:hover:bg-white/5'
        }`}
      >
        EN
      </button>
    </div>
  );
}
