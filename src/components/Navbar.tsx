import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/products");
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link fw-medium px-3 py-2 rounded-2 ${isActive ? "nav-link-active" : "nav-link-inactive"}`;

  return (
    <nav
      className={`navbar navbar-expand-xl bg-white sticky-top${scrolled ? " shadow-sm" : ""}`}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 py-2 text-decoration-none"
        >
          <span className="brand-icon" />
          <span className="brand-text">VESTA</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#vestaNav"
          aria-controls="vestaNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="vestaNav">
          {/* Nav Links */}
          <ul className="navbar-nav mx-auto gap-1 my-3 my-xl-0">
            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass}>
                خانه
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={navLinkClass}>
                فروشگاه
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" className={navLinkClass}>
                دسته‌بندی‌ها
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/offers" className={navLinkClass}>
                پیشنهاد ویژه
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className={navLinkClass}>
                وبلاگ
              </NavLink>
            </li>
          </ul>

          {/* Search + Actions */}
          <div className="d-flex flex-column flex-xl-row align-items-stretch align-items-xl-center gap-2 mt-2 mt-xl-0">
            {/* Search */}
            <form onSubmit={handleSearch}>
              <div className="input-group search-group">
                <button type="submit" className="search-btn">
                  <i className="bi bi-search" />
                </button>
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="جستجوی محصولات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            {/* Login */}
            <Link
              to="/login"
              className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 fw-medium px-3 action-btn"
            >
              <i className="bi bi-person fs-5" />
              <span className="d-none d-sm-inline">ورود</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2 fw-medium px-3 position-relative action-btn"
            >
              <i className="bi bi-bag fs-5" />
              <span className="d-none d-sm-inline">سبد خرید</span>
              <span className="cart-badge position-absolute top-0 start-0 translate-middle">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
