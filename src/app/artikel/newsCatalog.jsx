import { getNewsArticles } from "@/services/newsService";
import NewsCatalogClient from "./NewsCatalogClient";

export default async function NewsCatalog() {
  const articles = await getNewsArticles();

  if (!articles || articles.length === 0) {
    return (
      <section className="min-h-screen content flex items-center justify-center text-gray-600">
        Tidak ada artikel berita saat ini.
      </section>
    );
  }

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return <NewsCatalogClient initialArticles={sortedArticles} />;
}
