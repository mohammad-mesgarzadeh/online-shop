import { useParams, Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { formatPriceNumber } from "../../utils/formatPrice";

const statusMap: Record<string, { label: string; class: string; icon: string }> = {
  pending: { label: "در انتظار", class: "bg-warning text-dark", icon: "bi-clock" },
  processing: { label: "در حال پردازش", class: "bg-info text-dark", icon: "bi-gear" },
  shipped: { label: "ارسال شده", class: "bg-primary", icon: "bi-truck" },
  delivered: { label: "تحویل شده", class: "bg-success", icon: "bi-check-circle" },
  cancelled: { label: "لغو شده", class: "bg-danger", icon: "bi-x-circle" },
};

export default function AccountOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
            <div className="empty-state-icon" style={{ width: "80px", height: "80px" }}>
              <i className="bi bi-exclamation-circle" style={{ fontSize: "2rem" }} />
            </div>
            <h4 className="empty-state-title">سفارش یافت نشد</h4>
            <p className="empty-state-desc">سفارش مورد نظر وجود ندارد.</p>
            <Link to="/account/orders" className="btn btn-vesta-primary rounded-pill px-5">
              بازگشت به سفارشات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const st = statusMap[order.status] || statusMap.pending;

  return (
    <div>
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom gap-2">
            <div>
              <h5 className="fw-bold mb-1">جزئیات سفارش</h5>
              <span className="text-muted" style={{ direction: "ltr" }}>
                شماره: #{order.id.toUpperCase()}
              </span>
            </div>
            <span className={`badge rounded-pill px-3 py-2 ${st.class}`}>
              <i className={`bi ${st.icon} me-1`} />
              {st.label}
            </span>
          </div>

          <div className="text-muted small mb-4">
            <i className="bi bi-calendar3 me-1" />
            تاریخ ثبت: {new Date(order.createdAt).toLocaleDateString("fa-IR")}
          </div>

          <h6 className="fw-bold mb-3">اقلام سفارش</h6>
          {order.items.map((item) => (
            <div key={item.product.id} className="d-flex gap-3 mb-3 pb-3 border-bottom">
              <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                <div
                  className="rounded-3 overflow-hidden"
                  style={{ width: 64, height: 64, background: "var(--c-gray-100)" }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="flex-grow-1 min-w-0">
                <Link
                  to={`/products/${item.product.id}`}
                  className="text-decoration-none"
                >
                  <h6 className="fw-bold text-dark mb-0 text-truncate-2">{item.product.title}</h6>
                </Link>
                <span className="text-muted small">
                  {item.quantity} × {formatPriceNumber(item.product.price)} تومان
                </span>
              </div>
              <span className="fw-bold text-nowrap">
                {formatPriceNumber(item.product.price * item.quantity)} تومان
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-geo-alt text-primary me-2" />
                آدرس ارسال
              </h6>
              <p className="mb-1 fw-medium">{order.shipping.fullName}</p>
              <p className="text-muted small mb-1">{order.shipping.address}</p>
              <p className="text-muted small mb-1">{order.shipping.city} - {order.shipping.postalCode}</p>
              <p className="text-muted small" style={{ direction: "ltr" }}>{order.shipping.phone}</p>
              <p className="text-muted small" style={{ direction: "ltr" }}>{order.shipping.email}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-receipt text-primary me-2" />
                خلاصه پرداخت
              </h6>
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
              <hr />
              <div className="d-flex justify-content-between gap-2">
                <span className="fw-bold">مبلغ پرداختی</span>
                <span className="fw-bold text-primary text-nowrap">
                  {formatPriceNumber(order.total)} تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/account/orders"
        className="btn btn-outline-secondary rounded-pill px-4 mt-4 touch-target"
      >
        <i className="bi bi-arrow-right me-2" />
        بازگشت به لیست سفارشات
      </Link>
    </div>
  );
}
