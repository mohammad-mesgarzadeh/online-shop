import "./BestSellingProducts.css"; 
import ProductCard from "../ProductCard";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

export default function BestSellingProducts() {
    const products = [
        {
            title: "هودی مردانه",
            price: "890,000 تومان",
            image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
        },
        {
            title: "تیشرت اورسایز",
            price: "450,000 تومان",
            image:
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600",
        },
        {
            title: "شلوار جین",
            price: "1,200,000 تومان",
            image:
                "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
        },
        {
            title: "کفش اسپرت",
            price: "2,500,000 تومان",
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        },
    ];

    return (
        <section className="py-5">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h4 className="fw-bold mb-0">
                        پرفروش‌ترین محصولات
                    </h4>

                    <button className="btn btn-link text-decoration-none">
                        مشاهده همه
                    </button>

                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={24}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        576: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
}