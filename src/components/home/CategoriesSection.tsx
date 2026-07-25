import "./CategoriesSection.css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "swiper/css";

import { categories } from "../../data/categories";

export default function CategoriesSection() {
  return (
    <section className="py-5 py-lg-6" dir="rtl">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-badge">
              <i className="bi bi-grid me-1" />
              دسته‌بندی‌ها
            </span>
            <h2>دسته بندی های محبوب</h2>
          </div>
          <Link to="/categories" className="btn btn-vesta-outline rounded-pill">
            مشاهده همه
            <i className="bi bi-arrow-left me-2" />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 2.3 },
            576: { slidesPerView: 3.3 },
            768: { slidesPerView: 4.3 },
            992: { slidesPerView: 6.3 },
            1200: { slidesPerView: 8 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={category.slug}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={`/categories/${category.slug}`}
                  className="text-decoration-none"
                >
                  <div
                    className="text-center overflow-hidden"
                    style={{
                      borderRadius: "var(--radius-xl)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      className="rounded-circle overflow-hidden mx-auto mb-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        border: "3px solid var(--c-border-light)",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={category.image}
                        alt={category.label}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>

                    <h6 className="mb-0 fw-semibold" style={{ color: "var(--c-gray-700)", fontSize: "var(--text-sm)" }}>
                      {category.label}
                    </h6>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
