import BlogCard from "./BlogCard";
import type { BlogArticle } from "../../data/blog";

type Props = {
  articles: BlogArticle[];
};

export default function BlogGrid({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <section className="pb-5">
        <div className="container">
          <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
            <div className="empty-state-icon" style={{ width: "80px", height: "80px" }}>
              <i className="bi bi-journal-text" style={{ fontSize: "2rem" }} />
            </div>
            <h4 className="empty-state-title">مقاله‌ای یافت نشد</h4>
            <p className="empty-state-desc">هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-5">
      <div className="container">
        <div className="product-grid">
          {articles.map((post) => (
            <div key={post.id}>
              <BlogCard
                id={post.id}
                title={post.title}
                image={post.image}
                date={post.date}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
