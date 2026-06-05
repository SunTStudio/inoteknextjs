export async function galeriService() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

  const res = await fetch(
    `${baseUrl}/api/galeris?populate=*&sort=createdAt:desc&pagination[limit]=100`,
    { next: { revalidate: 21600 } } // revalidasi otomatis setiap 6 jam
  );

  if (!res.ok) {
    console.error("Gagal fetch data dari Strapi API", await res.text());
    return [];
  }

  const { data } = await res.json();
  return data || [];
}
