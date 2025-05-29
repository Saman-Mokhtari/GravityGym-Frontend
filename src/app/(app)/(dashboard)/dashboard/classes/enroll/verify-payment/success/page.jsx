'use client'
import Icons from '@/components/Icons'
import FormLabel from '@/components/FormLabel'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentStatus() {
    const searchParam = useSearchParams()
    const status = searchParam.get('status')
    const ref_id = searchParam.get('ref_id')
    const message = searchParam.get('message')
    const success = status === 'success'
    return (
        <div className="w-full flex justify-center items-center mt-10">
            <div className="flex flex-col gap-4 items-center w-full desktop:w-8/12 border-green-50">
                <div
                    className={`flex aspect-square w-24 justify-center items-center  rounded-full ${success ? 'bg-success/20' : 'bg-error/20'}`}>
                    <Icons
                        name={success ? 'check' : 'close'}
                        className={`text-[40px] ${success ? 'text-success' : 'text-error'}`}
                    />
                </div>
                <h2
                    className={`flex text-[20px] font-bold ${success ? 'text-success' : 'text-error'}`}>
                    {message === 'پرداخت قبلاً تایید شده است.'
                        ? 'پرداخت با موفقیت انجام شد.'
                        : message}
                </h2>
                <div className="w-full rounded-md mt-6 gap-2 flex flex-col">
                    <FormLabel text="کد رهگیری شما" />
                    <div className="w-full rounded-lg bg-bgInput p-3">
                        <p className="text-[18px] text-end">{ref_id}</p>
                    </div>
                </div>
                <LinkToClasses />
            </div>
        </div>
    )
}

function LinkToClasses() {
    const router = useRouter()

    return (
        <div
            onClick={() => {
                router.replace('/dashboard/classes')
            }}
            className="w-full cursor-pointer hover:scale-105 transition-all py-5 rounded-md flex justify-center items-center border border-bgTertiary">
            بازگشت به صفحه قبل
        </div>
    )
}
