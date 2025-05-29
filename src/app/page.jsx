import Header from '@/components/Header'
import Suggestions from '@/components/Suggestions'
import ClassCard from '@/components/ClassCard'
import calis from '/public/images/calisthenics.jpg'
import yoga from '/public/images/yoga.jpg'
import fitness from '/public/images/fitness.jpg'
import Subscription from '@/components/Subscription'
import Footer from '@/components/Footer'
import MainSlider from '@/components/MainSlider'
import React from 'react'

export const metadata = {
    title: 'Gravity Gym',
}

const Home = () => {
    return (
        <div
            dir="rtl"
            className="w-full flex flex-col font-font bg-bgTertiary ">
            <Header />

            <MainSlider />

            <div
                id="suggestions"
                className="flex flex-col items-center py-8 gap-4 container ">
                <h2 className="text-[25px] font-bold text-bgPrimary">
                    ما برای همه پیشنهادی داریم
                </h2>
                <Suggestions />
            </div>
            <div
                id="subscriptions"
                className="flex flex-col bg-bgSubs w-full container py-8 items-center gap-8">
                <div className="border border-bgPrimary py-3 px-6 w-fit rounded-full">
                    <h2 className="font-light text-[20px] text-bgPrimary">
                        عضویت
                    </h2>
                </div>
                <h2 className="text-[25px] font-light text-bgPrimary leading-10">
                    رسیدن به اهداف سلامتی و تناسب اندام شما از همین‌جا آغاز
                    می‌شود!
                </h2>
                <Subscription />
            </div>
            <Footer />
        </div>
    )
}

export default Home
