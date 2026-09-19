import React from "react";
import Image from "next/image";

/** Helper: ambil kelas gradien fallback berdasarkan kategori */
export function getCoverFallbackClass(category: string | undefined): string {
  if (!category) return "cov-renungan";
  const c = category.toLowerCase();
  if (c.includes("refleksi")) return "cov-refleksi";
  if (c.includes("filosofi")) return "cov-filosofi";
  return "cov-renungan";
}

interface BookCoverProps {
  cover?: string;
  category?: string;
  children?: React.ReactNode;
  className?: string;
  priority?: boolean;
}

/** 
 * Komponen cover buku yang menampilkan gambar asli dari database. 
 * Jika tidak ada gambar, akan menampilkan fallback gradien warna 
 * sesuai kategori.
 */
export default function BookCover({
  cover,
  category,
  children,
  className = "",
  priority = false,
}: BookCoverProps) {
  const fallbackClass = getCoverFallbackClass(category);
  
  return (
    <div className={`${className} ${fallbackClass} book-cov-wrap`} data-tilt-cov>
      {cover && (
        <Image
          src={cover}
          alt=""
          fill
          sizes="(max-width:480px) 45vw, (max-width:768px) 42vw, 300px"
          className="book-cov-img"
          style={{ objectFit: "cover", objectPosition: "center" }}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      )}
      {/* overlay gelap agar teks tetap terbaca */}
      <div className="book-cov-overlay" />
      {children}
    </div>
  );
}
