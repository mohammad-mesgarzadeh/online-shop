import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-5" dir="rtl">
      <div className="empty-state" style={{ minHeight: "60vh" }}>
        <div className="empty-state-icon" style={{ width: "140px", height: "140px" }}>
          <i className="bi bi-emoji-frown" style={{ fontSize: "4rem" }} />
        </div>
        <h1 className="fw-bold" style={{ fontSize: "clamp(3rem, 10vw, 5rem)", color: "var(--c-gray-200)" }}>
          ۴۰۴
        </h1>
        <h3 className="empty-state-title">صفحه مورد نظر یافت نشد</h3>
        <p className="empty-state-desc">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <div className="d-flex gap-3">
          <Link to="/" className="btn btn-vesta-primary rounded-pill px-5 touch-target">
            <i className="bi bi-house me-2" />
            بازگشت به خانه
          </Link>
          <Link to="/products" className="btn btn-vesta-outline rounded-pill px-5 touch-target">
            <i className="bi bi-bag me-2" />
            فروشگاه
          </Link>
        </div>
      </div>
    </div>
  );
}
