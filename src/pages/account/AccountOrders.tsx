import { useState } from "react";
import { Link } from "react-router-dom";
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

export default function AccountOrders() {
  const { orders } = useOrders();
  const { addItem } = useCart();
  const { t } = useLanguage();
  const { formatPrice } = useFormatPrice();
  const [reorderedId, setReorderedId] = useState<string | null>(null);

  const handleReorder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    order.items.forEach((item) => addItem(item.product, item.quantity));
    setReorderedId(orderId);
    setTimeout(() => setReorderedId(null), 2000);
  };

  if (orders.length === 0) {
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
              <i className="bi bi-box" style={{ fontSize: "2rem" }} />
            </div>
            <h4 className="empty-state-title">{t("orders.empty")}</h4>
            <p className="empty-state-desc">{t("orders.emptyDesc")}</p>
            <Link to="/products" className="btn btn-vesta-primary rounded-pill px-5">
              <i className="bi bi-bag me-2" />
              {t("orders.startShopping")}
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card border-0 shadow-sm rounded-4"
    >
      <div className="card-body p-3 p-md-4">
        <h5 className="fw-bold mb-4">
          <i className="bi bi-box text-primary me-2" />
          {t("orders.title")} ({orders.length})
        </h5>

        {/* Desktop Table */}
        <div className="table-responsive d-none d-md-block">
          <table className="table align-middle mb-0">
            <thead>
              <tr className="text-muted small">
                <th>{t("orders.orderNumber")}</th>
                <th>{t("orders.date")}</th>
                <th>{t("orders.itemsCount")}</th>
                <th>{t("orders.amount")}</th>
                <th>{t("orders.status")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const st = statusConfig[order.status] || statusConfig.pending;
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td>
                      <span className="fw-bold" style={{ direction: "ltr" }}>
                        #{order.id.toUpperCase()}
                      </span>
                    </td>
                    <td className="text-muted">
                      {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td>{order.items.length} {t("orders.itemsCount")}</td>
                    <td className="fw-bold text-primary">{formatPrice(order.total)}</td>
                    <td>
                      <span className={`badge rounded-pill ${st.class}`}>
                        <i className={`bi ${st.icon} me-1`} />
                        {t(st.key)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Link
                          to={`/account/orders/${order.id}`}
                          className="btn btn-sm btn-outline-primary rounded-pill touch-target"
                        >
                          {t("orders.details")}
                        </Link>
                        <button
                          type="button"
                          className={`btn btn-sm rounded-pill touch-target ${
                            reorderedId === order.id
                              ? "btn-success"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => handleReorder(order.id)}
                        >
                          {reorderedId === order.id ? (
                            <>
                              <i className="bi bi-check-circle me-1" />
                              {t("orders.reorderSuccess")}
                            </>
                          ) : (
                            <>
                              <i className="bi bi-arrow-repeat me-1" />
                              {t("orders.reorder")}
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="d-md-none">
          {orders.map((order, index) => {
            const st = statusConfig[order.status] || statusConfig.pending;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card border mb-3 rounded-3"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                    <span className="fw-bold" style={{ direction: "ltr" }}>
                      #{order.id.toUpperCase()}
                    </span>
                    <span className={`badge rounded-pill ${st.class}`}>
                      <i className={`bi ${st.icon} me-1`} />
                      {t(st.key)}
                    </span>
                  </div>
                  <div className="text-muted small mb-2">
                    <i className="bi bi-calendar3 me-1" />
                    {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    <span className="mx-2">|</span>
                    {order.items.length} {t("orders.itemsCount")}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-primary">{formatPrice(order.total)}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/account/orders/${order.id}`}
                      className="btn btn-sm btn-outline-primary rounded-pill touch-target flex-grow-1"
                    >
                      {t("orders.details")}
                    </Link>
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill touch-target flex-grow-1 ${
                        reorderedId === order.id ? "btn-success" : "btn-outline-secondary"
                      }`}
                      onClick={() => handleReorder(order.id)}
                    >
                      {reorderedId === order.id ? (
                        <>
                          <i className="bi bi-check-circle me-1" />
                          {t("orders.reorderSuccess")}
                        </>
                      ) : (
                        <>
                          <i className="bi bi-arrow-repeat me-1" />
                          {t("orders.reorder")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
