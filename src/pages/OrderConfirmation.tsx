import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useLanguage } from "../context/LanguageContext";
import { formatPriceNumber } from "../utils/formatPrice";

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const { t } = useLanguage();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">
              <i className="bi bi-exclamation-circle" />
            </div>
            <h3 className="empty-state-title">{t("checkout.orderNotFound")}</h3>
            <p className="empty-state-desc">{t("checkout.orderNotFoundDesc")}</p>
            <Link to="/" className="btn btn-vesta-primary rounded-pill px-5">
              {t("checkout.backToHome")}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container" style={{ maxWidth: 700 }}>
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{ width: 80, height: 80, background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
          >
            <i className="bi bi-check-lg text-white" style={{ fontSize: "2.5rem" }} />
          </div>
          <h2 className="fw-bold" style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)" }}>{t("checkout.orderReceived")}</h2>
          <p className="text-muted">{t("checkout.thankYou")}</p>
        </div>

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom gap-2">
              <div>
                <span className="text-muted small">{t("checkout.orderNumber")}</span>
                <div className="fw-bold" style={{ direction: "ltr", textAlign: "right" }}>
                  #{order.id.toUpperCase()}
                </div>
              </div>
              <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                <i className="bi bi-clock me-1" />
                {t("checkout.processingStatus")}
              </span>
            </div>

            <h6 className="fw-bold mb-3">{t("checkout.orderItems")}</h6>
            {order.items.map((item) => (
              <div key={item.product.id} className="d-flex gap-3 mb-3 pb-3 border-bottom order-item-row">
                <div
                  className="rounded-3 flex-shrink-0 overflow-hidden"
                  style={{ width: 60, height: 60, background: "var(--c-gray-100)" }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                </div>
                <div className="flex-grow-1 min-w-0">
                  <h6 className="fw-bold mb-0 text-truncate-2">{item.product.title}</h6>
                  <span className="text-muted small">
                    {item.quantity} × {formatPriceNumber(item.product.price)} تومان
                  </span>
                </div>
                <span className="fw-bold text-nowrap">
                  {formatPriceNumber(item.product.price * item.quantity)} تومان
                </span>
              </div>
            ))}

            <div className="bg-light rounded-3 p-3 mt-3">
              <div className="d-flex justify-content-between mb-1 gap-2">
                <span className="text-muted">{t("checkout.subtotal")}</span>
                <span className="text-nowrap">{formatPriceNumber(order.subtotal)} تومان</span>
              </div>
              <div className="d-flex justify-content-between mb-1 gap-2">
                <span className="text-muted">{t("orders.shipping")}</span>
                <span>{order.shippingCost === 0 ? t("common.free") : <span className="text-nowrap">{formatPriceNumber(order.shippingCost)} تومان</span>}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 gap-2">
                <span className="text-muted">{t("checkout.tax")}</span>
                <span className="text-nowrap">{formatPriceNumber(order.tax)} تومان</span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between gap-2">
                <span className="fw-bold">{t("checkout.totalPaid")}</span>
                <span className="fw-bold text-primary fs-5 text-nowrap">
                  {formatPriceNumber(order.total)} تومان
                </span>
              </div>
            </div>

            <div className="mt-4 d-flex gap-3 flex-wrap">
              <Link to="/account/orders" className="btn btn-primary rounded-pill px-4 touch-target">
                <i className="bi bi-box me-2" />
                {t("checkout.viewOrders")}
              </Link>
              <Link to="/products" className="btn btn-outline-secondary rounded-pill px-4 touch-target">
                <i className="bi bi-bag me-2" />
                {t("checkout.continueShopping")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
