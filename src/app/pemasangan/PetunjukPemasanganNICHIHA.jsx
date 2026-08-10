"use client";

import React from "react";

export default function PetunjukPemasanganNICHIHA() {
  return (
    <div className="w-full flex flex-col gap-10 font-display">
      
      {/* Container Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200">
        
        {/* Kolom Kiri: Gambar Diagram Pemasangan */}
        <div className="w-full flex justify-center">
          <img
            src="/images/petunjuk-nichiha.png"
            alt="Rainscreen System Diagram"
            className="max-w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* Kolom Kanan: Teks Penjelasan Rainscreen System */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#013774] mb-2">
            Rainscreen System
          </h2>

          <div className="flex flex-col gap-5">
            {/* Poin 1 */}
            <div className="flex gap-3 items-start">
              <span className="text-lg font-bold text-[#013774] shrink-0 mt-0.5">①</span>
              <div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-1">
                  Klip NICHIHA
                </h4>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                  Menciptakan sistem pemasangan tersembunyi yang hampir sepenuhnya menghilangkan kebutuhan pemasangan sekrup di permukaan panel. Proses instalasi menjadi cepat dan mudah, tanpa memerlukan tenaga kontraktor khusus.
                </p>
              </div>
            </div>

            {/* Poin 2 */}
            <div className="flex gap-3 items-start">
              <span className="text-lg font-bold text-[#013774] shrink-0 mt-0.5">②</span>
              <div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-1">
                  Sistem Rainscreen dengan Drainase dan Ventilasi Belakang
                </h4>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                  Dirancang agar air dapat keluar dan udara dapat bersirkulasi dengan baik, sehingga mengurangi risiko pertumbuhan jamur dan kerusakan akibat air di dalam bangunan.
                </p>
              </div>
            </div>

            {/* Poin 3 */}
            <div className="flex gap-3 items-start">
              <span className="text-lg font-bold text-[#013774] shrink-0 mt-0.5">③</span>
              <div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-1">
                  Panel NICHIHA EX Series
                </h4>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                  Ringan, mudah dipasang, dan tersedia dalam pilihan warna yang hampir tak terbatas serta beragam pilihan tekstur yang menarik.
                </p>
              </div>
            </div>

            {/* Poin 4 */}
            <div className="flex gap-3 items-start">
              <span className="text-lg font-bold text-[#013774] shrink-0 mt-0.5">④</span>
              <div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-1">
                  Starter Track
                </h4>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                  Berfungsi sebagai tahap pemasangan awal dan memastikan proses pemasangan yang cepat dan rata.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
