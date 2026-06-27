import "./NewsletterSection.css";

export default function NewsletterSection() {
  return (
    <section className="newsletter-section py-5">
      <div className="container">

        <div className="newsletter-card text-center rounded-5 p-4 p-md-5">

          <div className="newsletter-icon mb-4">
            <i className="bi bi-envelope-paper-heart"></i>
          </div>

          <span className="badge rounded-pill text-bg-light mb-3 px-3 py-2">
            عضویت ویژه
          </span>

          <h2 className="fw-bold mb-3">
            از جدیدترین کالکشن‌ها و تخفیف‌ها باخبر شوید
          </h2>

          <p className="text-white-50 mb-4">
            عضو خبرنامه شوید و اولین نفری باشید که از محصولات جدید،
            حراج‌های ویژه و پیشنهادهای اختصاصی مطلع می‌شود.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-6">

              <div className="input-group input-group-lg">
                <input
                  type="email"
                  className="form-control border-0"
                  placeholder="ایمیل خود را وارد کنید"
                />

                <button className="btn btn-light fw-semibold px-4">
                  عضویت
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}