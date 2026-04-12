import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'frlqeeaf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Complete chapter data for all 6 books based on actual book content
const bookChapters: Record<string, Array<{ _key: string; title: string; content: any[] }>> = {
  // Cahaya Itu - 7 chapters
  'cahaya-itu': [
    {
      _key: 'chapter-0',
      title: 'Pembuka: Badan Bau Keringat',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Badan bau keringat. Dia pulang jam dua. Bukan karena lembur. Tapi karena di rumahnya, tidak ada yang menunggu.' }],
        },
      ],
    },
    {
      _key: 'chapter-1',
      title: 'Bab 1: Bocah Itu',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Dia adalah bocah yang tidak punya nama. Hanya bocah. Bocah yang selalu di pojok kelas, yang tidak pernah ikut bermain saat istirahat.' }],
        },
      ],
    },
    {
      _key: 'chapter-2',
      title: 'Bab 2: Yang Menawan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Keindahan itu datang tanpa diundang. Kadang ia hadir di saat-saat yang paling tidak terduga, di tempat-tempat yang paling sunyi.' }],
        },
      ],
    },
    {
      _key: 'chapter-3',
      title: 'Bab 3: Pisau Itu',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Pisau itu tajam. Tapi bukan pisau yang melukai. Pisau yang memotong segala yang tidak perlu, menyisakan hanya yang esensial.' }],
        },
      ],
    },
    {
      _key: 'chapter-4',
      title: 'Bab 4: Malam Itu',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Malam itu adalah malam yang mengubah segalanya. Di bawah langit yang penuh bintang, ia menyadari bahwa cahaya tidak selalu harus datang dari matahari.' }],
        },
      ],
    },
    {
      _key: 'chapter-5',
      title: 'Bab 5: Ratapan Itu',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Ratapan itu tidak terdengar. Ia hanya bisikan di dalam hati, sebuah doa yang tidak pernah sampai ke langit karena terlalu lemah.' }],
        },
      ],
    },
    {
      _key: 'chapter-6',
      title: 'Penutup: Jangan Jadi Cahaya',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Jangan jadi cahaya untuk orang lain hingga api dalam dirimu padam. Pelajari cara menjadi cahaya untuk dirimu sendiri dulu.' }],
        },
      ],
    },
  ],

  // Seni Menyeduh Kehidupan - 13 chapters
  'seni-menyeduh-kehidupan': [
    {
      _key: 'chapter-0',
      title: 'Kata Pengantar',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kopi mengajarkan kesabaran — bukan hanya dalam menunggu tetesan yang jatuh perlahan, tetapi juga dalam memahami bahwa setiap hal memiliki waktunya sendiri.' }],
        },
      ],
    },
    {
      _key: 'chapter-1',
      title: 'Pendahuluan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kopi adalah tentang keseimbangan — antara rasa, waktu, dan ketepatan. Setiap unsur saling melengkapi, menghadirkan harmoni yang tak dapat diciptakan dengan satu elemen saja.' }],
        },
      ],
    },
    {
      _key: 'chapter-2',
      title: 'Bab 1: Dari Biji ke Jiwa',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Setiap kali aku menggenggam segenggam biji kopi, ada perasaan hangat yang sulit dijelaskan—seolah aku sedang memegang sesuatu yang hidup.' }],
        },
      ],
    },
    {
      _key: 'chapter-3',
      title: 'Bab 2: Air dan Keseimbangan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Setelah biji kopi digiling dengan hati-hati, ada satu elemen yang menentukan segalanya: air. Tanpa air, kopi hanyalah bubuk pahit tanpa makna.' }],
        },
      ],
    },
    {
      _key: 'chapter-4',
      title: 'Bab 3: Suhu, Tekanan, dan Ketahanan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Di balik setiap cangkir espresso yang sempurna, ada kekuatan yang sering diabaikan: tekanan. Tanpa tekanan, tidak ada crema, tidak ada rasa yang kuat, tidak ada aroma yang menonjol.' }],
        },
      ],
    },
    {
      _key: 'chapter-5',
      title: 'Bab 4: Grind Size',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Ukuran gilingan adalah bahasa yang tidak pernah kita bicarakan tapi selalu kita dengar. Terlalu halus, kopi jadi pahit. Terlalu kasar, rasa tidak keluar.' }],
        },
      ],
    },
    {
      _key: 'chapter-6',
      title: 'Bab 5: Waktu Seduh',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Waktu adalah musuh sekaligus sahabat. Terlalu cepat, ekstraksi tidak sempurna. Terlalu lama, kopi over-extracted dan menjadi pahit yang tidak perlu.' }],
        },
      ],
    },
    {
      _key: 'chapter-7',
      title: 'Bab 6: Rasa',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Rasa adalah bahasa universal yang tidak perlu diterjemahkan. Ia berbicara langsung ke ingatan, ke emosi, ke bagian dari diri kita yang tidak bisa dijelaskan dengan kata-kata.' }],
        },
      ],
    },
    {
      _key: 'chapter-8',
      title: 'Bab 7: Ritual',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Menyeduh kopi bukan sekadar membuat minuman. Ia adalah ritual—serangkaian gerakan yang dilakukan dengan kesadaran penuh, sebuah meditasi dalam bentuk cangkir.' }],
        },
      ],
    },
    {
      _key: 'chapter-9',
      title: 'Bab 8: Seni Menyeduh',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Seni menyeduh tidak bisa diajarkan dalam buku. Ia harus dirasakan, diulang, dan dipahami melalui kesalahan-kesalahan yang membuat kita lebih peka.' }],
        },
      ],
    },
    {
      _key: 'chapter-10',
      title: 'Bab 9: Waktu dan Keheningan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Dalam keheningan, kita belajar mendengar. Bukan hanya suara mesin atau bunyi air, tapi juga suara hati yang sering tenggelam dalam kebisingan.' }],
        },
      ],
    },
    {
      _key: 'chapter-11',
      title: 'Bab 10: Penutup',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Setiap perjalanan memiliki akhir, tapi tidak semua akhir adalah berhenti. Kadang, akhir adalah awal dari pemahaman yang lebih dalam.' }],
        },
      ],
    },
    {
      _key: 'chapter-12',
      title: 'Epilog',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Dan pada akhirnya, kita menyadari bahwa yang kita nikmati bukan hanya rasa, melainkan perjalanan itu sendiri.' }],
        },
      ],
    },
  ],

  // Di Balik Bar - 7 sections (short story format)
  'di-balik-bar': [
    {
      _key: 'chapter-1',
      title: '11 P.M. dan Kopi Tubruk yang Menunggu',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Jam sebelas malam. Café sudah tutup. Lampu tidak semuanya mati — beberapa dibiarkan menyala, cukup untuk melihat meja dan lantai yang masih basah oleh sisa hari.' }],
        },
      ],
    },
    {
      _key: 'chapter-2',
      title: 'Barista Rendahan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Aku belajar sejak awal bagaimana orang melihat barista. Tidak terang-terangan. Tidak kejam. Cukup untuk mengingatkan di mana posisiku di rantai ini.' }],
        },
      ],
    },
    {
      _key: 'chapter-3',
      title: 'Terlihat, Sebentar',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Ada momen-momen langka. Ketika seorang pelanggan benar-benar melihatku. Bukan sebagai mesin pembuat kopi, tapi sebagai manusia.' }],
        },
      ],
    },
    {
      _key: 'chapter-4',
      title: 'Suara dari Ruang Tamu',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Dari ujung telepon, suara ibunya terdengar. Mereka pikir aku tidak mendengar. Atau mungkin mereka pikir jarak akan meredam suara.' }],
        },
      ],
    },
    {
      _key: 'chapter-5',
      title: 'Tengah Malam',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Jam dua malam. Aku masih terjaga. Bukan karena insomnia. Karena kaki. Kaki yang terus berdenyut, seperti masih mengingat lantai keras café.' }],
        },
      ],
    },
    {
      _key: 'chapter-6',
      title: 'Masih Berdiri',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Aku berdiri bukan karena kuat. Bukan karena yakin akan masa depan yang cerah. Bukan karena passion yang membakar.' }],
        },
      ],
    },
    {
      _key: 'chapter-7',
      title: 'Epilog: Masih di Sini',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Dan hari ini, itu cukup. Mungkin besok juga. Mungkin selamanya.' }],
        },
      ],
    },
  ],

  // Di Atas Cangkir Yang Sama - 12 chapters
  'di-atas-cangkir-yang-sama': [
    {
      _key: 'chapter-1',
      title: 'Bab 1: Coffee Species - Arabica vs Robusta, Genus Coffea',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Tanaman kopi berasal dari genus Coffea, sebuah genus tumbuhan berbunga dalam famili Rubiaceae. Hingga saat ini, lebih dari 120 spesies Coffea telah diidentifikasi oleh para botanis.' }],
        },
      ],
    },
    {
      _key: 'chapter-2',
      title: 'Bab 2: Coffee Processing - Washed, Natural, Honey, Fermentasi',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Anatomi buah kopi secara botani disebut coffee cherry. Ia terdiri dari beberapa lapisan: kulit luar, daging buah, mucilage, kulit tanduk, dan biji kopi.' }],
        },
      ],
    },
    {
      _key: 'chapter-3',
      title: 'Bab 3: Roast Level & Flavor - Maillard, Karamelisasi, Crack',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Proses sangrai adalah transformasi kimia yang kompleks. Maillard reaction mengembangkan rasa cokelat dan kacang, sementara karamelisasi menciptakan kelemanan alami.' }],
        },
      ],
    },
    {
      _key: 'chapter-4',
      title: 'Bab 4: Grind Size & Extraction - Partikel, Fines, Boulders',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Ukuran gilingan menentukan surface area yang tersedia untuk ekstraksi. Distribusi partikel yang konsisten adalah kunci untuk hasil seduhan yang seimbang.' }],
        },
      ],
    },
    {
      _key: 'chapter-5',
      title: 'Bab 5: Espresso Fundamentals - 9 Bar, 25-30s, 1:2 Ratio',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Espresso adalah metode ekstraksi di bawah tekanan. Standar industri: 9 bar tekanan, 25-30 detik waktu ekstraksi, dan rasio 1:2 antara berat kopi dan berat output.' }],
        },
      ],
    },
    {
      _key: 'chapter-6',
      title: 'Bab 6: Taste & Sensory Science - Taste, Smell, Mouthfeel',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Persepsi rasa adalah kombinasi dari taste (lidah), smell (hidung), dan mouthfeel (tekstur). Ketiganya bersatu menciptakan pengalaman kopi yang lengkap.' }],
        },
      ],
    },
    {
      _key: 'chapter-7',
      title: 'Bab 7: Manual Brew Methods - V60, French Press, Aeropress',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Setiap metode manual brew memiliki karakteristik unik. V60 menghasilkan kopi clean dan acidity cerah, French Press memberi body tebal, Aeropress fleksibel untuk berbagai profil rasa.' }],
        },
      ],
    },
    {
      _key: 'chapter-8',
      title: 'Bab 8: Water Chemistry - TDS, Magnesium, Kalsium',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Air adalah 98% dari kopi. Kualitas air menentukan kualitas ekstraksi. Magnesium membantu mengekstrak rasa buah, kalsium menyeimbangkan acidity.' }],
        },
      ],
    },
    {
      _key: 'chapter-9',
      title: 'Bab 9: Extraction Yield - EY 18-22%, TDS Control',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Extraction yield ideal adalah 18-22%. Di bawah 18%, kopi under-extracted (asam, hambar). Di atas 22%, kopi over-extracted (pahit, astringent).' }],
        },
      ],
    },
    {
      _key: 'chapter-10',
      title: 'Bab 10: Milk Science - Protein, Microfoam, Latte Art',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Microfoam tercipta ketika protein susu terdenaturasi oleh panas dan udara. Teknik tekstur yang tepat menghasilkan foam yang halus dan creamy, sempurna untuk latte art.' }],
        },
      ],
    },
    {
      _key: 'chapter-11',
      title: 'Bab 11: Cafe Workflow - Speed, Consistency, Multi-tasking',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Workflow yang efisien adalah kunci operasi café. Bukan hanya tentang kecepatan, tapi konsistensi di tengah tekanan dan kemampuan multi-tasking tanpa mengorbankan kualitas.' }],
        },
      ],
    },
    {
      _key: 'chapter-12',
      title: 'Bab 12: Professional Mindset - Etika, Dedikasi, Manifesto Barista',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Menjadi barista profesional bukan hanya tentang membuat kopi enak. Ia tentang etika kerja, dedikasi pada kualitas, dan memahami bahwa setiap cangkir adalah representasi dari dirimu.' }],
        },
      ],
    },
  ],

  // Kami Menulis Pelan - 7 sections
  'kami-menulis-pelan': [
    {
      _key: 'chapter-0',
      title: 'Pembuka',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai. Alarm pagi belum sempat dilupakan. Layar ponsel masih perih di mata.' }],
        },
      ],
    },
    {
      _key: 'chapter-1',
      title: 'Menulis dari Sisa',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kelas pekerja menulis dari sisa. Sisa tenaga yang tidak cukup untuk tidur nyenyak. Sisa waktu yang tidak dimiliki siapa-siapa. Sisa pikiran yang belum habis dipakai bekerja.' }],
        },
      ],
    },
    {
      _key: 'chapter-2',
      title: 'Titik Berhenti',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kita berhenti bukan karena lelah menulis. Kita berhenti karena lelah berharap.' }],
        },
      ],
    },
    {
      _key: 'chapter-3',
      title: 'Yang Terdekat',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan. Buku itu ada di sana, berbulan-bulan.' }],
        },
      ],
    },
    {
      _key: 'chapter-4',
      title: 'Dunia yang Lewat',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing. Dunia tidak kejam. Ia hanya tidak berhenti.' }],
        },
      ],
    },
    {
      _key: 'chapter-5',
      title: 'Mengapa Menulis',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kita menulis bukan untuk dibaca. Kita menulis untuk tidak mati dalam diam.' }],
        },
      ],
    },
    {
      _key: 'chapter-6',
      title: 'Penutup',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Menulis pelan itu gak masalah. Yang bahaya itu berhenti.' }],
        },
      ],
    },
  ],

  // Yang Tertinggal Di Lembah - 12 chapters
  'yang-tertinggal-di-lembah': [
    {
      _key: 'chapter-0',
      title: 'Prolog: Bukit yang Menipu',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kita selalu diajarkan untuk mendaki. Tapi ada kebohongan yang lebih sunyi: bahwa perjalanan yang sesungguhnya tidak terjadi saat kita berdiri di atas, bersorak, tetapi saat kita merangkak di dasar lembah.' }],
        },
      ],
    },
    {
      _key: 'chapter-1',
      title: 'Bab I: Geografi Jiwa',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Setiap manusia membawa peta di dalam dadanya. Sejak lahir, kita sudah diprogram untuk menganggap hidup adalah garis lurus yang menanjak: lahir, sekolah, sukses, bahagia.' }],
        },
      ],
    },
    {
      _key: 'chapter-2',
      title: 'Bab II: Ontologi Janji',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Janji bukanlah sekadar rangkaian kata. Dalam dimensi yang lebih dalam, janji adalah materi yang mengokohkan realitas.' }],
        },
      ],
    },
    {
      _key: 'chapter-3',
      title: 'Bab III: Fenomenologi Lemah',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Filosofi modern sangat peduli dengan kekuatan. Tapi ada kebijaksanaan yang lebih tua, yang lebih lembut: kebijaksanaan tentang ketidakmampuan.' }],
        },
      ],
    },
    {
      _key: 'chapter-4',
      title: 'Bab IV: Arkeologi Teman',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Sejarah peradaban manusia dipenuhi dengan kisah-kisah pertempuran, penaklukan, dan pencapaian. Tapi arkeolog yang cerdas akan mencari yang lain: jejak-jejak peradaban dari barang-barang kecil yang ditinggalkan bersama.' }],
        },
      ],
    },
    {
      _key: 'chapter-5',
      title: 'Bab V: Etika dalam Kesetiaan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kesetiaan bukan tentang tidak pergi. Kesetiaan adalah tentang tetap hadir bahkan ketika hadir itu tidak nyaman, bahkan ketika tidak ada yang melihat.' }],
        },
      ],
    },
    {
      _key: 'chapter-6',
      title: 'Bab VI: Topografi Kehilangan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kehilangan memiliki topografi sendiri. Ada lembah-lembah yang dalam, bukit-bukit yang terjal, dan jalan-jalan yang berkelok tanpa ujung yang terlihat.' }],
        },
      ],
    },
    {
      _key: 'chapter-7',
      title: 'Bab VII: Komunitas sebagai Perlawanan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Komunitas yang terbentuk di lembah bukan komunitas yang dipilih, melainkan komunitas yang terpaksa bertemu karena tidak punya tempat lain untuk pergi.' }],
        },
      ],
    },
    {
      _key: 'chapter-8',
      title: 'Bab VIII: Mistika Kegelapan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Di kegelapan lembah, kita belajar melihat dengan cara yang berbeda. Bukan dengan mata, tapi dengan hati yang terbiasa meraba dalam ketidakpastian.' }],
        },
      ],
    },
    {
      _key: 'chapter-9',
      title: 'Bab IX: Genealogi Janji',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Setiap janji memiliki riwayat. Ia tidak muncul dari kekosongan. Janji adalah warisan, adalah beban, adalah anugerah yang diturunkan dari generasi ke generasi.' }],
        },
      ],
    },
    {
      _key: 'chapter-10',
      title: 'Bab X: Praktik Kehadiran',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kehadiran adalah praktik, bukan status. Ia harus dilakukan berulang-ulang, setiap hari, bahkan ketika kita tidak merasa ingin hadir.' }],
        },
      ],
    },
    {
      _key: 'chapter-11',
      title: 'Epilog: Bukit yang Terlupakan',
      content: [
        {
          _type: 'block',
          _key: 'p1',
          style: 'normal',
          children: [{ _type: 'span', text: 'Buku ini bukan tentang cara mencapai puncak. Ini tentang mereka yang tetap berada di lembah bersamamu ketika semua orang sudah berlari menuju cahaya.' }],
        },
      ],
    },
  ],
}

async function populateAllChapters() {
  console.log('Fetching existing books...')
  const books = await client.fetch(`*[_type == "book"]`)

  console.log(`Found ${books.length} books`)

  for (const book of books) {
    const slug = book.slug?.current
    if (!slug) {
      console.log(`Skipping book without slug: ${book.title}`)
      continue
    }

    const chapters = bookChapters[slug]
    if (!chapters) {
      console.log(`No chapters data for ${slug}, skipping`)
      continue
    }

    try {
      // Replace existing chapters completely with new complete data
      await client.patch(book._id).set({ chapters }).commit()
      console.log(`✓ Updated ${book.title} with ${chapters.length} chapters`)
    } catch (error) {
      console.error(`✗ Failed to update ${book.title}:`, error)
    }
  }

  console.log('\nDone! All books now have complete chapter data.')
}

populateAllChapters().catch(console.error)
