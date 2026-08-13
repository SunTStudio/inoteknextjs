"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Tabs({ initialData }) {
  const searchParams = useSearchParams();
  const seriesFromURL = searchParams.get("series");

  const [activeProduct, setActiveProduct] = useState("EX Series 1820");
  const [activeCategory, setActiveCategory] = useState("Simple");

  const catalogData = initialData;

  const productList = [
    "EX Series 1820",
    "EX Series 3030",
    "EX Series 3030 New Introduction",
  ];

  const categoryMap = {
    "EX Series 1820": ["Simple", "Designer", "Wood", "Stone", "Tile/Brick"],
    "EX Series 3030": ["Simple", "Designer", "Wood", "Stone", "Tile/Brick"],
    "EX Series 3030 New Introduction": [
      "Simple",
      "Designer",
      "Wood",
      "Stone",
      "Tile/Brick",
    ],
  };

  // 🧩 Set tab awal dari query param
  useEffect(() => {
    if (seriesFromURL && productList.includes(seriesFromURL)) {
      setActiveProduct(seriesFromURL);
      setActiveCategory(categoryMap[seriesFromURL][0]);
    }
  }, [seriesFromURL]);

  // 📜 Auto-scroll ke bagian katalog jika hash ada di URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#daftar-produk") {
      const element = document.getElementById("daftar-produk");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, []);

  const filteredData = catalogData.filter(
    (item) => item.product === activeProduct && item.category === activeCategory
  );

  return (
    <div className="w-full font-display">
      <div className="text-center my-6">
        <h1 className="text-3xl font-bold text-[#013774]">Katalog Produk NICHIHA</h1>
        <p className="text-gray-600 mt-2">
          Jelajahi berbagai varian produk berkualitas dari NICHIHA.
        </p>
      </div>

      {/* Tab Produk */}
      <div className="flex border-b justify-evenly border-gray-200 relative">
        {productList.map((prod) => (
          <button
            key={prod}
            onClick={() => {
              setActiveProduct(prod);
              setActiveCategory(categoryMap[prod][0]);
            }}
            className="relative px-6 py-2 text-xs lg:text-lg w-full"
          >
            {activeProduct === prod && (
              <motion.div
                layoutId="activeProductHighlight"
                className="absolute inset-0 bg-[#0253AE]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
            <span
              className={`relative z-10 ${
                activeProduct === prod ? "text-white" : "text-gray-800"
              }`}
            >
              {prod}
            </span>
          </button>
        ))}
      </div>
      {/* Tab Kategori */}
      <div className="flex justify-evenly gap-8 mt-6 relative">
        {categoryMap[activeProduct].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative pb-1 text-sm xl:text-lg w-full text-center"
          >
            <span
              className={`${
                activeCategory === cat
                  ? "text-[#0253AE]"
                  : "text-gray-800 hover:text-[#0253AE]"
              }`}
            >
              {cat}
            </span>

            {activeCategory === cat && (
              <motion.div
                layoutId="activeCategoryUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0253AE]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </button>
        ))}
      </div>
      {/* Konten */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Link
              key={item.id}
              href={`/product/productdetail/${item.documentId}`}
            >
              <div className="border-t border-s border-gray-300 h-full rounded-xl overflow-hidden mx-auto p-3 shadow-[4px_4px_2px_0_rgba(0,0,0,0.25)] hover:shadow-lg transition-shadow duration-300 w-full">
                {item.coverImage && (
                  <img
                    src={item.coverImage}
                    alt={`${item.product} - ${item.category}`}
                    className="rounded-xl w-full object-cover"
                  />
                )}

                <div className="mt-2 grid grid-cols-3 gap-5">
                  {(Array.isArray(item.colours)
                    ? item.colours.slice(0, 3)
                    : []
                  ).map((c) => (
                    <div key={c.id || Math.random()} className="text-center">
                      {c.url ? (
                        <img
                          src={c.url}
                          alt={c.caption}
                          className="w-full h-20 object-cover rounded-md border border-gray-400"
                        />
                      ) : (
                        <div className="w-full h-20 flex items-center justify-center bg-gray-100 text-xs text-gray-500 rounded-md">
                          {c.caption || "No Image"}
                        </div>
                      )}
                      <p className="text-sm mt-1">{c.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No data available for {activeProduct} / {activeCategory}.
          </p>
        )}
      </div>
    </div>
  );
}
