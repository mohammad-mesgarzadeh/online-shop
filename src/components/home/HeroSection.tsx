import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    badge: "کالکشن تابستان ۲۰۲۶",
    headline: "استایل خودت را بساز",
    sub: "جدیدترین مدل‌های مردانه و زنانه با تخفیف‌های ویژه",
    cta: "خرید کنید",
    to: "/products",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
    tag: {
      label: "تخفیف ویژه",
      value: "۵۰٪",
    },
  },
  {
    badge: "ترندهای جدید",
    headline: "کالکشن پاییزه ۲۰۲۶",
    sub: "جدیدترین هودی‌ها، سویشرت‌ها و لباس‌های ترندی",
    cta: "مشاهده محصولات",
    to: "/products",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    tag: {
      label: "محصول جدید",
      value: "+200",
    },
  },
  {
    badge: "ارسال رایگان",
    headline: "استایل خاص، قیمت مناسب",
    sub: "برای خریدهای بالای ۲ میلیون تومان ارسال رایگان دریافت کنید",
    cta: "مشاهده تخفیف‌ها",
    to: "/products",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
    tag: {
      label: "ارسال",
      value: "رایگان",
    },
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
    }, 5000);
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
      className="container my-4 position-relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        borderRadius: "32px",
        direction: "rtl",
      }}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div
        key={current}
        className="row g-0 align-items-center"
        style={{ minHeight: "550px" }}
      >
        {/* Content */}
        <div className="col-lg-5 p-4 p-lg-5">

          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              background: "rgba(255,255,255,.1)",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            {slide.badge}
          </span>

          <h1
            className="fw-bold text-white mb-4"
            style={{
              fontSize: "clamp(2rem,5vw,4rem)",
              lineHeight: "1.2",
            }}
          >
            {slide.headline}
          </h1>

          <p
            className="mb-4"
            style={{
              color: "#cbd5e1",
              fontSize: "1rem",
              lineHeight: "1.8",
            }}
          >
            {slide.sub}
          </p>

          <div className="d-flex gap-3 flex-wrap">

            <Link
              to={slide.to}
              className="btn btn-light rounded-pill px-4 py-3 fw-bold"
            >
              {slide.cta}
            </Link>

            <Link
              to="/products"
              className="btn btn-outline-light rounded-pill px-4 py-3"
            >
              همه محصولات
            </Link>

          </div>

          {/* Stats */}
          <div className="d-flex gap-4 mt-5 flex-wrap">

            <div>
              <h4 className="text-white fw-bold mb-0">
                +10K
              </h4>
              <small className="text-secondary">
                مشتری فعال
              </small>
            </div>

            <div>
              <h4 className="text-white fw-bold mb-0">
                +500
              </h4>
              <small className="text-secondary">
                محصول
              </small>
            </div>

            <div>
              <h4 className="text-white fw-bold mb-0">
                4.9
              </h4>
              <small className="text-secondary">
                امتیاز کاربران
              </small>
            </div>

          </div>

        </div>

        {/* Image */}
        <div
          className="col-lg-7 position-relative"
          style={{ height: "550px" }}
        >

          <img
            src={slide.img}
            alt={slide.headline}
            className="w-100 h-100"
            style={{
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to left, transparent 40%, rgba(15,23,42,.95) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "30px",
              right: "30px",
              background: "rgba(255,255,255,.12)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              padding: "16px 24px",
              border: "1px solid rgba(255,255,255,.15)",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                opacity: ".8",
              }}
            >
              {slide.tag.label}
            </div>

            <div
              className="fw-bold"
              style={{
                fontSize: "28px",
              }}
            >
              {slide.tag.value}
            </div>
          </div>

        </div>
      </div>

      {/* Indicators */}
      <div
        className="d-flex justify-content-center gap-2"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            style={{
              width: index === current ? "28px" : "8px",
              height: "8px",
              border: "none",
              borderRadius: "999px",
              background:
                index === current
                  ? "#fff"
                  : "rgba(255,255,255,.4)",
              transition: "all .3s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}