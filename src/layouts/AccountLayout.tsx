import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
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

  return (
    <section className="py-5">
      <div className="container">
        <button
          className="account-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <i className="bi bi-list fs-4" />
          <span>{t("nav.account")}</span>
          <i className={`bi bi-chevron-${sidebarOpen ? "up" : "down"} me-auto`} />
        </button>

        <div className={`account-sidebar-content ${sidebarOpen ? "active" : ""}`}>
          <div className="row g-4">
            <div className="col-lg-4 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 mb-4 mb-lg-0">
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
                          onClick={() => setSidebarOpen(false)}
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

            <div className="col-lg-8 col-xl-9">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
