import "./CategoriesSection.css";
import {  Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function CategoriesSection() {
    const categories = [
        {
            name: "تیشرت",
            image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
        },
        {
            name: "پیراهن",
            image:
                "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=200",
        },
        {
            name: "هودی",
            image:
                "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200",
        },
        {
            name: "کاپشن",
            image:
                "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=200",
        },
        {
            name: "شلوار جین",
            image:
                "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200",
        },
        {
            name: "کفش اسپرت",
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
        },
        {
            name: "کیف",
            image:
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200",
        },
        {
            name: "ساعت",
            image:
                "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200",
        },
        {
            name: "عینک",
            image:
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200",
        },
        {
            name: "کلاه",
            image:
                "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200",
        },
        {
            name: "لباس ورزشی",
            image:
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200",
        },
        {
            name: "زنانه",
            image:
                "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200",
        },
        {
            name: "مردانه",
            image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        },
        {
            name: "بچگانه",
            image:
                "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200",
        },
    ];
    return (
        <section className="py-5">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">
                        دسته بندی های محبوب
                    </h4>

                    <button className="btn btn-link text-decoration-none">
                        مشاهده همه
                    </button>
                </div>

                <Swiper
                    modules={[ Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={20}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                        },
                        576: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        992: {
                            slidesPerView: 6,
                        },
                        1200: {
                            slidesPerView: 8,
                        },
                    }}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.name}>
                            <div className="card border-0 shadow-sm rounded-4 category-card">

                                <div className="card-body text-center py-4">

                                    <div
                                        className="rounded-circle overflow-hidden mx-auto mb-3"
                                        style={{
                                            width: "90px",
                                            height: "90px",
                                        }}
                                    >
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-100 h-100"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                    <h6 className="mb-0 fw-semibold">
                                        {category.name}
                                    </h6>

                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
}