import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function NewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-5 py-lg-6" dir="rtl">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="newsletter-section rounded-4 p-4 p-md-5 text-center position-relative overflow-hidden"
          style={{
            background: "var(--c-surface)",
            border: "1px solid var(--c-border-light)",
          }}
        >
          <div className="newsletter-blob-1 position-absolute top-0 end-0 rounded-circle" style={{ width: 340, height: 340, background: "var(--c-primary-bg)", filter: "blur(90px)", transform: "translate(80px,-80px)", pointerEvents: "none" }} />
          <div className="newsletter-blob-2 position-absolute bottom-0 start-0 rounded-circle" style={{ width: 260, height: 260, background: "var(--c-primary-bg)", filter: "blur(80px)", transform: "translate(-60px,60px)", pointerEvents: "none" }} />

          <div className="position-relative z-1">
            <div
              className="newsletter-icon-wrap d-inline-flex align-items-center justify-content-center rounded-3 mb-4"
              style={{ width: 68, height: 68, background: "var(--c-primary-bg)" }}
            >
              <i className="bi bi-envelope-paper-heart fs-2" style={{ color: "var(--c-primary)" }} />
            </div>

            <div className="mb-3">
              <span
                className="newsletter-badge badge rounded-pill px-3 py-2 fw-normal"
                style={{ background: "var(--c-primary-bg)", color: "var(--c-primary)", fontSize: 12, letterSpacing: ".04em" }}
              >
                <i className="bi bi-stars me-1" />
                {t("newsletter.badge")}
              </span>
            </div>

            <h2
              className="newsletter-title fw-bold mb-3"
              style={{ fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--c-gray-900)", lineHeight: 1.35 }}
            >
              {t("newsletter.title")}
            </h2>

            <p
              className="newsletter-desc mb-4 mx-auto"
              style={{ maxWidth: 480, fontSize: 15, lineHeight: 1.9, color: "var(--c-gray-500)" }}
            >
              {t("newsletter.desc")}
            </p>

            {submitted ? (
              <div
                className="d-inline-flex align-items-center gap-2 rounded-pill px-5 py-3"
                style={{ background: "var(--c-success-bg)", color: "var(--c-success-dark)", fontWeight: "var(--font-semibold)" }}
              >
                <i className="bi bi-check-circle-fill" />
                {t("newsletter.success")}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="row justify-content-center mb-4">
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="input-group shadow-sm">
                    <input
                      type="email"
                      className="newsletter-input form-control border-0 px-3 px-md-4"
                      placeholder={t("newsletter.placeholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderRadius: "100px 0 0 100px", background: "var(--c-gray-50)", color: "var(--c-gray-900)", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}
                    />
                    <button
                      type="submit"
                      className="newsletter-submit btn fw-bold px-3 px-md-4 d-flex align-items-center gap-2 touch-target flex-shrink-0"
                      style={{ borderRadius: "0 100px 100px 0", background: "var(--c-primary)", color: "#fff", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}
                    >
                      <i className="bi bi-send" />
                      <span className="d-none d-sm-inline">{t("newsletter.submit")}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="d-flex flex-wrap justify-content-center gap-2">
              {[
                { icon: "bi-gift", text: t("newsletter.perk1") },
                { icon: "bi-bell", text: t("newsletter.perk2") },
                { icon: "bi-shield-check", text: t("newsletter.perk3") },
              ].map((p, i) => (
                <span
                  key={i}
                  className="newsletter-perk d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2"
                  style={{ background: "var(--c-primary-bg)", color: "var(--c-primary)", fontSize: 13, border: "1px solid transparent" }}
                >
                  <i className={`bi ${p.icon}`} />
                  {p.text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
