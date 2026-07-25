import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { formatPriceNumber } from "../../utils/formatPrice";

export default function AccountWishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
            <div className="empty-state-icon" style={{ width: "80px", height: "80px" }}>
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
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4">
          <i className="bi bi-heart text-danger me-2" />
          علاقه‌مندی‌ها ({items.length})
        </h5>

        <div className="row g-3">
          {items.map((item) => (
            <div key={item.product.id} className="col-12">
              <div className="d-flex gap-3 p-3 bg-light rounded-3">
                <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                  <div
                    className="rounded-3 overflow-hidden"
                    style={{ width: 72, height: 72, background: "var(--c-gray-200)" }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="flex-grow-1 min-w-0">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="text-decoration-none"
                  >
                    <h6 className="fw-bold text-dark mb-1 text-truncate-2">{item.product.title}</h6>
                  </Link>
                  <span className="text-primary fw-bold">
                    {formatPriceNumber(item.product.price)} تومان
                  </span>
                </div>
                <div className="d-flex flex-column gap-1 flex-shrink-0">
                  <button
                    className="btn btn-sm btn-primary rounded-pill touch-target"
                    onClick={() => addItem(item.product)}
                    aria-label="افزودن به سبد"
                  >
                    <i className="bi bi-cart-plus" />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill touch-target"
                    onClick={() => removeItem(item.product.id)}
                    aria-label="حذف از علاقه‌مندی‌ها"
                  >
                    <i className="bi bi-trash3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
