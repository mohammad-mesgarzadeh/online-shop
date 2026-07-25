export default function OfferBanner() {
  return (
    <section className="pb-5">
      <div className="container">

        <div className="row g-4">

          <div className="col-sm-6">

            <div className="bg-danger-subtle rounded-5 p-4 p-md-5">

              <h3 className="fw-bold" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}>
                لباس مردانه
              </h3>

              <p className="mb-0">
                تا 40٪ تخفیف
              </p>

            </div>

          </div>

          <div className="col-sm-6">

            <div className="bg-primary-subtle rounded-5 p-4 p-md-5">

              <h3 className="fw-bold" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}>
                لباس زنانه
              </h3>

              <p className="mb-0">
                تا 60٪ تخفیف
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}