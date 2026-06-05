"use client";

import React, { useState, useEffect } from "react";
import { Pagination } from "flowbite-react";

// Komponen Slider Ringan Anti-Bug (Pengganti Flowbite Carousel)
function ImageSlider({ images, baseUrl, title, slug }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Berhenti slide jika kursor di atas gambar (pauseOnHover)
    if (isHovered || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Ganti gambar setiap 5 detik
    
    return () => clearInterval(timer);
  }, [images.length, isHovered, currentIndex]);

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div 
      className="h-full w-full relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img, idx) => {
        // CEK DI CONSOLE BROWSER (F12)
        console.log(`[Slide ${idx}] Data gambar utuh:`, img);
        console.log(`[Slide ${idx}] Nilai caption:`, img.caption);

        return (
          <div 
            key={img.id || idx} 
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={`${baseUrl}${img.url}`}
              alt={img.alternativeText || title || slug || `Galeri ${idx + 1}`}
              className="w-full h-full object-contain"
            />
            {/* Overlay Caption dari API */}
            {img.caption && (
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm md:text-base px-4 py-3 text-center backdrop-blur-sm z-20">
                {img.caption}
              </div>
            )}
          </div>
        );
      })}

      {/* Tombol Navigasi Kiri */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Tombol Navigasi Kanan */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

export default function GaleriClient({ data, baseUrl }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const itemsPerPage = 12;

  // console.log(data[0].image[0].url);
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data?.slice(startIndex, startIndex + itemsPerPage) || [];
  
  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (item) => {
    // CEK DATA PROJECT SAAT DI KLIK
    console.log("--- PROJECT DIKLIK ---");
    console.log("Data:", item); 
    
    setSelectedProject(item);
    document.body.style.overflow = "hidden"; // Mencegah scrolling pada body saat modal terbuka
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };
  
  return (
    <>
      <div className="flex flex-wrap justify-start gap-6">
        {currentData.length > 0 ? (
          currentData.map((item, index) => (
            <div
              key={item.id}
              className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col group cursor-pointer"
              onClick={() => openModal(item)}
            >
              {(item.thumbnail || (Array.isArray(item.image) && item.image.length > 0)) && (
                <div className="h-80 md:h-[400px] w-full relative">
                    <div className="block h-full w-full overflow-hidden">
                      <img
                      src={`${baseUrl}${item.thumbnail?.url || item.image?.[0]?.url}`}
                      alt={item.thumbnail?.alternativeText || item.image?.[0]?.alternativeText || item.nama_project || item.title || "Galeri Thumbnail"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                  {/* Overlay Deskripsi saat di-hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 pointer-events-none">
                    <h3 className="font-bold text-white text-base mb-1 line-clamp-2 drop-shadow-md">
                      {item.nama_project || item.title || "Project Galeri"}
                    </h3>
                    {item.description && item.description !== item.nama_project && (
                      <p className="text-sm text-gray-200 line-clamp-3 drop-shadow-md">
                        {item.description}
                      </p>
                    )}
                  </div>  
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="w-full text-center text-gray-500">Belum ada foto di galeri.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      )}

      {/* Modal / Lightbox */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8">
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 z-[60] text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
            aria-label="Tutup Modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-full max-w-5xl h-[60vh] md:h-[80vh] relative bg-transparent rounded-lg overflow-hidden flex items-center justify-center">
            {Array.isArray(selectedProject.image) && selectedProject.image.length > 0 ? (
              selectedProject.image.length > 1 ? (
                <ImageSlider images={selectedProject.image} baseUrl={baseUrl} title={selectedProject.nama_project || selectedProject.title} slug={selectedProject.slug} />
              ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={`${baseUrl}${selectedProject.image[0].url}`}
                  alt={selectedProject.image[0].alternativeText || selectedProject.nama_project || "Galeri"}
                  className="max-w-full max-h-full object-contain"
                />
                {selectedProject.image[0].caption && (
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm md:text-base px-4 py-3 text-center backdrop-blur-sm z-20">
                    {selectedProject.image[0].caption}
                  </div>
                )}
              </div>
              )
            ) : selectedProject.thumbnail ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={`${baseUrl}${selectedProject.thumbnail.url}`}
                alt={selectedProject.thumbnail.alternativeText || selectedProject.nama_project || "Galeri"}
                className="max-w-full max-h-full object-contain"
              />
              {selectedProject.thumbnail.caption && (
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm md:text-base px-4 py-3 text-center backdrop-blur-sm z-20">
                  {selectedProject.thumbnail.caption}
                </div>
              )}
            </div>
            ) : (
              <p className="text-white">Tidak ada gambar yang tersedia.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}