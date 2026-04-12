"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getConfig } from "@/src/lib/api";
import { useTheme } from "@/src/components/ThemeProvider";

export default function Footer() {
  const [config, setConfig] = useState<any>({});
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    getConfig()
      .then((data) => setConfig(data))
      .catch((error) => console.error("Failed to load config:", error));
  }, []);

  return (
    <footer className={`border-t py-16 px-6 transition-colors duration-500 relative z-20 ${
      isDark ? 'border-[#8b7355]/20 bg-[#1a1816]' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="max-w-4xl mx-auto text-center">

        {/* Title */}
        <h3 className={`font-serif text-2xl mb-4 opacity-90 ${isDark ? 'text-[#f4e4d4]' : 'text-slate-800'}`}>
          {config?.title || "Kelas Pekerja"}
        </h3>

        {/* Description */}
        <p className={`text-sm max-w-md mx-auto mb-8 leading-relaxed ${isDark ? 'text-[#bfae9c]' : 'text-slate-600'}`}>
          {config?.description ||
            "Catatan tentang malam, kopi, dan kehidupan."}
        </p>

        {/* Navigation */}
        <div className={`flex justify-center gap-6 text-sm mb-10 ${isDark ? 'text-[#cbb8a5]' : 'text-slate-500'}`}>
          <Link href="/" className={`transition-colors duration-200 ${isDark ? 'hover:text-[#f4e4d4]' : 'hover:text-slate-900'}`}>
            Beranda
          </Link>

          <Link href="/buku" className={`transition-colors duration-200 ${isDark ? 'hover:text-[#f4e4d4]' : 'hover:text-slate-900'}`}>
            Buku
          </Link>

          <Link href="/tulisan" className={`transition-colors duration-200 ${isDark ? 'hover:text-[#f4e4d4]' : 'hover:text-slate-900'}`}>
            Tulisan
          </Link>

          <Link href="/tentang" className={`transition-colors duration-200 ${isDark ? 'hover:text-[#f4e4d4]' : 'hover:text-slate-900'}`}>
            Tentang
          </Link>
        </div>

        {/* Contact Info */}
        <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm mb-10 ${isDark ? 'text-[#bfae9c]' : 'text-slate-600'}`}>

          <a
            href="https://wa.me/6289636357091"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#25D366] transition-colors duration-200"
          >
            0896-3635-7091
          </a>

          <a
            href="mailto:wildanferdiansyah06@gmail.com"
            className="hover:text-[#EA4335] transition-colors duration-200"
          >
            wildanferdiansyah06@gmail.com
          </a>

          <a
            href="https://instagram.com/_iamwildan_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E4405F] transition-colors duration-200"
          >
            @_iamwildan_
          </a>

        </div>

        {/* Copyright */}
        <div className={`text-xs ${isDark ? 'text-[#bfae9c]/60' : 'text-slate-400'}`}>
          © {new Date().getFullYear()} Kelas Pekerja
        </div>

      </div>
    </footer>
  );
}
