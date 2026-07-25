export default function OfferHero() {
  return (
    <section className="py-5">
      <div className="container">

        <div
          className="
            rounded-5
            p-4 p-md-5
            text-white
            overflow-hidden
          "
          style={{
            background:
              "linear-gradient(135deg,#6f42c1,#0d6efd)",
          }}
        >
          <div className="row align-items-center">

            <div className="col-lg-6">

              <span className="badge bg-danger mb-3">
                تخفیف ویژه
              </span>

              <h1 className="fw-bold" style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}>
                حراج بزرگ تابستانه
              </h1>

              <p className="text-white-50">
                تا 70٪ تخفیف روی محصولات منتخب
              </p>

              <button className="btn btn-light btn-lg rounded-pill touch-target">
                خرید کنید
              </button>

            </div>

            <div className="col-lg-6 text-center mt-4 mt-lg-0">

              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
                className="img-fluid rounded-4"
                alt=""
                loading="lazy"
              />

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}