'use client'

import { useState, useRef, useEffect } from 'react'
import Icons from '@/components/Icons'

export default function TimePicker({ onChange, defaultValue }) {
    // کمکی برای تبدیل "HH:mm" به اعداد معتبر
    const parseTime = timeStr => {
        if (typeof timeStr === 'string') {
            const parts = timeStr.split(':')
            if (parts.length === 2) {
                let h = parseInt(parts[0], 10)
                let m = parseInt(parts[1], 10)
                if (!isNaN(h) && !isNaN(m)) {
                    h = Math.min(23, Math.max(0, h))
                    m = Math.min(59, Math.max(0, m))
                    return { hh: h, mm: m }
                }
            }
        }
        return { hh: 0, mm: 0 }
    }

    // مقدار اولیه از defaultValue یا "00:00"
    const { hh: initH, mm: initM } = parseTime(defaultValue)
    const [hours, setHours] = useState(initH)
    const [minutes, setMinutes] = useState(initM)
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef(null)
    const debounceRef = useRef(null)

    // دیبانس‌کردن onChange (700ms)
    useEffect(() => {
        if (
            onChange &&
            typeof hours === 'number' &&
            typeof minutes === 'number'
        ) {
            clearTimeout(debounceRef.current)
            debounceRef.current = setTimeout(() => {
                const value = `${String(hours).padStart(2, '0')}:${String(
                    minutes,
                ).padStart(2, '0')}`
                onChange(value)
            }, 700)
        }
        return () => clearTimeout(debounceRef.current)
    }, [hours, minutes, onChange])

    // وقتی کلیک خارج از پنل انجام می‌شه، حتماً مقدار نهایی رو فورس کن
    useEffect(() => {
        const handleClickOutside = e => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                // فورس فراخوانی onChange
                clearTimeout(debounceRef.current)
                if (
                    onChange &&
                    typeof hours === 'number' &&
                    typeof minutes === 'number'
                ) {
                    const value = `${String(hours).padStart(2, '0')}:${String(
                        minutes,
                    ).padStart(2, '0')}`
                    onChange(value)
                }
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [hours, minutes, onChange])

    const inc = unit => {
        if (unit === 'hours') setHours(h => (h + 1) % 24)
        else setMinutes(m => (m + 1) % 60)
    }
    const dec = unit => {
        if (unit === 'hours') setHours(h => (h - 1 + 24) % 24)
        else setMinutes(m => (m - 1 + 60) % 60)
    }

    // اعتبارسنجی و بستن ادیت
    const handleBlur = (unit, value) => {
        let num = parseInt(value, 10)
        if (isNaN(num)) num = 0

        if (unit === 'hours') {
            num = Math.min(23, Math.max(0, num))
            setHours(num)
        } else {
            num = Math.min(59, Math.max(0, num))
            setMinutes(num)
        }
    }

    // برای نمایش: اگر رشته است همان وگرنه دو رقمی کن
    const display = val =>
        typeof val === 'string' ? val : String(val).padStart(2, '0')

    return (
        <div className="relative inline-block w-full" ref={wrapperRef}>
            {/* اینپوت اصلی */}
            <input
                type="text"
                className="w-full border py-4 rounded-md bg-bgInput text-textPrimary text-[18px]"
                readOnly
                value={`${display(hours)}:${display(minutes)}`}
                onClick={() => setIsOpen(v => !v)}
            />

            {isOpen && (
                <div
                    dir="rtl"
                    className="absolute top-full mt-2 right-0 w-48 p-3 flex flex-row-reverse justify-between
                     items-center shadow-2xl border border-border rounded-md z-[1000] bg-bgPrimary">
                    {/* ستون ساعت */}
                    <div className="flex flex-col items-center text-[20px]">
                        <Icons
                            name="chevronUp"
                            className="text-[25px] p-2 cursor-pointer hover:bg-gray-50 rounded-md"
                            onClick={() => inc('hours')}
                        />
                        <input
                            type="text"
                            className="w-10 text-center bg-transparent focus:outline-none p-2 text-[20px] border border-border rounded-md"
                            onFocus={() => setHours('')}
                            value={display(hours)}
                            onChange={e => setHours(e.target.value)}
                            onBlur={e => handleBlur('hours', e.target.value)}
                        />
                        <Icons
                            name="chevronDown"
                            className="text-[25px] p-2 cursor-pointer hover:bg-gray-50 rounded-md"
                            onClick={() => dec('hours')}
                        />
                    </div>

                    <Icons name="colon" className="text-[24px]" />

                    {/* ستون دقیقه */}
                    <div className="flex flex-col items-center text-[20px]">
                        <Icons
                            name="chevronUp"
                            className="text-[25px] p-2 cursor-pointer hover:bg-gray-50 rounded-md"
                            onClick={() => inc('minutes')}
                        />
                        <input
                            type="text"
                            className="w-10 text-center bg-transparent focus:outline-none p-2 text-[20px] border border-border rounded-md"
                            onFocus={() => setMinutes('')}
                            value={display(minutes)}
                            onChange={e => setMinutes(e.target.value)}
                            onBlur={e => handleBlur('minutes', e.target.value)}
                        />
                        <Icons
                            name="chevronDown"
                            className="text-[25px] p-2 cursor-pointer hover:bg-gray-50 rounded-md"
                            onClick={() => dec('minutes')}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
