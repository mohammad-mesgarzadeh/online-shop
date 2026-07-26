import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function OfferBanner() {
  return (
    <section style={{ paddingBottom: "var(--space-12)" }}>
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
                background: "linear-gradient(135deg, rgba(220,53,69,0.06) 0%, rgba(220,53,69,0.02) 100%)",
                border: "1px solid rgba(220,53,69,0.12)",
                padding: "var(--space-8) var(--space-6)",
                position: "relative",
                overflow: "hidden",
                transition: "all var(--duration-normal) var(--ease-default)",
              }} className="hover-lift">
                <div style={{
                  position: "absolute",
                  top: "var(--space-4)",
                  left: "var(--space-4)",
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-full)",
                  background: "rgba(220,53,69,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="bi bi-person-standing-dress" style={{ color: "var(--c-danger)", fontSize: "1.25rem" }} />
                </div>

                <h3 style={{
                  fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                  fontWeight: "var(--font-bold)",
                  color: "var(--c-gray-800)",
                  marginBottom: "var(--space-1)",
                }}>
                  لباس مردانه
                </h3>

                <p style={{ color: "var(--c-gray-500)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)" }}>
                  تا ۴۰٪ تخفیف ویژه
                </p>

                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--c-danger)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-semibold)",
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
                background: "linear-gradient(135deg, rgba(12,107,255,0.06) 0%, rgba(12,107,255,0.02) 100%)",
                border: "1px solid rgba(12,107,255,0.12)",
                padding: "var(--space-8) var(--space-6)",
                position: "relative",
                overflow: "hidden",
                transition: "all var(--duration-normal) var(--ease-default)",
              }} className="hover-lift">
                <div style={{
                  position: "absolute",
                  top: "var(--space-4)",
                  left: "var(--space-4)",
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-full)",
                  background: "rgba(12,107,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="bi bi-heart" style={{ color: "var(--c-primary)", fontSize: "1.25rem" }} />
                </div>

                <h3 style={{
                  fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                  fontWeight: "var(--font-bold)",
                  color: "var(--c-gray-800)",
                  marginBottom: "var(--space-1)",
                }}>
                  لباس زنانه
                </h3>

                <p style={{ color: "var(--c-gray-500)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)" }}>
                  تا ۶۰٪ تخفیف ویژه
                </p>

                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--c-primary)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-semibold)",
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
  );
}
