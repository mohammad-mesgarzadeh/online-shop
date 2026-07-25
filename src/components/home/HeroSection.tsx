import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    badge: "کالکشن تابستان ۲۰۲۶",
    headline: "استایل خودت را بساز",
    sub: "جدیدترین مدل‌های مردانه و زنانه با تخفیف‌های ویژه فصل",
    cta: "خرید کنید",
    ctaSecondary: "مشاهده کالکشن",
    to: "/products",
    toSecondary: "/categories",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&q=80",
    tag: { label: "تخفیف ویژه", value: "۵۰٪" },
  },
  {
    badge: "ترندهای جدید",
    headline: "کالکشن پاییزه ۲۰۲۶",
    sub: "جدیدترین هودی‌ها، سویشرت‌ها و لباس‌های ترندی این فصل",
    cta: "مشاهده محصولات",
    ctaSecondary: "پرفروش‌ها",
    to: "/products",
    toSecondary: "/products?sort=best-selling",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80",
    tag: { label: "محصول جدید", value: "+200" },
  },
  {
    badge: "ارسال رایگان",
    headline: "استایل خاص، قیمت مناسب",
    sub: "برای خریدهای بالای ۲ میلیون تومان ارسال رایگان دریافت کنید",
    cta: "مشاهده تخفیف‌ها",
    ctaSecondary: " rules",
    to: "/offers",
    toSecondary: "/products",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80",
    tag: { label: "ارسال", value: "رایگان" },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, [stopAutoPlay]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    startAutoPlay();
  }, [startAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => { stopAutoPlay(); };
  }, [startAutoPlay, stopAutoPlay]);

  const slide = slides[current];

  return (
    <section
      className="position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        minHeight: "85vh",
        direction: "rtl",
      }}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="position-absolute top-0 start-0 w-100 h-100"
        >
          <img
            src={slide.img}
            alt={slide.headline}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.35 }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,27,75,0.85) 50%, rgba(49,46,129,0.7) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container position-relative" style={{ minHeight: "85vh", zIndex: 2 }}>
        <div className="row align-items-center" style={{ minHeight: "85vh" }}>
          <div className="col-lg-6 py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="d-inline-flex align-items-center gap-2 rounded-pill px-4 py-2 mb-4"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    color: "#e2e8f0",
                    border: "1px solid rgba(255,255,255,.12)",
                    fontSize: "var(--text-sm)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#6C63FF", boxShadow: "0 0 8px #6C63FF"
                  }} />
                  {slide.badge}
                </span>

                <h1
                  className="text-white mb-4"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    lineHeight: "1.1",
                    fontWeight: "var(--font-black)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  {slide.headline}
                </h1>

                <p
                  className="mb-5"
                  style={{
                    color: "#cbd5e1",
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    lineHeight: "1.8",
                    maxWidth: "480px",
                  }}
                >
                  {slide.sub}
                </p>

                <div className="d-flex gap-3 flex-wrap mb-5">
                  <Link
                    to={slide.to}
                    className="btn px-5 py-3 fw-bold rounded-pill"
                    style={{
                      background: "#fff",
                      color: "#0f172a",
                      fontSize: "var(--text-base)",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 20px rgba(255,255,255,0.15)",
                    }}
                  >
                    {slide.cta}
                    <i className="bi bi-arrow-left me-2" />
                  </Link>

                  <Link
                    to={slide.toSecondary || slide.to}
                    className="btn btn-outline-light rounded-pill px-5 py-3"
                    style={{ fontSize: "var(--text-base)" }}
                  >
                    {slide.ctaSecondary}
                  </Link>
                </div>

                <div className="d-flex gap-5 flex-wrap">
                  {[
                    { num: "+10K", label: "مشتری فعال" },
                    { num: "+500", label: "محصول متنوع" },
                    { num: "4.9", label: "امتیاز کاربران" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="text-white fw-bold" style={{ fontSize: "var(--text-2xl)" }}>
                        {stat.num}
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: "var(--text-sm)" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center position-relative" style={{ minHeight: "600px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="position-relative"
              >
                <div
                  style={{
                    width: "420px",
                    height: "520px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <img
                    src={slide.img}
                    alt={slide.headline}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                <div
                  className="position-absolute"
                  style={{
                    bottom: "-20px",
                    left: "-30px",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    padding: "20px 28px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                >
                  <div style={{ fontSize: "var(--text-xs)", opacity: ".7", marginBottom: 4 }}>
                    {slide.tag.label}
                  </div>
                  <div className="fw-bold" style={{ fontSize: "var(--text-3xl)" }}>
                    {slide.tag.value}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        className="d-flex justify-content-center gap-2 pb-5"
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Slide ${index + 1}`}
            style={{
              width: index === current ? "40px" : "10px",
              height: "10px",
              border: "none",
              borderRadius: "999px",
              background: index === current ? "#fff" : "rgba(255,255,255,.3)",
              transition: "all .4s cubic-bezier(0.22, 1, 0.36, 1)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
}
