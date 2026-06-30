export default function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-5">
        <div className="row g-4">

          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-4">اطلاعات تماس</h5>

            <ul className="list-unstyled d-flex flex-column gap-3">
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone fs-5 text-secondary"></i>
                <span>021-12345678</span>
              </li>

              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope fs-5 text-secondary"></i>
                <span>info@vesta-shop.com</span>
              </li>

              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt fs-5 text-secondary"></i>
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
            </ul>
          </div>

          {/* Shopping Guide */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-4">راهنمای خرید</h5>

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>نحوه ثبت سفارش</li>
              <li>روش های پرداخت</li>
              <li>ارسال و تحویل</li>
              <li>پیگیری سفارش</li>
            </ul>
          </div>

          {/* Customer Services */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-4">خدمات مشتریان</h5>

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>پرسش های متداول</li>
              <li>رویه بازگرداندن کالا</li>
              <li>شرایط و قوانین</li>
              <li>حریم خصوصی</li>
            </ul>
          </div>

          {/* About */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-4">درباره وستا</h5>

            <p className="text-secondary small lh-lg">
              وستا بزرگترین فروشگاه آنلاین لوازم خانگی و
              گجت‌های دیجیتال با بهترین کیفیت و مناسب‌ترین قیمت.
            </p>

            <div className="d-flex gap-3 mt-4">

              <a
                href="#"
                className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px" }}
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="#"
                className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px" }}
              >
                <i className="bi bi-telegram"></i>
              </a>

              <a
                href="#"
                className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px" }}
              >
                <i className="bi bi-linkedin"></i>
              </a>

              <a
                href="#"
                className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px" }}
              >
                <i className="bi bi-twitter-x"></i>
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-top py-3">
        <div className="container text-center text-secondary small">
          تمامی حقوق این وبسایت متعلق به وستا می‌باشد.
        </div>
      </div>
    </footer>
  );
}