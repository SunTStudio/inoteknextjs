import React from "react";

export default function VisiMisiCard({ title, children, textAlign }) {
  return (
    <div 
      className="font-display h-full flex flex-col bg-white border border-gray-250 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"
    >
      {/* Header Block (Judul bg biru teks putih) */}
      <div className="bg-[#013774] py-4 md:py-5 px-6">
        <h2 className="text-white font-bold text-xl md:text-2xl lg:text-3xl tracking-wide text-center">
          {title}
        </h2>
      </div>

      {/* Content Body (bg putih) */}
      <div className={`text-gray-600 p-8 md:p-10 text-base md:text-lg leading-relaxed flex-1 flex flex-col justify-center ${textAlign || ""}`}>
        {children}
      </div>
    </div>
  );
}
