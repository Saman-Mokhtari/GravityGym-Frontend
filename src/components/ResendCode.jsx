import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import Icons from '@/components/Icons'

export default function ResendCode({ phoneNumber }) {
    const [newCodeCountDown, setNewCodeCountDown] = useState(30)
    const { resendCode, loading } = useAuth({ middleware: 'guest' })
    const [codeSent, setCodeSent] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('otp_timer_start')
        if (saved) {
            const elapsed = Math.floor((Date.now() - parseInt(saved)) / 1000)
            const remaining = 30 - elapsed
            if (remaining > 0) {
                setNewCodeCountDown(remaining)
            }
        }
    }, [])

    useEffect(() => {
        if (newCodeCountDown === 30) {
            localStorage.setItem('otp_timer_start', Date.now().toString())
        }

        if (newCodeCountDown === 0) {
            localStorage.removeItem('otp_timer_start')
            return
        }

        const timer = setInterval(() => {
            setNewCodeCountDown(prev => {
                if (prev > 1) return prev - 1
                clearInterval(timer)
                return 0
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [newCodeCountDown])

    useEffect(() => {
        if (!codeSent) return
        const timer = setInterval(() => {
            setCodeSent(false)
            setNewCodeCountDown(30)
        }, 1500)
        return () => clearInterval(timer)
    }, [codeSent])

    const resendCodeHandler = async e => {
        e.preventDefault()
        await resendCode({
            setCodeSent,
            phone_number: phoneNumber,
        })
    }

    return (
        <div dir="rtl" className="flex items-center gap-4">
            {codeSent ? (
                <div
                    onClick={resendCodeHandler}
                    className={`font-medium text-[16px] hover:text-textSecondary transition-all duration-50 text-success`}>
                    کد مجددا ارسال شد
                </div>
            ) : !loading ? (
                <div
                    onClick={resendCodeHandler}
                    className={`font-medium text-[16px] transition-all duration-50 ${newCodeCountDown === 0 ? 'text-textPrimary hover:text-textSecondary cursor-pointer' : 'text-textSecondary/50 cursor-not-allowed'}`}>
                    ارسال مجدد کد
                </div>
            ) : (
                <div className="flex items-center gap-1">
                    <Icons
                        name="loadingSpinner"
                        className="animate-spin text-[20px]"
                    />
                    <div
                        onClick={resendCodeHandler}
                        className={`text-textPrimary font-medium text-[16px] hover:text-textSecondary transition-all duration-50`}
                    />
                    لطفا منتظر بمانید
                </div>
            )}
            <p
                className={`font-light text-[16px] text-success ${newCodeCountDown === 0 && 'hidden'}`}>
                {newCodeCountDown > 0 && `${newCodeCountDown} ثانیه`}
            </p>
        </div>
    )
}
