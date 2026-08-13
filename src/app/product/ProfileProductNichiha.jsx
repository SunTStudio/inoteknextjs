"use client";

import React, { useState } from "react";

export default function ProfileProductNichiha() {
  const slides = [
    {
      title: "Premium Japanese Standard",
      icon: "/icons/premium-quality.png",
      image: "/images/PremiumJapanese.jpg",
      reverse: false,
    },
    {
      title: "Easy Maintenance",
      icon: "/icons/house.png",
      image: "/images/EasyMaintenance.jpg",
      reverse: true,
    },
    {
      title: "Easy Installation",
      icon: "/icons/easy-installation.png",
      image: "/images/fireresistant.png",
      reverse: false,
    },
    {
      title: "High-Durability Material",
      icon: "/icons/reliability.png",
      image: "/images/HighDur.jpg",
      reverse: true,
    },
    {
      title: "High-End Design",
      icon: "/icons/modern-house.png",
      image: "/images/HighEnd.jpg",
      reverse: false,
    },
  ];

  const scrollRef = React.useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
      
      {/* Section 1: USP Carousel (Full Width) */}
      <div className="relative w-full mb-12">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto snap-x snap-mandatory h-[320px] sm:h-[350px] md:h-[400px] w-full cursor-grab active:cursor-grabbing scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full shrink-0 snap-start select-none flex flex-col sm:flex-row overflow-hidden">
              {!slide.reverse ? (
                <>
                  {/* Image */}
                  <div className="w-full sm:w-1/2 h-1/2 sm:h-full relative pointer-events-none">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Text */}
                  <div className="w-full sm:w-1/2 h-1/2 sm:h-full bg-[#EAEAEA] flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16 text-center pointer-events-none">
                    <img
                      src={slide.icon}
                      alt={slide.title}
                      className="size-10 sm:size-16 mb-2 object-contain"
                    />
                    <span className="font-bold text-gray-800 text-xs sm:text-lg md:text-xl leading-tight">
                      {slide.title}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* Text */}
                  <div className="w-full sm:w-1/2 h-1/2 sm:h-full bg-[#EAEAEA] flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16 text-center pointer-events-none">
                    <img
                      src={slide.icon}
                      alt={slide.title}
                      className="size-10 sm:size-16 mb-2 object-contain"
                    />
                    <span className="font-bold text-gray-800 text-xs sm:text-lg md:text-xl leading-tight">
                      {slide.title}
                    </span>
                  </div>
                  {/* Image */}
                  <div className="w-full sm:w-1/2 h-1/2 sm:h-full relative pointer-events-none">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Wrapper Part 1 (Logo & About) */}
      <div className="w-full lg:px-40 px-4 pt-12 mx-auto">
        
        {/* Section 2: Logo and About Nichiha */}
        <div className="flex flex-col items-start mb-10">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mb-4">
            <img
              src="/images/nichiha_logo.png"
              alt="NICHIHA Logo"
              className="h-16 md:h-20 object-contain"
            />
          </div>
          <h2 className="text-[#013774] font-bold text-2xl md:text-3xl mb-3">
            About NICHIHA
          </h2>
          <p className="text-gray-600 text-base leading-relaxed text-justify">
            Brand global asal Jepang dengan pengalaman lebih dari 70 tahun dalam sistem fasad arsitektural modern. Digunakan pada berbagai proyek residensial dan komersial, dengan standar kualitas dan ketahanan tinggi.
          </p>
        </div>
      </div>

      {/* Section 3: What is Nichiha? (Full Width Green banner) */}
      <div className="w-full bg-[#008B47] text-white py-10 lg:px-40 px-4 mb-12">
        <div className="w-full mx-auto">
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            What is NICHIHA?
          </h3>
          <p className="text-base leading-relaxed">
            <span className="font-bold">NICHIHA EX Series</span> merupakan produk panel fasad berbahan <span className="italic">fiber cement</span> (semen yang dikombinasikan dengan partikel kayu berserat), dicetak menghasilkan tekstur permukaan khusus <span className="italic">pre-finished</span> (sudah dilapisi cat dan coating) dengan motif pilihan yang beragam.
          </p>
        </div>
      </div>

      {/* Main Content Wrapper Part 2 (Sizing & Rainscreen) */}
      <div className="w-full lg:px-40 px-4 pb-12 mx-auto">

        {/* Section 4: Sizing Details */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Sizing 1: EX-Series 3030 */}
          <div className="flex flex-col md:flex-row items-center justify-center p-6 rounded-2xl gap-12 md:gap-24">
            <div className="flex-initial">
              <h4 className="font-bold text-xl md:text-2xl text-[#013774] mb-3">
                EX-Series 3030
              </h4>
              <table className="text-lg md:text-xl text-gray-700 mb-8">
                <tbody>
                  <tr>
                    <td className="font-medium py-1 pr-4">Ukuran</td>
                    <td className="py-1">: 455 mm (L) x 3030 mm (P)</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4">Ketebalan</td>
                    <td className="py-1">: 16mm</td>
                  </tr>
                </tbody>
              </table>
              <h4 className="font-bold text-xl md:text-2xl text-[#013774] mb-3">
                EX-Series 1820
              </h4>
              <table className="text-lg md:text-xl text-gray-700">
                <tbody>
                  <tr>
                    <td className="font-medium py-1 pr-4">Ukuran</td>
                    <td className="py-1">: 455 mm (L) x 1820 mm (P)</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4">Ketebalan</td>
                    <td className="py-1">: 16mm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex-initial max-w-xl w-full flex justify-center">
              <img
                src="/images/ExSeries3030.webp"
                alt="EX-Series 3030"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>

        {/* Section 5: Rainscreen System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white py-6">
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
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
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
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
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
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
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
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
                    Berfungsi sebagai tahap pemasangan awal dan memastikan proses pemasangan yang cepat dan rata.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
