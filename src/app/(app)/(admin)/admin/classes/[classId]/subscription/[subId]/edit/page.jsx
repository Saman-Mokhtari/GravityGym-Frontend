'use client'

import FormLabel from '@/components/FormLabel'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/user'
import TimePicker from '@/components/TimePicker'
import ErrorLabel from '@/components/ErrorLabel'
import PrimaryButton from '@/components/PrimaryButton'
import { useSubscription } from '@/hooks/subscription'
import { useParams, useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'
import { parseStaticPathsResult } from 'next/dist/lib/fallback'
import { useTranslator } from '@/hooks/translator'

export default function Main() {
    const [errors, setErrors] = useState(null)
    const [price, setPrice] = useState('')
    const [subName, setSubName] = useState(null)
    const [instructor, setInstructor] = useState(null)
    const [classDays, setClassDays] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [sessionCount, setSessionCount] = useState(null)
    const [classType, setClassType] = useState(null)
    const [durationUnit, setDurationUnit] = useState(null)
    const [durationValue, setDurationValue] = useState(null)
    const [subStatus, setSubStatus] = useState(null)
    const [subPrice, setSubPrice] = useState(null)
    const [instructors, setInstructors] = useState(null)
    const [selectedSub, setSelectedSub] = useState(null)
    const { users } = useUser()
    const { subscription, loading, update } = useSubscription()
    const params = useParams()
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const { subscriptionStatus } = useTranslator()
    const [defaultStartTime, setDefaultStartTime] = useState(null)
    const [defaultEndTime, setDefaultEndTime] = useState(null)
    const classDayOptions = [...Array(7).keys()].map(i => ({
        value: i,
        label: [
            'یکشنبه',
            'دوشنبه',
            'سه‌شنبه',
            'چهارشنبه',
            'پنجشنبه',
            'جمعه',
            'شنبه',
        ][i],
    }))
    const classTypeOptions = ['گروهی', 'نیمه‌خصوصی', 'خصوصی', 'آنلاین'].map(
        type => ({
            value: type,
            label: type,
        }),
    )
    const duration_value = Array.from({ length: 31 }, (_, i) => ({
        value: i + 1,
        label: i + 1,
    }))
    const duration_unit = ['روز', 'ماه', 'سال', 'ساعت'].map(unit => ({
        value: unit,
        label: unit,
    }))
    const subscription_status = [
        { value: 1, label: 'فعال' },
        { value: 0, label: 'غیرفعال' },
    ]

    const formatPrice = value => {
        const numeric = value.replace(/,/g, '').replace(/\D/g, '')
        if (!numeric) return ''
        return parseInt(numeric).toLocaleString('en-US')
    }

    const handlePriceChange = e => {
        const rawValue = e.target.value.replace(/,/g, '').replace(/\D/g, '')
        setSubPrice(rawValue)
        setPrice(formatPrice(e.target.value))
    }

    useEffect(() => {
        if (users) {
            const fetchedInstructors = users.filter(
                user => user?.role === 'instructor',
            )
            setInstructors(fetchedInstructors)
        }
    }, [users])

    useEffect(() => {
        if (selectedSub) {
            setSubName(selectedSub?.sub_name || '')
            setInstructor(
                users.find(user => user?.name === selectedSub?.instructor)
                    ?.id || null,
            )
            setStartTime(selectedSub?.start_time)
            setEndTime(selectedSub?.end_time)
            setClassDays(selectedSub?.class_days || [])
            setSessionCount(selectedSub?.session_count || '')
            setClassType(selectedSub?.class_type || '')
            setDurationValue(selectedSub?.duration_value || null)
            setDurationUnit(selectedSub?.duration_unit || '')
            setSubStatus(selectedSub?.is_active)
            setSubPrice(selectedSub?.price * 1000000)
            setPrice(formatPrice(String((selectedSub.price || 0) * 1000000)))
        }
        if (!selectedSub) {
            const fetchSub = async () => {
                const sub_id = params?.subId
                try {
                    await subscription({
                        setErrors,
                        setSelectedSub,
                        sub_id,
                    })
                } catch (e) {
                    setErrors(prev => [...prev, e])
                }
            }
            fetchSub()
        }
    }, [selectedSub])
    const subCreated = () => {
        toast.success('اشتراک با موفقیت ویرایش  شد.', { duration: 2000 })
    }

    useEffect(() => {
        if (success) {
            subCreated()
            const timeout = setTimeout(() => {
                router.replace(`/admin/classes/${params?.classId}`)
            }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [success])

    const handleUpdateSub = e => {
        e.preventDefault()
        const updateSub = async () => {
            const sub_id = params?.subId
            const class_id = params?.classId

            await update({
                setErrors,
                sub_id,
                setSuccess,
                class_id,
                subscription_name: subName,
                instructor,
                class_days: classDays,
                start_time: startTime,
                end_time: endTime,
                class_type: classType,
                session_count: sessionCount,
                duration_value: durationValue,
                duration_unit: durationUnit,
                subscription_status: subStatus,
                price: subPrice,
            })
        }
        updateSub()
    }

    if (!startTime && !endTime) return <h2>loading</h2>

    return (
        <form onSubmit={handleUpdateSub} className="w-full flex flex-col">
            <Toaster />
            <div className="flex flex-col w-full gap-4 rounded-md p-2">
                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="نام اشتراک" />
                    <input
                        value={subName}
                        type="text"
                        className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors?.subscription_name && 'border-error text-error placeholder-error'}`}
                        onChange={e => setSubName(e.target.value)}
                    />
                    {errors?.subscription_name && (
                        <ErrorLabel text={errors.subscription_name} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="مربی دوره" />
                    <Select
                        className="w-full"
                        isClearable
                        placeholder="انتخاب مربی"
                        defaultValue={
                            instructor
                                ? {
                                      value: instructor,
                                      label:
                                          users?.find(
                                              user => user?.id === instructor,
                                          )?.name || '',
                                  }
                                : null
                        }
                        menuPlacement="bottom"
                        onChange={selected => {
                            setInstructor(selected?.value)
                        }}
                        options={instructors?.map(instructor => ({
                            value: instructor?.id,
                            label: instructor?.name,
                        }))}
                        styles={{
                            control: base => ({
                                ...base,
                                minHeight: '56px',
                                padding: '0.5rem',
                                fontSize: '18px',
                                backgroundColor: 'rgb(var(--color-bg-input))',
                                borderRadius: '0.375rem',
                                border: `1px solid ${errors?.instructor ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                                boxShadow: 'none',
                            }),
                        }}
                    />
                    {errors?.instructor && (
                        <ErrorLabel text={errors.instructor} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="روزهای کلاس" />
                    <Select
                        isMulti
                        className="w-full"
                        isClearable
                        value={classDayOptions.filter(option =>
                            classDays?.includes(option.value),
                        )}
                        placeholder="انتخاب روز"
                        onChange={selected => {
                            const selectedValues =
                                selected?.map(item => item.value) || []
                            setClassDays(selectedValues)
                        }}
                        options={classDayOptions}
                        styles={{
                            control: base => ({
                                ...base,
                                minHeight: '56px',
                                padding: '0.5rem',
                                fontSize: '18px',
                                backgroundColor: 'rgb(var(--color-bg-input))',
                                borderRadius: '0.375rem',
                                border: `1px solid ${errors?.class_days ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                                boxShadow: 'none',
                            }),
                        }}
                    />
                    {errors?.class_days && (
                        <ErrorLabel text={errors.class_days} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="ساعت شروع کلاس" />
                    <TimePicker
                        onChange={value => setStartTime(value)}
                        defaultValue={startTime}
                    />
                    {errors?.start_time && (
                        <ErrorLabel text={errors.start_time} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="ساعت پایان کلاس" />

                    <TimePicker
                        onChange={value => setEndTime(value)}
                        defaultValue={endTime}
                    />
                    {errors?.end_time && <ErrorLabel text={errors.end_time} />}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="تعداد جلسات" />
                    <input
                        type="number"
                        value={sessionCount}
                        className={`w-1/2 border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors?.session_count && 'border-error text-error placeholder-error'}`}
                        onChange={e => setSessionCount(e.target.value)}
                    />
                    {errors?.session_count && (
                        <ErrorLabel text={errors.session_count} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="نوع کلاس" />
                    <Select
                        className="w-full"
                        isClearable
                        placeholder="انتخاب نوع کلاس"
                        menuPlacement="top"
                        defaultValue={{ value: classType, label: classType }}
                        onChange={selected => setClassType(selected?.value)}
                        options={classTypeOptions}
                        styles={{
                            control: base => ({
                                ...base,
                                minHeight: '56px',
                                padding: '0.5rem',
                                fontSize: '18px',
                                backgroundColor: 'rgb(var(--color-bg-input))',
                                borderRadius: '0.375rem',
                                border: `1px solid ${errors?.class_type ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                                boxShadow: 'none',
                            }),
                        }}
                    />
                    {errors?.class_type && (
                        <ErrorLabel text={errors.class_type} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="مدت دوره" />
                    <div className="w-full flex items-center gap-2">
                        <Select
                            className="w-1/2"
                            isClearable
                            placeholder="مقدار"
                            defaultValue={{
                                value: durationValue,
                                label: durationValue,
                            }}
                            menuPlacement="top"
                            onChange={selected =>
                                setDurationValue(selected?.value)
                            }
                            options={duration_value}
                            styles={{
                                control: base => ({
                                    ...base,
                                    minHeight: '56px',
                                    padding: '0.5rem',
                                    fontSize: '18px',
                                    backgroundColor:
                                        'rgb(var(--color-bg-input))',
                                    borderRadius: '0.375rem',
                                    border: `1px solid ${errors?.duration_value ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                                    boxShadow: 'none',
                                }),
                            }}
                        />
                        <Select
                            className="w-1/2"
                            isClearable
                            placeholder="واحد"
                            defaultValue={{
                                value: durationUnit,
                                label: durationUnit,
                            }}
                            menuPlacement="top"
                            onChange={selected =>
                                setDurationUnit(selected?.value)
                            }
                            options={duration_unit}
                            styles={{
                                control: base => ({
                                    ...base,
                                    minHeight: '56px',
                                    padding: '0.5rem',
                                    fontSize: '18px',
                                    backgroundColor:
                                        'rgb(var(--color-bg-input))',
                                    borderRadius: '0.375rem',
                                    border: `1px solid ${errors?.duration_unit ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                                    boxShadow: 'none',
                                }),
                            }}
                        />
                    </div>
                    {errors?.duration_value && (
                        <ErrorLabel text={errors.duration_value} />
                    )}
                    {errors?.duration_unit && (
                        <ErrorLabel text={errors.duration_unit} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="وضعیت اشتراک" />
                    <Select
                        className="w-full"
                        isClearable
                        placeholder="انتخاب وضعیت"
                        menuPlacement="top"
                        defaultValue={{
                            value: subStatus,
                            label: subscriptionStatus[subStatus],
                        }}
                        onChange={selected => setSubStatus(selected?.value)}
                        options={subscription_status}
                        styles={{
                            control: base => ({
                                ...base,
                                minHeight: '56px',
                                padding: '0.5rem',
                                fontSize: '18px',
                                backgroundColor: 'rgb(var(--color-bg-input))',
                                borderRadius: '0.375rem',
                                border: `1px solid ${errors?.subscription_status ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                                boxShadow: 'none',
                            }),
                        }}
                    />
                    {errors?.subscription_status && (
                        <ErrorLabel text={errors.subscription_status} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="قیمت اشتراک" />
                    <div className="w-full flex items-center relative">
                        <input
                            type="text"
                            value={price}
                            onChange={handlePriceChange}
                            className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors?.price && 'border-error text-error placeholder-error'}`}
                        />
                        <h2 className="text-[18px] absolute left-3 top-1/2 -translate-y-1/2">
                            تومان
                        </h2>
                    </div>
                    {errors?.price && <ErrorLabel text={errors.price} />}
                </div>
            </div>
            <PrimaryButton loading={loading}>ایجاد اشتراک</PrimaryButton>
        </form>
    )
}
