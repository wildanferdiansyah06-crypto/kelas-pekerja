✅ ShareButtons component created

// src/components/ShareButtons.tsx
'use client';

import { useState } from 'react';
import { Share2, Link2, Check, Twitter, Facebook, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = encodeURIComponent(`${title} — Kelas Pekerja`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-full hover:bg-[#8b7355]/10 opacity-60 hover:opacity-100 transition-all"
        title="Bagikan"
      >
        <Share2 size={20} />
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 p-2 rounded-lg 
                        bg-white dark:bg-[#2a2826] 
                        shadow-xl border border-[#8b7355]/10
                        z-50 min-w-[160px]
                        animate-fade-in">

            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-md
                       hover:bg-[#8b7355]/10 transition-colors text-sm"
            >
              <Twitter size={16} />
              <span>Twitter</span>
            </a>

            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-md
                       hover:bg-[#8b7355]/10 transition-colors text-sm"
            >
              <Facebook size={16} />
              <span>Facebook</span>
            </a>

            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-md
                       hover:bg-[#8b7355]/10 transition-colors text-sm"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>

            <div className="h-px bg-[#8b7355]/10 my-2" />

            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md
                       hover:bg-[#8b7355]/10 transition-colors text-sm"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Link2 size={16} />}
              <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
