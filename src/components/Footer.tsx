import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ background: "var(--c-gray-900)", color: "#cbd5e1" }}>
      {/* Main Footer */}
      <div className="container py-5">
        <div className="row g-4 g-lg-5">
          {/* Brand Column */}
          <div className="col-12 col-lg-4">
            <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-4">
              <span className="brand-icon" />
              <span className="brand-text" style={{ fontSize: "1.5rem" }}>VESTA</span>
            </Link>
            <p style={{ color: "#94a3b8", lineHeight: 1.9, fontSize: "var(--text-sm)", maxWidth: 320 }}>
              {t("footer.aboutText")}
            </p>
            <div className="d-flex gap-3 mt-4">
              {[
                { icon: "bi-instagram", href: "#" },
                { icon: "bi-telegram", href: "#" },
                { icon: "bi-linkedin", href: "#" },
                { icon: "bi-twitter-x", href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 40, height: 40,
                    background: "rgba(255,255,255,0.06)",
                    color: "#94a3b8",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--c-primary)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--c-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <i className={`bi ${social.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "var(--text-base)" }}>{t("footer.quickLinks")}</h6>
            <ul className="list-unstyled d-flex flex-column" style={{ gap: "0.75rem" }}>
              {[
                { to: "/", label: t("nav.home") },
                { to: "/products", label: t("nav.products") },
                { to: "/categories", label: t("nav.categories") },
                { to: "/offers", label: t("nav.offers") },
                { to: "/blog", label: t("nav.blog") },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-decoration-none"
                    style={{ color: "#94a3b8", fontSize: "var(--text-sm)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#a78bfa"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#94a3b8"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shopping Guide */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "var(--text-base)" }}>راهنمای خرید</h6>
            <ul className="list-unstyled d-flex flex-column" style={{ gap: "0.75rem" }}>
              {[
                "نحوه ثبت سفارش",
                "روش‌های پرداخت",
                "ارسال و تحویل",
                "پیگیری سفارش",
                "شرایط ابطال",
              ].map((item, i) => (
                <li key={i}>
                  <span style={{ color: "#94a3b8", fontSize: "var(--text-sm)", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#a78bfa"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#94a3b8"; }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "var(--text-base)" }}>{t("footer.contact")}</h6>
            <ul className="list-unstyled d-flex flex-column" style={{ gap: "0.875rem" }}>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone" style={{ color: "#a78bfa", fontSize: "var(--text-sm)" }} />
                <span style={{ color: "#94a3b8", fontSize: "var(--text-sm)" }}>021-12345678</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope" style={{ color: "#a78bfa", fontSize: "var(--text-sm)" }} />
                <span style={{ color: "#94a3b8", fontSize: "var(--text-sm)" }}>info@vesta-shop.com</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt mt-1" style={{ color: "#a78bfa", fontSize: "var(--text-sm)" }} />
                <span style={{ color: "#94a3b8", fontSize: "var(--text-sm)", lineHeight: 1.7 }}>
                  تهران، خیابان ولیعصر، پلاک ۱۲۳
                </span>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-12 col-lg-2">
            <h6 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "var(--text-base)" }}>خدمات مشتریان</h6>
            <ul className="list-unstyled d-flex flex-column" style={{ gap: "0.75rem" }}>
              {[
                "پرسش‌های متداول",
                "رویه بازگرداندن کالا",
                "شرایط و قوانین",
                "حریم خصوصی",
              ].map((item, i) => (
                <li key={i}>
                  <span style={{ color: "#94a3b8", fontSize: "var(--text-sm)", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#a78bfa"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#94a3b8"; }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-3 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <small style={{ color: "#64748b" }}>
            {t("footer.rights")}
          </small>
          <div className="d-flex gap-3">
            <small style={{ color: "#64748b", cursor: "pointer" }}>حریم خصوصی</small>
            <small style={{ color: "#64748b", cursor: "pointer" }}>شرایط استفاده</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
