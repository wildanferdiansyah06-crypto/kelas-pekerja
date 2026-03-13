import ReadingProgress from "@/src/components/ReadingProgress";
import ScrollToTop from "@/src/components/ScrollToTop";
import Footer from "@/src/components/Footer"; // tambahin ini

export default function BukuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      {/* progress bar membaca */}
      <ReadingProgress />

      {/* konten buku */}
      <main className="min-h-screen max-w-3xl mx-auto px-6 pt-24 pb-32">
        {children}
      </main>

      {/* tombol scroll */}
      <ScrollToTop />

      {/* footer */}
      <Footer />

    </>
  );
}
