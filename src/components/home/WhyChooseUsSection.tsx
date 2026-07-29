import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function WhyChooseUsSection() {
  const { t } = useLanguage();
  const reasons = [
    {
      icon: "bi-patch-check",
      title: t("whyChooseUs.reason1.title"),
      desc: t("whyChooseUs.reason1.desc"),
      color: "#6C63FF",
      bg: "rgba(108,99,255,0.08)",
    },
    {
      icon: "bi-arrow-repeat",
      title: t("whyChooseUs.reason2.title"),
      desc: t("whyChooseUs.reason2.desc"),
      color: "#10b981",
      bg: "rgba(16,185,129,0.08)",
    },
    {
      icon: "bi-truck",
      title: t("whyChooseUs.reason3.title"),
      desc: t("whyChooseUs.reason3.desc"),
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
    },
    {
      icon: "bi-headset",
      title: t("whyChooseUs.reason4.title"),
      desc: t("whyChooseUs.reason4.desc"),
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.08)",
    },
    {
      icon: "bi-wallet2",
      title: t("whyChooseUs.reason5.title"),
      desc: t("whyChooseUs.reason5.desc"),
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.08)",
    },
    {
      icon: "bi-gift",
      title: t("whyChooseUs.reason6.title"),
      desc: t("whyChooseUs.reason6.desc"),
      color: "#ec4899",
      bg: "rgba(236,72,153,0.08)",
    },
  ];

  return (
    <section className="py-5 py-lg-6 bg-light" dir="rtl">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-badge">
            <i className="bi bi-shield-check me-1" />
            {t("whyChooseUs.badge")}
          </span>
          <h2 className="mt-3" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
            {t("whyChooseUs.title")}
          </h2>
        </div>

        <div className="row g-4">
          {reasons.map((reason, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card border-0 h-100"
                style={{
                  borderRadius: "var(--radius-xl)",
                  background: "var(--c-surface)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xl)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div className="card-body p-4 p-lg-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-4"
                    style={{ width: 56, height: 56, background: reason.bg }}
                  >
                    <i className={`bi ${reason.icon}`} style={{ fontSize: "1.5rem", color: reason.color }} />
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "var(--c-gray-900)" }}>{reason.title}</h5>
                  <p className="mb-0" style={{ color: "var(--c-gray-500)", lineHeight: 1.8, fontSize: "var(--text-sm)" }}>
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
