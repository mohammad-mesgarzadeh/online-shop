import ProductCard from "../ProductCard";

export default function FlashSale() {
  const products = Array(8).fill({
    title: "هودی مردانه",
    price: "890,000 تومان",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  });

  return (
    <section className="pb-5">
      <div className="container">

        <div className="d-flex justify-content-between mb-4">

          <h3 className="fw-bold">
            محصولات تخفیف دار
          </h3>

          <button className="btn btn-outline-primary">
            مشاهده همه
          </button>

        </div>

        <div className="row g-4">

          {products.map((product, index) => (
            <div
              key={index}
              className="col-md-6 col-xl-3"
            >
              <div className="position-relative">

                <span
                  className="
                    badge
                    bg-danger
                    position-absolute
                    top-0
                    start-0
                    m-3
                    z-3
                  "
                >
                  %50-
                </span>

                <ProductCard {...product} />

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}