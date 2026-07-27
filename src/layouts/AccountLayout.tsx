import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/WishlistContext";
import { useOrders } from "../context/OrderContext";

const sidebarLinks = [
  { to: "/account/dashboard", icon: "bi-grid-1x2", labelKey: "account.sidebar.dashboard", badge: null },
  { to: "/account/profile", icon: "bi-person", labelKey: "account.sidebar.profile", badge: null },
  { to: "/account/edit-profile", icon: "bi-pencil-square", labelKey: "account.sidebar.editProfile", badge: null },
  { to: "/account/orders", icon: "bi-box", labelKey: "account.sidebar.orders", badge: "orders" },
  { to: "/account/wishlist", icon: "bi-heart", labelKey: "account.sidebar.wishlist", badge: "wishlist" },
  { to: "/account/addresses", icon: "bi-geo-alt", labelKey: "account.sidebar.addresses", badge: null },
  { to: "/account/notifications", icon: "bi-bell", labelKey: "account.sidebar.notifications", badge: null },
  { to: "/account/security", icon: "bi-shield-lock", labelKey: "account.sidebar.security", badge: null },
  { to: "/account/settings", icon: "bi-gear", labelKey: "account.sidebar.settings", badge: null },
];

export default function AccountLayout() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { itemCount: wishlistCount } = useWishlist();
  const { orders } = useOrders();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getBadge = (type: string | null) => {
    if (type === "wishlist" && wishlistCount > 0) return wishlistCount;
    if (type === "orders" && orders.length > 0) return orders.length;
    return null;
  };

  const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
    `d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none transition-all ${
      isActive
        ? "bg-primary-subtle text-primary fw-bold"
        : "text-muted fw-medium"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 text-nowrap text-decoration-none transition-all flex-shrink-0 ${
      isActive
        ? "bg-primary-subtle text-primary fw-bold"
        : "text-muted fw-medium"
    }`;

  return (
    <section className="py-5">
      <div className="container">
        {/* Desktop Sidebar */}
        <div className="d-none d-lg-flex gap-4">
          <div className="account-sidebar-col" style={{ flex: "0 0 25%", maxWidth: "25%" }}>
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 text-center">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="rounded-circle mb-3"
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
                <h5 className="fw-bold mb-1">{user?.name}</h5>
                <p className="text-muted small mb-3" style={{ direction: "ltr" }}>
                  {user?.email}
                </p>

                <hr />

                <nav className="d-flex flex-column gap-1 text-end">
                  {sidebarLinks.map((link) => {
                    const badge = getBadge(link.badge);
                    return (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === "/account/dashboard"}
                        className={sidebarLinkClass}
                      >
                        <i className={`bi ${link.icon} fs-5`} />
                        <span>{t(link.labelKey)}</span>
                        {badge !== null && (
                          <span className="badge bg-primary rounded-pill ms-auto">
                            {badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            <Outlet />
          </div>
        </div>

        {/* Mobile: horizontal scrollable nav strip + toggle drawer */}
        <div className="d-lg-none">
          <div
            className="d-flex align-items-center gap-2 p-2 mb-3 overflow-x-auto"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {sidebarLinks.map((link) => {
              const badge = getBadge(link.badge);
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/account/dashboard"}
                  className={mobileNavLinkClass}
                >
                  <i className={`bi ${link.icon}`} />
                  <span className="small">{t(link.labelKey)}</span>
                  {badge !== null && (
                    <span className="badge bg-primary rounded-pill ms-1" style={{ fontSize: "10px" }}>
                      {badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          <button
            className="account-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className={`bi bi-person-circle`} />
            <span className="fw-semibold">{user?.name}</span>
            <i className={`bi bi-chevron-${sidebarOpen ? "up" : "down"} ms-auto`} />
          </button>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
                className="mb-3"
              >
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="rounded-circle"
                        style={{ width: 48, height: 48, objectFit: "cover" }}
                      />
                      <div className="text-start">
                        <h6 className="fw-bold mb-0">{user?.name}</h6>
                        <small className="text-muted" style={{ direction: "ltr" }}>
                          {user?.email}
                        </small>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <nav className="d-flex flex-column gap-1">
                      {sidebarLinks.map((link) => {
                        const badge = getBadge(link.badge);
                        return (
                          <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === "/account/dashboard"}
                            className={sidebarLinkClass}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <i className={`bi ${link.icon} fs-6`} />
                            <span className="small">{t(link.labelKey)}</span>
                            {badge !== null && (
                              <span className="badge bg-primary rounded-pill ms-auto">
                                {badge}
                              </span>
                            )}
                          </NavLink>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Outlet />
        </div>
      </div>
    </section>
  );
}
