"use client";

import { useEffect, useState, use } from "react";
import SingelProductLUUM from "./SingelProductLUUM";

export default function ProductDetailLUUMPage({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(
          `${STRAPI_URL}/api/types?filters[$or][0][kategori][$eq]=luum&filters[$or][1][product][kategori][$eq]=luum&populate=*&pagination[pageSize]=1000`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Gagal fetch data LUUM");

        const json = await res.json();

        const mapped = json.data.map((t) => {
          const colours =
            t.Colour?.map((col) => {
              const rawCaption = col.caption || col.name || col.alternativeText || "";
              const cleanedCaption = rawCaption.replace(/\.(jpg|jpeg|png|webp|svg|gif)$/i, "").trim();
              const imageUrl = col.url
                ? `${STRAPI_URL}${col.url}`
                : `${STRAPI_URL}${col.formats?.medium?.url || col.formats?.small?.url}`;

              return {
                id: col.id,
                caption: cleanedCaption,
                url: imageUrl,
              };
            }) ?? [];

          const specifications =
            t.Specifiation?.map((spec) => {
              const rawCaption = spec.caption || spec.name || spec.alternativeText || "";
              const cleanedCaption = rawCaption.replace(/\.(jpg|jpeg|png|webp|svg|gif)$/i, "").trim();
              return {
                id: spec.id,
                caption: cleanedCaption,
                url: spec.url
                  ? `${STRAPI_URL}${spec.url}`
                  : `${STRAPI_URL}${spec.formats?.large?.url || spec.formats?.medium?.url}`,
              };
            }) ?? [];

          return {
            id: t.id,
            documentId: t.documentId,
            name: t.Name || "",
            product: t.product?.Name || "",
            size: t.Size || "N/A",
            weight: t.Weight || "N/A",
            packaging: t.Packaging || "N/A",
            category: t.Kind || "Uncategorized",
            coverImage: `${STRAPI_URL}${t.CoverImage?.url}` || null,
            headerImage: `${STRAPI_URL}${t.HeaderImage?.url}` || null,
            colours,
            specifications,
          };
        });

        const found = mapped.find((item) => item.documentId === id);
        setProduct(found);
      } catch (err) {
        console.error("Error fetching LUUM product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="h-12 w-12 border-4 border-gray-300 border-t-[#013774] rounded-full animate-spin"></div>
        <p className="text-[#013774] mt-3 font-medium">Loading Produk LUUM...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16 text-gray-600">
        Produk LUUM tidak ditemukan.
      </div>
    );
  }

  return <SingelProductLUUM product={product} />;
}
