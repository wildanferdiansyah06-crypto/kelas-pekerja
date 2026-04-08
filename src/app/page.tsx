import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const pageData = await getPageData();
  
  return <HomePageClient {...pageData} />;
}
