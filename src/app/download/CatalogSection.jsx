import CardCatalogGird from "./CardCatalogGird";
export default function CatalogSection() {
  return (
    <section className="content min-h-screen w-full flex flex-col my-10 font-display lg:px-40 px-4">
      <h2 className="text-3xl text-left font-bold text-[#0253AE] mb-6">
        E-Catalog
      </h2>
      <CardCatalogGird />
    </section>
  );
}
