import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Plus, X } from "lucide-react";

const BUKU = [
{
id: "1",
judul: "Seni Menyeduh Kehidupan",
penulis: "Wildan Ferdiansyah",
halaman: 45,
readTime: "25 menit",
cover: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800",
preview: "Catatan tentang bagaimana kita menyeduh kehidupan dengan lebih pelan dan penuh makna."
},
{
id: "2",
judul: "Di Balik Bar",
penulis: "Wildan Ferdiansyah",
halaman: 38,
readTime: "20 menit",
cover: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800",
preview: "Cerita pendek dari sudut pandang seorang barista tentang percakapan dan kopi."
},
{
id: "3",
judul: "Di Atas Cangkir Yang Sama",
penulis: "Wildan Ferdiansyah",
halaman: 52,
readTime: "30 menit",
cover: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800",
preview: "Renungan tentang konsistensi dan menemukan makna dalam rutinitas."
},
{
id: "4",
judul: "Kami Menulis Pelan",
penulis: "Wildan Ferdiansyah",
halaman: 41,
readTime: "22 menit",
cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800",
preview: "Tulisan yang lahir dari kesabaran dan proses yang pelan."
}
];

export default function Rak() {

const [selectedBook, setSelectedBook] = useState<any>(null);
const [showContact, setShowContact] = useState(false);

const closeModal = () => {
setSelectedBook(null);
};

return (

<div className="min-h-screen bg-[#f6f4ef] dark:bg-[#1c1c1c] text-black dark:text-white"><div className="max-w-5xl mx-auto px-5 py-8">{/* HEADER */}

<div className="flex items-center justify-between mb-8"><Link
to="/"
className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"
>
<ArrowLeft size={16}/>
Beranda
</Link><button
onClick={() => setShowContact(true)}
className="flex items-center gap-2 text-sm border border-black/20 dark:border-white/20 px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"

«»

<Plus size={14}/>
Tambahkan Buku
</button></div>{/* TITLE */}

<div className="mb-10"><h1 className="text-3xl md:text-4xl font-serif">
Rak Buku
</h1><p className="opacity-60 mt-2 text-sm max-w-md">
Tempat buku-buku kecil yang lahir dari malam panjang,
kopi hangat, dan mereka yang tetap menulis meski lelah bekerja.
</p></div>{/* GRID */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">{BUKU.map((buku) => (

<button
key={buku.id}
onClick={() => setSelectedBook(buku)}
className="text-left group"

«»

<div className="bg-white dark:bg-[#2a2a2a] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"><div className="aspect-[3/4] overflow-hidden">
<img
src={buku.cover}
className="w-full h-full object-cover group-hover:scale-105 transition"
/>
</div><div className="p-3">
<h3 className="text-sm font-medium leading-snug">
{buku.judul}
</h3><p className="text-xs opacity-60 mt-1">
{buku.penulis}
</p>
</div></div></button>))}

</div></div>{/* MODAL PREVIEW BUKU */}
{selectedBook && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"><div className="bg-white dark:bg-[#1f1f1f] max-w-lg w-full rounded-xl overflow-hidden shadow-xl"><div className="h-48 overflow-hidden">
<img
src={selectedBook.cover}
className="w-full h-full object-cover"
/>
</div><div className="p-6"><div className="flex justify-between items-start mb-3"><h2 className="text-xl font-serif">
{selectedBook.judul}
</h2><button onClick={closeModal}>
<X size={18}/>
</button></div><p className="text-sm opacity-60 mb-4">
oleh {selectedBook.penulis}
</p><p className="text-sm leading-relaxed opacity-80 mb-4">
{selectedBook.preview}
</p><div className="flex items-center gap-4 text-xs opacity-60 mb-6">
<span>{selectedBook.halaman} halaman</span>
<span>•</span>
<span>{selectedBook.readTime}</span>
</div><Link
to={`/buku/${selectedBook.id}`}
className="flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black py-2 rounded-lg text-sm hover:opacity-90 transition"
>
<BookOpen size={16}/>
Baca Buku
</Link></div></div></div>)}

{/* MODAL KONTAK */}
{showContact && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6"><div className="bg-white dark:bg-[#1f1f1f] w-full max-w-sm rounded-xl p-6"><div className="flex justify-between items-center mb-5"><h2 className="font-serif text-lg">
Kirim Bukumu
</h2><button onClick={() => setShowContact(false)}>
<X size={18}/>
</button>

</div><p className="text-sm opacity-70 mb-6">
Jika kamu ingin bukumu masuk ke rak Kelas Pekerja,
kirim melalui salah satu kontak berikut.
</p><div className="flex flex-col gap-3"><a
href="mailto:wildanferdiansyah06@gmail.com"
className="border rounded-lg px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"

«»

📧 Email
</a>

<a
href="https://wa.me/6281234567890"
className="border rounded-lg px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"

«»

💬 WhatsApp
</a>

<a
href="https://instagram.com/wildanferdiansyah06"
className="border rounded-lg px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"

«»

📷 Instagram
</a>

</div></div></div>)}

</div>);
}
