import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ProductCard";
import { formatPriceNumber } from "../utils/formatPrice";

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="container mt-5 text-center py-5">
        <i className="bi bi-exclamation-circle text-secondary" style={{ fontSize: "3rem" }}></i>
        <h3 className="fw-bold mt-3">دسته بندی یافت نشد</h3>
        <p className="text-muted">دسته بندی مورد نظر شما وجود ندارد.</p>
        <Link to="/categories" className="btn btn-primary rounded-pill">
          بازگشت به دسته بندی‌ها
        </Link>
      </div>
    );
  }

  const categoryProducts = products.filter(
    (p) => p.category === category.slug
  );

  return (
    <section className="py-5" dir="rtl">
      <div className="container">
        <nav className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">خانه</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/categories">دسته بندی‌ها</Link>
            </li>
            <li className="breadcrumb-item active">{category.label}</li>
          </ol>
        </nav>

        <div
          className="rounded-4 overflow-hidden mb-5 position-relative category-hero-banner"
          style={{ height: "300px" }}
        >
          <img
            src={category.image}
            alt={category.label}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
          <div
            className="position-absolute d-flex align-items-center justify-content-center"
            style={{
              inset: 0,
              background: "rgba(0,0,0,0.4)",
            }}
          >
            <div className="text-center text-white">
              <h1 className="fw-bold" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>{category.label}</h1>
              <p className="text-white-50 mb-0">
                {categoryProducts.length} محصول
              </p>
            </div>
          </div>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="row g-4">
            {categoryProducts.map((p) => (
              <div key={p.id} className="col-md-6 col-lg-4">
                <ProductCard
                  id={p.id}
                  title={p.title}
                  price={`${formatPriceNumber(p.price)} تومان`}
                  image={p.image}
                  discount={p.discount}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-box text-secondary" style={{ fontSize: "3rem" }}></i>
            <h5 className="fw-bold mt-3">محصولی یافت نشد</h5>
            <p className="text-muted">
              هنوز محصولی برای این دسته بندی اضافه نشده است.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
