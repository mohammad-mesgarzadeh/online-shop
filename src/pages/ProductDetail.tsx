import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { formatPriceNumber } from "../utils/formatPrice";

const RECENTLY_VIEWED_KEY = "vesta_recently_viewed";

function getRecentlyViewed(): string[] {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addToRecentlyViewed(productId: string) {
  const recent = getRecentlyViewed().filter((id) => id !== productId);
  recent.unshift(productId);
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recent.slice(0, 10)));
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const mountedRef = useRef(true);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (id) addToRecentlyViewed(id);
    setSelectedImage(0);
    return () => {
      mountedRef.current = false;
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, [id]);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="bi bi-exclamation-circle" />
          </div>
          <h3 className="empty-state-title">محصول یافت نشد</h3>
          <p className="empty-state-desc">محصول مورد نظر شما وجود ندارد.</p>
          <Link to="/products" className="btn btn-vesta-primary rounded-pill">
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const recentIds = getRecentlyViewed().filter((rid) => rid !== product.id).slice(0, 4);
  const recentProducts = recentIds.map((rid) => products.find((p) => p.id === rid)).filter(Boolean) as typeof products;

  const rating = Math.min(5, Math.floor(product.sold / 50) + 3);
  const hasDiscount = product.discount != null && product.discount > 0;

  // Generate thumbnail images (same image with different crops for demo)
  const thumbnails = [product.image, product.image, product.image];

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

  const specs = [
    { label: "دسته‌بندی", value: product.categoryLabel },
    { label: "رنگ", value: "مشکی" },
    { label: "سایز", value: "M, L, XL" },
    { label: "جنس", value: "نخ پنبه" },
    { label: "وزن", value: "350 گرم" },
  ];

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
          {/* Gallery */}
          <div className="col-lg-6">
            <div className="d-flex gap-3">
              {/* Thumbnails */}
              <div className="d-flex flex-column gap-2" style={{ width: "80px", flexShrink: 0 }}>
                {thumbnails.map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="border-0 rounded-3 overflow-hidden p-0"
                    style={{
                      width: "80px",
                      height: "80px",
                      cursor: "pointer",
                      border: selectedImage === i ? "2px solid var(--c-primary)" : "2px solid var(--c-border-light)",
                      opacity: selectedImage === i ? 1 : 0.6,
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={thumb}
                      alt={`${product.title} ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div
                className="position-relative rounded-4 overflow-hidden flex-grow-1"
                style={{ aspectRatio: "3 / 4", background: "var(--c-gray-100)" }}
              >
                <img
                  src={thumbnails[selectedImage]}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {hasDiscount && (
                  <span
                    className="position-absolute top-3 right-3 px-3 py-1 rounded-pill fw-bold"
                    style={{
                      background: "var(--c-danger)",
                      color: "#fff",
                      fontSize: "var(--text-sm)",
                      zIndex: 2,
                    }}
                  >
                    {product.discount}%-
                  </span>
                )}
                <button
                  className="position-absolute top-3 end-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 44, height: 44,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(8px)",
                    border: "none",
                    cursor: "pointer",
                    zIndex: 2,
                    color: wishlisted ? "var(--c-danger)" : "var(--c-gray-400)",
                    fontSize: "1.2rem",
                    transition: "all 0.2s ease",
                  }}
                  onClick={handleWishlist}
                  aria-label={wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                >
                  <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{ background: "var(--c-primary-bg)", color: "var(--c-primary)", fontSize: "var(--text-sm)" }}
            >
              {product.categoryLabel}
            </span>

            <h1 className="fw-bold mb-3" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}>{product.title}</h1>

            <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
              <div className="d-flex align-items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${i < rating ? "bi-star-fill" : "bi-star"}`}
                    style={{ color: i < rating ? "#f59e0b" : "var(--c-gray-300)", fontSize: "var(--text-sm)" }}
                  />
                ))}
              </div>
              <span style={{ color: "var(--c-gray-400)", fontSize: "var(--text-sm)" }}>
                ({product.sold} فروش)
              </span>
            </div>

            <p style={{ color: "var(--c-gray-500)", lineHeight: 1.9, marginBottom: "var(--space-4)" }}>
              {product.description}
            </p>

            {/* Price */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4" style={{ padding: "var(--space-4)", background: "var(--c-gray-50)", borderRadius: "var(--radius-lg)" }}>
              {hasDiscount && product.oldPrice ? (
                <>
                  <span className="fw-bold" style={{ fontSize: "var(--text-2xl)", color: "var(--c-primary)" }}>
                    {formatPriceNumber(product.price)} تومان
                  </span>
                  <span style={{ textDecoration: "line-through", color: "var(--c-gray-400)", fontSize: "var(--text-lg)" }}>
                    {formatPriceNumber(product.oldPrice)} تومان
                  </span>
                  <span className="px-2 py-1 rounded" style={{ background: "var(--c-danger-bg)", color: "var(--c-danger)", fontSize: "var(--text-sm)", fontWeight: "var(--font-bold)" }}>
                    {product.discount}% تخفیف
                  </span>
                </>
              ) : (
                <span className="fw-bold" style={{ fontSize: "var(--text-2xl)", color: "var(--c-primary)" }}>
                  {formatPriceNumber(product.price)} تومان
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
              <span className="fw-medium" style={{ color: "var(--c-gray-600)" }}>تعداد:</span>
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
              <span style={{ color: "var(--c-gray-400)", fontSize: "var(--text-sm)", whiteSpace: "nowrap" }}>
                ({(product.price * quantity).toLocaleString("fa-IR")} تومان)
              </span>
            </div>

            {/* Feedback */}
            {addedFeedback && (
              <div
                className="d-flex align-items-center gap-2 py-2 px-3 mb-3 rounded-3"
                style={{ background: "var(--c-success-bg)", color: "var(--c-success-dark)" }}
              >
                <i className="bi bi-check-circle-fill" />
                به سبد خرید اضافه شد!
              </div>
            )}

            {/* Actions */}
            <div className="d-flex gap-3 flex-wrap mb-4">
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
                className="btn btn-outline-secondary btn-lg rounded-pill px-4 touch-target"
                onClick={handleWishlist}
                style={wishlisted ? { background: "#fee2e2", borderColor: "#fca5a5", color: "#dc2626" } : {}}
                aria-label={wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
              >
                <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"}`} />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="d-flex flex-wrap gap-3 pt-3" style={{ borderTop: "1px solid var(--c-border-light)" }}>
              {[
                { icon: "bi-truck", text: "ارسال سریع" },
                { icon: "bi-shield-check", text: "ضمانت اصالت" },
                { icon: "bi-arrow-return-left", text: "۷ روز بازگشت" },
              ].map((item, i) => (
                <div key={i} className="d-flex align-items-center gap-2" style={{ color: "var(--c-gray-500)", fontSize: "var(--text-sm)" }}>
                  <i className={`bi ${item.icon}`} style={{ color: "var(--c-success)" }} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--c-border)" }}>
          <div className="d-flex gap-1 mb-4 border-bottom" style={{ overflowX: "auto" }}>
            {[
              { key: "description" as const, label: "توضیحات" },
              { key: "specs" as const, label: "مشخصات" },
              { key: "reviews" as const, label: `نظرات (${product.sold})` },
            ].map((tab) => (
              <button
                key={tab.key}
                className="btn px-4 py-3 position-relative"
                style={{
                  fontWeight: activeTab === tab.key ? "var(--font-bold)" : "var(--font-medium)",
                  color: activeTab === tab.key ? "var(--c-primary)" : "var(--c-gray-500)",
                  fontSize: "var(--text-sm)",
                  borderBottom: activeTab === tab.key ? "2px solid var(--c-primary)" : "2px solid transparent",
                  borderRadius: 0,
                  transition: "all 0.2s ease",
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div style={{ lineHeight: 2, color: "var(--c-gray-600)" }}>
              <p>{product.description}</p>
              <p>این محصول با استفاده از بهترین مواد اولیه و با دقت بالا تولید شده است. مناسب برای استفاده روزمره و مهمانی‌های غیررسمی.</p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="row">
              <div className="col-md-6">
                <table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={i}>
                        <td style={{ color: "var(--c-gray-400)", padding: "12px 16px", background: "var(--c-gray-50)", borderRadius: "0 var(--radius-md) var(--radius-md) 0", fontWeight: "var(--font-medium)", fontSize: "var(--text-sm)" }}>
                          {spec.label}
                        </td>
                        <td style={{ padding: "12px 16px", background: "var(--c-gray-50)", borderRadius: "var(--radius-md) 0 0 var(--radius-md)", fontWeight: "var(--font-semibold)", fontSize: "var(--text-sm)" }}>
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
              <div className="empty-state-icon" style={{ width: "80px", height: "80px" }}>
                <i className="bi bi-chat-square-text" style={{ fontSize: "2rem" }} />
              </div>
              <h4 className="empty-state-title" style={{ fontSize: "var(--text-lg)" }}>هنوز نظری ثبت نشده است</h4>
              <p className="empty-state-desc">اولین نفری باشید که نظر می‌دهد!</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-5 pt-5" style={{ borderTop: "1px solid var(--c-border)" }}>
            <div className="section-header-row">
              <h2>محصولات مرتبط</h2>
            </div>
            <div className="product-grid">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentProducts.length > 0 && (
          <section className="mt-5 pt-5" style={{ borderTop: "1px solid var(--c-border)" }}>
            <div className="section-header-row">
              <h2>اخیراً مشاهده شده</h2>
            </div>
            <div className="product-grid">
              {recentProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
