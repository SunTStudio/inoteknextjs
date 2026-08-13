import React from "react";
import CarouselSection from "./companyprofile/CarouselSection";
import CompanyIntroduce from "./companyprofile/CompanyIntroduce";
import BrandIntroduce from "./companyprofile/BrandIntroduce";
import VisiMisiSection from "./companyprofile/VisiMisiSection";
import InotekSection from "./companyprofile/InotekSection";
import DistributionSection from "./nichiha/DistributionSection";
// import NewsSection from "./nichiha/NewsSection";

export default function Home() {
  return (
    <>
      <CarouselSection />
      <CompanyIntroduce />
      <VisiMisiSection />
      <InotekSection />
      <BrandIntroduce />  
      <DistributionSection />
      {/* <NewsSection /> */}
    </>
  );
}
