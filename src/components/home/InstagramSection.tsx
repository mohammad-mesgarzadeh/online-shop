import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80",
];

export default function InstagramSection() {
  return (
    <section className="py-5 py-lg-6 overflow-hidden" dir="rtl">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-badge">
            <i className="bi bi-instagram me-1" />
            اینستاگرام
          </span>
          <h2 className="mt-3" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
            ما را در اینستاگرام دنبال کنید
          </h2>
          <p style={{ color: "var(--c-gray-500)", maxWidth: 500, margin: "0 auto" }}>
            @vesta_shop
          </p>
        </div>

        <div className="d-flex gap-3 overflow-auto pb-3" style={{ scrollbarWidth: "none" }}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex-shrink-0 position-relative rounded-3 overflow-hidden"
              style={{
                width: "200px",
                height: "200px",
                cursor: "pointer",
              }}
            >
              <img
                src={img}
                alt={`Instagram post ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1)";
                }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  background: "rgba(108,99,255,0.7)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0";
                }}
              >
                <i className="bi bi-instagram text-white" style={{ fontSize: "2rem" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
