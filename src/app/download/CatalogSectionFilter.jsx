import { getCatalogDataByCategory } from "../../services/catalogService";
import CatalogGridClient from "./CatalogGridClient";

export default async function CatalogSectionFilter({ category }) {
  const catalogs = await getCatalogDataByCategory(category);

  if (!catalogs || catalogs.length === 0) {
    return null; // Don't render the section if no catalogs exist for this category
  }

  return (
    <section className="w-full bg-white py-16 px-4 lg:px-40 font-display text-gray-800 border-t border-gray-100">
      <div className="w-full mx-auto">
        <h2 className="text-3xl text-left font-bold text-[#013774] mb-6">
          E-Catalog
        </h2>
        <CatalogGridClient initialCatalogs={catalogs} />
      </div>
    </section>
  );
}
