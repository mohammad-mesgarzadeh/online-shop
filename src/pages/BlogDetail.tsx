import { useParams, Link } from "react-router-dom";
import { blogArticles } from "../data/blog";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const article = blogArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="container mt-5 text-center py-5">
        <i className="bi bi-exclamation-circle text-secondary" style={{ fontSize: "3rem" }}></i>
        <h3 className="fw-bold mt-3">مقاله یافت نشد</h3>
        <p className="text-muted">مقاله مورد نظر شما وجود ندارد.</p>
        <Link to="/blog" className="btn btn-primary rounded-pill">
          بازگشت به وبلاگ
        </Link>
      </div>
    );
  }

  return (
    <article className="py-5" dir="rtl">
      <div className="container">
        <nav className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">خانه</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/blog">وبلاگ</Link>
            </li>
            <li className="breadcrumb-item active">{article.title}</li>
          </ol>
        </nav>

        <div
          className="rounded-4 overflow-hidden mb-5"
          style={{ height: "450px" }}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <span className="badge bg-primary mb-3">{article.category}</span>

            <h1 className="fw-bold mb-3">{article.title}</h1>

            <div className="d-flex align-items-center gap-3 text-muted mb-5">
              <span>
                <i className="bi bi-calendar me-1"></i>
                {article.date}
              </span>
              <span>
                <i className="bi bi-person me-1"></i>
                {article.author}
              </span>
            </div>

            <div
              className="lh-lg"
              style={{ fontSize: "1.05rem", lineHeight: "2" }}
            >
              {article.content.split("\n").map((line, i) => {
                if (line.trim() === "") {
                  return <br key={i} />;
                }
                if (line.match(/^\d+\./)) {
                  return <p key={i} className="fw-bold mb-2">{line}</p>;
                }
                if (line.startsWith("- ")) {
                  return (
                    <p key={i} className="me-3 text-muted">
                      {line}
                    </p>
                  );
                }
                return <p key={i}>{line}</p>;
              })}
            </div>

            <div className="mt-5 pt-4 border-top">
              <Link to="/blog" className="btn btn-outline-primary rounded-pill">
                <i className="bi bi-arrow-right me-2"></i>
                بازگشت به وبلاگ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
