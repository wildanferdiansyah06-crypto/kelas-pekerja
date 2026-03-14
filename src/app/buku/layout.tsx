import ReadingProgress from "@/src/components/ReadingProgress";
import ScrollToTop from "@/src/components/ScrollToTop";
import Footer from "@/src/components/Footer";

export default function BukuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Progress bar membaca */}
      <ReadingProgress />

      {/* Konten buku */}
      <main className="flex-1 max-w-3xl mx-auto px-6 pt-24 pb-32">
        {children}
      </main>

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Footer tetap muncul */}
      <Footer />

    </div>
  );
}
