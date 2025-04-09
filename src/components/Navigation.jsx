'use client'
import Image from 'next/image'
import logo from '/public/images/logo.png'
import NavLinks from '@/components/NavLinks'
import { useEffect, useState } from 'react'
import useWindowSize from '@/hooks/useWindowSize'

export default function Navigation() {
    const [scrolled, setScrolled] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [background, setBackground] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setBackground(true)
            } else {
                setBackground(false)
            }

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
        <nav
            className={`w-full py-4 desktop:py-8 px-6 tablet:px-8 desktop:px-20 flex flex-row-reverse items-center transition-all duration-300  justify-between  fixed top-0 z-20 ${background ? 'bg-opacity-0' : 'bg-bgTertiary/90 backdrop-blur'}  ${scrolled ? 'shadow-custom  translate-y-0' : '-translate-y-full '}`}>
            <Image src={logo} alt={'Gravity Gym Logo'} width="60" height="60" />
            <NavLinks />
        </nav>
    )
}
