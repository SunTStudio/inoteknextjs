"use client";

import React, { useState, useEffect } from "react";
import { Pagination } from "flowbite-react";

// Komponen Slider Ringan Anti-Bug (Pengganti Flowbite Carousel)
function ImageSlider({ images, baseUrl, title, description, slug }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
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
      className="h-full w-full relative overflow-hidden group flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img, idx) => {
        const displayTitle = title || img.caption || "";
        const displayDesc = description || (title ? img.caption : "");

        return (
          <div 
            key={img.id || idx} 
            className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="relative inline-flex flex-col items-center max-w-full max-h-full">
              <img
                src={`${baseUrl}${img.url}`}
                alt={img.alternativeText || title || slug || `Galeri ${idx + 1}`}
                className="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain block rounded-t-lg"
              />
              {/* Overlay Caption & Description disesuaikan dengan lebar gambar */}
              {(displayTitle || displayDesc) && (
                <div className="w-full bg-black/85 text-white px-6 py-3 text-center backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-1 rounded-b-lg">
                  {displayTitle && (
                    <h4 className="font-bold text-sm md:text-base leading-snug">
                      {displayTitle}
                    </h4>
                  )}
                  {displayDesc && (
                    <p className="text-xs md:text-sm text-gray-200 leading-normal max-w-3xl">
                      {displayDesc}
                    </p>
                  )}
                </div>
              )}
            </div>
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

export default function GaleriClient({ data, baseUrl, category = "nichiha" }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const itemsPerPage = 12;

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data?.slice(startIndex, startIndex + itemsPerPage) || [];
  
  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (item) => {
    setSelectedProject(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };
  
  return (
    <>
      <h1 className="text-3xl font-display font-bold mb-10 text-center text-[#013774] tracking-wide">
        Galeri Proyek {category === "nichiha" ? "NICHIHA" : "LUUM"}
      </h1>
      <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <div
              key={item.id}
              className="w-full rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col group cursor-pointer"
              onClick={() => openModal(item)}
            >
              {(item.thumbnail || (Array.isArray(item.image) && item.image.length > 0)) && (
                <>
                  <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden relative">
                    <img
                      src={`${baseUrl}${item.thumbnail?.url || item.image?.[0]?.url}`}
                      alt={item.thumbnail?.alternativeText || item.image?.[0]?.alternativeText || item.nama_project || item.title || "Galeri Thumbnail"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info di bawah gambar (Judul di kiri, Logo di kanan sebaris) */}
                  <div className="p-4 bg-white flex items-center justify-between gap-3 border-t border-gray-100 mt-auto">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-gray-800 text-sm md:text-base leading-snug break-words">
                        {item.nama_project || item.title || "Project Galeri"}
                      </h3>
                    </div>
                    <div className="shrink-0 h-6 md:h-8 flex items-center">
                      <img
                        src={category === "luum" ? "/images/luum_logo.png" : "/images/nichiha_logo.png"}
                        alt={category === "luum" ? "LUUM Logo" : "NICHIHA Logo"}
                        className="h-full object-contain"
                      />
                    </div>
                  </div>
                </>
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

          {/* Project Level Left Arrow Navigation */}
          {data.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIdx = data.findIndex((item) => item.id === selectedProject.id);
                if (currentIdx !== -1) {
                  const prevIdx = currentIdx === 0 ? data.length - 1 : currentIdx - 1;
                  setSelectedProject(data[prevIdx]);
                }
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/80 text-white rounded-full p-3 transition-all duration-300 w-12 h-12 flex items-center justify-center cursor-pointer shadow-md hover:scale-105"
              aria-label="Proyek Sebelumnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Project Level Right Arrow Navigation */}
          {data.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIdx = data.findIndex((item) => item.id === selectedProject.id);
                if (currentIdx !== -1) {
                  const nextIdx = (currentIdx + 1) % data.length;
                  setSelectedProject(data[nextIdx]);
                }
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/80 text-white rounded-full p-3 transition-all duration-300 w-12 h-12 flex items-center justify-center cursor-pointer shadow-md hover:scale-105"
              aria-label="Proyek Selanjutnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
          
          <div className="w-full max-w-5xl h-[70vh] md:h-[85vh] relative bg-transparent rounded-lg overflow-hidden flex items-center justify-center px-4 md:px-16">
            {(() => {
              const projectImages = Array.isArray(selectedProject.image) ? selectedProject.image : [];
              const thumbnail = selectedProject.thumbnail;

              // Filter out orphaned/lingering images that have different upload dates
              const filteredImages = projectImages.filter((img) => {
                if (!thumbnail) return true;
                if (img.id === thumbnail.id) return true;
                if (!img.createdAt || !thumbnail.createdAt) return true;

                const imgDate = new Date(img.createdAt).toDateString();
                const thumbDate = new Date(thumbnail.createdAt).toDateString();
                return imgDate === thumbDate;
              });

              return filteredImages.length > 0 ? (
                filteredImages.length > 1 ? (
                  <ImageSlider
                    images={filteredImages}
                    baseUrl={baseUrl}
                    title={selectedProject.nama_project || selectedProject.title}
                    description={selectedProject.description}
                    slug={selectedProject.slug}
                  />
                ) : (
                  <div className="relative inline-flex flex-col items-center justify-center max-w-full max-h-full">
                    <img
                      src={`${baseUrl}${filteredImages[0].url}`}
                      alt={filteredImages[0].alternativeText || selectedProject.nama_project || "Galeri"}
                      className="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain block rounded-t-lg"
                    />
                    {(selectedProject.nama_project || selectedProject.description || filteredImages[0].caption) && (
                      <div className="w-full bg-black/85 text-white px-6 py-3 text-center backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-1 rounded-b-lg">
                        {(selectedProject.nama_project || filteredImages[0].caption) && (
                          <h4 className="font-bold text-sm md:text-base leading-snug">
                            {selectedProject.nama_project || filteredImages[0].caption}
                          </h4>
                        )}
                        {selectedProject.description && (
                          <p className="text-xs md:text-sm text-gray-200 leading-normal max-w-3xl">
                            {selectedProject.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              ) : selectedProject.thumbnail ? (
                <div className="relative inline-flex flex-col items-center justify-center max-w-full max-h-full">
                  <img
                    src={`${baseUrl}${selectedProject.thumbnail.url}`}
                    alt={selectedProject.thumbnail.alternativeText || selectedProject.nama_project || "Galeri"}
                    className="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain block rounded-t-lg"
                  />
                  {(selectedProject.nama_project || selectedProject.description || selectedProject.thumbnail.caption) && (
                    <div className="w-full bg-black/85 text-white px-6 py-3 text-center backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-1 rounded-b-lg">
                      {(selectedProject.nama_project || selectedProject.thumbnail.caption) && (
                        <h4 className="font-bold text-sm md:text-base leading-snug">
                          {selectedProject.nama_project || selectedProject.thumbnail.caption}
                        </h4>
                      )}
                      {selectedProject.description && (
                        <p className="text-xs md:text-sm text-gray-200 leading-normal max-w-3xl">
                          {selectedProject.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-white">Tidak ada gambar detail</p>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}