import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const testimonials = [
  { name: "testimonials.0.name", role: "testimonials.0.role", text: "testimonials.0.text", rating: 5, avatar: "https://ui-avatars.com/api/?name=SA&background=6C63FF&color=fff&bold=true&size=128" },
  { name: "testimonials.1.name", role: "testimonials.1.role", text: "testimonials.1.text", rating: 5, avatar: "https://ui-avatars.com/api/?name=MR&background=4f46e5&color=fff&bold=true&size=128" },
  { name: "testimonials.2.name", role: "testimonials.2.role", text: "testimonials.2.text", rating: 5, avatar: "https://ui-avatars.com/api/?name=NK&background=a78bfa&color=fff&bold=true&size=128" },
  { name: "testimonials.3.name", role: "testimonials.3.role", text: "testimonials.3.text", rating: 4, avatar: "https://ui-avatars.com/api/?name=AM&background=8B7CFA&color=fff&bold=true&size=128" },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <section className="py-5 py-lg-6 overflow-hidden" dir="rtl" style={{ background: "var(--c-gray-900)" }}>
      <div className="container">
        <div className="text-center mb-5">
          <span
            className="badge rounded-pill px-4 py-2 mb-3"
            style={{
              background: "rgba(108,99,255,0.15)",
              color: "#a78bfa",
              fontSize: "var(--text-sm)",
            }}
          >
            <i className="bi bi-chat-quote me-1" />
            {t("testimonials.badge")}
          </span>
          <h2 className="text-white" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="row g-4 justify-content-center">
          {testimonials.map((item, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setActive(i)}
                className="h-100 rounded-4 p-4"
                style={{
                  background: active === i
                    ? "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(167,139,250,0.08))"
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${active === i ? "rgba(108,99,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <div className="d-flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <i
                      key={s}
                      className={`bi ${s < item.rating ? "bi-star-fill" : "bi-star"}`}
                      style={{ color: "#fbbf24", fontSize: 14 }}
                    />
                  ))}
                </div>

                <p style={{ color: "#cbd5e1", fontSize: "var(--text-sm)", lineHeight: 1.8, marginBottom: "var(--space-4)" }}>
                  "{t(item.text)}"
                </p>

                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={t(item.name)}
                    className="rounded-circle"
                    style={{ width: 44, height: 44, objectFit: "cover" }}
                  />
                  <div>
                    <div className="text-white fw-bold" style={{ fontSize: "var(--text-sm)" }}>{t(item.name)}</div>
                    <div style={{ color: "#94a3b8", fontSize: "var(--text-xs)" }}>{t(item.role)}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
