'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Icons from '@/components/Icons'
import FormLabel from '@/components/FormLabel'
import Link from 'next/link'

export default function AdminExpandableCard({ cls, setSelectedClass }) {
    const [isOpen, setIsOpen] = useState(false)
    const contentRef = useRef(null)

    // Animate open/close using scrollHeight trick
    useEffect(() => {
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
                <span className="font-semibold text-[17px]">{cls?.name}</span>
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
                {cls?.subscriptions?.map(subscription => (
                    <ExpandableDetail
                        key={subscription?.id}
                        subscription={subscription}
                        cls={cls}
                        setSelectedClass={setSelectedClass}
                    />
                ))}
            </div>
        </div>
    )
}

function ExpandableDetail({ subscription, setSelectedClass, cls }) {
    return (
        <div className=" pt-4 flex flex-col gap-4 text-[16px] text-right border border-border rounded-md">
            {/* 🕒 Date & Time */}
            <div className="flex flex-col gap-2 px-2">
                <div className="flex items-center gap-2">
                    <Icons name="clock" className="text-border" />
                    <FormLabel text="تاریخ و ساعت" />
                </div>
                <div className="text-black px-6 flex gap-2">
                    <p>روزهای {subscription?.day_type}</p>
                    <p>
                        از ساعت {subscription?.start_time} تا{' '}
                        {subscription?.end_time}
                    </p>
                </div>
            </div>

            {/*Subscription Session*/}
            <div className="flex flex-col gap-2 px-2">
                <div className="flex items-center gap-2">
                    <Icons name="calendar" className="text-border" />
                    <FormLabel text="تعداد جلسات" />
                </div>
                <div className="text-black px-6 flex gap-2">
                    <p>
                        {subscription?.session_count} جلسه در ماه (
                        {subscription?.session_count / 4} جلسه در هفته)
                    </p>
                </div>
            </div>

            {/* 🧑‍🏫 Trainer */}
            <div className="flex flex-col gap-2 px-2">
                <div className="flex items-center gap-2">
                    <Icons name="trainer" className="text-border" />
                    <FormLabel text="مربی" />
                </div>
                <div className="text-black px-6">
                    <p>{subscription?.instructor_name}</p>
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

                <Link
                    href={`/admin/classes/${cls.id}`}
                    className="flex items-center border border-bgPrimary p-4 rounded-md">
                    <h2 className="text-end font-bold text-bgPrimary">
                        انتخاب کلاس
                    </h2>
                </Link>
            </div>
        </div>
    )
}
