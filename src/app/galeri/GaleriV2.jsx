"use client";

import React, { useState, useEffect } from "react";

// Image Slider component for lightbox modal
function ImageSlider({ images, baseUrl, title, description }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

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
        let displayDesc = description || (title ? img.caption : "");
        if (displayTitle === displayDesc) {
          displayDesc = "";
        }

        return (
          <div
            key={img.id || idx}
            className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="relative inline-flex flex-col items-center max-w-full max-h-full">
              <img
                src={`${baseUrl}${img.url}`}
                alt={img.alternativeText || title || `Slide ${idx + 1}`}
                className="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain block rounded-t-lg"
              />
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

      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default function GaleriV2({ category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          `${baseUrl}/api/galeris?filters[kategori][$eq]=${category}&populate=*&sort=nama_project:asc&pagination[limit]=100`
        );
        if (res.ok) {
          const json = await res.json();
          const items = json.data || [];
          setData(items);
        }
      } catch (err) {
        console.error("Error fetching galeri v2 data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category, baseUrl]);

  const openModal = (item) => {
    setSelectedProject(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  // Safe repeating CSS grid spans to create a seamless mosaic/bento pattern in a 3-column layout
  const getGridClasses = (index) => {
    const patternIndex = index % 8;
    switch (patternIndex) {
      case 0:
        return "md:col-span-2 md:row-span-2"; // 2x2 Large Highlight
      case 1:
        return "md:col-span-1 md:row-span-2"; // 1x2 Vertical Rectangle
      case 2:
        return "md:col-span-1 md:row-span-1"; // 1x1 Standard Square
      case 3:
        return "md:col-span-2 md:row-span-1"; // 2x1 Horizontal Rectangle
      case 4:
        return "md:col-span-1 md:row-span-2"; // 1x2 Vertical Rectangle
      case 5:
        return "md:col-span-2 md:row-span-2"; // 2x2 Large Highlight
      case 6:
        return "md:col-span-2 md:row-span-1"; // 2x1 Horizontal Rectangle
      case 7:
        return "md:col-span-1 md:row-span-1"; // 1x1 Standard Square
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="w-full text-center py-12 flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#013774]"></div>
        <p className="text-gray-500 font-display">Memuat galeri v2...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full text-center py-12 text-gray-500 font-display">
        Belum ada foto yang tersedia untuk versi ini.
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-6 py-4">
      {/* Bento/Mosaic Repeating Grid Pattern */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto auto-rows-[300px]">
        {data.map((item, index) => {
          const imageUrl = `${baseUrl}${item.thumbnail?.url || item.image?.[0]?.url}`;
          return (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className={`relative group overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer block h-full w-full ${getGridClasses(index)}`}
            >
              <img
                src={imageUrl}
                alt={item.nama_project || item.title || "Project Image"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              
              {/* Blue Overlay (Nichiha USA style) */}
              <div className="absolute inset-0 bg-[#013774]/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out p-6 text-center">
                <h3 className="text-white font-display font-bold text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4 leading-snug transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.nama_project || item.title || "Project Gallery"}
                </h3>
                <div className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center text-white text-3xl font-light hover:bg-white hover:text-[#013774] transition-all duration-300 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  +
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8">
          {/* Close Button */}
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

              // Filter out orphaned/lingering images that have different upload dates (Strapi bug protection)
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
                        {selectedProject.description && selectedProject.description !== (selectedProject.nama_project || filteredImages[0].caption) && (
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
                      {selectedProject.description && selectedProject.description !== (selectedProject.nama_project || selectedProject.thumbnail.caption) && (
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
    </div>
  );
}
