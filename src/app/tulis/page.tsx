"use client";



import Link from "next/link";

import { ArrowLeft, PenLine, Send, Coffee, CheckCircle, Loader2, FileUp, X, Star, Quote, Sparkles, Users, Eye, Award, Heart, TrendingUp, Shield } from "lucide-react";

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

  const [wordCount, setWordCount] = useState(0);

  const [isWriting, setIsWriting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);



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

      category: "Barista",

      title: "Gaji 3.5jt, Tapi Belajar Bikin Latte Art",

      content: "Kerja di coffee shop kecil pinggiran. Gaji pas-pasan, tapi owner ngajarin benerin espresso sampe perfect. Setahun disini, gue dari zero jadi bisa bikin latte art swan. Skill ini yang bikin gue diterima di cafe besar sekarang dengan gaji double.",

      author: "Ex-BaristaJKT",

      likes: 234,

      rating: 4,

    },

    {

      category: "Warehouse",

      title: "12 Jam Sehari, Badan Remuk, Tapi Bayar Utang",

      content: "Pabrik di Bekasi. Jam 8 pagi sampe 8 malam. Istirahat cuma 30 menit. Tiap pulang badan kayak dipukul. Tapi gajian tiap tanggal 1, utang gue berkurang. Buat gue yang punya tanggungan, ini bukan pengorbanan — ini pilihan.",

      author: "PakAsep89",

      likes: 567,

      rating: 3,

    },

    {

      category: "Retail",

      title: "Minimarket 24 Jam: Ngantor Ngantuk, Pulang Subuh",

      content: "Shift malam nambah 15k. Yang berat bukan ngantuknya, tapi ditatap pelanggan yang ngambil coklat masukin kantong. Gue di posisi: lapor? Diem? Akhirnya gue pilih diem. Bukan gak punya nyali, tapi gaji gue cukup buat makan doang.",

      author: "KasirMalam",

      likes: 890,

      rating: 2,

    },

  ];



  const benefits = [

    { icon: Shield, title: "Anonim Aman", desc: "Boleh pakai nama samaran" },

    { icon: Eye, title: "Exposure", desc: "Tulisan terbaik di beranda" },

    { icon: Heart, title: "Bantu Orang", desc: "Ribuan orang baca tiap hari" },

    { icon: TrendingUp, title: "Jadi Expert", desc: "Kontributor terpercaya" },

  ];



  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    const text = e.target.value;

    setWordCount(text.trim().split(/\s+/).filter(w => w.length > 0).length);

    setIsWriting(text.length > 0);

  };



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

      const hasValidExt = allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

      

      if (isValidType || hasValidExt) {

        if (file.size <= 25 * 1024 * 1024) validFiles.push(file);

        else invalidFiles.push(`${file.name} (terlalu besar)`);

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

    formData.append('wordCount', wordCount.toString());



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

      setWordCount(0);

      setIsWriting(false);

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

    glow: isDark ? "shadow-[#8b7355]/20" : "shadow-[#8b7355]/10",

  };



  if (!mounted) return null;



  // SUCCESS STATE - Killer Satisfaction

  if (isSuccess) {

    return (

      <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>

        <div className="fixed inset-0 pointer-events-none">

          <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-[#231f1a] via-[#1a1814] to-[#0f0e0c]' : 'from-[#faf8f5] via-[#f5f0e8] to-[#ebe4d8]'}`} />

          {[...Array(8)].map((_, i) => (

            <div key={i} className={`absolute w-2 h-32 ${isDark ? 'bg-gradient-to-t from-[#8b7355]/20 to-transparent' : 'bg-gradient-to-t from-[#8b7355]/10 to-transparent'} rounded-full blur-xl`} 

              style={{ left: `${10 + i * 12}%`, bottom: '-150px', animation: `steam 10s ease-in-out ${i * 1.5}s infinite` }} />

          ))}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

            <div className={`w-[600px] h-[600px] rounded-full ${theme.accent} opacity-5 blur-3xl animate-pulse`} />

          </div>

        </div>



        <main className="relative z-10 px-6 py-16 min-h-screen flex items-center justify-center">

          <div className="max-w-lg mx-auto text-center">

            <div className="relative inline-block mb-8">

              <div className={`w-28 h-28 mx-auto rounded-full ${theme.accentBg} flex items-center justify-center animate-bounce-slow shadow-2xl ${theme.glow}`}>

                <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />

              </div>

              <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center animate-pulse`}>

                <Sparkles className="w-5 h-5 text-white" />

              </div>

              <div className={`absolute inset-0 w-28 h-28 mx-auto rounded-full ${theme.accent} blur-3xl opacity-30 animate-pulse`} />

            </div>

            

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.highlight} text-sm font-medium mb-6 animate-fade-in`}>

              <TrendingUp size={16} className={theme.accent} />

              <span className={theme.accent}>Tulisan lo bakal dibaca ribuan orang</span>

            </div>

            

            <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">

              Mantap! 🙌

            </h1>

            

            <p className={`${theme.textMuted} text-lg mb-8 leading-relaxed`}>

              Tulisan lo udah masuk. Sekarang tim kami bakal review dulu. 

              <span className={`${theme.text} font-medium block mt-2`}>

                Yang jelas: cerita lo berarti buat banyak orang.

              </span>

            </p>



            <div className={`${theme.card} rounded-2xl p-6 mb-8 border text-left`}>

              <h3 className={`${theme.text} font-semibold mb-4 flex items-center gap-2`}>

                <Eye size={20} className={theme.accent} />

                Apa selanjutnya?

              </h3>

              <div className="space-y-4">

                {[

                  { step: "1", title: "Review", desc: "Tim kami baca 1-2 hari kerja", done: true },

                  { step: "2", title: "Moderasi", desc: "Kalau lolos, langsung tayang", done: false },

                  { step: "3", title: "Exposure", desc: "Tulisan lo muncul di beranda", done: false },

                ].map((item, i) => (

                  <div key={i} className="flex items-start gap-4">

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${item.done ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') : theme.highlight + ' ' + theme.textMuted}`}>

                      {item.step}

                    </div>

                    <div>

                      <p className={`${theme.text} font-medium text-sm`}>{item.title}</p>

                      <p className={`${theme.textMuted} text-xs`}>{item.desc}</p>

                    </div>

                  </div>

                ))}

              </div>

            </div>



            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">

              <Link href="/buku" className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 ${theme.accentBg} ${theme.accentText} rounded-full transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5`}>

                <Eye size={18} />

                Lihat Tulisan Lain

              </Link>

              <button onClick={() => setIsSuccess(false)} className={`w-full sm:w-auto px-6 py-3 ${theme.card} ${theme.text} rounded-full border hover:${theme.accent} transition-all text-sm font-medium`}>

                Tulis Lagi

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

        

        {/* Coffee illustrations */}

        <div className="absolute -top-4 -right-8 opacity-10 hover:opacity-20 transition-opacity duration-700">

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

          

          {/* Back */}

          <Link href="/" className={`inline-flex items-center gap-2 text-sm ${theme.textSubtle} hover:${theme.text} transition-all mb-6 group`}>

            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />

            Kembali

          </Link>



          {/* HERO - Emotional Trigger */}

          <div className="text-center mb-10">

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.highlight} text-xs tracking-wider uppercase mb-5`}>

              <Sparkles size={14} className={theme.accent} />

              <span className={theme.accent}>Platform Review Kerja No.1 Indonesia</span>

            </div>

            

            <h1 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">

              Pengalaman Kerja Lo Bisa <span className={`${theme.accent} relative`}>

                Nyelamatin

                <svg className={`absolute -bottom-2 left-0 w-full h-3 ${theme.accent}`} viewBox="0 0 100 12" preserveAspectRatio="none">

                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"/>

                </svg>

              </span> Orang Lain

            </h1>

            

            <p className={`${theme.textMuted} text-lg max-w-xl mx-auto leading-relaxed mb-6`}>

              Ribuan orang tiap hari <span className={theme.text}>bingung mau kerja di mana.</span> 

              Dengan cerita lo, mereka bisa 

              <span className={`${theme.text} font-medium`}> gak salah pilih tempat kerja.</span>

            </p>



            {/* Benefits Grid */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {benefits.map((benefit, i) => (

                <div key={i} className={`${theme.card} rounded-xl p-4 border text-center hover:scale-105 transition-transform duration-300`}>

                  <benefit.icon size={24} className={`${theme.accent} mx-auto mb-2`} />

                  <p className={`${theme.text} text-xs font-medium`}>{benefit.title}</p>

                  <p className={`${theme.textMuted} text-[10px]`}>{benefit.desc}</p>

                </div>

              ))}

            </div>

          </div>



          {/* EXAMPLES - Real Stories */}

          <div className={`${theme.card} rounded-2xl p-6 mb-8 border`}>

            <div className="flex items-center justify-between mb-5">

              <h3 className={`${theme.text} font-semibold flex items-center gap-2`}>

                <Quote size={20} className={theme.accent} />

                Tulisan yang Lolos

              </h3>

              <div className="flex gap-2">

                {examples.map((_, i) => (

                  <button

                    key={i}

                    onClick={() => setActiveExample(i)}

                    className={`w-2.5 h-2.5 rounded-full transition-all ${activeExample === i ? (isDark ? 'bg-[#e8e0d5] w-6' : 'bg-[#3d3229] w-6') : (isDark ? 'bg-[#3d3229]' : 'bg-[#d4c8b8]')}`}

                  />

                ))}

              </div>

            </div>

            

            <div className={`${theme.highlight} rounded-xl p-5 transition-all duration-500 border-l-4 border-[#8b7355]`}>

              <div className="flex items-center justify-between mb-3">

                <div className="flex items-center gap-3">

                  <span className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-[#3d3229]/50' : 'bg-[#d4c8b8]/50'} ${theme.accent} font-medium`}>

                    {examples[activeExample].category}

                  </span>

                  <div className="flex gap-0.5">

                    {[...Array(5)].map((_, i) => (

                      <Star key={i} size={12} className={i < examples[activeExample].rating ? "text-yellow-500 fill-yellow-500" : theme.textMuted} />

                    ))}

                  </div>

                </div>

                <div className={`flex items-center gap-1 ${theme.textMuted} text-xs`}>

                  <Heart size={12} className="text-red-500 fill-red-500" />

                  {examples[activeExample].likes}

                </div>

              </div>

              

              <h4 className={`${theme.text} font-bold text-lg mb-2 leading-tight`}>

                "{examples[activeExample].title}"

              </h4>

              <p className={`${theme.textMuted} text-sm leading-relaxed mb-3`}>

                {examples[activeExample].content}

              </p>

              <div className={`flex items-center justify-between ${theme.textSubtle} text-xs`}>

                <span>@{examples[activeExample].author}</span>

                <span className={theme.accent}>Lolos moderasi</span>

              </div>

            </div>

            

            <p className={`${theme.textMuted} text-xs mt-4 text-center`}>

              Geser untuk lihat cerita lain • 

              <span className={theme.accent}> Tulisan lo bisa jadi yang berikutnya</span>

            </p>

          </div>



          {/* FORM */}

          <div className={`${theme.card} rounded-2xl p-6 md:p-8 border shadow-xl relative overflow-hidden`}>

            {/* Writing indicator */}

            {isWriting && (

              <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accentBg} transition-all duration-300`} style={{width: `${Math.min(wordCount / 5, 100)}%`}} />

            )}

            

            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (

                <div className="p-4 bg-red-900/10 border border-red-800/20 rounded-lg text-red-500 text-sm animate-shake flex items-center gap-2">

                  <X size={16} /> {error}

                </div>

              )}



              {/* Judul */}

              <div>

                <label htmlFor="title" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-semibold`}>

                  Judul Tulisan <span className="text-red-500">*</span>

                </label>

                <input

                  type="text"

                  id="title"

                  name="title"

                  required

                  placeholder="Contoh: 'Gaji 4jt, Tapi Tiap Hari Dibentak'"

                  className={`w-full ${theme.input} border rounded-lg px-4 py-3 focus:border-[#8b7355]/60 focus:outline-none transition-all font-medium`}

                />

              </div>



              {/* Kategori & Rating */}

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label htmlFor="category" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-semibold`}>

                    Bidang Kerja <span className="text-red-500">*</span>

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

                    <option value="">Pilih bidang...</option>

                    <option value="barista">Barista / Coffee Shop</option>

                    <option value="retail">Retail / Minimarket / Mall</option>

                    <option value="warehouse">Warehouse / Logistik / Pabrik</option>

                    <option value="office">Kantoran / Admin / CS</option>

                    <option value="kitchen">Kitchen / Restoran / FnB</option>

                    <option value="driver">Driver / Ojek Online / Kurir</option>

                    <option value="sales">Sales / Marketing</option>

                    <option value="freelance">Freelance / Project</option>

                    <option value="lainnya">Lainnya</option>

                  </select>

                </div>



                <div>

                  <label className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-semibold`}>

                    Rating Pengalaman

                  </label>

                  <div className="flex items-center gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <button

                        key={star}

                        type="button"

                        onClick={() => setRating(star)}

                        onMouseEnter={() => setHoverRating(star)}

                        onMouseLeave={() => setHoverRating(0)}

                        className="p-1 transition-transform hover:scale-110 focus:outline-none"

                      >

                        <Star

                          size={28}

                          className={(hoverRating ? star <= hoverRating : star <= rating) ? "text-yellow-500 fill-yellow-500 drop-shadow-sm" : theme.textMuted}

                        />

                      </button>

                    ))}

                    <span className={`ml-3 text-sm font-medium ${theme.textMuted}`}>

                      {rating > 0 && ["Buruk banget", "Kurang oke", "Biasa aja", "Bagus", "Luar biasa"][rating - 1]}

                    </span>

                  </div>

                </div>

              </div>



              {/* Identitas */}

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label htmlFor="author" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-semibold`}>

                    Nama <span className="text-xs normal-case font-normal opacity-70">(Boleh samaran)</span>

                  </label>

                  <input

                    type="text"

                    id="author"

                    name="author"

                    placeholder="Contoh: BaristaJKT, PakAsep, Anonim"

                    className={`w-full ${theme.input} border rounded-lg px-4 py-3 focus:border-[#8b7355]/60 focus:outline-none transition-all`}

                  />

                </div>



                <div>

                  <label htmlFor="email" className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-semibold`}>

                    Email <span className="text-xs normal-case font-normal opacity-70">(Opsional)</span>

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

                <label className={`block text-xs tracking-wider uppercase ${theme.textSubtle} mb-2 font-semibold`}>

                  Bukti / Lampiran <span className="text-xs normal-case font-normal opacity-70">(Slip gaji, foto, dll)</span>

                </label>

                

                <div 

                  onClick={() => fileInputRef.current?.click()}

                  className={`w-full ${theme.input} border-2 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer hover:border-[#8b7355]/60 hover:bg-[#8b7355]/5 transition-all group`}

                >

                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${theme.highlight} flex items-center justify-center group-hover:scale-110 transition-transform`}>

                    <FileUp className={`w-6 h-6 ${theme.accent}`} />

                  </div>

                  <p className={`text-sm ${theme.text} font-medium mb-1`}>Klik atau drop file di sini</p>

                  <p className={`text-xs ${theme.textMuted}`}>DOCX, TXT, PDF, JPG, PNG • Max 25MB</p>

                </div>



                <input ref={fileInputRef} type="file" id="files" name="files" multiple accept=".docx,.doc,.txt,.pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />



                {files.length > 0 && (

                  <div className="mt-3 space-y-2">

                    {files.map((file, index) => (

                      <div key={index} className={`flex items-center justify-between ${theme.input} border rounded-lg px-3 py-2 group/file`}>

                        <div className="flex items-center gap-3 min-w-0">

                          <div className={`w-10 h-10 ${isDark ? 'bg-[#3d3229]/50' : 'bg-[#d4c8b8]/50'} rounded-lg flex items-center justify-center flex-shrink-0`}>

                            <span className={`text-xs ${theme.accent} font-bold uppercase`}>{file.name.split('.').pop()}</span>

                          </div>

                          <div className="min-w-0">

                            <p className={`text-sm ${theme.text} font-medium truncate`}>{file.name}</p>

                            <p className={`text-xs ${theme.textMuted}`}>{formatFileSize(file.size)}</p>

                          </div>

                        </div>

                        <button type="button" onClick={() => removeFile(index)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover/file:opacity-100">

                          <X size={18} className="text-red-500" />

                        </button>

                      </div>

                    ))}

                  </div>

                )}

              </div>



              {/* Content */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label htmlFor="content" className={`text-xs tracking-wider uppercase ${theme.textSubtle} font-semibold`}>

                    Cerita Lo <span className="text-red-500">*</span>

                  </label>

                  <span className={`text-xs ${wordCount < 50 ? theme.textMuted : wordCount < 100 ? 'text-yellow-500' : theme.accent} font-medium transition-colors`}>

                    {wordCount} kata {wordCount >= 100 && '✓'}

                  </span>

                </div>

                <div className="relative">

                  <textarea

                    ref={textareaRef}

                    id="content"

                    name="content"

                    required

                    rows={12}

                    onChange={handleContentChange}

                    placeholder="Ceritain pengalaman kerja lo yang sebenarnya. Gak perlu dipoles.



Ide yang bisa ditulis:

• Gaji & benefit yang diterima (jujur aja)

• Suasana kerja tiap hari — hectic? santai? toxic?

• Hal yang suka dan gak suka dari tempat kerja

• Tips buat yang mau apply ke sini

• Kenapa lo akhirnya resign (kalau udah)



Tulis sejujur-jujurnya. Orang lain butuh kejujuran ini."

                    className={`w-full ${theme.input} border rounded-lg px-4 py-4 focus:border-[#8b7355]/60 focus:outline-none transition-all resize-none leading-relaxed`}

                  />

                  {wordCount > 0 && wordCount < 50 && (

                    <div className={`absolute bottom-3 right-3 text-[10px] ${theme.textMuted} bg-[#0f0e0c]/80 px-2 py-1 rounded`}>

                      Min. 50 kata untuk lolos

                    </div>

                  )}

                </div>

                <p className={`text-xs ${theme.textMuted} mt-2`}>

                  <span className={theme.accent}>Tip:</span> Tulisan 100-300 kata paling banyak dibaca

                </p>

              </div>



              {/* Submit */}

              <div className="pt-2">

                <button

                  type="submit"

                  disabled={isSubmitting || wordCount < 50}

                  className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 ${wordCount >= 50 ? theme.accentBg : 'bg-gray-500 cursor-not-allowed'} ${theme.accentText} rounded-full transition-all duration-300 text-sm font-bold tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:transform-none`}

                >

                  {isSubmitting ? (

                    <><Loader2 size={20} className="animate-spin" />Mengirim ke ruang review...</>

                  ) : (

                    <><Send size={20} />Kirim Tulisan{wordCount >= 100 && ' 🔥'}</>

                  )}

                </button>

                

                {wordCount < 50 && (

                  <p className={`text-xs ${theme.textMuted} text-center mt-3`}>

                    Tulis minimal 50 kata dulu ya biar bermanfaat

                  </p>

                )}

                

                <div className={`flex items-center justify-center gap-4 mt-4 text-xs ${theme.textMuted}`}>

                  <span className="flex items-center gap-1">

                    <Shield size={12} /> Review 1-2 hari

                  </span>

                  <span className="flex items-center gap-1">

                    <Eye size={12} /> Tayang kalau lolos

                  </span>

                </div>

              </div>

            </form>

          </div>



          {/* Trust Footer */}

          <div className={`mt-10 pt-6 ${theme.border} border-t`}>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

              <p className={`text-sm ${theme.textSubtle} italic max-w-md`}>

                "Gak semua orang kuat. Tapi banyak yang tetap jalan. 

                Dan mungkin, dengan menulis, kita bisa jalan bareng."

              </p>

              <div className={`flex items-center gap-2 ${theme.textMuted} text-xs`}>

                <Coffee size={14} />

                <span>Kelas Pekerja • {new Date().getFullYear()}</span>

              </div>

            </div>

          </div>

        </div>

      </main>



      
    </div>

  );

}

