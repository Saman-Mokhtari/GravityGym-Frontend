'use client'
import React, { useEffect, useState } from 'react'
import Icons from './Icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useWindowSize from '@/hooks/useWindowSize'

function AthleteBottomNavbar() {
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
                className={`${
                    [
                        '/admin',
                        '/admin/classes',
                        '/admin/users',
                        '/admin/profile',
                    ].includes(pathName)
                        ? '!flex'
                        : 'hidden'
                } z-40 fixed bg-bgPrimary w-full bottom-0 font-light shadow-custom items-center font-font transition-all duration-25 ${
                    !scrolled ? 'translate-y-full' : 'translate-y-0'
                } ${isDesktop ? 'hidden' : ''}`}>
                <Link
                    href="/admin"
                    className={`flex flex-col w-full py-3 ${pathName === '/admin' && 'bg-bgInput'} items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName === '/admin'
                                ? 'analyticsSolid'
                                : 'analytics'
                        }
                        className="text-[27px]"
                    />
                    <h2>در یک نگاه</h2>
                </Link>
                <Link
                    href="/admin/classes"
                    className={`flex flex-col w-full py-3 ${
                        pathName.startsWith('/admin/classes')
                            ? 'bg-bgInput font-medium'
                            : ''
                    } items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName.startsWith('/admin/classes')
                                ? 'dumbleSolid'
                                : 'dumble'
                        }
                        className="text-[27px]"
                    />
                    <h2>کلاس‌ها</h2>
                </Link>

                <Link
                    href="/admin/users"
                    className={`flex flex-col w-full py-3 ${pathName.startsWith('/admin/users') && 'bg-bgInput font-medium'} items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName.startsWith('/admin/users')
                                ? 'users'
                                : 'usersThin'
                        }
                        className="text-[27px] "
                    />
                    <h2>اعضا</h2>
                </Link>
                <Link
                    href="/admin/profile"
                    className={`flex flex-col w-full py-3 ${pathName.startsWith('/admin/profile') && 'bg-bgInput font-medium'} items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName.startsWith('/admin/profile')
                                ? 'user'
                                : 'userLight'
                        }
                        className="text-[27px] "
                    />
                    <h2>پروفایل</h2>
                </Link>
            </nav>
        </>
    )
}

export default AthleteBottomNavbar
