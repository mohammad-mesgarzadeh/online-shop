import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { formatPriceNumber } from "../utils/formatPrice";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const mountedRef = useRef(true);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mt-5 text-center py-5">
        <i className="bi bi-exclamation-circle text-secondary" style={{ fontSize: "3rem" }} />
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

  const rating = Math.min(5, Math.floor(product.sold / 50) + 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedFeedback(true);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => {
      if (mountedRef.current) setAddedFeedback(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate("/checkout");
  };

  const handleWishlist = () => {
    toggleItem(product);
  };

  const wishlisted = isWishlisted(product.id);

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
            <li className="breadcrumb-item">
              <Link to={`/categories/${product.category}`}>{product.categoryLabel}</Link>
            </li>
            <li className="breadcrumb-item active">{product.title}</li>
          </ol>
        </nav>

        <div className="row g-4 g-lg-5">
          <div className="col-lg-6">
            <div className="product-detail-gallery rounded-4 overflow-hidden shadow-sm mb-3">
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

            <h1 className="fw-bold mb-3" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}>{product.title}</h1>

            <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
              <div className="d-flex align-items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${i < rating ? "bi-star-fill text-warning" : "bi-star text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-muted small">({product.sold} فروش)</span>
            </div>

            <p className="text-muted lh-lg mb-4">{product.description}</p>

            <div className="price-section mb-4">
              {product.oldPrice ? (
                <>
                  <span className="fw-bold text-primary price-main" style={{ fontSize: "1.8rem" }}>
                    {formatPriceNumber(product.price)} تومان
                  </span>
                  <span className="text-decoration-line-through text-muted" style={{ fontSize: "1.1rem" }}>
                    {formatPriceNumber(product.oldPrice)} تومان
                  </span>
                  {product.discount != null && (
                    <span className="badge bg-danger fs-6">{product.discount}%-</span>
                  )}
                </>
              ) : (
                <span className="fw-bold text-primary price-main" style={{ fontSize: "1.8rem" }}>
                  {formatPriceNumber(product.price)} تومان
                </span>
              )}
            </div>

            <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
              <span className="fw-medium text-muted">تعداد:</span>
              <div className="quantity-selector d-flex align-items-center border rounded-3 overflow-hidden">
                <button
                  className="btn px-3 py-2 touch-target"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="کاهش تعداد"
                >
                  <i className="bi bi-dash" />
                </button>
                <span className="px-4 fw-bold" style={{ minWidth: "50px", textAlign: "center" }}>
                  {quantity}
                </span>
                <button
                  className="btn px-3 py-2 touch-target"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="افزایش تعداد"
                >
                  <i className="bi bi-plus" />
                </button>
              </div>
              <span className="text-muted small text-nowrap">
                ({(product.price * quantity).toLocaleString("fa-IR")} تومان)
              </span>
            </div>

            {addedFeedback && (
              <div className="alert alert-success d-flex align-items-center gap-2 py-2 mb-3 rounded-3">
                <i className="bi bi-check-circle-fill" />
                به سبد خرید اضافه شد!
              </div>
            )}

            <div className="d-flex gap-3 flex-wrap">
              <button
                className="btn btn-primary btn-lg rounded-pill px-5 touch-target"
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart-plus me-2" />
                افزودن به سبد خرید
              </button>

              <button
                className="btn btn-success btn-lg rounded-pill px-4 touch-target"
                onClick={handleBuyNow}
              >
                <i className="bi bi-lightning me-2" />
                خرید آنی
              </button>

              <button
                className={`btn btn-outline-secondary btn-lg rounded-pill px-4 touch-target ${wishlisted ? "active" : ""}`}
                onClick={handleWishlist}
                style={wishlisted ? { background: "#fee2e2", borderColor: "#fca5a5", color: "#dc2626" } : {}}
                aria-label={wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
              >
                <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"}`} />
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-5 pt-5 border-top">
            <h3 className="fw-bold mb-4">محصولات مرتبط</h3>
            <div className="row g-4">
              {relatedProducts.map((rp) => (
                <div key={rp.id} className="col-6 col-md-6 col-lg-3">
                  <ProductCard
                    id={rp.id}
                    title={rp.title}
                    price={`${formatPriceNumber(rp.price)} تومان`}
                    image={rp.image}
                    discount={rp.discount}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
