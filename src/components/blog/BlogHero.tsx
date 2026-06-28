export default function BlogHero() {
  return (
    <section className="py-5">
      <div className="container">

        <div
          className="rounded-5 p-5 text-center text-white"
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#334155)",
          }}
        >

          <span className="badge bg-primary mb-3">
            وبلاگ شاپینو
          </span>

          <h1 className="fw-bold mb-3">
            مجله مد و استایل
          </h1>

          <p className="text-white-50 mb-0">
            آموزش استایل، ترندهای روز و راهنمای خرید لباس
          </p>

        </div>

      </div>
    </section>
  );
}