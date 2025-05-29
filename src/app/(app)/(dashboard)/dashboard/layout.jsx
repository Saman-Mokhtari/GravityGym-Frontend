'use client'
import useWindowSize from '@/hooks/useWindowSize'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import Icons from '@/components/Icons'
import FormLabel from '@/components/FormLabel'
import AthleteBottomNavbar from '@/components/AthleteBottomNavbar'
import DashboardNavigation from '@/components/DashboardNavigation'
import Link from 'next/link'
import { useEffect } from 'react'
import SkeletonDashboardLoader from '@/components/SkeletonDashboardLoader'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // core styles
import 'tippy.js/dist/svg-arrow.css'
import {
    NavigationTitleProvider,
    useNavigationTitle,
} from '@/context/NavigationTitleContext' // if you're using SVG arrows

export default function Layout({ children }) {
    const { isDesktop } = useWindowSize()
    const pathName = usePathname()
    const { user, logout } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (user) {
            if (!user?.name) router.replace('/complete-signup')
        }
    }, [user])

    if (!user || typeof isDesktop === 'undefined') {
        return <SkeletonDashboardLoader />
    }

    if (!isDesktop) {
        return (
            <>
                <NavigationTitleProvider>
                    <DashboardNavigation />
                    <div
                        className={
                            pathName !== '/complete-signup'
                                ? 'w-full flex flex-col mt-[6rem] pb-10 container'
                                : undefined
                        }>
                        {children}
                    </div>
                    <AthleteBottomNavbar />
                </NavigationTitleProvider>
            </>
        )
    }

    return (
        <NavigationTitleProvider>
            <div className="w-screen h-screen flex bg-bgDashboard p-3 gap-4 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
                <Sidebar user={user} logout={logout} pathName={pathName} />
                <MainPanel pathName={pathName}>{children}</MainPanel>
                <LeftPanel />
            </div>
        </NavigationTitleProvider>
    )
}

function Sidebar({ user, logout, pathName }) {
    return (
        <aside className="flex flex-col h-full w-[16vw] p-3 justify-between">
            <div>
                <h2 className="text-[25px] font-bold">
                    سلام
                    <br />
                    {user?.name?.split(' ')[0]} عزیز!
                </h2>

                <div className="mt-8 flex flex-col gap-2">
                    <FormLabel text="مدیریت" />
                    <SidebarLink
                        className="sidebarDisable"
                        href="/dashboard"
                        disable={true}
                        icon={pathName === '/admin' ? 'gridSolid' : 'gridLight'}
                        active={pathName === '/admin'}
                        label="صفحه اصلی داشبورد"
                    />

                    <SidebarLink
                        className=""
                        href="/dashboard/classes"
                        active={pathName.startsWith('/dashboard/classes')}
                        icon={
                            pathName.startsWith('/dashboard/classes')
                                ? 'dumbleSolid'
                                : 'dumbleLight'
                        }
                        label="کلاس‌های من"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Tippy
                    arrow={true}
                    content="اطلاعات کاربری"
                    className="font-font">
                    <Link
                        href="/dashboard/profile"
                        className={`flex items-center gap-4 group py-2 justify-between hover:bg-bgDashboardHover hover:border-textSecondary rounded-md px-2  cursor-pointer ${pathName === '/dashboard/profile' && '!bg-bgDashboardHover '}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-[2.5rem] aspect-square rounded-full bg-gray-200 flex justify-center items-center">
                                <Icons
                                    name="user"
                                    className="text-[20px] text-textSecondary"
                                />
                            </div>
                            <h2 className="font-bold text-[16px]">
                                {user?.name}
                            </h2>
                        </div>
                    </Link>
                </Tippy>
                <div
                    onClick={logout}
                    className="flex items-center gap-4 hover:bg-bgDashboardHover cursor-pointer py-1 rounded-md transition">
                    <div className="w-[2.5rem] aspect-square rounded-full flex justify-center items-center">
                        <Icons
                            name="logout"
                            className="text-[20px] text-error"
                        />
                    </div>
                    <h2 className="font-light text-[18px] text-error">
                        خروج از حساب کاربری
                    </h2>
                </div>
            </div>
        </aside>
    )
}

// function SidebarItem({ icon, label }) {
//     return (
//         <div className="w-full p-2 rounded-md cursor-pointer flex items-center gap-2 text-[18px] transition-all hover:bg-bgDashboardHover">
//             <Icons name={icon} className="text-[20px]" />
//             <h2>{label}</h2>
//         </div>
//     )
// }

function SidebarLink({ href, icon, label, active, className = null }) {
    return (
        <Link
            href={href}
            className={`w-full p-2 rounded-md cursor-pointer flex items-center gap-2 text-[18px] transition-all hover:bg-bgDashboardHover ${className} ${
                active ? '!bg-bgDashboardHover' : ''
            }`}>
            <Icons name={icon} className="text-[16px]" />
            <h2>{label}</h2>
        </Link>
    )
}

function MainPanel({ children, pathName }) {
    const { title } = useNavigationTitle()
    return (
        <div className="w-[60vw] overflow-y-auto h-full bg-bgPrimary rounded-xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.15)] overflow-hidden">
            <div className="w-full border-b border-border h-16 flex px-4 items-center justify-between">
                <h2 className="text-[20px] font-medium text-textSecondary">
                    {title}
                </h2>
                {pathName === '/dashboard/classes' && (
                    <div className="flex items-center gap-2 text-success flex-row-reverse">
                        <Link
                            href="/dashboard/classes/enroll"
                            className="flex items-center gap-2 flex-row-reverse hover:scale-105 transition-all">
                            <p className="text-[16px] font-medium">
                                ثبت نام کلاس جدید
                            </p>
                            <Icons name="plus" className="text-[20px]" />
                        </Link>
                    </div>
                )}
            </div>
            <div className="w-full p-4 relative overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

function LeftPanel() {
    return (
        <div className="flex flex-col gap-4 opacity-40">
            <div className="w-[20vw] h-1/2 bg-bgPrimary rounded-xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.15)] overflow-hidden">
                <div className="w-full border-b border-border h-16 flex px-4 items-center justify-between">
                    <h2 className="text-[18px] font-medium text-textSecondary">
                        تقویم هفتگی کلاس
                    </h2>
                </div>
                <div className="w-full h-full p-4  flex justify-center items-center">
                    <p className="text-[20px] text-textSecondary">به زودی</p>
                </div>
            </div>
            <div className="w-[20vw] h-1/2 bg-bgPrimary rounded-xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.15)] overflow-hidden">
                <div className="w-full border-b border-border h-16 flex px-4 items-center justify-between">
                    <h2 className="text-[18px] font-medium text-textSecondary">
                        حضور و غیاب
                    </h2>
                </div>
                <div className="w-full h-full p-4  flex justify-center items-center">
                    <p className="text-[20px] text-textSecondary">به زودی</p>
                </div>
            </div>
        </div>
    )
}
