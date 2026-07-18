import { Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { formatPriceNumber } from "../../utils/formatPrice";

const statusMap: Record<string, { label: string; class: string; icon: string }> = {
  pending: { label: "در انتظار", class: "bg-warning text-dark", icon: "bi-clock" },
  processing: { label: "در حال پردازش", class: "bg-info text-dark", icon: "bi-gear" },
  shipped: { label: "ارسال شده", class: "bg-primary", icon: "bi-truck" },
  delivered: { label: "تحویل شده", class: "bg-success", icon: "bi-check-circle" },
  cancelled: { label: "لغو شده", class: "bg-danger", icon: "bi-x-circle" },
};

export default function AccountOrders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-5 text-center">
          <i className="bi bi-box text-secondary" style={{ fontSize: "3rem" }} />
          <h5 className="fw-bold mt-3">سفارشی ثبت نشده</h5>
          <p className="text-muted">شما هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
          <Link to="/products" className="btn btn-primary rounded-pill px-4">
            <i className="bi bi-bag me-2" />
            شروع خرید
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4">
          <i className="bi bi-box text-primary me-2" />
          سفارشات من ({orders.length})
        </h5>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr className="text-muted small">
                <th>شماره سفارش</th>
                <th>تاریخ</th>
                <th>اقلام</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const st = statusMap[order.status] || statusMap.pending;
                return (
                  <tr key={order.id}>
                    <td>
                      <span className="fw-bold" style={{ direction: "ltr" }}>
                        #{order.id.toUpperCase()}
                      </span>
                    </td>
                    <td className="text-muted">
                      {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td>{order.items.length} کالا</td>
                    <td className="fw-bold text-primary">
                      {formatPriceNumber(order.total)} تومان
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${st.class}`}>
                        <i className={`bi ${st.icon} me-1`} />
                        {st.label}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/account/orders/${order.id}`}
                        className="btn btn-sm btn-outline-primary rounded-pill"
                      >
                        جزئیات
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
