import { motion } from "framer-motion";

export default function BrandStorySection() {
  return (
    <section className="py-5 py-lg-6 overflow-hidden" dir="rtl">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-badge">
                <i className="bi bi-heart me-1" />
                داستان ما
              </span>
              <h2 className="mt-3 mb-4" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.2 }}>
                بیشتر از یک فروشگاه،<br />
                <span className="text-gradient">یک تجربه استایل</span>
              </h2>
              <p className="mb-4" style={{ color: "var(--c-gray-500)", lineHeight: 1.9, fontSize: "var(--text-lg)" }}>
                وستا با هدف ارائه بهترین محصولات مد و پوشاک از برندهای معتبر جهانی تأسیس شد.
                ما باور داریم که هر فردی حق دارد استایل منحصر به فرد خود را داشته باشد.
              </p>
              <p className="mb-5" style={{ color: "var(--c-gray-500)", lineHeight: 1.9, fontSize: "var(--text-base)" }}>
                از انتخاب دقیق محصولات تا بسته‌بندی لوکس و ارسال سریع، تمام تجربه خرید شما
                با دقت و عشق طراحی شده است.
              </p>

              <div className="d-flex gap-5 flex-wrap">
                {[
                  { icon: "bi-award", num: "۵۰+", label: "برند معتبر" },
                  { icon: "bi-people", num: "۱۰K+", label: "مشتری راضی" },
                  { icon: "bi-truck", num: "۲۴ ساعت", label: "ارسال سریع" },
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{
                        width: 48, height: 48,
                        background: "var(--c-primary-bg)",
                      }}
                    >
                      <i className={`bi ${item.icon}`} style={{ color: "var(--c-primary)", fontSize: "1.2rem" }} />
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: "var(--text-xl)" }}>{item.num}</div>
                      <div style={{ color: "var(--c-gray-400)", fontSize: "var(--text-sm)" }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="position-relative"
            >
              <div
                className="rounded-4 overflow-hidden"
                style={{
                  boxShadow: "var(--shadow-3xl)",
                  aspectRatio: "4 / 5",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                  alt="VESTA Brand Story"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <div
                className="position-absolute rounded-4 p-4"
                style={{
                  bottom: "-20px",
                  left: "-20px",
                  background: "var(--c-primary-gradient)",
                  color: "#fff",
                  boxShadow: "var(--shadow-primary-xl)",
                  minWidth: "180px",
                }}
              >
                <div style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--font-black)" }}>۴.۹</div>
                <div style={{ fontSize: "var(--text-sm)", opacity: 0.9 }}>امتیاز از ۵</div>
                <div className="d-flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className="bi bi-star-fill" style={{ fontSize: 12, color: "#fbbf24" }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
