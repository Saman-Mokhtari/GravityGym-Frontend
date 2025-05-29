'use client'
import FormLabel from '@/components/FormLabel'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useEnrollments } from '@/hooks/enrollment'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@/hooks/user'
import { useSubscription } from '@/hooks/subscription'
import { useTranslator } from '@/hooks/translator'
import PrimaryButton from '@/components/PrimaryButton'

import { DatePicker } from 'zaman'
import jalaali from 'jalaali-js'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import Icons from '@/components/Icons'
import Tippy from '@tippyjs/react'

export default function Edit() {
    const [, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isClearable] = useState(false)
    const [isDisabled] = useState(false)
    const [isLoading] = useState(false)
    const [isRtl] = useState(true)
    const [enrollment, setEnrollment] = useState(null)
    const params = useParams()
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
    const { enrollment: fetchErnolllment, update } = useEnrollments()
    const { active } = useSubscription()
    const { instructors } = useUser()
    const [, setFilteredInstructors] = useState(null)
    const [selectedSub, setSelectedSub] = useState(null)
    const [, setSelectedInstructor] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const { persianDays } = useTranslator()
    const [isSucceeded, setIsSucceeded] = useState(false)
    const router = useRouter()
    const { setTitle } = useNavigationTitle()
    const { cancel } = useEnrollments()
    useEffect(() => {
        if (instructors && selectedSub) {
            setTitle(`ویرایش دوره کاربر - ${selectedSub?.className}`)
            const filtered = instructors.filter(instructor =>
                instructor.subscriptions?.some(
                    sub => sub.class?.id === selectedSub.value,
                ),
            )

            const options = filtered.map(i => ({
                value: i.name,
                label: i.name,
            }))
            setFilteredInstructors(options)
        }
    }, [instructors, selectedSub])

    useEffect(() => {
        if (params?.userId && params?.enrollId) {
            const fetchEnroll = async () => {
                try {
                    await fetchErnolllment({
                        enrollment_id: params?.enrollId,
                        user_id: params?.userId,
                        setEnrollment,
                        setErrors,
                    })
                } catch (error) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                    }))
                }
            }
            fetchEnroll()
        }
    }, [params?.userId])

    useEffect(() => {
        if (enrollment) {
            if (enrollment?.subscription?.class) {
                setSelectedSub({
                    value: enrollment?.subscription?.id,
                    className: enrollment?.subscription?.class?.name,
                    classDays: enrollment?.subscription?.class_days,
                    durationValue: enrollment?.subscription?.duration_value,
                    durationUnit: enrollment?.subscription?.duration_unit,
                    instructor: enrollment?.subscription?.instructor,
                    startTime: enrollment?.subscription?.start_time,
                    endTime: enrollment?.subscription?.end_time,
                })
            }
            if (enrollment?.subscription?.instructor) {
                setSelectedInstructor({
                    value: enrollment?.subscription?.instructor,
                    label: enrollment?.subscription?.instructor,
                })
            }
            if (enrollment?.start_date && enrollment?.end_date) {
                const raw = convertPersianToEnglishDigits(enrollment.start_date)
                const [jy, jm, jd] = raw.split('/').map(Number)
                const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd)
                const date = new Date(gy, gm - 1, gd)
                setStartDate(date)
            }
            if (enrollment?.status === 'cancelled') {
                setCancelled(true)
            }
        }
    }, [enrollment])

    useEffect(() => {
        if (isSucceeded) {
            notifySuccess()
            const timeout = setTimeout(() => {
                router.replace(`/admin/users/${params?.userId}`)
            }, 2200)
            return () => clearTimeout(timeout)
        }
    }, [isSucceeded])
    const handleDateChange = value => {
        const date = new Date(value.value)

        // فرمت‌دهی دستی به صورت YYYY-MM-DD
        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0') // ماه‌ها 0 اندیس هستن
        const dd = String(date.getDate()).padStart(2, '0')

        const formatted = `${yyyy}-${mm}-${dd}`

        setStartDate(formatted)
    }

    const subscriptionOptions = active?.map(sub => ({
        value: sub?.id,
        label: `${sub?.class?.name} - ${sub?.instructor}`, // فقط برای سرچ
        className: sub?.class?.name,
        classDays: sub?.class_days,
        startTime: sub?.start_time,
        durationValue: sub?.duration_value,
        durationUnit: sub?.duration_unit,
        instructor: sub?.instructor,
        endTime: sub?.end_time,
    }))

    const handleDelete = async () => {
        setIsConfirmingDelete(false)
        try {
            await cancel({
                sub_id: enrollment?.subscription?.id,
                enroll_id: enrollment?.id,
                setErrors,
            })
            toast.success('کاربر با موفقیت حذف شد.')
            setTimeout(() => {
                router.replace(`/admin/users/${params?.userId}`)
            }, 2000)
        } catch (error) {
            setErrors(error)
        }
    }
    const notifySuccess = () =>
        toast.success('ثبت نام کاربر ویرایش گردید', { duration: 2000 })
    const formSubmitHandler = async e => {
        e.preventDefault()
        try {
            await update({
                setLoading,
                setErrors,
                enrollment_id: params?.enrollId,
                user_id: params?.userId,
                subscription_id: selectedSub?.value,
                start_date: startDate,
                cancelled: cancelled,
                setIsSucceeded,
            })
        } catch (e) {
            setErrors(prev => {
                return { ...prev, e }
            })
        }
    }

    if (!startDate) return <div>در حال بارگذاری تاریخ...</div>

    return (
        <div className="flex flex-col gap-5 h-full overflow-hidden">
            <Toaster />
            <form
                onSubmit={formSubmitHandler}
                action=""
                className="w-full flex flex-col gap-5 h-full">
                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="اشتراک" />
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        value={selectedSub}
                        onChange={setSelectedSub}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isRtl={isRtl}
                        isSearchable={true}
                        name="subscription"
                        options={subscriptionOptions}
                        menuPosition="fixed"
                        menuPortalTarget={
                            typeof window !== 'undefined' ? document.body : null
                        }
                        styles={{
                            menuPortal: base => ({
                                ...base,
                                zIndex: 9999,
                                direction: 'rtl',
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected
                                    ? 'rgb(var(--color-border))'
                                    : state.isFocused
                                      ? 'rgba(var(--color-text-secondary), 0.15)'
                                      : 'transparent',
                                color: state.isSelected
                                    ? 'black'
                                    : 'rgb(var(--color-text-primary))',
                                cursor: 'pointer',
                            }),
                        }}
                        filterOption={(option, inputValue) => {
                            const haystack =
                                `${option.data.className} ${option.data.instructor}`.toLowerCase()
                            return haystack.includes(inputValue.toLowerCase())
                        }}
                        getOptionLabel={e => (
                            <div className="flex flex-col w-full gap-1 p-2 font-font">
                                <span className="flex font-medium">
                                    {e.className}
                                </span>
                                <span className="flex text-textSecondary text-[16px]">
                                    روزها:{' '}
                                    {e.classDays
                                        ?.map(day => persianDays[day])
                                        .join('، ')}
                                </span>
                                <span className="flex text-gray-500 text-[16px]">
                                    ساعت: از {e.startTime} تا {e.endTime}
                                </span>
                                <span className="flex text-gray-500 text-[16px]">
                                    مدت دوره: {e.durationValue} {e.durationUnit}
                                </span>
                                <span className="flex text-gray-500 text-[16px]">
                                    مربی دوره: {e.instructor}
                                </span>
                            </div>
                        )}
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label
                        htmlFor="cancel"
                        onChange={e => {
                            setCancelled(e.target.checked)
                        }}
                        className="flex w-fit items-center gap-2 flex-row-reverse justify-end cursor-pointer hover:text-textSecondary transition-all p-2">
                        <p>کنسل کردن دوره</p>
                        <input
                            type="checkbox"
                            id="cancel"
                            defaultChecked={cancelled || false}
                        />
                    </label>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="تاریخ شروع ثبت نام" />
                    <DatePicker
                        onChange={handleDateChange}
                        defaultValue={startDate}
                        round="thin"
                        position="left" // اگر نبود، حذف کن
                        className="!font-font !rounded-xl "
                        inputClass="w-full desktop:w-1/3 border border-textSecondary/40 py-3 rounded-sm"
                    />
                </div>
                <div className="w-fit flex flex-col gap-2">
                    <Tippy
                        asChild
                        visible={isConfirmingDelete ? true : undefined} // فقط در حالت true فعال می‌کنه
                        trigger={
                            isConfirmingDelete ? 'manual' : 'mouseenter focus'
                        } // در حالت false عادی باشه
                        onClickOutside={() => setIsConfirmingDelete(false)}
                        interactive={true}
                        placement="top"
                        theme="light-border"
                        className=""
                        arrow={false}
                        content={
                            isConfirmingDelete ? (
                                <div className="text-center p-2">
                                    <p className="text-sm mb-2">
                                        آیا مطمئن هستید؟
                                    </p>
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => {
                                                handleDelete()
                                            }}
                                            className="text-white bg-red-800 hover:bg-red-900 px-3 py-1 rounded text-sm">
                                            حذف
                                        </button>
                                        <button
                                            onClick={() =>
                                                setIsConfirmingDelete(false)
                                            }
                                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
                                            لغو
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                'حذف کاربر از دوره'
                            )
                        }>
                        <div
                            onClick={() => {
                                setIsConfirmingDelete(true)
                            }}
                            className="group p-1 cursor-pointer">
                            <div className="px-4 py-2 flex items-center group gap-3 flex-row-reverse text-error border border-error rounded-md hover:bg-error hover:text-bgPrimary transition-all">
                                <p>حذف کاربر از این دوره</p>
                                <Icons
                                    name="trash"
                                    className="text-[20px] text-error group-hover:font-black group-hover:text-bgPrimary"
                                />
                            </div>
                        </div>
                    </Tippy>
                </div>
                <div className="w-full flex items-center justify-center">
                    <div className="w-[98%]">
                        <PrimaryButton loading={loading} className="">
                            اعمال تغییرات
                        </PrimaryButton>
                    </div>
                </div>
            </form>
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
