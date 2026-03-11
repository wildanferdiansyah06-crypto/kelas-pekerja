export default function KamiMenulisPelanPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#a0a0a0] selection:bg-neutral-800 selection:text-neutral-200">
      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} 
      />

      <main className="relative max-w-3xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header - Lewat Begitu Saja */}
        <header className="mb-32 md:mb-40">
          <div className="border-b border-neutral-800 pb-8 mb-12">
            <h1 className="font-mono text-xs tracking-[0.3em] text-neutral-600 uppercase mb-2">
              Lewat Begitu Saja
            </h1>
            <div className="h-px w-12 bg-neutral-700" />
          </div>

          <div className="space-y-1 text-sm md:text-base font-light tracking-wide text-neutral-500">
            <p>Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai.</p>
            <p>Alarm pagi belum sempat dilupakan. Layar ponsel masih perih di mata.</p>
            <p>Badan bau keringat.</p>
            <p>Kopi instan dingin di meja.</p>
          </div>

          <div className="mt-12 space-y-4 text-neutral-400 font-light leading-relaxed">
            <p>Aku mengirimkannya sebagai tautan.</p>
            <p>Kadang hanya satu kalimat.</p>
            <p>Kadang tanpa pesan apa-apa.</p>
          </div>

          <div className="mt-8 space-y-2 text-neutral-500 font-light">
            <p>Lalu aku menunggu.</p>
            <p className="text-neutral-600 italic">Bukan dengan harapan besar. Cukup lama untuk tahu apakah ia akan berhenti atau lewat begitu saja.</p>
          </div>
        </header>

        {/* Section: Tentang Kelas Pekerja */}
        <section className="mb-28 md:mb-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-mono tracking-widest text-neutral-700 uppercase"># Tentang Kelas Pekerja</span>
            <span className="flex-1 h-px bg-neutral-800" />
          </div>

          <div className="space-y-6">
            <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8]">
              Kelas pekerja menulis dari sisa.
            </p>

            <div className="space-y-2 text-neutral-500 font-light ml-4 border-l border-neutral-800 pl-6">
              <p>Sisa tenaga.</p>
              <p>Sisa waktu.</p>
              <p>Sisa pikiran yang belum habis dipakai bekerja.</p>
            </div>

            <p className="text-neutral-400 font-light leading-[1.9] mt-6">
              Kami menulis bukan karena yakin. Tapi karena diam-diam tahu kalau tidak ditulis, hari ini akan hilang.
            </p>

            <p className="text-neutral-400 font-light leading-[1.9]">
              Tulisan kami lahir dari tubuh yang ingin rebah tapi masih memaksa duduk.
            </p>

            <p className="text-neutral-500 font-light italic mt-8 border-t border-neutral-800/50 pt-6">
              Karena itu, ia tidak pandai meminta perhatian.
            </p>
          </div>
        </section>

        {/* Section: Tentang Karya */}
        <section className="mb-28 md:mb-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-mono tracking-widest text-neutral-700 uppercase"># Tentang Karya</span>
            <span className="flex-1 h-px bg-neutral-800" />
          </div>

          <div className="bg-neutral-900/20 p-8 md:p-10 border border-neutral-800/30">
            <p className="text-neutral-300 font-light leading-[1.9] mb-6">
              Karya itu seperti bekal yang dimakan dingin di sela jam kerja.
            </p>

            <div className="space-y-2 text-neutral-500 font-light mb-6">
              <p>Tidak mewah.</p>
              <p>Tidak istimewa.</p>
            </div>

            <p className="text-neutral-400 font-light leading-[1.9] mb-8">
              Ia hanya ingin dibuka, meski hanya untuk memastikan bahwa ia belum basi
            </p>

            <div className="space-y-4 text-neutral-500 font-light italic border-l-2 border-neutral-700 pl-6">
              <p>Dan ketika tidak dibuka, ia tidak marah. Hanya diam lebih lama.</p>
              <p className="text-neutral-600">Kadang,</p>
              <p>Ketika dunia luar melewatinya begitu saja, Rasanya masih bisa diterima.</p>
            </div>
          </div>
        </section>

        {/* Section: Tentang Orang Terdekat */}
        <section className="mb-28 md:mb-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-mono tracking-widest text-neutral-700 uppercase"># Tentang Orang Terdekat</span>
            <span className="flex-1 h-px bg-neutral-800" />
          </div>

          <div className="space-y-6">
            <p className="text-neutral-300 font-light leading-[1.9] text-lg">
              Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan.
            </p>

            <div className="py-8 text-center">
              <p className="text-2xl md:text-3xl font-light text-neutral-600 tracking-wide">
                Buku itu ada.
              </p>
              <p className="text-sm text-neutral-700 mt-2 tracking-[0.2em] uppercase">Berbulan-bulan.</p>
            </div>

            <p className="text-neutral-500 font-light leading-[1.9]">
              Aku tidak pernah bertanya. Karena aku tahu, jawabannya akan lebih menyakitkan jika diucapkan.
            </p>

            <div className="mt-8 space-y-4">
              <p className="text-neutral-400 font-light italic text-lg">
                Kadang, yang paling sunyi bukan tidak dibaca,
              </p>
              <p className="text-neutral-300 font-light text-lg ml-8">
                tapi disadari bahwa bahkan yang terdekat pun tidak sempat berhenti.
              </p>
            </div>

            <p className="text-neutral-600 font-light mt-8 pt-6 border-t border-neutral-800/30">
              Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing.
            </p>
          </div>
        </section>

        {/* Section: Tentang Dunia yang Sibuk */}
        <section className="mb-28 md:mb-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-mono tracking-widest text-neutral-700 uppercase"># Tentang Dunia yang Sibuk</span>
            <span className="flex-1 h-px bg-neutral-800" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <p className="text-neutral-300 font-light leading-[1.9] text-lg">
                Dunia tidak kejam.
              </p>
              <p className="text-neutral-400 font-light leading-[1.9]">
                Ia hanya tidak berhenti.
              </p>
            </div>
            
            <div className="space-y-4 text-neutral-500 font-light text-sm leading-[1.8] border-l border-neutral-800 pl-6">
              <p>Dan yang tidak berhenti jarang sempat melihat apa yang lahir pelan.</p>
              <p>Karya seperti ini tidak cocok dengan ritme itu.</p>
              <p className="text-neutral-400">Ia berdiri di pinggir, menyadari bahwa tidak semua yang dibuat dengan sungguh-sungguh akan diberi waktu.</p>
            </div>
          </div>
        </section>

        {/* Section: Tentang Bertahan Menulis */}
        <section className="mb-28 md:mb-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-mono tracking-widest text-neutral-700 uppercase"># Tentang Bertahan Menulis</span>
            <span className="flex-1 h-px bg-neutral-800" />
          </div>

          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-neutral-200 font-light leading-[1.6]">
              Aku tetap menulis bukan karena yakin akan dibaca.
            </p>

            <div className="bg-neutral-900/30 p-8 border-l-2 border-neutral-700">
              <p className="text-neutral-400 font-light leading-[1.9] text-lg">
                Aku menulis karena jika tidak, hari-hari ini akan runtuh tanpa saksi.
              </p>
            </div>

            <p className="text-neutral-500 font-light leading-[1.9] text-center italic py-8">
              Menulis adalah caraku mengatakan pada diri sendiri bahwa aku pernah ada di hari ini.
            </p>

            <div className="text-right">
              <p className="text-neutral-600 font-light text-sm tracking-widest uppercase">
                Meski lewat.
              </p>
            </div>
          </div>
        </section>

        {/* Penutup */}
        <section className="mb-20 md:mb-28 border-t border-neutral-800 pt-16">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-8 h-px bg-neutral-700" />
            <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">Penutup</span>
            <span className="w-8 h-px bg-neutral-700" />
          </div>

          <h2 className="text-center font-light text-2xl md:text-3xl text-neutral-300 mb-12 tracking-wide">
            Tetap Ditulis
          </h2>

          <div className="max-w-xl mx-auto space-y-6 text-center">
            <p className="text-neutral-400 font-light leading-[1.9]">
              Buku ini tidak meminta perhatian. Ia juga tidak ingin dipahami.
            </p>

            <p className="text-neutral-300 font-light leading-[1.9] text-lg">
              Ia hanya ingin jujur.
            </p>

            <div className="py-10 space-y-4">
              <p className="text-neutral-500 font-light leading-[1.8]">
                Dan jika suatu hari seseorang membacanya dalam keadaan lelah, dalam keadaan sepi,
              </p>
              <p className="text-neutral-400 font-light text-lg">
                itu sudah cukup.
              </p>
            </div>

            <div className="pt-8 border-t border-neutral-800/30">
              <p className="text-neutral-600 font-light italic">
                Jika tidak, tidak apa-apa.
              </p>
              <p className="text-neutral-500 font-light mt-4 tracking-widest text-sm uppercase">
                Ia tetap ditulis.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-20 pb-12 border-t border-neutral-800/30">
          <div className="flex items-center justify-center gap-3 mb-8 opacity-20">
            <span className="w-12 h-px bg-neutral-600" />
            <span className="text-neutral-500 text-xs">✦</span>
            <span className="w-12 h-px bg-neutral-600" />
          </div>
          
          <p className="text-neutral-700 text-xs font-mono tracking-widest uppercase">
            Kami Menulis Pelan
          </p>
          <p className="text-neutral-800 text-[10px] mt-2 font-mono">
            Dari sisa. Dari diam. Dari yang lewat begitu saja.
          </p>
        </footer>

      </main>
    </div>
  );
}
