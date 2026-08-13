import React from "react";
import ArticleSection from "./ArticleSection";
import NewsLetter from "./NewsLetter";
import { getArticleBySlug } from "@/services/newsService";
import { notFound, redirect } from "next/navigation";

function getSiteUrl() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";
  return site.replace(/\/$/, "");
}

function plainTextFromNewsContent(content) {
  if (!Array.isArray(content)) return "";

  const parts = [];
  for (const block of content) {
    const children = Array.isArray(block?.children) ? block.children : [];
    for (const child of children) {
      if (typeof child?.text === "string" && child.text.trim().length > 0) {
        parts.push(child.text.trim());
      }
    }
  }

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function toKeywords(value) {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string") {
    // Accept either "a,b,c" or plain text.
    const split = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return split.length > 1 ? split : [value];
  }
  return undefined;
}

function pickOgImageUrl({ seo, fallbackImageUrl }) {
  const metaImage = seo?.metaImage;

  if (typeof metaImage === "string" && metaImage.length > 0) return metaImage;
  if (typeof metaImage?.url === "string" && metaImage.url.length > 0) {
    return metaImage.url;
  }
  if (typeof fallbackImageUrl === "string" && fallbackImageUrl.length > 0) {
    return fallbackImageUrl;
  }
  return undefined;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const siteUrl = getSiteUrl();
  const canonicalSlug = article.slug || slug;
  const canonicalPath = `/artikel/${canonicalSlug}`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  const seo = article.seo || {};
  const fallbackDescription =
    article.excerpt ||
    plainTextFromNewsContent(article.newscontent).slice(0, 160) ||
    article.title;

  const metaTitle = seo.metaTitle || article.title;
  const metaDescription = seo.metaDescription || fallbackDescription;
  const ogImageUrl = pickOgImageUrl({
    seo,
    fallbackImageUrl: article?.image?.url,
  });

  return {
    metadataBase: new URL(siteUrl),
    title: metaTitle,
    description: metaDescription,
    keywords: toKeywords(seo.keywords),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Inotek NICHIHA",
      locale: "id_ID",
      type: "article",
      publishedTime: article.publishedAt || article.createdAt,
      modifiedTime: article.updatedAt,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              alt: article?.image?.alternativeText || article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function NewsDetail({ params }) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  // If the user hits /artikel/{documentId}, redirect to canonical /artikel/{slug}
  if (article?.slug && article.slug !== slug) {
    redirect(`/artikel/${article.slug}`);
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/artikel/${article.slug || slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description:
      article.excerpt ||
      plainTextFromNewsContent(article.newscontent).slice(0, 160) ||
      article.title,
    image: article?.image?.url ? [article.image.url] : undefined,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.publishedAt || article.createdAt,
    author: {
      "@type": "Organization",
      name: "Inotek Karya Mandiri",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Inotek Karya Mandiri",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleSection slug={slug} article={article} />
      <NewsLetter />
    </>
  );
}
