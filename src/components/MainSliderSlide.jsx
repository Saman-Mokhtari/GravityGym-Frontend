'use client'
import useWindowSize from '@/hooks/useWindowSize'
import Image from 'next/image'

export default function MainSliderSlide({ desktop, mobile }) {
    const { isDesktop } = useWindowSize()
    return (
        <div className="!w-[95%] desktop:w-full bg-bgTertiary h-full flex rounded-xl">
            <Image
                alt="Slider Image"
                src={isDesktop ? desktop : mobile}
                fill
                className="object-cover  rounded-xl "
            />
        </div>
    )
}
