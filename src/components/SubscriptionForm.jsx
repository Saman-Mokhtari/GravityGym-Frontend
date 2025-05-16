import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/user'
import ErrorLabel from '@/components/ErrorLabel'
import TimePicker from '@/components/TimePicker'

export default function SubscriptionForm({
    index,
    subscriptions,
    setSubscriptions,
    errors,
}) {
    const [price, setPrice] = useState('')
    const [instructors, setInstructors] = useState(null)
    const { users } = useUser()

    const getError = field => errors?.[`subscriptions.${index}.${field}`]

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

    const handleRemoveSub = indexToRemove => {
        setSubscriptions(prev => prev.filter((_, i) => i !== indexToRemove))
    }

    const handleChange = (field, value) => {
        subscriptions[index][field] = value
    }

    const handlePriceChange = e => {
        const rawValue = e.target.value.replace(/,/g, '').replace(/\D/g, '')
        handleChange('price', rawValue)
        const formatted = formatPrice(e.target.value)
        setPrice(formatted)
    }

    useEffect(() => {
        if (users) {
            const fetchedInstructors = users.filter(
                user => user?.role === 'instructor',
            )
            setInstructors(fetchedInstructors)
        }
    }, [users])

    return (
        <div className="flex flex-col w-full gap-4 border border-border rounded-md p-2">
            <div className="w-full flex flex-col gap-2">
                <FormLabel text="نام اشتراک" />
                <input
                    type="text"
                    className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${getError('name') && 'border-error text-error placeholder-error'}`}
                    onChange={e => handleChange('name', e.target.value)}
                />
                {getError('name') && <ErrorLabel text={getError('name')} />}
            </div>

            <div className="w-full flex flex-col gap-2">
                <FormLabel text="مربی دوره" />
                <Select
                    className="w-full"
                    isClearable
                    placeholder="انتخاب مربی"
                    menuPlacement="top"
                    onChange={selected =>
                        handleChange('instructor_id', selected?.value)
                    }
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
                            border: `1px solid ${getError('instructor_id') ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                            boxShadow: 'none',
                        }),
                    }}
                />
                {getError('instructor_id') && (
                    <ErrorLabel text={getError('instructor_id')} />
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
                        handleChange('class_days', selectedValues)
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
                            border: `1px solid ${getError('class_days') ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                            boxShadow: 'none',
                        }),
                    }}
                />
                {getError('class_days') && (
                    <ErrorLabel text={getError('class_days')} />
                )}
            </div>

            <div className="w-full flex flex-col gap-2">
                <FormLabel text="ساعت شروع کلاس" />

                <TimePicker
                    onChange={value => {
                        handleChange('start_time', value)
                    }}
                />
                {getError('start_time') && (
                    <ErrorLabel text={getError('start_time')} />
                )}
            </div>

            <div className="w-full flex flex-col gap-2">
                <FormLabel text="ساعت پایان کلاس" />
                {/*<TimePicker*/}
                {/*    onChange={handleEndTimeChange}*/}
                {/*    round="thin"*/}
                {/*    position="center"*/}
                {/*    className="!font-font !rounded-md !w-full"*/}
                {/*    inputClass={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] placeholder:text-textSecondary focus:outline-none focus:ring-1 ${getError('end_time') ? 'border-error text-error ring-error' : 'focus:ring-textPrimary'}`}*/}
                {/*/>*/}
                <TimePicker
                    onChange={value => {
                        handleChange('end_time', value)
                    }}
                />
                {getError('end_time') && (
                    <ErrorLabel text={getError('end_time')} />
                )}
            </div>

            <div className="w-full flex flex-col gap-2">
                <FormLabel text="تعداد جلسات" />
                <input
                    type="number"
                    onWheel={e => e.target.blur()}
                    className={`w-1/2 border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${getError('session_count') && 'border-error text-error placeholder-error'}`}
                    onChange={e =>
                        handleChange('session_count', e.target.value)
                    }
                />
                {getError('session_count') && (
                    <ErrorLabel text={getError('session_count')} />
                )}
            </div>

            <div className="w-full flex flex-col gap-2">
                <FormLabel text="نوع کلاس" />
                <Select
                    className="w-full"
                    isClearable
                    placeholder="انتخاب نوع کلاس"
                    menuPlacement="top"
                    onChange={selected =>
                        handleChange('class_types', selected?.value)
                    }
                    options={classTypeOptions}
                    styles={{
                        control: base => ({
                            ...base,
                            minHeight: '56px',
                            padding: '0.5rem',
                            fontSize: '18px',
                            backgroundColor: 'rgb(var(--color-bg-input))',
                            borderRadius: '0.375rem',
                            border: `1px solid ${getError('class_types') ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                            boxShadow: 'none',
                        }),
                    }}
                />
                {getError('class_types') && (
                    <ErrorLabel text={getError('class_types')} />
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
                            handleChange('duration_value', selected?.value)
                        }
                        options={duration_value}
                        styles={{
                            control: base => ({
                                ...base,
                                minHeight: '56px',
                                padding: '0.5rem',
                                fontSize: '18px',
                                backgroundColor: 'rgb(var(--color-bg-input))',
                                borderRadius: '0.375rem',
                                border: `1px solid ${getError('duration_value') ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
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
                            handleChange('duration_unit', selected?.value)
                        }
                        options={duration_unit}
                        styles={{
                            control: base => ({
                                ...base,
                                minHeight: '56px',
                                padding: '0.5rem',
                                fontSize: '18px',
                                backgroundColor: 'rgb(var(--color-bg-input))',
                                borderRadius: '0.375rem',
                                border: `1px solid ${getError('duration_unit') ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                                boxShadow: 'none',
                            }),
                        }}
                    />
                </div>
                {(getError('duration_value') || getError('duration_unit')) && (
                    <ErrorLabel
                        text={
                            getError('duration_value') ||
                            getError('duration_unit')
                        }
                    />
                )}
            </div>

            <div className="w-full flex flex-col gap-2">
                <FormLabel text="وضعیت اشتراک" />
                <Select
                    className="w-full"
                    isClearable
                    placeholder="انتخاب وضعیت"
                    menuPlacement="top"
                    onChange={selected =>
                        handleChange('status', selected?.value)
                    }
                    options={subscription_status}
                    styles={{
                        control: base => ({
                            ...base,
                            minHeight: '56px',
                            padding: '0.5rem',
                            fontSize: '18px',
                            backgroundColor: 'rgb(var(--color-bg-input))',
                            borderRadius: '0.375rem',
                            border: `1px solid ${getError('status') ? 'rgb(var(--color-error))' : 'rgb(var(--color-text-primary))'}`,
                            boxShadow: 'none',
                        }),
                    }}
                />
                {getError('status') && <ErrorLabel text={getError('status')} />}
            </div>

            <div className="w-full flex flex-col gap-2">
                <FormLabel text="قیمت اشتراک" />
                <div className="w-full flex items-center relative">
                    <input
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        className={`w-full pr-16 border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${getError('price') && 'border-error text-error placeholder-error'}`}
                        placeholder="مثال: 1,000,000"
                    />
                    <h2 className="text-[18px] pl-2 border-l border-textSecondary flex gap-2  absolute right-3 top-1/2 -translate-y-1/2">
                        <p>تومانءء</p>
                    </h2>
                </div>
                {getError('price') && <ErrorLabel text={getError('price')} />}
            </div>

            <div className="w-full flex items-center justify-end">
                <div
                    onClick={() => handleRemoveSub(index)}
                    className="flex group items-center gap-2 text-error p-2 cursor-pointer hover:scale-105 transition-all">
                    <Icons
                        name="trash"
                        className="text-[18px] group-hover:font-bold"
                    />
                    <p className="">حذف کردن اشتراک</p>
                </div>
            </div>
        </div>
    )
}
