import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    { icon: "bi-award", title: "ضمانت اصالت کالا", desc: "تضمین کیفیت تمام محصولات" },
    { icon: "bi-headset", title: "پشتیبانی ۲۴/۷", desc: "همیشه در کنار شما هستیم" },
    { icon: "bi-shield-check", title: "گارانتی بازگشت وجه", desc: "۷ روز مهلت بازگشت خرید" },
    { icon: "bi-truck", title: "ارسال رایگان", desc: "برای سفارش‌های بالای ۱ میلیون تومان" },
  ];

  return (
    <section className="py-4" dir="rtl">
      <div className="container">
        <div className="row g-3">
          {features.map((item, i) => (
            <div key={i} className="col-6 col-sm-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card border h-100"
                style={{
                  borderRadius: "var(--radius-xl)",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--c-primary)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-colored)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className="card-body p-3 p-sm-4 d-flex flex-column gap-2 gap-sm-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: 52, height: 52,
                      background: "var(--c-primary-bg)",
                    }}
                  >
                    <i className={`bi ${item.icon}`} style={{ fontSize: 22, color: "var(--c-primary)" }} />
                  </div>
                  <div>
                    <p className="mb-1" style={{ fontSize: 15, fontWeight: "var(--font-bold)" }}>{item.title}</p>
                    <p className="mb-0" style={{ fontSize: 13, color: "var(--c-gray-500)", lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
