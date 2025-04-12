'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import DatePicker from 'react-multi-date-picker'
import jalali from 'react-date-object/calendars/jalali'
import persian_fa from 'react-date-object/locales/persian_fa'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import image from '/public/images/completesignup.jpg'
import { useAuth } from '@/hooks/auth'
import PrimaryButton from '@/components/PrimaryButton'
import ErrorLabel from '@/components/ErrorLabel'
import { useRouter } from 'next/navigation'

export default function CompleteSignup() {
    const router = useRouter()
    const [birthDate, setBirthDate] = useState('')
    const [fullName, setFullName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState(false)
    const [informationSuccess, setInformationSuccess] = useState(false)
    const { completeSignup, loading } = useAuth({
        middleware: 'informationCheck',
        redirectIfAuthenticated: '/dashboard',
    })

    useEffect(() => {
        if (informationSuccess) return router.replace('/dashboard')
    }, [informationSuccess])

    const submitForm = async e => {
        e.preventDefault()
        try {
            await completeSignup({
                fullName: fullName,
                gender: gender,
                birthDate: birthDate,
                email: email,
                setErrors,
                setInformationSuccess,
            })
        } catch (error) {
            setErrors(prevErrors => ({
                ...prevErrors,
            }))
        }
    }

    const handleDateChange = date => {
        if (date) {
            // Ensure the date is in the expected format before setting the state
            const formattedDate = convertPersianToEnglishDigits(
                date.format('YYYY/MM/DD'),
            )
            setBirthDate(formattedDate)
        }
    }

    return (
        <div className="w-full flex flex-col desktop:flex-row desktop:overflow-y-hidden">
            <div className="w-full desktop:w-1/2 desktop:h-[96vh] desktop:overflow-y-scroll mt-[6rem] desktop:mt-4 flex container flex-col gap-6">
                <h2 className="text-[25px] font-bold hidden desktop:flex">
                    تکمیل ثبت‌نام
                </h2>

                <FormLabel text="لطفا جهت تکمیل فرایند ثبت نام اطلاعات خود را وارد کنید." />
                <form
                    onSubmit={submitForm}
                    className="w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <FormLabel
                            text="نام و نام‌خانوادگی"
                            error={errors.fullName}>
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <input
                            type="text"
                            className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors.fullName && 'border border-error text-error placeholder-error'}`}
                            onChange={e => {
                                setFullName(e.target.value)
                            }}
                        />
                        {errors.fullName && (
                            <ErrorLabel text={errors.fullName} />
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel text="جنسیت" error={errors.gender}>
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <select
                            className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors.gender && 'border border-error text-error placeholder-error'}`}
                            defaultValue=""
                            onChange={e => setGender(e.target.value)}>
                            <option value="">انتخاب کنید</option>
                            <option value="male">مرد</option>
                            <option value="female">زن</option>
                        </select>
                        {errors.gender && <ErrorLabel text={errors.gender} />}
                    </div>

                    <div className="flex flex-col gap-2">
                        <FormLabel text="تاریخ تولد" error={errors.birthDate}>
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <DatePicker
                            value={birthDate}
                            onChange={handleDateChange}
                            calendar={jalali}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            editable={false}
                            inputClass={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors.birthDate && 'border border-error text-error placeholder-error'}`}
                            containerStyle={{ width: '100%' }}
                        />
                        {errors.birthDate && (
                            <ErrorLabel text={errors.birthDate} />
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <FormLabel
                            text="آدرس ایمیل"
                            error={errors.email}></FormLabel>
                        <input
                            type="email"
                            className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors.email && 'border border-error text-error placeholder-error'}`}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {errors.email && <ErrorLabel text={errors.email} />}
                    </div>
                    <PrimaryButton loading={loading} className="">
                        تکمیل ثبت نام
                    </PrimaryButton>
                </form>
            </div>
            <div className="w-1/2 h-screen hidden overflow-y-hidden desktop:flex relative">
                <Image
                    src={image}
                    alt="image"
                    style={{ objectFit: 'cover' }}
                    fill
                />
            </div>
        </div>
    )
}

function convertPersianToEnglishDigits(str) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    return str
        .split('')
        .map(char => {
            const index = persianDigits.indexOf(char)
            return index !== -1 ? englishDigits[index] : char
        })
        .join('')
}
