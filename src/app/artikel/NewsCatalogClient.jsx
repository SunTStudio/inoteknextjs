"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Dropdown, DropdownItem } from "flowbite-react";
import NewsCard from "../components/NewsCard";

export default function NewsCatalogClient({ initialArticles = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const unique = new Set(
      initialArticles
        .map((a) => a?.category)
        .filter((c) => typeof c === "string" && c.trim().length > 0)
    );

    return ["Semua", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return initialArticles.filter((a) => {
      if (!a) return false;

      const categoryOk =
        selectedCategory === "Semua" || a.category === selectedCategory;

      const queryOk =
        normalizedQuery.length === 0 ||
        String(a.title || "")
          .toLowerCase()
          .includes(normalizedQuery);

      return categoryOk && queryOk;
    });
  }, [initialArticles, selectedCategory, query]);

  const cardVariants = {
    hidden: { y: 14, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.25 } },
    exit: { y: -10, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <section className="min-h-screen content flex flex-col gap-8 w-full my-10 py-6 font-display">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl text-[#013774]">
            Artikel
          </h1>
          <p className="text-gray-500">Semua artikel terbaru dari Inotek.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="w-full sm:w-72">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul artikel..."
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0253AE]/40"
            />
          </div>

          <Dropdown
            label={selectedCategory}
            className="bg-white border-[#0253AE] border text-[#0253AE] hover:text-white w-64 justify-between transition-all duration-200 cursor-pointer"
          >
            {categories.map((category) => (
              <DropdownItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start"
      >
        <AnimatePresence mode="popLayout">
          {filteredArticles.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-gray-500 py-10"
            >
              Tidak ada artikel yang sesuai filter.
            </motion.div>
          ) : (
            filteredArticles.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <NewsCard {...item} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
