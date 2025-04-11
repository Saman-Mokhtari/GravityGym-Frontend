'use client'
import FormLabel from '@/components/FormLabel'
import ClassButton from '@/components/ClassButton'
import Icons from '@/components/Icons'
import Link from 'next/link'
import useWindowSize from '@/hooks/useWindowSize'

export default function Classes() {
    const { isDesktop } = useWindowSize()

    return (
        <>
            <div className="flex flex-col gap-4">
                <FormLabel text="کلاس‌های ثبت‌نام شده شما" />
                <div className="flex flex-col items-center gap-3 bg-bgInput py-4 desktop:py-6 border border-textPrimary/20 rounded-xl desktop:w-1/3">
                    <div className="flex items-center gap-3 text-textPrimary/30">
                        <Icons name="notFound" className="text-[25px]" />
                        <p>شما در کلاسی ثبت‌نام نکرده‌اید</p>
                    </div>
                    <Link
                        href="/dashboard/classes/enroll"
                        className="flex items-center gap-2 text-success font-bold">
                        <Icons name="plus" /> <p>ثبت‌نام کلاس جدید</p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-10 desktop:w-1/3">
                <FormLabel text="کلاس‌های ثبت‌نام شده شما" />
                {/*<ClassButton />*/}
                <div className="flex flex-col items-center gap-3 bg-bgInput py-4 border border-textPrimary/20 rounded-xl">
                    <div className="flex items-center gap-3 text-textPrimary/30">
                        <Icons name="notFound" className="text-[25px]" />
                        <p>تاریخچه‌ای برای نمایش وجود ندارد</p>
                    </div>
                </div>
            </div>
        </>
    )
}
