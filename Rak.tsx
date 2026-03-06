import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

const BUKU = [
{
id: 1,
judul: "Seni Menyeduh Kehidupan",
penulis: "Wildan Ferdiansyah",
cover: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800"
},
{
id: 2,
judul: "Di Balik Bar",
penulis: "Wildan Ferdiansyah",
cover: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800"
},
{
id: 3,
judul: "Di Atas Cangkir Yang Sama",
penulis: "Wildan Ferdiansyah",
cover: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800"
},
{
id: 4,
judul: "Kami Menulis Pelan",
penulis: "Wildan Ferdiansyah",
cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800"
}
];

export default function Rak() {

return (
<div className="min-h-screen bg-[#f6f4ef] dark:bg-[#1c1c1c] text-black dark:text-white">

  <div className="max-w-5xl mx-auto px-5 py-8">

    {/* HEADER BUTTONS */}
    <div className="flex items-center gap-3 mb-8 flex-wrap">

      <Link
        to="/"
        className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
      >
        <ArrowLeft size={14} />
        Beranda
      </Link>

      <a
        href="mailto:wildanferdiansyah06@gmail.com"
        className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm rounded-full border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        <Plus size={14} />
        Tambahkan Buku
      </a>

    </div>

    {/* TITLE */}
    <div className="mb-8">

      <h1 className="text-3xl md:text-4xl font-serif">
        Rak Buku
      </h1>

      <p className="opacity-60 mt-2 text-sm max-w-md">
        Tempat buku-buku kecil yang lahir dari malam panjang,
        kopi hangat, dan mereka yang tetap menulis meski lelah bekerja.
      </p>

    </div>

    {/* GRID BUKU */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

      {BUKU.map((buku) => (

        <Link
          key={buku.id}
          to={`/buku/${buku.id}`}
          className="group"
        >

          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col">

            {/* COVER */}
            <div className="aspect-[3/4] overflow-hidden">

              <img
                src={buku.cover}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />

            </div>

            {/* INFO */}
            <div className="p-3">

              <h3 className="text-sm font-medium leading-snug">
                {buku.judul}
              </h3>

              <p className="text-xs opacity-60 mt-1">
                {buku.penulis}
              </p>

            </div>

          </div>

        </Link>

      ))}

    </div>

    {/* FOOTER */}
    <div className="text-center mt-14 text-xs opacity-40">
      Kelas Pekerja — Arsip Sunyi Orang-Orang yang Tetap Bekerja
    </div>

  </div>

</div>

);
}
