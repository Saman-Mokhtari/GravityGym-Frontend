import Icons from '@/components/Icons'
import Image from 'next/image'
import location from '/public/images/location.png'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer
            id="aboutus"
            className="flex flex-col container py-16 items-center gap-8">
            <div className="border border-bgSecondary py-3 px-6 w-fit rounded-full">
                <h2 className="font-light text-[20px] text-bgPrimary">
                    درباره باشگاه گرویتی
                </h2>
            </div>
            <div className="flex flex-col text-bgPrimary leading-10 gap-8 py-4 desktop:w-[60%]">
                <h2 className="text-center font-semibold text-[28px]">
                    ما یک باشگاه مجهز برای آقایان و بانوان هستیم.
                </h2>
                <p className="font-light text-[20px] text-center text-bgPrimary/70">
                    Gravity Gym با تجهیزات کامل و استاندارد برای تمامی رشته‌های
                    ورزشی، محیطی حرفه‌ای را برای تمرین شما فراهم می‌کند. ما با
                    مربیان مجرب و فضایی ایده‌آل، تجربه‌ای باکیفیت و موثر در مسیر
                    تناسب اندام را برای شما به ارمغان می‌آوریم.
                </p>
            </div>
            <div className="flex flex-col gap-12 desktop:flex-row">
                <div className="flex flex-col items-start gap-2 w-full mt-4">
                    <div className="flex items-center gap-2">
                        <Icons
                            name="locationDot"
                            className="text-[30px] text-bgSubs"
                        />
                        <h2 className="text-[22px] font-bold text-bgPrimary">
                            آدرس باشگاه
                        </h2>
                    </div>
                    <p className="text-[20px] font-light text-bgPrimary/70">
                        خیابان دارآباد، بن‌بست وکیلی، پلاک 2
                    </p>
                    <Link
                        href="https://maps.app.goo.gl/Y9jgFmuX1fPpBnHC6"
                        className="flex aspect-video overflow-hidden w-full desktop:w-[70%] rounded-xl shadow-custom">
                        <Image src={location} alt="Gravity Gym Location" />
                    </Link>
                </div>
                <div className="flex flex-col items-start gap-2 w-full mt-4">
                    <div className="flex items-center gap-2">
                        <Icons
                            name="telephone"
                            className="text-[30px] text-bgSubs"
                        />
                        <h2 className="text-[22px] font-bold text-bgPrimary">
                            شماره تماس
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 text-bgPrimary text-[20px]">
                        <div
                            dir="ltr"
                            className="flex items-center gap-3 w-[11rem] py-2 justify-between">
                            <Icons
                                name="externalLink"
                                className="text-bgSubs"
                            />
                            <Link href="tel:02188447489">021 - 88447489</Link>
                        </div>
                        <div
                            dir="ltr"
                            className="flex items-center gap-3 w-[11rem] py-2 justify-between">
                            <Icons
                                name="externalLink"
                                className="text-bgSubs"
                            />
                            <Link href="tel:09352214805">09352214805</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 w-full py-4 mt-16">
                <h2 className="text-[22px] font-bold text-bgPrimary">
                    ما را در شبکه‌های اجتماعی دنبال کنید
                </h2>
                <div className="flex items-center gap-8 text-bgPrimary">
                    <Link href="" className="text-[35px]">
                        <Icons name="telegram" />
                    </Link>
                    <Link href="" className="text-[35px]">
                        <Icons name="instagram" />
                    </Link>
                    <Link href="" className="text-[35px]">
                        <Icons name="twitter" />
                    </Link>
                    <Link href="" className="text-[35px]">
                        <Icons name="whatsapp" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
