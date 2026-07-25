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
          className="card border-0 shadow-sm rounded-4 overflow-hidden"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/blog/${featured.id}`)}
        >
          <div className="row g-0">
            <div className="col-lg-6">
              <div style={{ aspectRatio: "16/10" }} className="overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="p-4 p-md-5 d-flex flex-column justify-content-center h-100">
                <span
                  className="badge rounded-pill mb-3 align-self-start"
                  style={{
                    background: "var(--c-primary)",
                    color: "#fff",
                    padding: "var(--space-1) var(--space-3)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  <i className="bi bi-star-fill me-1" />
                  مقاله ویژه
                </span>

                <h2
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                    lineHeight: "var(--leading-tight)",
                    color: "var(--c-gray-800)",
                  }}
                >
                  {featured.title}
                </h2>

                <p
                  className="text-truncate-3 mb-4"
                  style={{ color: "var(--c-gray-500)", lineHeight: "var(--leading-relaxed)" }}
                >
                  {featured.excerpt}
                </p>

                <button
                  className="btn btn-vesta-primary rounded-pill px-4 align-self-start touch-target"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/blog/${featured.id}`);
                  }}
                >
                  مطالعه مقاله
                  <i className="bi bi-arrow-left me-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
