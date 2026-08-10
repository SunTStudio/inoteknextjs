"use client";
import React, { useState } from "react";
import { HR } from "flowbite-react";
import BackButton from "@/app/components/BackButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SingelProductLUUM({ product }) {
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  if (!product) {
    return <p className="text-center text-gray-500">Memuat produk LUUM...</p>;
  }

  const hasValue = (val) => {
    return val && String(val).trim().toUpperCase() !== "N/A" && String(val).trim() !== "";
  };

  const colors = product.colours || [];
  const currentColor = colors[activeColorIndex];

  const handlePrevColor = () => {
    setActiveColorIndex((prev) => (prev === 0 ? colors.length - 1 : prev - 1));
  };

  const handleNextColor = () => {
    setActiveColorIndex((prev) => (prev === colors.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="md:w-[65vw] w-[92vw] mx-auto my-10 flex flex-col gap-6">
      <BackButton href="/luum#daftar-produk" label="Kembali ke Produk" />

      {/* Main Card Container */}
      <div className="p-6 md:p-8 flex flex-col font-display bg-white border border-gray-200 shadow-xl rounded-3xl">
        
        {/* 1. Full-Width Header Image (Atas) */}
        {product.headerImage ? (
          <div className="w-full overflow-hidden rounded-2xl max-h-[420px]">
            <img
              src={product.headerImage}
              alt={product.name || product.product}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
            Tidak ada gambar header
          </div>
        )}

        <HR className="my-6 bg-gray-200" />

        {/* 2. Informasi Produk (Bawah Header Image) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Sisi Kiri: Detail Informasi */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Logo / Merek LUUM */}
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-wider text-[#0253AE]">
                LUUM
              </span>
            </div>

            {/* Nama Produk (Type Name) */}
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              {product.name || product.product || "Detail Produk LUUM"}
            </h1>

            {/* Section: Size Weight Packaging */}
            {(hasValue(product.size) || hasValue(product.weight) || hasValue(product.packaging)) && (
              <div className="flex flex-col gap-1.5 text-base text-gray-800 mt-2 font-medium">
                {hasValue(product.size) && (
                  <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-2">
                    <span className="text-gray-500">Size</span>
                    <span>: {product.size}</span>
                  </div>
                )}
                {hasValue(product.weight) && (
                  <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-2">
                    <span className="text-gray-500">Weight</span>
                    <span>: {product.weight}</span>
                  </div>
                )}
                {hasValue(product.packaging) && (
                  <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-2">
                    <span className="text-gray-500">Packaging</span>
                    <span>: {product.packaging}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Garis Pembatas Vertikal (Desktop) */}
          <div className="hidden md:flex md:col-span-1 justify-center h-full">
            <div className="w-[1px] bg-gray-200 h-full min-h-[180px]"></div>
          </div>

          {/* Sisi Kanan: Carousel Warna / Swatch Produk */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-2">
            {colors.length > 0 ? (
              <div className="flex flex-col items-center w-full max-w-[280px]">
                <div className="relative w-full flex items-center justify-center group">
                  {/* Prev Button (jika > 1 warna) */}
                  {colors.length > 1 && (
                    <button
                      onClick={handlePrevColor}
                      className="absolute left-1 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                      aria-label="Previous Color"
                    >
                      <FaChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Gambar Warna Aktif */}
                  <img
                    src={currentColor.url}
                    alt={currentColor.caption || "Product Color"}
                    className="max-h-[240px] w-full object-contain rounded-xl shadow-sm border border-gray-100"
                  />

                  {/* Next Button (jika > 1 warna) */}
                  {colors.length > 1 && (
                    <button
                      onClick={handleNextColor}
                      className="absolute right-1 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                      aria-label="Next Color"
                    >
                      <FaChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Caption Warna Tanpa Ekstensi File */}
                {currentColor.caption && (
                  <p className="mt-3 text-center text-sm font-semibold text-gray-800 tracking-wide capitalize">
                    {currentColor.caption}
                  </p>
                )}

                {/* Dots Indikator jika > 1 warna */}
                {colors.length > 1 && (
                  <div className="flex gap-1.5 mt-2">
                    {colors.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveColorIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeColorIndex === idx
                            ? "w-5 bg-[#0253AE]"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : product.coverImage ? (
              <img
                src={product.coverImage}
                alt={product.name || product.product}
                className="max-h-[260px] w-auto object-contain rounded-xl shadow-sm border border-gray-100"
              />
            ) : null}
          </div>
        </div>

        {/* 3. Gambar Spesifikasi Tambahan (Jika Ada) */}
        {product.specifications?.length > 0 && (
          <>
            <HR className="my-8 bg-gray-200" />
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-[#013774]">
                Spesifikasi Teknis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-full border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
                  >
                    <img
                      src={spec.url}
                      alt={spec.caption}
                      className="w-full object-contain max-h-[500px] rounded-xl"
                    />
                    {/* {spec.caption && (
                      <p className="mt-3 text-center text-sm font-medium text-gray-700">
                        {spec.caption}
                      </p>
                    )} */}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
