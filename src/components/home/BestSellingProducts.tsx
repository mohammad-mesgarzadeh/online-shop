import "./BestSellingProducts.css";
import ProductCard from "../ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

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
    {
      title: "کت جین",
      price: "1,750,000 تومان",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
    },
    {
      title: "پیراهن مردانه",
      price: "780,000 تومان",
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600",
    },
    {
      title: "کاپشن زمستانی",
      price: "3,100,000 تومان",
      image:
        "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600",
    },
    {
      title: "سویشرت اسپرت",
      price: "990,000 تومان",
      image:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600",
    },
  ];

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

          <button className="btn btn-outline-dark rounded-pill px-4">
            مشاهده همه
          </button>
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
            320: {
              slidesPerView: 1.2,
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
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <ProductCard {...product} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}