export default function OfferHero() {
  return (
    <section style={{ paddingTop: "var(--space-8)" }}>
      <div className="container">

        <div
          className="rounded-4 overflow-hidden position-relative"
          style={{
            background: "linear-gradient(135deg, var(--c-primary), var(--c-accent-blue, #0d6efd))",
          }}
        >
          <div className="row align-items-center g-0">

            <div className="col-lg-6 p-4 p-md-5 position-relative" style={{ zIndex: 1 }}>

              <span
                className="badge rounded-pill mb-3"
                style={{
                  background: "var(--c-danger)",
                  color: "#fff",
                  padding: "var(--space-2) var(--space-4)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <i className="bi bi-lightning-charge-fill me-1" />
                تخفیف ویژه
              </span>

              <h1
                className="fw-bold text-white mb-3"
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 3rem)",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                حراج بزرگ تابستانه
              </h1>

              <p className="mb-4" style={{ color: "rgba(255,255,255,0.75)", fontSize: "var(--text-lg)", maxWidth: "28rem" }}>
                تا ۷۰٪ تخفیف روی محصولات منتخب فصل تابستان
              </p>

              <button
                className="btn btn-lg rounded-pill touch-target"
                style={{
                  background: "var(--c-surface)",
                  color: "var(--c-primary)",
                  fontWeight: "var(--fw-semibold)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <i className="bi bi-bag me-2" />
                خرید کنید
              </button>

            </div>

            <div className="col-lg-6 d-none d-lg-block">
              <div style={{ aspectRatio: "1", maxHeight: "400px", margin: "var(--space-8)" }}>
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
                  alt="حراج تابستانه"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-2xl)" }}
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}