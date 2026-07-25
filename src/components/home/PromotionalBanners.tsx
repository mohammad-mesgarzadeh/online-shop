import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PromotionalBanners() {
  const cards = [
    {
      tag: "NEW COLLECTION",
      title: "کالکشن مردانه ۲۰۲۶",
      desc: "جدیدترین هودی‌ها، تیشرت‌ها و لباس‌های استریت استایل",
      cta: "مشاهده محصولات",
      link: "/products",
      img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
      gradient: "linear-gradient(135deg, #1a0f3c 0%, #2d1b69 60%, #4c1d95 100%)",
      blob1: "#3b1fa8",
      blob2: "#6d28d9",
    },
    {
      tag: "SALE UP TO 50%",
      title: "حراج پایان فصل",
      desc: "روی صدها محصول تا ۵۰٪ تخفیف دریافت کنید",
      cta: "خرید با تخفیف",
      link: "/offers",
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
      gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
      blob1: "#1e3a5f",
      blob2: "#be185d",
    },
  ];

  return (
    <section className="py-5 py-lg-6" dir="rtl">
      <div className="container">
        <div className="row g-4">
          {cards.map((c, i) => (
            <div key={i} className="col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="rounded-4 overflow-hidden position-relative d-flex align-items-center gap-4 p-4 p-md-5"
                style={{
                  background: c.gradient,
                  minHeight: "300px",
                }}
              >
                <div
                  className="position-absolute rounded-circle"
                  style={{
                    width: 260, height: 260,
                    background: c.blob1,
                    filter: "blur(48px)",
                    opacity: 0.45,
                    top: -60, left: -60,
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="position-absolute rounded-circle"
                  style={{
                    width: 180, height: 180,
                    background: c.blob2,
                    filter: "blur(32px)",
                    opacity: 0.35,
                    bottom: -40, right: 180,
                    pointerEvents: "none",
                  }}
                />

                <div className="position-relative flex-grow-1" style={{ zIndex: 1 }}>
                  <span
                    className="px-3 py-1 mb-3 d-inline-block rounded-pill"
                    style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
                      background: i === 1 ? "var(--c-danger)" : "rgba(255,255,255,0.15)",
                      color: "#fff",
                      border: i === 0 ? "1px solid rgba(255,255,255,0.25)" : "none",
                    }}
                  >
                    {c.tag}
                  </span>

                  <h2 className="fw-bold text-white mb-2"
                    style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", lineHeight: 1.2 }}>
                    {c.title}
                  </h2>

                  <p className="text-white-50 mb-4" style={{ fontSize: 14, lineHeight: 1.7 }}>
                    {c.desc}
                  </p>

                  <Link
                    to={c.link}
                    className="btn btn-light rounded-pill px-4 py-2 fw-bold"
                    style={{ transition: "transform 0.2s ease" }}
                  >
                    {c.cta}
                  </Link>
                </div>

                <div className="position-relative d-none d-sm-block flex-shrink-0" style={{ zIndex: 1 }}>
                  <div
                    style={{
                      width: 130, height: 170,
                      borderRadius: 16,
                      overflow: "hidden",
                      transform: "rotate(3deg)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
                    }}
                  >
                    <img
                      src={c.img}
                      alt={c.title}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
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
