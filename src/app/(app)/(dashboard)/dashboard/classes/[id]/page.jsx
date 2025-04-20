'use client'
import { use, useEffect, useState } from 'react'
import { useEnrollments } from '@/hooks/enrollment'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import { useParams } from 'next/navigation'

export default function Class() {
    const [errors, setErrors] = useState([])
    const { userEnrollment } = useEnrollments()
    const [enrollment, setEnrollment] = useState(null)
    const params = useParams()
    useEffect(() => {
        if (params?.id) {
            const fetchEnrollment = async () => {
                try {
                    await userEnrollment({
                        enrollment_id: params?.id,
                        setEnrollment,
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

            fetchEnrollment()
        }
    }, [params.id]) // More efficient: only depend on `params.id`

    useEffect(() => {
        console.log('Enrollment state:', enrollment)
    }, [enrollment])

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
                <FormLabel text="در یک نگاه" />
                <div className="w-full flex">
                    <div className="w-full p-3 border border-dashed desktop:w-[45%] rounded-xl border-textPrimary flex flex-col gap-3">
                        <h2 className="text-[18px] font-bold">تا پایان دوره</h2>
                        <p className="text-[20px] font-light">
                            {enrollment?.status === 'cancelled'
                                ? 'این دوره کنسل شده است.'
                                : enrollment?.status === 'expired'
                                  ? 'این دوره به اتمام رسیده است'
                                  : enrollment?.status === 'reserved'
                                    ? 'این دوره هنوز آغاز نشده است.'
                                    : `${enrollment?.remaining_days} روز`}
                        </p>
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
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[18px] font-bold">نام کلاس</h2>
                            <p className="text-[20px] font-light">
                                {enrollment?.subscription?.class?.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Icons
                            name="instructor"
                            className="text-[22px] text-bgSubs w-[1.2rem]"
                        />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[18px] font-bold">مربی دوره</h2>
                            <p className="text-[20px] font-light">
                                {enrollment?.subscription?.instructor}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Icons
                            name="plusSolid"
                            className="text-[25px] text-bgSubs w-[1.2rem]"
                        />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[18px] font-bold">
                                تاریخ برگزاری دوره
                            </h2>
                            <p className="text-[20px] font-light">
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
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[18px] font-bold">تایم کلاس</h2>
                            <p className="text-[20px] font-light">
                                روزهای {enrollment?.subscription?.day_type}{' '}
                                {enrollment?.subscription?.start_time} تا{' '}
                                {enrollment?.subscription?.end_time}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
