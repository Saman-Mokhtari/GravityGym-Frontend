'use client'
import { usePathname, useRouter } from 'next/navigation'
import Icons from '@/components/Icons'

const routeTexts = {
    '/complete-signup': 'تکمیل ثبت‌نام',
    '/profile': 'Profile Management',
    '/settings': 'Settings Page',
    '/reports': 'View Reports',
}

export default function DashboardNavigation() {
    const currentRoute = usePathname()

    // Get the corresponding text for the current route or fallback to a default message
    const routeText = routeTexts[currentRoute] || 'Default Text'

    return (
        <nav className="w-full py-6 px-4 desktop:hidden  flex items-center justify-between shadow-custom fixed top-0 left-0 bg-bgPrimary z-[100]">
            <div className="flex items-center gap-4">
                <div className="aspect-square w-8 flex items-center justify-center border border-textPrimary rounded-md">
                    <Icons name="arrowRight" className="text-[20px]" />
                </div>
                <h2 className="text-[20px] font-medium">{routeText}</h2>
            </div>
        </nav>
    )
}
