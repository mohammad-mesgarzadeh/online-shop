import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { formatPriceNumber } from "../utils/formatPrice";

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <section className="py-5" dir="rtl">
        <div className="container text-center py-5">
          <i className="bi bi-exclamation-circle text-secondary" style={{ fontSize: "3rem" }} />
          <h4 className="fw-bold mt-3">سفارش یافت نشد</h4>
          <p className="text-muted">سفارش مورد نظر وجود ندارد.</p>
          <Link to="/" className="btn btn-primary rounded-pill px-4">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5" dir="rtl">
      <div className="container" style={{ maxWidth: 700 }}>
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{ width: 80, height: 80, background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
          >
            <i className="bi bi-check-lg text-white" style={{ fontSize: "2.5rem" }} />
          </div>
          <h2 className="fw-bold" style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)" }}>سفارش شما ثبت شد!</h2>
          <p className="text-muted">از خرید شما متشکریم. سفارش شما در حال پردازش است.</p>
        </div>

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom gap-2">
              <div>
                <span className="text-muted small">شماره سفارش</span>
                <div className="fw-bold" style={{ direction: "ltr", textAlign: "right" }}>
                  #{order.id.toUpperCase()}
                </div>
              </div>
              <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                <i className="bi bi-clock me-1" />
                در انتظار پردازش
              </span>
            </div>

            <h6 className="fw-bold mb-3">اقلام سفارش</h6>
            {order.items.map((item) => (
              <div key={item.product.id} className="d-flex gap-3 mb-3 pb-3 border-bottom order-item-row">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="rounded-3 flex-shrink-0"
                  style={{ width: 60, height: 60, objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="flex-grow-1 min-w-0">
                  <h6 className="fw-bold mb-0 text-truncate-2">{item.product.title}</h6>
                  <span className="text-muted small">
                    {item.quantity} × {formatPriceNumber(item.product.price)} تومان
                  </span>
                </div>
                <span className="fw-bold text-nowrap">
                  {formatPriceNumber(item.product.price * item.quantity)} تومان
                </span>
              </div>
            ))}

            <div className="bg-light rounded-3 p-3 mt-3">
              <div className="d-flex justify-content-between mb-1 gap-2">
                <span className="text-muted">جمع کل</span>
                <span className="text-nowrap">{formatPriceNumber(order.subtotal)} تومان</span>
              </div>
              <div className="d-flex justify-content-between mb-1 gap-2">
                <span className="text-muted">ارسال</span>
                <span>{order.shippingCost === 0 ? "رایگان" : <span className="text-nowrap">{formatPriceNumber(order.shippingCost)} تومان</span>}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 gap-2">
                <span className="text-muted">مالیات</span>
                <span className="text-nowrap">{formatPriceNumber(order.tax)} تومان</span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between gap-2">
                <span className="fw-bold">مبلغ پرداختی</span>
                <span className="fw-bold text-primary fs-5 text-nowrap">
                  {formatPriceNumber(order.total)} تومان
                </span>
              </div>
            </div>

            <div className="mt-4 d-flex gap-3 flex-wrap">
              <Link to="/account/orders" className="btn btn-primary rounded-pill px-4 touch-target">
                <i className="bi bi-box me-2" />
                مشاهده سفارشات
              </Link>
              <Link to="/products" className="btn btn-outline-secondary rounded-pill px-4 touch-target">
                <i className="bi bi-bag me-2" />
                ادامه خرید
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
