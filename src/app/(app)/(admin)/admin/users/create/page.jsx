'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import ErrorLabel from '@/components/ErrorLabel'
import CreatableSelect from 'react-select/creatable'
import PrimaryButton from '@/components/PrimaryButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/user'
import { DatePicker } from 'zaman'
import { toast, Toaster } from 'react-hot-toast'
import Select from 'react-select'
import { useNavigationTitle } from '@/context/NavigationTitleContext'

export default function Main() {
    const router = useRouter()
    const [birthDate, setBirthDate] = useState('')
    const [fullName, setFullName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [nationalId, setNationalId] = useState('')
    const [errors, setErrors] = useState(false)
    const [hasInsurance, setHasInsurance] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(false)
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [termsAccepted] = useState(false)
    const [disabilities, setDisabilities] = useState(null)
    const [noDisability, setNoDisability] = useState(false)
    const [successful, setSuccessful] = useState(false)
    const [role, setRole] = useState('athlete')
    const { setTitle } = useNavigationTitle()
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
    const { create, loading } = useUser()
    const roleOptions = [
        {
            value: 'athlete',
            label: 'ورزشکار',
        },
        {
            value: 'instructor',
            label: 'مربی',
        },
        {
            value: 'admin',
            label: 'ادمین',
        },
        {
            value: 'superUser',
            label: 'سوپر ادمین',
        },
    ]
    useEffect(() => {
        setTitle('افزودن عضو جدید')
    }, [])

    const submitForm = async e => {
        e.preventDefault()
        try {
            await create({
                fullName: fullName,
                gender: gender,
                birthDate: birthDate,
                role: role,
                phone_number: phoneNumber,
                email: email,
                national_id: nationalId,
                insurance: hasInsurance,
                weight: weight,
                height: height,
                disabilities: disabilities,
                terms: termsAccepted,
                setErrors,
                setSuccessful,
            })
        } catch (error) {
            setErrors(prevErrors => ({
                ...prevErrors,
            }))
        }
    }

    useEffect(() => {
        if (successful) {
            notify()
            const timeout = setTimeout(() => {
                router.replace('/admin/users')
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [successful])

    const handleDateChange = value => {
        const date = new Date(value.value)

        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const dd = String(date.getDate()).padStart(2, '0')

        const formatted = `${yyyy}-${mm}-${dd}`

        setBirthDate(formatted)
    }
    const notify = () =>
        toast.success('کاربر با موفقیت ایجاد شد!', { duration: 3000 })

    return (
        <div className="w-full flex flex-col gap-6">
            <Toaster />
            <h2 className="text-[25px] font-bold hidden desktop:flex">
                ایجاد کاربر جدید
            </h2>
            <FormLabel text="اطلاعات کاربر جدید را وارد کنید." />

            <form onSubmit={submitForm} className="w-full flex flex-col gap-8">
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
                    {errors.fullName && <ErrorLabel text={errors.fullName} />}
                </div>
                <div className="flex flex-col gap-2">
                    <FormLabel text="شماره تلفن" error={errors.phoneNumber}>
                        <Icons
                            name="important"
                            className="text-[8px] text-error absolute top-1 -left-2"
                        />
                    </FormLabel>
                    <input
                        type="text"
                        onWheel={e => e.target.blur()}
                        className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors.phone_number && 'border border-error text-error placeholder-error'}`}
                        onChange={e => {
                            setPhoneNumber(e.target.value)
                        }}
                    />
                    {errors.phone_number && (
                        <ErrorLabel text={errors.phone_number} />
                    )}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="رول کاربر">
                        <Icons
                            name="important"
                            className="text-[8px] text-error absolute top-1 -left-2"
                        />
                    </FormLabel>
                    <Select
                        className="w-full"
                        isClearable
                        defaultValue={{ value: 'athlete', label: 'ورزشکار' }}
                        placeholder="انتخاب رول"
                        menuPlacement="top"
                        options={roleOptions}
                        onChange={selected => {
                            setRole(selected?.value)
                        }}
                        styles={{
                            control: base => ({
                                ...base,
                                minHeight: '56px',
                                padding: '0.5rem',
                                fontSize: '18px',
                                backgroundColor: 'rgb(var(--color-bg-input))',
                                borderRadius: '0.375rem',
                                border: `1px solid `,
                                boxShadow: 'none',
                            }),
                        }}
                    />
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
                        onChange={handleDateChange}
                        position="center"
                        className={`!font-font !rounded-xl`}
                        inputClass={`w-full desktop:w-1/3  py-3 rounded-sm border py-4 !rounded-md bg-bgInput text-textPrimary text-[18px] ${errors.birthDate && 'border !border-error !text-error placeholder-error'}`}
                    />
                    {errors.birthDate && <ErrorLabel text={errors.birthDate} />}
                </div>
                <div className="flex flex-col gap-2">
                    <FormLabel text="شماره ملی" error={errors.national_id}>
                        <Icons
                            name="important"
                            className="text-[8px] text-error absolute top-1 -left-2"
                        />
                    </FormLabel>
                    <input
                        type="number"
                        onWheel={e => e.target.blur()}
                        className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors.national_id && 'border border-error text-error placeholder-error'}`}
                        onChange={e => {
                            const onlyDigits = e.target.value.replace(/\D/g, '') // حذف حروف غیراعدادی
                            if (onlyDigits.length <= 10) {
                                setNationalId(onlyDigits)
                            }
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
                                outline: 'none',
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
                                backgroundColor: 'rgb(var(--color-bg-primary))',
                                zIndex: 9999,
                            }),
                        }}
                    />

                    <div className="flex items-center gap-2 flex-row-reverse justify-end">
                        <FormLabel text="فاقد مشکل خاص" />
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
                                    setDisabilities(null)
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
                    {errors.insurance && <ErrorLabel text={errors.insurance} />}
                </div>
                <div className="w-full flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-2">
                        <FormLabel text="قد (سانتی‌متر)" error={errors.height}>
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <input
                            type="number"
                            onWheel={e => e.target.blur()}
                            className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors.height && 'border border-error text-error placeholder-error'}`}
                            onChange={e => {
                                setHeight(e.target.value)
                            }}
                        />
                        {errors.height && <ErrorLabel text={errors.height} />}
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel text="وزن (کیلوگرم)" error={errors.weight}>
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <input
                            type="number"
                            onWheel={e => e.target.blur()}
                            className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors.weight && 'border border-error text-error placeholder-error'}`}
                            onChange={e => {
                                setWeight(e.target.value)
                            }}
                        />
                        {errors.weight && <ErrorLabel text={errors.weight} />}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <FormLabel text="آدرس ایمیل" error={errors.email} />
                    <input
                        type="email"
                        className={`w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px] ${errors.email && 'border border-error text-error placeholder-error'}`}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <ErrorLabel text={errors.email} />}
                </div>
                <PrimaryButton loading={loading} className="">
                    ایجاد کاربر
                </PrimaryButton>
            </form>
        </div>
    )
}
