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
                        '/instructor',
                        '/instructor/classes',
                        '/instructor/assigned-classes',
                        '/instructor/profile',
                    ].includes(pathName)
                        ? '!flex'
                        : 'hidden'
                } z-40 fixed bg-bgPrimary w-full bottom-0 font-light shadow-custom items-center font-font transition-all duration-25 ${
                    !scrolled ? 'translate-y-full' : 'translate-y-0'
                } ${isDesktop ? 'hidden' : ''}`}>
                <Link
                    href="/instructor/assigned-classes"
                    className={`flex flex-col w-full py-3 ${pathName.startsWith('/instructor/assigned-classes') && 'bg-bgInput font-medium'} items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName.startsWith('/instructor/assigned-classes')
                                ? 'coachSolid'
                                : 'coachThin'
                        }
                        className="text-[27px] "
                    />
                    <h2>آموزشی</h2>
                </Link>
                <Link
                    href="/instructor/classes"
                    className={`flex flex-col w-full py-3 ${
                        pathName.startsWith('/instructor/classes')
                            ? 'bg-bgInput font-medium'
                            : ''
                    } items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName.startsWith('/instructor/classes')
                                ? 'dumbleSolid'
                                : 'dumble'
                        }
                        className="text-[27px]"
                    />
                    <h2>ثبت‌نامی</h2>
                </Link>
                <Link
                    href="/instructor/profile"
                    className={`flex flex-col w-full py-3 ${pathName.startsWith('/instructor/profile') && 'bg-bgInput font-medium'} items-center justify-center gap-2`}>
                    <Icons
                        name={
                            pathName.startsWith('/instructor/profile')
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
