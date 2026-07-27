import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories, categoryGroups } from "../data/categories";
import { products } from "../data/products";
import { useLanguage } from "../context/LanguageContext";
import CategoriesHero from "../components/categories/CategoriesHero";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Categories() {
  const { t } = useLanguage();
  const getCategoryCount = (slug: string) =>
    products.filter((p) => p.category === slug).length;

  return (
    <>
      <CategoriesHero />

      <section style={{ padding: "var(--space-20) 0" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-badge">
              <i className="bi bi-collection" />
              {t("categories.productCollection")}
            </span>
            <h2>{t("categories.mainCategories")}</h2>
            <p className="section-subtitle" style={{ marginInline: "auto" }}>
              {t("categories.browseMain")}
            </p>
          </div>

          <motion.div
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {categoryGroups.map((group) => {
              const count = group.slugs.reduce(
                (sum, s) => sum + getCategoryCount(s),
                0
              );
              return (
                <div key={group.slug} className="col-12 col-md-6 col-lg-4">
                  <motion.div variants={cardVariants}>
                    <Link
                      to={`/categories/${group.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "var(--radius-2xl)",
                          background: group.gradient,
                          aspectRatio: "4/5",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          padding: "var(--space-8)",
                          cursor: "pointer",
                          transition: "transform 0.35s var(--ease-default), box-shadow 0.35s var(--ease-default)",
                        }}
                        className="hover-lift"
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.transform = "translateY(-6px) scale(1.02)";
                          el.style.boxShadow = "var(--shadow-3xl)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.transform = "";
                          el.style.boxShadow = "";
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                            zIndex: 1,
                          }}
                        />

                        <div
                          style={{
                            position: "absolute",
                            top: "var(--space-6)",
                            right: "var(--space-6)",
                            width: 56,
                            height: 56,
                            borderRadius: "var(--radius-full)",
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(8px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                          }}
                        >
                          <i
                            className={`bi ${group.icon}`}
                            style={{ fontSize: "var(--text-2xl)", color: "var(--c-white)" }}
                          />
                        </div>

                        <div style={{ position: "relative", zIndex: 2, color: "var(--c-white)" }}>
                          <h3
                            style={{
                              fontSize: "var(--text-3xl)",
                              fontWeight: "var(--font-extrabold)",
                              marginBottom: "var(--space-2)",
                            }}
                          >
                            {group.title}
                          </h3>
                          <p
                            style={{
                              fontSize: "var(--text-sm)",
                              opacity: 0.85,
                              marginBottom: "var(--space-3)",
                            }}
                          >
                            {group.description}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "6px 14px",
                                borderRadius: "var(--radius-full)",
                                background: "rgba(255,255,255,0.15)",
                                backdropFilter: "blur(4px)",
                                fontSize: "var(--text-xs)",
                                fontWeight: "var(--font-semibold)",
                              }}
                            >
                              <i className="bi bi-box-seam" />
                              {count} {t("categories.products")}
                            </span>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                fontSize: "var(--text-sm)",
                                fontWeight: "var(--font-bold)",
                              }}
                            >
                              {t("categories.view")}
                              <i className="bi bi-arrow-left" style={{ fontSize: 14 }} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section
        style={{
          padding: "var(--space-10) 0",
        }}
      >
        <div className="container">
          <div
            style={{
              borderRadius: "var(--radius-2xl)",
              background: "var(--c-primary-gradient)",
              padding: "var(--space-12) var(--space-8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--space-6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1, maxWidth: 500 }}>
              <h3
                style={{
                  color: "var(--c-white)",
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--font-extrabold)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("categories.specialOffer")}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: 0, fontSize: "var(--text-base)" }}>
                {t("categories.specialOfferDesc")}
              </p>
            </div>
            <Link
              to="/offers"
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 32px",
                borderRadius: "var(--radius-full)",
                background: "var(--c-white)",
                color: "var(--c-primary-dark)",
                fontWeight: "var(--font-bold)",
                fontSize: "var(--text-sm)",
                textDecoration: "none",
                transition: "transform var(--duration-normal) var(--ease-default)",
              }}
            >
              {t("categories.viewDiscounts")}
              <i className="bi bi-arrow-left" />
            </Link>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--space-24)" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-badge">
              <i className="bi bi-grid" />
              {t("categories.browseAll")}
            </span>
            <h2>{t("categories.allCategories")}</h2>
            <p className="section-subtitle" style={{ marginInline: "auto" }}>
              {t("categories.browseByCategory")}
            </p>
          </div>

          <motion.div
            className="row g-3 g-md-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {categories.map((cat) => {
              const count = getCategoryCount(cat.slug);
              return (
                <div key={cat.slug} className="col-6 col-md-4 col-lg-3">
                  <motion.div variants={cardVariants}>
                    <Link
                      to={`/categories/${cat.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          position: "relative",
                          borderRadius: "var(--radius-xl)",
                          overflow: "hidden",
                          background: "var(--c-surface)",
                          border: "1px solid var(--c-border-light)",
                          cursor: "pointer",
                          transition: "all var(--duration-normal) var(--ease-default)",
                        }}
                        className="hover-lift"
                      >
                        <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                          <img
                            src={cat.image}
                            alt={cat.label}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                              transition: "transform 0.5s var(--ease-default)",
                            }}
                            onMouseEnter={(e) => {
                              (e.target as HTMLImageElement).style.transform = "scale(1.08)";
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLImageElement).style.transform = "";
                            }}
                          />
                        </div>

                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 50%)",
                            opacity: 0,
                            transition: "opacity var(--duration-normal) var(--ease-default)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                          }}
                          className="cat-overlay"
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.opacity = "1";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.opacity = "0";
                          }}
                        >
                          <span
                            style={{
                              padding: "10px 24px",
                              borderRadius: "var(--radius-full)",
                              background: "var(--c-white)",
                              color: "var(--c-gray-900)",
                              fontSize: "var(--text-sm)",
                              fontWeight: "var(--font-bold)",
                              boxShadow: "var(--shadow-lg)",
                              transform: "translateY(8px)",
                              transition: "transform var(--duration-normal) var(--ease-default)",
                            }}
                          >
                            {t("categories.viewProducts")}
                          </span>
                        </div>

                        <div style={{ padding: "var(--space-4) var(--space-4) var(--space-5)" }}>
                          <h5
                            style={{
                              fontSize: "var(--text-base)",
                              fontWeight: "var(--font-bold)",
                              color: "var(--c-gray-900)",
                              marginBottom: "var(--space-1)",
                            }}
                          >
                            {cat.label}
                          </h5>
                          {count > 0 && (
                            <span style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
                              {count} {t("categories.products")}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <style>{`
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
      `}</style>
    </>
  );
}
