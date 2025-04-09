import Navigation from '@/components/Navigation'
import Image from 'next/image'
import background from '/public/images/heroBackground.jpg'
import Header from '@/components/Header'
import Suggestions from '@/components/Suggestions'
import ClassCard from '@/components/ClassCard'
import calis from '/public/images/calisthenics.jpg'
import yoga from '/public/images/yoga.jpg'
import fitness from '/public/images/fitness.jpg'
import Subscription from '@/components/Subscription'
import Icons from '@/components/Icons'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Laravel',
}

const Home = () => {
    return (
        <div
            dir="rtl"
            className="w-full flex flex-col font-font bg-bgTertiary ">
            <Header />
            <div
                id="suggestions"
                className="flex flex-col items-center py-8 gap-4 container ">
                <h2 className="text-[25px] font-bold text-bgPrimary">
                    ما برای همه پیشنهادی داریم
                </h2>
                <Suggestions />
                <div className="flex flex-col gap-40 w-full mt-20 items-center">
                    <ClassCard
                        text="کلاس‌های گروهی کلیستنیکس"
                        image={calis}
                        alt="تصویر کلیستنیکس"
                    />
                    <ClassCard
                        text="کلاس‌های گروهی کلیستنیکس"
                        image={yoga}
                        alt="تصویر کلیستنیکس"
                    />
                    <ClassCard
                        text="کلاس‌های گروهی کلیستنیکس"
                        image={fitness}
                        alt="تصویر کلیستنیکس"
                    />
                </div>
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
