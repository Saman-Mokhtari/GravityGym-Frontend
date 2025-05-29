'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import ErrorLabel from '@/components/ErrorLabel'
import PrimaryButton from '@/components/PrimaryButton'

export default function LoginSection({
    validationSuccess,
    setPhoneNumber,
    error,
}) {
    const { login, loading } = useAuth()

    const [phone, setPhone] = useState(null)
    const [errors, setErrors] = useState({})

    const submitForm = async event => {
        event.preventDefault()

        try {
            await login({
                phone_number: phone,
                setErrors,
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
                        {error && <ErrorLabel text="لطفا مجدد تلاش کنید" />}
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
                                    setPhoneNumber(e.target.value)
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
                                    className={`flex w-[0.7px] h-[20px] bg-textSecondary ${errors?.phone_number && 'bg-error'}`}
                                />
                            </div>
                        </div>
                    </div>

                    <PrimaryButton loading={loading}>
                        ورود / ثبت‌نام
                    </PrimaryButton>
                </form>
            </div>
        </div>
    )
}
