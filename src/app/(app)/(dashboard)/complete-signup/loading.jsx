import logo from '/public/images/logo.png'
import Image from 'next/image'
import Icons from '@/components/Icons'

export default function loading() {
    return (
        <div
            dir="rtl"
            className="w-screen fixed top-0 z-[1000] h-screen flex justify-center items-center bg-bgTertiary">
            <div className="flex flex-col gap-3 items-center text-[25px] font-font text-bgPrimary">
                <Image src={logo} width={100} />
                <div className="flex  gap-4 items-center">
                    <Icons
                        name="loadingSpinner"
                        className="animate-spin text-[40px]"
                    />
                    <div className="flex flex-col gap-2 items-start">
                        <h2 className="font-bold ">باشگاه گرویتی</h2>
                        <p className="font-thin">همراه ورزشی شما</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
