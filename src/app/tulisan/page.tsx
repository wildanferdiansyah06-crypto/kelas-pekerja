import postsData from "@/public/data/posts.json";

export default function TulisanPage() {
  const posts = postsData.posts || [];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 selection:bg-[#c7b299] selection:text-[#0a0a0a]">

      {/* Grain overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <header className="mb-32 text-center relative animate-fade-in">

            <div className="flex items-center justify-center gap-4 mb-8 opacity-30">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c7b299] to-transparent"></div>
              <span className="text-[10px] tracking-[0.5em] uppercase font-light">
                Arsip Pikiran
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c7b299] to-transparent"></div>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl mb-8 text-white tracking-tight leading-none animate-fade-in-slow">
              <span className="block text-[#c7b299] text-2xl md:text-3xl mb-4 italic font-light opacity-80">
                ruang bagi
              </span>
              Tulisan
            </h1>

            <p className="text-lg md:text-xl opacity-60 leading-[2] max-w-2xl mx-auto font-light animate-fade-in-slower">
              Di antara deru waktu yang tak pernah berhenti, ada saat-saat ketika
              kata-kata menjadi satu-satunya tempat perlindungan. Bukan untuk
              diterima, bukan untuk dipahami—hanya untuk <em>ada</em>.
            </p>

          </header>


          {/* MANIFESTO */}
          <section className="mb-32 relative animate-fade-in-slower">

            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8b7355] to-transparent opacity-30"></div>

            <div className="pl-8 space-y-8 text-lg leading-[2.2] opacity-75">

              <p className="first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-[-8px] first-letter:text-[#c7b299]">
                Kita hidup di era yang terobsesi pada kecepatan. Segala sesuatu harus instan,
                terukur, menghasilkan. Namun di sudut terdalam kesadaran, kita tahu:
                yang benar-benar berarti justru datang dari proses yang lambat,
                menyakitkan, dan seringkali tanpa tujuan jelas.
              </p>

              <p>
                Setiap tulisan di sini adalah <span className="text-[#c7b299]">jejak</span>—
                bukan petunjuk arah, melainkan bekas tapak kaki di pasir yang segera
                terhapus ombak.
              </p>

              <blockquote className="border-l-2 border-[#8b7355] pl-8 py-4 my-12 italic font-serif text-2xl text-[#c7b299] leading-relaxed relative">
                <span className="absolute -left-4 -top-4 text-6xl opacity-20">"</span>
                Menulis adalah cara kita memberi makna pada kekosongan.
              </blockquote>

            </div>

          </section>


          {/* LIST TULISAN */}
          <section className="mb-32">

            <div className="flex items-baseline justify-between mb-16 border-b border-neutral-800 pb-4">
              <h2 className="font-serif text-2xl text-white italic">
                Catatan-catatan
              </h2>

              <span className="text-xs tracking-widest uppercase opacity-40">
                {posts.length > 0 ? `${posts.length} tulisan` : "Kosong"}
              </span>
            </div>


            <div className="space-y-20">

              {posts.length === 0 ? (
                <div className="text-center py-24 opacity-40">
                  <p className="font-serif text-xl italic mb-4">
                    Keheningan yang menunggu
                  </p>
                  <p className="text-sm">
                    Belum ada kata yang berani keluar.
                  </p>
                </div>
              ) : (
                posts.map((post: any, index: number) => (

                  <article
                    key={post.slug}
                    className={`group relative animate-fade-in-slowest`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >

                    <span className="absolute -left-12 top-0 text-6xl font-serif text-neutral-800 select-none hidden md:block group-hover:text-neutral-700 transition-colors duration-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>


                    <div className="relative border-l border-neutral-800 pl-8 md:pl-12 pb-16 group-hover:border-[#8b7355] transition-colors duration-500">

                      <div className="flex items-center gap-3 mb-4 text-xs tracking-widest uppercase opacity-40 group-hover:opacity-60 transition-opacity">
                        <span className="w-8 h-px bg-current"></span>
                        <span>{post.date || "Waktu tak tercatat"}</span>
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl mb-4 text-white group-hover:text-[#c7b299] transition-colors duration-500 leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-base md:text-lg opacity-60 leading-[1.9] mb-6 group-hover:opacity-80 transition-opacity duration-500 line-clamp-3">
                        {post.excerpt}
                      </p>

                    </div>

                  </article>

                ))
              )}

            </div>

          </section>


          {/* FOOTER */}
          <footer className="pt-16 border-t border-neutral-900 text-center">

            <p className="font-serif italic text-neutral-500 text-lg mb-4">
              Ditulis perlahan, seperti menyeduh kopi
            </p>

            <div className="flex items-center justify-center gap-4 mt-8 opacity-20">
              <div className="h-px w-8 bg-neutral-600"></div>
              <span className="text-[10px] tracking-[0.3em] uppercase">
                Akhir dari arsip
              </span>
              <div className="h-px w-8 bg-neutral-600"></div>
            </div>

          </footer>

        </div>
      </div>
    </main>
  );
}
