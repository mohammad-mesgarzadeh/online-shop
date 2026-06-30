import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f8fafc" }}
      dir="rtl"
    >
      <div className="card border-0 shadow-sm rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-3 text-white fs-4 mb-3"
              style={{ width: 56, height: 56, background: "linear-gradient(135deg,#6C63FF,#a78bfa)" }}
            >
              🛍️
            </div>
            <h3 className="fw-bold">
              {isRegister ? "ثبت نام" : "ورود"}
            </h3>
            <p className="text-muted">
              {isRegister
                ? "حساب کاربری جدید بسازید"
                : "به حساب کاربری خود وارد شوید"}
            </p>
          </div>

          <form>
            {isRegister && (
              <div className="mb-3">
                <label className="form-label fw-medium">نام و نام خانوادگی</label>
                <input type="text" className="form-control" placeholder="نام خود را وارد کنید" />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-medium">ایمیل</label>
              <input type="email" className="form-control" placeholder="ایمیل خود را وارد کنید" />
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium">رمز عبور</label>
              <input type="password" className="form-control" placeholder="رمز عبور را وارد کنید" />
            </div>

            <button className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
              {isRegister ? "ثبت نام" : "ورود"}
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-muted">
              {isRegister ? "حساب کاربری دارید؟" : "حساب کاربری ندارید؟"}
            </span>
            <button
              className="btn btn-link text-decoration-none fw-bold"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "ورود" : "ثبت نام"}
            </button>
          </div>

          <hr className="my-4" />

          <div className="text-center">
            <Link to="/" className="text-decoration-none text-muted">
              <i className="bi bi-house me-1"></i>
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
