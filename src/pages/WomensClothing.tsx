import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import { categoryGroups, categories } from "../data/categories";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/ProductCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const group = categoryGroups.find((g) => g.slug === "womens-clothing")!;

export default function WomensClothing() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const subCategories = useMemo(
    () => categories.filter((c) => group.slugs.includes(c.slug)),
    []
  );

  const groupProducts = useMemo(
    () => products.filter((p) => group.slugs.includes(p.category)),
    []
  );

  const filteredProducts = useMemo(
    () =>
      activeFilter === "all"
        ? groupProducts
        : groupProducts.filter((p) => p.category === activeFilter),
    [activeFilter, groupProducts]
  );

  const featured = useMemo(
    () => [...groupProducts].sort((a, b) => b.rating - a.rating)[0],
    [groupProducts]
  );

  const bestSellers = useMemo(
    () => [...groupProducts].sort((a, b) => b.sold - a.sold).slice(0, 4),
    [groupProducts]
  );

  const newArrivals = useMemo(
    () => groupProducts.filter((p) => p.isNew),
    [groupProducts]
  );

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: group.gradient,
          minHeight: 360,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={group.image}
            alt={group.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "var(--space-20) var(--space-4)" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 600 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                marginBottom: "var(--space-5)",
              }}
            >
              <i className={`bi ${group.icon}`} style={{ color: "var(--c-white)" }} />
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "var(--text-sm)", fontWeight: "var(--font-semibold)" }}>
                {group.title}
              </span>
            </div>

            <h1
              style={{
                color: "var(--c-white)",
                fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
                fontWeight: "var(--font-extrabold)",
                marginBottom: "var(--space-4)",
                lineHeight: "var(--leading-tight)",
              }}
            >
              {t("womens.title")}
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "var(--text-lg)",
                lineHeight: "var(--leading-relaxed)",
                marginBottom: "var(--space-6)",
              }}
            >
              {t("womens.desc")}
            </p>

            <Link
              to="/categories"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: "var(--radius-full)",
                background: "var(--c-white)",
                color: "var(--c-gray-900)",
                fontWeight: "var(--font-bold)",
                fontSize: "var(--text-sm)",
                textDecoration: "none",
                transition: "transform var(--duration-normal) var(--ease-default)",
              }}
            >
              <i className="bi bi-arrow-right" />
              {t("womens.backToCategories")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Product */}
      {featured && (
        <section style={{ padding: "var(--space-16) 0 var(--space-12)" }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">
                <i className="bi bi-star-fill" />
                {t("womens.featured")}
              </span>
              <h2>{t("womens.featuredProduct")}</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/products/${featured.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    background: "var(--c-surface)",
                    borderRadius: "var(--radius-2xl)",
                    border: "1px solid var(--c-border-light)",
                    overflow: "hidden",
                    transition: "box-shadow var(--duration-normal) var(--ease-default)",
                  }}
                  className="hover-lift"
                >
                  <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "var(--space-8)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 12px",
                        borderRadius: "var(--radius-full)",
                        background: "var(--c-warning-bg)",
                        color: "var(--c-warning)",
                        fontSize: "var(--text-xs)",
                        fontWeight: "var(--font-bold)",
                        marginBottom: "var(--space-4)",
                        alignSelf: "flex-start",
                      }}
                    >
                      <i className="bi bi-star-fill" style={{ fontSize: 10 }} />
                      {t("womens.highestRating")}
                    </span>

                    <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: "var(--font-extrabold)", color: "var(--c-gray-900)", marginBottom: "var(--space-3)" }}>
                      {featured.title}
                    </h3>

                    <p style={{ color: "var(--c-gray-500)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-4)", fontSize: "var(--text-sm)" }}>
                      {featured.description}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${i < Math.floor(featured.rating) ? "bi-star-fill" : i < featured.rating ? "bi-star-half" : "bi-star"}`}
                          style={{ color: "var(--c-warning)", fontSize: 14 }}
                        />
                      ))}
                      <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-bold)", color: "var(--c-gray-700)" }}>
                        {featured.rating}
                      </span>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
                        ({featured.reviewCount} {t("womens.reviews")})
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)" }}>
                      {featured.oldPrice && (
                        <span style={{ fontSize: "var(--text-base)", color: "var(--c-gray-400)", textDecoration: "line-through" }}>
                          {featured.oldPrice.toLocaleString("fa-IR")}
                        </span>
                      )}
                      <span style={{ fontSize: "var(--text-2xl)", fontWeight: "var(--font-extrabold)", color: "var(--c-primary)" }}>
                        {featured.price.toLocaleString("fa-IR")}
                      </span>
                      <span style={{ fontSize: "var(--text-sm)", color: "var(--c-gray-400)" }}>{t("common.toman")}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter Bar + All Products */}
      <section style={{ paddingBottom: "var(--space-16)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <i className="bi bi-grid-3x3-gap" />
              {t("womens.allProducts")}
            </span>
            <h2>{t("womens.womensProducts")}</h2>
          </div>

          {/* Filter Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-8)" }}>
            <button
              onClick={() => setActiveFilter("all")}
              style={{
                padding: "8px 20px",
                borderRadius: "var(--radius-full)",
                border: "1.5px solid",
                borderColor: activeFilter === "all" ? "var(--c-primary)" : "var(--c-gray-200)",
                background: activeFilter === "all" ? "var(--c-primary)" : "var(--c-surface)",
                color: activeFilter === "all" ? "var(--c-white)" : "var(--c-gray-600)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-semibold)",
                cursor: "pointer",
                transition: "all var(--duration-fast) var(--ease-default)",
                fontFamily: "var(--font-primary)",
              }}
            >
              {t("womens.all")}
            </button>
            {subCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid",
                  borderColor: activeFilter === cat.slug ? "var(--c-primary)" : "var(--c-gray-200)",
                  background: activeFilter === cat.slug ? "var(--c-primary)" : "var(--c-surface)",
                  color: activeFilter === cat.slug ? "var(--c-white)" : "var(--c-gray-600)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-semibold)",
                  cursor: "pointer",
                  transition: "all var(--duration-fast) var(--ease-default)",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div
            className="product-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            key={activeFilter}
          >
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} variants={cardVariants}>
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="bi bi-inbox" />
              </div>
              <h4 className="empty-state-title">{t("womens.noProducts")}</h4>
              <p className="empty-state-desc">{t("womens.noProductsDesc")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section style={{ paddingBottom: "var(--space-16)" }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">
                <i className="bi bi-fire" />
                {t("womens.bestSellers")}
              </span>
              <h2>{t("womens.bestSellersTitle")}</h2>
            </div>

            <motion.div
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {bestSellers.map((product, index) => (
                <motion.div key={product.id} variants={cardVariants}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section style={{ paddingBottom: "var(--space-16)" }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">
                <i className="bi bi-lightning-fill" />
                {t("womens.newArrivals")}
              </span>
              <h2>{t("womens.newArrivalsTitle")}</h2>
            </div>

            <motion.div
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {newArrivals.map((product, index) => (
                <motion.div key={product.id} variants={cardVariants}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Promo CTA */}
      <section style={{ paddingBottom: "var(--space-20)" }}>
        <div className="container">
          <div
            style={{
              borderRadius: "var(--radius-2xl)",
              background: "linear-gradient(135deg, #831843 0%, #be185d 50%, #ec4899 100%)",
              padding: "var(--space-16) var(--space-8)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                style={{
                  color: "var(--c-white)",
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--font-extrabold)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("womens.promoTitle")}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "var(--space-8)", maxWidth: 480, marginInline: "auto" }}>
                {t("womens.promoDesc")}
              </p>
              <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  to="/products"
                  className="btn-vesta-primary"
                  style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <i className="bi bi-bag" />
                  {t("womens.viewAll")}
                </Link>
                <Link
                  to="/offers"
                  className="btn-vesta-outline"
                  style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, borderColor: "rgba(255,255,255,0.2)", color: "var(--c-white)" }}
                >
                  <i className="bi bi-tag" />
                  {t("womens.specialOffers")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
