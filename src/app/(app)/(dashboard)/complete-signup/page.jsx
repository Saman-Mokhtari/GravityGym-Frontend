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
import CreatableSelect from 'react-select/creatable'
import Link from 'next/link'

export default function CompleteSignup() {
    const router = useRouter()
    const [birthDate, setBirthDate] = useState('')
    const [fullName, setFullName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [nationalId, setNationalId] = useState('')
    const [errors, setErrors] = useState(false)
    const [hasInsurance, setHasInsurance] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [informationSuccess, setInformationSuccess] = useState(false)
    const [disabilities, setDisabilities] = useState(null)
    const [noDisability, setNoDisability] = useState(false)

    const disabilitiesOptions = [
        { value: 'دیابت', label: 'دیابت' },
        { value: 'فشار خون بالا', label: 'فشار خون بالا' },
        {
            value: 'کم‌کاری یا پرکاری تیروئید',
            label: 'کم‌کاری یا پرکاری تیروئید',
        },
        { value: 'اختلالات هورمونی', label: 'اختلالات هورمونی' },
        {
            value: 'نارسایی کلیه یا مشکلات کلیوی',
            label: 'نارسایی کلیه یا مشکلات کلیوی',
        },
        { value: 'آلرژی یا حساسیت شدید', label: 'آلرژی یا حساسیت شدید' },
        {
            value: 'مشکلات کبدی یا نارسایی کبد',
            label: 'مشکلات کبدی یا نارسایی کبد',
        },
        { value: 'هپاتیت B یا C', label: 'هپاتیت B یا C' },
        {
            value: 'وجود ایمپلنت یا صفحات فلزی در بدن',
            label: 'وجود ایمپلنت یا صفحات فلزی در بدن',
        },
        { value: 'اچ‌آی‌وی (HIV)', label: 'اچ‌آی‌وی (HIV)' },
        { value: 'سابقه جراحی مهم', label: 'سابقه جراحی مهم' },
        { value: 'مشکلات تنفسی یا آسم', label: 'مشکلات تنفسی یا آسم' },
        { value: 'بیماری قلبی یا عروقی', label: 'بیماری قلبی یا عروقی' },
        { value: 'سابقه سکته قلبی یا مغزی', label: 'سابقه سکته قلبی یا مغزی' },
        { value: 'مصرف داروهای خاص', label: 'مصرف داروهای خاص' },
        {
            value: 'مشکلات ارتوپدی (مفاصل، استخوان‌ها، ستون فقرات)',
            label: 'مشکلات ارتوپدی (مفاصل، استخوان‌ها، ستون فقرات)',
        },
    ]

    const { completeSignup, loading } = useAuth()

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
                national_id: nationalId,
                insurance: hasInsurance,
                weight: weight,
                height: height,
                disabilities: disabilities,
                terms: termsAccepted,
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
                        <FormLabel text="شماره ملی" error={errors.national_id}>
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <input
                            type="text"
                            className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors.national_id && 'border border-error text-error placeholder-error'}`}
                            onChange={e => {
                                setNationalId(e.target.value)
                            }}
                        />
                        {errors.national_id && (
                            <ErrorLabel text={errors.national_id} />
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel
                            text="بیماری‌ها یا شرایط خاص"
                            error={errors.disabilities}>
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <CreatableSelect
                            isMulti
                            name="disabilitiesOptions"
                            options={disabilitiesOptions}
                            closeMenuOnSelect={false}
                            isDisabled={noDisability}
                            value={disabilities}
                            placeholder="انتخاب کنید"
                            formatCreateLabel={inputValue =>
                                `افزودن بیماری خاص به لیست "${inputValue}"`
                            }
                            onChange={selectedOption =>
                                setDisabilities(selectedOption)
                            }
                            onCreateOption={inputValue => {
                                const newOption = {
                                    value: inputValue,
                                    label: inputValue,
                                }
                                setDisabilities(prev => [
                                    ...(prev || []),
                                    newOption,
                                ])
                            }}
                            className={`w-full ${noDisability && '!cursor-not-allowed'}`}
                            classNamePrefix="react-select"
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    backgroundColor: `rgb(var(--color-bg-input))`,
                                    color: `rgb(var(--color-text-primary))`,
                                    fontSize: '18px',
                                    borderRadius: '0.375rem',
                                    border: `1px solid ${state.isFocused ? 'rgb(var(--color-text-primary))' : 'rgb(var(--color-text-primary))'}`,
                                    boxShadow: 'none',
                                    outline: 'none', // ✅ این خط رو اضافه کن
                                    padding: '0.5rem',
                                    '&:hover': {
                                        borderColor:
                                            'rgb(var(--color-text-secondary))',
                                    },
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused
                                        ? 'rgba(var(--color-text-secondary), 0.2)'
                                        : 'transparent',
                                    color: 'rgb(var(--color-text-primary))',
                                    '&:active': {
                                        backgroundColor:
                                            'rgba(var(--color-text-secondary), 0.3)',
                                    },
                                }),
                                multiValue: base => ({
                                    ...base,
                                    backgroundColor:
                                        'rgba(var(--color-text-secondary), 0.15)',
                                }),
                                multiValueLabel: base => ({
                                    ...base,
                                    color: 'rgb(var(--color-text-primary))',
                                }),
                                multiValueRemove: base => ({
                                    ...base,
                                    color: 'rgb(var(--color-text-secondary))',
                                    ':hover': {
                                        backgroundColor:
                                            'rgba(var(--color-error), 0.15)',
                                        color: 'rgb(var(--color-error))',
                                    },
                                }),
                                placeholder: base => ({
                                    ...base,
                                    color: 'rgb(var(--color-text-secondary))',
                                }),
                                singleValue: base => ({
                                    ...base,
                                    color: 'rgb(var(--color-text-primary))',
                                }),
                                input: base => ({
                                    ...base,
                                    color: 'rgb(var(--color-text-primary))',
                                }),
                                menu: base => ({
                                    ...base,
                                    backgroundColor:
                                        'rgb(var(--color-bg-primary))',
                                    zIndex: 9999,
                                }),
                            }}
                        />

                        <div className="flex items-center gap-2 flex-row-reverse justify-end">
                            <FormLabel text="مشکل خاصی ندارم" />
                            <input
                                type="checkbox"
                                className="cursor-pointer"
                                onChange={e => {
                                    const isChecked = e.target.checked
                                    setNoDisability(isChecked)
                                    if (isChecked) {
                                        setDisabilities([
                                            {
                                                value: 'بدون مشکل خاص',
                                                label: 'بدون مشکل خاص',
                                            },
                                        ])
                                    } else {
                                        setDisabilities(null) // یا []، بستگی به اعتبارسنجی سمت سرور
                                    }
                                }}
                            />
                        </div>
                        {errors.disabilities && (
                            <ErrorLabel text={errors.disabilities} />
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel
                            text="دارای بیمه‌نامه ورزشی هستید؟"
                            error={errors.insurance}>
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <select
                            className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors.insurance && 'border border-error text-error placeholder-error'}`}
                            defaultValue=""
                            onChange={e => setHasInsurance(e.target.value)}>
                            <option value="">انتخاب کنید</option>
                            <option value="yes">بله</option>
                            <option value="no">خیر</option>
                        </select>
                        {errors.insurance && (
                            <ErrorLabel text={errors.insurance} />
                        )}
                    </div>
                    <div className="w-full flex items-center justify-between gap-3">
                        <div className="flex flex-col gap-2">
                            <FormLabel text="قد" error={errors.height}>
                                <Icons
                                    name="important"
                                    className="text-[8px] text-error absolute top-1 -left-2"
                                />
                            </FormLabel>
                            <input
                                type="text"
                                className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors.height && 'border border-error text-error placeholder-error'}`}
                                onChange={e => {
                                    setHeight(e.target.value)
                                }}
                            />
                            {errors.height && (
                                <ErrorLabel text={errors.height} />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormLabel text="وزن" error={errors.weight}>
                                <Icons
                                    name="important"
                                    className="text-[8px] text-error absolute top-1 -left-2"
                                />
                            </FormLabel>
                            <input
                                type="text"
                                className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors.weight && 'border border-error text-error placeholder-error'}`}
                                onChange={e => {
                                    setWeight(e.target.value)
                                }}
                            />
                            {errors.weight && (
                                <ErrorLabel text={errors.weight} />
                            )}
                        </div>
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
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            onChange={e => setTermsAccepted(e.target.checked)}
                        />
                        <div className="flex items-center gap-1">
                            <Link
                                href="/files/Terms.pdf"
                                target="_blank"
                                className="text-blue-600 underline">
                                شرایط و ضوابط باشگاه
                            </Link>
                            <p>را می‌پذیرم.</p>
                        </div>
                    </div>
                    <PrimaryButton
                        loading={loading}
                        className=""
                        disabled={!termsAccepted}>
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
