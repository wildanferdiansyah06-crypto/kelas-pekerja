"use client";

import postsData from "@/public/data/posts.json";
import { motion } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link"; // TAMBAH INI
import { PenLine } from "lucide-react"; // TAMBAH INI

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function TulisanPage() {
  const posts = postsData.posts || [];
  const { theme } = useTheme();
  
  const isDark = theme === "dark";
  
  const colors = {
    bg: isDark ? "bg-[#0a0a0a]" : "bg-[#fafafa]",
    text: isDark ? "text-neutral-300" : "text-neutral-700",
    textMuted: isDark ? "opacity-60" : "opacity-70",
    textSubtle: isDark ? "opacity-40" : "opacity-50",
    heading: isDark ? "text-white" : "text-neutral-900",
    accent: "#c7b299",
    accentSecondary: "#8b7355",
    border: isDark ? "border-neutral-800" : "border-neutral-200",
    borderHover: isDark ? "group-hover:border-[#8b7355]" : "group-hover:border-[#c7b299]",
    number: isDark ? "text-neutral-800" : "text-neutral-200",
    selectionBg: isDark ? "selection:bg-[#c7b299]" : "selection:bg-[#8b7355]",
    selectionText: isDark ? "selection:text-[#0a0a0a]" : "selection:text-white",
    grainOpacity: isDark ? "opacity-[0.03]" : "opacity-[0.02]",
    footerBorder: isDark ? "border-neutral-900" : "border-neutral-200",
    footerText: isDark ? "text-neutral-500" : "text-neutral-400",
  };

  return (
    <main className={`min-h-screen ${colors.bg} ${colors.text} ${colors.selectionBg} ${colors.selectionText} transition-colors duration-500`}>

      <div
        className={`fixed inset-0 ${colors.grainOpacity} pointer-events-none z-0 transition-opacity duration-500`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">

          <motion.header
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-32 text-center"
          >
            <div className={`flex items-center justify-center gap-4 mb-8 ${colors.textSubtle}`}>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c7b299] to-transparent"></div>
              <span className="text-[10px] tracking-[0.5em] uppercase font-light">
                Arsip Pikiran
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c7b299] to-transparent"></div>
            </div>

            <h1 className={`font-serif text-5xl md:text-7xl mb-8 ${colors.heading} tracking-tight transition-colors duration-500`}>
              <span className="block text-[#c7b299] text-2xl md:text-3xl mb-4 italic font-light opacity-80">
                ruang bagi
              </span>
              Tulisan
            </h1>

            <p className={`text-lg md:text-xl ${colors.textMuted} leading-[2] max-w-2xl mx-auto font-light transition-opacity duration-500`}>
              Di antara deru waktu yang tak pernah berhenti, ada saat-saat ketika
              kata-kata menjadi satu-satunya tempat perlindungan.
            </p>

            {/* ⭐ TAMBAHAN: CTA TULIS CERITA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12"
            >
              <Link
                href="/tulis"
                className="inline-flex items-center gap-3 px-8 py-4 
                  border border-[#8b7355]/40 rounded-full
                  text-[#8b7355] hover:text-[#c7b299] hover:border-[#c7b299]
                  transition-all duration-300 text-sm tracking-wider"
              >
                <PenLine size={18} />
                Tulis Ceritamu
              </Link>
            </motion.div>
            {/* END TAMBAHAN */}

          </motion.header>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-32 relative"
          >
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8b7355] to-transparent opacity-30"></div>

            <div className={`pl-8 space-y-8 text-lg leading-[2.2] ${colors.textMuted} transition-opacity duration-500`}>
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-[-8px] first-letter:text-[#c7b299]">
                Kita hidup di era yang terobsesi pada kecepatan. Segala sesuatu
                harus instan, terukur, menghasilkan.
              </p>

              <p>
                Setiap tulisan di sini adalah{" "}
                <span className="text-[#c7b299]">jejak</span>—bukan petunjuk arah,
                melainkan bekas tapak kaki di pasir yang segera terhapus ombak.
              </p>

              <blockquote className="border-l-2 border-[#8b7355] pl-8 py-4 my-12 italic font-serif text-2xl text-[#c7b299]">
                Menulis adalah cara kita memberi makna pada kekosongan.
              </blockquote>
            </div>
          </motion.section>

          <div className={`flex items-center justify-center gap-6 mb-24 ${colors.textSubtle}`}>
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#c7b299]"></div>
            <div className="w-2 h-2 rotate-45 border border-[#c7b299]"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c7b299]"></div>
          </div>

          <section className="mb-32">

            <div className={`flex items-baseline justify-between mb-16 border-b ${colors.border} pb-4 transition-colors duration-500`}>
              <h2 className={`font-serif text-2xl ${colors.heading} italic transition-colors duration-500`}>
                Catatan-catatan
              </h2>
              <span className={`text-xs tracking-widest uppercase ${colors.textSubtle}`}>
                {posts.length > 0 ? `${posts.length} tulisan` : "Kosong"}
              </span>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-20"
            >
              {posts.length === 0 ? (
                <motion.div
                  variants={fadeUp}
                  className={`text-center py-24 ${colors.textSubtle}`}
                >
                  <p className="font-serif text-xl italic mb-4">
                    Keheningan yang menunggu
                  </p>
                  <p className="text-sm mb-8">Belum ada kata yang berani keluar.</p>
                  
                  {/* ⭐ TAMBAHAN: CTA KALAU KOSONG */}
                  <Link
                    href="/tulis"
                    className="inline-flex items-center gap-2 text-[#8b7355] hover:text-[#c7b299] transition-colors text-sm"
                  >
                    <PenLine size={16} />
                    Jadi yang pertama menulis
                  </Link>
                </motion.div>
              ) : (
                posts.map((post: any, index: number) => (
                  <motion.article
                    key={post.slug}
                    variants={fadeUp}
                    className="group relative"
                  >
                    <span className={`absolute -left-12 top-0 text-6xl font-serif ${colors.number} hidden md:block transition-colors duration-500`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className={`border-l ${colors.border} pl-8 md:pl-12 pb-16 ${colors.borderHover} transition-colors duration-500`}>

                      <div className={`flex items-center gap-3 mb-4 text-xs tracking-widest uppercase ${colors.textSubtle}`}>
                        <span className="w-8 h-px bg-current"></span>
                        <span>{post.date || "Waktu tak tercatat"}</span>
                      </div>

                      <h3 className={`font-serif text-2xl md:text-3xl mb-4 ${colors.heading} group-hover:text-[#c7b299] transition-colors duration-500`}>
                        {post.title}
                      </h3>

                      <p className={`text-base md:text-lg ${colors.textMuted} leading-[1.9] mb-6 group-hover:opacity-80 transition-opacity duration-500`}>
                        {post.excerpt}
                      </p>

                      {/* ⭐ TAMBAHAN: LINK KE DETAIL (opsional) */}
                      {post.slug && (
                        <Link
                          href={`/tulisan/${post.slug}`}
                          className="inline-flex items-center gap-2 text-xs text-[#8b7355] hover:text-[#c7b299] transition-colors"
                        >
                          Baca selengkapnya
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                      )}

                    </div>
                  </motion.article>
                ))
              )}
            </motion.div>
          </section>

          <motion.footer
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className={`pt-16 border-t ${colors.footerBorder} text-center transition-colors duration-500`}
          >
            <p className={`font-serif italic ${colors.footerText} text-lg mb-8 transition-colors duration-500`}>
              Ditulis perlahan, seperti menyeduh kopi.
            </p>

            {/* ⭐ TAMBAHAN: CTA FOOTER */}
            <Link
              href="/tulis"
              className="inline-flex items-center gap-3 px-8 py-4 
                bg-[#8b7355] text-[#0a0a0a] dark:text-[#fafafa] rounded-full
                hover:bg-[#c7b299] transition-all duration-300 
                text-sm tracking-wider font-medium"
            >
              <PenLine size={18} />
              Tulis Ceritamu
            </Link>
            {/* END TAMBAHAN */}

          </motion.footer>

        </div>
      </div>
    </main>
  );
}
