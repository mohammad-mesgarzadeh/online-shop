import "./CategoriesSection.css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";

import { categories } from "../../data/categories";

export default function CategoriesSection() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            دسته بندی های محبوب
          </h4>

          <Link to="/categories" className="btn btn-outline-dark rounded-pill px-4">
            مشاهده همه
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 6 },
            1200: { slidesPerView: 8 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.slug}>
              <Link
                to={`/categories/${category.slug}`}
                className="text-decoration-none"
              >
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
                        alt={category.label}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <h6 className="mb-0 fw-semibold text-dark">
                      {category.label}
                    </h6>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
