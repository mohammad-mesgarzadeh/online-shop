import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { categoryGroups } from "../../data/categories";
import { categories } from "../../data/categories";

export default function CollectionsSection() {
  const { t } = useLanguage();
  return (
    <section className="py-5 py-lg-6" dir="rtl">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-badge">
              <i className="bi bi-grid-3x3-gap me-1" />
              {t("collections.badge")}
            </span>
            <h2>{t("collections.title")}</h2>
          </div>
          <Link to="/categories" className="btn btn-vesta-outline rounded-pill">
            {t("categories.viewAll")}
            <i className="bi bi-arrow-left me-2" />
          </Link>
        </div>

        <div className="row g-4">
          {categoryGroups.map((group, groupIndex) => {
            const groupCategories = group.slugs
              .map((slug) => categories.find((c) => c.slug === slug))
              .filter(Boolean);
            const mainImage = groupCategories[0]?.image;

            return (
              <div key={group.title} className="col-md-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.15 }}
                >
                  <Link
                    to={`/categories?group=${group.title}`}
                    className="text-decoration-none"
                  >
                    <div
                      className="position-relative overflow-hidden rounded-4"
                      style={{ aspectRatio: "1 / 1" }}
                    >
                      <img
                        src={mainImage}
                        alt={group.title}
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.transform = "scale(1.08)";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.transform = "scale(1)";
                        }}
                      />

                      <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)",
                        }}
                      />

                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-4"
                        style={{ zIndex: 2 }}
                      >
                        <h3 className="text-white fw-bold mb-2" style={{ fontSize: "var(--text-2xl)" }}>
                          {group.title}
                        </h3>
                        <div className="d-flex flex-wrap gap-2">
                          {groupCategories.slice(0, 4).map((cat) => (
                            <span
                              key={cat!.slug}
                              className="px-3 py-1 rounded-pill"
                              style={{
                                background: "rgba(255,255,255,0.15)",
                                color: "#e2e8f0",
                                fontSize: "var(--text-xs)",
                                backdropFilter: "blur(4px)",
                              }}
                            >
                              {cat!.label}
                            </span>
                          ))}
                        </div>
                        <div
                          className="mt-3 d-inline-flex align-items-center gap-2"
                          style={{ color: "#a78bfa", fontSize: "var(--text-sm)", fontWeight: "var(--font-semibold)" }}
                        >
                          {t("collections.viewCollection")}
                          <i className="bi bi-arrow-left" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
