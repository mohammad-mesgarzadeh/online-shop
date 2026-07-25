export default function BlogHero() {
  return (
    <section style={{ paddingTop: "var(--space-8)" }}>
      <div className="container">

        <div
          className="rounded-4 p-4 p-md-5 text-center text-white overflow-hidden position-relative"
          style={{
            background: "linear-gradient(135deg, var(--c-gray-900), var(--c-gray-700))",
          }}
        >
          <div
            className="position-absolute"
            style={{
              inset: 0,
              background: "radial-gradient(circle at 30% 50%, rgba(108,99,255,0.15), transparent 70%)",
            }}
          />

          <div className="position-relative">
            <span
              className="badge rounded-pill mb-3"
              style={{
                background: "rgba(108,99,255,0.2)",
                color: "#fff",
                padding: "var(--space-1) var(--space-3)",
                fontSize: "var(--text-xs)",
                border: "1px solid rgba(108,99,255,0.3)",
              }}
            >
              <i className="bi bi-pencil-square me-1" />
              وبلاگ وستا
            </span>

            <h1
              className="fw-bold mb-3"
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                lineHeight: "var(--leading-tight)",
              }}
            >
              مجله مد و استایل
            </h1>

            <p
              className="mb-0 mx-auto"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "var(--text-lg)",
                maxWidth: "32rem",
              }}
            >
              آموزش استایل، ترندهای روز و راهنمای خرید لباس
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}