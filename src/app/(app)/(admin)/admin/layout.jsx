'use client'
import useWindowSize from '@/hooks/useWindowSize'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import Icons from '@/components/Icons'
import FormLabel from '@/components/FormLabel'
import DashboardNavigation from '@/components/DashboardNavigation'
import Link from 'next/link'
import PageTitle from '@/components/PageTitle'
import SkeletonDashboardLoader from '@/components/SkeletonDashboardLoader'
import {
    NavigationTitleProvider,
    useNavigationTitle,
} from '@/context/NavigationTitleContext'
import SidebarLink from '@/components/SidebarLink'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // core styles
import 'tippy.js/dist/svg-arrow.css'
import NavigationContent from '@/components/NavigationContent'
import AdminProfile from '@/components/AdminProfile'

export default function Layout({ children }) {
    const { isDesktop } = useWindowSize()
    const pathName = usePathname()
    const { user, logout } = useAuth()
    if (!user) {
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
                    {/* <AdminBottomNavbar /> */}
                </NavigationTitleProvider>
            </>
        )
    }

    return (
        <div className="w-screen h-screen flex bg-bgDashboard p-3 gap-4 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <Sidebar user={user} logout={logout} pathName={pathName} />
            <MainPanel pathName={pathName}>{children}</MainPanel>
            <LeftPanel />
        </div>
    )
}

function Sidebar({ user, logout, pathName }) {
    return (
        <aside className="flex flex-col h-full w-[16vw] p-3 justify-between">
            <div>
                <PageTitle
                    firstLine="سلام"
                    secondLine={`${user?.name?.split(' ')[0]} عزیز!`}
                />

                <NavigationContent />
            </div>

            <AdminProfile logout={logout} user={user} pathName={pathName}/>
        </aside>
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
                            href="/src/app/(app)/(admin)/admin/classes/enroll"
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
