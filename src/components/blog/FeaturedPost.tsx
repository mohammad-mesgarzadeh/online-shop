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
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  minHeight: "350px",
                }}
              />
            </div>

            <div className="col-lg-6">
              <div className="p-5">
                <span className="badge bg-danger mb-3">
                  مقاله ویژه
                </span>

                <h2 className="fw-bold mb-3">
                  {featured.title}
                </h2>

                <p className="text-muted">
                  {featured.excerpt}
                </p>

                <button
                  className="btn btn-primary rounded-pill"
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
