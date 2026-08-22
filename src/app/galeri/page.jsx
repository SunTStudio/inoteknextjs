import GaleriV2 from "./GaleriV2";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "nichiha";

  return (
    <section className="min-h-screen flex items-start justify-center text-gray-600 pt-10">
      <div className="container mx-auto px-4 py-8">
        <GaleriV2 category={category} />
      </div>
    </section>
  );
}