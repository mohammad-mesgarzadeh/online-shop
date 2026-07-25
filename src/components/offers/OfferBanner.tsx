export default function OfferBanner() {
  return (
    <section className="pb-5">
      <div className="container">

        <div className="row g-4">

          <div className="col-sm-6">
            <div
              className="rounded-4 overflow-hidden position-relative"
              style={{
                background: "linear-gradient(135deg, rgba(220,53,69,0.1), rgba(220,53,69,0.05))",
                border: "1px solid rgba(220,53,69,0.15)",
                padding: "var(--space-8) var(--space-6)",
              }}
            >
              <div
                className="position-absolute"
                style={{
                  top: "var(--space-4)",
                  left: "var(--space-4)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(220,53,69,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="bi bi-person-standing-dress" style={{ color: "var(--c-danger)", fontSize: "1.25rem" }} />
              </div>

              <h3
                className="fw-bold mb-1"
                style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "var(--c-gray-800)" }}
              >
                لباس مردانه
              </h3>

              <p className="mb-3" style={{ color: "var(--c-gray-500)", fontSize: "var(--text-sm)" }}>
                تا ۴۰٪ تخفیف ویژه
              </p>

              <a
                href="/products"
                className="btn btn-sm rounded-pill touch-target"
                style={{
                  color: "var(--c-danger)",
                  border: "1px solid rgba(220,53,69,0.3)",
                  fontWeight: "var(--fw-medium)",
                }}
              >
                مشاهده محصولات
                <i className="bi bi-arrow-left me-1" />
              </a>
            </div>
          </div>

          <div className="col-sm-6">
            <div
              className="rounded-4 overflow-hidden position-relative"
              style={{
                background: "linear-gradient(135deg, rgba(12,107,255,0.1), rgba(12,107,255,0.05))",
                border: "1px solid rgba(12,107,255,0.15)",
                padding: "var(--space-8) var(--space-6)",
              }}
            >
              <div
                className="position-absolute"
                style={{
                  top: "var(--space-4)",
                  left: "var(--space-4)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(12,107,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="bi bi-heart" style={{ color: "var(--c-primary)", fontSize: "1.25rem" }} />
              </div>

              <h3
                className="fw-bold mb-1"
                style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "var(--c-gray-800)" }}
              >
                لباس زنانه
              </h3>

              <p className="mb-3" style={{ color: "var(--c-gray-500)", fontSize: "var(--text-sm)" }}>
                تا ۶۰٪ تخفیف ویژه
              </p>

              <a
                href="/products"
                className="btn btn-sm rounded-pill touch-target"
                style={{
                  color: "var(--c-primary)",
                  border: "1px solid rgba(12,107,255,0.3)",
                  fontWeight: "var(--fw-medium)",
                }}
              >
                مشاهده محصولات
                <i className="bi bi-arrow-left me-1" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}