export default function FeaturesSection() {
  const features = [
    {
      icon: "bi-award",
      title: "ضمانت اصالت کالا",
      desc: "تضمین کیفیت تمام محصولات",
    },
    {
      icon: "bi-headset",
      title: "پشتیبانی 24/7",
      desc: "همیشه در کنار شما هستیم",
    },
    {
      icon: "bi-shield-check",
      title: "گارانتی بازگشت وجه",
      desc: "۷ روز مهلت بازگشت خرید",
    },
    {
      icon: "bi-truck",
      title: "ارسال رایگان",
      desc: "برای سفارش‌های بالای ۱ میلیون تومان",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row g-4">

          {features.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm rounded-4 h-100 feature-card">

                <div className="card-body text-center p-4">

                  <div
                    className="
                      mx-auto
                      mb-3
                      d-flex
                      align-items-center
                      justify-content-center
                      rounded-circle
                      bg-light
                    "
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <i
                      className={`bi ${item.icon} fs-2 text-primary`}
                    ></i>
                  </div>

                  <h6 className="fw-bold mb-2">
                    {item.title}
                  </h6>

                  <p className="text-secondary small mb-0">
                    {item.desc}
                  </p>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}