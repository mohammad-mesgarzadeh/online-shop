import { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { products } from "../data/products";
import { formatPriceNumber } from "../utils/formatPrice";
import "./Navbar.css";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

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
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    setSearchOpen(false);
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/products");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim().length > 1) {
      const q = value.trim().toLowerCase();
      const results = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (productId: string) => {
    setSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/products/${productId}`);
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
      {/* Announcement Bar */}
      <div
        className="d-none d-md-flex align-items-center justify-content-center gap-3 py-2"
        style={{
          background: "var(--c-gray-900)",
          color: "#cbd5e1",
          fontSize: "var(--text-sm)",
          height: "var(--announcement-height)",
        }}
      >
        <i className="bi bi-truck" style={{ color: "var(--c-primary-lighter)" }} />
        <span>ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان</span>
        <span style={{ color: "#475569" }}>|</span>
        <i className="bi bi-arrow-return-left" style={{ color: "var(--c-primary-lighter)" }} />
        <span>۷ روز ضمانت بازگشت</span>
      </div>

      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-xl bg-white sticky-top navbar-vesta${scrolled ? " shadow-sm" : ""}`}
        style={{ zIndex: 1030 }}
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

          {/* Right side: Actions */}
          <div className="navbar-actions d-flex align-items-center gap-1">
            {/* Search Button (Desktop) */}
            <button
              className="navbar-icon-btn d-none d-xl-flex"
              onClick={() => setSearchOpen(true)}
              aria-label="جستجو"
            >
              <i className="bi bi-search" />
            </button>

            {/* Language Toggle (Desktop) */}
            <button
              className="navbar-icon-btn d-none d-xl-flex"
              onClick={() => setLanguage(language === "fa" ? "en" : "fa")}
              aria-label="تغییر زبان"
              style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}
            >
              {language === "fa" ? "EN" : "فارسی"}
            </button>

            {/* Theme Toggle (Desktop) */}
            <button
              className="navbar-icon-btn d-none d-xl-flex"
              onClick={toggleTheme}
              aria-label="تغییر تم"
            >
              <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon"}`} />
            </button>

            {/* Wishlist */}
            <Link to="/account/wishlist" className="navbar-icon-btn position-relative d-none d-xl-flex" aria-label="علاقه‌مندی‌ها">
              <i className="bi bi-heart" />
              {wishlistCount > 0 && (
                <span className="cart-badge">{wishlistCount > 99 ? "99+" : wishlistCount}</span>
              )}
            </Link>

            {/* Cart icon */}
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
                      {t("nav.account")}
                    </Link>
                    <Link to="/account/orders" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <i className="bi bi-box" />
                      {t("nav.orders")}
                    </Link>
                    <Link to="/account/wishlist" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <i className="bi bi-heart" />
                      {t("nav.wishlist")}
                    </Link>
                    <Link to="/account/settings" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <i className="bi bi-gear" />
                      {t("nav.settings")}
                    </Link>
                    <div className="navbar-dropdown-divider" />
                    <button className="navbar-dropdown-item navbar-dropdown-logout" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-left" />
                      {t("nav.logout")}
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
              <NavLink to="/" end className={navLinkClass}>{t("nav.home")}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={navLinkClass}>{t("nav.products")}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" className={navLinkClass}>{t("nav.categories")}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/offers" className={navLinkClass}>{t("nav.offers")}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className={navLinkClass}>{t("nav.blog")}</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Search Overlay */}
      <div
        ref={searchOverlayRef}
        className={`navbar-search-overlay ${searchOpen ? "active" : ""}`}
        onClick={(e) => {
          if (e.target === searchOverlayRef.current) setSearchOpen(false);
        }}
      >
        <div className="navbar-search-container">
          <form onSubmit={handleSearch} className="d-flex align-items-center gap-3">
            <div className="flex-grow-1 d-flex align-items-center gap-3 px-4 py-3 rounded-3" style={{ background: "var(--c-gray-50)" }}>
              <i className="bi bi-search" style={{ color: "var(--c-gray-400)", fontSize: "1.2rem" }} />
              <input
                ref={searchInputRef}
                type="text"
                className="form-control border-0 bg-transparent"
                placeholder={t("nav.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                style={{ fontSize: "var(--text-lg)", boxShadow: "none", outline: "none" }}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="btn btn-sm p-1"
                  onClick={() => { setSearchTerm(""); setSearchResults([]); }}
                  style={{ color: "var(--c-gray-400)" }}
                >
                  <i className="bi bi-x-lg" />
                </button>
              )}
            </div>
            <button
              type="button"
              className="btn btn-sm p-2"
              onClick={() => setSearchOpen(false)}
              style={{ color: "var(--c-gray-400)" }}
            >
              <i className="bi bi-x-lg fs-4" />
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="mt-2 rounded-3 overflow-hidden" style={{ background: "var(--c-surface)", boxShadow: "var(--shadow-xl)" }}>
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  className="d-flex align-items-center gap-3 w-100 text-start p-3 border-0 bg-transparent"
                  style={{ cursor: "pointer", transition: "background 0.15s" }}
                  onClick={() => handleSearchResultClick(product.id)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--c-gray-50)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div
                    className="rounded-2 overflow-hidden flex-shrink-0"
                    style={{ width: 48, height: 48, background: "var(--c-gray-100)" }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div className="fw-medium" style={{ fontSize: "var(--text-sm)" }}>{product.title}</div>
                    <div style={{ color: "var(--c-primary)", fontSize: "var(--text-sm)", fontWeight: "var(--font-bold)" }}>
                      {formatPriceNumber(product.price)} تومان
                    </div>
                  </div>
                  <i className="bi bi-arrow-left" style={{ color: "var(--c-gray-300)" }} />
                </button>
              ))}
            </div>
          )}

          {!searchTerm && (
            <div className="mt-3 px-2">
              <div className="d-flex flex-wrap gap-2">
                <span style={{ color: "var(--c-gray-400)", fontSize: "var(--text-sm)" }}>پرجستجو:</span>
                {["هودی", "تیشرت", "کفش", "ساعت"].map((term) => (
                  <button
                    key={term}
                    className="btn btn-sm rounded-pill"
                    style={{
                      background: "var(--c-primary-bg)",
                      color: "var(--c-primary)",
                      fontSize: "var(--text-sm)",
                    }}
                    onClick={() => {
                      setSearchTerm(term);
                      handleSearchChange(term);
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
              placeholder={t("nav.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>

        {/* Mobile Nav Links */}
        <nav className="d-flex flex-column gap-1">
          <NavLink to="/" end className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-house" />
            {t("nav.home")}
          </NavLink>
          <NavLink to="/products" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-bag" />
            {t("nav.products")}
          </NavLink>
          <NavLink to="/categories" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-grid" />
            {t("nav.categories")}
          </NavLink>
          <NavLink to="/offers" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-lightning" />
            {t("nav.offers")}
          </NavLink>
          <NavLink to="/blog" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-journal-text" />
            {t("nav.blog")}
          </NavLink>
          <NavLink to="/account/wishlist" className="mobile-nav-link" onClick={closeMobile}>
            <i className="bi bi-heart" />
            {t("nav.wishlist")}
            {wishlistCount > 0 && (
              <span className="badge bg-danger rounded-pill ms-auto" style={{ fontSize: "var(--text-xs)" }}>
                {wishlistCount}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="mobile-menu-divider" />

        {/* Mobile Language & Theme Toggles */}
        <div className="d-flex gap-2 mb-3 px-2">
          <button
            className="btn btn-sm rounded-pill flex-grow-1 py-2 fw-medium"
            style={{ background: "var(--c-gray-100)", color: "var(--c-gray-700)", fontSize: "var(--text-sm)" }}
            onClick={() => setLanguage(language === "fa" ? "en" : "fa")}
          >
            <i className="bi bi-translate me-1" />
            {language === "fa" ? "EN" : "فارسی"}
          </button>
          <button
            className="btn btn-sm rounded-pill flex-grow-1 py-2 fw-medium"
            style={{ background: "var(--c-gray-100)", color: "var(--c-gray-700)", fontSize: "var(--text-sm)" }}
            onClick={toggleTheme}
          >
            <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon"} me-1`} />
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {/* Mobile Auth Section */}
        {isAuthenticated && user ? (
          <div>
            <div className="d-flex align-items-center gap-3 mb-3 px-2">
              <div className="rounded-circle overflow-hidden flex-shrink-0" style={{ width: 44, height: 44, background: "var(--c-gray-100)" }}>
                <img src={user.avatar} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div className="overflow-hidden">
                <div className="fw-bold">{user.name}</div>
                <small className="text-muted" style={{ direction: "ltr" }}>{user.email}</small>
              </div>
            </div>
            <nav className="d-flex flex-column gap-1">
              <Link to="/account/profile" className="mobile-nav-link" onClick={closeMobile}>
                <i className="bi bi-person" />
                {t("nav.account")}
              </Link>
              <Link to="/account/orders" className="mobile-nav-link" onClick={closeMobile}>
                <i className="bi bi-box" />
                {t("nav.orders")}
              </Link>
              <Link to="/account/wishlist" className="mobile-nav-link" onClick={closeMobile}>
                <i className="bi bi-heart" />
                {t("nav.wishlist")}
              </Link>
              <Link to="/account/settings" className="mobile-nav-link" onClick={closeMobile}>
                <i className="bi bi-gear" />
                {t("nav.settings")}
              </Link>
              <button className="mobile-nav-link mobile-nav-link-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-left" />
                {t("nav.logout")}
              </button>
            </nav>
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            <Link to="/login" className="btn btn-primary rounded-pill py-2 fw-bold text-center" onClick={closeMobile}>
              <i className="bi bi-person me-2" />
              {t("nav.login")}
            </Link>
            <Link to="/register" className="btn btn-outline-primary rounded-pill py-2 fw-bold text-center" onClick={closeMobile}>
              <i className="bi bi-person-plus me-2" />
              {t("nav.register")}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
