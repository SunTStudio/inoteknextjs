"use client";

import React, { useState, useEffect } from "react";
import { Pagination } from "flowbite-react";

export default function PetunjukInstalasiLUUM() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/petunjuk-instalasis?filters[kategori][$eq]=luum&populate=*`
        );
        const result = await res.json();
        setData(result.data || []);
      } catch (error) {
        console.error("Gagal mengambil data petunjuk instalasi LUUM:", error);
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
    setExpandedId(null);
  };

  const toggleDoc = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-4 font-display">
      {loading ? (
        <p className="text-center text-gray-500 py-10">
          Memuat petunjuk instalasi LUUM...
        </p>
      ) : currentData.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {currentData.map((item) => {
              const docs = Array.isArray(item.document)
                ? item.document
                : item.document
                ? [item.document]
                : [];

              return (
                <div
                  key={item.id}
                  className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                    {/* Bagian Kiri: Ikon & Judul */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="p-3 bg-blue-50 rounded-lg text-[#0253AE] shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.judul_instalasi}
                      </h3>
                    </div>

                    {/* Bagian Kanan: Tombol Aksi */}
                    <div className="flex flex-col gap-3 w-full sm:w-auto">
                      {docs.length === 1 ? (
                        <div className="flex items-center gap-3 w-full sm:justify-between">
                          <button
                            onClick={() =>
                              setSelectedDoc({
                                url: `${baseUrl}${docs[0].url}`,
                                title: item.judul_instalasi,
                              })
                            }
                            className="flex-1 sm:flex-none text-center px-5 py-2.5 text-sm font-medium text-white bg-[#0253AE] rounded-lg hover:bg-[#013774] transition-colors"
                          >
                            Lihat
                          </button>
                          <a
                            href={`${baseUrl}${docs[0].url}`}
                            download={docs[0].name || "Dokumen_Instalasi"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none text-center px-5 py-2.5 text-sm font-medium text-[#0253AE] bg-white border border-[#0253AE] rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            Download
                          </a>
                        </div>
                      ) : docs.length > 1 ? (
                        <button
                          onClick={() => toggleDoc(item.id)}
                          className={`flex-1 sm:flex-none text-center px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                            expandedId === item.id
                              ? "text-[#0253AE] bg-blue-50 border border-[#0253AE]"
                              : "text-white bg-[#0253AE] hover:bg-[#013774]"
                          }`}
                        >
                          {expandedId === item.id
                            ? "Tutup"
                            : `Lihat Daftar (${docs.length})`}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400 italic w-full text-center sm:text-right">
                          Dokumen tidak tersedia
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Area Dropdown Sub-Dokumen */}
                  {expandedId === item.id && docs.length > 1 && (
                    <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
                      {docs.map((doc, idx) => (
                        <div
                          key={doc.id || idx}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                        >
                          <span className="font-medium text-sm text-gray-700 break-words pr-2">
                            {doc.name
                              ? doc.name.replace(/\.[^/.]+$/, "")
                              : `Dokumen ${idx + 1}`}
                          </span>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              onClick={() =>
                                setSelectedDoc({
                                  url: `${baseUrl}${doc.url}`,
                                  title: item.judul_instalasi,
                                })
                              }
                              className="flex-1 sm:flex-none text-center px-4 py-2 text-xs font-medium text-white bg-[#0253AE] rounded-md hover:bg-[#013774] transition-colors"
                            >
                              Lihat
                            </button>
                            <a
                              href={`${baseUrl}${doc.url}`}
                              download={doc.name || "Dokumen_Instalasi"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 sm:flex-none text-center px-4 py-2 text-xs font-medium text-[#0253AE] bg-white border border-[#0253AE] rounded-md hover:bg-blue-50 transition-colors"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 py-10">
          Belum ada dokumen petunjuk instalasi LUUM.
        </p>
      )}

      {/* Modal Popup Viewer PDF */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                {selectedDoc.title || "Lihat Dokumen"}
              </h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-gray-500 hover:text-red-600 bg-gray-200 hover:bg-red-100 rounded-lg p-2 transition-colors"
                aria-label="Tutup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-0 bg-gray-100 w-full h-[75vh]">
              {selectedDoc.url && (
                <iframe
                  src={selectedDoc.url}
                  className="w-full h-full border-0"
                  title="Dokumen PDF"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
