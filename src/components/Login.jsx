'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ErrorLabel from '@/components/ErrorLabel'
import { setLazyProp } from 'next/dist/server/api-utils'

export default function Login({ validationSuccess }) {
    const router = useRouter()
    const { login, loading } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [phone, setPhone] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router?.reset?.length > 0 && Object.keys(errors).length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    }, [router, errors]) // Ensure this effect runs properly

    const submitForm = async event => {
        event.preventDefault()

        try {
            await login({
                phone_number: phone,
                remember: shouldRemember,
                setErrors,
                setStatus,
                validationSuccess,
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

    return (
        <div dir="rtl" className="w-full flex flex-col gap-4">
            <h2 className="font-semibold text-[18px]">ورود به حساب کاربری</h2>
            <div className="flex flex-col w-full gap-2">
                <form
                    onSubmit={submitForm}
                    className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <FormLabel
                            text={
                                'شماره تلفن خود را جهت ورود یا ثبت نام وارد کنید'
                            }
                        />
                        <ErrorLabel text={errors?.phone_number} />
                        <div className="w-full relative">
                            <input
                                type="tel"
                                onChange={e => {
                                    setPhone(e.target.value)
                                }}
                                className={`w-full border py-4 text-[18px] pl-14  border-border rounded-md text-textPrimary focus:ring-0 focus:border focus:border-textSecondary ${errors?.phone_number && 'border-error placeholder:text-error/50'}`}
                                placeholder="09129999999"
                            />
                            <div className="flex items-center gap-3 flex-row-reverse absolute left-4 top-1/2 -translate-y-1/2">
                                <Icons
                                    name={'hashtag'}
                                    className={`text-[20px] text-textSecondary ${errors?.phone_number && 'text-error'}`}
                                />
                                <div
                                    className={`flex w-[0.7px] h-[20px] bg-textSecondary ${errors?.phone_number && 'bg-error'}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={shouldRemember}
                            onChange={() => setShouldRemember(!shouldRemember)}
                            className="accent-textPrimary w-4 h-4"
                        />
                        <FormLabel text="مرا بخاطر بسپار" />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full mt-4 flex justify-center items-center text-textPrimary border border-textPrimary rounded-md  h-16 bg-bgSecondary">
                        {!loading ? (
                            <p className="">ورود / ثبت‌نام</p>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Icons
                                    name="loadingSpinner"
                                    className="animate-spin text-[30px]"
                                />
                                <p>لطفا منتظر بمانید</p>
                            </div>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
