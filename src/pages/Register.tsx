import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const registerSchema = z
  .object({
    name: z.string().min(3, "نام حداقل ۳ کاراکتر باشد"),
    email: z.email("ایمیل معتبر وارد کنید"),
    password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "رمزهای عبور مطابقت ندارند",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    const ok = await registerUser(data.name, data.email, data.password);
    if (ok) {
      navigate("/", { replace: true });
    } else {
      setError("ایمیل قبلاً ثبت شده است");
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
            <h2 className="auth-title">ایجاد حساب کاربری</h2>
            <p className="auth-subtitle">به خانواده VESTA خوش آمدید</p>
          </div>

          {error && (
            <div className="auth-alert auth-alert-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">نام و نام خانوادگی</label>
              <div className="auth-input-wrapper">
                <i className="bi bi-person auth-input-icon" />
                <input
                  type="text"
                  className={`auth-input ${errors.name ? "auth-input-error" : ""}`}
                  placeholder="نام خود را وارد کنید"
                  {...register("name")}
                />
              </div>
              {errors.name && <span className="auth-error">{errors.name.message}</span>}
            </div>

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
                  placeholder="حداقل ۶ کاراکتر"
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

            <div className="auth-field">
              <label className="auth-label">تکرار رمز عبور</label>
              <div className="auth-input-wrapper">
                <i className="bi bi-lock-fill auth-input-icon" />
                <input
                  type={showConfirm ? "text" : "password"}
                  className={`auth-input ${errors.confirmPassword ? "auth-input-error" : ""}`}
                  placeholder="رمز عبور را مجدداً وارد کنید"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={-1}
                >
                  <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="auth-error">{errors.confirmPassword.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="auth-checkbox">
                <input type="checkbox" required />
                <span>
                  <span className="text-primary text-decoration-underline" style={{ cursor: "pointer" }}>قوانین و مقررات</span> را مطالعه کرده و می‌پذیرم
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm ms-2" />
                  در حال ثبت نام...
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus ms-2" />
                  ثبت نام
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span className="text-muted">حساب کاربری دارید؟</span>
            <Link to="/login" className="auth-link-btn fw-bold">
              وارد شوید
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
