import VideoSection from "./VideoSection";
import HeroSection from "./HeroSection";
import UspSection from "./UspSection";
import ProductSection from "./ProductSection";
import NewsSection from "./NewsSection";
import DistributionSection from "./DistributionSection";

export default function Home() {
  return (
    <>
      <VideoSection />
      <HeroSection />
      <UspSection />
      <div>
        <ProductSection />
        <NewsSection />
      </div>
      <DistributionSection />
    </>
  );
}
