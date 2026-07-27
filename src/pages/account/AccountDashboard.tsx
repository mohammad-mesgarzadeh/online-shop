import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useWishlist } from "../../context/WishlistContext";
import { useOrders } from "../../context/OrderContext";
import { useAddresses } from "../../context/AddressContext";
import { useFormatPrice } from "../../utils/formatPrice";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

const statusMap: Record<string, { color: string; key: string }> = {
  pending: { color: "warning", key: "orders.statusPending" },
  processing: { color: "info", key: "orders.statusProcessing" },
  shipped: { color: "primary", key: "orders.statusShipped" },
  delivered: { color: "success", key: "orders.statusDelivered" },
  cancelled: { color: "danger", key: "orders.statusCancelled" },
};

export default function AccountDashboard() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { itemCount: wishlistCount } = useWishlist();
  const { orders } = useOrders();
  const { addresses } = useAddresses();
  const { formatPrice, formatPriceNumber } = useFormatPrice();

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 3);
  const hasOrders = orders.length > 0;
  const locale = language === "fa" ? "fa-IR" : "en-US";
  const today = new Date().toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    { icon: "bi-box", color: "primary", value: orders.length, labelKey: "dashboard.totalOrders" },
    { icon: "bi-heart", color: "danger", value: wishlistCount, labelKey: "dashboard.wishlistItems" },
    { icon: "bi-geo-alt", color: "success", value: addresses.length, labelKey: "dashboard.savedAddresses" },
    { icon: "bi-cash-stack", color: "warning", value: formatPriceNumber(totalSpent), labelKey: "dashboard.totalSpent", isPrice: true },
  ];

  const actions = [
    { to: "/account/edit-profile", icon: "bi-pencil-square", labelKey: "account.sidebar.editProfile" },
    { to: "/products", icon: "bi-shop", labelKey: "dashboard.shopNow" },
    { to: "/account/orders", icon: "bi-box", labelKey: "account.sidebar.orders" },
    { to: "/account/addresses", icon: "bi-geo-alt", labelKey: "account.sidebar.addresses" },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-4">
          <h4 className="fw-bold mb-1">
            {t("dashboard.welcome")}, {user?.firstName || user?.name}!
          </h4>
          <p className="text-muted mb-0">{today}</p>
        </div>
      </motion.div>

      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div className="col-6 col-lg-3" key={s.labelKey}>
            <motion.div
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="card border-0 shadow-sm rounded-4 h-100"
            >
              <div className="card-body p-3 text-center">
                <i className={`bi ${s.icon} text-${s.color} fs-3 mb-2`} />
                <h4
                  className="fw-bold mb-0 text-truncate"
                  style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.5rem)" }}
                >
                  {s.isPrice ? (s.value as string) : s.value}
                </h4>
                <span className="text-muted small">{t(s.labelKey)}</span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {!hasOrders ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="card border-0 shadow-sm rounded-4 mb-4"
        >
          <div className="card-body p-5 text-center">
            <i className="bi bi-bag text-muted" style={{ fontSize: 48 }} />
            <h5 className="fw-bold mt-3 mb-2">{t("dashboard.noOrders")}</h5>
            <p className="text-muted mb-3">{t("empty.ordersDesc")}</p>
            <Link to="/products" className="btn btn-primary rounded-pill px-4">
              <i className="bi bi-shop me-2" />
              {t("dashboard.startShopping")}
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="card border-0 shadow-sm rounded-4 mb-4"
        >
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-clock-history text-primary me-2" />
                {t("dashboard.recentOrders")}
              </h5>
              <Link to="/account/orders" className="text-primary text-decoration-none small fw-medium">
                {t("dashboard.viewAll")}
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="border-0 fw-semibold small">{t("orders.orderNumber")}</th>
                    <th className="border-0 fw-semibold small">{t("orders.date")}</th>
                    <th className="border-0 fw-semibold small">{t("orders.amount")}</th>
                    <th className="border-0 fw-semibold small">{t("orders.status")}</th>
                    <th className="border-0 fw-semibold small">{t("orders.details")}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => {
                    const st = statusMap[order.status] || statusMap.pending;
                    return (
                      <tr key={order.id}>
                        <td className="fw-medium small">#{order.id.slice(-6).toUpperCase()}</td>
                        <td className="text-muted small">
                          {new Date(order.createdAt).toLocaleDateString(locale)}
                        </td>
                        <td className="fw-bold small">{formatPrice(order.total)}</td>
                        <td>
                          <span className={`badge bg-${st.color} rounded-pill`}>
                            {t(st.key)}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/account/orders/${order.id}`}
                            className="btn btn-sm btn-outline-primary rounded-pill"
                          >
                            {t("orders.details")}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="card border-0 shadow-sm rounded-4"
      >
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">
            <i className="bi bi-lightning text-primary me-2" />
            {t("dashboard.quickActions")}
          </h5>
          <div className="d-flex flex-wrap gap-2">
            {actions.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="btn btn-outline-primary rounded-pill px-3 py-2"
              >
                <i className={`bi ${a.icon} me-2`} />
                {t(a.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
