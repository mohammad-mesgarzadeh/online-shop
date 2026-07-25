import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function FlashSale() {
  const saleProducts = products.filter((p) => p.discount).slice(0, 8);

  return (
    <section className="pb-5">
      <div className="container">
        <div className="d-flex justify-content-between mb-4">
          <h3 className="fw-bold">
            محصولات تخفیف دار
          </h3>
        </div>

        {saleProducts.length > 0 ? (
          <div className="row g-4">
            {saleProducts.map((product) => (
              <div
                key={product.id}
                className="col-6 col-md-6 col-xl-3"
              >
                <div className="position-relative">
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    price={`${product.price.toLocaleString()} تومان`}
                    image={product.image}
                    discount={product.discount}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">در حال حاضر محصول تخفیف‌داری وجود ندارد.</p>
          </div>
        )}
      </div>
    </section>
  );
}
