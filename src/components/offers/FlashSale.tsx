import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard";
import { products } from "../../data/products";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function FlashSale() {
  const saleProducts = products.filter((p) => p.discount).slice(0, 8);

  return (
    <section style={{ paddingBottom: "var(--space-12)" }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: "center" }}>
          <span className="section-badge" style={{ background: "rgba(239,68,68,0.08)", color: "var(--c-danger)" }}>
            <i className="bi bi-lightning-charge-fill" />
            پیشنهاد ویژه
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: "var(--font-extrabold)" }}>
            محصولات تخفیف‌دار
          </h2>
          <p className="section-subtitle" style={{ marginInline: "auto" }}>
            بهترین پیشنهادات با تخفیف‌های باورنکردنی
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "var(--space-6)" }}>
          <Link
            to="/offers/all"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 20px",
              borderRadius: "var(--radius-full)",
              border: "1.5px solid var(--c-gray-200)",
              background: "var(--c-surface)",
              color: "var(--c-gray-700)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-semibold)",
              textDecoration: "none",
              transition: "all var(--duration-fast)",
            }}
          >
            مشاهده همه
            <i className="bi bi-arrow-left" />
          </Link>
        </div>

        {saleProducts.length > 0 ? (
          <motion.div
            className="product-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {saleProducts.map((product, index) => (
              <motion.div key={product.id} variants={cardVariants}>
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
            <div className="empty-state-icon" style={{ width: "80px", height: "80px" }}>
              <i className="bi bi-tag" style={{ fontSize: "2rem" }} />
            </div>
            <h4 className="empty-state-title">محصولی یافت نشد</h4>
            <p className="empty-state-desc">در حال حاضر محصول تخفیف‌داری وجود ندارد.</p>
          </div>
        )}
      </div>
    </section>
  );
}
