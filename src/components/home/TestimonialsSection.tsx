import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "سارا احمدی",
    role: "طراح مد",
    avatar: "https://ui-avatars.com/api/?name=SA&background=6C63FF&color=fff&bold=true&size=128",
    text: "کیفیت محصولات وستا واقعاً عالیه. هر بار که سفارش میدم از بسته‌بندی و کیفیت لباس‌ها شگفت‌زده میشم. بهترین فروشگاه آنلاین برای خرید لباس.",
    rating: 5,
  },
  {
    name: "محمد رضایی",
    role: "برنامه‌نویس",
    avatar: "https://ui-avatars.com/api/?name=MR&background=4f46e5&color=fff&bold=true&size=128",
    text: "ارسال سریع و بسته‌بندی شیک. قیمت‌ها نسبت به کیفیت خیلی مناسبه. حتماً دوباره خرید میکنم.",
    rating: 5,
  },
  {
    name: "نیلوفر کریمی",
    role: "عکاس",
    avatar: "https://ui-avatars.com/api/?name=NK&background=a78bfa&color=fff&bold=true&size=128",
    text: "استایل و طراحی محصولات خیلی مدرن و خاصه. دقیقاً همون چیزیه که دنبالش بودم. پشتیبانی عالی و پاسخگو.",
    rating: 5,
  },
  {
    name: "علی محمدی",
    role: "مدیر کسب‌وکار",
    avatar: "https://ui-avatars.com/api/?name=AM&background=8B7CFA&color=fff&bold=true&size=128",
    text: "از خریدم کاملاً راضیم. محصولات اصل و با کیفیت هستن. تخفیف‌های خوبی هم دارن.",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-5 py-lg-6 overflow-hidden" dir="rtl" style={{ background: "var(--c-gray-900)" }}>
      <div className="container">
        <div className="text-center mb-5">
          <span
            className="badge rounded-pill px-4 py-2 mb-3"
            style={{
              background: "rgba(108,99,255,0.15)",
              color: "#a78bfa",
              fontSize: "var(--text-sm)",
            }}
          >
            <i className="bi bi-chat-quote me-1" />
            نظرات مشتریان
          </span>
          <h2 className="text-white" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
            مشتریان ما چه می‌گویند
          </h2>
        </div>

        <div className="row g-4 justify-content-center">
          {testimonials.map((t, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setActive(i)}
                className="h-100 rounded-4 p-4"
                style={{
                  background: active === i
                    ? "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(167,139,250,0.08))"
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${active === i ? "rgba(108,99,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <div className="d-flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <i
                      key={s}
                      className={`bi ${s < t.rating ? "bi-star-fill" : "bi-star"}`}
                      style={{ color: "#fbbf24", fontSize: 14 }}
                    />
                  ))}
                </div>

                <p style={{ color: "#cbd5e1", fontSize: "var(--text-sm)", lineHeight: 1.8, marginBottom: "var(--space-4)" }}>
                  "{t.text}"
                </p>

                <div className="d-flex align-items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="rounded-circle"
                    style={{ width: 44, height: 44, objectFit: "cover" }}
                  />
                  <div>
                    <div className="text-white fw-bold" style={{ fontSize: "var(--text-sm)" }}>{t.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: "var(--text-xs)" }}>{t.role}</div>
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
