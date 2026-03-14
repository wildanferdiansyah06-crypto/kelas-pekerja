import ReadingProgress from "@/src/components/ReadingProgress";
import ScrollToTop from "@/src/components/ScrollToTop";

export default function BukuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Progress bar membaca */}
      <ReadingProgress />

      {/* Konten halaman buku */}
      <main className="min-h-screen max-w-3xl mx-auto px-6 pt-24 pb-32">
        {children}
      </main>

      {/* Tombol scroll ke atas */}
      <ScrollToTop />
    </>
  );
}
