'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Icons from '@/components/Icons'
import FormLabel from '@/components/FormLabel'
import { useTranslator } from '@/hooks/translator'

export default function ExpandableCard({
    gymClass,
    setSelectedSub,
    setDrawerIsOpen,
    setOpenModal,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const contentRef = useRef(null)
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
                className={`overflow-hidden flex flex-col w-full gap-8 mb-4`}
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
        <div className="pt-2 border border-border rounded-md text-[16px] text-right">
            {/* grid of info: two columns */}
            <div className="grid grid-cols-2 gap-4  px-4 py-4">
                {/* نام اشتراک */}
                <div className="flex flex-col w-full px-2">
                    <div className="flex items-center gap-2">
                        <Icons
                            name="solidAddressCard"
                            className="text-border"
                        />
                        <FormLabel text="نام اشتراک" />
                    </div>
                    <div className="mt-1 px-2 text-black">
                        {subscription?.sub_name}
                    </div>
                </div>

                <div className=" flex flex-col w-full px-2 ">
                    <div className="flex items-center gap-2">
                        <Icons name="trainer" className="text-border" />
                        <FormLabel text="مربی" />
                    </div>
                    <div className="mt-1 px-2 text-black">
                        {subscription.instructor}
                    </div>
                </div>

                {/* روز */}
                <div className="flex  border-t border-textPrimary/5 px-2 pt-4 flex-col col-span-2  w-full ">
                    <div className="flex items-center gap-2">
                        <Icons name="calendar" className="text-border" />
                        <FormLabel text="روز" />
                    </div>
                    <div className="mt-1 px-2 flex flex-wrap gap-2 text-black">
                        {subscription?.class_days
                            .map(day => persianDays[day])
                            .join('، ')}
                    </div>
                </div>

                {/* ساعت */}
                <div className="w-full flex col-span-2 border-t pt-4 border-textPrimary/5">
                    <div className="flex flex-col w-full px-2  ">
                        <div className="flex items-center gap-2">
                            <Icons name="clock" className="text-border" />
                            <FormLabel text="ساعت" />
                        </div>
                        <div className="mt-1 px-2 text-black">
                            {subscription.start_time} تا {subscription.end_time}
                        </div>
                    </div>

                    {/* مدت دوره */}
                    <div className="flex flex-col w-full px-2  ">
                        <div className="flex items-center gap-2">
                            <Icons
                                name="calendarTime"
                                className="text-border"
                            />
                            <FormLabel text="مدت دوره" />
                        </div>
                        <div className="mt-1 px-2 text-black">
                            {subscription.duration_value}{' '}
                            {subscription.duration_unit}
                        </div>
                    </div>
                </div>

                {/* تعداد جلسات */}
                <div className="flex flex-col col-span-2 px-2 pt-4  w-full border-t border-textPrimary/5">
                    <div className="flex items-center gap-2">
                        <Icons name="count" className="text-border" />
                        <FormLabel text="تعداد جلسات" />
                    </div>
                    <div className="mt-1 px-2 text-black">
                        {subscription.session_count} جلسه (
                        {(subscription.session_count / 4).toFixed(0)} جلسه در
                        هفته)
                    </div>
                </div>

                {/* نوع کلاس */}
                <div className="flex flex-col w-full col-span-2  px-2 pt-4 border-t border-textPrimary/5">
                    <div className="flex items-center gap-2">
                        <Icons name="category" className="text-border" />
                        <FormLabel text="نوع کلاس" />
                    </div>
                    <div className="mt-1 px-2 text-black">
                        {subscription.class_type}
                    </div>
                </div>

                {/* مربی (عرض دو ستون) */}
            </div>

            {/* قیمت و دکمه در پایین */}
            <div className="flex w-full justify-between px-4 items-center py-3 bg-bgTertiary rounded-b-md">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-bgPrimary">
                        <Icons name="price" />
                        <FormLabel
                            text="هزینه اشتراک"
                            className="!text-bgPrimary"
                        />
                    </div>
                    <div className="mt-1 px-2 text-black font-bold text-[18px] text-success">
                        {(subscription.price * 1000000).toLocaleString()} تومان
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
                                instructor: subscription.instructor, // ✅ اصلاح شد
                                sub_name: subscription.sub_name,
                                duration_value: subscription?.duration_value,
                                duration_unit: subscription?.duration_unit,
                                class_days: subscription?.class_days,
                                id: subscription.id,
                                session_count: subscription.session_count,
                                price: subscription.price,
                                description: `${subscription.session_count} جلسه در ماه (${subscription.session_count / 4} جلسه در هفته)`,
                            },
                        })
                    }}
                    className="px-4 py-2 border border-bgPrimary rounded-md text-bgPrimary font-bold">
                    انتخاب کلاس
                </button>
            </div>
        </div>
    )
}
