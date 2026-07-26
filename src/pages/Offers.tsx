import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import Countdown from "../components/offers/Countdown";

const CAMPAIGN_END = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Offers() {
  const saleProducts = products.filter((p) => p.discount && p.discount > 0);
  const bestDeals = [...saleProducts].sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, 4);
  const topSelling = [...saleProducts].sort((a, b) => b.sold - a.sold).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, var(--c-gray-900) 0%, #1a1035 50%, #2d1b69 100%)",
        minHeight: 420,
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(108,99,255,0.2) 0%, transparent 60%)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 70% 80%, rgba(239,68,68,0.1) 0%, transparent 50%)",
        }} />

        {/* Decorative shapes */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 200,
          height: 200,
          borderRadius: "var(--radius-full)",
          border: "1px solid rgba(108,99,255,0.15)",
          opacity: 0.5,
        }} />
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: "10%",
          width: 120,
          height: 120,
          borderRadius: "var(--radius-full)",
          border: "1px solid rgba(239,68,68,0.1)",
          opacity: 0.4,
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "var(--space-20) var(--space-4)" }}>
          <motion.div
            dir="rtl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 640 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: "var(--radius-full)",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "#f87171",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-bold)",
                marginBottom: "var(--space-6)",
              }}
            >
              <i className="bi bi-lightning-charge-fill" />
              تخفیف ویژه تا ۷۰٪
            </motion.span>

            <h1 style={{
              color: "var(--c-white)",
              fontSize: "clamp(var(--text-3xl), 6vw, var(--text-5xl))",
              fontWeight: "var(--font-black)",
              lineHeight: "var(--leading-tight)",
              marginBottom: "var(--space-4)",
            }}>
              حراج بزرگ تابستانه
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "var(--text-lg)",
              lineHeight: "var(--leading-relaxed)",
              marginBottom: "var(--space-8)",
              maxWidth: 480,
            }}>
              تا ۷۰٪ تخفیف روی محصولات منتخب فصل تابستان. فرصت محدود است!
            </p>

            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <Link
                to="/offers/all"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--c-primary)",
                  color: "var(--c-white)",
                  fontWeight: "var(--font-bold)",
                  fontSize: "var(--text-sm)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-primary-lg)",
                  transition: "all var(--duration-normal) var(--ease-default)",
                }}
              >
                <i className="bi bi-bag" />
                مشاهده همه تخفیف‌ها
              </Link>
              <Link
                to="/categories/mens-clothing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(255,255,255,0.08)",
                  color: "var(--c-white)",
                  fontWeight: "var(--font-semibold)",
                  fontSize: "var(--text-sm)",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.15)",
                  transition: "all var(--duration-normal) var(--ease-default)",
                }}
              >
                <i className="bi bi-person-standing" />
                لباس مردانه
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown */}
      <section style={{ marginTop: "-40px", position: "relative", zIndex: 10 }}>
        <Countdown endDate={CAMPAIGN_END} />
      </section>

      {/* Best Deals */}
      {bestDeals.length > 0 && (
        <section style={{ paddingBottom: "var(--space-16)" }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge" style={{ background: "rgba(239,68,68,0.08)", color: "var(--c-danger)" }}>
                <i className="bi bi-fire" />
                بهترین تخفیف‌ها
              </span>
              <h2>بیشترین تخفیف</h2>
            </div>

            <motion.div
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {bestDeals.map((product, index) => (
                <motion.div key={product.id} variants={cardVariants}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Banners */}
      <section style={{ paddingBottom: "var(--space-16)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-4)" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/categories/mens-clothing" style={{ textDecoration: "none" }}>
                <div style={{
                  borderRadius: "var(--radius-xl)",
                  background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
                  padding: "var(--space-8)",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "transform var(--duration-normal) var(--ease-default)",
                }} className="hover-lift">
                  <div style={{ position: "absolute", top: 20, left: 20, opacity: 0.1 }}>
                    <i className="bi bi-person-standing" style={{ fontSize: 80, color: "white" }} />
                  </div>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-bold)",
                    marginBottom: "var(--space-3)",
                    alignSelf: "flex-start",
                  }}>
                    تا ۴۰٪ تخفیف
                  </span>
                  <h3 style={{ color: "white", fontSize: "var(--text-2xl)", fontWeight: "var(--font-extrabold)", marginBottom: "var(--space-2)" }}>
                    لباس مردانه
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)" }}>
                    مجموعه کامل با تخفیف‌های ویژه
                  </p>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "white",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-bold)",
                  }}>
                    مشاهده محصولات
                    <i className="bi bi-arrow-left" />
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/categories/womens-clothing" style={{ textDecoration: "none" }}>
                <div style={{
                  borderRadius: "var(--radius-xl)",
                  background: "linear-gradient(135deg, #831843 0%, #be185d 100%)",
                  padding: "var(--space-8)",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "transform var(--duration-normal) var(--ease-default)",
                }} className="hover-lift">
                  <div style={{ position: "absolute", top: 20, left: 20, opacity: 0.1 }}>
                    <i className="bi bi-heart" style={{ fontSize: 80, color: "white" }} />
                  </div>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-bold)",
                    marginBottom: "var(--space-3)",
                    alignSelf: "flex-start",
                  }}>
                    تا ۶۰٪ تخفیف
                  </span>
                  <h3 style={{ color: "white", fontSize: "var(--text-2xl)", fontWeight: "var(--font-extrabold)", marginBottom: "var(--space-2)" }}>
                    لباس زنانه
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)" }}>
                    مجموعه متنوع با بهترین قیمت‌ها
                  </p>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "white",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-bold)",
                  }}>
                    مشاهده محصولات
                    <i className="bi bi-arrow-left" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Selling on Sale */}
      {topSelling.length > 0 && (
        <section style={{ paddingBottom: "var(--space-16)" }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">
                <i className="bi bi-graph-up-arrow" />
                پرفروش‌ترین
              </span>
              <h2>محصولات تخفیف‌دار پرفروش</h2>
            </div>

            <motion.div
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {topSelling.map((product, index) => (
                <motion.div key={product.id} variants={cardVariants}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ paddingBottom: "var(--space-20)" }}>
        <div className="container">
          <div style={{
            borderRadius: "var(--radius-2xl)",
            background: "linear-gradient(135deg, var(--c-gray-900) 0%, #1a1035 100%)",
            padding: "var(--space-16) var(--space-8)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(108,99,255,0.15) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{
                color: "var(--c-white)",
                fontSize: "clamp(var(--text-2xl), 4vw, var(--text-4xl))",
                fontWeight: "var(--font-extrabold)",
                marginBottom: "var(--space-4)",
              }}>
                تمامی محصولات تخفیف‌دار
              </h2>
              <p style={{ color: "var(--c-gray-400)", marginBottom: "var(--space-8)", maxWidth: 480, marginInline: "auto" }}>
                تمام محصولات دارای تخفیف را با فیلتر و مرتب‌سازی مشاهده کنید
              </p>
              <Link
                to="/offers/all"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 36px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--c-primary)",
                  color: "var(--c-white)",
                  fontWeight: "var(--font-bold)",
                  fontSize: "var(--text-base)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-primary-lg)",
                }}
              >
                <i className="bi bi-grid-3x3-gap" />
                مشاهده همه محصولات تخفیف‌دار
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
