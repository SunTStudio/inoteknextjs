import React from "react";
import CarouselSection from "./CarouselSection";
import CompanyIntroduce from "./CompanyIntroduce";
import BrandIntroduce from "./BrandIntroduce";
import VisiMisiSection from "./VisiMisiSection";
import InotekSection from "./InotekSection";
import ProductSection from "../nichiha/ProductSection";
import NewsSection from "../nichiha/NewsSection";
import DistributionSection from "../nichiha/DistributionSection";

export default function CompanyProfile() {
  return (
    <>
      <CarouselSection />
      <CompanyIntroduce />
      <VisiMisiSection />
      <InotekSection />
      <BrandIntroduce />  
      <DistributionSection />
      <NewsSection />
    </>
  );
}
