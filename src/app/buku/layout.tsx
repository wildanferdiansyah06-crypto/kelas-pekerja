import ReadingProgress from "@/src/components/ReadingProgress";

export default function BukuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {/* Progress bar membaca */}
      <ReadingProgress />

      {/* Konten buku - tanpa pb-32 yang besar */}
      <main className="flex-1 w-full pt-0 px-0">
        {children}
      </main>
    </div>
  );
}
