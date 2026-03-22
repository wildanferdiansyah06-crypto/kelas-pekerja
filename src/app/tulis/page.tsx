"use client";

import Link from "next/link";
import { ArrowLeft, PenLine, Send, Coffee, CheckCircle, Loader2, FileUp, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TulisPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync theme dengan navbar global
  useEffect(() => {
    setMounted(true);
    
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') || 
                        localStorage.getItem('theme') === 'dark' ||
                        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDark(isDarkMode);
    };
    
    checkTheme();
    
    // Listen perubahan theme dari navbar global
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Listen storage event (kalau navbar pakai localStorage)
    const handleStorage = () => checkTheme();
    window.addEventListener('storage', handleStorage);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorage);
    };
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

  // Mocha soft theme colors
  const theme = {
    bg: isDark 
      ? "bg-[#1a1814]" 
      : "bg-[#f5f0e8]",
    text: isDark ? "text-[#e8e0d5]" : "text-[#3d3229]",
    textMuted: isDark ? "text-[#a09080]" : "text-[#8b7355]",
    textSubtle: isDark ? "text-[#8b7355]" : "text-[#a08060]",
    card: isDark 
      ? "bg-[#231f1a]/90 border-[#3d3229]/50" 
      : "bg-[#faf8f5]/90 border-[#d4c8b8]/50",
    input: isDark 
      ? "bg-[#0f0e0c]/50 border-[#3d3229]/50 text-[#e8e0d5] placeholder-[#5a4d40]" 
      : "bg-[#fff]/60 border-[#d4c8b8] text-[#3d3229] placeholder-[#a09080]",
    accent: "text-[#8b7355]",
    accentBg: "bg-[#8b7355] hover:bg-[#6b5a45]",
    accentText: "text-white",
    border: isDark ? "border-[#3d3229]/30" : "border-[#d4c8b8]/50",
    mocha: {
      light: "#f5f0e8",
      cream: "#ebe4d8", 
      medium: "#d4c8b8",
      brown: "#8b7355",
      dark: "#3d3229",
      deep: "#1a1814"
    }
  };

  if (!mounted) return null;

  // Success State
  if (isSuccess) {
    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>
        {/* Soft Mocha Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-[#231f1a]/50 via-transparent to-[#0f0e0c]/30' : 'from-[#faf8f5]/50 via-transparent to-[#ebe4d8]/30'}`} />
          
          {/* Coffee Illustrations - Success State */}
          {/* V60 Dripper - Top Right */}
          <div className="absolute top-20 right-10 md:right-20 opacity-20 md:opacity-30">
            <svg width="120" height="140" viewBox="0 0 120 140" fill="none" className="animate-float-slow">
              {/* Dripper */}
              <path d="M30 40 L60 120 L90 40" stroke="currentColor" strokeWidth="2" fill={isDark ? "#3d3229" : "#d4c8b8"} opacity="0.3"/>
              <path d="M25 35 Q60 25 95 35 L90 45 Q60 35 30 45 Z" stroke="currentColor" strokeWidth="2" fill={isDark ? "#2a2520" : "#e8e0d5"}/>
              {/* Glass server */}
              <path d="M45 120 Q60 130 75 120 L75 125 Q60 135 45 125 Z" stroke="currentColor" strokeWidth="1.5" fill={isDark ? "#1a1814" : "#f5f0e8"} opacity="0.5"/>
              {/* Coffee liquid */}
              <ellipse cx="60" cy="125" rx="12" ry="4" fill={isDark ? "#4a4035" : "#8b7355"} opacity="0.6"/>
            </svg>
          </div>

          {/* Coffee Cup - Bottom Left */}
          <div className="absolute bottom-32 left-10 md:left-20 opacity-20 md:opacity-30">
            <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="animate-float-slow" style={{animationDelay: '2s'}}>
              {/* Saucer */}
              <ellipse cx="50" cy="70" rx="35" ry="8" stroke="currentColor" strokeWidth="2" fill={isDark ? "#2a2520" : "#ebe4d8"} opacity="0.4"/>
              {/* Cup body */}
              <path d="M25 30 Q25 65 50 65 Q75 65 75 30" stroke="currentColor" strokeWidth="2" fill={isDark ? "#3d3229" : "#faf8f5"} opacity="0.5"/>
              {/* Cup rim */}
              <ellipse cx="50" cy="30" rx="25" ry="6" stroke="currentColor" strokeWidth="2" fill={isDark ? "#4a4035" : "#f5f0e8"} opacity="0.3"/>
              {/* Coffee surface */}
              <ellipse cx="50" cy="32" rx="20" ry="4" fill={isDark ? "#2a2520" : "#8b7355"} opacity="0.4"/>
              {/* Steam */}
              <path d="M45 20 Q40 10 45 0" stroke="currentColor" strokeWidth="1.5" opacity="0.3" className="animate-steam"/>
              <path d="M55 20 Q60 10 55 0" stroke="currentColor" strokeWidth="1.5" opacity="0.3" className="animate-steam" style={{animationDelay: '1s'}}/>
            </svg>
          </div>

          {/* Coffee Beans Scattered */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-4 ${isDark ? 'bg-[#4a4035]/20' : 'bg-[#8b7355]/15'} rounded-full`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                transform: `rotate(${45 + i * 30}deg)`,
                animation: `float ${8 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <main className="relative z-10 px-6 py-16 md:py-24 min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <CheckCircle className={`w-20 h-20 mx-auto ${theme.accent} animate-pulse`} />
              <div className={`absolute inset-0 w-20 h-20 mx-auto ${theme.accent} blur-3xl opacity-20`} />
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
              Ceritamu Sudah Sampai
            </h1>

            <p className={`${theme.textMuted} leading-relaxed mb-10 text-lg max-w-md mx-auto`}>
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

            <p className={`text-xs ${theme.textMuted} mt-12`}>
              Cerita terpilih akan dipublikasikan di Kelas Pekerja.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>
      {/* Mocha Soft Background with Coffee Illustrations */}
      <div className="fixed inset-0 pointer-events-none">
        
        {/* Base soft gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-[#231f1a] via-[#1a1814] to-[#0f0e0c]' : 'from-[#faf8f5] via-[#f5f0e8] to-[#ebe4d8]'}`} />

        {/* V60 Dripper - Positioned top right, partially visible */}
        <div className="absolute -top-4 -right-8 md:right-10 opacity-10 md:opacity-20 hover:opacity-30 transition-opacity duration-700">
          <svg width="200" height="240" viewBox="0 0 200 240" fill="none" className="animate-float-slow">
            {/* Dripper cone */}
            <path d="M50 80 L100 200 L150 80" stroke={theme.mocha.brown} strokeWidth="3" fill={isDark ? theme.mocha.dark : theme.mocha.cream} opacity="0.2"/>
            {/* Top rim */}
            <ellipse cx="100" cy="80" rx="55" ry="15" stroke={theme.mocha.brown} strokeWidth="3" fill={isDark ? theme.mocha.deep : theme.mocha.light} opacity="0.3"/>
            {/* Ribs/detail lines */}
            <line x1="75" y1="80" x2="100" y2="200" stroke={theme.mocha.brown} strokeWidth="1" opacity="0.3"/>
            <line x1="100" y1="80" x2="100" y2="200" stroke={theme.mocha.brown} strokeWidth="1" opacity="0.3"/>
            <line x1="125" y1="80" x2="100" y2="200" stroke={theme.mocha.brown} strokeWidth="1" opacity="0.3"/>
            {/* Glass server below */}
            <path d="M70 200 Q100 220 130 200 L130 210 Q100 230 70 210 Z" stroke={theme.mocha.brown} strokeWidth="2" fill={isDark ? theme.mocha.deep : theme.mocha.light} opacity="0.4"/>
            {/* Coffee level */}
            <ellipse cx="100" cy="215" rx="25" ry="6" fill={theme.mocha.brown} opacity="0.3"/>
            {/* Single drop falling */}
            <circle cx="100" cy="195" r="3" fill={theme.mocha.brown} opacity="0.5" className="animate-drip"/>
          </svg>
        </div>

        {/* Chemex - Left side, mid height */}
        <div className="absolute top-1/3 -left-12 md:left-8 opacity-10 md:opacity-15 hover:opacity-25 transition-opacity duration-700">
          <svg width="180" height="280" viewBox="0 0 180 280" fill="none" className="animate-float-slow" style={{animationDelay: '3s'}}>
            {/* Chemex body - hourglass shape */}
            <path d="M40 60 Q30 140 60 160 Q90 180 120 160 Q150 140 140 60" stroke={theme.mocha.brown} strokeWidth="2" fill={isDark ? theme.mocha.dark : theme.mocha.cream} opacity="0.15"/>
            {/* Top opening */}
            <ellipse cx="90" cy="60" rx="50" ry="12" stroke={theme.mocha.brown} strokeWidth="2" fill={isDark ? theme.mocha.deep : theme.mocha.light} opacity="0.2"/>
            {/* Bottom */}
            <path d="M60 160 Q50 220 70 250 Q90 270 110 250 Q130 220 120 160" stroke={theme.mocha.brown} strokeWidth="2" fill={isDark ? theme.mocha.dark : theme.mocha.cream} opacity="0.15"/>
            {/* Wood collar */}
            <rect x="65" y="155" width="50" height="12" rx="2" fill={theme.mocha.brown} opacity="0.3"/>
            {/* Tie */}
            <path d="M90 167 L85 180 L90 175 L95 180 Z" fill={theme.mocha.brown} opacity="0.4"/>
          </svg>
        </div>

        {/* Coffee Cup & Saucer - Bottom right */}
        <div className="absolute bottom-20 right-5 md:right-16 opacity-15 md:opacity-25 hover:opacity-35 transition-opacity duration-700">
          <svg width="140" height="100" viewBox="0 0 140 100" fill="none" className="animate-float-slow" style={{animationDelay: '1.5s'}}>
            {/* Saucer */}
            <ellipse cx="70" cy="85" rx="50" ry="12" stroke={theme.mocha.brown} strokeWidth="2" fill={isDark ? theme.mocha.dark : theme.mocha.cream} opacity="0.3"/>
            {/* Cup handle */}
            <path d="M110 45 Q130 45 130 60 Q130 75 110 75" stroke={theme.mocha.brown} strokeWidth="3" fill="none" opacity="0.4"/>
            {/* Cup body */}
            <path d="M30 40 Q30 80 70 80 Q110 80 110 40" stroke={theme.mocha.brown} strokeWidth="2" fill={isDark ? theme.mocha.dark : theme.mocha.light} opacity="0.25"/>
            {/* Cup rim */}
            <ellipse cx="70" cy="40" rx="40" ry="10" stroke={theme.mocha.brown} strokeWidth="2" fill={isDark ? theme.mocha.deep : theme.mocha.cream} opacity="0.2"/>
            {/* Coffee liquid */}
            <ellipse cx="70" cy="42" rx="32" ry="6" fill={theme.mocha.brown} opacity="0.4"/>
            {/* Reflection */}
            <ellipse cx="55" cy="38" rx="8" ry="3" fill={isDark ? theme.mocha.light : theme.mocha.cream} opacity="0.2"/>
            {/* Steam lines */}
            <path d="M60 25 Q55 15 60 5" stroke={theme.mocha.brown} strokeWidth="1.5" opacity="0.3" fill="none" className="animate-steam"/>
            <path d="M70 20 Q75 10 70 0" stroke={theme.mocha.brown} strokeWidth="1.5" opacity="0.3" fill="none" className="animate-steam" style={{animationDelay: '0.5s'}}/>
            <path d="M80 25 Q75 15 80 5" stroke={theme.mocha.brown} strokeWidth="1.5" opacity="0.3" fill="none" className="animate-steam" style={{animationDelay: '1s'}}/>
          </svg>
        </div>

        {/* Small espresso cup - Top left */}
        <div className="absolute top-32 left-10 md:left-24 opacity-10 md:opacity-20">
          <svg width="80" height="70" viewBox="0 0 80 70" fill="none" className="animate-float-slow" style={{animationDelay: '2s'}}>
            {/* Saucer */}
            <ellipse cx="40" cy="60" rx="30" ry="6" stroke={theme.mocha.brown} strokeWidth="1.5" fill={isDark ? theme.mocha.dark : theme.mocha.cream} opacity="0.3"/>
            {/* Cup */}
            <path d="M20 30 Q20 55 40 55 Q60 55 60 30" stroke={theme.mocha.brown} strokeWidth="1.5" fill={isDark ? theme.mocha.dark : theme.mocha.light} opacity="0.25"/>
            <ellipse cx="40" cy="30" rx="20" ry="5" stroke={theme.mocha.brown} strokeWidth="1.5" fill={isDark ? theme.mocha.deep : theme.mocha.cream} opacity="0.2"/>
            {/* Crema */}
            <ellipse cx="40" cy="31" rx="16" ry="3" fill={theme.mocha.brown} opacity="0.5"/>
            {/* Handle */}
            <path d="M60 35 Q72 35 72 42 Q72 49 60 49" stroke={theme.mocha.brown} strokeWidth="1.5" fill="none" opacity="0.4"/>
          </svg>
        </div>

        {/* Coffee Beans - Scattered artistically */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`bean-${i}`}
            className="absolute animate-float"
            style={{
              left: `${10 + (i * 11)}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i}s`,
            }}
          >
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none" opacity={isDark ? 0.15 : 0.1}>
              <ellipse cx="10" cy="14" rx="8" ry="12" fill={theme.mocha.brown} transform="rotate(15 10 14)"/>
              <line x1="10" y1="6" x2="10" y2="22" stroke={isDark ? theme.mocha.deep : theme.mocha.light} strokeWidth="1" transform="rotate(15 10 14)"/>
            </svg>
          </div>
        ))}

        {/* Soft texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content - No Navbar */}
      <main className="relative z-10 px-6 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          
          {/* Back Link */}
          <div className="mb-8">
            <Link 
              href="/"
              className={`inline-flex items-center gap-2 text-sm ${theme.textSubtle} hover:${theme.text} transition-all duration-300 hover:-translate-x-1 group`}
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Kembali</span>
            </Link>
          </div>
          
          {/* Intro Section */}
          <div className="text-center mb-12 relative">
            <div className="relative inline-block mb-6">
              <PenLine className={`w-10 h-10 mx-auto ${theme.accent} opacity-80`} />
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">
              Tulis Ceritamu
            </h1>
            
            <p className={`${theme.textMuted} leading-relaxed text-sm`}>
              Gak perlu sempurna. Gak perlu panjang. 
              <br />
              <span className={`${theme.textSubtle} italic`}>Yang penting, jujur.</span>
            </p>
          </div>

          {/* Form Card */}
          <div className={`${theme.card} backdrop-blur-sm rounded-2xl p-6 md:p-8 border shadow-xl`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-900/10 border border-red-800/20 rounded-lg text-red-500 text-sm animate-shake">
                  {error}
                </div>
              )}

              {/* Judul */}
              <div>
                <label 
                  htmlFor="title" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-2 font-medium`}
                >
                  Judul Cerita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Misal: 'Malam di Sudut Kedai'"
                  className={`w-full ${theme.input} border rounded-lg px-4 py-3 
                    focus:border-[#8b7355]/60 focus:outline-none transition-all duration-300`}
                />
              </div>

              {/* Nama */}
              <div>
                <label 
                  htmlFor="author" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-2 font-medium`}
                >
                  Nama Kamu <span className={`text-xs normal-case ${theme.textMuted}`}>(Boleh Samaran)</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Bisa nama asli atau inisial"
                  className={`w-full ${theme.input} border rounded-lg px-4 py-3 
                    focus:border-[#8b7355]/60 focus:outline-none transition-all duration-300`}
                />
              </div>

              {/* Email */}
              <div>
                <label 
                  htmlFor="email" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-2 font-medium`}
                >
                  Email <span className={`text-xs normal-case ${theme.textMuted}`}>(Opsional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@kamu.com"
                  className={`w-full ${theme.input} border rounded-lg px-4 py-3 
                    focus:border-[#8b7355]/60 focus:outline-none transition-all duration-300`}
                />
              </div>

              {/* Kategori */}
              <div>
                <label 
                  htmlFor="category" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-2 font-medium`}
                >
                  Tema Cerita
                </label>
                <select
                  id="category"
                  name="category"
                  className={`w-full ${theme.input} border rounded-lg px-4 py-3 
                    focus:border-[#8b7355]/60 focus:outline-none transition-all duration-300
                    appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238b7355'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1rem',
                  }}
                >
                  <option value="">Pilih tema...</option>
                  <option value="kehidupan">Kehidupan</option>
                  <option value="kerja">Kerja</option>
                  <option value="malam">Malam</option>
                  <option value="kopi">Kopi</option>
                  <option value="proses">Proses</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label 
                  htmlFor="files" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-2 font-medium`}
                >
                  Lampiran <span className={`text-xs normal-case ${theme.textMuted}`}>(Opsional)</span>
                </label>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full ${theme.input} border-2 border-dashed rounded-lg px-4 py-8 
                    text-center cursor-pointer hover:border-[#8b7355]/60 transition-all duration-300`}
                >
                  <FileUp className={`w-8 h-8 mx-auto mb-2 ${theme.accent}`} />
                  <p className={`text-sm ${theme.text} mb-1`}>Klik atau drag & drop file di sini</p>
                  <p className={`text-xs ${theme.textMuted}`}>DOCX, TXT, PDF, JPG, PNG (Max 25MB)</p>
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

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-between ${theme.input} border rounded-lg px-3 py-2`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 ${isDark ? 'bg-[#3d3229]/50' : 'bg-[#d4c8b8]/50'} rounded flex items-center justify-center flex-shrink-0`}>
                            <span className={`text-xs ${theme.accent} font-medium uppercase`}>
                              {file.name.split('.').pop()?.slice(0, 3)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm ${theme.text} truncate`}>{file.name}</p>
                            <p className={`text-xs ${theme.textMuted}`}>{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <X size={16} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cerita */}
              <div>
                <label 
                  htmlFor="content" 
                  className={`block text-[10px] tracking-[0.2em] uppercase ${theme.textSubtle} mb-2 font-medium`}
                >
                  Ceritamu <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={10}
                  placeholder="Tulis apa yang kamu rasakan. Tidak ada yang salah di sini..."
                  className={`w-full ${theme.input} border rounded-lg px-4 py-3 
                    focus:border-[#8b7355]/60 focus:outline-none transition-all duration-300 resize-none leading-relaxed`}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 
                    ${theme.accentBg} ${theme.accentText} rounded-full
                    transition-all duration-300 text-sm tracking-wider font-medium
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:shadow-lg hover:-translate-y-0.5`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Kirim Cerita
                    </>
                  )}
                </button>
                
                <p className={`text-xs ${theme.textMuted} text-center mt-4`}>
                  Ceritamu akan direview dulu sebelum dipublikasikan.
                </p>
              </div>
            </form>
          </div>

          {/* Footer Quote */}
          <div className={`mt-12 pt-6 ${theme.border} border-t text-center`}>
            <p className={`text-sm ${theme.textSubtle} italic leading-relaxed`}>
              "Gak semua orang kuat. Tapi banyak yang tetap jalan. 
              Dan mungkin, dengan menulis, kita bisa jalan bareng."
            </p>
          </div>
        </div>
      </main>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(2deg);
          }
          66% {
            transform: translateY(5px) rotate(-2deg);
          }
        }
        
        @keyframes steam {
          0% {
            transform: translateY(0) opacity(0.3);
          }
          100% {
            transform: translateY(-20px) opacity(0);
          }
        }
        
        @keyframes drip {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(3px);
            opacity: 0.8;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-steam {
          animation: steam 3s ease-out infinite;
        }
        
        .animate-drip {
          animation: drip 2s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
