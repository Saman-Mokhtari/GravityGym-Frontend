'use client'
import { useEffect, useState } from 'react'
import Icons from '@/components/Icons'
import Link from 'next/link'
import FormLabel from '@/components/FormLabel'
import { useSearchParams } from 'next/navigation'
import { usePayment } from '@/hooks/payment'

export default function VerifyPayment() {
    const searchParams = useSearchParams()
    const Authority = searchParams.get('Authority')

    const { loading, verify } = usePayment()

    const [errors, setErrors] = useState(null)

    useEffect(() => {
        if (!Authority) return
        if (sessionStorage.getItem(`authorityKey:${Authority}`)) return

        const verifyPayment = async () => {
            try {
                await verify({ authority: Authority })
                sessionStorage.setItem(`authorityKey:${Authority}`, 'true')
            } catch (error) {
                setErrors({ message: 'خطا در بررسی پرداخت' })
            }
        }

        verifyPayment()
    }, [Authority])

    return (
        <div className="w-full h-[83vh] justify-center flex desktop:items-center ">
            <LoadingUI />
        </div>
    )
}

function LoadingUI() {
    return (
        <div className="flex flex-col gap-4 items-center w-full desktop:w-8/12 border-green-50">
            <div className="flex aspect-square w-24 justify-center items-center bg-bgTertiary/5 rounded-full">
                <Icons
                    name="loadingSpinner"
                    className="text-bgTertiary text-[40px] animate-spin"
                />
            </div>
            <h2 className="flex text-[20px] font-bold">
                در حال بررسی وضعیت پرداخت
            </h2>
            <p className="text-[20px] font-light">
                لطفاً چند لحظه منتظر بمانید
            </p>
        </div>
    )
}
