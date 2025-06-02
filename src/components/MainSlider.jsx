'use client'
import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import MainSliderSlide from '@/components/MainSliderSlide'
import Icons from '@/components/Icons'

export default function MainSlider() {
    const [isHovered, setIsHovered] = useState(false)
    const images = [
        {
            id: 1,
            desktop: '/images/8-3-1.jpg',
            mobile: '/images/16-9-1.jpg',
        },
        {
            id: 2,
            desktop: '/images/8-3-2.jpg',
            mobile: '/images/16-9-2.jpg',
        },
        {
            id: 3,
            desktop: '/images/8-3-3.jpg',
            mobile: '/images/16-9-3.jpg',
        },
    ]
    return (
        <div
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            className="flex relative aspect-video w-[95%]  desktop:aspect-[8/3]  flex-col gap-40  justify-center mx-auto  items-center">
            <div
                className={`items-center z-40 gap-4 hidden desktop:flex absolute right-10 top-[75%]
    transition-all duration-300 ease-in-out transform
    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
`}>
                <button className="custom-prev z-10 bg-bgPrimary aspect-square p-4 hover:scale-105 transition-all cursor-pointer flex justify-center items-center  rounded-full shadow">
                    <Icons name="chevronRight" className="text-[20px]" />
                </button>
                <button className="custom-next z-10 bg-bgPrimary aspect-square p-4 hover:scale-105 transition-all cursor-pointer flex justify-center items-center  rounded-full shadow">
                    <Icons name="chevronLeft" className="text-[20px]" />
                </button>
            </div>
            <Swiper
                pagination={true}
                centeredSlides={false}
                grabCursor={true}
                loop={true}
                loopPreventsSliding={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                modules={[Pagination, Autoplay, Navigation]}
                className="w-full h-full">
                {Array.isArray(images) &&
                    images?.map(image => (
                        <SwiperSlide key={image?.id} className="">
                            <MainSliderSlide
                                desktop={image?.desktop}
                                mobile={image?.mobile}
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    )
}
