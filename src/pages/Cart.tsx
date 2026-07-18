import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPriceNumber } from "../utils/formatPrice";

export default function Cart() {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,
    subtotal,
    shippingCost,
    tax,
    grandTotal,
    itemCount,
  } = useCart();

  if (items.length === 0) {
    return (
      <section className="py-5" dir="rtl">
        <div className="container">
          <h2 className="fw-bold mb-4">سبد خرید</h2>
          <div className="text-center py-5">
            <i className="bi bi-cart text-secondary" style={{ fontSize: "4rem" }} />
            <h4 className="fw-bold mt-3">سبد خرید شما خالی است</h4>
            <p className="text-muted">برای خرید می‌توانید از محصولات ما دیدن کنید.</p>
            <Link to="/products" className="btn btn-primary rounded-pill px-4">
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5" dir="rtl">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">سبد خرید ({itemCount} کالا)</h2>
          <button
            className="btn btn-outline-danger btn-sm rounded-pill"
            onClick={clearCart}
          >
            <i className="bi bi-trash3 me-1" />
            خالی کردن سبد
          </button>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-0">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="d-flex gap-3 p-3 border-bottom"
                  >
                    <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="rounded-3"
                        style={{ width: 90, height: 90, objectFit: "cover" }}
                      />
                    </Link>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Link
                            to={`/products/${item.product.id}`}
                            className="text-decoration-none"
                          >
                            <h6 className="fw-bold text-dark mb-1">
                              {item.product.title}
                            </h6>
                          </Link>
                          <span className="badge bg-primary-subtle text-primary small">
                            {item.product.categoryLabel}
                          </span>
                        </div>
                        <button
                          className="btn btn-sm text-muted"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <i className="bi bi-x-lg" />
                        </button>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center border rounded-2 overflow-hidden" style={{ fontSize: "0.85rem" }}>
                            <button
                              className="btn btn-sm px-2 py-1"
                              onClick={() => decreaseQuantity(item.product.id)}
                              disabled={item.quantity <= 1}
                            >
                              <i className="bi bi-dash" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="99"
                              value={item.quantity}
                              onChange={(e) => {
                                const v = parseInt(e.target.value, 10);
                                if (v > 0) updateQuantity(item.product.id, v);
                              }}
                              className="form-control form-control-sm text-center border-0"
                              style={{ width: 45 }}
                            />
                            <button
                              className="btn btn-sm px-2 py-1"
                              onClick={() => increaseQuantity(item.product.id)}
                            >
                              <i className="bi bi-plus" />
                            </button>
                          </div>
                        </div>
                        <span className="fw-bold text-primary">
                          {formatPriceNumber(item.product.price * item.quantity)} تومان
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: "90px" }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">خلاصه سفارش</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">جمع کل</span>
                  <span className="fw-medium">{formatPriceNumber(subtotal)} تومان</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">هزینه ارسال</span>
                  <span className="fw-medium">
                    {shippingCost === 0 ? (
                      <span className="text-success">رایگان</span>
                    ) : (
                      `${formatPriceNumber(shippingCost)} تومان`
                    )}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">مالیات (۹٪)</span>
                  <span className="fw-medium">{formatPriceNumber(tax)} تومان</span>
                </div>

                {shippingCost > 0 && (
                  <div className="alert alert-info small py-2 rounded-3 mb-3">
                    <i className="bi bi-info-circle me-1" />
                    ارسال رایگان برای سفارش‌های بالای {formatPriceNumber(5000000)} تومان
                  </div>
                )}

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">مبلغ قابل پرداخت</span>
                  <span className="fw-bold fs-5 text-primary">
                    {formatPriceNumber(grandTotal)} تومان
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                >
                  <i className="bi bi-credit-card me-2" />
                  ادامه و پرداخت
                </Link>

                <Link
                  to="/products"
                  className="btn btn-outline-secondary w-100 rounded-pill py-2 mt-2"
                >
                  <i className="bi bi-arrow-right me-2" />
                  ادامه خرید
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
