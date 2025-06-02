'use client'
import Icons from '@/components/Icons'
import { useAuth } from '@/hooks/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'
import { useTranslator } from '@/hooks/translator'

export default function SubscriptionCard({ sub }) {
    const { user } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { persianDays } = useTranslator()
    const handleClick = () => {
        if (!user?.name) {
            toast.error('لطفا ابتدا وارد حساب کاربری خود شوید!')
        } else {
            const enrollClassLink = '/dashboard/classes/enroll'
            const params = new URLSearchParams(searchParams.toString())
            params.set('sub', sub?.id)
            router.push(`${enrollClassLink}?${params.toString()}`)
        }
    }
    return (
        <div className="bg-bgPrimary flex flex-col justify-between items-center py-6 desktop:w-10/12 w-full rounded-2xl min-h-[30rem]">
            <Toaster />
            <div className="flex flex-col gap-10 w-full items-center">
                <div className="flex items-start gap-2">
                    <div className="flex flex-col gap-5 items-center">
                        <h2 className="text-[20px] text-textPrimary font-bold">
                            {sub?.sub_name}
                        </h2>
                        <div className="flex  items-center gap-2">
                            <h2 className="text-[20px] text-textPrimary font-bold">
                                {sub?.session_count} جلسه
                            </h2>
                            <p className=" text-[30px] font-thin">/</p>
                            <p className="font-thin text-[25px]">
                                {sub?.duration_value} {sub?.duration_unit}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start pr-8 w-full justify-center gap-4 ">
                    <div className="flex items-start justify-start gap-2">
                        <div className="flex flex-shrink-0 justify-center items-center aspect-square w-8 border border-bgSubs rounded-full">
                            <Icons
                                name="check"
                                className="text-[18px] text-bgSubs"
                            />
                        </div>
                        <p className="text-textPrimary text-[18px] w-full font-medium">
                            روزهای{' '}
                            {sub?.class_days
                                ?.map(cls => persianDays[cls])
                                .join('، ')}
                        </p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="flex justify-center items-center aspect-square w-8 border border-bgSubs rounded-full">
                            <Icons
                                name="check"
                                className="text-[18px] text-bgSubs"
                            />
                        </div>
                        <p className="text-textPrimary text-[18px] font-medium">
                            {sub?.class_days.length} جلسه در هفته
                        </p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="flex justify-center items-center aspect-square w-8 border border-bgSubs rounded-full">
                            <Icons
                                name="check"
                                className="text-[18px] text-bgSubs"
                            />
                        </div>
                        <p className="text-textPrimary text-[18px] font-medium">
                            از ساعت {sub?.start_time} تا {sub?.end_time}
                        </p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="flex justify-center items-center aspect-square w-8 border border-bgSubs rounded-full">
                            <Icons
                                name="check"
                                className="text-[18px] text-bgSubs"
                            />
                        </div>
                        <p className="text-textPrimary text-[18px] font-medium">
                            مربی دوره {sub?.instructor}
                        </p>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4 items-center mt-4">
                <h2 className="text-[24px] text-success font-bold">
                    {(sub?.price * 1000000).toLocaleString()} تومانءء
                </h2>
                <button
                    onClick={handleClick}
                    className="hover:scale-105 transition-all  flex bg-bgTertiary justify-center items-center px-8 py-3 rounded-full">
                    <h2 className="text-bgPrimary text-[20px] font-light">
                        ثبت نام
                    </h2>
                </button>
            </div>
        </div>
    )
}
