'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import ErrorLabel from '@/components/ErrorLabel'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import SubscriptionForm from '@/components/SubscriptionForm'
import PrimaryButton from '@/components/PrimaryButton'
import { useClass } from '@/hooks/class'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useNavigationTitle } from '@/context/NavigationTitleContext'

export default function Main() {
    const [errors, setErrors] = useState(null)
    const [className, setClassName] = useState(null)
    const [subscriptions, setSubscriptions] = useState(null)
    const [classStatus, setClassStatus] = useState(null)
    const { create, loading } = useClass()
    const [isSucceeded, setisSucceeded] = useState(false)
    const router = useRouter()
    const { setTitle } = useNavigationTitle()
    const status = [
        {
            value: 1,
            label: 'فعال',
        },
        {
            value: 0,
            label: 'غیرفعال',
        },
    ]

    useEffect(() => {
        setTitle('ایجاد کلاس جدید')
    }, [])

    const handleCreateClass = e => {
        e.preventDefault()

        const createNewClass = async () => {
            try {
                await create({
                    setErrors,
                    class_name: className,
                    class_status: classStatus,
                    setisSucceeded,
                    subscriptions,
                })
            } catch (error) {
                setErrors(prev => [...prev, error])
            }
        }
        createNewClass()
    }

    const handleAddSub = () => {
        const newSub = {
            name: '',
            instructor_id: null,
            class_days: [],
            start_time: '',
            end_time: '',
            session_count: 0,
            class_types: '',
            duration_value: null,
            duration_unit: '',
            status: null,
            price: '',
        }

        if (Array.isArray(subscriptions)) {
            setSubscriptions(prev => [...prev, newSub])
        } else {
            setSubscriptions([newSub])
        }
    }

    useEffect(() => {
        if (isSucceeded) {
            successfulyCreated()
            const timeout = setTimeout(() => {
                router.replace(`/admin/classes`)
            }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [isSucceeded])
    const successfulyCreated = () => {
        toast.success('کلاس به همراه اشتراک ها با موفقیت ایجاد شدند.')
    }
    return (
        <form
            onSubmit={handleCreateClass}
            action=""
            className="w-full flex flex-col gap-8">
            <Toaster />
            <div className="w-full flex flex-col gap-2">
                <FormLabel text="ایجاد کلاس جدید" />
                <div className="w-full flex items-center gap-2">
                    <div className="flex flex-col gap-3 w-full">
                        <FormLabel text="نام کلاس">
                            <Icons
                                name="important"
                                className="text-[8px] text-error absolute top-1 -left-2"
                            />
                        </FormLabel>
                        <div className="w-full flex flex-col  gap-2">
                            <input
                                type="text"
                                className={` w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]  ${errors?.class_name && 'border-error text-error placeholder-error'}`}
                                onChange={e => {
                                    setClassName(e.target.value)
                                }}
                            />
                            {errors?.class_name && (
                                <ErrorLabel text={errors?.class_name} />
                            )}
                            <div className="flex flex-col gap-2 w-1/2">
                                <Select
                                    className="w-full"
                                    isClearable
                                    isSearchable={false}
                                    placeholder="وضعیت"
                                    menuPlacement="bottom"
                                    menuPosition="absolute"
                                    menuPortalTarget={
                                        typeof window !== 'undefined'
                                            ? document.body
                                            : null
                                    }
                                    onChange={selected =>
                                        setClassStatus(selected?.value)
                                    }
                                    options={status}
                                    styles={{
                                        control: base => ({
                                            ...base,
                                            minHeight: '56px',
                                            padding: '0.5rem',
                                            fontSize: '18px',
                                            backgroundColor:
                                                'rgb(var(--color-bg-input))',
                                            borderRadius: '0.375rem',
                                            border: `1px solid ${
                                                errors?.class_status
                                                    ? 'rgb(var(--color-error))'
                                                    : 'rgb(var(--color-text-primary))'
                                            }`,
                                            color: 'rgb(var(--color-text-primary))',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor:
                                                    'rgb(var(--color-text-secondary))',
                                            },
                                        }),
                                        menu: base => ({
                                            ...base,
                                            zIndex: 9999,
                                            direction: 'rtl',
                                            backgroundColor:
                                                'rgb(var(--color-bg-primary))',
                                        }),
                                        menuPortal: base => ({
                                            ...base,
                                            zIndex: 9999,
                                        }),
                                        singleValue: base => ({
                                            ...base,
                                            color: 'rgb(var(--color-text-primary))',
                                        }),
                                        placeholder: base => ({
                                            ...base,
                                            color: 'rgb(var(--color-text-secondary))',
                                        }),
                                        input: base => ({
                                            ...base,
                                            color: 'rgb(var(--color-text-primary))',
                                        }),
                                    }}
                                />
                                {errors?.class_status && (
                                    <ErrorLabel text={errors?.class_status} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <FormLabel text="ایجاد اشتراک" />
                {/*one new sub*/}
                {subscriptions &&
                    subscriptions.map((_, index) => {
                        return (
                            <SubscriptionForm
                                key={index}
                                index={index}
                                subscriptions={subscriptions}
                                setSubscriptions={setSubscriptions}
                                errors={errors}
                            />
                        )
                    })}
                <div
                    onClick={handleAddSub}
                    className="w-full flex items-center justify-center mt-4 gap-2 ">
                    <div className="items-center gap-2 flex w-fit text-success cursor-pointer group transition-all">
                        <Icons
                            name="plus"
                            className="text-[20px] group-hover:rotate-90 transition-all"
                        />
                        <p className="group-hover:scale-105 transition-all">
                            افزودن اشتراک برای این کلاس
                        </p>
                    </div>
                </div>
                <PrimaryButton loading={loading}>
                    افزودن کلاس و اشتراک ها
                </PrimaryButton>
            </div>
        </form>
    )
}
