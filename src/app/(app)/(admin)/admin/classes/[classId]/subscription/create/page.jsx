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
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { useClass } from '@/hooks/class'

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
    const { users } = useUser()
    const { loading, create } = useSubscription()
    const params = useParams()
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const { gymClass } = useClass()
    const { data: fetchedClass } = gymClass(params?.classId)
    const { setTitle } = useNavigationTitle()
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

    useEffect(() => {
        setTitle(`ایجاد اشتراک جدید - کلاس ${fetchedClass?.name}`)
    }, [])

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
    const subCreated = () => {
        toast.success('اشتراک با موفقیت ایجاد شد.', { duration: 2000 })
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

    const handleCreateSub = e => {
        e.preventDefault()
        const createNewSub = async () => {
            const class_id = params?.classId
            await create({
                setErrors,
                class_id,
                setSuccess,
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
        createNewSub()
    }

    return (
        <form onSubmit={handleCreateSub} className="w-full flex flex-col">
            <Toaster />
            <div className="flex flex-col w-full gap-4 rounded-md p-2">
                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="نام اشتراک" />
                    <input
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
                        menuPlacement="bottom"
                        onChange={selected => setInstructor(selected?.value)}
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
                        closeMenuOnSelect={false}
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
                    <TimePicker onChange={value => setStartTime(value)} />
                    {errors?.start_time && (
                        <ErrorLabel text={errors.start_time} />
                    )}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="ساعت پایان کلاس" />
                    <TimePicker onChange={value => setEndTime(value)} />
                    {errors?.end_time && <ErrorLabel text={errors.end_time} />}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="تعداد جلسات" />
                    <input
                        type="number"
                        onWheel={e => e.target.blur()}
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
                        isSearchable={false}
                        placeholder="انتخاب وضعیت"
                        menuPlacement="top"
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
                            className={`w-full pr-16 border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors?.price && 'border-error text-error placeholder-error'}`}
                            placeholder="مثال: 1,000,000"
                        />
                        <h2 className="text-[18px] pl-2 border-l border-textSecondary flex gap-2  absolute right-3 top-1/2 -translate-y-1/2">
                            <p>تومانءء</p>
                        </h2>
                    </div>
                    {errors?.price && <ErrorLabel text={errors.price} />}
                </div>
            </div>
            <PrimaryButton loading={loading}>ایجاد اشتراک</PrimaryButton>
        </form>
    )
}
