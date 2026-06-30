import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mt-5 text-center py-5">
        <i className="bi bi-exclamation-circle text-secondary" style={{ fontSize: "3rem" }}></i>
        <h3 className="fw-bold mt-3">محصول یافت نشد</h3>
        <p className="text-muted">محصول مورد نظر شما وجود ندارد.</p>
        <Link to="/products" className="btn btn-primary rounded-pill">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="py-5" dir="rtl">
      <div className="container">
        <nav className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">خانه</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products">فروشگاه</Link>
            </li>
            <li className="breadcrumb-item active">{product.title}</li>
          </ol>
        </nav>

        <div className="row g-5">
          <div className="col-lg-6">
            <div
              className="rounded-4 overflow-hidden shadow-sm"
              style={{ height: "500px" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <span className="badge bg-primary-subtle text-primary mb-3">
              {product.categoryLabel}
            </span>

            <h1 className="fw-bold mb-3">{product.title}</h1>

            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="text-muted">
                <i className="bi bi-cart-check me-1"></i>
                {product.sold} فروخته شده
              </span>
            </div>

            <p className="text-muted lh-lg mb-4">{product.description}</p>

            <div className="d-flex align-items-center gap-3 mb-4">
              {product.oldPrice ? (
                <>
                  <span
                    className="fw-bold text-primary"
                    style={{ fontSize: "1.8rem" }}
                  >
                    {product.price.toLocaleString()} تومان
                  </span>
                  <span
                    className="text-decoration-line-through text-muted"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {product.oldPrice.toLocaleString()} تومان
                  </span>
                  <span className="badge bg-danger fs-6">
                    {product.discount}%-
                  </span>
                </>
              ) : (
                <span
                  className="fw-bold text-primary"
                  style={{ fontSize: "1.8rem" }}
                >
                  {product.price.toLocaleString()} تومان
                </span>
              )}
            </div>

            <div className="d-flex gap-3 flex-wrap">
              <button className="btn btn-primary btn-lg rounded-pill px-5">
                <i className="bi bi-cart-plus me-2"></i>
                افزودن به سبد خرید
              </button>

              <button className="btn btn-outline-secondary btn-lg rounded-pill px-4">
                <i className="bi bi-heart"></i>
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-5 pt-5 border-top">
            <h3 className="fw-bold mb-4">محصولات مرتبط</h3>
            <div className="row g-4">
              {relatedProducts.map((rp) => (
                <div key={rp.id} className="col-md-6 col-lg-3">
                  <Link
                    to={`/products/${rp.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                      <div style={{ height: "200px", overflow: "hidden" }}>
                        <img
                          src={rp.image}
                          alt={rp.title}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="card-body">
                        <h6 className="fw-bold text-dark mb-2">{rp.title}</h6>
                        <span className="text-primary fw-bold">
                          {rp.price.toLocaleString()} تومان
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
