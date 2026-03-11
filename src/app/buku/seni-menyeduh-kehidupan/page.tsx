export default function BukuPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e7e7e7] selection:bg-amber-900/50 selection:text-amber-100">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-900/5 rounded-full blur-3xl" />
      </div>

      <main className="relative max-w-2xl mx-auto px-6 py-20 md:py-32">
        
        {/* Cover Section */}
        <section className="text-center mb-24 md:mb-32 space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-800/30 to-orange-900/30 border border-amber-800/30 mb-4">
            <span className="text-3xl">☕</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-amber-50 leading-[1.1]">
            SENI MENYEDUH
            <br />
            <span className="italic text-amber-200/90">KEHIDUPAN</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-400 font-light tracking-wide max-w-md mx-auto leading-relaxed">
            Refleksi tentang Rasa, Waktu, dan Kesabaran dalam Secangkir Kopi
          </p>

          <div className="flex items-center justify-center gap-4 text-stone-600 text-sm tracking-[0.2em] uppercase py-8">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-stone-700" />
            <span className="text-amber-700/60">✦</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-stone-700" />
          </div>

          <div className="space-y-3 text-stone-500">
            <p className="text-sm uppercase tracking-widest">Ditulis oleh</p>
            <p className="font-serif text-2xl text-amber-100/80 italic">Wildan Ferdiansyah</p>
          </div>

          <blockquote className="relative mt-12 p-8 border-l-2 border-amber-800/30 bg-gradient-to-r from-amber-900/10 to-transparent">
            <p className="font-serif text-xl md:text-2xl italic text-amber-200/80 leading-relaxed">
              "Setiap tetes kopi adalah perjalanan tentang menerima waktu dan percaya pada proses."
            </p>
          </blockquote>

          <p className="text-stone-600 text-sm italic mt-8">Diseduh dengan hati, 2025</p>
        </section>

        {/* Kata Pengantar */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-amber-800/50" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-amber-700/80 font-medium">Kata Pengantar</h2>
          </div>
          
          <div className="prose prose-invert prose-stone max-w-none">
            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light first-letter:text-5xl first-letter:font-serif first-letter:text-amber-200 first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px]">
              Kopi mengajarkan kesabaran — bukan hanya dalam menunggu tetesan yang jatuh perlahan, tetapi juga dalam memahami bahwa setiap hal memiliki waktunya sendiri. Tidak semua rasa muncul sekaligus; ada yang perlu waktu untuk larut, ada pula yang harus menunggu panas merata agar maknanya sempurna.
            </p>
            
            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light mt-6">
              Dalam proses menyeduh, kita belajar bahwa tergesa hanya membuat pahit yang berlebihan. Sementara menunda terlalu lama justru membuat aroma kehilangan esensinya. Hidup pun serupa: ada ritme yang tak terlihat, dan tugas kita hanyalah menyelaraskan diri dengannya.
            </p>

            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light mt-6">
              Kesabaran bukan berarti diam tanpa arah, melainkan kesediaan untuk berjalan dengan tenang, meski hasil belum tampak di depan mata. Seperti air yang perlahan menembus biji kopi, kita belajar bahwa keindahan membutuhkan waktu dan ketulusan.
            </p>

            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light mt-6">
              Dalam setiap tetes kopi, tersimpan perjalanan tentang menerima waktu, tentang kepercayaan kepada proses. Dan pada akhirnya, kita menyadari bahwa yang kita nikmati bukan hanya rasa, melainkan perjalanan itu sendiri.
            </p>
          </div>

          <div className="mt-12 text-right">
            <p className="text-stone-400 italic font-serif text-lg">Dengan hangat dan sepenuh jiwa,</p>
            <p className="text-amber-200/80 font-serif text-xl mt-2">Wildan Ferdiansyah</p>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-12 opacity-30">
          <span className="w-16 h-px bg-stone-600" />
          <span className="text-amber-700">✦</span>
          <span className="w-16 h-px bg-stone-600" />
        </div>

        {/* Pendahuluan */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-amber-800/50" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-amber-700/80 font-medium">Pendahuluan</h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light">
              Kopi adalah tentang keseimbangan — antara rasa, waktu, dan ketepatan. Setiap unsur saling melengkapi, menghadirkan harmoni yang tak dapat diciptakan dengan satu elemen saja.
            </p>

            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light">
              Seperti hidup, keseimbangan bukan berarti tanpa tekanan, melainkan tahu kapan harus memberi ruang dan kapan harus bertindak.
            </p>

            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light">
              Air yang terlalu panas akan membakar, yang terlalu dingin takkan mampu mengekstrak rasa. Begitu pula kita, yang kadang perlu belajar menemukan suhu ideal dalam menghadapi hidup.
            </p>

            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light">
              Kita terlalu sering berada di ekstrem: terlalu cepat atau terlalu lambat, terlalu keras atau terlalu lembut. Padahal kebijaksanaan sejati terletak di tengah — di ruang hening tempat kita belajar memahami diri.
            </p>

            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light">
              Keseimbangan juga tentang rasa — pahit, manis, dan asam, yang masing-masing memiliki tempatnya. Tak ada rasa yang sia-sia, karena semuanya hadir untuk melatih kita mengenal hidup lebih dalam. Kopi mengajarkan bahwa tidak perlu menghapus pahit untuk menemukan manis; cukup menerimanya dengan penuh kesadaran.
            </p>

            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light">
              Hidup, seperti secangkir kopi, menuntut kita untuk hadir sepenuhnya. Untuk menakar, menunggu, dan merasakan setiap proses tanpa terburu-buru menuju hasil. Di sanalah keseimbangan sejati lahir — bukan dari kesempurnaan, tapi dari penerimaan.
            </p>

            <p className="text-lg md:text-xl leading-[1.8] text-stone-300 font-light">
              Mari kita belajar menyeduh bukan hanya kopi, tapi juga diri kita sendiri. Pelan-pelan, dengan sabar, seimbang, dan penuh makna. Sebab hidup yang baik bukanlah tentang seberapa cepat kita selesai, melainkan seberapa dalam kita merasakannya.
            </p>
          </div>
        </section>

        {/* Section Title */}
        <section className="text-center py-16 md:py-24 border-y border-stone-800/50 my-16">
          <h2 className="font-serif text-3xl md:text-5xl text-amber-100/90 italic mb-4">
            Seni Menyeduh Kehidupan
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="w-8 h-px bg-amber-800/40" />
            <span className="text-amber-700/60 text-lg">✦</span>
            <span className="w-8 h-px bg-amber-800/40" />
          </div>
        </section>

        {/* Daftar Isi */}
        <section className="mb-20 md:mb-28 bg-stone-900/30 p-8 md:p-12 rounded-sm border border-stone-800/50">
          <h3 className="text-center font-serif text-2xl text-amber-200/90 mb-10">✨ Daftar Isi ✨</h3>
          
          <nav className="space-y-4 max-w-lg mx-auto">
            {[
              { icon: "", title: "Bab 1 – Dari Biji ke Jiwa", page: "5" },
              { icon: "💧", title: "Bab 2 – Air dan Keseimbangan", page: "11" },
              { icon: "🔥", title: "Bab 3 – Suhu, Tekanan, dan Ketahanan", page: "17" },
              { icon: "⚙️", title: "Bab 4 – Grind Size: Tentang Detail dan Kesabaran", page: "23" },
              { icon: "⏳", title: "Bab 5 – Waktu Seduh dan Kesabaran", page: "29" },
              { icon: "🍫", title: "Bab 6 – Rasa: Pahit, Manis, dan Seimbang", page: "35" },
              { icon: "🌿", title: "Bab 7 – Ritual Kopi, Ritual Diri", page: "41" },
              { icon: "☀️", title: "Bab 8 – Seni Menyeduh Kehidupan", page: "47" },
              { icon: "🌙", title: "Bab 9 – Kopi, Waktu, dan Keheningan", page: "53" },
              { icon: "💭", title: "Bab 10 – Penutup: Menyeduh dengan Jiwa", page: "59" },
            ].map((item, idx) => (
              <a 
                key={idx} 
                href={`#bab-${idx + 1}`}
                className="group flex items-center justify-between py-3 border-b border-stone-800/30 last:border-0 hover:border-amber-800/30 transition-colors duration-300"
              >
                <span className="text-stone-400 group-hover:text-amber-200/80 transition-colors duration-300 font-light">
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </span>
                <span className="text-stone-600 font-serif italic group-hover:text-amber-700/60 transition-colors duration-300">
                  {item.page}
                </span>
              </a>
            ))}
          </nav>

          <p className="text-center text-stone-600 text-sm mt-8 italic">
            — Diseduh dengan hati oleh Wildan F —
          </p>
        </section>

        {/* Tentang Penulis */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-12 h-px bg-stone-700" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-stone-500 font-medium">Tentang Penulis</h2>
            <span className="w-12 h-px bg-stone-700" />
          </div>

          <div className="bg-gradient-to-b from-stone-900/20 to-transparent p-8 md:p-12 rounded-lg border border-stone-800/30 text-center">
            <p className="text-lg leading-[1.9] text-stone-300 font-light mb-6 text-justify md:text-center">
              Wildan Ferdiansyah lahir dan tumbuh dengan aroma kopi yang akrab di kesehariannya. Dari balik meja bar, ia belajar bahwa kopi bukan sekadar minuman — melainkan cermin kecil dari kehidupan. Setiap seduhan, setiap tekanan, dan setiap tetes air menjadi pelajaran tentang kesabaran, keseimbangan, dan ketulusan.
            </p>
            
            <p className="text-lg leading-[1.9] text-stone-300 font-light mb-8 text-justify md:text-center">
              Sebagai seorang barista dan penulis reflektif, Wildan percaya bahwa keindahan hidup tidak datang dari kesempurnaan, tetapi dari keberanian untuk hadir sepenuhnya. Ia menulis bukan untuk mengajarkan, tetapi untuk berbagi — tentang bagaimana setiap orang bisa menemukan makna di balik hal-hal sederhana, seperti secangkir kopi hangat di pagi hari.
            </p>

            <p className="text-lg leading-[1.9] text-stone-300 font-light mb-8 text-justify md:text-center">
              Karya ini lahir dari perjalanan panjang menyeduh bukan hanya kopi, tapi juga kehidupan itu sendiri.
            </p>

            <blockquote className="border-t border-stone-800/50 pt-8 mt-8">
              <p className="font-serif text-xl md:text-2xl italic text-amber-200/70 mb-4">
                "Bagiku, setiap cangkir kopi adalah doa kecil yang diseduh perlahan — menghangatkan hati, menenangkan jiwa."
              </p>
              <cite className="text-stone-500 not-italic text-sm tracking-widest uppercase">
                — Wildan Muchtar —
              </cite>
            </blockquote>
          </div>
        </section>

        {/* Bab 1 */}
        <section id="bab-1" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-amber-700/60 text-sm font-medium tracking-widest">BAB 01</span>
            <h2 className="font-serif text-3xl md:text-4xl text-amber-100">Dari Biji ke Jiwa</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Setiap kali aku menggenggam segenggam biji kopi, ada perasaan hangat yang sulit dijelaskan—seolah aku sedang memegang sesuatu yang hidup. Bukan hanya karena aroma segarnya yang khas, tapi karena aku tahu biji-biji kecil itu telah melalui perjalanan panjang dan penuh makna. Mereka tumbuh di ketinggian, di antara tanah, hujan, dan matahari; menunggu waktu yang tepat untuk dipetik, melewati panasnya proses sangrai, hingga akhirnya tiba di meja bar tempat aku berdiri sekarang. Kadang aku membayangkan, seandainya biji-biji itu bisa bercerita, apa yang akan mereka katakan tentang perjalanan panjang mereka?
            </p>

            <p>
              Kita semua memulai perjalanan dari sesuatu yang sederhana—kecil, polos, dan penuh potensi. Lalu hidup memanggang kita dengan berbagai pengalaman: rasa gagal, kehilangan, cinta, kecewa, tawa, dan harapan. Setiap "sangrai" itu meninggalkan bekas, mengubah kita sedikit demi sedikit, hingga akhirnya kita memiliki aroma dan rasa yang khas: diri kita sendiri.
            </p>

            <p>
              Suatu hari, seorang pelanggan berkata padaku, "Kopi yang enak itu bukan yang mahal, tapi yang punya cerita." Kalimat itu menempel di pikiranku, karena memang benar—bukan harga yang menentukan nilai, tetapi perjalanan di baliknya. Seperti manusia, kita tidak diukur dari pencapaian semata, melainkan dari proses yang membentuk siapa kita hari ini. Kopi mengajarkanku bahwa setiap hal indah membutuhkan waktu; tidak semua bisa dipercepat.
            </p>

            <p>
              Biji yang belum matang tidak bisa dipaksa dipetik. Begitu juga manusia. Kadang kita ingin buru-buru sampai—ingin sukses hari ini, bahagia sekarang juga. Tapi hidup punya ritmenya sendiri. Jika kita terburu-buru, "rasa" kita bisa belum matang.
            </p>

            <p>
              Saat aku menatap biji-biji yang menari di dalam grinder, aku teringat satu hal: kadang kita perlu dihancurkan dulu untuk mengeluarkan aroma terbaik dari dalam diri. Tidak nyaman memang, seperti biji yang hancur menjadi bubuk halus—namun dari situlah kehidupan mulai mengalir. Ketika air panas menyentuh bubuk kopi, aroma yang tersembunyi mulai keluar. Panas itu menyakitkan, tapi juga membangkitkan kehidupan baru.
            </p>

            <p>
              Mungkin begitulah cara semesta bekerja. Tekanan, panas, dan waktu bukan hukuman; mereka adalah cara hidup mengeluarkan versi terbaik dari kita. Setiap kali aku menyeduh kopi untuk pelanggan, aku berpikir: setiap cangkir kopi adalah kisah tentang kesabaran, luka, dan keindahan yang berpadu dalam harmoni. Dan setiap kali aku mencicipinya, aku belajar satu hal sederhana—bahwa di balik rasa pahit, selalu ada aroma yang menenangkan. Seperti hidup, yang kadang keras di luar, tapi hangat di dalam.
            </p>

            <p>
              Jadi, sebelum kamu menyesap kopi berikutnya, berhentilah sejenak. Perhatikan aromanya, rasakan kehangatannya, dan pikirkan perjalanan panjang yang membawanya ke hadapanmu. Karena mungkin, di sana—di antara biji dan jiwa—kamu akan menemukan dirimu sendiri.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-amber-800/40 italic text-amber-200/80 font-serif text-xl">
            "Hidup bukan tentang seberapa cepat kita diseduh, tapi seberapa dalam kita memberi rasa."
          </blockquote>
        </section>

        {/* Bab 2 */}
        <section id="bab-2" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-blue-600/60 text-sm font-medium tracking-widest">BAB 02</span>
            <h2 className="font-serif text-3xl md:text-4xl text-blue-100">💧 Air dan Keseimbangan</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Setelah biji kopi digiling dengan hati-hati, ada satu elemen yang menentukan segalanya: air. Tanpa air, kopi hanyalah bubuk pahit tanpa makna. Tapi dengan air yang tepat, ia berubah menjadi sesuatu yang hidup, hangat, dan penuh cerita.
            </p>

            <p>
              Air tampak sederhana, tapi ia menyimpan kekuatan luar biasa. Ia bisa meresap, menembus, dan menyatukan. Dalam dunia kopi, air bukan hanya pelarut rasa—ia adalah jembatan antara kopi dan manusia. Dan dari sanalah aku belajar tentang keseimbangan.
            </p>

            <p>
              Pagi itu, aku menyiapkan seduhan untuk pelanggan tetap. Ia selalu memesan kopi yang sama, tapi hari itu rasanya sedikit berbeda. "Sedikit lebih pahit, ya?" katanya sambil tersenyum. Aku menatap timbangan dan termometer—suhu airku terlalu tinggi dua derajat. Sekecil itu, tapi rasanya berubah. Dari situ aku belajar, hidup pun seperti itu. Hal kecil bisa mengubah segalanya. Suhu emosi, kadar sabar, atau intensitas perhatian—semuanya memengaruhi "rasa" hari kita. Terlalu panas, kita terbakar. Terlalu dingin, kita membeku.
            </p>

            <p>
              Air mengajarkan kita untuk seimbang. Ia tidak menolak bentuk cangkir yang menampungnya; ia menerima, beradaptasi, dan tetap jernih. Kadang lembut seperti tetesan pour-over yang pelan, kadang kuat seperti semburan espresso di bawah tekanan tinggi. Tapi dalam segala bentuknya, air tetap air—tenang, lentur, tapi tegas.
            </p>

            <p>
              Aku sering merenung tentang itu saat menuangkan air ke atas bubuk kopi. Gerakan kecil pergelangan tangan, aliran air yang melingkar, dan ritme napas yang harus dijaga—semuanya menuntut kesadaran. Kalau terburu-buru, hasilnya kacau. Kalau terlalu berhati-hati, airnya keburu dingin. Hidup pun begitu: kita butuh flow yang pas antara niat, tindakan, dan rasa percaya.
            </p>

            <p>
              Ada masa ketika aku dulu "terlalu panas" menghadapi hidup. Aku ingin semuanya cepat selesai—karier, mimpi, cinta. Tapi seperti kopi yang diseduh air mendidih, aku malah kehilangan rasa. Butuh waktu untuk belajar menurunkan suhu, menenangkan diri, dan menyadari bahwa tidak semua hal harus mendidih untuk terasa hidup. Keseimbangan bukan berarti tanpa tekanan, melainkan tahu kapan harus diam dan kapan harus mengalir.
            </p>

            <p>
              Kadang kita perlu jadi air yang tenang, menenangkan sekitar. Kadang, jadi air yang deras, menembus halangan. Tapi yang paling penting: tetap jernih, apa pun wadahnya.
            </p>

            <p>
              Setiap kali aku menatap air yang mengalir dari ketel, aku teringat satu hal sederhana—bahwa keseimbangan tidak datang dari kontrol penuh, tapi dari kemampuan untuk menerima dan menyesuaikan diri. Kopi dan air saling melengkapi. Tanpa kopi, air tak punya rasa. Tanpa air, kopi tak punya makna. Begitu juga manusia: tanpa keseimbangan antara hati dan pikiran, kita hanya akan jadi salah satu—terlalu pahit, atau terlalu hambar.
            </p>

            <p>
              Maka, sebelum kamu meneguk kopi pagimu, lihatlah air yang menjadi bagian dari seduhan itu. Lihat bagaimana ia mengalir tanpa perlawanan, membawa rasa tanpa kehilangan dirinya. Karena mungkin, di situ kamu akan belajar: menjadi tenang bukan berarti lemah, dan menyesuaikan diri bukan berarti kehilangan jati diri.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-blue-800/40 italic text-blue-200/80 font-serif text-xl">
            "Hidup adalah tentang suhu dan kadar: terlalu panas, kita meledak; terlalu dingin, kita membeku. Di tengah-tengahnya, kita menemukan keseimbangan."
          </blockquote>
        </section>

        {/* Bab 3 */}
        <section id="bab-3" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-orange-700/60 text-sm font-medium tracking-widest">BAB 03</span>
            <h2 className="font-serif text-3xl md:text-4xl text-orange-100">🔥 Suhu, Tekanan, dan Ketahanan</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Di balik setiap cangkir espresso yang sempurna, ada kekuatan yang sering diabaikan: tekanan. Tanpa tekanan, tidak ada crema, tidak ada rasa yang kuat, tidak ada aroma yang menonjol. Mesin espresso bekerja dengan mendorong air panas di bawah tekanan tinggi untuk mengekstraksi rasa terbaik dari bubuk kopi yang halus dan rapat. Dan setiap kali aku menatap mesin itu bekerja, aku selalu berpikir: hidup juga menekan kita dengan cara yang sama.
            </p>

            <p>
              Dulu aku takut pada tekanan—tekanan dari pekerjaan, ekspektasi, dan diri sendiri. Semua terasa berat, seperti air panas yang siap meledak jika tak tertahan. Tapi kopi mengajarkanku satu hal penting: tekanan tidak selalu berarti kehancuran; kadang justru itu yang membentuk kekuatan rasa.
            </p>

            <p>
              Aku ingat malam itu, kedai sudah hampir tutup. Seorang pelanggan terakhir datang, wajahnya lelah tapi matanya memohon secangkir espresso. Aku tahu, ia tidak butuh kafein—ia butuh kehangatan. Aku menyalakan mesin, memantau tekanan di manometer, memperhatikan setiap tetes yang keluar. Semakin tinggi tekanannya, semakin pekat warnanya. Dan di detik itu aku sadar, rasa terbaik memang lahir dari tekanan yang pas, bukan dari pelarian.
            </p>

            <p>
              Kopi yang diseduh tanpa tekanan terasa datar dan hambar, seperti hidup tanpa tantangan. Tapi tekanan yang berlebihan juga bisa menghancurkan rasa—gosong, pahit, tak seimbang. Hidup mengajarkan kita hal yang sama: ketahanan bukan hanya soal kuat menahan beban, tapi juga tahu kapan harus menurunkan panasnya.
            </p>

            <p>
              Dalam dunia kopi, suhu adalah sahabat sekaligus musuh. Sedikit terlalu panas, kopi terbakar. Terlalu dingin, ekstraksinya gagal. Mungkin begitulah emosi manusia. Ketika marah, kita "terlalu panas"; ketika menyerah, kita "terlalu dingin." Butuh ketenangan untuk menjaga suhu hati agar tetap di titik yang pas—hangat, tapi tidak membakar.
            </p>

            <p>
              Kopi mengajarkanku untuk menghargai tekanan yang datang. Ia menunjukkan bahwa dari situlah lahir sesuatu yang pekat, beraroma, dan bermakna. Tekanan bukan musuh; ia adalah pengingat bahwa kita masih hidup, bahwa kita masih punya sesuatu untuk dikeluarkan dari dalam diri.
            </p>

            <p>
              Namun tidak semua tekanan baik. Ada kalanya kita perlu "menurunkan suhu," memberi ruang bagi diri sendiri untuk bernapas. Mesin pun butuh waktu istirahat agar tidak rusak. Begitu juga manusia. Kita tidak bisa terus-menerus berada di bawah tekanan tanpa jeda. Kadang kita harus berhenti sejenak, mengangkat tuas, dan membiarkan uapnya keluar agar tidak meledak di dalam.
            </p>

            <p>
              Tekanan, suhu, dan ketahanan—tiga hal yang menentukan kualitas espresso, juga kualitas manusia. Kopi yang baik bukan kopi yang tidak pernah tertekan, tapi kopi yang tahu bagaimana mengolah tekanan itu menjadi rasa. Hidup yang baik pun bukan hidup tanpa masalah, melainkan hidup yang mampu mengubah tekanan menjadi keteguhan, panas menjadi semangat, dan luka menjadi aroma yang menenangkan.
            </p>

            <p>
              Setiap kali aku menatap lapisan crema di atas espresso—lembut, keemasan, sempurna—aku selalu berpikir: itulah hasil dari perjuangan, dari panas dan tekanan yang seimbang. Sama seperti kita—di balik senyum yang tenang, selalu ada cerita tentang seberapa kuat kita menahan diri agar tidak hancur di tengah panas kehidupan.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-orange-800/40 italic text-orange-200/80 font-serif text-xl">
            "Tekanan bukan musuh. Ia hanya cara hidup menanyakan: sudahkah kamu siap mengeluarkan rasa terbaikmu hari ini?"
          </blockquote>
        </section>

        {/* Bab 4 */}
        <section id="bab-4" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-stone-500 text-sm font-medium tracking-widest">BAB 04</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-200">⚙️ Grind Size: Tentang Detail dan Kesabaran</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Di dunia kopi, ukuran gilingan adalah hal yang sering diremehkan kecil, tapi menentukan segalanya. Terlalu halus, kopi jadi pahit. Terlalu kasar, rasanya lemah. Butuh ketepatan, kesabaran, dan sedikit intuisi untuk menemukan keseimbangan itu.
            </p>

            <p>
              Aku pernah menyeduh kopi dengan terburu-buru. Grinder kuatur cepat, tanpa periksa hasilnya. Saat diseduh, kopi itu rasanya aneh seolah kehilangan jati dirinya. Dari situ aku belajar, bahwa dalam hidup pun, kita sering terburu-buru dan kehilangan rasa. Detail kecil menentukan hasil besar. Cara kita menyapa orang, mendengarkan, bahkan menyeduh kopi untuk diri sendiri semua adalah bentuk perhatian yang sederhana tapi bermakna. Kesabaran bukan berarti lambat, tapi sadar akan proses. Karena setiap hal besar dibangun dari hal-hal kecil yang dilakukan dengan hati.
            </p>

            <p>
              Kopi yang baik tidak terburu-buru. Dan manusia yang baik, bukan yang cepat selesai tapi yang tidak melewatkan proses penggilingannya. Karena justru di saat-saat kita "dihaluskan," karakter sejati kita terbentuk.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-stone-600/40 italic text-stone-400 font-serif text-xl">
            "Kadang yang membedakan rasa bukan bahan, tapi ketulusan dalam memperhatikan hal-hal kecil."
          </blockquote>
        </section>

        {/* Bab 5 */}
        <section id="bab-5" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-purple-600/60 text-sm font-medium tracking-widest">BAB 05</span>
            <h2 className="font-serif text-3xl md:text-4xl text-purple-100">⏳ Waktu Seduh dan Kesabaran</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Tidak ada kopi yang bisa diseduh dalam satu detik.
            </p>

            <p>
              Waktu adalah bagian dari rasa ia mengikat aroma, menyeimbangkan panas, dan memberi ruang bagi kopi untuk bercerita. Aku sering menyeduh pour-over sambil menatap air menetes perlahan ke dalam cangkir. Setiap tetes seperti menit yang berjalan sabar, tenang, tanpa tergesa. Jika kupercepat, rasanya belum matang. Jika kutunda terlalu lama, ia kehilangan hangatnya. Begitulah hidup. Kita semua punya "waktu seduh" masing-masing. Tidak ada yang benar-benar terlambat, tidak ada yang terlalu cepat. Setiap orang punya waktu yang ditentukan semesta kita hanya perlu percaya prosesnya.
            </p>

            <p>
              Kesabaran bukan berarti pasrah, tapi tahu kapan harus berhenti mengaduk dan mulai menikmati aroma. Hidup pun begitu ada saat bekerja keras, ada saat menunggu hasilnya. Dan yang indah, terkadang momen menunggu itulah yang membuat hasil akhirnya terasa lebih manis.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-purple-800/40 italic text-purple-200/80 font-serif text-xl">
            "Rasa terbaik hanya muncul jika kita cukup sabar untuk menunggu aroma muncul sepenuhnya."
          </blockquote>
        </section>

        {/* Bab 6 */}
        <section id="bab-6" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-yellow-600/60 text-sm font-medium tracking-widest">BAB 06</span>
            <h2 className="font-serif text-3xl md:text-4xl text-yellow-100">🍫 Rasa: Pahit, Manis, dan Seimbang</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Kopi yang sempurna tidak pernah hanya manis. Ia punya pahit yang jujur, asam yang hidup, dan manis yang datang di akhir — seperti hidup. Aku pernah takut pada rasa pahit. Dulu, aku selalu menambah gula dalam kopi. Tapi semakin lama aku belajar menyeduh, aku sadar: pahit bukan musuh. Ia bagian dari keseimbangan. Tanpanya, manis tidak akan berarti. Hidup pun begitu.
            </p>

            <p>
              Kita sering ingin semuanya terasa manis — hubungan, pekerjaan, mimpi. Tapi tanpa rasa pahit, kita tidak akan tahu arti syukur. Rasa pahit mengingatkan kita untuk menghargai momen ringan, dan memberi kedalaman pada cerita kita sendiri. Setiap seduhan punya komposisi unik.
            </p>

            <p>
              Ada yang lebih pekat, ada yang ringan. Begitu juga manusia kita semua punya "profil rasa" masing-masing. Tak perlu sama, cukup jujur dengan rasa yang kita bawa.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-yellow-800/40 italic text-yellow-200/80 font-serif text-xl">
            "Hidup yang seimbang bukan yang selalu manis, tapi yang berani menerima pahit sebagai bagian dari rasa."
          </blockquote>
        </section>

        {/* Bab 7 */}
        <section id="bab-7" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-green-600/60 text-sm font-medium tracking-widest">BAB 07</span>
            <h2 className="font-serif text-3xl md:text-4xl text-green-100">🌿 Ritual Kopi, Ritual Diri</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Setiap pagi, sebelum kedai ramai, aku selalu membuat kopi untuk diriku sendiri.
            </p>

            <p>
              Bukan karena butuh kafein, tapi karena butuh keheningan. Ritual kecil itu menjadi waktu untuk menenangkan pikiran, menyapa hari, dan berdialog dengan diri sendiri. Menyiapkan kopi perlahan menggiling, menyeduh, menunggu, mencium aroma semuanya seperti meditasi.
            </p>

            <p>
              Di situ aku belajar hadir. Tidak memikirkan masa lalu, tidak mengkhawatirkan nanti. Hanya di sini, di detik ini. Kita sering hidup terlalu cepat, sampai lupa menikmati momen sederhana. Padahal, seperti kopi, hidup terasa paling nikmat saat kita menikmatinya perlahan. Ritual itu tidak harus besar. Bisa berupa secangkir kopi, napas panjang di pagi hari, atau menulis tiga hal yang disyukuri sebelum tidur. Yang penting, kita menyisakan ruang untuk mengenali diri karena hidup yang terlalu sibuk tanpa jeda, akan kehilangan rasa.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-green-800/40 italic text-green-200/80 font-serif text-xl">
            "Ritual kecil menjaga kita tetap waras di tengah hiruk pikuk — seperti kopi yang menjaga hangat di pagi yang dingin."
          </blockquote>
        </section>

        {/* Bab 8 */}
        <section id="bab-8" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-amber-600/60 text-sm font-medium tracking-widest">BAB 08</span>
            <h2 className="font-serif text-3xl md:text-4xl text-amber-100">☀️ Seni Menyeduh Kehidupan</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Hidup, pada akhirnya, adalah tentang cara kita menyeduhnya. Tentang bagaimana kita mengolah panas, tekanan, waktu, dan rasa. Setiap unsur punya perannya, dan tak satu pun bisa diabaikan. Kopi tidak pernah terburu-buru, tapi juga tidak berdiam terlalu lama. Ia tahu kapan harus berhenti. Hidup juga begitu. Kita harus tahu kapan berjuang, kapan beristirahat, dan kapan menikmati hasil seduhan kita sendiri. Kadang hidup terasa pahit, kadang manis, tapi yang membuatnya indah adalah cara kita meresapi setiap tegukan.
            </p>

            <p>
              Kopi mengajarkan bahwa hasil terbaik bukan dari kesempurnaan, tapi dari ketulusan dari niat untuk memberi rasa yang tulus, sekecil apa pun itu.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-amber-800/40 italic text-amber-200/80 font-serif text-xl">
            "Hidup bukan tentang mencari rasa yang sempurna, tapi tentang belajar menikmati setiap rasa yang datang."
          </blockquote>
        </section>

        {/* Bab 9 */}
        <section id="bab-9" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-indigo-600/60 text-sm font-medium tracking-widest">BAB 09</span>
            <h2 className="font-serif text-3xl md:text-4xl text-indigo-100">🌙 Kopi, Waktu, dan Keheningan</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Ada saat ketika kedai sudah sepi, lampu tinggal redup, dan aroma kopi terakhir masih tertinggal di udara. Di momen-momen seperti itu, aku sering merenung tentang waktu. Waktu bukan musuh, ia adalah teman yang diam-diam menemani kita tumbuh. Ia tidak bisa kita percepat, tidak bisa kita ubah, tapi bisa kita nikmati. Seperti kopi yang menua dengan indah di dalam cangkir makin lama dibiarkan, rasanya berubah, tapi tetap punya cerita.
            </p>

            <p>
              Keheningan malam mengingatkanku untuk tidak selalu melawan waktu. Kadang, diam justru memberi jawaban yang tak bisa dikejar dengan tergesa. Hidup tidak selalu harus ramai; ada makna yang hanya bisa ditemukan dalam senyap, di antara detak jam dan sisa aroma kopi yang perlahan hilang.
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-indigo-800/40 italic text-indigo-200/80 font-serif text-xl">
            "Waktu tidak pernah benar-benar pergi — ia hanya berubah bentuk menjadi kenangan yang menghangatkan."
          </blockquote>
        </section>

        {/* Bab 10 */}
        <section id="bab-10" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="flex items-baseline gap-4 mb-8 border-b border-stone-800/30 pb-4">
            <span className="text-rose-600/60 text-sm font-medium tracking-widest">BAB 10</span>
            <h2 className="font-serif text-3xl md:text-4xl text-rose-100">💭 Penutup: Menyeduh dengan Jiwa</h2>
          </div>

          <div className="space-y-6 text-stone-300 font-light text-lg leading-[1.9]">
            <p>
              Kopi telah menjadi guru yang setia. Dari biji hingga cangkir, dari aroma hingga rasa, ia mengajarkan bahwa hidup bukan tentang kesempurnaan, tapi tentang keberanian untuk hadir sepenuhnya. Menjadi manusia yang "diseduh dengan jiwa" berarti menjalani hidup dengan sadar menghargai proses, menerima pahit dan manisnya, dan tidak takut menghadapi tekanan. Karena setiap pengalaman, sekecil apa pun, adalah tetes air yang memperkaya rasa hidup kita.
            </p>

            <p>
              Jadi, lain kali saat kamu menyeduh kopi, lakukanlah dengan hati. Lihat bagaimana air bertemu bubuk, dengarkan bunyi halus saat kopi menetes, hirup aromanya, dan rasakan kehangatannya. Di situ, kamu sedang belajar menyeduh kehidupanmu sendiri. Dan ketika kamu menyeruput tegukan terakhirnya, mungkin kamu akan tersenyum dan berkata pelan: "Hidupku mungkin tidak selalu manis, tapi selalu punya rasa."
            </p>
          </div>

          <blockquote className="mt-10 pl-6 border-l-2 border-rose-800/40 italic text-rose-200/80 font-serif text-xl">
            "Seni menyeduh kehidupan bukan tentang kopi, tapi tentang bagaimana kita hadir sepenuhnya, dengan jiwa."
          </blockquote>

          <p className="text-center mt-12 text-stone-500 font-serif text-lg">-iamwildan</p>
        </section>

        {/* Epilog */}
        <section className="mb-20 md:mb-28 border-t border-stone-800/50 pt-16">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-12 h-px bg-stone-700" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-stone-500 font-medium">Epilog</h2>
            <span className="w-12 h-px bg-stone-700" />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-center text-stone-300 mb-8 italic">
            Saat Aroma Terakhir Menguap
          </h3>

          <div className="space-y-6 text-stone-400 font-light text-lg leading-[1.9] max-w-3xl mx-auto text-justify md:text-left">
            <p>
              Kopi selalu tahu caranya mengajarkan perpisahan dengan lembut. Ia tak pernah memaksa untuk tetap hangat, ia hanya hadir sejenak — mengisi ruang dengan aroma, lalu perlahan pergi meninggalkan rasa. Mungkin begitulah hidup dan semua pertemuan di dalamnya: sementara, tapi bermakna.
            </p>

            <p>
              Aku sering berpikir, mungkin kita semua hanyalah biji-biji kopi kecil yang sedang diseduh oleh waktu. Setiap tekanan, panas, dan diamnya bukan untuk menghancurkan, tapi untuk membangkitkan rasa terbaik dari dalam diri. Kita belajar dari air untuk tetap mengalir, dari api untuk tetap hangat, dan dari kopi — untuk tetap jujur terhadap rasa yang kita bawa.
            </p>

            <p>
              Setiap orang yang pernah datang dalam hidup kita adalah seperti pelanggan yang singgah di kedai: Ada yang hanya memesan sekali lalu pergi, ada yang kembali setiap pagi, dan ada yang diam-diam meninggalkan bekas di meja hati. Namun semuanya memiliki aroma sendiri, dan semuanya layak disyukuri.
            </p>

            <p>
              Kini aku paham, seni menyeduh kehidupan bukan tentang mencari kesempurnaan rasa, Melainkan tentang keberanian untuk hadir sepenuhnya — meski tahu panas bisa melukai, meski sadar waktu akan mendinginkan. Karena yang membuat setiap tegukan istimewa bukan hasilnya, tapi proses kita menantikan aroma itu muncul.
            </p>

            <p>
              Dan saat cangkir terakhir kosong, jangan bersedih. Lihatlah sisa ampas di dasar gelas — di sanalah cerita kita tersimpan. Bukan untuk disesali, tapi untuk diingat: bahwa kita pernah hangat, pernah berproses, dan pernah memberi rasa.
            </p>
          </div>

          <blockquote className="mt-12 text-center border-t border-stone-800/30 pt-8">
            <p className="font-serif text-xl md:text-2xl italic text-amber-200/70 leading-relaxed max-w-2xl mx-auto">
              "Setiap tetes kopi adalah doa kecil yang diseduh perlahan — mengajarkan kita bahwa keindahan selalu lahir dari kesabaran."
            </p>
          </blockquote>
        </section>

        {/* Footer */}
        <footer className="text-center pt-16 pb-8 border-t border-stone-800/30">
          <div className="flex items-center justify-center gap-4 mb-6 opacity-30">
            <span className="w-16 h-px bg-stone-500" />
            <span className="text-amber-700">✦</span>
            <span className="w-16 h-px bg-stone-500" />
          </div>
          <p className="text-stone-600 text-sm font-light">
            Diseduh dengan hati oleh <span className="text-amber-700/60">Wildan Ferdiansyah</span>
          </p>
          <p className="text-stone-700 text-xs mt-2">© 2025</p>
        </footer>

      </main>
    </div>
  );
}
