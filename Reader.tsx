import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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

return (
<div className="min-h-screen bg-[#f6f4ef] dark:bg-[#1c1c1c] text-black dark:text-white">

  <div className="max-w-6xl mx-auto px-5 py-8">

    {/* HEADER */}
    <Link
      to="/rak"
      className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6"
    >
      <ArrowLeft size={16}/>
      Kembali ke Rak
    </Link>

    {/* TITLE */}
    <h1 className="text-3xl md:text-4xl font-serif">
      {buku.judul}
    </h1>

    <p className="opacity-60 mt-2 mb-6">
      oleh {buku.penulis}
    </p>

    {/* PDF */}
    <div className="w-full h-[90vh] rounded-xl overflow-hidden shadow-lg bg-white">

      <embed
        src={buku.file}
        type="application/pdf"
        className="w-full h-full"
      />

    </div>

  </div>

</div>

);
}
