import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { formatPriceNumber } from "../../utils/formatPrice";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="d-flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${star <= Math.round(rating) ? "bi-star-fill text-warning" : "bi-star text-muted"}`}
          style={{ fontSize: "0.75rem" }}
        />
      ))}
    </div>
  );
}

export default function AccountWishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const mountedRef = useRef(true);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      mountedRef.current = false;
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleAddToCart = (productId: string, product: (typeof items)[0]["product"]) => {
    addItem(product);
    const existing = timersRef.current.get(productId);
    if (existing) clearTimeout(existing);
    setAddedIds((prev) => new Set(prev).add(productId));
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setAddedIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      }
      timersRef.current.delete(productId);
    }, 2000);
    timersRef.current.set(productId, timer);
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card border-0 shadow-sm rounded-4"
      >
        <div className="card-body">
          <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
            <div className="empty-state-icon" style={{ width: 80, height: 80 }}>
              <i className="bi bi-heart" style={{ fontSize: "2rem" }} />
            </div>
            <h4 className="empty-state-title">لیست علاقه‌مندی‌ها خالی است</h4>
            <p className="empty-state-desc">محصولات مورد علاقه خود را اضافه کنید.</p>
            <Link to="/products" className="btn btn-vesta-primary rounded-pill px-5">
              <i className="bi bi-bag me-2" />
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-4">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-heart text-danger me-2" />
            علاقه‌مندی‌ها ({items.length})
          </h5>
        </div>
      </motion.div>

      <div className="row g-3">
        {items.map((item, i) => (
          <div key={item.product.id} className="col-6 col-lg-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="card border-0 shadow-sm rounded-4 h-100"
            >
              <Link to={`/products/${item.product.id}`} className="text-decoration-none">
                <div
                  className="rounded-top-4 overflow-hidden"
                  style={{ background: "var(--c-gray-200)", aspectRatio: "1" }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="card-body d-flex flex-column p-3">
                <Link
                  to={`/products/${item.product.id}`}
                  className="text-decoration-none"
                >
                  <h6 className="fw-bold text-dark text-truncate-2 mb-2">{item.product.title}</h6>
                </Link>

                <StarRating rating={item.product.rating} />

                <div className="d-flex align-items-center gap-2 mt-2 mb-3">
                  <span className="text-primary fw-bold">
                    {formatPriceNumber(item.product.price)} تومان
                  </span>
                  {item.product.oldPrice && (
                    <span className="text-muted text-decoration-line-through small">
                      {formatPriceNumber(item.product.oldPrice)}
                    </span>
                  )}
                  {item.product.discount && (
                    <span className="badge bg-danger rounded-pill">{item.product.discount}%</span>
                  )}
                </div>

                <div className="mt-auto d-flex gap-2">
                  <button
                    className={`btn btn-sm rounded-pill flex-grow-1 ${addedIds.has(item.product.id) ? "btn-success" : "btn-primary"}`}
                    onClick={() => handleAddToCart(item.product.id, item.product)}
                  >
                    {addedIds.has(item.product.id) ? (
                      <>
                        <i className="bi bi-check-lg me-1" />
                        اضافه شد!
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cart-plus me-1" />
                        افزودن به سبد
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill"
                    onClick={() => removeItem(item.product.id)}
                    aria-label="حذف از علاقه‌مندی‌ها"
                  >
                    <i className="bi bi-trash3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
