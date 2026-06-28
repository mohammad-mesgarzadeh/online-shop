import BlogHero from "../components/blog/BlogHero";
import FeaturedPost from "../components/blog/FeaturedPost";
import BlogGrid from "../components/blog/BlogGrid";
import BlogCategories from "../components/blog/BlogCategories";

export default function Blog() {
  return (
    <>
      <BlogHero />
      <FeaturedPost />
      <BlogCategories />
      <BlogGrid />
    </>
  );
}