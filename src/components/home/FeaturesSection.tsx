import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function FeaturesSection() {
  const { t } = useLanguage();
  const features = [
    { icon: "bi-award", title: t("features.warranty.title"), desc: t("features.warranty.desc") },
    { icon: "bi-headset", title: t("features.support.title"), desc: t("features.support.desc") },
    { icon: "bi-shield-check", title: t("features.returns.title"), desc: t("features.returns.desc") },
    { icon: "bi-truck", title: t("features.shipping.title"), desc: t("features.shipping.desc") },
  ];

  return (
    <section className="py-4" dir="rtl">
      <div className="container">
        <div className="row g-3">
          {features.map((item, i) => (
            <div key={i} className="col-6 col-sm-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card border h-100"
                style={{
                  borderRadius: "var(--radius-xl)",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--c-primary)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-colored)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className="card-body p-3 p-sm-4 d-flex flex-column gap-2 gap-sm-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: 52, height: 52,
                      background: "var(--c-primary-bg)",
                    }}
                  >
                    <i className={`bi ${item.icon}`} style={{ fontSize: 22, color: "var(--c-primary)" }} />
                  </div>
                  <div>
                    <p className="mb-1" style={{ fontSize: 15, fontWeight: "var(--font-bold)" }}>{item.title}</p>
                    <p className="mb-0" style={{ fontSize: 13, color: "var(--c-gray-500)", lineHeight: 1.7 }}>{item.desc}</p>
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
