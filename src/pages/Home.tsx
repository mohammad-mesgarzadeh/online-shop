import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import CategoriesSection from "../components/home/CategoriesSection";
import BestSellingProducts from "../components/home/BestSellingProducts";
import NewArrivalsSection from "../components/home/NewArrivalsSection";
import PromotionalBanners from "../components/home/PromotionalBanners";
import BrandStorySection from "../components/home/BrandStorySection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CollectionsSection from "../components/home/CollectionsSection";
import InstagramSection from "../components/home/InstagramSection";
import NewsletterSection from "../components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <BestSellingProducts />
      <PromotionalBanners />
      <NewArrivalsSection />
      <CollectionsSection />
      <BrandStorySection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}
