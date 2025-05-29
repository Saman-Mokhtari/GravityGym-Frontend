import Navigation from '@/components/Navigation'
import Image from 'next/image'
import background from '../../public/images/heroBackground.jpg'
import LoginRegister from '@/components/LoginRegister'

export default function Header() {
    return (
        <div className="w-full flex flex-col z-20 h-[80vh]  desktop:h-[95vh] relative items-center justify-center">
            <Navigation />
            {/*<Image*/}
            {/*    src={background}*/}
            {/*    alt="Hero Background"*/}
            {/*    fill*/}
            {/*    style={{ objectFit: 'cover' }}*/}
            {/*    className="absolute top-0 -z-20"*/}
            {/*/>*/}

            <div className="absolute bg-red-50 -z-10 top-0 h-full w-full heroBachgroundGradient" />
            <div className="w-full desktop:w-3/5 desktop:mt-20 flex flex-col leading-10  gap-4 text-bgPrimary text-center container">
                <h2 className="font-bold text-[28px] desktop:text-[32px]">
                    اهداف تناسب اندام و سلامتی خود را در کمترین زمان ممکن محقق
                    کنید!
                </h2>
                <p className="text-[20px] font-light  desktop:text-[24px]">
                    مهم نیست که هدف شما افزایش قدرت، چربی‌سوزی یا حفظ تناسب
                    اندام باشد، مربیان حرفه‌ای ما در Gravity Gym در هر قدم همراه
                    شما هستند تا به بهترین نسخه خود تبدیل شوید.
                </p>
            </div>
            <div className="flex w-fit h-fit desktop:hidden">
                <LoginRegister />
            </div>
        </div>
    )
}
