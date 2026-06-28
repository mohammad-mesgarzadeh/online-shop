export default function PromotionalBanners() {
  const cards = [
    {
      tag: "NEW COLLECTION",
      title: "کالکشن مردانه ۲۰۲۶",
      desc: "جدیدترین هودی‌ها، تیشرت‌ها و لباس‌های استریت استایل",
      cta: "مشاهده محصولات",
      img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
      gradientClass: "promo-men",
    },
    {
      tag: "SALE UP TO 50%",
      title: "حراج پایان فصل",
      desc: "روی صدها محصول تا ۵۰٪ تخفیف دریافت کنید",
      cta: "خرید با تخفیف",
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
      gradientClass: "promo-sale",
    },
  ];

  return (
    <>
      <style>{`
        .promo-men  { background: linear-gradient(135deg, #1a0f3c 0%, #2d1b69 60%, #4c1d95 100%); }
        .promo-sale { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%); }
        .promo-blob-1 {
          position: absolute; width: 260px; height: 260px;
          border-radius: 50%; top: -60px; left: -60px;
          filter: blur(48px); pointer-events: none; opacity: .45;
        }
        .promo-blob-2 {
          position: absolute; width: 180px; height: 180px;
          border-radius: 50%; bottom: -40px; right: 180px;
          filter: blur(32px); pointer-events: none; opacity: .35;
        }
        .promo-men  .promo-blob-1 { background: #3b1fa8; }
        .promo-men  .promo-blob-2 { background: #6d28d9; }
        .promo-sale .promo-blob-1 { background: #1e3a5f; }
        .promo-sale .promo-blob-2 { background: #be185d; }
        .promo-img {
          width: 130px; height: 170px; object-fit: cover;
          border-radius: 16px; transform: rotate(3deg);
          box-shadow: 0 20px 40px rgba(0,0,0,.45);
          flex-shrink: 0;
        }
        .promo-cta {
          border-radius: 100px !important;
          font-weight: 700 !important;
          font-size: 14px !important;
          transition: transform .15s !important;
        }
        .promo-cta:hover { transform: scale(1.04); }
        .promo-tag {
          font-size: 11px; font-weight: 700; letter-spacing: .08em;
          border-radius: 100px; display: inline-block;
        }
      `}</style>

      <section className="py-5" dir="rtl">
        <div className="container">
          <div className="row g-4">
            {cards.map((c, i) => (
              <div key={i} className="col-lg-6">
                <div className={`${c.gradientClass} rounded-4 overflow-hidden position-relative p-4 p-md-5 d-flex align-items-center gap-4`}
                  style={{ minHeight: "300px" }}>

                  <div className="promo-blob-1" />
                  <div className="promo-blob-2" />

                  {/* Text */}
                  <div className="position-relative z-1 flex-grow-1">
                    <span className={`promo-tag px-3 py-1 mb-3 ${i === 1 ? "bg-danger text-white" : "text-white"}`}
                      style={i === 0 ? { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" } : {}}>
                      {c.tag}
                    </span>

                    <h2 className="fw-bold text-white mb-2"
                      style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", lineHeight: 1.2 }}>
                      {c.title}
                    </h2>

                    <p className="text-white-50 mb-4" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                      {c.desc}
                    </p>

                    <button className="btn btn-light promo-cta px-4 py-2">
                      {c.cta}
                    </button>
                  </div>

                  {/* Image */}
                  <div className="position-relative z-1 d-none d-sm-block">
                    <img src={c.img} alt={c.title} className="promo-img" />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}