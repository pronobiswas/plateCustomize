'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function FeaturedShapeAndSize() {
    const [swiperRef, setSwiperRef] = useState(null);
    return (
        <>
            <div className='swipper_slider_wrapper w-full flex justify-center py-5'>
                <div className='swipper_slider w-full max-w-[1712px]'>
                    <h4 className='text-2xl font-bold mb-4'>Featured Shape and size</h4>
                    <Swiper
                        onSwiper={setSwiperRef}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                            1280: { slidesPerView: 4, spaceBetween: 40 },
                        }}
                    >
                        {["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5", "Slide 6"].map((text, i) => (
                            <SwiperSlide key={i}>
                                <div className="aspect-[388/448] border-2 border-amber-400 flex items-center justify-center">
                                    {text}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </>
    )
}
