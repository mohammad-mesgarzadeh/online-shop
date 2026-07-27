import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";

const USERS_KEY = "vesta_users";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "رمز عبور فعلی را وارد کنید"),
    newPassword: z.string().min(8, "حداقل ۸ کاراکتر"),
    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "رمز عبور مطابقت ندارد",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

function getPasswordStrength(password: string): { level: "weak" | "medium" | "strong"; color: string; label: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { level: "weak", color: "danger", label: "ضعیف" };
  if (score <= 3) return { level: "medium", color: "warning", label: "متوسط" };
  return { level: "strong", color: "success", label: "قوی" };
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

const mockSessions: Session[] = [
  { id: "s1", device: "iPhone 15 Pro", browser: "Safari", ip: "192.168.1.***", lastActive: "اکنون", current: true },
  { id: "s2", device: "Windows PC", browser: "Chrome", ip: "10.0.0.***", lastActive: "۲ ساعت پیش", current: false },
];

export default function AccountSecurity() {
  const { user, logout } = useAuth();
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessions, setSessions] = useState(mockSessions);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const newPasswordValue = watch("newPassword") || "";
  const strength = getPasswordStrength(newPasswordValue);

  const onPasswordSubmit = () => {
    setTimeout(() => {
      setPasswordSuccess(true);
      reset();
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 800);
  };

  const handleDeleteAccount = () => {
    if (user) {
      try {
        const raw = localStorage.getItem(USERS_KEY);
        if (raw) {
          const users = JSON.parse(raw);
          delete users[user.email];
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      } catch {
        // ignore
      }
    }
    logout();
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  return (
    <div>
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">
            <i className="bi bi-shield-lock text-primary me-2" />
            تغییر رمز عبور
          </h5>

          {passwordSuccess && (
            <div className="alert alert-success d-flex align-items-center gap-2 py-2 rounded-3 mb-3">
              <i className="bi bi-check-circle-fill" />
              رمز عبور با موفقیت تغییر کرد.
            </div>
          )}

          <form onSubmit={handleSubmit(onPasswordSubmit)}>
            <div className="mb-3">
              <label className="form-label fw-medium">رمز عبور فعلی</label>
              <input
                type="password"
                className={`form-control rounded-3 ${errors.currentPassword ? "is-invalid" : ""}`}
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <div className="invalid-feedback">{errors.currentPassword.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">رمز عبور جدید</label>
              <input
                type="password"
                className={`form-control rounded-3 ${errors.newPassword ? "is-invalid" : ""}`}
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword.message}</div>
              )}
              {newPasswordValue.length > 0 && (
                <div className="mt-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted">قدرت رمز عبور</small>
                    <small className={`fw-bold text-${strength.color}`}>{strength.label}</small>
                  </div>
                  <div className="progress" style={{ height: 6 }}>
                    <div
                      className={`progress-bar bg-${strength.color}`}
                      style={{
                        width: strength.level === "weak" ? "33%" : strength.level === "medium" ? "66%" : "100%",
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium">تکرار رمز عبور جدید</label>
              <input
                type="password"
                className={`form-control rounded-3 ${errors.confirmPassword ? "is-invalid" : ""}`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4"
              disabled={isSubmitting}
            >
              <i className="bi bi-check-lg me-2" />
              {isSubmitting ? "در حال ذخیره..." : "ذخیره رمز جدید"}
            </button>
          </form>
        </div>
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <div className="min-w-0">
              <h6 className="fw-bold mb-1">
                <i className="bi bi-shield-check text-primary me-2" />
                احراز هویت دو مرحله‌ای
              </h6>
              <small className="text-muted">افزایش امنیت حساب با تأیید از طریق پیامک</small>
            </div>
            <div className="form-check form-switch flex-shrink-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-laptop text-primary me-2" />
            نشست‌های فعال
          </h6>

          {sessions.length === 0 ? (
            <div className="text-center py-3">
              <i className="bi bi-laptop text-muted" style={{ fontSize: 36 }} />
              <p className="text-muted mt-2 mb-0">نشست فعالی وجود ندارد.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3"
                >
                  <div className="d-flex align-items-center gap-3 min-w-0">
                    <i className={`bi ${session.current ? "bi-phone" : "bi-laptop"} text-primary fs-5`} />
                    <div className="min-w-0">
                      <h6 className="fw-bold mb-0 small">
                        {session.device} — {session.browser}
                        {session.current && (
                          <span className="badge bg-success rounded-pill me-2" style={{ fontSize: "0.6rem" }}>
                            فعلی
                          </span>
                        )}
                      </h6>
                      <small className="text-muted">
                        {session.ip} · {session.lastActive}
                      </small>
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill flex-shrink-0"
                      onClick={() => handleRevokeSession(session.id)}
                    >
                      لغو
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="card border-0 shadow-sm rounded-4"
      >
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-trash3 text-danger me-2" />
            حذف حساب کاربری
          </h6>
          <p className="text-muted small mb-3">
            با حذف حساب، تمام اطلاعات شما به صورت دائمی حذف خواهد شد.
          </p>

          {showDeleteConfirm ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-danger fw-medium small">
                آیا مطمئن هستید؟
              </span>
              <button
                className="btn btn-danger btn-sm rounded-pill"
                onClick={handleDeleteAccount}
              >
                بله، حذف شود
              </button>
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill"
                onClick={() => setShowDeleteConfirm(false)}
              >
                انصراف
              </button>
            </div>
          ) : (
            <button
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <i className="bi bi-trash3 me-1" />
              درخواست حذف حساب
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
