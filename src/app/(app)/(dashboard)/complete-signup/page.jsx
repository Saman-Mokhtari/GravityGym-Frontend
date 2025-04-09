'use client'
import DashboardNavigation from '@/components/DashboardNavigation'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import DatePicker from 'react-multi-date-picker'
import jalali from 'react-date-object/calendars/jalali'
import persian_fa from 'react-date-object/locales/persian_fa'
import DateObject from 'react-date-object'
import { useState } from 'react'
import Image from 'next/image'
import image from '/public/images/completesignup.jpg'
import { useAuth } from '@/hooks/auth'

export default function CompleteSignup() {
    const [birthDate, setBirthDate] = useState('1404/01/01')
    useAuth({
        middleware: 'informationCheck',
        redirectIfAuthenticated: '/dashboard',
    })
    return (
        <div className="w-full flex flex-col desktop:flex-row">
            <DashboardNavigation />
            <div className="w-full desktop:w-1/2  mt-[6rem] desktop:mt-4 flex container flex-col gap-6">
                <h2 className="text-[25px] font-bold hidden desktop:flex">
                    تکمیل ثبت‌نام
                </h2>
                <FormLabel text="لطفا جهت تکمیل فرایند ثبت نام اطلاعات خود را وارد کنید." />
                <form action="#" className="w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <FormLabel text="نام و نام‌خانوادگی">
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <input
                            type="text"
                            className="w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]"
                            placeholder="علی جعفری"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel text="جنسیت">
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <select
                            className="w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]"
                            defaultValue="male">
                            <option value="male">مرد</option>
                            <option value="female">زن</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <FormLabel text="تاریخ تولد">
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <DatePicker
                            value={birthDate}
                            onChange={date => {
                                if (date)
                                    setBirthDate(date.format('YYYY/MM/DD'))
                            }}
                            calendar={jalali}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            editable={false}
                            inputClass="w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]"
                            containerStyle={{ width: '100%' }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <FormLabel text="آدرس ایمیل">
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <input
                            type="text"
                            className="w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]"
                            placeholder="gravity.gym@gmail.com"
                        />
                    </div>
                    <button className="flex w-full hover:scale-[1.01] transition-all bg-bgTertiary py-4 justify-center items-center text-[18px] font-bold text-bgPrimary rounded-md">
                        تکمیل ثبت نام
                    </button>
                </form>
            </div>
            <div className="w-1/2 h-screen hidden desktop:flex relative">
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
