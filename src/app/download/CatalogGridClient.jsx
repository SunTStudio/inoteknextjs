"use client";

import { useEffect, useState } from "react";
import EcatalogForm from "./EcatalogForm";

function triggerDownload(url) {
  if (!url) return;

  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function CatalogGridClient({ initialCatalogs = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCatalog, setActiveCatalog] = useState(null);

  const openModal = (catalog) => {
    setActiveCatalog(catalog);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveCatalog(null);
  };

  const handleSuccess = () => {
    const url = activeCatalog?.catalogFile;
    closeModal();
    triggerDownload(url);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-wrap justify-start gap-6 py-6">
        {initialCatalogs.map((catalog) => (
          <button
            key={catalog.id}
            type="button"
            onClick={() => openModal(catalog)}
            className="text-left shadow-[4px_4px_2px_0_rgba(0,0,0,0.15)] hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group bg-white border border-gray-200 flex flex-col w-full sm:w-[260px]"
          >
            <div className="w-full h-72 sm:h-80 md:h-[340px] bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
              <img
                src={catalog.coverImage}
                alt={catalog.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-center mt-auto w-full">
              <p className="text-center font-bold text-base md:text-lg text-[#0253AE]">
                {catalog.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 font-display">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Isi form untuk download</p>
                <h3 className="text-xl font-bold text-[#0253AE]">
                  {activeCatalog?.title || "E-Catalog"}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                aria-label="Tutup"
              >
                Tutup
              </button>
            </div>

            <div className="mt-5">
              <EcatalogForm
                catalogTitle={activeCatalog?.title}
                onCancel={closeModal}
                onSuccess={handleSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
