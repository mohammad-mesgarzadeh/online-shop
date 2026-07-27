import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { formatPriceNumber } from "../utils/formatPrice";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Cart() {
  const { t } = useLanguage();
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

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const recommendedProducts = products
    .filter((p) => !items.some((item) => item.product.id === p.id))
    .slice(0, 4);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "vesta10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError(t("cart.couponInvalid"));
      setCouponApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4">{t("cart.title")}</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-state"
          >
            <div className="empty-state-icon">
              <i className="bi bi-cart" />
            </div>
            <h3 className="empty-state-title">{t("cart.emptyTitle")}</h3>
            <p className="empty-state-desc">{t("cart.emptyDesc")}</p>
            <Link to="/products" className="btn btn-vesta-primary rounded-pill px-5 py-3">
              {t("cart.viewProducts")}
              <i className="bi bi-arrow-left me-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-2">
          <h2 className="fw-bold mb-0">{t("cart.title")} ({itemCount} {t("cart.itemsCount")})</h2>
          <button
            className="btn btn-outline-danger btn-sm rounded-pill touch-target"
            onClick={clearCart}
          >
            <i className="bi bi-trash3 me-1" />
            {t("cart.clearCart")}
          </button>
        </div>

        <div className="row g-4">
          <div className="col-lg-8 order-lg-1 order-2">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-0">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="d-flex gap-3 p-3 border-bottom"
                  >
                    <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                      <div
                        className="rounded-3 overflow-hidden"
                        style={{ width: 80, height: 80, background: "var(--c-gray-100)" }}
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
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div className="min-w-0">
                          <Link
                            to={`/products/${item.product.id}`}
                            className="text-decoration-none"
                          >
                            <h6 className="fw-bold mb-1" style={{ color: "var(--c-gray-800)", fontSize: "var(--text-sm)" }}>
                              {item.product.title}
                            </h6>
                          </Link>
                          <span className="badge rounded-pill" style={{ background: "var(--c-primary-bg)", color: "var(--c-primary)", fontSize: "var(--text-xs)" }}>
                            {item.product.categoryLabel}
                          </span>
                        </div>
                        <button
                          className="btn btn-sm text-muted touch-target flex-shrink-0"
                          onClick={() => removeItem(item.product.id)}
                          aria-label={t("cart.removeItem")}
                        >
                          <i className="bi bi-x-lg" />
                        </button>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-2 gap-2">
                        <div className="d-flex align-items-center">
                          <div className="cart-quantity-control">
                            <button
                              onClick={() => decreaseQuantity(item.product.id)}
                              disabled={item.quantity <= 1}
                              aria-label={t("cart.decreaseQty")}
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
                              aria-label={t("cart.quantity")}
                            />
                            <button
                              onClick={() => increaseQuantity(item.product.id)}
                              aria-label={t("cart.increaseQty")}
                            >
                              <i className="bi bi-plus" />
                            </button>
                          </div>
                        </div>
                        <span className="fw-bold text-nowrap" style={{ color: "var(--c-primary)", fontSize: "var(--text-sm)" }}>
                          {formatPriceNumber(item.product.price * item.quantity)} {t("common.toman")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4 order-lg-2 order-1">
            <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: "80px" }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">{t("cart.orderSummary")}</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: "var(--c-gray-500)" }}>{t("cart.subtotal")}</span>
                  <span className="fw-medium">{formatPriceNumber(subtotal)} {t("common.toman")}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: "var(--c-gray-500)" }}>{t("cart.shipping")}</span>
                  <span className="fw-medium">
                    {shippingCost === 0 ? (
                      <span style={{ color: "var(--c-success)" }}>{t("common.free")}</span>
                    ) : (
                      `${formatPriceNumber(shippingCost)} ${t("common.toman")}`
                    )}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span style={{ color: "var(--c-gray-500)" }}>{t("cart.tax")}</span>
                  <span className="fw-medium">{formatPriceNumber(tax)} {t("common.toman")}</span>
                </div>

                {shippingCost > 0 && (
                  <div className="d-flex align-items-center gap-2 py-2 px-3 rounded-3 mb-3" style={{ background: "var(--c-info-bg)", color: "var(--c-info)", fontSize: "var(--text-sm)" }}>
                    <i className="bi bi-info-circle" />
                    {t("cart.freeShippingNote")} {formatPriceNumber(5000000)} {t("common.toman")}
                  </div>
                )}

                {/* Coupon Code */}
                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ fontSize: "var(--text-sm)" }}>{t("cart.couponCode")}</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder={t("cart.couponPlaceholder")}
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value); setCouponError(""); setCouponApplied(false); }}
                      disabled={couponApplied}
                      style={{ fontSize: "var(--text-sm)" }}
                    />
                    <button
                      className="btn rounded-3 px-3"
                      style={{
                        background: couponApplied ? "var(--c-success-bg)" : "var(--c-primary-bg)",
                        color: couponApplied ? "var(--c-success)" : "var(--c-primary)",
                        fontWeight: "var(--font-semibold)",
                        fontSize: "var(--text-sm)",
                      }}
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode.trim()}
                    >
                      {couponApplied ? t("cart.couponApplied") : t("cart.couponApply")}
                    </button>
                  </div>
                  {couponError && (
                    <small style={{ color: "var(--c-danger)" }}>{couponError}</small>
                  )}
                  {couponApplied && (
                    <small style={{ color: "var(--c-success)" }}>{t("cart.couponSuccess")}</small>
                  )}
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4 gap-2">
                  <span className="fw-bold" style={{ fontSize: "var(--text-lg)" }}>{t("cart.totalPayable")}</span>
                  <span className="fw-bold text-nowrap" style={{ fontSize: "var(--text-lg)", color: "var(--c-primary)" }}>
                    {formatPriceNumber(grandTotal)} {t("common.toman")}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                >
                  <i className="bi bi-credit-card me-2" />
                  {t("cart.proceedToPay")}
                </Link>

                <Link
                  to="/products"
                  className="btn btn-outline-secondary w-100 rounded-pill py-2 mt-2"
                >
                  <i className="bi bi-arrow-right me-2" />
                  {t("cart.continueShopping")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-5 pt-5" style={{ borderTop: "1px solid var(--c-border)" }}>
            <div className="section-header-row">
              <h2>{t("cart.recommended")}</h2>
            </div>
            <div className="product-grid">
              {recommendedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
