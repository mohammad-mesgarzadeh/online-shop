import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export default function AccountProfile() {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const birthDateFormatted = user?.birthDate
    ? new Date(user.birthDate).toLocaleDateString(language === "fa" ? "fa-IR" : "en-US")
    : null;

  const memberSinceFormatted = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(language === "fa" ? "fa-IR" : "en-US")
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="text-center mb-4">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="rounded-circle mb-3"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
        <h4 className="fw-bold mb-1">{user?.name}</h4>
        <span className="text-muted" style={{ direction: "ltr", display: "inline-block" }}>
          {user?.email}
        </span>
      </div>

      <div className="row g-3">
        <div className="col-sm-6">
          <div className="bg-light rounded-3 p-3">
            <span className="text-muted small d-block mb-1">{t("profile.firstName")}</span>
            <span className="fw-bold">{user?.firstName}</span>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="bg-light rounded-3 p-3">
            <span className="text-muted small d-block mb-1">{t("profile.lastName")}</span>
            <span className="fw-bold">{user?.lastName || "—"}</span>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="bg-light rounded-3 p-3">
            <span className="text-muted small d-block mb-1">{t("profile.email")}</span>
            <span className="fw-bold" style={{ direction: "ltr", display: "inline-block" }}>
              {user?.email}
            </span>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="bg-light rounded-3 p-3">
            <span className="text-muted small d-block mb-1">{t("profile.phone")}</span>
            <span className="fw-bold" style={{ direction: "ltr", display: "inline-block" }}>
              {user?.phone || "—"}
            </span>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="bg-light rounded-3 p-3">
            <span className="text-muted small d-block mb-1">{t("profile.birthDate")}</span>
            <span className="fw-bold">{birthDateFormatted || "—"}</span>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="bg-light rounded-3 p-3">
            <span className="text-muted small d-block mb-1">{t("profile.memberSince")}</span>
            <span className="fw-bold">{memberSinceFormatted || "—"}</span>
          </div>
        </div>
      </div>

      <Link
        to="/account/edit-profile"
        className="btn btn-primary rounded-pill px-4 mt-4"
      >
        <i className="bi bi-pencil me-2" />
        {t("profile.editProfile")}
      </Link>
    </motion.div>
  );
}
