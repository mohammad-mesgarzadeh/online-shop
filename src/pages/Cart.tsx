import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <section className="py-5" dir="rtl">
      <div className="container">
        <h2 className="fw-bold mb-4">سبد خرید</h2>

        <div className="text-center py-5">
          <i
            className="bi bi-cart text-secondary"
            style={{ fontSize: "4rem" }}
          ></i>
          <h4 className="fw-bold mt-3">سبد خرید شما خالی است</h4>
          <p className="text-muted">
            برای خرید می‌توانید از محصولات ما دیدن کنید.
          </p>
          <Link to="/products" className="btn btn-primary rounded-pill px-4">
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </section>
  );
}
