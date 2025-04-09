'use client'
import Icons from '@/components/Icons'
import useWindowSize from '@/hooks/useWindowSize'
import LoginRegister from '@/components/LoginRegister'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NavLinks() {
    const { isDesktop } = useWindowSize()
    const [hamburgerOpen, setHamburgerOpen] = useState(false)

    useEffect(() => {
        if (hamburgerOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = ''
        }
    }, [hamburgerOpen])

    if (!isDesktop) {
        return (
            <>
                <Icons
                    name={hamburgerOpen ? 'close' : 'hamburger'}
                    className="text-bgPrimary text-[30px] z-[100]"
                    onClick={() => {
                        setHamburgerOpen(!hamburgerOpen)
                    }}
                />
                <div
                    className={`w-screen h-screen fixed bg-bgTertiary top-0 left-0 justify-center ${hamburgerOpen ? 'flex' : 'hidden'}`}>
                    {/* Pass setHamburgerOpen as a prop */}
                    <Links setHamburgerOpen={setHamburgerOpen} />
                </div>
            </>
        )
    }

    return (
        <div className="flex items-center gap-16">
            <Links setHamburgerOpen={setHamburgerOpen} />
        </div>
    )
}

function Links({ setHamburgerOpen }) {
    const { isDesktop } = useWindowSize()
    return (
        <div className="flex flex-col desktop:flex-row gap-20 mt-[30%] desktop:mt-0 h-fit z-[100]">
            <LoginRegister
                onClick={() => {
                    setHamburgerOpen(false)
                }}
            />
            <ul className="flex flex-col desktop:flex-row items-center gap-20">
                <Link
                    href="#suggestions"
                    onClick={() => !isDesktop && setHamburgerOpen(false)}>
                    <li className="text-bgPrimary font-medium text-[20px] hover:scale-105 transition-all hover:text-bgPrimary/70 cursor-pointer">
                        کلاس‌ها
                    </li>
                </Link>
                <Link
                    href="#subscriptions"
                    onClick={() => {
                        if (!isDesktop) return setHamburgerOpen(false)
                    }}>
                    <li className="text-bgPrimary font-medium text-[20px] hover:scale-105 transition-all hover:text-bgPrimary/70 cursor-pointer">
                        تعرفه‌ها
                    </li>
                </Link>
                <Link
                    href="#aboutus"
                    onClick={() => {
                        if (!isDesktop) return setHamburgerOpen(false)
                    }}>
                    <li className="text-bgPrimary font-medium text-[20px] hover:scale-105 transition-all hover:text-bgPrimary/70 cursor-pointer">
                        درباره ما
                    </li>
                </Link>
            </ul>
        </div>
    )
}
