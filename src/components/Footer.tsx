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
    <footer className={`border-t py-16 px-6 transition-colors duration-500 ${
      isDark ? 'border-[#8b7355]/20 bg-[#1a1816]' : 'border-[#8b4513]/30 bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08]'
    }`}>
      <div className="max-w-4xl mx-auto text-center">

        {/* Title */}
        <h3 className={`font-serif text-2xl mb-4 opacity-90 ${isDark ? 'text-[#f4e4d4]' : 'text-[#d4a574]'}`}>
          {config?.site?.title || "Kelas Pekerja"}
        </h3>

        {/* Description */}
        <p className={`text-sm max-w-md mx-auto mb-8 leading-relaxed ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>
          {config?.site?.description ||
            "Catatan tentang malam, kopi, dan kehidupan."}
        </p>

        {/* Navigation */}
        <div className={`flex justify-center gap-6 text-sm mb-10 ${isDark ? 'text-[#cbb8a5]' : 'text-[#a8a298]'}`}>
          <Link href="/" className={`transition-colors duration-200 ${isDark ? 'hover:text-[#f4e4d4]' : 'hover:text-[#d4a574]'}`}>
            Beranda
          </Link>

          <Link href="/buku" className={`transition-colors duration-200 ${isDark ? 'hover:text-[#f4e4d4]' : 'hover:text-[#d4a574]'}`}>
            Buku
          </Link>

          <Link href="/tulisan" className={`transition-colors duration-200 ${isDark ? 'hover:text-[#f4e4d4]' : 'hover:text-[#d4a574]'}`}>
            Tulisan
          </Link>

          <Link href="/tentang" className={`transition-colors duration-200 ${isDark ? 'hover:text-[#f4e4d4]' : 'hover:text-[#d4a574]'}`}>
            Tentang
          </Link>
        </div>

        {/* Contact Info */}
        <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm mb-10 ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>

          <a
            href="https://wa.me/6289636357091"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#25D366] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            <span>0896-3635-7091</span>
          </a>

          <a
            href="mailto:wildanferdiansyah06@gmail.com"
            className="flex items-center gap-2 hover:text-[#EA4335] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>wildanferdiansyah06@gmail.com</span>
          </a>

          <a
            href="https://instagram.com/_iamwildan_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#E4405F] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
            </svg>
            <span>@_iamwildan_</span>
          </a>

        </div>

        {/* Copyright */}
        <div className={`text-xs ${isDark ? 'text-[#bfae9c]/60' : 'text-[#8b7355]/60'}`}>
          © {new Date().getFullYear()} Kelas Pekerja
        </div>

      </div>
    </footer>
  );
}
