import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

const BUKU = [
{
id: "1",
judul: "Seni Menyeduh Kehidupan",
penulis: "Wildan Ferdiansyah",
file: "/buku/seni-menyeduh-kehidupan.pdf"
},
{
id: "2",
judul: "Di Balik Bar",
penulis: "Wildan Ferdiansyah",
file: "/buku/di-balik-bar.pdf"
},
{
id: "3",
judul: "Di Atas Cangkir Yang Sama",
penulis: "Wildan Ferdiansyah",
file: "/buku/di-atas-cangkir.pdf"
},
{
id: "4",
judul: "Kami Menulis Pelan",
penulis: "Wildan Ferdiansyah",
file: "/buku/kami-menulis-pelan.pdf"
}
];

export default function Reader() {

const { id } = useParams();

const buku = BUKU.find((b) => b.id === id);

if (!buku) {
return (
<div className="min-h-screen flex items-center justify-center">
Buku tidak ditemukan
</div>
);
}

const viewerUrl = "https://docs.google.com/gview?embedded=1&url=${window.location.origin}${buku.file}";

return (
<div className="min-h-screen bg-[#f6f4ef] dark:bg-[#1c1c1c] text-black dark:text-white">

  <div className="max-w-7xl mx-auto px-5 py-8">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-6">

      <Link
        to="/rak"
        className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"
      >
        <ArrowLeft size={16}/>
        Kembali ke Rak
      </Link>

      <a
        href={buku.file}
        target="_blank"
        className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"
      >
        <BookOpen size={16}/>
        Buka di Tab Baru
      </a>

    </div>

    {/* TITLE */}
    <div className="mb-6">

      <h1 className="text-3xl md:text-4xl font-serif">
        {buku.judul}
      </h1>

      <p className="opacity-60 mt-2 text-sm">
        oleh {buku.penulis}
      </p>

    </div>

    {/* PDF VIEWER */}
    <div className="rounded-xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 bg-white">

      <iframe
        src={viewerUrl}
        className="w-full h-[85vh] md:h-[90vh]"
      />

    </div>

  </div>

</div>

);
}
