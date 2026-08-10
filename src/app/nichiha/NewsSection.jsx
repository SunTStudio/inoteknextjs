import NewsCard from "../components/NewsCard";
import NewsSlider from "../components/NewsSlider";
import { getNewsArticles } from "@/services/newsService";

export default async function NewsSection() {
  const articles = await getNewsArticles();

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center bg-[#0253AE] py-10 text-white text-xl">
        Tidak ada artikel berita saat ini.
      </div>
    );
  }

  const newestArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <section id="artikel" className="bg-[#0253AE] w-full py-9 relative select-none">
      <NewsSlider>
        {newestArticles.map((item) => (
          <div
            key={item.id}
            className="news-item shrink-0 snap-center mx-auto w-[300px] sm:w-[360px] md:w-[420px] lg:w-[500px]"
          >
            <NewsCard {...item} />
          </div>
        ))}
      </NewsSlider>
    </section>
  );
}
