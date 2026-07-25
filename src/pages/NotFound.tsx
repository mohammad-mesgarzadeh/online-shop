import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mt-5 text-center py-5 px-3" dir="rtl">
      <i
        className="bi bi-emoji-frown text-secondary"
        style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}
      ></i>
      <h1 className="fw-bold mt-4" style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}>۴۰۴</h1>
      <h4 className="text-muted mb-4">صفحه مورد نظر یافت نشد</h4>
      <p className="text-muted mb-4">
        صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
      </p>
      <Link to="/" className="btn btn-primary rounded-pill px-5 touch-target">
        بازگشت به خانه
      </Link>
    </div>
  );
}
