import { MetadataRoute } from "next";
import booksData from "@/public/data/books.json";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kelaspekerja.site";

  const staticPages = [
    "",
    "/buku",
    "/tentang",
    "/simpanan",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const bookPages = (booksData.books as any[]).map((book) => ({
    url: `${baseUrl}/buku/${book.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...bookPages];
}
