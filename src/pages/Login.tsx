import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./Auth.css";

const loginSchema = z.object({
  email: z.email("ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
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
      setError(t("auth.invalidCredentials"));
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-brand">
              <span className="brand-icon" />
              <span className="brand-text">VESTA</span>
            </Link>
            <h2 className="auth-title">{t("auth.loginTitle")}</h2>
            <p className="auth-subtitle">{t("auth.loginSubtitle")}</p>
          </div>

          {error && (
            <div className="auth-alert auth-alert-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">{t("auth.email")}</label>
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
              <label className="auth-label">{t("auth.password")}</label>
              <div className="auth-input-wrapper">
                <i className="bi bi-lock auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`auth-input ${errors.password ? "auth-input-error" : ""}`}
                  placeholder={t("auth.passwordPlaceholder")}
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
                <span>{t("auth.rememberMe")}</span>
              </label>
              <button type="button" className="auth-link-btn">{t("auth.forgotPassword")}</button>
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm ms-2" />
                  {t("auth.loggingIn")}
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-left ms-2" />
                  {t("auth.loginBtn")}
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span className="text-muted">{t("auth.noAccountQuestion")}</span>
            <Link to="/register" className="auth-link-btn fw-bold">
              {t("auth.registerLink")}
            </Link>
          </div>

          <div className="auth-divider">
            <span>{t("auth.or")}</span>
          </div>

          <Link to="/" className="auth-back-home">
            <i className="bi bi-house" />
            {t("auth.backToHome")}
          </Link>
        </div>
      </div>
    </section>
  );
}
