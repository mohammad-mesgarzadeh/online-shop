import { useNavigate } from "react-router-dom";
import { blogArticles } from "../../data/blog";

export default function FeaturedPost() {
  const navigate = useNavigate();
  const featured = blogArticles[0];

  if (!featured) return null;

  return (
    <section className="pb-5">
      <div className="container">
        <div
          className="card border-0 shadow rounded-5 overflow-hidden"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/blog/${featured.id}`)}
        >
          <div className="row g-0">
            <div className="col-lg-6">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-100 h-100 featured-post-image"
                style={{
                  objectFit: "cover",
                  minHeight: "250px",
                }}
                loading="lazy"
              />
            </div>

            <div className="col-lg-6">
              <div className="p-4 p-md-5">
                <span className="badge bg-danger mb-3">
                  مقاله ویژه
                </span>

                <h2 className="fw-bold mb-3" style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)" }}>
                  {featured.title}
                </h2>

                <p className="text-muted text-truncate-3">
                  {featured.excerpt}
                </p>

                <button
                  className="btn btn-primary rounded-pill touch-target"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/blog/${featured.id}`);
                  }}
                >
                  مطالعه مقاله
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
