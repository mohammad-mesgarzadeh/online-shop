export default function OfferBanner() {
  return (
    <section className="pb-5">
      <div className="container">

        <div className="row g-4">

          <div className="col-md-6">

            <div className="bg-danger-subtle rounded-5 p-5">

              <h3 className="fw-bold">
                لباس مردانه
              </h3>

              <p>
                تا 40٪ تخفیف
              </p>

            </div>

          </div>

          <div className="col-md-6">

            <div className="bg-primary-subtle rounded-5 p-5">

              <h3 className="fw-bold">
                لباس زنانه
              </h3>

              <p>
                تا 60٪ تخفیف
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}