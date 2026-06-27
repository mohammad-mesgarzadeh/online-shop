import "./PromotionalBanners.css";
export default function PromotionalBanners() {
    return (
        <section className="py-5">
            <div className="container">

                <div className="row g-4">

                    <div className="col-lg-6">
                        <div className="promo-card promo-men rounded-4 overflow-hidden p-5 h-100">

                            <span className="badge bg-light text-dark mb-3">
                                NEW COLLECTION
                            </span>

                            <h2 className="fw-bold text-white mb-3">
                                کالکشن مردانه ۲۰۲۶
                            </h2>

                            <p className="text-white-50 mb-4">
                                جدیدترین هودی‌ها، تیشرت‌ها و لباس‌های استریت استایل
                            </p>

                            <button className="btn btn-light px-4">
                                مشاهده محصولات
                            </button>

                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="promo-card promo-sale rounded-4 overflow-hidden p-5 h-100">

                            <span className="badge bg-danger mb-3">
                                SALE UP TO 50%
                            </span>

                            <h2 className="fw-bold text-white mb-3">
                                حراج پایان فصل
                            </h2>

                            <p className="text-white-50 mb-4">
                                روی صدها محصول تا ۵۰٪ تخفیف دریافت کنید
                            </p>

                            <button className="btn btn-light px-4">
                                خرید با تخفیف
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}