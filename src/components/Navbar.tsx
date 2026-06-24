import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 text-dark"
        >
          🛍️ Shopino
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbar"
        >
          {/* Menu */}
          <ul className="navbar-nav mx-auto gap-lg-2">

            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/">
                خانه
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link fw-medium ${isActive ? "text-primary" : ""}`
                }
              >
                فروشگاه
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/categories">
                دسته‌بندی‌ها
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/offers">
                پیشنهاد ویژه
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/blog">
                وبلاگ
              </NavLink>
            </li>

          </ul>

          {/* Search + Actions */}
          <div className="d-flex align-items-center gap-2">

            {/* Search */}
            <div
              className="input-group"
              style={{ width: "320px" }}
            >
              <span className="input-group-text bg-light border-0">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="جستجو در محصولات..."
              />
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="btn btn-outline-dark"
            >
              <i className="bi bi-person ms-1"></i>
              ورود / ثبت‌نام
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-dark position-relative"
            >
              <i className="bi bi-bag"></i>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}