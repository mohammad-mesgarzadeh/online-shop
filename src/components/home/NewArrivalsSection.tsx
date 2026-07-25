import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function NewArrivalsSection() {
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <section className="py-5 py-lg-6" dir="rtl" style={{ background: "var(--c-gray-50)" }}>
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-badge">
              <i className="bi bi-stars me-1" />
              جدیدترین‌ها
            </span>
            <h2>محصولات جدید</h2>
            <p className="section-subtitle mt-2">
              تازه‌ترین محصولات اضافه شده به فروشگاه ما را کشف کنید
            </p>
          </div>
          <Link to="/products?sort=newest" className="btn btn-vesta-outline rounded-pill">
            مشاهده همه
            <i className="bi bi-arrow-left me-2" />
          </Link>
        </div>

        <div className="row g-4">
          {newArrivals.map((product, index) => (
            <div key={product.id} className="col-6 col-md-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
