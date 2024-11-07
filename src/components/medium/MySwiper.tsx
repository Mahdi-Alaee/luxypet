/* eslint-disable @next/next/no-img-element */
"use client";

// src/components/MySwiper.tsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Define types for your component props if needed
interface MySwiperProps {
    images: string[],
    className?:string
}

const MySwiper: React.FC<MySwiperProps> = ({ images,className }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      autoplay={{ delay: 4000 }}
      allowTouchMove={false}
      spaceBetween={50}
      slidesPerView={1}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center max-h-[800px]">
            <img className={className} src={image} alt={`Slide ${index}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiper;
