import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useOrders } from "../context/OrderContext";

const sidebarLinks = [
  { to: "/account/profile", icon: "bi-person", label: "پروفایل" },
  { to: "/account/edit-profile", icon: "bi-pencil-square", label: "ویرایش پروفایل" },
  { to: "/account/orders", icon: "bi-box", label: "سفارشات" },
  { to: "/account/wishlist", icon: "bi-heart", label: "علاقه‌مندی‌ها" },
  { to: "/account/settings", icon: "bi-gear", label: "تنظیمات" },
];

export default function AccountLayout() {
  const { user } = useAuth();
  const { itemCount: wishlistCount } = useWishlist();
  const { orders } = useOrders();

  const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
    `d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none transition-all ${
      isActive
        ? "bg-primary-subtle text-primary fw-bold"
        : "text-muted fw-medium"
    }`;

  return (
    <section className="py-5" dir="rtl">
      <div className="container">
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
                  {sidebarLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === "/account/profile" || link.to === "/account/orders"}
                      className={sidebarLinkClass}
                    >
                      <i className={`bi ${link.icon} fs-5`} />
                      <span>{link.label}</span>
                      {link.to === "/account/wishlist" && wishlistCount > 0 && (
                        <span className="badge bg-primary rounded-pill ms-auto">
                          {wishlistCount}
                        </span>
                      )}
                      {link.to === "/account/orders" && orders.length > 0 && (
                        <span className="badge bg-secondary rounded-pill ms-auto">
                          {orders.length}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-9">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
