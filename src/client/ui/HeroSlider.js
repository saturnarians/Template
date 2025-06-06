'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';

export default function HeroSlider({ slides }) {
    return (
        <div className="relative w-full h-[600px]">            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-full"
            >
                {slides?.map((slide) => (
                    <SwiperSlide key={slide._id}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white px-4">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl mb-6 max-w-2xl text-center">
                                    {slide.description}
                                </p>
                                {slide.link && (
                                    <a
                                        href={slide.link}
                                        className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Learn More
                                    </a>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
