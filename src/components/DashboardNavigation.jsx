'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Icons from '@/components/Icons'
import Link from 'next/link'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { useAuth } from '@/hooks/auth'

export default function DashboardNavigation() {
    const currentRoute = usePathname()
    const router = useRouter()
    const { user } = useAuth()
    const { title } = useNavigationTitle()
    const [scrolled, setScrolled] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const pathname = usePathname()
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setScrolled(false) // Scroll down -> hide
            } else {
                setScrolled(true) // Scroll up -> show
            }
            setLastScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <nav
            className={`${pathname.startsWith('/dashboard/classes/enroll/verify-payment') && 'hidden'} w-full py-6 px-4 desktop:hidden flex items-center justify-between shadow-custom fixed top-0 left-0 bg-bgPrimary z-[100] transition-all duration-300 ${
                scrolled ? 'translate-y-0' : '-translate-y-full'
            }`}>
            <div className={`flex items-center justify-between w-full`}>
                <div className="flex items-center gap-4">
                    <div
                        onClick={() => {
                            router.back()
                        }}
                        className={`aspect-square w-8 ${!['/admin', '/admin/classes', '/admin/users', '/admin/profile'].includes(pathname) ? 'flex flex-col' : 'hidden'} items-center justify-center border border-textPrimary rounded-md`}>
                        <Icons name="arrowRight" className="text-[20px]" />
                    </div>
                    <h2 className="text-[18px] font-medium ['/admin', '/admin/classes', '/admin/users', '/admin/profile'].includes(pathname) ? 'flex flex-col' : 'hidden'">
                        {title}
                    </h2>
                </div>
                {![
                    '/admin',
                    '/admin/classes',
                    '/admin/users',
                    '/admin/profile',
                    '/dashboard',
                    '/dashboard/classes',
                    '/dashboard/profile',
                    '/instructor',
                    '/instructor/classes',
                    '/instructor/assigned-classes',
                    '/instructor/profile',
                ].includes(pathname) && (
                    <Icons
                        name="home"
                        className="text-[24px] font-medium flex"
                        onClick={() => {
                            if (user?.role === 'superUser')
                                router.replace('/admin')
                            else if (user?.role === 'instructor')
                                router.replace('/instructor/assigned-classes')
                            else router.replace('/dashboard/classes')
                        }}
                    />
                )}
            </div>
            {currentRoute === '/dashboard/classes' && (
                <Link href="/dashboard/classes/enroll">
                    <Icons name="plus" className="text-[25px]" />
                </Link>
            )}
        </nav>
    )
}
