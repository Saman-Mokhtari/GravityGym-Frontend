import Image from 'next/image'
import logo from '/public/images/logo.png'
import Icons from '@/components/Icons'

export default function Navigation() {
    return (
        <nav className="w-full container flex flex-row-reverse items-center justify-between py-2 bg-opacity-0 fixed top-0 z-20">
            <Image src={logo} alt={'Gravity Gym Logo'} width="60" height="60" />
            <Icons name={'hamburger'} className="text-bgPrimary text-[30px]" />
        </nav>
    )
}
