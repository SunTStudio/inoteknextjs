import React from "react";
import Link from "next/link";
import { getNewsArticles } from "@/services/newsService";

export default async function RelatedNews({ currentCategory, currentSlug }) {
  const articles = await getNewsArticles();

  const filtered = articles.filter(
    (article) =>
      article.category === currentCategory &&
      article.link !== `/artikel/${currentSlug}`,
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Artikel Lainnya</h2>
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400">Tidak ada artikel terkait</p>
        )}
        {filtered.slice(0, 5).map((article) => (
          <Link
            key={article.id}
            href={article.link}
            className="flex md:flex-col lg:flex-row items-center gap-3 hover:opacity-80"
          >
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                width={100}
                height={60}
                className="rounded-md object-cover h-24 w-34 lg:w-34 md:w-full shrink-0"
              />
            ) : (
              <div className="rounded-md bg-gray-200 h-24 w-34 lg:w-34 md:w-full shrink-0"></div>
            )}
            <div className="lg:self-start md:text-center lg:text-start">
              <p className="text-sm text-gray-500">{article.category}</p>
              <h3 className="font-semibold text-sm xl:text-lg">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
