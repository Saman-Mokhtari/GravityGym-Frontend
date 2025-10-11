'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Icons from '@/components/Icons'
import Link from 'next/link'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { useAuth } from '@/hooks/auth'
import AdminNavigationPage from './AdminNavigationPage'

export default function DashboardNavigation() {
    const currentRoute = usePathname()
    const router = useRouter()
    const { user } = useAuth()
    const { title } = useNavigationTitle()
    const [scrolled, setScrolled] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const pathname = usePathname()
    const [navOpen, setNavOpen] = useState(true)

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
                (scrolled) ? 'translate-y-0' : (!navOpen) && '-translate-y-full'
            }`}>
            <div className={`flex items-center justify-between w-full`}>
                <div className="w-full flex flex-col">
                    <div className="flex items-center gap-4 z-50">
                        <div
                            className="flex"
                            onClick={() => {
                                setNavOpen(!navOpen)
                            }}>
                            <Icons
                                name={!navOpen ? 'hamburger' : 'close'}
                                className="text-[22px] "
                            />
                        </div>
                        <h2 className="text-[18px]  font-medium ['/admin', '/admin/classes', '/admin/users', '/admin/profile'].includes(pathname) ? 'flex flex-col' : 'hidden'">
                            {title}
                        </h2>
                    </div>
                    <AdminNavigationPage
                        navOpen={navOpen}
                        setNavOpen={setNavOpen}
                    />
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
