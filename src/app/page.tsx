import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";
import { Suspense } from "react";

// Loading fallback component
function HomePageLoading() {
  return (
    <div className="flex items-center justify-center bg-[#faf8f5] dark:bg-[#1a1816]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b7355] dark:border-[#a08060] mx-auto mb-4"></div>
        <p className="text-[#8b7355] dark:text-[#a08060] text-sm">Memuat...</p>
      </div>
    </div>
  );
}

// Error fallback component
function HomePageError() {
  return (
    <div className="flex items-center justify-center bg-[#faf8f5] dark:bg-[#1a1816]">
      <div className="text-center">
        <p className="text-red-500 mb-4">Gagal memuat halaman</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#8b7355] text-white rounded hover:bg-[#6b5a45]"
        >
          Muat Ulang
        </button>
      </div>
    </div>
  );
}

export default async function HomePage() {
  try {
    const pageData = await getPageData();
    
    return (
      <Suspense fallback={<HomePageLoading />}>
        <HomePageClient {...pageData} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading homepage data:", error);
    return <HomePageError />;
  }
}
