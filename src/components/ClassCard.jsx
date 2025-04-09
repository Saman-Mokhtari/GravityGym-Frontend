import Icons from '@/components/Icons'
import Image from 'next/image'

export default function ClassCard({ text, image, alt }) {
    return (
        <div className="flex flex-col gap-4 items-start w-full tablet:w-[70%] desktop:w-full desktop:flex-row desktop:justify-center desktop:items-center desktop:justify-between desktop:even:flex-row-reverse">
            <div className="flex flex-col gap-4 w-full desktop:w-1/2">
                <div className="flex justify-center items-center w-[15rem] py-4 border border-bgSecondary rounded-full">
                    <h2 className="text-[18px] text-bgPrimary">{text}</h2>
                </div>
                <h2 className="font-bold text-[20px] text-bgPrimary leading-10">
                    با کلیستنیکس، بدون نیاز به تجهیزات، قدرت، استقامت و
                    انعطاف‌پذیری خود را به حداکثر برسانید!
                </h2>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center aspect-square w-8 border border-bgSecondary rounded-full">
                            <Icons
                                name="check"
                                className="text-[18px] text-bgSecondary"
                            />
                        </div>
                        <p className="text-bgPrimary text-[18px] font-light">
                            فقط 1 ساعت و 30 دقیقه تمرین مووثر
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center aspect-square w-8 border border-bgSecondary rounded-full">
                            <Icons
                                name="check"
                                className="text-[18px] text-bgSecondary"
                            />
                        </div>
                        <p className="text-bgPrimary text-[18px] font-light">
                            گرم کردن و تمرینات کامل در برنامه
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center aspect-square w-8 border border-bgSecondary rounded-full">
                            <Icons
                                name="check"
                                className="text-[18px] text-bgSecondary"
                            />
                        </div>
                        <p className="text-bgPrimary text-[18px] font-light">
                            کسب مهارت
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex w-full  desktop:w-1/3 aspect-[3/4] tablet:aspect-[3/4]  rounded-2xl bg-red-50 overflow-x-hidden relative">
                <Image
                    src={image}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </div>
    )
}
