'use client'
import { useEffect, useState } from 'react'
import { useEnrollments } from '@/hooks/enrollment'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import { useParams } from 'next/navigation'
import StatsCard from '@/components/StatsCard'
import { useTranslator } from '@/hooks/translator'

export default function Class() {
    const [errors, setErrors] = useState([])
    const { enrollment: fetchEnrollment } = useEnrollments()
    const [enrollment, setEnrollment] = useState(null)
    const params = useParams()
    const [remainingSessions, setRemainingSessions] = useState(0)
    const { persianDays } = useTranslator()
    useEffect(() => {
        if (params?.id) {
            const getEnrollment = async () => {
                try {
                    await fetchEnrollment({
                        enrollment_id: params?.id,
                        setEnrollment: setEnrollment,
                        setErrors,
                    })
                } catch (error) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        phone:
                            error.response?.status === 401
                                ? ['Invalid credentials']
                                : ['An unexpected error occurred'],
                    }))
                }
            }
            getEnrollment()
        }
    }, [params.id])

    useEffect(() => {
        if (enrollment?.attendances?.length) {
            const remaining = enrollment.attendances.filter(
                a => a.status === 'pending',
            ).length
            return setRemainingSessions(remaining)
        }
    }, [enrollment])
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
                <FormLabel text="در یک نگاه" />
                <div className="w-full flex items-center gap-2">
                    <div className="w-full flex">
                        <StatsCard title="تا پایان دوره">
                            {enrollment?.status === 'cancelled'
                                ? 'این دوره کنسل شده است.'
                                : enrollment?.status === 'expired'
                                  ? 'این دوره به اتمام رسیده است'
                                  : enrollment?.status === 'reserved'
                                    ? 'این دوره هنوز آغاز نشده است.'
                                    : `${enrollment?.remaining_days} روز`}
                        </StatsCard>
                    </div>
                    <div className="w-full flex">
                        <StatsCard title="جلسات باقی‌مانده">
                            <p className="text-success font-medium">
                                {remainingSessions} جلسه
                            </p>
                        </StatsCard>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <FormLabel text="مشخصات دوره" />
                <div className="w-full grid grid-cols-1 tablet:grid-cols-2 gap-y-3 desktop:gap-y-6 mt-2">
                    <div className="flex gap-6 items-center">
                        <Icons
                            name="information"
                            className="text-[25px] text-bgSubs w-[1.2rem]"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[18px] font-bold">نام کلاس</h2>
                            <p className="text-[20px] font-light pr-2">
                                {enrollment?.subscription?.class?.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Icons
                            name="instructor"
                            className="text-[22px] text-bgSubs w-[1.2rem]"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[18px] font-bold">مربی دوره</h2>
                            <p className="text-[20px] font-light pr-2">
                                {enrollment?.subscription?.instructor}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Icons
                            name="plusSolid"
                            className="text-[25px] text-bgSubs w-[1.2rem]"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[18px] font-bold">
                                تاریخ برگزاری دوره
                            </h2>
                            <p className="text-[20px] font-light pr-2">
                                از {enrollment?.start_date} تا{' '}
                                {enrollment?.end_date}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Icons
                            name="clock"
                            className="text-[22px] text-bgSubs w-[1.2rem]"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[18px] font-bold">تایم کلاس</h2>
                            <p className="text-[20px] font-light pr-2">
                                روزهای {enrollment?.subscription?.day_type}{' '}
                                {enrollment?.subscription?.start_time} تا{' '}
                                {enrollment?.subscription?.end_time}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Icons
                            name="calendar"
                            className="text-[25px] text-bgSubs w-[1.2rem]"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[18px] font-bold">مدت دوره</h2>
                            <p className="text-[20px] font-light pr-2">
                                {enrollment?.subscription?.duration_value}{' '}
                                {enrollment?.subscription?.duration_unit}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Icons
                            name="clock"
                            className="text-[22px] text-bgSubs w-[1.2rem]"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[18px] font-bold">
                                روزهای برگزاری کلاس
                            </h2>
                            <p className="text-[20px] font-light pr-2">
                                روزهای{' '}
                                {enrollment?.subscription?.class_days
                                    .map(day => persianDays[day])
                                    .join('، ')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
