import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import CategoriesSection from "../components/home/CategoriesSection";
import BestSellingProducts from "../components/home/BestSellingProducts";
import PromotionalBanners from "../components/home/PromotionalBanners";
import NewsletterSection from "../components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <BestSellingProducts />
        <PromotionalBanners />
        <NewsletterSection />
      </>
    </>
  );
}