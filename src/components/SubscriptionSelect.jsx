'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import { useTranslator } from '@/hooks/translator'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useClassContext } from '@/context/ClassContext'

export default function SubscriptionSelect({ sub }) {
    const { persianDays, subscriptionStatus } = useTranslator()
    const params = useParams()
    const [athleteCount, setAthleteCount] = useState(0)
    const router = useRouter()
    const { setSelectedSub } = useClassContext()

    useEffect(() => {
        if (sub) {
            setAthleteCount(
                sub?.enrollments?.reduce((sum, enroll) => {
                    return !['expired', 'cancelled'].includes(enroll?.status)
                        ? sum + 1
                        : sum
                }, 0),
            )
        }
    }, [sub])

    const handleSubClick = () => {
        setSelectedSub(sub)
        router.push(`/admin/classes/${params?.classId}/subscription/${sub?.id}`)
    }
    return (
        <div className="w-full flex flex-col items-start justify-between bg-bgInput py-3 px-4 rounded-md mt-2">
            <div className="grid grid-cols-1 desktop:grid-cols-2 items-center gap-3 w-full">
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <FormLabel text="نام اشتراک" />
                        <p className="font-normal text-[18px]">
                            {sub?.sub_name}
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <FormLabel text="روزهای" />
                        <p className="font-normal text-[18px]">
                            {sub?.class_days
                                ?.map(day => persianDays[day])
                                .join('، ')}
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <FormLabel text="مدت دوره" />
                        <p className="font-normal text-[18px]">
                            {sub?.duration_value} {sub?.duration_unit}
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <FormLabel text="مربی دوره" />
                        <p className="font-normal text-[18px]">
                            {sub?.instructor}
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <FormLabel text="وضعیت اشتراک" />
                        <p className="font-normal text-[18px]">
                            {subscriptionStatus[sub?.is_active]}
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <FormLabel text="ساعت برگزاری کلاس" />
                        <p className="font-normal text-[18px]">
                            از {sub?.start_time} تا {sub?.end_time}
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <FormLabel text="تعداد اعضای دوره" />
                        <p className="font-normal text-[18px]">
                            {athleteCount} نفر
                        </p>
                    </div>
                </div>
            </div>

            <div
                onClick={handleSubClick}
                className="w-full mt-6 group hover:bg-textSecondary cursor-pointer transition-all rounded-md bg-textPrimary  text-bgPrimary flex justify-center items-center gap-2 py-3">
                <Icons
                    name="settings"
                    className="text-[20px] group-hover:rotate-90 transition-all hover:cursor-pointer"
                />
                <p className="">مدیریت اشتراک</p>
            </div>
        </div>
    )
}
