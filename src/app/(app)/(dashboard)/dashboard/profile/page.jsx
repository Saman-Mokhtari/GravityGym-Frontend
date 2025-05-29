'use client'

import { useTranslator } from '@/hooks/translator'
import FormLabel from '@/components/FormLabel'
import InformationCell from '@/components/InformationCell'
import Link from 'next/link'
import Icons from '@/components/Icons'
import { useAuth } from '@/hooks/auth'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { useEffect } from 'react'

export default function Main() {
    const { persianInsurance } = useTranslator()
    const { user } = useAuth()
    const { setTitle } = useNavigationTitle()
    const { logout } = useAuth()
    useEffect(() => {
        setTitle('پروفایل کاربری')
    }, [])

    return (
        <div className="w-full flex flex-col gap-6 mt-2">
            <div className="w-full flex items-center justify-between ">
                <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex items-center p-2 justify-between">
                        <FormLabel text="مشخصات کاربر" />
                        <Link
                            href="/dashboard/profile/edit"
                            className="text-success hover:scale-105 group transition-all flex flex-row-reverse items-center gap-2">
                            <p>ویرایش اطلاعات</p>
                            <Icons
                                name="edit"
                                className="text-[18px] group-hover:font-bold"
                            />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                        <InformationCell
                            title="نام و نام خانوادگی"
                            data={user?.name}
                        />
                        <InformationCell
                            title="کد ملی"
                            data={user?.national_id}
                        />
                        {user?.email && (
                            <InformationCell title="ایمیل" data={user?.email} />
                        )}
                        <InformationCell
                            title="تاریخ تولد"
                            data={user?.birthdate}
                        />
                        <InformationCell
                            title="شماره تلفن"
                            data={user?.phone_number}
                        />

                        {/*<div className="flex flex-col gap-2 ">*/}
                        {/*    <h2 className="text-[18px] font-medium">عضویت</h2>*/}
                        {/*    <p className="text-[18px] font-light text-textSecondary">*/}
                        {/*        {Math.floor(user?.created_since['year']) === 0 ?*/}
                        {/*            Math.floor(user?.created_since['month']) === 0 ? "عضو جدید" : }*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <InformationCell
                            title="قد (سانتی‌متر)"
                            data={user?.height}
                        />
                        <InformationCell
                            title="وزن (کیلوگرم)"
                            data={user?.weight}
                        />

                        {user?.disabilities && (
                            <div className="flex flex-col gap-2 ">
                                <h2 className="text-[18px] font-medium">
                                    مشکلات پزشکی
                                </h2>
                                {user?.disabilities.length !== 0 ? (
                                    user?.disabilities.map(disable => (
                                        <p
                                            key={Math.random()}
                                            className="text-[18px] font-light text-textSecondary">
                                            {disable}
                                        </p>
                                    ))
                                ) : (
                                    <p
                                        key={Math.random()}
                                        className="text-[18px] font-light text-textSecondary">
                                        بدون مشکل خاص
                                    </p>
                                )}
                                <InformationCell
                                    title="بیمه ورزشی"
                                    data={persianInsurance[user?.insurance]}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button
                onClick={logout}
                className="mt-4 desktop:hidden flex items-center gap-2 text-error py-2 px-4 border border-error rounded-md w-fit hover:bg-error hover:text-bgPrimary transition-all">
                <Icons name="logout" />
                <p>خروج از حساب کاربری</p>
            </button>
        </div>
    )
}
