import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
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
  const { t } = useLanguage();
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
      setError(t("auth.emailTaken"));
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
            <h2 className="auth-title">{t("auth.registerTitle")}</h2>
            <p className="auth-subtitle">{t("auth.registerSubtitle")}</p>
          </div>

          {error && (
            <div className="auth-alert auth-alert-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">{t("auth.fullName")}</label>
              <div className="auth-input-wrapper">
                <i className="bi bi-person auth-input-icon" />
                <input
                  type="text"
                  className={`auth-input ${errors.name ? "auth-input-error" : ""}`}
                  placeholder={t("auth.namePlaceholder")}
                  {...register("name")}
                />
              </div>
              {errors.name && <span className="auth-error">{errors.name.message}</span>}
            </div>

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
                  placeholder={t("auth.minChars")}
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
              <label className="auth-label">{t("auth.confirmPassword")}</label>
              <div className="auth-input-wrapper">
                <i className="bi bi-lock-fill auth-input-icon" />
                <input
                  type={showConfirm ? "text" : "password"}
                  className={`auth-input ${errors.confirmPassword ? "auth-input-error" : ""}`}
                  placeholder={t("auth.confirmPasswordPlaceholder")}
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
                  <span className="text-primary text-decoration-underline" style={{ cursor: "pointer" }}>{t("auth.termsLink")}</span> {t("auth.termsPrefix")}
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
                  {t("auth.registering")}
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus ms-2" />
                  {t("auth.registerBtn")}
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span className="text-muted">{t("auth.hasAccountQuestion")}</span>
            <Link to="/login" className="auth-link-btn fw-bold">
              {t("auth.loginLink")}
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
