import { getNewsArticles } from "@/services/newsService";

function getSiteUrl() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";
  return site.replace(/\/$/, "");
}

export default async function sitemap() {
  const siteUrl = getSiteUrl();

  const staticPaths = [
    "/",
    "/companyprofile",
    "/contactform",
    "/distributor",
    "/download",
    "/product",
  ];

  const now = new Date();
  const staticEntries = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changefreq: "weekly",
    priority: path === "/" ? 1.0 : 0.7,
  }));

  let newsEntries = [];
  try {
    const articles = await getNewsArticles();
    newsEntries = (articles || []).map((a) => ({
      url: `${siteUrl}${a.link}`,
      lastModified: a.createdAt ? new Date(a.createdAt) : now,
      changefreq: "weekly",
      priority: 0.6,
    }));
  } catch (err) {
    console.error("sitemap: failed to load news articles", err);
  }

  let productEntries = [];
  try {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    if (apiBase) {
      const res = await fetch(
        `${apiBase}/api/types?pagination[pageSize]=1000`,
        { next: { revalidate: 21600 }, }
      );
      if (res.ok) {
        const json = await res.json();
        const items = json?.data || [];
        productEntries = items
          .filter((t) => t?.documentId)
          .map((t) => ({
            url: `${siteUrl}/product/productdetail/${t.documentId}`,
            lastModified: t.updatedAt
              ? new Date(t.updatedAt)
              : t.createdAt
                ? new Date(t.createdAt)
                : now,
            changefreq: "monthly",
            priority: 0.5,
          }));
      } else {
        console.error("sitemap: failed to fetch product types", res.status);
      }
    }
  } catch (err) {
    console.error("sitemap: error building product entries", err);
  }

  return [...staticEntries, ...newsEntries, ...productEntries];
}
