import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function FlashSale() {
  const saleProducts = products.filter((p) => p.discount).slice(0, 8);

  return (
    <section className="pb-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0" style={{ fontSize: "var(--text-2xl)" }}>
            <i className="bi bi-lightning-charge text-warning me-2" />
            محصولات تخفیف‌دار
          </h3>
          <a href="/products" className="btn btn-sm btn-vesta-outline rounded-pill touch-target">
            مشاهده همه
            <i className="bi bi-arrow-left me-1" />
          </a>
        </div>

        {saleProducts.length > 0 ? (
          <div className="product-grid">
            {saleProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
            <div className="empty-state-icon" style={{ width: "80px", height: "80px" }}>
              <i className="bi bi-tag" style={{ fontSize: "2rem" }} />
            </div>
            <h4 className="empty-state-title">محصولی یافت نشد</h4>
            <p className="empty-state-desc">در حال حاضر محصول تخفیف‌داری وجود ندارد.</p>
          </div>
        )}
      </div>
    </section>
  );
}
