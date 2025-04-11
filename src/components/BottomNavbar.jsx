'use client'
import React, { useEffect, useState } from 'react'
import Icons from './Icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NavigateToTop from './NavigateToTop'
import useWindowSize from '@/hooks/useWindowSize'

function BottomNavbar() {
    const [scrolled, setScrolled] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const pathName = usePathname()
    const { isDesktop } = useWindowSize()
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }

            if (window.scrollY > lastScrollY) {
                setScrolled(false)
            } else {
                setScrolled(true)
            }

            setLastScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return (
        <>
            <nav
                className={`flex  z-40 fixed bg-bgPrimary w-full bottom-0 font-light shadow-custom items-center  font-font  transition-all duration-25 ${!scrolled ? 'translate-y-full' : 'translate-y-0'} ${isDesktop && 'hidden'} ${pathName === '/complete-signup' || (pathName === '/dashboard/classes/enroll' && 'hidden')}`}>
                <Link
                    href="/dashboard"
                    className={`flex flex-col w-1/3 py-3 ${pathName === '/dashboard' && 'bg-bgInput'} items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName === '/dashboard'
                                ? 'analyticsSolid'
                                : 'analytics'
                        }
                        className="text-[27px]"
                    />
                    <h2>در یک نگاه</h2>
                </Link>
                <Link
                    href="/dashboard/classes"
                    className={`flex flex-col w-1/3 py-3 ${
                        pathName.startsWith('/dashboard/classes')
                            ? 'bg-bgInput font-medium'
                            : ''
                    } items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName.startsWith('/dashboard/classes')
                                ? 'dumbleSolid'
                                : 'dumble'
                        }
                        className="text-[27px]"
                    />
                    <h2>کلاس‌ها</h2>
                </Link>

                <Link
                    href="/dashboard/profile"
                    className={`flex flex-col w-1/3 py-3 ${pathName === '/dashboard/profile' && 'bg-bgInput font-medium'} items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName === '/dashboard/profile'
                                ? 'user'
                                : 'userLight'
                        }
                        className="text-[27px] fa-thin"
                    />
                    <h2>پروفایل</h2>
                </Link>
            </nav>
        </>
    )
}

export default BottomNavbar
