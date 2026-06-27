export default function FeaturesSection() {
  const features = [
    { icon: "bi-award",        title: "ضمانت اصالت کالا",  desc: "تضمین کیفیت تمام محصولات" },
    { icon: "bi-headset",      title: "پشتیبانی ۲۴/۷",    desc: "همیشه در کنار شما هستیم" },
    { icon: "bi-shield-check", title: "گارانتی بازگشت وجه", desc: "۷ روز مهلت بازگشت خرید" },
    { icon: "bi-truck",        title: "ارسال رایگان",      desc: "برای سفارش‌های بالای ۱ میلیون تومان" },
  ];

  return (
    <section className="py-5 " dir="rtl" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
      <div className="container">
        <div className="row g-3">
          {features.map((item, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="card border h-100 feature-card">
                <div className="card-body p-4 d-flex flex-column gap-3">
                  <div className="feature-icon-box">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div>
                    <p className="feature-title text-body">{item.title}</p>
                    <p className="feature-desc text-secondary">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .feature-card { transition: border-color .18s, transform .18s; border-radius: 16px !important; }
        .feature-card:hover { border-color: #0d6efd !important; transform: translateY(-2px); }
        .feature-icon-box {
          width: 52px; height: 52px; border-radius: 14px;
          background-color: #e7f1ff;
          display: flex; align-items: center; justify-content: center;
        }
        .feature-icon-box i { font-size: 22px; color: #0d6efd; }
        .feature-title { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
        .feature-desc  { font-size: 13px; line-height: 1.7; margin-bottom: 0; }
      `}</style>
    </section>
  );
}