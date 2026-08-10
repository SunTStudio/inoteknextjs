"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PetunjukPemasanganNICHIHA from "./PetunjukPemasanganNICHIHA";
import PetunjukPemasanganLUUM from "./PetunjukPemasanganLUUM";

function PemasanganContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "nichiha";
  const [activeTab, setActiveTab] = useState("nichiha");

  // Sinkronisasi state tab dengan parameter URL (?category=)
  useEffect(() => {
    if (category === "luum" || category === "nichiha") {
      setActiveTab(category);
    }
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-10 text-center text-[#013774] uppercase tracking-wide">
        Petunjuk Pemasangan
      </h1>

      {/* Tab Buttons */}
      <div className="flex border-b border-gray-200 w-full mb-10">
        <button
          onClick={() => setActiveTab("nichiha")}
          className={`flex-1 py-4 text-center font-bold transition-all duration-300 text-sm sm:text-base border-b-2 uppercase tracking-wider ${
            activeTab === "nichiha"
              ? "border-[#013774] text-white bg-[#013774]"
              : "border-transparent text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50"
          }`}
        >
          Nichiha
        </button>
        <button
          onClick={() => setActiveTab("luum")}
          className={`flex-1 py-4 text-center font-bold transition-all duration-300 text-sm sm:text-base border-b-2 uppercase tracking-wider ${
            activeTab === "luum"
              ? "border-[#013774] text-white bg-[#013774]"
              : "border-transparent text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50"
          }`}
        >
          Luum
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "nichiha" ? (
          <PetunjukPemasanganNICHIHA />
        ) : (
          <PetunjukPemasanganLUUM />
        )}
      </div>
    </div>
  );
}

export default function PemasanganPage() {
  return (
    <section className="min-h-screen flex items-start justify-center text-gray-600 pt-10">
      <Suspense fallback={<div className="text-center py-12">Memuat halaman...</div>}>
        <PemasanganContent />
      </Suspense>
    </section>
  );
}