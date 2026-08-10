"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TabsLUUM({ initialData }) {
  const catalogData = initialData || [];

  // Dapatkan daftar jenis/produk unik LUUM jika ada, atau tampilkan semua
  const uniqueProducts = [
    ...new Set(catalogData.map((item) => item.product).filter(Boolean)),
  ].sort((a, b) => b.localeCompare(a));

  const [activeProduct, setActiveProduct] = useState(
    uniqueProducts[0] || ""
  );

  const isTileCeilingPanel = activeProduct.toUpperCase() === "TILE CEILING PANEL";
  const isBathroomCeilingPanel = activeProduct.toUpperCase() === "BATHROOM CEILING PANEL";

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

  const filteredData = activeProduct
    ? catalogData.filter((item) => item.product === activeProduct)
    : catalogData;

  return (
    <div className="w-full font-display">
      <div className="text-center my-6">
        <h1 className="text-3xl font-bold text-[#013774]">Katalog Produk LUUM</h1>
        <p className="text-gray-600 mt-2">
          Jelajahi berbagai varian produk berkualitas dari LUUM.
        </p>
      </div>

      {/* Tab Filter Seri/Produk LUUM */}
      {uniqueProducts.length > 0 && (
        <div className="flex border-b justify-evenly border-gray-200 relative mb-8">
          {uniqueProducts.map((prod) => (
            <button
              key={prod}
              onClick={() => setActiveProduct(prod)}
              className="relative px-6 py-2 text-xs lg:text-lg w-full"
            >
              {activeProduct === prod && (
                <motion.div
                  layoutId="activeLuumProductHighlight"
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
      )}

      {/* Grid Konten Produk LUUM */}
      {isTileCeilingPanel ? (
        // NEW LAYOUT FOR TILE CEILING PANEL (2 Columns Grid)
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-col"
              >
                {/* Header Image as wide image */}
                {item.headerImage ? (
                  <div className="w-full h-48 sm:h-64 md:h-72 overflow-hidden ">
                    <img
                      src={item.headerImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 ">
                    Tidak ada gambar header
                  </div>
                )}

                {/* Content area: Specification image left, details right */}
                <div className="py-8 flex flex-col sm:flex-row gap-8 items-center">
                  {/* Left Column: Specification Image */}
                  {item.specificationImage ? (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden flex items-center justify-center">
                      <img
                        src={item.specificationImage}
                        alt="Specification"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center text-gray-350 text-xs">
                      No spec image
                    </div>
                  )}

                  {/* Right Column: Details */}
                  <div className="flex-1 flex flex-col gap-3 text-left w-full">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-tight">
                      {item.name}
                    </h3>

                    {/* Dimensi */}
                    <div>
                      <span className="inline-block bg-[#1A1A1A] text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wide rounded">
                        Dimensi (L × W × Thickness)
                      </span>
                      <p className="text-gray-700 text-base mt-1 font-medium">• {item.size}</p>
                    </div>

                    {/* Grid for Tipe and Warna Tersedia */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Tipe */}
                      <div>
                        <span className="inline-block bg-[#1A1A1A] text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wide rounded">
                          Tipe
                        </span>
                        <p className="text-gray-700 text-base mt-1 font-medium">• {item.packaging}</p>
                      </div>

                      {/* Warna Tersedia */}
                      <div>
                        <span className="inline-block bg-[#1A1A1A] text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wide rounded">
                          Warna Tersedia
                        </span>
                        <p className="text-gray-700 text-base mt-1 font-medium">• {item.weight}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Belum ada produk LUUM yang tersedia saat ini.
            </div>
          )}
        </div>
      ) : isBathroomCeilingPanel ? (
        // NEW LAYOUT FOR BATHROOM CEILING PANEL (Single stacked column layout)
        <div className="mt-12 flex flex-col gap-12 w-full max-w-4xl mx-auto">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="w-full flex flex-col gap-8">
                {/* Header Image as wide image */}
                {item.headerImage ? (
                  <div className="w-full overflow-hidden ">
                    <img
                      src={item.headerImage}
                      alt={item.name}
                      className="w-full h-auto object-cover "
                    />
                  </div>
                ) : null}

                {/* Description Text */}
                {item.size && item.size !== "N/A" && (
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify px-2 whitespace-pre-line">
                    {item.size}
                  </p>
                )}

                {/* Specification Images stacked vertically */}
                {item.specifications && item.specifications.length > 0 && (
                  <div className="flex flex-col gap-8 w-full">
                    {item.specifications.map((spec) => (
                      <div key={spec.id} className="w-full overflow-hidden">
                        <img
                          src={spec.url}
                          alt="Specification Image"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              Belum ada produk LUUM yang tersedia saat ini.
            </div>
          )}
        </div>
      ) : (
        // OLD LAYOUT FOR OTHER PRODUCTS (Without Link)
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="h-full  overflow-hidden mx-auto p-3 w-full bg-white"
              >
                {item.coverImage && (
                  <img
                    src={item.coverImage}
                    alt={item.name || item.product}
                    className=" w-full object-cover"
                  />
                )}

                <div className="mt-2 grid grid-cols-3 gap-5">
                  {(Array.isArray(item.colours)
                    ? item.colours.slice(0, 3)
                    : []
                  ).map((c) => (
                    <div key={c.id || Math.random()} className="text-center">
                      {c.url && (
                        <img
                          src={c.url}
                          alt=""
                          className="w-full h-20 object-cover rounded-md border border-gray-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Belum ada produk LUUM yang tersedia saat ini.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
