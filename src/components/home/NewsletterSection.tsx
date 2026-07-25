export default function NewsletterSection() {
  return (
    <section className="py-5" dir="rtl">
      <div className="container">
        <div
          className="rounded-4 p-4 p-md-5 text-center position-relative overflow-hidden"
          style={{ background: "#fff", border: "1px solid #ede9fe" }}
        >

          {/* Blobs */}
          <div className="position-absolute top-0 end-0 rounded-circle" style={{ width: 340, height: 340, background: "#ede9fe", filter: "blur(90px)", transform: "translate(80px,-80px)", pointerEvents: "none" }} />
          <div className="position-absolute bottom-0 start-0 rounded-circle" style={{ width: 260, height: 260, background: "#fce7f3", filter: "blur(80px)", transform: "translate(-60px,60px)", pointerEvents: "none" }} />

          <div className="position-relative z-1">

            {/* Icon */}
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-3 mb-4"
              style={{ width: 68, height: 68, background: "#ede9fe" }}
            >
              <i className="bi bi-envelope-paper-heart fs-2" style={{ color: "#6d28d9" }} />
            </div>

            {/* Badge */}
            <div className="mb-3">
              <span
                className="badge rounded-pill px-3 py-2 fw-normal"
                style={{ background: "#ede9fe", color: "#6d28d9", fontSize: 12, letterSpacing: ".04em" }}
              >
                <i className="bi bi-stars me-1" />
                عضویت ویژه
              </span>
            </div>

            {/* Heading */}
            <h2
              className="fw-bold mb-3"
              style={{ fontSize: "clamp(1.4rem,3vw,2rem)", color: "#1a0f3c", lineHeight: 1.35 }}
            >
              از جدیدترین کالکشن‌ها و تخفیف‌ها باخبر شوید
            </h2>

            <p
              className="mb-4 mx-auto"
              style={{ maxWidth: 480, fontSize: 15, lineHeight: 1.9, color: "#7c6fa0" }}
            >
              عضو خبرنامه شوید و اولین نفری باشید که از محصولات جدید،
              حراج‌های ویژه و پیشنهادهای اختصاصی مطلع می‌شود.
            </p>

            {/* Input */}
            <div className="row justify-content-center mb-4">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="input-group shadow-sm">
                  <input
                    type="email"
                    className="form-control border-0 px-3 px-md-4"
                    placeholder="ایمیل خود را وارد کنید"
                    style={{ borderRadius: "100px 0 0 100px", background: "#f5f3ff", color: "#1a0f3c", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}
                  />
                  <button
                    className="btn fw-bold px-3 px-md-4 d-flex align-items-center gap-2 touch-target flex-shrink-0"
                    style={{ borderRadius: "0 100px 100px 0", background: "#4f46e5", color: "#fff", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#4338ca")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#4f46e5")}
                  >
                    <i className="bi bi-send" />
                    <span className="d-none d-sm-inline">عضویت</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Perks */}
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {[
                { icon: "bi-gift", text: "تخفیف ۱۰٪ برای اولین خرید" },
                { icon: "bi-bell", text: "اطلاع از موجودی محصولات" },
                { icon: "bi-shield-check", text: "بدون اسپم" },
              ].map((p, i) => (
                <span
                  key={i}
                  className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2"
                  style={{ background: "#f5f3ff", color: "#6d28d9", fontSize: 13, border: "1px solid #ede9fe" }}
                >
                  <i className={`bi ${p.icon}`} />
                  {p.text}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}