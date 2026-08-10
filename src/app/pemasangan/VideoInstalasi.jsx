"use client";

import React, { useState, useEffect, useRef } from "react";
import { Pagination } from "flowbite-react";

export default function VideoInstalasi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const activityTimeoutRef = useRef(null);
  const itemsPerPage = 10;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Asumsi API mengambil dari collection "video-pemasangans"
        const res = await fetch(
          `${baseUrl}/api/video-instalasis?filters[$or][0][kategori][$eq]=nichiha&filters[$or][1][kategori][$null]=true&populate=*`
        );
        const result = await res.json();
        setData(result.data || []);
      } catch (error) {
        console.error("Gagal mengambil data video instalasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setExpandedId(null); // Tutup video yang sedang aktif jika user ganti halaman
  };

  const toggleVideo = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Fungsi untuk mendeteksi pergerakan/aktivitas mouse
  const handleUserActivity = () => {
    setIsUserActive(true);
    if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
    // Setelah 3 detik tidak ada pergerakan, sembunyikan kembali teks
    activityTimeoutRef.current = setTimeout(() => {
      setIsUserActive(false);
    }, 1000);
  };

  // Efek untuk memantau status Play/Pause
  useEffect(() => {
    if (!isVideoPlaying) {
      setIsUserActive(true);
      if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
    } else {
      handleUserActivity();
    }
    return () => {
      if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
    };
  }, [isVideoPlaying]);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsVideoPlaying(false);
    setIsUserActive(true);
    document.body.style.overflow = "hidden"; // Mencegah scrolling pada body saat modal terbuka
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsVideoPlaying(false);
    if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="w-full flex flex-col gap-4 font-display">
      {loading ? (
        <p className="text-center text-gray-500 py-10">Memuat video instalasi...</p>
      ) : currentData.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {currentData.map((item) => {
              // Memastikan video selalu dibaca sebagai array
              const videos = Array.isArray(item.video) ? item.video : (item.video ? [item.video] : []);

              return ( 
                <div
                  key={item.id}
                  className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                    {/* Bagian Kiri: Ikon Play & Judul */}
                    <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                      <div className="p-3 bg-red-50 rounded-lg text-red-600 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.judul_instalasi}
                      </h3>
                    </div>

                    {/* Bagian Kanan: Tombol Aksi */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {videos.length === 1 ? (
                        <button
                          onClick={() => openModal({ url: `${baseUrl}${videos[0].url}`, title: item.judul_instalasi })}
                          className="flex-1 sm:flex-none text-center px-5 py-2.5 text-sm font-medium text-white bg-[#0253AE] rounded-lg hover:bg-[#013774] transition-colors"
                        >
                          Lihat Video
                        </button>
                      ) : videos.length > 1 ? (
                        <button
                          onClick={() => toggleVideo(item.id)}
                          className={`flex-1 sm:flex-none text-center px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                            expandedId === item.id 
                            ? "text-[#0253AE] bg-blue-50 border border-[#0253AE]" 
                            : "text-white bg-[#0253AE] hover:bg-[#013774]"
                          }`}
                        >
                          {expandedId === item.id ? "Tutup" : `Lihat Daftar (${videos.length})`}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400 italic w-full text-center sm:text-left">Video tidak tersedia</span>
                      )}
                    </div>
                  </div>

                  {/* Area Dropdown List Sub-Video (Jika > 1 file) */}
                  {expandedId === item.id && videos.length > 1 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 w-full flex flex-col gap-4">
                      {videos.map((vid, idx) => (
                        <div key={vid.id || idx} className="flex flex-col border border-gray-200 rounded-lg p-3 bg-gray-50">
                          <div className="flex justify-between items-center w-full">
                            <span className="font-semibold text-sm text-gray-700 break-words pr-2">
                              {vid.name ? vid.name.replace(/\.[^/.]+$/, "") : `Video ${idx + 1}`}
                            </span>
                            <button
                              onClick={() => openModal({ url: `${baseUrl}${vid.url}`, title: item.judul_instalasi })}
                              className="px-4 py-1.5 text-xs font-medium text-white bg-[#0253AE] rounded-md hover:bg-[#013774] transition-colors whitespace-nowrap"
                            >
                              Lihat Video
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div> 
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 py-10">Belum ada video instalasi.</p>
      )}

      {/* Modal Popup Viewer Video Custom */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8">
          <button 
            onClick={closeModal}
            onMouseEnter={handleUserActivity}
            className="absolute top-4 right-4 z-[60] text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-300"
            aria-label="Tutup Modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="w-full max-w-5xl relative bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center"
            onMouseMove={handleUserActivity}
            onClick={handleUserActivity}
            onTouchStart={handleUserActivity}
          >
            {/* Overlay Judul bergaya Netflix (Memudar saat play) */}
            <div className={`absolute top-0 left-0 w-full z-10 pointer-events-none transition-opacity duration-700 ease-in-out bg-gradient-to-b from-black/90 via-black/40 to-transparent pt-6 pb-20 px-4 sm:px-12 ${!isUserActive && isVideoPlaying ? "opacity-0" : "opacity-100"}`}>
              <h3 className="text-2xl sm:text-3xl md:text-[2rem] md:leading-[3.5rem] font-bold text-white drop-shadow-lg line-clamp-2">
                {selectedVideo.title}
              </h3>
            </div>

              {selectedVideo.url && (
            <video
                  src={selectedVideo.url}
                  controls
                  controlsList="nodownload"
                  autoPlay
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                    className="w-full max-h-[85vh] object-contain"
                >
                  Browser Anda tidak mendukung tag video ini.
                </video>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
