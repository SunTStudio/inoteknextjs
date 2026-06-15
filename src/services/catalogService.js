const getFileUrl = (file, baseUrl) => {
  if (!file) return null;

  const rawUrl =
    file?.formats?.medium?.url ||
    file?.url ||
    null;

  if (!rawUrl) return null;

  return rawUrl.startsWith("http")
    ? rawUrl
    : `${baseUrl}${rawUrl}`;
};

export async function getCatalogData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

  try {
    const res = await fetch(
      `${baseUrl}/api/download-catalogs?populate=*`,
      {
        next: { revalidate: 21600 }, // 6 jam
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch catalog data: ${res.status}`);
    }

    const { data } = await res.json();
    if (!data) return [];

    return data.map((item) => ({
      id: item.id,
      documentId: item.documentId,
      title: item.Title || "Untitled Catalog",
      slug: item.Slug,

      coverImage: getFileUrl(item.CoverImage, baseUrl),

      catalogFile: getFileUrl(item.CatalogFile, baseUrl),

      createdAt: item.createdAt,
    }));
  } catch (error) {
    console.error("❌ Error fetching catalog data:", error);
    return [];
  }
}
