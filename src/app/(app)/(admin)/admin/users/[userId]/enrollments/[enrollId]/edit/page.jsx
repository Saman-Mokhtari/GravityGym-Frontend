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

export default function Edit() {
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isClearable, setIsClearable] = useState(false)
    const [isSearchable, setIsSearchable] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isRtl, setIsRtl] = useState(true)
    const [enrollment, setEnrollment] = useState(null)
    const params = useParams()
    const { enrollment: fetchErnolllment, update } = useEnrollments()
    const { active } = useSubscription()
    const { instructors } = useUser()
    const [filteredInstructors, setFilteredInstructors] = useState(null)
    const [selectedSub, setSelectedSub] = useState(null)
    const [selectedInstructor, setSelectedInstructor] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [status, setStatus] = useState(null)
    const { persianDays, persianStatuses } = useTranslator()
    const [isSucceeded, setIsSucceeded] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (instructors && selectedSub) {
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
            if (enrollment?.status) {
                setStatus({
                    value: enrollment?.status,
                    label: persianStatuses[enrollment?.status],
                })
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
        className: sub?.class?.name,
        classDays: sub?.class_days,
        startTime: sub?.start_time,
        durationValue: sub?.duration_value,
        durationUnit: sub?.duration_unit,
        instructor: sub?.instructor,
        endTime: sub?.end_time,
    }))

    const statuses = [
        {
            value: 'expired',
            label: 'منقضی شده',
        },
        {
            value: 'reserved',
            label: 'رزرو',
        },
        {
            value: 'active',
            label: 'فعال',
        },
        {
            value: 'cancelled',
            label: 'کنسل شده',
        },
    ]
    const notifySuccess = () =>
        toast.success('کاربر ویرایش گردید', { duration: 2000 })
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
                status: status?.value,
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
                        isSearchable={isSearchable}
                        name="color"
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
                        }}
                        getOptionLabel={e => (
                            <div className="flex flex-col w-full gap-1 p-2 font-font">
                                <span className="flex font-medium font-font">
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
                                    مدت دوره: {e.durationValue}{' '}
                                    {e.durationUnit}{' '}
                                </span>
                                <span className="flex text-gray-500 text-[16px]">
                                    مربی دوره: {e.instructor}{' '}
                                </span>
                            </div>
                        )}
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="تاریخ شروع ثبت نام" />
                    <DatePicker
                        onChange={handleDateChange}
                        defaultValue={startDate}
                        round="thin"
                        position="center"
                        className="!font-font !rounded-xl"
                        inputClass="w-full desktop:w-1/3 border border-textSecondary/40 py-3 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="وضعیت دوره" />
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        value={status}
                        onChange={setStatus}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isRtl={isRtl}
                        isSearchable={isSearchable}
                        name="color"
                        options={statuses}
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
                            control: base => ({
                                ...base,
                                paddingTop: '0.45rem',
                                paddingBottom: '0.45rem',
                            }),
                        }}
                    />
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
