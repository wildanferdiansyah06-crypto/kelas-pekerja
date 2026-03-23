"use client";

import postsData from "@/public/data/posts.json";
import { motion } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  PenLine, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Heart,
  Share2,
  Quote
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function TulisanDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "bg-[#0a0a0a]" : "bg-[#fafafa]",
    text: isDark ? "text-neutral-300" : "text-neutral-700",
    textMuted: isDark ? "opacity-70" : "opacity-80",
    textSubtle: isDark ? "opacity-50" : "opacity-60",
    heading: isDark ? "text-white" : "text-neutral-900",
    accent: "#c7b299",
    accentSecondary: "#8b7355",
    border: isDark ? "border-neutral-800" : "border-neutral-200",
    cardBg: isDark ? "bg-neutral-900/50" : "bg-white",
    quoteBg: isDark ? "bg-[#8b7355]/10" : "bg-[#8b7355]/5",
    grainOpacity: isDark ? "opacity-[0.03]" : "opacity-[0.02]",
  };

  // Find current post
  const post = postsData.posts.find((p: any) => p.slug === slug);
  
  // Find related posts
  const relatedPosts = post?.related 
    ? postsData.posts.filter((p: any) => post.related.includes(p.slug)).slice(0, 3)
    : [];

  // Find random posts if no related
  const randomPosts = postsData.posts
    .filter((p: any) => p.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const postsToShow = relatedPosts.length > 0 ? relatedPosts : randomPosts;

  if (!post) {
    return (
      <main className={`min-h-screen ${colors.bg} ${colors.text} flex items-center justify-center`}>
        <div className="text-center">
          <p className="font-serif text-2xl italic mb-4">Tulisan tidak ditemukan</p>
          <Link href="/tulisan" className="text-[#8b7355] hover:text-[#c7b299]">
            Kembali ke arsip
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-500`}>
      {/* Grain */}
      <div
        className={`fixed inset-0 ${colors.grainOpacity} pointer-events-none z-0`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Navigation Back */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 
            bg-[#0a0a0a]/80 dark:bg-[#fafafa]/80 backdrop-blur-md border-b border-neutral-800/20"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link 
              href="/tulisan" 
              className="inline-flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#c7b299] transition-colors"
            >
              <ArrowLeft size={16} />
              Kembali ke Arsip
            </Link>
            <span className={`text-xs ${colors.textSubtle} tracking-wider`}>
              Arsip Pikiran
            </span>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <header className="pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {/* Kategori & Meta */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-8">
                <span className="px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase 
                  bg-[#8b7355]/20 text-[#8b7355] rounded-full font-medium">
                  {post.category}
                </span>
                <span className={`flex items-center gap-2 text-xs ${colors.textSubtle}`}>
                  <Clock size={14} />
                  {post.readTime}
                </span>
                <span className={`text-xs ${colors.textSubtle}`}>
                  {post.date}
                </span>
              </motion.div>

              {/* EMOTIONAL HOOK */}
              <motion.p 
                variants={fadeUp}
                className="text-lg md:text-xl italic text-[#c7b299] mb-6 leading-relaxed 
                  border-l-3 border-[#8b7355] pl-6"
              >
                {post.hook}
              </motion.p>

              {/* Judul */}
              <motion.h1 
                variants={fadeUp}
                className={`font-serif text-4xl md:text-5xl lg:text-6xl ${colors.heading} 
                  leading-[1.1] mb-8 tracking-tight`}
              >
                {post.title}
              </motion.h1>

              {/* Role */}
              <motion.div variants={fadeUp} className={`text-sm ${colors.textSubtle} tracking-wider`}>
                Ditulis oleh: <span className="text-[#8b7355]">{post.role}</span> • Anonim
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <article className="px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {post.content.map((block: any, index: number) => {
                if (block.type === "paragraph") {
                  return (
                    <motion.p
                      key={index}
                      variants={fadeUp}
                      className={`text-lg md:text-xl ${colors.textMuted} leading-[2] 
                        first-letter:text-5xl first-letter:font-serif first-letter:float-left 
                        first-letter:mr-4 first-letter:mt-[-4px] first-letter:text-[#c7b299]
                        ${index === 0 ? '' : ''}`}
                    >
                      {block.text}
                    </motion.p>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <motion.blockquote
                      key={index}
                      variants={fadeUp}
                      className={`relative my-12 py-8 px-8 ${colors.quoteBg} rounded-xl
                        border-l-4 border-[#8b7355]`}
                    >
                      <Quote size={24} className="text-[#8b7355]/30 mb-4" />
                      <p className="font-serif text-2xl md:text-3xl italic text-[#c7b299] leading-relaxed">
                        "{block.text}"
                      </p>
                    </motion.blockquote>
                  );
                }

                return null;
              })}
            </motion.div>

            {/* Impact Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`mt-16 p-8 rounded-2xl border ${colors.border} ${colors.cardBg}`}
            >
              <div className="flex items-start gap-4">
                <Heart size={20} className="text-[#8b7355] mt-1 flex-shrink-0" />
                <div>
                  <h4 className={`text-sm font-medium tracking-wider uppercase mb-2 ${colors.textSubtle}`}>
                    Kenapa cerita ini penting
                  </h4>
                  <p className={`text-lg ${colors.textMuted} leading-relaxed italic`}>
                    {post.impact}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Share/Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-center gap-6"
            >
              <button className={`p-3 rounded-full border ${colors.border} 
                hover:border-[#8b7355] hover:text-[#c7b299] transition-all`}>
                <Share2 size={20} />
              </button>
              <span className={`text-xs ${colors.textSubtle} tracking-wider`}>
                Bagikan cerita ini
              </span>
            </motion.div>
          </div>
        </article>

        {/* RELATED POSTS - THE LOOP */}
        {postsToShow.length > 0 && (
          <section className={`px-6 py-24 border-t ${colors.border}`}>
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8b7355]">
                  Lanjutkan Membaca
                </span>
                <h2 className={`font-serif text-3xl md:text-4xl mt-4 ${colors.heading}`}>
                  Cerita yang Berhubungan
                </h2>
                <p className={`mt-4 ${colors.textMuted} max-w-xl mx-auto`}>
                  Setiap pengalaman kerja saling terhubung. Mungkin kamu ngerasain hal serupa?
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {postsToShow.map((relatedPost: any, index: number) => (
                  <motion.div
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={`/tulisan/${relatedPost.slug}`}
                      className={`block h-full p-6 rounded-xl border ${colors.border} 
                        hover:border-[#8b7355] hover:shadow-lg hover:shadow-[#8b7355]/5
                        transition-all duration-300 group`}
                    >
                      <span className="text-[10px] tracking-widest uppercase text-[#8b7355]">
                        {relatedPost.category}
                      </span>
                      <h3 className={`font-serif text-xl mt-3 mb-4 ${colors.heading} 
                        group-hover:text-[#c7b299] transition-colors line-clamp-2`}>
                        {relatedPost.title}
                      </h3>
                      <p className={`text-sm ${colors.textMuted} line-clamp-2 mb-4`}>
                        {relatedPost.hook}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-[#8b7355] 
                        group-hover:text-[#c7b299]">
                        Baca cerita
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA FINAL - Convert to Writer */}
        <section className={`px-6 py-24 ${isDark ? 'bg-[#8b7355]/5' : 'bg-[#8b7355]/10'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-3xl md:text-4xl italic text-[#c7b299] mb-6">
                "Punya pengalaman kayak gini juga?"
              </p>
              <p className={`text-lg ${colors.textMuted} mb-10 max-w-xl mx-auto`}>
                Ribuan pekerja lain mungkin sedang mengalami hal serupa. 
                Ceritamu bisa jadi pengingat bahwa mereka gak sendiri.
              </p>
              <Link
                href="/tulis"
                className="inline-flex items-center gap-3 px-10 py-5 
                  bg-[#8b7355] text-white rounded-full
                  hover:bg-[#c7b299] transition-all duration-300 
                  text-sm tracking-wider font-medium shadow-lg shadow-[#8b7355]/20
                  hover:shadow-xl hover:shadow-[#8b7355]/30 hover:-translate-y-1"
              >
                <PenLine size={20} />
                Tulis Ceritamu Sekarang
              </Link>
              <p className={`mt-6 text-xs ${colors.textSubtle}`}>
                Anonim • Gak perlu login • Langsung publish
              </p>
            </motion.div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className={`py-12 px-6 border-t ${colors.border} text-center`}>
          <Link href="/" className={`text-sm ${colors.textSubtle} hover:text-[#8b7355] transition-colors`}>
            Kembali ke Beranda
          </Link>
        </footer>
      </div>
    </main>
  );
}
