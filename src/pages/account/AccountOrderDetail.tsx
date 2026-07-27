import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useOrders } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { useFormatPrice } from "../../utils/formatPrice";

const statusConfig: Record<string, { key: string; class: string; icon: string }> = {
  pending: { key: "orders.statusPending", class: "bg-warning text-dark", icon: "bi-clock" },
  processing: { key: "orders.statusProcessing", class: "bg-info text-dark", icon: "bi-gear" },
  shipped: { key: "orders.statusShipped", class: "bg-primary", icon: "bi-truck" },
  delivered: { key: "orders.statusDelivered", class: "bg-success", icon: "bi-check-circle" },
  cancelled: { key: "orders.statusCancelled", class: "bg-danger", icon: "bi-x-circle" },
};

const TIMELINE_STEPS = ["pending", "processing", "shipped", "delivered"] as const;

const timelineLabels: Record<string, string> = {
  pending: "orders.timelinePending",
  processing: "orders.timelineProcessing",
  shipped: "orders.timelineShipped",
  delivered: "orders.timelineDelivered",
};

export default function AccountOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const { addItem } = useCart();
  const { t } = useLanguage();
  const { formatPrice } = useFormatPrice();
  const [reorderFeedback, setReorderFeedback] = useState(false);

  const order = id ? getOrder(id) : undefined;

  const handleReorder = () => {
    if (!order) return;
    order.items.forEach((item) => addItem(item.product, item.quantity));
    setReorderFeedback(true);
    setTimeout(() => setReorderFeedback(false), 2000);
  };

  if (!order) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card border-0 shadow-sm rounded-4"
      >
        <div className="card-body">
          <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
            <div className="empty-state-icon" style={{ width: "80px", height: "80px" }}>
              <i className="bi bi-exclamation-circle" style={{ fontSize: "2rem" }} />
            </div>
            <h4 className="empty-state-title">{t("orders.notFound")}</h4>
            <p className="empty-state-desc">{t("orders.notFoundDesc")}</p>
            <Link to="/account/orders" className="btn btn-vesta-primary rounded-pill px-5">
              {t("orders.backToList")}
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  const st = statusConfig[order.status] || statusConfig.pending;
  const isCancelled = order.status === "cancelled";
  const currentStepIndex = isCancelled ? -1 : TIMELINE_STEPS.indexOf(order.status as typeof TIMELINE_STEPS[number]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/account/orders"
          className="text-decoration-none d-inline-flex align-items-center gap-2 mb-4 text-muted"
        >
          <i className="bi bi-arrow-right" />
          {t("orders.backToList")}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom gap-2">
            <div>
              <h5 className="fw-bold mb-1">{t("orders.orderDetails")}</h5>
              <span className="text-muted" style={{ direction: "ltr" }}>
                #{order.id.toUpperCase()}
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className={`badge rounded-pill px-3 py-2 ${st.class}`}>
                <i className={`bi ${st.icon} me-1`} />
                {t(st.key)}
              </span>
            </div>
          </div>

          <div className="text-muted small mb-4">
            <i className="bi bi-calendar3 me-1" />
            {t("orders.orderDate")}: {new Date(order.createdAt).toLocaleDateString("fa-IR")}
          </div>

          {order.trackingCode && (
            <div className="alert alert-primary d-flex align-items-center gap-3 py-3 rounded-3 mb-4">
              <div
                className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                style={{ width: 44, height: 44 }}
              >
                <i className="bi bi-truck text-primary fs-5" />
              </div>
              <div>
                <div className="fw-bold small">{t("orders.tracking")}</div>
                <span className="fs-6 fw-bold" style={{ direction: "ltr", fontFamily: "monospace" }}>
                  {order.trackingCode}
                </span>
              </div>
            </div>
          )}

          <h6 className="fw-bold mb-3">{t("orders.itemsCount")}</h6>
          {order.items.map((item) => (
            <div key={item.product.id} className="d-flex gap-3 mb-3 pb-3 border-bottom">
              <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                <div
                  className="rounded-3 overflow-hidden"
                  style={{ width: 64, height: 64, background: "var(--c-gray-100)" }}
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
                <Link to={`/products/${item.product.id}`} className="text-decoration-none">
                  <h6 className="fw-bold text-dark mb-0 text-truncate-2">{item.product.title}</h6>
                </Link>
                <span className="text-muted small">
                  {item.quantity} × {formatPrice(item.product.price)}
                </span>
              </div>
              <span className="fw-bold text-nowrap">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}

          <div className="mt-3">
            <button
              type="button"
              className={`btn rounded-pill px-4 ${
                reorderFeedback ? "btn-success" : "btn-vesta-primary"
              }`}
              onClick={handleReorder}
            >
              <i className={`bi ${reorderFeedback ? "bi-check-circle" : "bi-arrow-repeat"} me-2`} />
              {reorderFeedback ? t("orders.reorderSuccess") : t("orders.reorder")}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Status Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-3 p-md-4">
          <h6 className="fw-bold mb-4">
            <i className="bi bi-geo-alt text-primary me-2" />
            {t("orders.status")}
          </h6>
          {isCancelled ? (
            <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-danger bg-opacity-10">
              <div className="rounded-circle bg-danger d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                <i className="bi bi-x-circle text-white" />
              </div>
              <div>
                <div className="fw-bold">{t("orders.statusCancelled")}</div>
                <small className="text-muted">{t("orders.orderDate")}: {new Date(order.createdAt).toLocaleDateString("fa-IR")}</small>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-between position-relative px-2">
              <div
                className="position-absolute top-50 start-0 end-0"
                style={{ height: 3, background: "var(--c-gray-200)", zIndex: 0, transform: "translateY(-50%)" }}
              />
              <div
                className="position-absolute top-50 start-0"
                style={{
                  height: 3,
                  background: "var(--bs-primary)",
                  zIndex: 1,
                  transform: "translateY(-50%)",
                  width: `${currentStepIndex >= 0 ? (currentStepIndex / (TIMELINE_STEPS.length - 1)) * 100 : 0}%`,
                  transition: "width 0.5s ease",
                }}
              />
              {TIMELINE_STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div key={step} className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 2, flex: 1 }}>
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center ${
                        isCompleted ? "bg-primary" : "bg-light border"
                      }`}
                      style={{ width: isCurrent ? 40 : 32, height: isCurrent ? 40 : 32 }}
                    >
                      {isCompleted ? (
                        <i className={`bi ${isCurrent ? statusConfig[order.status]?.icon || "bi-check" : "bi-check-lg"} text-white`} />
                      ) : (
                        <i className="bi bi-circle text-muted small" />
                      )}
                    </div>
                    <small
                      className={`text-center mt-2 fw-medium small ${isCurrent ? "text-primary fw-bold" : isCompleted ? "text-dark" : "text-muted"}`}
                    >
                      {t(timelineLabels[step])}
                    </small>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      <div className="row g-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="col-md-6"
        >
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-geo-alt text-primary me-2" />
                {t("orders.shippingAddress")}
              </h6>
              <p className="mb-1 fw-medium">{order.shipping.fullName}</p>
              <p className="text-muted small mb-1">{order.shipping.address}</p>
              <p className="text-muted small mb-1">
                {order.shipping.city} - {order.shipping.postalCode}
              </p>
              <p className="text-muted small" style={{ direction: "ltr" }}>
                {order.shipping.phone}
              </p>
              <p className="text-muted small" style={{ direction: "ltr" }}>
                {order.shipping.email}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="col-md-6"
        >
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-receipt text-primary me-2" />
                {t("orders.paymentSummary")}
              </h6>
              <div className="d-flex justify-content-between mb-1 gap-2">
                <span className="text-muted">{t("orders.subtotal")}</span>
                <span className="text-nowrap">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-1 gap-2">
                <span className="text-muted">{t("orders.shipping")}</span>
                <span>
                  {order.shippingCost === 0
                    ? t("common.free")
                    : <span className="text-nowrap">{formatPrice(order.shippingCost)}</span>}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2 gap-2">
                <span className="text-muted">{t("orders.tax")}</span>
                <span className="text-nowrap">{formatPrice(order.tax)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between gap-2">
                <span className="fw-bold">{t("orders.total")}</span>
                <span className="fw-bold text-primary text-nowrap">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
