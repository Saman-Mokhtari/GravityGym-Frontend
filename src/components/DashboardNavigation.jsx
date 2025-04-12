'use client'
import { usePathname, useRouter } from 'next/navigation'
import Icons from '@/components/Icons'
import Link from 'next/link'

const routeTexts = {
    '/complete-signup': 'تکمیل ثبت‌نام',
    '/dashboard/classes': 'کلاس‌های من',
    '/dashboard/classes/enroll': 'ثبت‌نام کلاس جدید',
    '/dashboard/classes/enroll/verify-payment': 'بررسی وضعیت ثبت‌نام',
    '/reports': 'View Reports',
}

export default function DashboardNavigation() {
    const currentRoute = usePathname()
    // Get the corresponding text for the current route or fallback to a default message
    const routeText = routeTexts[currentRoute] || 'Default Text'
    const router = useRouter()
    return (
        <nav className="w-full py-6 px-4 desktop:hidden  flex items-center justify-between shadow-custom fixed top-0 left-0 bg-bgPrimary z-[100]">
            <div
                onClick={() => {
                    router.back()
                }}
                className="flex items-center gap-4">
                <div className="aspect-square w-8 flex items-center justify-center border border-textPrimary rounded-md">
                    <Icons name="arrowRight" className="text-[20px]" />
                </div>
                <h2 className="text-[20px] font-medium">{routeText}</h2>
            </div>
            {currentRoute === '/dashboard/classes' && (
                <Link href="/dashboard/classes/enroll">
                    <Icons name="plus" className="text-[25px]" />
                </Link>
            )}
        </nav>
    )
}
