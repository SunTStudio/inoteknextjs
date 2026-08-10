import React from "react";
import ProductCatalog from "./ProductCatalogs";
import ProductCatalogLUUM from "./ProductCatalogsLUUM";
import CatalogSectionFilter from "../download/CatalogSectionFilter";
import ProfileProductLUUM from "./ProfileProductLUUM";
import ProfileProductNichiha from "./ProfileProductNichiha";

export const dynamic = "force-dynamic";
export default async function ProductCatalogPage({ searchParams }) {

  const params = await searchParams;
  const category = params?.category || "nichiha";

  if (category === "luum") {
    return (
        <>
          <ProfileProductLUUM />
          <ProductCatalogLUUM />
          <CatalogSectionFilter category={category} />
        </>
      );
  }

  return (
        <>
          <ProfileProductNichiha />
          <ProductCatalog />
          <CatalogSectionFilter category={category} />
        </>
      );
}
