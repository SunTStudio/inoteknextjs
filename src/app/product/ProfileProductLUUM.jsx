"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProfileProductLUUM() {
  const slides = [
    "/images/profile-slide-luum-1.png",
    "/images/profile-slide-luum-2.png",
  ];

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const goToSlide = useCallback((index) => {
    const container = scrollRef.current;
    if (container) {
      const containerWidth = container.clientWidth;
      container.style.scrollBehavior = "smooth";
      container.scrollTo({
        left: index * containerWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIdx = (prev + 1) % slides.length;
      const container = scrollRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        container.style.scrollBehavior = "smooth";
        container.scrollTo({
          left: nextIdx * containerWidth,
          behavior: "smooth",
        });
      }
      return nextIdx;
    });
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIdx = (prev - 1 + slides.length) % slides.length;
      const container = scrollRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        container.style.scrollBehavior = "smooth";
        container.scrollTo({
          left: prevIdx * containerWidth,
          behavior: "smooth",
        });
      }
      return prevIdx;
    });
  }, [slides.length]);

  // Auto slide interval (3 detik), dijeda saat hover/drag
  useEffect(() => {
    if (isDown || isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isDown, isHovered, nextSlide]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (container && container.clientWidth > 0 && !isDown) {
      const idx = Math.round(container.scrollLeft / container.clientWidth);
      if (idx >= 0 && idx < slides.length && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
    // Matikan snap agar tarikan mouse tidak jittery/tertahan
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "auto";
      scrollRef.current.style.scrollSnapType = "none";
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isDown) return;
    setIsDown(false);

    const container = scrollRef.current;
    if (container) {
      const containerWidth = container.clientWidth;
      const targetIndex = Math.round(container.scrollLeft / containerWidth);

      container.style.scrollBehavior = "smooth";
      container.scrollTo({
        left: targetIndex * containerWidth,
        behavior: "smooth",
      });
      setCurrentIndex(targetIndex);

      setTimeout(() => {
        if (container) {
          container.style.scrollSnapType = "x mandatory";
        }
      }, 400);
    }
  };

  const handleMouseUp = (e) => {
    if (!isDown) return;
    setIsDown(false);

    const container = scrollRef.current;
    if (container) {
      const containerWidth = container.clientWidth;
      const draggedDistance = e.pageX - startX;

      let targetIndex = Math.round(scrollLeft / containerWidth);

      // Jika drag lebih dari 100px, pindah slide
      if (draggedDistance < -100 && targetIndex < slides.length - 1) {
        targetIndex += 1;
      } else if (draggedDistance > 100 && targetIndex > 0) {
        targetIndex -= 1;
      }

      container.style.scrollBehavior = "smooth";
      container.scrollTo({
        left: targetIndex * containerWidth,
        behavior: "smooth",
      });
      setCurrentIndex(targetIndex);

      setTimeout(() => {
        if (container) {
          container.style.scrollSnapType = "x mandatory";
        }
      }, 400);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="w-full bg-white text-gray-800 font-display">
      
      {/* Section 1: Image Carousel (Full Width) */}
      <div
        className="relative w-full mb-12 group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex overflow-x-auto snap-x snap-mandatory h-[400px] sm:h-[500px] md:h-[550px] w-full cursor-grab active:cursor-grabbing scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full shrink-0 snap-start select-none">
              <img
                src={slide}
                alt={`LUUM showcase slide ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <button
          type="button"
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer items-center justify-center hover:scale-105 active:scale-95"
          aria-label="Previous Slide"
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer items-center justify-center hover:scale-105 active:scale-95"
          aria-label="Next Slide"
        >
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Content Wrapper Part 1 (Logo & About) */}
      <div className="w-full lg:px-40 px-4 pt-12 mx-auto">
        
        {/* Section 2: Logo and About LUUM */}
        <div className="flex flex-col items-start mb-12">
          <div className="mb-4">
            <img
              src="/images/luum_logo.png"
              alt="LUUM Logo"
              className="h-12 md:h-16 object-contain"
            />
          </div>
          <h2 className="text-[#013774] font-bold text-2xl md:text-3xl mb-3">
            About LUUM
          </h2>
          <p className="text-gray-600 text-base leading-relaxed text-justify">
            LUUM merupakan brand premium dari Korea Selatan yang sudah diproduksi sejak tahun 1994, produk utamanya ceiling panel untuk plafon berbahan material berbasis Sheet Moulding Compound (SMC). bernilai tambah baik untuk hunian maupun proyek komersial. LUUM menghadirkan solusi plafon modern yang mengutamakan kualitas, daya tahan, dan estetika untuk berbagai jenis bangunan.
          </p>
        </div>
      </div>

      {/* Section 3: Material of LUUM Indonesia (Full-Width Grey Block) */}
      <div className="w-full bg-white py-16 lg:px-40 px-4 mb-12 border-y border-gray-200">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Kolom Kiri: Gambar Showroom */}
          <div className="w-full flex justify-center h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-sm relative">
            <img
              src="/images/profile-isi-luum.png"
              alt="LUUM Showroom Ceiling"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Kolom Kanan: Detail Material */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-wide">
                <span className="text-gray-650 block text-lg font-semibold uppercase tracking-widest mb-1">Material of</span>
                <span className="text-[#013774]">LUUM INDONESIA</span>
              </h3>
              <p className="text-gray-750 text-base leading-relaxed text-justify mb-4 font-bold">
                SMC (Sheet Moulding Compound) merupakan Fiberglass reinforced composite material yang kemudian dibentuk melalui proses pencetakan pada suhu bertekanan tinggi.
              </p>
              <p className="text-gray-700 text-base leading-relaxed text-justify">
                Proses ini menghasilkan material yang kokoh, tahan lama, dimensi yang stabil, serta memiliki kualitas permukaan yang rapi and presisi.
              </p>
            </div>

            <div className="flex flex-col gap-5 mt-2">
              {/* Point 1: 100% Waterproof */}
              <div className="flex gap-4 items-start">
                <div className="size-16 shrink-0 flex items-center justify-center mt-1">
                  <img src="/icons/icon-main01.svg" alt="Waterproof" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-lg mb-0.5">
                    100% Waterproof
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
                    Total protection from water and steam. SMC is the perfect choice for keeping your bathroom's beauty free from moisture damage.
                  </p>
                </div>
              </div>

              {/* Point 2: Fireproof */}
              <div className="flex gap-4 items-start">
                <div className="size-16 shrink-0 flex items-center justify-center mt-1">
                  <img src="/icons/icon-main02.svg" alt="Fireproof" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-lg mb-0.5">
                    Fireproof
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
                    Providing an extra layer of security, our non-flammable materials will protect your valuable assets and your family.
                  </p>
                </div>
              </div>

              {/* Point 3: Anti Termite */}
              <div className="flex gap-4 items-start">
                <div className="size-16 shrink-0 flex items-center justify-center mt-1">
                  <img src="/icons/icon-main03.svg" alt="Anti Termite" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-lg mb-0.5">
                    Anti Termite
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
                    The dense material structure ensures that LUUM products will never be rotted by termites, guaranteeing long-term durability.
                  </p>
                </div>
              </div>

              {/* Point 4: Anti-fungal & bacterial */}
              <div className="flex gap-4 items-start">
                <div className="size-16 shrink-0 flex items-center justify-center mt-1">
                  <img src="/icons/icon-main04.svg" alt="Anti-fungal & bacterial" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-lg mb-0.5">
                    Anti-fungal & bacterial
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
                    Our non-porous surface inhibits the growth of mold and bacteria spores, creating a more hygienic and easy to clean environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper Part 2 (Material & Strengths) */}
      <div className="w-full lg:px-40 px-4 pb-12 mx-auto">
        
        {/* Section 4: Material & Strengths */}
        <div className="w-full text-center mb-10">
          <h2 className="text-[#013774] font-bold text-2xl md:text-3xl mb-8">
            Material & Strengths
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Strength Card 1 */}
            <div className="flex gap-4 items-center">
              <div className="size-24 shrink-0 flex items-center justify-center">
                <img src="/icons/icon-about01.svg" alt="Moisture Resistance" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Moisture Resistance</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Engineered to perform in humid environments with stable dimensions over time.
                </p>
              </div>
            </div>

            {/* Strength Card 2 */}
            <div className="flex gap-4 items-center">
              <div className="size-24 shrink-0 flex items-center justify-center">
                <img src="/icons/icon-about02.svg" alt="Durability & Safety" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Durability & Safety</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Robust surfaces and long-term reliability for residential and hospitality projects.
                </p>
              </div>
            </div>

            {/* Strength Card 3 */}
            <div className="flex gap-4 items-center">
              <div className="size-24 shrink-0 flex items-center justify-center">
                <img src="/icons/icon-about03.svg" alt="Clean Lines & Fit" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Clean Lines & Fit</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Precision panels that align easily and maintain consistent, modern aesthetics.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
