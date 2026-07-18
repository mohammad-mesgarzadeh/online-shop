import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const USERS_KEY = "vesta_users";

export default function AccountSettings() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = () => {
    if (user) {
      try {
        const raw = localStorage.getItem(USERS_KEY);
        if (raw) {
          const users = JSON.parse(raw);
          delete users[user.email];
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      } catch {
        // ignore
      }
    }
    logout();
  };

  return (
    <div>
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">
            <i className="bi bi-gear text-primary me-2" />
            تنظیمات حساب کاربری
          </h5>

          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h6 className="fw-bold mb-0">اعلان‌های ایمیلی</h6>
              <small className="text-muted">دریافت اعلان سفارشات و پیشنهادات</small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h6 className="fw-bold mb-0">حالت تاریک</h6>
              <small className="text-muted">فعال‌سازی تم تاریک</small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h6 className="fw-bold mb-0">زبان</h6>
              <small className="text-muted">زبان نمایش سایت</small>
            </div>
            <select className="form-select form-select-sm rounded-3" style={{ width: 150 }}>
              <option value="fa">فارسی</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-box-arrow-left text-danger me-2" />
            خروج از حساب
          </h6>
          <p className="text-muted small mb-3">
            با خروج از حساب کاربری، اطلاعات سبد خرید شما حفظ می‌شود.
          </p>
          <button
            className="btn btn-outline-danger rounded-pill px-4"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-left me-2" />
            خروج از حساب
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-trash3 text-danger me-2" />
            حذف حساب کاربری
          </h6>
          <p className="text-muted small mb-3">
            با حذف حساب، تمام اطلاعات شما به صورت دائمی حذف خواهد شد.
          </p>

          {showDeleteConfirm ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-danger fw-medium small">
                آیا مطمئن هستید؟
              </span>
              <button
                className="btn btn-danger btn-sm rounded-pill"
                onClick={handleDeleteAccount}
              >
                بله، حذف شود
              </button>
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill"
                onClick={() => setShowDeleteConfirm(false)}
              >
                انصراف
              </button>
            </div>
          ) : (
            <button
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <i className="bi bi-trash3 me-1" />
              درخواست حذف حساب
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
