const getImageUrl = (image, baseUrl) => {
  const rawUrl = image?.formats?.medium?.url || image?.url || null;

  if (!rawUrl) return null;

  return rawUrl.startsWith("http") ? rawUrl : `${baseUrl}${rawUrl}`;
};

export async function getNewsArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

  const res = await fetch(
    `${baseUrl}/api/articles?populate=*&sort=createdAt:desc&pagination[limit]=100`,
    { next: { revalidate: 21600 } },
  );

  if (!res.ok) {
    console.error("Gagal fetch data dari Strapi API", await res.text());
    return [];
  }

  const { data } = await res.json();
  if (!data) return [];

  return data.map((doc) => ({
    id: doc.id,
    title: doc.title,
    category: doc.category?.category || "News",
    image: getImageUrl(doc.image, baseUrl),
    slug: doc?.slug?.current || doc?.slug || doc.documentId,
    link: `/news/${doc?.slug?.current || doc?.slug || doc.documentId}`,
    createdAt: doc.createdAt,
  }));
}

export async function getArticleBySlug(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  const encoded = encodeURIComponent(String(slug || ""));

  // Prefer slug, but gracefully fallback to documentId for older content.
  const slugRes = await fetch(
    `${baseUrl}/api/articles?filters[slug][$eq]=${encoded}&populate=*`,
    { next: { revalidate: 21600 } },
  );

  if (slugRes.ok) {
    const { data } = await slugRes.json();
    if (data?.[0]) {
      const doc = data[0];
      return {
        id: doc.id,
        title: doc.title,
        category: doc.category?.category || "News",
        excerpt: doc.excerpt || doc.summary || null,
        seo: doc.seo || null,
        image: {
          url: getImageUrl(doc.image, baseUrl),
          alternativeText: doc.image?.alternativeText || doc.title || "",
        },
        newscontent: doc.newscontent,
        documentId: doc.documentId,
        slug: doc?.slug?.current || doc?.slug || doc.documentId,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        publishedAt: doc.publishedAt,
      };
    }
  }

  return getArticleByDocumentId(slug);
}

export async function getArticleByDocumentId(documentId) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  const encoded = encodeURIComponent(String(documentId || ""));

  const res = await fetch(
    `${baseUrl}/api/articles?filters[documentId][$eq]=${encoded}&populate=*`,
    { next: { revalidate: 21600 } },
  );

  if (!res.ok) {
    console.error("Gagal fetch artikel tunggal", await res.text());
    return null;
  }

  const { data } = await res.json();
  if (!data?.[0]) return null;

  const doc = data[0];

  return {
    id: doc.id,
    title: doc.title,
    category: doc.category?.category || "News",
    excerpt: doc.excerpt || doc.summary || null,
    seo: doc.seo || null,
    image: {
      url: getImageUrl(doc.image, baseUrl),
      alternativeText: doc.image?.alternativeText || doc.title || "",
    },
    newscontent: doc.newscontent,
    documentId: doc.documentId,
    slug: doc?.slug?.current || doc?.slug || doc.documentId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    publishedAt: doc.publishedAt,
  };
}
