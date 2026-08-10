import { Suspense } from "react";
import TabsLUUM from "./TabsLUUM";

const getStrapiUrl = (file, baseUrl) => {
  if (!file) return null;

  const rawUrl =
    file?.formats?.large?.url ||
    file?.formats?.medium?.url ||
    file?.formats?.small?.url ||
    file?.url ||
    null;

  return rawUrl
    ? rawUrl.startsWith("http")
      ? rawUrl
      : `${baseUrl}${rawUrl}`
    : null;
};

export default async function ProductCatalogLUUMPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

  try {
    const res = await fetch(
      `${baseUrl}/api/types?filters[$or][0][kategori][$eq]=luum&filters[$or][1][product][kategori][$eq]=luum&populate=*&pagination[pageSize]=1000`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Gagal fetch data LUUM");

    const { data } = await res.json();

    const types = data.map((t) => ({
      id: t.id,
      documentId: t.documentId,
      name: t.Name || "",
      product: t.product?.Name || "",
      size: t.Size || "N/A",
      weight: t.Weight || "N/A",
      packaging: t.Packaging || "N/A",
      // category: t.Kind || "Uncategorized",

      coverImage: getStrapiUrl(t.CoverImage, baseUrl),
      headerImage: getStrapiUrl(t.HeaderImage, baseUrl),
      specificationImage: getStrapiUrl(Array.isArray(t.Specifiation) ? t.Specifiation[0] : t.Specifiation, baseUrl),
      specifications: (Array.isArray(t.Specifiation) ? t.Specifiation : t.Specifiation ? [t.Specifiation] : []).map((spec) => ({
        id: spec.id,
        url: getStrapiUrl(spec, baseUrl),
      })),
      colours: (t.Colour || []).map((col) => ({
        id: col.id,
        url: getStrapiUrl(col, baseUrl),
      })),
    }));    return (
      <section id="daftar-produk" className="lg:px-40 px-4 py-6 min-h-screen w-full bg-white text-gray-900">
        <Suspense fallback={<p className="text-center">Loading produk LUUM...</p>}>
          <TabsLUUM initialData={types} />
        </Suspense>
      </section>
    );
  } catch (error) {
    console.error("❌ Error fetching LUUM product types:", error);

    return (
      <p className="text-center text-red-500">
        Gagal memuat katalog produk LUUM.
      </p>
    );
  }
}
