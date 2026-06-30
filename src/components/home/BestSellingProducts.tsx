import "./BestSellingProducts.css";
import ProductCard from "../ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import { products } from "../../data/products";

export default function BestSellingProducts() {
  const bestSellers = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 8);

  return (
    <section className="py-5 overflow-hidden">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <span className="badge bg-primary-subtle text-primary mb-2">
              محصولات ویژه
            </span>

            <h2 className="fw-bold mb-0">
              پرفروش‌ترین محصولات
            </h2>
          </div>

          <Link to="/products" className="btn btn-outline-dark rounded-pill px-4">
            مشاهده همه
          </Link>
        </div>

        <Swiper
          modules={[
            Navigation,
            Autoplay,
            EffectCoverflow,
          ]}
          navigation
          loop
          grabCursor
          centeredSlides={false}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1.2 },
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
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={`${product.price.toLocaleString()} تومان`}
                  image={product.image}
                  discount={product.discount}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
