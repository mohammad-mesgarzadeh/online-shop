import { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    closeMobile();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    closeMobile();
    logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link fw-medium px-3 py-2 rounded-2 ${isActive ? "nav-link-active" : "nav-link-inactive"}`;

  return (
    <>
      <nav
        className={`navbar navbar-expand-xl bg-white sticky-top navbar-vesta${scrolled ? " shadow-sm" : ""}`}
      >
        <div className="container position-relative">
          {/* Left: Brand Logo */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 py-2 text-decoration-none"
          >
            <span className="brand-icon" />
            <span className="brand-text">VESTA</span>
          </Link>

          {/* Right side: Cart + Profile (visible on all screens below xl) */}
          <div className="navbar-actions d-flex align-items-center gap-1">
            {/* Cart icon - always visible */}
            <Link to="/cart" className="navbar-icon-btn position-relative" aria-label="سبد خرید">
              <i className="bi bi-bag" />
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount > 99 ? "99+" : itemCount}</span>
              )}
            </Link>

            {/* Profile / Login */}
            {isAuthenticated && user ? (
              <div className="position-relative" ref={dropdownRef}>
                <button
                  className="navbar-avatar-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="منوی کاربری"
                  aria-expanded={dropdownOpen}
                >
                  <img src={user.avatar} alt={user.name} className="navbar-avatar" />
                </button>

                {dropdownOpen && (
                  <div className="navbar-dropdown">
                    <div className="navbar-dropdown-header">
                      <img src={user.avatar} alt={user.name} className="navbar-dropdown-avatar" />
                      <div className="overflow-hidden">
                        <div className="navbar-dropdown-name">{user.name}</div>
                        <div className="navbar-dropdown-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="navbar-dropdown-divider" />
                    <Link to="/account/profile" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <i className="bi bi-person" />
                      حساب کاربری
                    </Link>
                    <Link to="/account/orders" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <i className="bi bi-box" />
                      سفارشات من
                    </Link>
                    <Link to="/account/wishlist" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <i className="bi bi-heart" />
                      علاقه‌مندی‌ها
                    </Link>
                    <Link to="/account/settings" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <i className="bi bi-gear" />
                      تنظیمات
                    </Link>
                    <div className="navbar-dropdown-divider" />
                    <button className="navbar-dropdown-item navbar-dropdown-logout" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-left" />
                      خروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="navbar-icon-btn"
                aria-label="ورود"
              >
                <i className="bi bi-person" />
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="navbar-hamburger d-xl-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="منوی ناوبری"
              aria-expanded={mobileOpen}
            >
              <span className={`hamburger-line ${mobileOpen ? "open" : ""}`} />
            </button>
          </div>

          {/* Center: Desktop Nav Links */}
          <ul className="navbar-nav-center d-none d-xl-flex gap-1">
            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass}>خانه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={navLinkClass}>فروشگاه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" className={navLinkClass}>دسته‌بندی‌ها</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/offers" className={navLinkClass}>پیشنهاد ویژه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className={navLinkClass}>وبلاگ</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div className={`navbar-mobile-overlay ${mobileOpen ? "active" : ""}`} onClick={closeMobile} />
      <div className={`navbar-mobile-menu ${mobileOpen ? "active" : ""}`} ref={mobileMenuRef}>
        <div className="mobile-menu-header d-flex align-items-center justify-content-between mb-3">
          <span className="fw-bold fs-5">منو</span>
          <button className="navbar-mobile-close" onClick={closeMobile} aria-label="بستن منو">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mb-3">
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

        {/* Mobile Nav Links */}
        <nav className="d-flex flex-column gap-1">
          <NavLink to="/" end className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-house" />
            خانه
          </NavLink>
          <NavLink to="/products" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-bag" />
            فروشگاه
          </NavLink>
          <NavLink to="/categories" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-grid" />
            دسته‌بندی‌ها
          </NavLink>
          <NavLink to="/offers" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-lightning" />
            پیشنهاد ویژه
          </NavLink>
          <NavLink to="/blog" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-journal-text" />
            وبلاگ
          </NavLink>
        </nav>

        <div className="mobile-menu-divider" />

        {/* Mobile Auth Section */}
        {isAuthenticated && user ? (
          <div>
            <div className="d-flex align-items-center gap-3 mb-3 px-2">
              <img src={user.avatar} alt={user.name} className="rounded-circle" style={{ width: 44, height: 44, objectFit: "cover" }} />
              <div className="overflow-hidden">
                <div className="fw-bold">{user.name}</div>
                <small className="text-muted" style={{ direction: "ltr" }}>{user.email}</small>
              </div>
            </div>
            <nav className="d-flex flex-column gap-1">
              <Link to="/account/profile" className="mobile-nav-link" onClick={closeMobile}>
                <i className="bi bi-person" />
                حساب کاربری
              </Link>
              <Link to="/account/orders" className="mobile-nav-link" onClick={closeMobile}>
                <i className="bi bi-box" />
                سفارشات من
              </Link>
              <Link to="/account/wishlist" className="mobile-nav-link" onClick={closeMobile}>
                <i className="bi bi-heart" />
                علاقه‌مندی‌ها
              </Link>
              <Link to="/account/settings" className="mobile-nav-link" onClick={closeMobile}>
                <i className="bi bi-gear" />
                تنظیمات
              </Link>
              <button className="mobile-nav-link mobile-nav-link-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-left" />
                خروج
              </button>
            </nav>
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            <Link to="/login" className="btn btn-primary rounded-pill py-2 fw-bold text-center" onClick={closeMobile}>
              <i className="bi bi-person me-2" />
              ورود
            </Link>
            <Link to="/register" className="btn btn-outline-primary rounded-pill py-2 fw-bold text-center" onClick={closeMobile}>
              <i className="bi bi-person-plus me-2" />
              ثبت نام
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
