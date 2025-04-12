'use client'
import Icons from '@/components/Icons'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { usePayment } from '@/hooks/payment'
import FormLabel from '@/components/FormLabel'
import Link from 'next/link'

export default function VerifyPayment() {
    const searchParms = useSearchParams()
    const { loading, verify } = usePayment()
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)

    useEffect(() => {
        const Authority = searchParms.get('Authority')
        const Status = searchParms.get('Status')
        if (Authority && Status) {
            const verifyPayment = async () => {
                try {
                    await verify({
                        authority: Authority,
                        status: Status,
                        setStatus,
                        setErrors,
                    })
                } catch (error) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        phone:
                            error.response?.status === 401
                                ? ['Invalid credentials']
                                : ['An unexpected error occurred'],
                    }))
                }
            }
            verifyPayment()
        }
    }, [searchParms])

    return (
        <div className="w-full h-[83vh] justify-center flex ">
            {loading ? (
                <div className="flex flex-col gap-4 items-center w-full">
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
            ) : (
                <PaymentStatus status={status} />
            )}
        </div>
    )
}

function LinkToClasses() {
    return (
        <Link
            href="/dashboard/classes"
            className="w-full py-5 rounded-md flex justify-center items-center border border-bgTertiary">
            بازگشت به صفحه قبل
        </Link>
    )
}

function PaymentStatus({ status }) {
    const success = status?.status === 'success'
    return (
        <div className="flex flex-col gap-4 items-center w-full">
            <div
                className={`flex aspect-square w-24 justify-center items-center  rounded-full ${success ? 'bg-success/20' : 'bg-error/20'}`}>
                <Icons
                    name={success ? 'check' : 'close'}
                    className={`text-[40px] ${success ? 'text-success' : 'text-error'}`}
                />
            </div>
            <h2
                className={`flex text-[20px] font-bold ${success ? 'text-success' : 'text-error'}`}>
                {status?.message}
            </h2>
            <div className="w-full rounded-md mt-6 gap-2 flex flex-col">
                <FormLabel text="کد رهگیری شما" />
                <div className="w-full rounded-lg bg-bgInput p-3">
                    <p className="text-[18px] text-end">{status?.ref_id}</p>
                </div>
            </div>
            <LinkToClasses />
        </div>
    )
}
