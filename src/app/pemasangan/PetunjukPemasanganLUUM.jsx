"use client";

import React from "react";

export default function PetunjukPemasanganLUUM() {
  return (
    <div className="w-full flex flex-col gap-10 font-display">
      
      {/* Bagian 1: Tile Ceiling Panel */}
      <div className="flex flex-col gap-4 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Tile Ceiling Panel
        </h2>
        
        {/* Gambar Skema Pemasangan */}
        <div className="w-full flex justify-center py-4">
          <img
            src="/images/petunjuk-luum-1.png"
            alt="Tile Ceiling Panel Diagram"
            className="max-w-full max-h-[550px] object-contain"
          />
        </div>

        {/* Deskripsi Pemasangan */}
        <p className="text-gray-600 text-justify text-sm md:text-base leading-relaxed">
          Sistem ini dirancang dengan struktur suspensi modular yang menggunakan hanger bolt, carrying channel, dan clip bar, sehingga pemasangan lebih presisi serta stabil. Panel dipasang dengan kuat melalui sistem clip connection, sehingga proses instalasi lebih cepat dan efisien. Dengan sistem yang lebih sederhana, waktu pemasangan dapat dipersingkat, sekaligus memastikan kualitas hasil akhir yang konsisten dan kestabilan jangka panjang.
        </p>
      </div>

      {/* Bagian 2: Bathroom Ceiling Panel */}
      <div className="flex flex-col gap-4 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Bathroom Ceiling Panel
        </h2>

        {/* Gambar Skema Pemasangan */}
        <div className="w-full flex justify-center py-4">
          <img
            src="/images/petunjuk-luum-2.png"
            alt="Bathroom Ceiling Panel Diagram"
            className="max-w-full max-h-[350px] object-contain"
          />
        </div>

        {/* Deskripsi Pemasangan */}
        {/* <p className="text-gray-600 text-justify text-sm md:text-base leading-relaxed">
          [Masukkan teks deskripsi pemasangan Bathroom Ceiling Panel di sini. Contoh: Panduan instalasi dan dimensi ruang plafon minimum, finishing sambungan dengan silicone sealant untuk area basah.]
        </p> */}
      </div>

    </div>
  );
}
