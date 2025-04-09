import React from 'react'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import useWindowSize from '@/hooks/useWindowSize'

export default function LoginButton({ handleClick = null }) {
    const { user } = useAuth()
    const { isDesktop } = useWindowSize()
    return user ? (
        <Link
            href="/dashboard"
            className="w-52 py-4 cursor-pointer hover:scale-105 duration-200 transition-all bg-bgSecondary flex justify-center items-center text-center rounded-full mt-8 desktop:mt-0">
            <p className="text-textPrimary text-[18px] font-bold">
                ورود به پنل کاربری
            </p>
        </Link>
    ) : (
        <div
            onClick={() => {
                if (isDesktop) return handleClick()
            }}
            className="w-52 py-4 cursor-pointer hover:scale-105 duration-200 transition-all bg-bgSecondary flex justify-center items-center text-center rounded-full mt-8 desktop:mt-0">
            <p className="text-textPrimary text-[18px] font-bold">
                ورود به کلاس / ثبت نام
            </p>
        </div>
    )
}
