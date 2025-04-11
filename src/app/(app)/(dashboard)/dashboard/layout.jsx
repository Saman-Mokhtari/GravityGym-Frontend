'use client'
import useWindowSize from '@/hooks/useWindowSize'
import DashboardNavigation from '@/components/DashboardNavigation'
import BottomNavbar from '@/components/BottomNavbar'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import Icons from '@/components/Icons'
import FormLabel from '@/components/FormLabel'
import Link from 'next/link'

export default function Layout({ children }) {
    const { isDesktop } = useWindowSize()
    const { user, logout } = useAuth()
    const pathName = usePathname()
    if (!isDesktop) {
        return (
            <>
                <DashboardNavigation />
                <div
                    className={
                        pathName !== '/complete-signup'
                            ? 'w-full flex flex-col mt-[6rem] pb-10 container'
                            : null
                    }>
                    {children}
                </div>
                <BottomNavbar />
            </>
        )
    }
    return (
        <div
            className="w-screen h-screen flex bg-bgDashboard p-3 gap-4 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]
">
            <aside className="flex flex-col h-full w-[18vw] p-3 justify-between">
                <div className="w-full ">
                    <h2 className="text-[25px] font-bold">
                        سلام
                        <br /> {user.name.split(' ')[0]} عزیز!
                    </h2>
                    <div className="w-full mt-8  h-full flex flex-col gap-2">
                        <FormLabel text="مدیریت" />
                        <div className="w-full p-2 rounded-md cursor-pointer flex items-center gap-2 text-[18px] transition-all duration-200  hover:bg-bgDashboardHover">
                            <Icons name="grid" className="text-[20px]" />
                            <h2>صفحه اصلی داشبورد</h2>
                        </div>
                        <Link
                            href="/dashboard/classes"
                            className={`${pathName.startsWith('/dashboard/classes') && '!bg-bgDashboardHover'} w-full p-2 rounded-md cursor-pointer flex items-center gap-2 text-[18px] transition-all duration-200  hover:bg-bgDashboardHover`}>
                            <Icons
                                name={
                                    pathName.startsWith('/dashboard/classes')
                                        ? 'dumbleSolid'
                                        : 'dumbleLight'
                                }
                                className="text-[16px]"
                            />
                            <h2>کلاس‌های من</h2>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-full flex items-center gap-4 py-1 rounded-md">
                        <div className="aspect-square w-[2.5rem] rounded-full bg-gray-200 flex justify-center items-center">
                            <Icons
                                name="user"
                                className="text-[20px] text-textSecondary"
                            />
                        </div>
                        <h2 className="font-bold text-[18px]">{user.name}</h2>
                    </div>
                    <div
                        onClick={logout}
                        className="w-full flex items-center gap-4 group hover:bg-bgDashboardHover cursor-pointer py-1 rounded-md">
                        <div className="aspect-square w-[2.5rem] rounded-full  flex justify-center items-center">
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
            <div className="w-[80vw] h-full bg-bgPrimary rounded-xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.15)] overflow-hidden">
                <div className="w-full border-b border-border h-16 flex px-4 items-center justify-between">
                    <h2 className="text-[20px] font-medium text-textSecondary">
                        کلاس‌های من
                    </h2>
                    {pathName === '/dashboard/classes' && (
                        <div className="flex items-center gap-2 text-success flex-row-reverse">
                            <p className="text-[16px] font-medium">
                                ثبت نام کلاس جدید
                            </p>
                            <Link href="/dashboard/classes/enroll">
                                <Icons name="plus" className="text-[20px]" />
                            </Link>
                        </div>
                    )}
                </div>
                <div className="w-full p-4 relative overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
