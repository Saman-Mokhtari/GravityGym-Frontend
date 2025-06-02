'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import Link from 'next/link'
import ClassButton from '@/components/ClassButton'
import { useEnrollments } from '@/hooks/enrollment'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { useEffect } from 'react'

export default function Classes() {
    const { enrollments } = useEnrollments()
    const { setTitle } = useNavigationTitle()

    useEffect(() => {
        setTitle('کلاس‌های من')
    }, [])
    const userActiveReservedEnrollments = Array.isArray(enrollments)
        ? enrollments.filter(
              enrollment =>
                  enrollment.status === 'active' ||
                  enrollment.status === 'reserved',
          )
        : []

    const userExpiredCanceledEnrollments = Array.isArray(enrollments)
        ? enrollments.filter(
              enrollment =>
                  enrollment.status === 'expired' ||
                  enrollment.status === 'cancelled',
          )
        : []
    return (
        <>
            <div className="flex flex-col gap-4 desktop:items-center">
                <div className="w-full text-start">
                    <FormLabel text="اشتراک‌های فعال و رزرو شده" />
                </div>
                {Array.isArray(userActiveReservedEnrollments) &&
                userActiveReservedEnrollments.length > 0 ? (
                    <div className="w-full flex flex-col items-start gap-4">
                        {userActiveReservedEnrollments.map(enrollment => (
                            <ClassButton
                                key={enrollment.id}
                                enrollment={enrollment}
                                role="instructor"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 bg-bgInput py-4 desktop:py-6 border border-textPrimary/20 rounded-xl desktop:w-1/2">
                        <div className="flex items-center gap-3 text-textPrimary/30">
                            <Icons name="notFound" className="text-[25px]" />
                            <p>شما در کلاسی ثبت‌نام نکرده‌اید </p>
                        </div>
                        <Link
                            href="/instructor/classes/enroll"
                            className="flex items-center gap-2 text-success font-bold">
                            <Icons name="plus" /> <p>ثبت‌نام کلاس جدید</p>
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4 mt-10 desktop:w-full desktop:items-center">
                <div className="w-full text-start">
                    <FormLabel text="اشتراک‌های تمام و کنسل شده" />
                </div>
                {/*<ClassButton />*/}
                {Array.isArray(userExpiredCanceledEnrollments) &&
                userExpiredCanceledEnrollments.length > 0 ? (
                    <div className="w-full flex flex-col items-start gap-4">
                        {userExpiredCanceledEnrollments.map(enrollment => (
                            <ClassButton
                                key={enrollment.id}
                                enrollment={enrollment}
                                role="instructor"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 bg-bgInput py-4 border border-textPrimary/20 rounded-xl desktop:w-1/2">
                        <div className="flex items-center gap-3 text-textPrimary/30">
                            <Icons name="notFound" className="text-[25px]" />
                            <p>تاریخچه‌ای برای نمایش وجود ندارد</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
