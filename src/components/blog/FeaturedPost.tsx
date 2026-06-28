export default function FeaturedPost() {
  return (
    <section className="pb-5">
      <div className="container">

        <div className="card border-0 shadow rounded-5 overflow-hidden">

          <div className="row g-0">

            <div className="col-lg-6">

              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000"
                alt=""
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  minHeight: "350px",
                }}
              />

            </div>

            <div className="col-lg-6">

              <div className="p-5">

                <span className="badge bg-danger mb-3">
                  مقاله ویژه
                </span>

                <h2 className="fw-bold mb-3">
                  ترندهای لباس سال 2026
                </h2>

                <p className="text-muted">
                  بررسی جدیدترین ترندهای مد و پوشاک برای
                  استایل روزمره و رسمی.
                </p>

                <button className="btn btn-primary rounded-pill">
                  مطالعه مقاله
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}