import { useState, useMemo } from "react";
import BlogHero from "../components/blog/BlogHero";
import FeaturedPost from "../components/blog/FeaturedPost";
import BlogGrid from "../components/blog/BlogGrid";
import BlogCategories from "../components/blog/BlogCategories";
import { blogArticles } from "../data/blog";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("همه");

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(blogArticles.map((a) => a.category))
    );
    return ["همه", ...cats];
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "همه") return blogArticles;
    return blogArticles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <BlogHero />
      <FeaturedPost />
      <BlogCategories
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BlogGrid articles={filteredArticles} />
    </>
  );
}