'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Icons from '@/components/Icons'
import FormLabel from '@/components/FormLabel'
import { usePathname } from 'next/navigation'
import { useTranslator } from '@/hooks/translator'

export default function ExpandableCard({
    gymClass,
    setSelectedSub,
    setDrawerIsOpen,
    setOpenModal,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const contentRef = useRef(null)
    const pathName = usePathname()
    // Animate open/close using scrollHeight trick
    useLayoutEffect(() => {
        const el = contentRef.current
        if (!el) return
        if (isOpen) {
            gsap.set(el, { height: 'auto' })
            const fullHeight = el.scrollHeight

            gsap.fromTo(
                el,
                { height: 0, opacity: 0 },
                {
                    height: fullHeight,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => gsap.set(el, { height: 'auto' }),
                },
            )
        } else {
            gsap.to(el, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut',
            })
        }
    }, [isOpen])

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-2">
            {/* 👉 Class Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
                className={`flex items-center justify-between w-full px-4 py-4 border border-gray-300 rounded-lg  text-right cursor-pointer transition-all duration-200 ${isOpen && 'bg-bgInput'}`}>
                <span className="font-semibold text-[17px]">
                    {gymClass.name}
                </span>
                <Icons
                    name="chevronLeft"
                    className={`transition-transform duration-300 ${
                        isOpen ? '-rotate-90' : 'rotate-0'
                    }`}
                />
            </button>

            {/* 👉 Expandable Section */}
            <div
                ref={contentRef}
                className={`overflow-hidden flex flex-col w-full gap-4 mb-4`}
                style={{ height: 0, opacity: 0 }}>
                {gymClass.subscriptions.map(subscription => (
                    <ExpandableDetail
                        key={subscription.id}
                        subscription={subscription}
                        gymClass={gymClass}
                        setSelectedSub={setSelectedSub}
                        setDrawerIsOpen={setDrawerIsOpen}
                        setOpenModal={setOpenModal}
                    />
                ))}
            </div>
        </div>
    )
}

function ExpandableDetail({
    subscription,
    setSelectedSub,
    gymClass,
    setDrawerIsOpen,
    setOpenModal,
}) {
    const { persianDays } = useTranslator()
    return (
        <div className=" pt-4 flex flex-col gap-4 text-[16px] text-right border border-border rounded-md">
            {/* 🕒 Date & Time */}
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-2  px-2 w-1/2">
                    <div className="flex items-center gap-2 w-full">
                        <Icons name="clock" className="text-border" />
                        <FormLabel text="روز" />
                    </div>
                    <div className="text-black px-6 flex gap-2 w-full  justify-start text-start">
                        {subscription?.class_days.map(day => {
                            return <p key={day.id}>{persianDays[day]}</p>
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-2  px-2 w-1/2">
                    <div className="flex items-center gap-2 w-full">
                        <Icons name="clock" className="text-border" />
                        <FormLabel text="ساعت" />
                    </div>
                    <div className="text-black px-6  flex gap-2 w-full  justify-start text-start">
                        <p>
                            {subscription.start_time} تا {subscription.end_time}
                        </p>
                    </div>
                </div>
            </div>

            {/*Subscription Session*/}
            <div className="w-full flex items-start justify-between">
                <div className="flex flex-col gap-2  px-2 w-1/2">
                    <div className="flex items-center gap-2 w-full">
                        <Icons name="clock" className="text-border" />
                        <FormLabel text="مدت دوره" />
                    </div>
                    <div className="text-black px-6  flex gap-2 w-full  justify-start text-start">
                        <p>
                            {subscription.duration_value}{' '}
                            {subscription.duration_unit}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-2 w-1/2">
                    <div className="flex items-center gap-2">
                        <Icons name="calendar" className="text-border" />
                        <FormLabel text="تعداد جلسات" />
                    </div>
                    <div className="text-black px-6 flex gap-2">
                        <p>
                            {subscription.session_count} جلسه (
                            {subscription.session_count / 4} جلسه در هفته)
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-start justify-between">
                <div className="flex flex-col gap-2  px-2 w-1/2">
                    <div className="flex items-center gap-2 w-full">
                        <Icons name="clock" className="text-border" />
                        <FormLabel text="نوع کلاس" />
                    </div>
                    <div className="text-black px-6  flex gap-2 w-full  justify-start text-start">
                        <p>{subscription.class_type}</p>
                    </div>
                </div>
            </div>
            {/* 🧑‍🏫 Trainer */}
            <div className="flex flex-col gap-2 px-2">
                <div className="flex items-center gap-2">
                    <Icons name="trainer" className="text-border" />
                    <FormLabel text="مربی" />
                </div>
                <div className="text-black px-6">
                    <p>{subscription.instructor_name}</p>
                </div>
            </div>

            {/*Price*/}
            <div className="flex w-full justify-between px-4 items-center py-3 bg-bgTertiary rounded-b-md">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-bgPrimary">
                        <Icons name="price" className="" />
                        <FormLabel
                            text="هزینه اشتراک"
                            className="!text-bgPrimary"
                        />
                    </div>
                    <div className="text-black px-6 flex gap-2">
                        <p className="font-bold text-[18px] text-success">
                            {(subscription.price * 1000000).toLocaleString()}{' '}
                            تومانءء
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setDrawerIsOpen(false)
                        setOpenModal(false)
                        setSelectedSub({
                            name: gymClass.name,
                            subscription: {
                                day_type: subscription.day_type,
                                start_time: subscription.start_time,
                                end_time: subscription.end_time,
                                instructor_name: subscription.instructor_name,
                                id: subscription.id,
                                session_count: subscription.session_count,
                                price: subscription.price,
                                description: `${subscription.session_count} جلسه در ماه (${subscription.session_count / 4} جلسه در هفته)`,
                            },
                        })
                    }}
                    className="flex items-center border border-bgPrimary p-4 rounded-md">
                    <h2 className="text-end font-bold text-bgPrimary">
                        انتخاب کلاس
                    </h2>
                </button>
            </div>
        </div>
    )
}
