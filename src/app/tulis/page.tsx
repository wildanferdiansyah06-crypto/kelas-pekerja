"use client";

import Link from "next/link";
import { ArrowLeft, PenLine, Send, Coffee, CheckCircle, Loader2, FileUp, X, Star, Quote, Sparkles, Users, Eye, Award } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TulisPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [activeExample, setActiveExample] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync theme dengan navbar global
  useEffect(() => {
    setMounted(true);
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') || 
                        localStorage.getItem('theme') === 'dark' ||
                        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDark(isDarkMode);
    };
    checkTheme();
    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener('storage', checkTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', checkTheme);
    };
  }, []);

  const examples = [
    {
      category: "Retail",
      title: "3 Bulan di Minimarket",
      preview: "Gaji UMR, shift malam nambah 10k. Yang paling berat bukan kerjanya, tapi ditatap pelanggan yang ngambil coklat masukin kantong...",
      rating: 4,
    },
    {
      category: "Barista",
      title: "Dari Ngantor ke Ngopi",
      preview: "Resign dari kantoran gaji 7jt demi jadi barista gaji 4jt. Orang bilang gila. Tapi di sini gue nemuin peace yang gak ada di meeting tiap pagi...",
      rating: 5,
    },
    {
      category: "Warehouse",
      title: "Pabrik di Pinggir Kota",
      preview: "Jam kerja 12 jam, istirahat cuma 30 menit. Badan remuk, tapi gaji ngalir terus. Buat gue yang punya utang, ini pilihan bukan pengorbanan...",
      rating: 3,
    },
  ];

  const benefits = [
    { icon: Users, text: "Bantu ribuan orang cari kerjaan yang cocok" },
    { icon: Eye, text: "Tulisan terbaik ditampilkan di beranda" },
    { icon: Award, text: "Jadi kontributor terpercaya" },
  ];

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
    if (fileInputRef.current) fileInputRef.current.value = '';
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
    files.forEach((file, index) => formData.append(`file-${index}`, file));
    formData.append('fileCount', files.length.toString());
    formData.append('rating', rating.toString());

    try {
      const response = await fetch("/api/submit-story", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Gagal mengirim");

      setIsSuccess(true);
      setFiles([]);
      setRating(0);
      e.currentTarget.reset();

    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  }

  const theme = {
    bg: isDark ? "bg-[#1a1814]" : "bg-[#f5f0e8]",
    text: isDark ? "text-[#e8e0d5]" : "text-[#3d3229]",
    textMuted: isDark ? "text-[#a09080]" : "text-[#8b7355]",
    textSubtle: isDark ? "text-[#8b7355]" : "text-[#a08060]",
    card: isDark ? "bg-[#231f1a]/90 border-[#3d3229]/50" : "bg-[#faf8f5]/90 border-[#d4c8b8]/50",
    input: isDark ? "bg-[#0f0e0c]/50 border-[#3d3229]/50 text-[#e8e0d5] placeholder-[#5a4d40]" : "bg-[#fff]/60 border-[#d4c8b8] text-[#3d3229] placeholder-[#a09080]",
    accent: "text-[#8b7355]",
    accentBg: "bg-[#8b7355] hover:bg-[#6b5a45]",
    accentText: "text-white",
    border: isDark ? "border-[#3d3229]/30" : "border-[#d4c8b8]/50",
    highlight: isDark ? "bg-[#8b7355]/10" : "bg-[#8b7355]/5",
  };

  if (!mounted) return null;

  // SUCCESS STATE
  if (isSuccess) {
    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>
        <div className="fixed inset-0 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-[#231f1a] via-[#1a1814] to-[#0f0e0c]' : 'from-[#faf8f5] via-[#f5f0e8] to-[#ebe4d8]'}`} />
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`absolute w-2 h-24 ${isDark ? 'bg-gradient-to-t from-[#8b7355]/10 to-transparent' : 'bg-gradient-to-t from-[#8b7355]/5 to-transparent'} rounded-full blur-xl`} style={{ left: `${15 + i * 15}%`, bottom: '-100px', animation: `steam 8s ease-in-out ${i * 2}s infinite` }} />
          ))}
        </div>

        <main className="relative z-10 px-6 py-16 md:py-24 min-h-screen flex items-center justify-center">
          <div className="max-w-xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <div className={`w-24 h-24 mx-auto rounded-full ${theme.accentBg} flex items-center justify-center animate-bounce-slow`}>
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <div className={`absolute inset-0 w-24 h-24 mx-auto rounded-full ${theme.accent} blur-2xl opacity-30 animate-pulse`} />
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">
              Tulisan Lo Berhasil Dikirim! 🙌
            </h1>
            
            <p className={`${theme.textMuted} text-lg mb-8 leading-relaxed`}>
              Makasih udah berbagi. Tulisan lo gak cuma sekadar cerita — 
              <span className={`${theme.text} font-medium`}> tapi bisa jadi petunjuk buat ribuan orang </span> 
              yang lagi cari kerjaan.
            </p>

            <div className={`${theme.card} rounded-2xl p-6 mb-8 border`}>
              <h3 className={`${theme.text} font-medium mb-4 flex items-center gap-2`}>
                <Eye size={18} className={theme.accent} />
                Apa yang bakal terjadi?
              </h3>
              <ul className={`space-y-3 ${theme.textMuted} text-sm text-left`}>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                  <span>Tim kami akan review dalam 1-2 hari kerja</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                  <span>Kalau lolos, tulisan lo bakal ditampilkan di beranda</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                  <span>Lo bakal dapet notifikasi via email (kalau diisi)</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/buku" className={`inline-flex items-center justify-center gap-2 px-8 py-3 ${theme.accentBg} ${theme.accentText} rounded-full transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5`}>
                <Eye size={18} />
                Lihat Tulisan Lain
              </Link>
              <button onClick={() => setIsSuccess(false)} className={`${theme.textSubtle} hover:${theme.text} transition-colors text-sm underline underline-offset-4 px-4 py-2`}>
                Tulis cerita baru
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-[#231f1a] via-[#1a1814] to-[#0f0e0c]' : 'from-[#faf8f5] via-[#f5f0e8] to-[#ebe4d8]'}`} />
        
        {/* Coffee Illustrations */}
        <div className="absolute -top-4 -right-8 opacity-10 hover:opacity-20 transition-opacity">
          <svg width="200" height="240" viewBox="0 0 200 240" fill="none" className="animate-float-slow">
            <path d="M50 80 L100 200 L150 80" stroke="#8b7355" strokeWidth="3" fill={isDark ? "#3d3229" : "#d4c8b8"} opacity="0.2"/>
            <ellipse cx="100" cy="80" rx="55" ry="15" stroke="#8b7355" strokeWidth="3" fill={isDark ? "#1a1814" : "#f5f0e8"} opacity="0.3"/>
            <path d="M70 200 Q100 220 130 200 L130 210 Q100 230 70 210 Z" stroke="#8b7355" strokeWidth="2" fill={isDark ? "#1a1814" : "#f5f0e8"} opacity="0.4"/>
            <ellipse cx="100" cy="215" rx="25" ry="6" fill="#8b7355" opacity="0.3"/>
            <circle cx="100" cy="195" r="3" fill="#8b7355" opacity="0.5" className="animate-drip"/>
          </svg>
        </div>

        <div className="absolute top-1/3 -left-12 opacity-10">
          <svg width="180" height="280" viewBox="0 0 180 280" fill="none" className="animate-float-slow" style={{animationDelay: '3s'}}>
            <path d="M40 60 Q30 140 60 160 Q90 180 120 160 Q150 140 140 60" stroke="#8b7355" strokeWidth="2" fill={isDark ? "#3d3229" : "#d4c8b8"} opacity="0.15"/>
            <ellipse cx="90" cy="60" rx="50" ry="12" stroke="#8b7355" strokeWidth="2" fill={isDark ? "#1a1814" : "#f5f0e8"} opacity="0.2"/>
            <path d="M60 160 Q50 220 70 250 Q90 270 110 250 Q130 220 120 160" stroke="#8b7355" strokeWidth="2" fill={isDark ? "#3d3229" : "#d4c8b8"} opacity="0.15"/>
            <rect x="65" y="155" width="50" height="12" rx="2" fill="#8b7355" opacity="0.3"/>
          </svg>
        </div>

        <div className="absolute bottom-20 right-5 opacity-15">
          <svg width="140" height="100" viewBox="0 0 140 100" fill="none" className="animate-float-slow" style={{animationDelay: '1.5s'}}>
            <ellipse cx="70" cy="85" rx="50" ry="12" stroke="#8b7355" strokeWidth="2" fill={isDark ? "#3d3229" : "#d4c8b8"} opacity="0.3"/>
            <path d="M110 45 Q130 45 130 60 Q130 75 110 75" stroke="#8b7355" strokeWidth="3" fill="none" opacity="0.4"/>
            <path d="M30 40 Q30 80 70 80 Q110 80 110 40" stroke="#8b7355" strokeWidth="2" fill={isDark ? "#3d3229" : "#f5f0e8"} opacity="0.25"/>
            <ellipse cx="70" cy="40" rx="40" ry="10" stroke="#8b7355" strokeWidth="2" fill={isDark ? "#1a1814" : "#f5f0e8"} opacity="0.2"/>
            <ellipse cx="70" cy="42" rx="32" ry="6" fill="#8b7355" opacity="0.4"/>
            <path d="M60 25 Q55 15 60 5" stroke="#8b7355" strokeWidth="1.5" opacity="0.3" fill="none" className="animate-steam"/>
          </svg>
        </div>
      </div>

      <main className="relative z-10 px-6 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          
          {/* Back Link */}
          <Link href="/" className={`inline-flex items-center gap-2 text-sm ${theme.textSubtle} hover:${theme.text} transition-all mb-8 group`}>
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>

          {/* HERO SECTION - Emotional Hook */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.highlight} text-xs tracking-wider uppercase mb-6`}>
              <Sparkles size={14} className={theme.accent} />
              <span className={theme.accent}>Glassdoor versi anak muda Indonesia</span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">
              Tulisan Lo Bisa <span className={theme.accent}>Nyelamatin</span> Orang Lain
            </h1>
            
            <p className={`${theme.textMuted} text-lg max-w-xl mx-auto leading-relaxed mb-6`}>
              Ribuan orang tiap hari bingung mau kerja di mana. 
              Dengan cerita lo, mereka bisa ambil keputusan lebih baik. 
              <span className={`${theme.text} italic`}> No bullshit, just real stories.</span>
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {benefits.map((benefit, i) => (
                <div key={i} className={`flex items-center gap-2 ${theme.textSubtle}`}>
                  <benefit.icon size={14} />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EXAMPLE STORIES - Social Proof */}
          <div className={`${theme.card} rounded-2xl p-6 mb-8 border`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${theme.text} font-medium flex items-center gap-2`}>
                <Quote size={18} className={theme.accent} />
                Contoh Tulisan
              </h3>
              <div className="flex gap-2">
                {examples.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveExample(i)}
                    className={`w-2 h-2 rounded-full transition-all ${activeExample === i ? (isDark ? 'bg-[#e8e0d5] w-6' : 'bg-[#3d3229] w-6') : (isDark ? 'bg-[#3d3229]' : 'bg-[#d4c8b8]')}`}
                  />
                ))}
              </div>
            </div>
            
            <div className={`${theme.highlight} rounded-xl p-5 transition-all duration-300`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-[#3d3229]/50' : 'bg-[#d4c8b8]/50'} ${theme.accent}`}>
                  {examples[activeExample].category}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < examples[activeExample].rating ? "text-yellow-500 fill-yellow-500" : theme.textMuted} />
                  ))}
                </div>
              </div>
              <h4 className={`${theme.text} font-medium mb-2`}>"{examples[activeExample].title}"</h4>
              <p className={`${theme.textMuted} text-sm leading-relaxed italic`}>{examples[activeExample].preview}</p>
            </div>
            
            <p className={`${theme.textMuted} text-xs mt-3 text-center`}>
              Geser dots di atas untuk lihat contoh lain
            </p>
          </div>

          {/* FORM */}
          <div className={`${theme.card} rounded-2xl p-6 md:p-8 border shadow-xl`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-900/10 border border-red-800/20 rounded-lg text-red-500 text-sm animate-shake">
                  {error}
                </div>
              )}

              {/* Judul */}
              <div>
                <label htmlFor="title" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-medium`}>
                  Judul Tulisan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Contoh: '3 Bulan Jadi Barista, Gue Belajar Apa?'"
                  className={`w-full ${theme.input} border rounded-lg px-4 py-3 focus:border-[#8b7355]/60 focus:outline-none transition-all`}
                />
              </div>

              {/* Kategori & Rating Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-medium`}>
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className={`w-full ${theme.input} border rounded-lg px-4 py-3 focus:border-[#8b7355]/60 focus:outline-none transition-all appearance-none cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238b7355'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1rem',
                    }}
                  >
                    <option value="">Pilih kategori...</option>
                    <option value="barista">Barista / Coffee Shop</option>
                    <option value="retail">Retail / Minimarket</option>
                    <option value="warehouse">Warehouse / Logistik</option>
                    <option value="office">Kantoran / Admin</option>
                    <option value="kitchen">Dapur / Restoran</option>
                    <option value="driver">Driver / Ojek Online</option>
                    <option value="freelance">Freelance / Project</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-medium`}>
                    Rating Pengalaman (Opsional)
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={(hoverRating ? star <= hoverRating : star <= rating) ? "text-yellow-500 fill-yellow-500" : theme.textMuted}
                        />
                      </button>
                    ))}
                    <span className={`ml-2 text-sm ${theme.textMuted}`}>
                      {rating > 0 && ["Buruk", "Kurang", "Biasa", "Bagus", "Luar Biasa"][rating - 1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Nama & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="author" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-medium`}>
                    Nama <span className="text-xs normal-case font-normal">(Boleh Samaran)</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Contoh: BaristaJakarta"
                    className={`w-full ${theme.input} border rounded-lg px-4 py-3 focus:border-[#8b7355]/60 focus:outline-none transition-all`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-medium`}>
                    Email <span className="text-xs normal-case font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Buat notifikasi kalau tulisan lolos"
                    className={`w-full ${theme.input} border rounded-lg px-4 py-3 focus:border-[#8b7355]/60 focus:outline-none transition-all`}
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-medium`}>
                  Lampiran <span className="text-xs normal-case font-normal">(Slip gaji, foto tempat, dll)</span>
                </label>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full ${theme.input} border-2 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer hover:border-[#8b7355]/60 transition-all`}
                >
                  <FileUp className={`w-6 h-6 mx-auto mb-2 ${theme.accent}`} />
                  <p className={`text-sm ${theme.text}`}>Klik atau drop file di sini</p>
                  <p className={`text-xs ${theme.textMuted}`}>DOCX, TXT, PDF, JPG, PNG • Max 25MB</p>
                </div>

                <input ref={fileInputRef} type="file" id="files" name="files" multiple accept=".docx,.doc,.txt,.pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />

                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className={`flex items-center justify-between ${theme.input} border rounded-lg px-3 py-2`}>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 ${isDark ? 'bg-[#3d3229]/50' : 'bg-[#d4c8b8]/50'} rounded flex items-center justify-center flex-shrink-0`}>
                            <span className={`text-xs ${theme.accent} font-medium`}>{file.name.split('.').pop()?.slice(0, 3)}</span>
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm ${theme.text} truncate`}>{file.name}</p>
                            <p className={`text-xs ${theme.textMuted}`}>{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile(index)} className="p-1 hover:bg-red-500/10 rounded">
                          <X size={16} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-medium`}>
                  Cerita Lo <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={10}
                  placeholder="Ceritain pengalaman kerja lo. Bisa soal:
• Gaji & benefit yang diterima
• Suasana kerja sehari-hari  
• Hal yang suka / gak suka
• Tips buat yang mau apply

Jujur aja, gak perlu dipoles. Yang penting real."
                  className={`w-full ${theme.input} border rounded-lg px-4 py-3 focus:border-[#8b7355]/60 focus:outline-none transition-all resize-none leading-relaxed`}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 ${theme.accentBg} ${theme.accentText} rounded-full transition-all duration-300 text-sm font-semibold tracking-wide disabled:opacity-50 hover:shadow-lg hover:-translate-y-0.5`}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} className="animate-spin" />Mengirim...</>
                  ) : (
                    <><Send size={18} />Kirim Tulisan</>
                  )}
                </button>
                <p className={`text-xs ${theme.textMuted} text-center mt-4`}>
                  Tulisan akan direview 1-2 hari sebelum ditampilkan
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className={`mt-12 pt-6 ${theme.border} border-t text-center`}>
            <p className={`text-sm ${theme.textSubtle} italic`}>
              "Gak semua orang kuat. Tapi banyak yang tetap jalan. 
              Dan mungkin, dengan menulis, kita bisa jalan bareng."
            </p>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        @keyframes steam { 0% { transform: translateY(0); opacity: 0.3; } 100% { transform: translateY(-20px); opacity: 0; } }
        @keyframes drip { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-steam { animation: steam 3s ease-out infinite; }
        .animate-drip { animation: drip 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
