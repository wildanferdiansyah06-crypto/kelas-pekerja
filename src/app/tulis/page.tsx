"use client";

import Link from "next/link";
import { ArrowLeft, PenLine, Send, Coffee, CheckCircle, Loader2, FileUp, X, Moon, Sun } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TulisPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check theme dari localStorage/system preference
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    // Dispatch event buat sync dengan navbar global
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDark: newTheme } }));
  };

  // Listen theme change dari navbar
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent<{isDark: boolean}>) => {
      setIsDark(e.detail.isDark);
    };
    window.addEventListener('themeChange' as any, handleThemeChange);
    return () => window.removeEventListener('themeChange' as any, handleThemeChange);
  }, []);

  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg'
  ];

  const allowedExtensions = ['.docx', '.doc', '.txt', '.pdf', '.jpg', '.jpeg', '.png'];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    selectedFiles.forEach(file => {
      const isValidType = allowedTypes.includes(file.type);
      const hasValidExt = allowedExtensions.some(ext => 
        file.name.toLowerCase().endsWith(ext)
      );
      
      if (isValidType || hasValidExt) {
        if (file.size <= 25 * 1024 * 1024) {
          validFiles.push(file);
        } else {
          invalidFiles.push(`${file.name} (terlalu besar, max 25MB)`);
        }
      } else {
        invalidFiles.push(`${file.name} (format tidak didukung)`);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`File tidak valid: ${invalidFiles.join(', ')}`);
      setTimeout(() => setError(""), 5000);
    }

    setFiles(prev => [...prev, ...validFiles]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function removeFile(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });
    
    formData.append('fileCount', files.length.toString());

    try {
      const response = await fetch("/api/submit-story", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim");
      }

      setIsSuccess(true);
      setFiles([]);
      e.currentTarget.reset();

    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Theme classes
  const theme = {
    bg: isDark 
      ? "bg-gradient-to-br from-[#0a0908] via-[#1a1814] to-[#0f0e0c]" 
      : "bg-gradient-to-br from-[#f5f0e8] via-[#ebe4d8] to-[#e8e0d5]",
    text: isDark ? "text-[#e8e0d5]" : "text-[#2a2520]",
    textMuted: isDark ? "text-[#a09080]" : "text-[#6b5a45]",
    textSubtle: isDark ? "text-[#8b7355]" : "text-[#8b7355]",
    card: isDark 
      ? "bg-[#1a1816]/80 backdrop-blur-sm border-[#8b7355]/20" 
      : "bg-white/80 backdrop-blur-sm border-[#8b7355]/30",
    input: isDark 
      ? "bg-[#0f0e0c]/60 border-[#8b7355]/30 text-[#e8e0d5] placeholder-[#6b5a45]" 
      : "bg-[#faf8f5] border-[#d4c8b8] text-[#2a2520] placeholder-[#a09080]",
    accent: "text-[#8b7355]",
    accentBg: "bg-[#8b7355] hover:bg-[#a08060]",
    accentText: isDark ? "text-[#0f0e0c]" : "text-white",
    border: isDark ? "border-[#8b7355]/20" : "border-[#8b7355]/30",
    gradientOverlay: isDark
      ? "bg-gradient-to-t from-[#0a0908] via-transparent to-transparent"
      : "bg-gradient-to-t from-[#f5f0e8] via-transparent to-transparent",
  };

  if (!mounted) return null;

  // Success State
  if (isSuccess) {
    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-700`}>
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Steam Particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-24 ${isDark ? 'bg-gradient-to-t from-[#8b7355]/10 to-transparent' : 'bg-gradient-to-t from-[#8b7355]/5 to-transparent'} rounded-full blur-xl animate-steam`}
              style={{
                left: `${15 + i * 15}%`,
                bottom: '-100px',
                animationDelay: `${i * 2}s`,
                animationDuration: '8s',
              }}
            />
          ))}
          
          {/* Floating Coffee Beans */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`bean-${i}`}
              className={`absolute w-3 h-4 ${isDark ? 'bg-[#6b5a45]/20' : 'bg-[#8b7355]/15'} rounded-full rotate-45 animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}

          {/* Subtle Grid Pattern */}
          <div className={`absolute inset-0 opacity-[0.03] ${isDark ? 'bg-[#8b7355]' : 'bg-[#6b5a45]'}`}
            style={{
              backgroundImage: `linear-gradient(${isDark ? '#8b7355' : '#6b5a45'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#8b7355' : '#6b5a45'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <header className={`relative z-10 px-6 py-6 ${theme.border} border-b backdrop-blur-md`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link 
              href="/"
              className={`inline-flex items-center gap-2 text-sm ${theme.textSubtle} hover:${theme.text} transition-colors`}
            >
              <ArrowLeft size={16} />
              Kembali
            </Link>
            
            <div className="flex items-center gap-2">
              <Coffee size={18} className={theme.accent} />
              <span className="font-serif text-lg">Kelas Pekerja</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme.card} hover:scale-110 transition-all duration-300`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} className={theme.accent} /> : <Moon size={18} className={theme.accent} />}
            </button>
          </div>
        </header>

        <main className="relative z-10 px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative inline-block">
              <CheckCircle className={`w-16 h-16 mx-auto mb-6 ${theme.accent} animate-pulse`} />
              <div className={`absolute inset-0 w-16 h-16 mx-auto ${theme.accent} blur-2xl opacity-30`} />
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl mb-6">
              Ceritamu Sudah Sampai
            </h1>

            <p className={`${theme.textMuted} leading-relaxed mb-10 text-lg`}>
              Mungkin gak semua orang akan mengerti,  
              <br />
              tapi di sini… ada yang mau membaca.
              <br /><br />
              <span className={`italic ${theme.textSubtle}`}>Terima kasih sudah berbagi.</span>
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link
                href="/buku"
                className={`inline-flex items-center justify-center px-8 py-3 
                  ${theme.accentBg} ${theme.accentText} rounded-full
                  transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
              >
                Baca Cerita Lain
              </Link>

              <button
                onClick={() => setIsSuccess(false)}
                className={`${theme.textSubtle} hover:${theme.text} transition-colors text-sm underline underline-offset-4`}
              >
                Tulis cerita baru
              </button>
            </div>

            <p className={`text-xs ${isDark ? 'text-[#6b5a45]' : 'text-[#a09080]'} mt-12`}>
              Cerita terpilih akan dipublikasikan di Kelas Pekerja.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-700`}>
      {/* Rich Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        
        {/* Base Gradient Noise Texture */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Coffee Steam Animation */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-32 ${isDark ? 'bg-gradient-to-t from-[#8b7355]/20 via-[#a08060]/10 to-transparent' : 'bg-gradient-to-t from-[#8b7355]/10 via-[#a08060]/5 to-transparent'} rounded-full blur-2xl`}
            style={{
              left: `${20 + i * 15}%`,
              bottom: '0',
              animation: `steam 10s ease-in-out ${i * 2}s infinite`,
            }}
          />
        ))}

        {/* Floating Elements - Coffee Beans & Ink Drops */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`float-${i}`}
            className={`absolute animate-float-slow ${i % 3 === 0 ? 'w-2 h-3' : 'w-1.5 h-2'} ${i % 2 === 0 ? (isDark ? 'bg-[#6b5a45]/30' : 'bg-[#8b7355]/20') : (isDark ? 'bg-[#4a4035]/20' : 'bg-[#6b5a45]/15')} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

        {/* Subtle Light Rays (Dark mode) or Warm Glow (Light mode) */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ${isDark ? 'bg-gradient-to-b from-[#8b7355]/10 via-transparent to-transparent' : 'bg-gradient-to-b from-[#e8d5b5]/30 via-[#f5f0e8]/10 to-transparent'} rounded-full blur-3xl`} />

        {/* Corner Decorations - Coffee Ring Stains */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full border-4 ${isDark ? 'border-[#3a3530]/30' : 'border-[#d4c8b8]/40'} opacity-30`} />
        <div className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full border-2 ${isDark ? 'border-[#4a4035]/20' : 'border-[#c4b8a8]/30'} opacity-20`} />
        
        {/* Writing Lines Effect */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, ${isDark ? '#8b7355' : '#6b5a45'} 24px, ${isDark ? '#8b7355' : '#6b5a45'} 25px)`,
            backgroundSize: '100% 25px',
          }}
        />
      </div>

      {/* Header */}
      <header className={`relative z-10 px-6 py-6 ${theme.border} border-b backdrop-blur-md sticky top-0`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className={`inline-flex items-center gap-2 text-sm ${theme.textSubtle} hover:${theme.text} transition-all duration-300 hover:-translate-x-1`}
          >
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Coffee size={18} className={`${theme.accent} animate-pulse`} />
            <span className="font-serif text-lg tracking-wide">Kelas Pekerja</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full ${theme.card} hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md group`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={18} className={`${theme.accent} group-hover:rotate-90 transition-transform duration-500`} />
            ) : (
              <Moon size={18} className={`${theme.accent} group-hover:-rotate-12 transition-transform duration-500`} />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          
          {/* Intro Section dengan Visual Poetry */}
          <div className="text-center mb-16 relative">
            {/* Decorative Quote Marks */}
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 text-8xl ${theme.textSubtle} opacity-20 font-serif select-none`}>
              "
            </div>
            
            <div className="relative inline-block mb-8">
              <PenLine className={`w-12 h-12 mx-auto ${theme.accent} opacity-80 animate-bounce-slow`} />
              <div className={`absolute inset-0 w-12 h-12 mx-auto ${theme.accent} blur-xl opacity-20`} />
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl mb-6 tracking-tight leading-tight">
              <span className="block">Tulis Ceritamu</span>
              <span className={`block text-lg md:text-xl ${theme.textMuted} mt-2 font-normal italic`}>
                di antara hiruk pikuk dan secangkir kopi yang menghangat
              </span>
            </h1>
            
            <p className={`${theme.textMuted} leading-relaxed text-sm md:text-base max-w-md mx-auto`}>
              Gak perlu sempurna. Gak perlu panjang. 
              <br />
              <span className={`${theme.textSubtle} italic`}>Yang penting, jujur.</span>
            </p>
          </div>

          {/* Form Card */}
          <div className={`${theme.card} rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden`}>
            {/* Card Inner Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-[#8b7355]/5 to-transparent' : 'from-[#f5f0e8]/50 to-transparent'} pointer-events-none`} />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {error && (
                <div className="p-4 bg-red-900/10 border border-red-800/20 rounded-lg text-red-500 text-sm animate-shake">
                  {error}
                </div>
              )}

              {/* Judul */}
              <div className="group">
                <label 
                  htmlFor="title" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-3 font-medium`}
                >
                  Judul Cerita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Misal: 'Malam di Sudut Kedai'"
                  className={`w-full ${theme.input} border rounded-xl px-5 py-4 
                    focus:border-[#8b7355]/60 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20
                    transition-all duration-300 hover:border-[#8b7355]/40`}
                />
              </div>

              {/* Nama */}
              <div className="group">
                <label 
                  htmlFor="author" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-3 font-medium`}
                >
                  Nama Kamu <span className={`text-xs normal-case ${theme.textMuted}`}>(Boleh Samaran)</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Bisa nama asli atau inisial..."
                  className={`w-full ${theme.input} border rounded-xl px-5 py-4 
                    focus:border-[#8b7355]/60 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20
                    transition-all duration-300 hover:border-[#8b7355]/40`}
                />
              </div>

              {/* Email */}
              <div className="group">
                <label 
                  htmlFor="email" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-3 font-medium`}
                >
                  Email <span className={`text-xs normal-case ${theme.textMuted}`}>(Opsional, untuk update)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@kamu.com"
                  className={`w-full ${theme.input} border rounded-xl px-5 py-4 
                    focus:border-[#8b7355]/60 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20
                    transition-all duration-300 hover:border-[#8b7355]/40`}
                />
              </div>

              {/* Kategori */}
              <div className="group">
                <label 
                  htmlFor="category" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-3 font-medium`}
                >
                  Tema Cerita
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    className={`w-full ${theme.input} border rounded-xl px-5 py-4 
                      focus:border-[#8b7355]/60 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20
                      transition-all duration-300 hover:border-[#8b7355]/40
                      appearance-none cursor-pointer`}
                  >
                    <option value="">Pilih tema yang merepresentasikan...</option>
                    <option value="kehidupan">Kehidupan — yang berjalan tanpa ampun</option>
                    <option value="kerja">Kerja — di antara tumpukan deadline</option>
                    <option value="malam">Malam — saat dunia berdiam</option>
                    <option value="kopi">Kopi — teman setia di pagi buta</option>
                    <option value="proses">Proses — perjalanan yang belum usai</option>
                    <option value="lainnya">Lainnya — yang tak terkategorikan</option>
                  </select>
                  <div className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none ${theme.textSubtle}`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="animate-bounce-slow">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* File Upload - Enhanced */}
              <div className="group">
                <label 
                  htmlFor="files" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-3 font-medium`}
                >
                  Lampiran <span className={`text-xs normal-case ${theme.textMuted}`}>(Opsional)</span>
                </label>
                
                {/* Enhanced Drop Zone */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full ${theme.input} border-2 border-dashed rounded-xl px-6 py-10 
                    text-center cursor-pointer hover:border-[#8b7355]/60 hover:bg-[#8b7355]/5
                    transition-all duration-500 group/upload relative overflow-hidden`}
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b7355]/5 to-transparent translate-x-[-100%] group-hover/upload:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-[#8b7355]/20' : 'bg-[#8b7355]/10'} flex items-center justify-center group-hover/upload:scale-110 transition-transform duration-300`}>
                      <FileUp className={`w-8 h-8 ${theme.accent}`} />
                    </div>
                    <p className={`text-sm ${theme.text} mb-2 font-medium`}>
                      Letakkan file di sini, atau klik untuk memilih
                    </p>
                    <p className={`text-xs ${theme.textMuted}`}>
                      DOCX, TXT, PDF, JPG, PNG • Maksimal 25MB per file
                    </p>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  accept=".docx,.doc,.txt,.pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* File List - Enhanced */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {files.map((file, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-between ${theme.input} border rounded-xl px-4 py-3 group/file hover:border-[#8b7355]/50 transition-all duration-300`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`w-10 h-10 ${isDark ? 'bg-[#8b7355]/20' : 'bg-[#8b7355]/10'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <span className={`text-xs ${theme.accent} font-bold uppercase`}>
                              {file.name.split('.').pop()?.slice(0, 3)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm ${theme.text} truncate font-medium`}>{file.name}</p>
                            <p className={`text-xs ${theme.textMuted}`}>{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className={`p-2 hover:bg-red-500/10 rounded-lg transition-all duration-300 group-hover/file:opacity-100 opacity-70`}
                        >
                          <X size={18} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cerita - Enhanced */}
              <div className="group">
                <label 
                  htmlFor="content" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-3 font-medium`}
                >
                  Ceritamu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="content"
                    name="content"
                    required
                    rows={12}
                    placeholder="Tulis apa yang kamu rasakan. Kesunyian. Kerinduan. Kopi yang dingin di meja. Tidak ada yang salah di sini..."
                    className={`w-full ${theme.input} border rounded-xl px-5 py-4 
                      focus:border-[#8b7355]/60 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20
                      transition-all duration-300 hover:border-[#8b7355]/40 leading-relaxed resize-none`}
                  />
                  {/* Corner Decoration */}
                  <div className={`absolute bottom-3 right-3 text-xs ${theme.textMuted} pointer-events-none`}>
                    <PenLine size={14} className="inline mr-1 opacity-50" />
                    bebas
                  </div>
                </div>
              </div>

              {/* Submit Button - Enhanced */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center gap-3 px-8 py-5 
                    ${theme.accentBg} ${theme.accentText} rounded-full
                    transition-all duration-500 
                    text-sm tracking-wider font-semibold
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
                    hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
                    active:scale-[0.98] relative overflow-hidden group`}
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Mengirim ke ruang baca...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      <span>Kirim Cerita</span>
                    </>
                  )}
                </button>
                
                <p className={`text-xs ${theme.textMuted} text-center mt-6 italic`}>
                  Ceritamu akan direview dulu sebelum dipublikasikan di sudut kopi kami.
                </p>
              </div>
            </form>
          </div>

          {/* Footer Quote */}
          <div className={`mt-16 pt-8 ${theme.border} border-t`}>
            <div className="relative text-center max-w-lg mx-auto">
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 ${isDark ? 'bg-[#0f0e0c]' : 'bg-[#f5f0e8]'} flex items-center justify-center`}>
                <Coffee size={16} className={theme.accent} />
              </div>
              <p className={`text-sm ${theme.textSubtle} leading-relaxed italic`}>
                "Gak semua orang kuat. Tapi banyak yang tetap jalan. 
                Dan mungkin, dengan menulis, kita bisa jalan bareng."
              </p>
              <div className={`mt-4 text-[10px] tracking-widest uppercase ${theme.textMuted}`}>
                — Kelas Pekerja
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes steam {
          0%, 100% {
            transform: translateY(0) scaleX(1);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scaleX(2);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
            opacity: 0.6;
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          33% {
            transform: translateY(-30px) translateX(10px) rotate(120deg);
            opacity: 0.4;
          }
          66% {
            transform: translateY(20px) translateX(-10px) rotate(240deg);
            opacity: 0.3;
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-steam {
          animation: steam 8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
