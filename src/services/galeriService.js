export async function galeriService(category = "nichiha") {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

  const res = await fetch(
    `${baseUrl}/api/galeris?filters[kategori][$eq]=${category}&populate=*&sort=createdAt:desc&pagination[limit]=100`,
    { next: { revalidate: 21600 } }
  );

  if (!res.ok) {
    console.error("Gagal fetch data galeri dari Strapi API", await res.text());
    return [];
  }

  const { data } = await res.json();
  return data || [];
}
