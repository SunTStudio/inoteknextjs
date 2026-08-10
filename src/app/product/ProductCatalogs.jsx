import { Suspense } from "react";
import Tabs from "./TabsProduct";

const getStrapiUrl = (file, baseUrl) => {
  if (!file) return null;

  const rawUrl =
    // pakai paling besar dulu
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

export default async function ProductCatalogPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

  try {
    const res = await fetch(
      `${baseUrl}/api/types?populate=*&pagination[pageSize]=1000`,
      { next: { revalidate: 21600 } }
    );

    if (!res.ok) throw new Error("Gagal fetch data");

    const { data } = await res.json();

    const types = data.map((t) => ({
      id: t.id,
      documentId: t.documentId,
      product: t.product?.Name || "",
      size: t.Size || "N/A",
      weight: t.Weight || "N/A",
      packaging: t.Packaging || "N/A",
      category: t.Kind || "Uncategorized",

      coverImage: getStrapiUrl(t.CoverImage, baseUrl),
      headerImage: getStrapiUrl(t.HeaderImage, baseUrl),
    }));

    return (
      <section id="daftar-produk" className="lg:px-40 px-4 py-6 min-h-screen w-full bg-white text-gray-900">
        <Suspense fallback={<p className="text-center">Loading produk...</p>}>
          <Tabs initialData={types} />
        </Suspense>
      </section>
    );
  } catch (error) {
    console.error("❌ Error fetching product types:", error);

    return (
      <p className="text-center text-red-500">Gagal memuat katalog produk.</p>
    );
  }
}
