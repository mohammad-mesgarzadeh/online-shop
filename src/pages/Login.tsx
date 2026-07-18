import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const loginSchema = z.object({
  email: z.email("ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const from = (location.state as { from?: string })?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    const ok = await login(data.email, data.password, true);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError("ایمیل یا رمز عبور اشتباه است");
    }
  };

  return (
    <section className="auth-page" dir="rtl">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-brand">
              <span className="brand-icon" />
              <span className="brand-text">VESTA</span>
            </Link>
            <h2 className="auth-title">ورود به حساب کاربری</h2>
            <p className="auth-subtitle">خوش آمدید! برای ادامه وارد شوید</p>
          </div>

          {error && (
            <div className="auth-alert auth-alert-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">ایمیل</label>
              <div className="auth-input-wrapper">
                <i className="bi bi-envelope auth-input-icon" />
                <input
                  type="email"
                  className={`auth-input ${errors.email ? "auth-input-error" : ""}`}
                  placeholder="example@email.com"
                  dir="ltr"
                  {...register("email")}
                />
              </div>
              {errors.email && <span className="auth-error">{errors.email.message}</span>}
            </div>

            <div className="auth-field">
              <label className="auth-label">رمز عبور</label>
              <div className="auth-input-wrapper">
                <i className="bi bi-lock auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`auth-input ${errors.password ? "auth-input-error" : ""}`}
                  placeholder="رمز عبور خود را وارد کنید"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
              </div>
              {errors.password && <span className="auth-error">{errors.password.message}</span>}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <label className="auth-checkbox">
                <input type="checkbox" defaultChecked />
                <span>مرا به خاطر بسپار</span>
              </label>
              <button type="button" className="auth-link-btn">فراموشی رمز عبور</button>
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm ms-2" />
                  در حال ورود...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-left ms-2" />
                  ورود
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span className="text-muted">حساب کاربری ندارید؟</span>
            <Link to="/register" className="auth-link-btn fw-bold">
              ثبت نام کنید
            </Link>
          </div>

          <div className="auth-divider">
            <span>یا</span>
          </div>

          <Link to="/" className="auth-back-home">
            <i className="bi bi-house" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
