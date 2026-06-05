"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import PetunjukInstalasi from "./PetunjukInstalasi";
import VideoInstalasi from "./VideoInstalasi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
 
export default function PemasanganClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("petunjuk");

  // Sinkronkan tab aktif dengan parameter URL di awal render & setiap URL berubah
  useEffect(() => {
    const tab = searchParams.get("instalasi");
    if (tab === "video" || tab === "petunjuk") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("instalasi", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full mx-auto">
      {/* Wrapper Tab Menu */}
      <div className="flex border-b justify-evenly border-gray-200 relative">
        <button
          onClick={() => handleTabChange("petunjuk")}
          className="relative px-6 py-2 text-xs lg:text-lg w-full"
        >
          {activeTab === "petunjuk" && (
            <motion.div
              layoutId="pemasanganTab"
              className="absolute inset-0 bg-[#0253AE]"
            />
          )}
          <span className={`relative z-10 transition-colors duration-300 ${activeTab === "petunjuk" ? "text-white" : "text-gray-800"}`}>
            Petunjuk Instalasi
          </span>
        </button>
        
        <button
          onClick={() => handleTabChange("video")}
          className="relative px-6 py-2 text-xs lg:text-lg w-full"
        >
          {activeTab === "video" && (
            <motion.div
              layoutId="pemasanganTab"
              className="absolute inset-0 bg-[#0253AE]"
            />
          )}
          <span className={`relative z-10 transition-colors duration-300 ${activeTab === "video" ? "text-white" : "text-gray-800"}`}>
            Video Instalasi
          </span>
        </button>
      </div>
 
      {/* Area Konten Tab */}
      <div className="mt-8">
        {activeTab === "petunjuk" ? <PetunjukInstalasi /> : <VideoInstalasi />}
      </div>
    </div>
  );
}