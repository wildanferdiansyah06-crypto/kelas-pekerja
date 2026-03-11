"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

const ScrollReveal = ({ children, delay = 0 }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

interface PhilosophyCardProps {
  number: string;
  title: string;
  content: string;
}

const PhilosophyCard = ({ number, title, content }: PhilosophyCardProps) => (
  <div className="group relative p-8 md:p-10 rounded-sm border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700 transition-all duration-700">
    <span className="absolute top-6 right-6 text-6xl font-serif text-neutral-800/50 group-hover:text-neutral-700/50 transition-colors duration-500">
      {number}
    </span>
    <div className="relative z-10">
      <h3 className="text-sm tracking-[0.2em] uppercase text-neutral-500 mb-4 group-hover:text-neutral-400 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-300 leading-[1.8] text-lg font-light">
        {content}
      </p>
    </div>
  </div>
);

interface StorySectionProps {
  title: string;
  paragraphs: string[];
  highlight?: string;
}

const StorySection = ({ title, paragraphs, highlight }: StorySectionProps) => (
  <ScrollReveal>
    <div className="mb-20 md:mb-32">
      <h2 className="text-2xl md:text-3xl font-serif mb-8 text-neutral-200">
        {title}
      </h2>
      <div className="space-y-6">
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="text-lg md:text-xl text-neutral-400 leading-[1.9] font-light"
          >
            {para}
          </p>
        ))}
        {highlight && (
          <blockquote className="mt-8 pl-6 border-l-2 border-neutral-700">
            <p className="text-xl md:text-2xl font-serif italic text-neutral-300 leading-relaxed">
              {highlight}
            </p>
          </blockquote>
        )}
      </div>
    </div>
  </ScrollReveal>
);

export default function TentangPage(): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-[#e8e8e8] selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-800/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-900/20 rounded-full blur-[128px]" />
      </div>

      {/* Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation Hint */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <span className="text-xs tracking-[0.3em] uppercase text-neutral-400">
          Kelas Pekerja
        </span>
        <span className="text-xs tracking-[0.2em] text-neutral-500">
          Tentang
        </span>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <ScrollReveal>
            <div className="space-y-6">
              <span className="inline-block text-xs tracking-[0.4em] uppercase text-neutral-600 mb-4">
                Sebuah Ruang untuk yang Terlupakan
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-[0.9] text-white">
                Tentang
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
              Kelas Pekerja adalah ruang sunyi untuk mencatat kehidupan yang berjalan pelan, 
              yang seringkali terlewatkan oleh dunia yang terburu-buru.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex justify-center">
              <div className="w-px h-32 bg-gradient-to-b from-neutral-600 to-transparent" />
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-600">
            Gulir
          </span>
          <div className="w-px h-8 bg-neutral-700 animate-pulse" />
        </div>
      </section>

      {/* Main Content */}
      <article className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">

          {/* Opening */}
          <StorySection
            title="Asal Muasal"
            paragraphs={[
              "Tempat ini lahir dari kegelisahan sederhana yang menggerogoti di malam-malam sunyi. Kegelisahan bahwa begitu banyak orang bekerja setiap hari, menjalani hidupnya dengan tenang, menghadapi lelahnya sendiri, menangis dalam sepi, tertawa dalam kecil, tetapi kisah mereka hampir tidak pernah dituliskan. Mereka hidup, lalu lenyap, seolah tidak pernah ada.",
              
              "Kita hidup di era di mana kehebatan dipuja-puja. Orang-orang hanya ingin mendengar kisah sukses, prestasi gemilang, perjalanan mendaki puncak. Padahal kehidupan tidak hanya terjadi di panggung besar. Ia juga terjadi di balik meja kerja yang usang, di balik bar kopi yang bising, di perjalanan pulang yang panjang dan sepi, atau di malam-malam ketika seseorang menulis sesuatu hanya untuk memahami hidupnya sendiri.",
              
              "Kelas Pekerja lahir dari keyakinan bahwa setiap kehidupan—seberapa biasa pun—mengandung keindahan yang patut disimpan. Bahwa kerja keras tanpa panggung, pengorbanan tanpa penghargaan, dan hari-hari monoton yang berulang juga adalah bagian dari kemanusiaan kita."
            ]}
            highlight="Karena terkadang, yang paling sederhana justru yang paling dekat dengan kebenaran hidup."
          />

          {/* The Void Section */}
          <ScrollReveal>
            <div className="my-24 md:my-32 py-16 px-8 md:px-12 border-y border-neutral-800/50 bg-neutral-900/10">
              <div className="max-w-2xl mx-auto text-center space-y-8">
                <p className="text-2xl md:text-3xl font-serif leading-relaxed text-neutral-300">
                  Ada kekosongan di antara keramaian.
                </p>
                <p className="text-lg text-neutral-500 leading-relaxed">
                  Kekosongan yang dirasakan oleh mereka yang bangun pagi, bekerja seharian, 
                  pulang malam, dan bertanya dalam hati: 
                  <em className="text-neutral-400 block mt-2">"Apakah ini saja?"</em>
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  Kelas Pekerja adalah jawaban bisu untuk pertanyaan itu. 
                  Bukan dengan grand solution, tapi dengan pengakuan sederhana: 
                  bahwa perasaan itu valid. Bahwa kamu tidak sendirian dalam kesendirianmu.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* What We Keep */}
          <StorySection
            title="Apa yang Kami Simpan"
            paragraphs={[
              "Kelas Pekerja mencoba menyimpan catatan-catatan kecil yang biasanya tercecer. Tentang kerja yang melelahkan tanpa pamrih. Tentang hari yang terasa biasa-biasa saja namun sebenarnya penuh dengan pertempuran diam-diam. Tentang kopi yang diseduh perlahan sambil menunggu hidup menemukan bentuknya. Tentang kegagalan yang tak pernah diceritakan, dan kebangkitan yang tak pernah diperhitungkan.",
              
              "Kami menyimpan cerita tentang orang tua yang bekerja keras demi anak-anaknya yang mungkin tidak pernah mengucap terima kasih. Tentang pemuda yang merantau jauh, menghabiskan malam Minggu sendirian di kamar kos, mempertanyakan pilihannya. Tentang perempuan yang menyeimbangkan ambisi dan ekspektasi, yang lelah tapi tak boleh menyerah.",
              
              "Kami percaya bahwa dalam setiap kelelahan ada keberanian. Dalam setiap rutinitas ada ketabahan. Dalam setiap keheningan ada cerita yang menanti untuk didengar."
            ]}
          />

          {/* The Standard */}
          <ScrollReveal>
            <div className="my-20 p-8 md:p-12 rounded-lg border border-neutral-800 bg-gradient-to-br from-neutral-900/50 to-transparent">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4">
                  <span className="text-xs tracking-[0.3em] uppercase text-neutral-600 block mb-2">
                    Standar Kami
                  </span>
                  <div className="w-12 h-px bg-neutral-700" />
                </div>
                <div className="md:w-3/4 space-y-4">
                  <p className="text-xl md:text-2xl font-serif text-neutral-200 leading-relaxed">
                    Tulisan di sini tidak harus sempurna. Tidak harus penting bagi dunia. Cukup jujur.
                  </p>
                  <p className="text-neutral-500 leading-relaxed">
                    Kami tidak mencari kata-kata indah yang dipoles. Kami mencari suara yang authentic, 
                    bahkan jika terbata-bata. Kami mencari keberanian untuk mengatakan, 
                    <em>"Saya lelah,"</em> atau <em>"Saya takut,"</em> atau <em>"Saya tidak tahu arah hidup saya."</em>
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* The Promise */}
          <ScrollReveal>
            <div className="text-center py-16 md:py-24">
              <p className="text-lg md:text-xl text-neutral-400 leading-[1.9] max-w-2xl mx-auto mb-12">
                Jika suatu hari seseorang membaca tulisan di sini dan merasa sesuatu yang mereka pikir hanya mereka rasakan ternyata juga dirasakan orang lain—jika mereka berkata dalam hati,
              </p>
              
              <blockquote className="relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-neutral-800 font-serif">
                  "
                </span>
                <p className="text-3xl md:text-4xl font-serif italic text-white leading-tight mb-8">
                  ternyata hidupku tidak sendirian
                </p>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-6xl text-neutral-800 font-serif rotate-180">
                  "
                </span>
              </blockquote>
              
              <p className="mt-12 text-neutral-500">
                —maka tempat kecil ini sudah menjalankan tugasnya.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </article>

      {/* Philosophy Section */}
      <section className="relative border-t border-neutral-900 bg-[#080808] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-24">
              <span className="text-xs tracking-[0.4em] uppercase text-neutral-600 mb-4 block">
                Fundamental
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                Filosofi
              </h2>
              <div className="w-24 h-px bg-neutral-800 mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <ScrollReveal delay={0}>
              <PhilosophyCard
                number="01"
                title="Kehidupan Sederhana"
                content="Kami percaya bahwa kehidupan yang sederhana, yang jauh dari sorotan, yang terdiri dari rutinitas dan tanggung jawab kecil, juga layak untuk dicatat dan dihargai."
              />
            </ScrollReveal>
            
            <ScrollReveal delay={150}>
              <PhilosophyCard
                number="02"
                title="Hak Menulis"
                content="Menulis bukan hanya milik penulis besar atau orang-orang dengan waktu luang. Menulis adalah hak setiap manusia yang mencoba memahami hidupnya sendiri."
              />
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <PhilosophyCard
                number="03"
                title="Jejak Kehidupan"
                content="Setiap kata yang ditulis adalah jejak bahwa kita pernah ada, pernah merasakan, pernah berjuang. Dan jejak itu berharga, sekecil apa pun."
              />
            </ScrollReveal>
          </div>

          {/* Extended Philosophy */}
          <ScrollReveal>
            <div className="mt-20 md:mt-32 max-w-3xl mx-auto space-y-8">
              <p className="text-xl text-neutral-400 leading-[1.9] text-center font-light">
                Dalam dunia yang terobsesi dengan kemajuan dan pencapaian, 
                kami memilih untuk melambat. Untuk melihat. Untuk mencatat. 
                Untuk mengatakan bahwa hidup yang tidak Instagram-able juga bermakna.
              </p>
              
              <p className="text-lg text-neutral-500 leading-relaxed text-center">
                Kami percaya pada kekuatan narasi untuk menyembuhkan, 
                untuk menghubungkan, untuk mengingatkan kita pada kemanusiaan kita bersama. 
                Bahwa di balik setiap wajah yang lelah di kereta pagi, 
                ada cerita yang kompleks, mimpi yang tertunda, dan harapan yang terus menyala pelan.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Closing Section */}
      <section className="relative py-32 md:py-48 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/20 to-transparent" />
        
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-neutral-600 mb-8">
              Penutup
            </p>
            <p className="text-2xl md:text-3xl font-serif text-neutral-300 leading-relaxed mb-8">
              Terima kasih telah singgah di ruang kecil ini. 
              Semoga kamu menemukan sesuatu yang kamu butuhkan—
              entah pemahaman, pengakuan, atau sekadar kesadaran 
              bahwa perjalananmu juga berharga.
            </p>
            <div className="w-16 h-px bg-neutral-700 mx-auto" />
            <p className="mt-8 text-neutral-500 font-light">
              Dari kami yang juga sedang belajar menjalani,<br />
              <span className="text-neutral-400 font-serif italic">Kelas Pekerja</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-700">
            Kelas Pekerja © {new Date().getFullYear()}
          </span>
          <div className="flex gap-8">
            <span className="text-xs tracking-wider text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer">
              Arsip
            </span>
            <span className="text-xs tracking-wider text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer">
              Kirim Tulisan
            </span>
            <span className="text-xs tracking-wider text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer">
              Kontak
            </span>
          </div>
        </div>
      </footer>

    </main>
  );
}
