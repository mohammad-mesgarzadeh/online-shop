import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSection() {
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
            background: "linear-gradient(135deg, #f8f7ff 0%, #f0eaff 50%, #fef2f8 100%)",
            border: "1px solid #ede9fe",
          }}
        >
          <div className="newsletter-blob-1 position-absolute top-0 end-0 rounded-circle" style={{ width: 340, height: 340, background: "#ede9fe", filter: "blur(90px)", transform: "translate(80px,-80px)", pointerEvents: "none" }} />
          <div className="newsletter-blob-2 position-absolute bottom-0 start-0 rounded-circle" style={{ width: 260, height: 260, background: "#fce7f3", filter: "blur(80px)", transform: "translate(-60px,60px)", pointerEvents: "none" }} />

          <div className="position-relative z-1">
            <div
              className="newsletter-icon-wrap d-inline-flex align-items-center justify-content-center rounded-3 mb-4"
              style={{ width: 68, height: 68, background: "#ede9fe" }}
            >
              <i className="bi bi-envelope-paper-heart fs-2" style={{ color: "#6d28d9" }} />
            </div>

            <div className="mb-3">
              <span
                className="newsletter-badge badge rounded-pill px-3 py-2 fw-normal"
                style={{ background: "#ede9fe", color: "#6d28d9", fontSize: 12, letterSpacing: ".04em" }}
              >
                <i className="bi bi-stars me-1" />
                عضویت ویژه
              </span>
            </div>

            <h2
              className="newsletter-title fw-bold mb-3"
              style={{ fontSize: "clamp(1.4rem,3vw,2rem)", color: "#1a0f3c", lineHeight: 1.35 }}
            >
              از جدیدترین کالکشن‌ها و تخفیف‌ها باخبر شوید
            </h2>

            <p
              className="newsletter-desc mb-4 mx-auto"
              style={{ maxWidth: 480, fontSize: 15, lineHeight: 1.9, color: "#7c6fa0" }}
            >
              عضو خبرنامه شوید و اولین نفری باشید که از محصولات جدید،
              حراج‌های ویژه و پیشنهادهای اختصاصی مطلع می‌شود.
            </p>

            {submitted ? (
              <div
                className="d-inline-flex align-items-center gap-2 rounded-pill px-5 py-3"
                style={{ background: "var(--c-success-bg)", color: "var(--c-success-dark)", fontWeight: "var(--font-semibold)" }}
              >
                <i className="bi bi-check-circle-fill" />
                با موفقیت عضو شدید!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="row justify-content-center mb-4">
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="input-group shadow-sm">
                    <input
                      type="email"
                      className="newsletter-input form-control border-0 px-3 px-md-4"
                      placeholder="ایمیل خود را وارد کنید"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderRadius: "100px 0 0 100px", background: "#f5f3ff", color: "#1a0f3c", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}
                    />
                    <button
                      type="submit"
                      className="newsletter-submit btn fw-bold px-3 px-md-4 d-flex align-items-center gap-2 touch-target flex-shrink-0"
                      style={{ borderRadius: "0 100px 100px 0", background: "#4f46e5", color: "#fff", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}
                    >
                      <i className="bi bi-send" />
                      <span className="d-none d-sm-inline">عضویت</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="d-flex flex-wrap justify-content-center gap-2">
              {[
                { icon: "bi-gift", text: "تخفیف ۱۰٪ برای اولین خرید" },
                { icon: "bi-bell", text: "اطلاع از موجودی محصولات" },
                { icon: "bi-shield-check", text: "بدون اسپم" },
              ].map((p, i) => (
                <span
                  key={i}
                  className="newsletter-perk d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2"
                  style={{ background: "#f5f3ff", color: "#6d28d9", fontSize: 13, border: "1px solid #ede9fe" }}
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
