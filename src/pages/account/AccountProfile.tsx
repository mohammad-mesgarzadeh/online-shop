import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatPriceNumber } from "../../utils/formatPrice";

export default function AccountProfile() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { itemCount: wishlistCount } = useWishlist();

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">
            <i className="bi bi-person text-primary me-2" />
            اطلاعات حساب کاربری
          </h5>

          <div className="row g-3">
            <div className="col-sm-6">
              <div className="bg-light rounded-3 p-3">
                <span className="text-muted small d-block mb-1">نام و نام خانوادگی</span>
                <span className="fw-bold">{user?.name}</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="bg-light rounded-3 p-3">
                <span className="text-muted small d-block mb-1">ایمیل</span>
                <span className="fw-bold" style={{ direction: "ltr" }}>{user?.email}</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="bg-light rounded-3 p-3">
                <span className="text-muted small d-block mb-1">شماره تلفن</span>
                <span className="fw-bold">{user?.phone || "ثبت نشده"}</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="bg-light rounded-3 p-3">
                <span className="text-muted small d-block mb-1">تاریخ عضویت</span>
                <span className="fw-bold">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("fa-IR") : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-4 col-sm-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-3 p-sm-4 text-center">
              <i className="bi bi-box text-primary fs-3 mb-2" />
              <h4 className="fw-bold mb-0" style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)" }}>{orders.length}</h4>
              <span className="text-muted small">سفارش</span>
            </div>
          </div>
        </div>
        <div className="col-4 col-sm-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-3 p-sm-4 text-center">
              <i className="bi bi-heart text-danger fs-3 mb-2" />
              <h4 className="fw-bold mb-0" style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)" }}>{wishlistCount}</h4>
              <span className="text-muted small">علاقه‌مندی</span>
            </div>
          </div>
        </div>
        <div className="col-4 col-sm-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-3 p-sm-4 text-center">
              <i className="bi bi-cash-stack text-success fs-3 mb-2" />
              <h4 className="fw-bold mb-0 text-truncate" style={{ fontSize: "clamp(0.8rem, 2.5vw, 1.5rem)" }}>{formatPriceNumber(totalSpent)}</h4>
              <span className="text-muted small">تومان خرید</span>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/account/edit-profile"
        className="btn btn-primary rounded-pill px-4"
      >
        <i className="bi bi-pencil me-2" />
        ویرایش پروفایل
      </Link>
    </div>
  );
}
