import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ProductCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

type SortType = "featured" | "newest" | "best-selling" | "cheapest" | "most-expensive" | "highest-rated";

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  const [sortBy, setSortBy] = useState<SortType>("featured");
  const categoryProducts = useMemo(
    () => (category ? products.filter((p) => p.category === category.slug) : []),
    [category]
  );

  const bestSellers = useMemo(
    () => [...categoryProducts].sort((a, b) => b.sold - a.sold).slice(0, 4),
    [categoryProducts]
  );

  const newArrivals = useMemo(
    () => categoryProducts.filter((p) => p.isNew),
    [categoryProducts]
  );

  const sortedProducts = useMemo(() => {
    return [...categoryProducts].sort((a, b) => {
      switch (sortBy) {
        case "cheapest": return a.price - b.price;
        case "most-expensive": return b.price - a.price;
        case "best-selling": return b.sold - a.sold;
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "highest-rated": return b.rating - a.rating;
        default: return (b.discount || 0) * 0.3 + b.sold * 0.3 + b.rating * 20 - ((a.discount || 0) * 0.3 + a.sold * 0.3 + a.rating * 20);
      }
    });
  }, [categoryProducts, sortBy]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as SortType);
  }, []);

  if (!category) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="bi bi-exclamation-circle" />
          </div>
          <h3 className="empty-state-title">دسته بندی یافت نشد</h3>
          <p className="empty-state-desc">دسته بندی مورد نظر شما وجود ندارد.</p>
          <Link to="/categories" className="btn btn-vesta-primary rounded-pill">
            بازگشت به دسته بندی‌ها
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--c-gray-900)",
        minHeight: 340,
        display: "flex",
        alignItems: "center",
      }}>
        <img
          src={category.image}
          alt={category.label}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4,
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "var(--space-16) var(--space-4)" }}>
          <motion.div
            dir="rtl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav style={{ marginBottom: "var(--space-4)" }}>
              <ol style={{ display: "flex", alignItems: "center", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                <li><Link to="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "var(--text-sm)", textDecoration: "none" }}>خانه</Link></li>
                <li style={{ color: "rgba(255,255,255,0.3)" }}>/</li>
                <li><Link to="/categories" style={{ color: "rgba(255,255,255,0.5)", fontSize: "var(--text-sm)", textDecoration: "none" }}>دسته بندی‌ها</Link></li>
                <li style={{ color: "rgba(255,255,255,0.3)" }}>/</li>
                <li style={{ color: "var(--c-white)", fontSize: "var(--text-sm)", fontWeight: "var(--font-semibold)" }}>{category.label}</li>
              </ol>
            </nav>

            <h1 style={{
              color: "var(--c-white)",
              fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
              fontWeight: "var(--font-black)",
              marginBottom: "var(--space-3)",
            }}>
              {category.label}
            </h1>

            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--text-base)", marginBottom: 0 }}>
              {category.description || `${categoryProducts.length} محصول موجود`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sort + Products */}
      <section dir="rtl" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}>
        <div className="container">
          {/* Toolbar */}
          <div className="pt">
            <div className="pt-info">
              <span className="pt-count">
                <strong>{sortedProducts.length}</strong> محصول
              </span>
            </div>
            <div className="pt-sort">
              <i className="bi bi-sort-down pt-sort-icon" />
              <select
                className="pt-sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="featured">پیشنهادی</option>
                <option value="newest">جدیدترین</option>
                <option value="best-selling">پرفروش‌ترین</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="most-expensive">گران‌ترین</option>
                <option value="highest-rated">بالاترین امتیاز</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <motion.div
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              key={slug}
            >
              {sortedProducts.map((product, index) => (
                <motion.div key={product.id} variants={cardVariants}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="bi bi-box" />
              </div>
              <h3 className="empty-state-title">محصولی یافت نشد</h3>
              <p className="empty-state-desc">هنوز محصولی برای این دسته بندی اضافه نشده است.</p>
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
                پرفروش‌ها
              </span>
              <h2>پرفروش‌ترین {category.label}</h2>
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
                جدید
              </span>
              <h2>جدیدترین {category.label}</h2>
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

      {/* Promo */}
      <section style={{ paddingBottom: "var(--space-20)" }}>
        <div className="container">
          <div style={{
            borderRadius: "var(--radius-2xl)",
            background: "linear-gradient(135deg, var(--c-gray-900) 0%, var(--c-primary-dark) 100%)",
            padding: "var(--space-12) var(--space-8)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ color: "var(--c-white)", fontSize: "var(--text-2xl)", fontWeight: "var(--font-extrabold)", marginBottom: "var(--space-3)" }}>
                پیشنهادات ویژه {category.label}
              </h2>
              <p style={{ color: "var(--c-gray-400)", marginBottom: "var(--space-6)", maxWidth: 400, marginInline: "auto" }}>
                محصولات تخفیف‌دار این دسته را از دست ندهید
              </p>
              <Link
                to="/offers"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 32px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--c-primary)",
                  color: "var(--c-white)",
                  fontWeight: "var(--font-bold)",
                  fontSize: "var(--text-sm)",
                  textDecoration: "none",
                }}
              >
                <i className="bi bi-tag" />
                مشاهده تخفیف‌ها
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
