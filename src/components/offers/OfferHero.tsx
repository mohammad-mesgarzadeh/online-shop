export default function OfferHero() {
  return (
    <section className="py-5">
      <div className="container">

        <div
          className="
            rounded-5
            p-5
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

              <h1 className="fw-bold display-5">
                حراج بزرگ تابستانه
              </h1>

              <p className="text-white-50">
                تا 70٪ تخفیف روی محصولات منتخب
              </p>

              <button className="btn btn-light btn-lg rounded-pill">
                خرید کنید
              </button>

            </div>

            <div className="col-lg-6 text-center">

              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
                className="img-fluid rounded-4"
                alt=""
              />

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}