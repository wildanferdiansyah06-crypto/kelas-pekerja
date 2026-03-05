import { 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Twitter, 
  BookOpen, 
  Coffee, 
  Moon, 
  Heart,
  ArrowUpRight,
  Sparkles,
  Clock,
  Music,
  Feather,
  Download,
  ChevronDown,
  Library,
  Sun,
  Eye,
  X,
  Menu,
  Share2,
  Bookmark,
  Mail,
  Phone,
  Copy,
  Check,
  Wallet
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// Assets
const HERO_BG = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop";

const BUKU_ILUSTRASI = {
  seniMenyeduh: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
  diBalikBar: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
  diAtasCangkir: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop",
  menulisPelan: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop"
};

// GANTI URL INI DENGAN FOTO KAMU
const FOTO_PENULIS = "/wildan.png";

const GRAIN_TEXTURE = "https://www.transparenttextures.com/patterns/cream-paper.png";

const BUKU_LIST = [
  {
    id: 1,
    judul: "Seni Menyeduh Kehidupan",
    link: "https://drive.google.com/file/d/17Zd1FKFK4X_vmKhITFU5lXihOmMEkezI/view?usp=drivesdk",
    deskripsi: "Catatan tentang bagaimana kita menyikapi hidup dengan cara yang lebih gentle dan penuh makna, seperti menyeduh kopi yang sempurna.",
    halaman: "45",
    readTime: "25 menit",
    ilustrasi: BUKU_ILUSTRASI.seniMenyeduh,
    tema: "Kehidupan",
    preview: "Di dalamnya kamu akan menemukan catatan-catatan personal yang jujur tentang bagaimana kita bisa menyikapi hari-hari berat dengan lebih lembut. Bukan panduan, hanya berbagi."
  },
  {
    id: 2,
    judul: "Di Balik Bar",
    link: "https://drive.google.com/file/d/1N1zwGLqkbVQOzFV_fpRXJxQdawbgZGAl/view?usp=drivesdk",
    deskripsi: "Cerita-cerita dari balik meja bar, tempat di mana setiap cangkir memiliki kisahnya sendiri dan setiap penumpang membawa dunia mereka.",
    halaman: "38",
    readTime: "20 menit",
    ilustrasi: BUKU_ILUSTRASI.diBalikBar,
    tema: "Cerita",
    preview: "Kumpulan cerita pendek dari sudut pandang seorang barista. Tentang orang-orang yang datang dan pergi, tentang percakapan yang tertinggal di uap kopi."
  },
  {
    id: 3,
    judul: "Di Atas Cangkir Yang Sama",
    link: "https://drive.google.com/file/d/1cqRI8rfb7_0MIUXLekZJtV0xTFKXr-CD/view?usp=drivesdk",
    deskripsi: "Renungan tentang konsistensi, kehadiran, dan menemukan keindahan dalam pengulangan yang tampak monoton.",
    halaman: "52",
    readTime: "30 menit",
    ilustrasi: BUKU_ILUSTRASI.diAtasCangkir,
    tema: "Renungan",
    preview: "Tentang menemukan makna dalam hal-hal yang kita ulang setiap hari. Tentang cangkir yang sama, rasa yang familiar, dan ketenangan yang ditemukan dalam rutinitas."
  },
  {
    id: 4,
    judul: "Kami Menulis Pelan",
    link: "https://drive.google.com/file/d/1Mc6pOQ5z2xSn8Wmhf65kdgTrv5T5EzPm/view?usp=drivesdk",
    deskripsi: "K "Kumpulan tulisan yang lahir dari kesabaran, untuk mereka yang percaya pada proses dan kekuatan kata-kata yang diucapkan dengan lirih.",
    halaman: "41",
    readTime: "22 menit",
    ilustrasi: BUKU_ILUSTRASI.menulisPelan,
    tema: "Proses",
    preview: "Tulisan-tulisan yang tidak buru-buru. Yang mengalir seperti air, yang hadir seperti napas. Untuk mereka yang percaya bahwa yang pelan juga bisa sampai."
  }
];

const CATATAN_HARIAN = [
  "Hari ini kopi lebih pahit dari biasanya. Mungkin bukan kopinya.",
  "Ada yang bilang diam itu emas. Aku bilang diam itu napas.",
  "Menulis bukan untuk diingat. Menulis untuk tidak melupakan.",
  "Kadang kita hanya butuh seseorang yang mengangguk, bukan yang memberi solusi.",
  "Buku ini tidak akan mengubah hidupmu. Tapi mungkin menemani harimu.",
  "Di antara semua yang berisik, sunyi adalah kemewahan.",
  "Kopi dingin tetap kopi. Lelah tetap hidup.",
  // Tambahan 30 kata-kata baru
  "Malam tidak selalu gelap, kadang hanya butuh waktu untuk menemukan bintangnya.",
  "Jeda bukanlah akhir, tapi ruang untuk menghela napas sebelum lanjut.",
  "Yang paling berat bukan beban, tapi pura-pura kuat padahal ingin istirahat.",
  "Setiap orang punya jam yang berbeda, jangan bandingkan langkahmu dengan orang lain.",
  "Kadang yang kita butuhkan bukan jawaban, tapi keberanian untuk bertanya.",
  "Hidup ini terlalu singkat untuk dihabiskan dengan orang yang membuatmu lupa tersenyum.",
  "Rindu itu seperti kopi, semakin dibiarkan semakin kuat rasanya.",
  "Tidak apa-apa untuk tidak tahu arah, asal tetap berjalan.",
  "Yang paling indah seringkali datang setelah kita berani melepaskan.",
  "Kita tidak kehilangan waktu, kita hanya menukarnya dengan pengalaman.",
  "Setiap luka adalah tanda bahwa kita pernah berani mencintai.",
  "Kadang diam bukan karena tidak punya kata, tapi karena sudah terlalu banyak yang ingin dikatakan.",
  "Kebahagiaan tidak selalu tentang tawa yang keras, tapi tenang yang dalam.",
  "Yang terbaik belum tentu yang paling cepat, tapi yang paling tepat waktunya.",
  "Kita tidak bisa mengendalikan ombak, tapi bisa belajar berselancar.",
  "Setiap hari adalah halaman baru, meski terkadang tintanya habis.",
  "Tidak ada yang salah dengan merasa lelah, yang salah adalah memaksakan diri terus-menerus.",
  "Cinta sejati adalah ketika seseorang melihat kekacauanmu dan memilih untuk tinggal.",
  "Kadang yang kita cari sebenarnya sudah ada di dalam diri kita sendiri.",
  "Waktu tidak menyembuhkan apa-apa, tapi kita belajar hidup dengan lukanya.",
  "Yang paling berharga bukan apa yang kita miliki, tapi siapa yang ada saat kita tidak punya apa-apa.",
  "Setiap pertemuan adalah pelajaran, setiap perpisahan adalah pembelajaran.",
  "Kita tidak perlu sempurna untuk dicintai, kita hanya perlu menjadi diri sendiri.",
  "Kadang yang paling sulit bukan memaafkan orang lain, tapi memaafkan diri sendiri.",
  "Hidup adalah pilihan antara nyaman dengan takut, atau berani dengan tidak pasti.",
  "Yang terpenting bukan seberapa jauh kita melangkah, tapi seberapa setia kita pada diri sendiri.",
  "Setiap senja mengingatkan kita bahwa yang indah juga bisa berakhir dengan tenang.",
  "Kita tidak kekurangan waktu, kita hanya kekurangan fokus pada yang benar-benar penting.",
  "Kadang yang kita butuhkan bukan pergi jauh, tapi duduk diam dan merasa.",
  "Yang paling kuat bukan yang tidak pernah jatuh, tapi yang bangkit setiap kali jatuh.",
  "Kehidupan adalah kumpulan momen kecil yang sering kita lewatkan karena terlalu sibuk mencari yang besar.",
  "Tidak ada yang sia-sia dalam hidup, semua adalah bagian dari cerita yang lebih besar.",
  "Kadang kita harus kehilangan arah untuk menemukan diri kita yang sebenarnya.",
  "Yang paling berarti seringkali tidak terlihat, tapi dirasakan dalam diam.",
  "Kita tidak bisa memulai bab baru jika terus membaca ulang yang lama.",
  "Setiap orang adalah guru, setiap pengalaman adalah pelajaran.",
  "Yang terakhir dan paling penting: kamu sudah cukup, persis seperti dirimu sekarang."
];

const SEKILAS_ISI = [
  {
    id: 1,
    quote: "Ada hari-hari di mana aku hanya ingin menjadi secangkir kopi di tangan seseorang —hangat, hadir, dan cukup untuk menemani diam.",
    halaman: "23"
  },
  {
    id: 2,
    quote: "Kita tidak butuh selalu kuat. Kadang, kita hanya butuh tahu bahwa ada yang mengerti —bahwa lelah kita bukan aib, bahwa diam kita bukan kelemahan.",
    halaman: "47"
  },
  {
    id: 3,
    quote: "Menulis adalah caraku untuk tetap di sini. Bukan untuk menjelaskan, tapi untuk mengingatkan diri sendiri —bahwa aku masih merasakan.",
    halaman: "78"
  }
];

const REKENING = [
  {
    bank: "BRI",
    nomor: "356701025106533",
    atasNama: "WILDAN FERDIANSYAH MUCHTAR"
  },
  {
    bank: "Mandiri",
    nomor: "1430034741809",
    atasNama: "WILDAN FERDIANSYAH M"
  },
  {
    bank: "DANA",
    nomor: "089636357091",
    atasNama: "Wildan Ferdiansyah"
  }
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [readingProgress, setReadingProgress] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [copiedBank, setCopiedBank] = useState(null);
  
  // State untuk jam real-time
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState("Memuat lokasi...");

  const catatanRef = useRef(null);

  // Effect untuk update jam setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Effect untuk mendapatkan lokasi user
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding untuk mendapatkan nama kota
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=id`
            );
            const data = await response.json();
            setUserLocation(data.city || data.locality || "Lokasi Anda");
          } catch (error) {
            setUserLocation("Lokasi Terdeteksi");
          }
        },
        (error) => {
          setUserLocation("Waktu Lokal");
        }
      );
    } else {
      setUserLocation("Waktu Lokal");
    }
  }, []);

  // Format waktu
  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (showModal) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [showModal]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (typeof document !== "undefined") {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section);
      });
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 60;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const openBookModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
    setIsModalClosing(false);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedBook(null);
      setIsModalClosing(false);
      document.body.style.overflow = "unset";
    }, 300);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Sepucuk Surat — Catatan sunyi dari seorang barista");
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };
    if (platform === 'instagram') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link telah disalin.');
      return;
    }
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async (text, bank) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBank(bank);
      setTimeout(() => setCopiedBank(null), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedBank(bank);
    }
  };

  const bgClass = isDarkMode ? "bg-[#1a1816]" : "bg-[#faf8f5]";
  const textClass = isDarkMode ? "text-[#e8e0d5]" : "text-[#2b2b2b]";
  const borderColor = isDarkMode ? "border-[#e8e0d5]/20" : "border-[#8b7355]/20";
  const inputBg = isDarkMode ? "bg-[#2a2826]/50" : "bg-[#f5f0e8]/50";

  return (
    <main className={`${bgClass} ${textClass} font-sans min-h-screen transition-colors duration-700`}>
      
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modal-exit {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.95) translateY(20px); }
        }
        @keyframes backdrop-enter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes backdrop-exit {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-breathe {
          animation: breathe 20s ease-in-out infinite;
        }
        .animate-fade-in-slow {
          animation: fade-in-up 1s ease-out 0.2s both;
        }
        .animate-fade-in-slower {
          animation: fade-in-up 1s ease-out 0.4s both;
        }
        .animate-fade-in-slowest {
          animation: fade-in-up 1s ease-out 0.6s both;
        }
        .modal-enter {
          animation: modal-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .modal-exit {
          animation: modal-exit 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .backdrop-enter {
          animation: backdrop-enter 0.3s ease-out forwards;
        }
        .backdrop-exit {
          animation: backdrop-exit 0.3s ease-out forwards;
        }
        /* Hide scrollbar untuk catatan kecil */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" 
           style={{ backgroundImage: `url(${GRAIN_TEXTURE})` }}></div>

      <div className="fixed top-0 left-0 h-[2px] bg-[#8b7355] z-[60] transition-all duration-500" 
           style={{ width: `${(Object.keys(readingProgress).length / BUKU_LIST.length) * 100}%` }}></div>

      {/* Navbar dengan jam di sebelah kanan atas */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-[#1a1816]/90' : 'bg-[#faf8f5]/90'} backdrop-blur-sm border-b ${borderColor} transition-all duration-500`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="font-serif text-lg tracking-wider opacity-80 hover:opacity-100 transition-opacity">
            Sepucuk Surat
          </button>
          
          <div className="flex items-center gap-3">
            {/* Widget Jam - Desktop & Mobile sama */}
            <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-[#e8e0d5]/70' : 'text-[#2b2b2b]/70'}`}>
              <Clock size={14} className="opacity-50" />
              <span className="font-mono tracking-wider">{formatTime(currentTime)}</span>
              <span className="opacity-50">•</span>
              <span className="text-[10px] uppercase tracking-wider hidden sm:inline">{userLocation}</span>
            </div>
            
            <button onClick={toggleDarkMode} 
                    className="p-2 rounded-full hover:bg-[#8b7355]/10 transition-colors opacity-60 hover:opacity-100">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="p-2 rounded-full hover:bg-[#8b7355]/10 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`absolute top-full left-0 right-0 ${isDarkMode ? 'bg-[#1a1816]/95' : 'bg-[#faf8f5]/95'} backdrop-blur-md border-b ${borderColor} py-6 px-6`}>
            <div className="max-w-4xl mx-auto flex flex-col gap-4 text-center">
              {['tentang', 'sekilas-isi', 'koleksi', 'catatan-kecil', 'tentang-penulis'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item)} 
                        className="py-2 text-sm tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity">
                  {item.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} className="w-full h-full object-cover opacity-40 scale-105 animate-breathe" alt="Kopi dan buku di meja kayu" loading="eager" />
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-[#1a1816]/70 via-[#1a1816]/50 to-[#1a1816]' : 'bg-gradient-to-b from-[#faf8f5]/30 via-[#faf8f5]/60 to-[#faf8f5]'}`}></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-8 animate-fade-in-slow"
             style={{ color: isDarkMode ? '#e8e0d5' : '#2b2b2b', opacity: 0.6 }}>
            Sebuah Buku Oleh
          </p>
          
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-6 animate-fade-in-slower"
              style={{ color: isDarkMode ? '#e8e0d5' : '#2b2b2b' }}>
            <span className="block opacity-90">Kelas Pekerja</span>
            <span className="block italic text-[#8b7355] text-4xl md:text-6xl mt-2">Arsip Sunyi Orang-Orang yang Tetap Bekerja</span>
          </h1>
          
          <p className="font-serif italic text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed animate-fade-in-slowest"
             style={{ color: isDarkMode ? '#e8e0d5' : '#2b2b2b', opacity: 0.6 }}>
            "Kita semua pernah lelah.<br/>Tapi kita masih di sini."
          </p>
          
          <button onClick={() => scrollToSection('tentang')} 
                  className="group flex items-center gap-2 mx-auto text-xs tracking-[0.3em] uppercase transition-all duration-500"
                  style={{ color: isDarkMode ? '#e8e0d5' : '#2b2b2b', opacity: 0.5 }}>
            <span>Mulai Membaca</span>
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      <section id="tentang" className={`py-32 px-6 transition-all duration-1000 ${visibleSections['tentang'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-[#8b7355]/30 mx-auto mb-12"></div>
          
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">Tentang</p>
          
          <h2 className="font-serif text-3xl md:text-4xl leading-snug mb-8 opacity-90">
            Ini bukan buku motivasi.<br/>
            <span className="italic text-[#8b7355] opacity-70">Ini bukan panduan hidup.</span>
          </h2>
          
          <div className="space-y-6 text-[15px] leading-[1.8] opacity-70 font-light">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px] first-letter:text-[#8b7355] first-letter:opacity-60">
              Ini adalah catatan-catatan dari seseorang yang masih belajar hadir—untuk dirinya sendiri, untuk orang-orang yang ia cintai, untuk hari-hari yang kadang terlalu berat untuk dilalui sendirian.
            </p>
            <p>
              Ditulis dalam keheningan malam, di sudut kedai kopi yang hampir tutup, di antara lagu-lagu yang terlalu jujur untuk didengar sendirian.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-[#8b7355]/10">
            <p className="font-serif italic text-[#8b7355] text-lg opacity-60">
              "Buku ini ditulis perlahan.<br/>Dibuat untuk dibaca perlahan juga."
            </p>
          </div>
        </div>
      </section>

      <section id="sekilas-isi" className={`py-32 px-6 ${isDarkMode ? 'bg-[#2a2826]/20' : 'bg-[#f5f0e8]/30'} transition-all duration-1000 ${visibleSections['sekilas-isi'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">Cuplikan</p>
            <h3 className="font-serif text-3xl md:text-4xl opacity-90">Sekilas Isi</h3>
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-[#8b7355]/20"></div>
            
            {SEKILAS_ISI.map((item) => (
              <div key={item.id} className="relative pl-8 md:pl-20 pb-16 last:pb-0">
                <div className="absolute left-[-4px] md:left-6 top-2 w-2 h-2 rounded-full bg-[#8b7355]/40"></div>
                
                <div className="space-y-4">
                  <p className="font-serif italic text-lg md:text-xl leading-relaxed opacity-80">
                    "{item.quote}"
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">
                    — Halaman {item.halaman}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="koleksi" className={`py-32 px-6 ${isDarkMode ? 'bg-[#2a2826]/30' : 'bg-[#f5f0e8]/20'} transition-all duration-1000 ${visibleSections['koleksi'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">Perpustakaan Mini</p>
            <h3 className="font-serif text-3xl md:text-4xl opacity-90">Rak Buku</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {BUKU_LIST.map((buku) => (
              <div key={buku.id} 
                   className="group cursor-pointer"
                   onClick={() => openBookModal(buku)}>
                
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-sm 
                                shadow-[0_4px_20px_-10px_rgba(0,0,0,0.15)] 
                                group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] 
                                group-hover:-translate-y-2
                                transition-all duration-500 ease-out">
                  
                  <img src={buku.ilustrasi} alt={buku.judul} loading="lazy"
                       className="w-full h-full object-cover opacity-90 
                                  group-hover:opacity-100 group-hover:scale-[1.05] 
                                  transition-all duration-700" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full 
                                  bg-white/10 backdrop-blur-sm 
                                  flex items-center justify-center
                                  animate-pulse">
                    <Eye size={18} className="text-white/80" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                    <span className="w-6 h-px bg-white/40"></span>
                    <p className="text-white/70 text-xs tracking-wider flex items-center gap-1">
                      Klik untuk membaca
                      <ArrowUpRight size={12} className="opacity-60" />
                    </p>
                  </div>
                </div>

                <div className="space-y-3 group-hover:translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase opacity-40">
                    <span>{buku.tema}</span>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    <span>{buku.halaman} halaman</span>
                  </div>
                  
                  <h4 className="font-serif text-xl md:text-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                    {buku.judul}
                  </h4>
                  
                  <p className="text-sm leading-relaxed opacity-60 line-clamp-2">
                    {buku.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && selectedBook && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${isModalClosing ? 'backdrop-exit' : 'backdrop-enter'}`}
             style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
             onClick={closeModal}>
          
          <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-[#1a1816]' : 'bg-[#faf8f5]'} rounded-lg shadow-2xl ${isModalClosing ? 'modal-exit' : 'modal-enter'}`}
               onClick={(e) => e.stopPropagation()}>
            
            <button onClick={closeModal}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors">
              <X size={18} className="text-white" />
            </button>

            <div className="relative h-64 overflow-hidden">
              <img src={selectedBook.ilustrasi} alt={selectedBook.judul} 
                   className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase opacity-40 mb-4">
                <span>{selectedBook.tema}</span>
                <span className="w-1 h-1 rounded-full bg-current"></span>
                <span>{selectedBook.halaman} halaman</span>
                <span className="w-1 h-1 rounded-full bg-current"></span>
                <span>{selectedBook.readTime}</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl mb-4 opacity-90">
                {selectedBook.judul}
              </h3>

              <p className="text-sm leading-relaxed opacity-70 mb-6">
                {selectedBook.deskripsi}
              </p>

              <div className={`p-4 rounded-lg mb-8 ${isDarkMode ? 'bg-[#2a2826]/50' : 'bg-[#f5f0e8]/50'}`}>
                <p className="font-serif italic text-sm opacity-60">
                  "{selectedBook.preview}"
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={closeModal}
                        className="flex-1 py-3 px-4 border border-current opacity-40 hover:opacity-80 transition-opacity text-xs tracking-[0.2em] uppercase">
                  Tutup
                </button>
                <a href={selectedBook.link} target="_blank" rel="noopener noreferrer"
                   className="flex-1 py-3 px-4 bg-[#2b2b2b] text-white hover:bg-[#1a1a1a] transition-colors text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                  <Download size={14} />
                  Unduh & Baca
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-16">
  <a 
    href="/rak"
    className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-all"
  >
    <Library size={16} />
    <span>Buka Rak Lengkap</span>
    <ArrowUpRight size={14} />
  </a>
</div>

      <section id="catatan-kecil" className={`py-32 px-6 transition-all duration-1000 ${visibleSections['catatan-kecil'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-px bg-[#8b7355]/30 mx-auto mb-12"></div>
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">Geser untuk melihat lebih</p>
            <h3 className="font-serif text-3xl md:text-4xl opacity-90">Catatan Kecil</h3>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div 
            ref={catatanRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {CATATAN_HARIAN.map((catatan, idx) => (
              <div 
                key={idx}
                className={`flex-shrink-0 w-[85vw] md:w-[400px] p-8 rounded-2xl snap-center
                  ${isDarkMode ? 'bg-[#2a2826]/40' : 'bg-white/60'}
                  backdrop-blur-lg
                  shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]
                  hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]
                  transition-all duration-500 hover:scale-[1.02]
                  cursor-grab active:cursor-grabbing`}
              >
                <div className="flex items-center gap-2 mb-6 opacity-40">
                  <span className="text-[10px] tracking-[0.3em] uppercase">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="flex-1 h-px bg-current opacity-20"></span>
                </div>
                
                <p className="font-serif italic text-lg md:text-xl leading-relaxed opacity-80 min-h-[120px] flex items-center">
                  "{catatan}"
                </p>
                
                <div className="mt-6 pt-4 border-t border-[#8b7355]/10 flex justify-between items-center">
                  <span className={`text-[10px] uppercase tracking-wider opacity-40`}>
                    {formatTime(currentTime).split(':').slice(0,2).join(':')}
                  </span>
                  <span className="text-[#8b7355] opacity-60">
                    <Sparkles size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-8">
            {CATATAN_HARIAN.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-[#8b7355] w-6' : 'bg-[#8b7355]/30'}`}
              />
            ))}
          </div>
          
          <p className="text-center text-xs opacity-40 mt-6 tracking-wider">
            ← Geser ke kiri atau kanan →
          </p>
        </div>
      </section>

      <section id="tentang-penulis" className={`py-32 px-6 ${isDarkMode ? 'bg-[#2a2826]/20' : 'bg-[#f5f0e8]/30'} transition-all duration-1000 ${visibleSections['tentang-penulis'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">Tentang Penulis</p>
            <h3 className="font-serif text-3xl md:text-4xl opacity-90">Wildan Ferdiansyah</h3>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* FOTO PENULIS - 2/5 width */}
            <div className="md:col-span-2">

              <div className="flex flex-col items-center relative group">

                {/* Soft Glow Background */}
                <div className="absolute w-72 h-72 bg-[#8b7355]/20 blur-3xl rounded-full opacity-60 group-hover:opacity-80 transition duration-700"></div>

                {/* Foto Bulat */}
                <div className="relative w-56 h-56 rounded-full overflow-hidden 
                                shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]
                                group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]
                                transition-all duration-700">

                  <img 
                    src={FOTO_PENULIS} 
                    alt="Wildan Ferdiansyah"
                    className="w-full h-full object-cover 
                               scale-[1.02] 
                               group-hover:scale-[1.06] 
                               transition-transform duration-[2000ms] ease-out"
                  />

                  <div className="absolute inset-0 rounded-full border border-white/20"></div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-6">

                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/6289636357091"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-[#8b7355]/20 
                               hover:bg-[#8b7355]/10 
                               transition-all duration-300 ease-out
                               opacity-60 hover:opacity-100 hover:scale-110"
                  >
                    <Phone size={18} />
                  </a>

                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/_iamwildan_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-[#8b7355]/20 
                               hover:bg-[#8b7355]/10 
                               transition-all duration-300 ease-out
                               opacity-60 hover:opacity-100 hover:scale-110"
                  >
                    <Instagram size={18} />
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:wildanferdiansyah06@gmail.com"
                    className="p-3 rounded-full border border-[#8b7355]/20 
                               hover:bg-[#8b7355]/10 
                               transition-all duration-300 ease-out
                               opacity-60 hover:opacity-100 hover:scale-110"
                  >
                    <Mail size={18} />
                  </a>

                </div>

              </div>

            </div>
            {/* KONTEN PENULIS - 3/5 width */}
            <div className="md:col-span-3 space-y-8">
              <div className="space-y-6 text-[15px] leading-[1.8] opacity-70 font-light">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px] first-letter:text-[#8b7355] first-letter:opacity-60">
                  Bukan penulis profesional. Bukan motivator. Hanya seseorang yang mencoba memahami hidupnya melalui kata-kata.
                </p>
                <p>
                  Pernah menjadi barista. Pernah menjadi mural artist. Sekarang menulis di sela-sela waktu—bukan untuk menjadi terkenal, tapi untuk tetap waras.
                </p>
              </div>

              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-[#1a1816]/50' : 'bg-white/50'} border ${borderColor}`}>
                <p className="font-serif italic text-lg text-[#8b7355] opacity-80">
                  "Aku menulis untuk hadir, bukan untuk memukau."
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#2a2826]/50' : 'bg-[#f5f0e8]/50'} text-center`}>
                  <Coffee size={24} className="mx-auto mb-2 opacity-40" />
                  <p className="text-[10px] uppercase tracking-wider opacity-40 mb-1">Dulu</p>
                  <p className="text-sm font-medium">Barista</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#2a2826]/50' : 'bg-[#f5f0e8]/50'} text-center`}>
                  <Feather size={24} className="mx-auto mb-2 opacity-40" />
                  <p className="text-[10px] uppercase tracking-wider opacity-40 mb-1">Juga</p>
                  <p className="text-sm font-medium">Mural Artist</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#2a2826]/50' : 'bg-[#f5f0e8]/50'} text-center`}>
                  <BookOpen size={24} className="mx-auto mb-2 opacity-40" />
                  <p className="text-[10px] uppercase tracking-wider opacity-40 mb-1">Sekarang</p>
                  <p className="text-sm font-medium">Penulis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-32 px-6 ${isDarkMode ? 'bg-[#2a2826]/30' : 'bg-[#f5f0e8]/20'} transition-all duration-1000 ${visibleSections['tentang-penulis'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-[#8b7355]/30 mx-auto mb-12"></div>
          
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">Dukungan</p>
          
          <h3 className="font-serif text-2xl md:text-3xl mb-6 opacity-90">
            Traktir Secangkir Kopi
          </h3>
          
          <p className="text-sm leading-relaxed opacity-60 mb-12 max-w-md mx-auto">
            Jika kamu merasa terbantu dengan buku-buku ini, kamu bisa memberikan dukungan melalui:
          </p>

          <div className="space-y-4 mb-12">
            {REKENING.map((rek) => (
              <div key={rek.bank} 
                   className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-[#1a1816]/50' : 'bg-white/50'} border ${borderColor}`}>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider opacity-40 mb-1">{rek.bank}</p>
                  <p className="font-mono text-sm">{rek.nomor}</p>
                  <p className="text-xs opacity-60">{rek.atasNama}</p>
                </div>
                <button onClick={() => copyToClipboard(rek.nomor, rek.bank)}
                        className="p-2 rounded-full hover:bg-[#8b7355]/10 transition-colors">
                  {copiedBank === rek.bank ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="opacity-60" />}
                </button>
              </div>
            ))}
          </div>

          {/* Share Section */}
          <div className="mt-16 text-center">

            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">
              Bagikan Halaman Ini
            </p>

            <div className="flex justify-center gap-4">

              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="p-3 rounded-full border border-[#8b7355]/20 
                           hover:bg-[#8b7355]/10 
                           transition-all duration-300 ease-out
                           opacity-60 hover:opacity-100 hover:scale-110"
              >
                <MessageCircle size={20} />
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="p-3 rounded-full border border-[#8b7355]/20 
                           hover:bg-[#8b7355]/10 
                           transition-all duration-300 ease-out
                           opacity-60 hover:opacity-100 hover:scale-110"
              >
                <Facebook size={20} />
              </button>

              {/* Twitter / X */}
              <button
                onClick={() => handleShare('twitter')}
                className="p-3 rounded-full border border-[#8b7355]/20 
                           hover:bg-[#8b7355]/10 
                           transition-all duration-300 ease-out
                           opacity-60 hover:opacity-100 hover:scale-110"
              >
                <Twitter size={20} />
              </button>

              {/* Instagram (copy link) */}
              <button
                onClick={() => handleShare('instagram')}
                className="p-3 rounded-full border border-[#8b7355]/20 
                           hover:bg-[#8b7355]/10 
                           transition-all duration-300 ease-out
                           opacity-60 hover:opacity-100 hover:scale-110"
              >
                <Instagram size={20} />
              </button>

            </div>

          </div>
        </div>
      </section>

      <footer className={`py-12 px-6 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-lg tracking-wider opacity-80 mb-4">Sepucuk Surat</p>
          <p className="text-xs opacity-40 mb-8">
            Dari hati ke hati. Dari malam ke malam.
          </p>
          
          <div className="flex justify-center gap-6 text-xs opacity-40">
            <span>© 2026 Wildan Ferdiansyah</span>
            <span>•</span>
            <span>Dibuat dengan lelah dan kopi</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
