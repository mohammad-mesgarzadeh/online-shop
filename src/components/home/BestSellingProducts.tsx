import "./BestSellingProducts.css";
import ProductCard from "../ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

import "swiper/css";
import "swiper/css/navigation";

import { products } from "../../data/products";

export default function BestSellingProducts() {
  const { t } = useLanguage();
  const bestSellers = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 8);

  return (
    <section className="py-5 py-lg-6 overflow-hidden" dir="rtl">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-badge">
              <i className="bi bi-fire me-1" />
              {t("bestSelling.badge")}
            </span>
            <h2>{t("bestSelling.title")}</h2>
            <p className="section-subtitle mt-2">
              {t("bestSelling.desc")}
            </p>
          </div>
          <Link to="/products?sort=best-selling" className="btn btn-vesta-outline rounded-pill">
            {t("categories.viewAll")}
            <i className="bi bi-arrow-left me-2" />
          </Link>
        </div>

        <Swiper
          modules={[ Autoplay]}
          loop
          grabCursor
          centeredSlides={false}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.3 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {bestSellers.map((product, index) => (
            <SwiperSlide key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
