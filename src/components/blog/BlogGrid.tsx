import BlogCard from "./BlogCard";
import { blogArticles } from "../../data/blog";

export default function BlogGrid() {
  return (
    <section className="pb-5">
      <div className="container">
        <div className="row g-4">
          {blogArticles.map((post) => (
            <div
              key={post.id}
              className="col-md-6 col-xl-3"
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
