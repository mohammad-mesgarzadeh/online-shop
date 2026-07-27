import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const USERS_KEY = "vesta_users";

export default function AccountSettings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [emailNotifications, setEmailNotifications] = useState(() => {
    return localStorage.getItem("vesta_email_notifications") !== "false";
  });
  const [pushNotifications, setPushNotifications] = useState(() => {
    return localStorage.getItem("vesta_push_notifications") === "true";
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleEmailNotifications = () => {
    const next = !emailNotifications;
    setEmailNotifications(next);
    localStorage.setItem("vesta_email_notifications", String(next));
  };

  const togglePushNotifications = () => {
    const next = !pushNotifications;
    setPushNotifications(next);
    localStorage.setItem("vesta_push_notifications", String(next));
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
    navigate("/");
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.35 },
    }),
  };

  return (
    <div>
      <motion.div
        className="card border-0 shadow-sm rounded-4 mb-4"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariant}
      >
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">
            <i className="bi bi-palette text-primary me-2" />
            {t("settings.appearance")}
          </h5>

          <div className="d-flex justify-content-between align-items-center py-3 border-bottom gap-2">
            <div className="min-w-0">
              <h6 className="fw-bold mb-0">{t("settings.darkMode")}</h6>
              <small className="text-muted">{t("settings.darkModeDesc")}</small>
            </div>
            <div className="form-check form-switch flex-shrink-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-3 gap-2">
            <div className="min-w-0">
              <h6 className="fw-bold mb-0">{t("settings.language")}</h6>
              <small className="text-muted">{t("settings.languageDesc")}</small>
            </div>
            <div className="d-flex gap-2 flex-shrink-0">
              <button
                className={`btn btn-sm rounded-pill px-3 ${
                  language === "fa" ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setLanguage("fa")}
              >
                FA
              </button>
              <button
                className={`btn btn-sm rounded-pill px-3 ${
                  language === "en" ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="card border-0 shadow-sm rounded-4 mb-4"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariant}
      >
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">
            <i className="bi bi-bell text-primary me-2" />
            {t("settings.notifications")}
          </h5>

          <div className="d-flex justify-content-between align-items-center py-3 border-bottom gap-2">
            <div className="min-w-0">
              <h6 className="fw-bold mb-0">{t("settings.emailNotifications")}</h6>
              <small className="text-muted">{t("settings.emailNotificationsDesc")}</small>
            </div>
            <div className="form-check form-switch flex-shrink-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={emailNotifications}
                onChange={toggleEmailNotifications}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-3 gap-2">
            <div className="min-w-0">
              <h6 className="fw-bold mb-0">{t("settings.pushNotifications")}</h6>
              <small className="text-muted">{t("settings.pushNotificationsDesc")}</small>
            </div>
            <div className="form-check form-switch flex-shrink-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={pushNotifications}
                onChange={togglePushNotifications}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="card border-0 shadow-sm rounded-4 mb-4"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariant}
      >
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-box-arrow-left text-danger me-2" />
            {t("settings.logout")}
          </h6>
          <p className="text-muted small mb-3">{t("settings.logoutDesc")}</p>
          <button
            className="btn btn-outline-danger rounded-pill px-4"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <i className="bi bi-box-arrow-left me-2" />
            {t("settings.logoutButton")}
          </button>
        </div>
      </motion.div>

      <motion.div
        className="card border-0 shadow-sm rounded-4"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={cardVariant}
      >
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-trash3 text-danger me-2" />
            {t("settings.deleteAccount")}
          </h6>
          <p className="text-muted small mb-3">{t("settings.deleteDesc")}</p>

          {showDeleteConfirm ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-danger fw-medium small">
                {t("security.deleteConfirm")}
              </span>
              <button
                className="btn btn-danger btn-sm rounded-pill"
                onClick={handleDeleteAccount}
              >
                {t("security.deleteYes")}
              </button>
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill"
                onClick={() => setShowDeleteConfirm(false)}
              >
                {t("common.cancel")}
              </button>
            </div>
          ) : (
            <button
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <i className="bi bi-trash3 me-1" />
              {t("settings.deleteButton")}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
