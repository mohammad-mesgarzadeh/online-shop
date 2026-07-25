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
          <div className="text-center py-5 text-muted">
            <i className="bi bi-inbox" style={{ fontSize: "2.5rem" }}></i>
            <p className="mt-3 fs-5">هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-5">
      <div className="container">
        <div className="row g-4">
          {articles.map((post) => (
            <div
              key={post.id}
              className="col-6 col-md-6 col-xl-3"
            >
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
