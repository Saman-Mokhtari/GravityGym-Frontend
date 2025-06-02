'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import Link from 'next/link'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { useEffect } from 'react'
import { useSubscription } from '@/hooks/subscription'
import SubscriptionSelect from '@/components/SubscriptionSelect'

export default function Classes() {
    const { data: subs } = useSubscription().InstructorSubscription()
    const { setTitle } = useNavigationTitle()

    useEffect(() => {
        setTitle('کلاس‌های من')
    }, [])
    const instructorActiveSubs = Array.isArray(subs)
        ? subs.filter(sub => sub?.is_active === 1)
        : []
    const instructorInActiveSubs = Array.isArray(subs)
        ? subs.filter(sub => sub.is_active === 0)
        : []
    return (
        <>
            <div className="flex flex-col gap-4 desktop:items-center">
                <div className="w-full text-start">
                    <FormLabel text="کلاس‌های جاری" />
                </div>
                {Array.isArray(instructorActiveSubs) &&
                instructorActiveSubs.length > 0 ? (
                    <div className="w-full flex flex-col items-start gap-4">
                        {instructorActiveSubs.map(sub => (
                            <SubscriptionSelect key={sub?.id} sub={sub} />
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
                    <FormLabel text="کلاس‌های تمام شده" />
                </div>
                {/*<ClassButton />*/}
                {Array.isArray(instructorInActiveSubs) &&
                instructorInActiveSubs.length > 0 ? (
                    <div className="w-full flex flex-col items-start gap-4">
                        {instructorInActiveSubs.map(sub => (
                            <SubscriptionSelect key={sub?.id} sub={sub} />
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
