import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NOTIF_KEY = "vesta_notifications";

interface NotificationPrefs {
  orderNotifications: boolean;
  promotions: boolean;
  newsletter: boolean;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  time: string;
  read: boolean;
}

const defaultPrefs: NotificationPrefs = {
  orderNotifications: true,
  promotions: true,
  newsletter: false,
};

const sampleNotifications: Notification[] = [
  {
    id: "n1",
    title: "سفارش #۱۲۳۴ ارسال شد",
    description: "سفارش شما با موفقیت ارسال شد و کد رهگیری ۱۲۳۴۵۶۷۸۹۰ برای شما پیامک شد.",
    icon: "bi-truck",
    iconColor: "text-primary",
    time: "۲ ساعت پیش",
    read: false,
  },
  {
    id: "n2",
    title: "۵۰٪ تخفیف روی کلکسیون تابستانه",
    description: "فروش ویژه تابستانه با تخفیف‌های باورنکردنی شروع شد!",
    icon: "bi-tag-fill",
    iconColor: "text-danger",
    time: "۵ ساعت پیش",
    read: false,
  },
  {
    id: "n3",
    title: "محصول جدید اضافه شد",
    description: "هودی مردانه جدید با طراحی خاص و کیفیت بالا موجود شد.",
    icon: "bi-bag-plus-fill",
    iconColor: "text-success",
    time: "۱ روز پیش",
    read: true,
  },
  {
    id: "n4",
    title: "امتیاز وفاداری شما افزایش یافت",
    description: "شما ۵۰۰ امتیاز وفاداری دریافت کردید. مجموع امتیاز شما: ۲۳۰۰",
    icon: "bi-star-fill",
    iconColor: "text-warning",
    time: "۳ روز پیش",
    read: true,
  },
];

function loadPrefs(): NotificationPrefs {
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : defaultPrefs;
  } catch {
    return defaultPrefs;
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function AccountNotifications() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(loadPrefs);
  const [notifications, setNotifications] = useState(sampleNotifications);

  useEffect(() => {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const togglePref = (key: keyof NotificationPrefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const sections: { key: keyof NotificationPrefs; title: string; description: string; icon: string }[] = [
    {
      key: "orderNotifications",
      title: "اعلان‌های سفارش",
      description: "دریافت اعلان ایمیلی برای تغییرات وضعیت سفارشات",
      icon: "bi-bell",
    },
    {
      key: "promotions",
      title: "پیشنهادات و تخفیف‌ها",
      description: "اعلان تخفیف‌ها و محصولات جدید",
      icon: "bi-megaphone",
    },
    {
      key: "newsletter",
      title: "خبرنامه",
      description: "گزارش هفتگی و محصولات جدید",
      icon: "bi-envelope-paper",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">
              <i className="bi bi-bell text-primary me-2" />
              تنظیمات اعلان‌ها
            </h5>
            {unreadCount > 0 && (
              <button
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={handleMarkAllRead}
              >
                <i className="bi bi-check-all me-1" />
                خواندن همه
              </button>
            )}
          </div>

          {sections.map((section, i) => (
            <motion.div
              key={section.key}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="d-flex justify-content-between align-items-center py-3 border-bottom gap-3"
            >
              <div className="d-flex align-items-center gap-3 min-w-0">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{ width: 42, height: 42, background: "var(--c-gray-100)" }}
                >
                  <i className={`bi ${section.icon} text-primary`} />
                </div>
                <div className="min-w-0">
                  <h6 className="fw-bold mb-0">{section.title}</h6>
                  <small className="text-muted">{section.description}</small>
                </div>
              </div>
              <div className="form-check form-switch flex-shrink-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={prefs[section.key]}
                  onChange={() => togglePref(section.key)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="card border-0 shadow-sm rounded-4"
      >
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-inbox text-primary me-2" />
            آخرین اعلان‌ها
          </h6>

          {notifications.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-bell-slash text-muted" style={{ fontSize: 36 }} />
              <p className="text-muted mt-2 mb-0">هنوز اعلانی ندارید.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  custom={i + 4}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className={`d-flex gap-3 p-3 rounded-3 ${notif.read ? "bg-light" : "bg-primary bg-opacity-10"}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <i className={`bi ${notif.icon} ${notif.iconColor}`} style={{ fontSize: "1.25rem" }} />
                  </div>
                  <div className="min-w-0 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <h6 className="fw-bold mb-1">{notif.title}</h6>
                      {!notif.read && (
                        <span className="badge bg-primary rounded-pill flex-shrink-0">جدید</span>
                      )}
                    </div>
                    <p className="text-muted small mb-1">{notif.description}</p>
                    <small className="text-muted">{notif.time}</small>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
