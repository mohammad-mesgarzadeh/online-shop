import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import CategoriesHero from "../components/categories/CategoriesHero";

export default function Categories() {
  return (
    <>
      <CategoriesHero />

      <section className="pb-5" dir="rtl">
        <div className="container">
          <div className="row g-4">
            {categories.map((cat) => (
              <div key={cat.slug} className="col-sm-6 col-lg-3">
                <Link
                  to={`/categories/${cat.slug}`}
                  className="text-decoration-none"
                >
                  <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                    <div
                      style={{ height: "220px", overflow: "hidden" }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="card-body text-center">
                      <h5 className="fw-bold text-dark">{cat.label}</h5>
                      <button className="btn btn-outline-primary rounded-pill">
                        مشاهده محصولات
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
