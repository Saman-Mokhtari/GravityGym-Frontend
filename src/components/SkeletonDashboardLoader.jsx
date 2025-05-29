// components/SkeletonDashboardLoader.tsx
'use client'
import React from 'react'

export default function SkeletonDashboardLoader() {
    return (
        <>
            {/* موبایل */}
            <div className="md:hidden flex flex-col min-h-screen animate-pulse">
                {/* Nav بالایی */}
                <div className="h-12 bg-gray-200 rounded" />
                {/* محتوا */}
                <div className="flex-1 p-4 space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded" />
                    ))}
                </div>
                {/* Nav پایینی */}
                <div className="h-16 bg-gray-200 rounded" />
            </div>

            {/* دسکتاپ */}
            <div className="hidden md:flex w-screen h-screen animate-pulse bg-bgDashboard p-3 gap-4">
                {/* Sidebar */}
                <div className="flex flex-col w-[16vw] p-3 space-y-4 bg-bgPrimary rounded-xl shadow">
                    <div className="h-16 bg-gray-200 rounded" />
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-8 bg-gray-200 rounded" />
                        ))}
                    </div>
                    <div className="mt-auto space-y-2">
                        <div className="h-10 bg-gray-200 rounded" />
                        <div className="h-10 bg-gray-200 rounded" />
                    </div>
                </div>

                {/* MainPanel */}
                <div className="flex-1 flex flex-col bg-bgPrimary rounded-xl shadow p-4 overflow-y-auto">
                    {/* Header */}
                    <div className="h-12 bg-gray-200 rounded mb-6" />
                    {/* بخش اول (کلاس‌های فعال) */}
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-100 rounded" />
                        ))}
                    </div>
                    {/* تیتر بخش دوم */}
                    <div className="h-6 bg-gray-200 rounded w-1/3 mt-10 mb-4" />
                    {/* بخش دوم (تاریخچه) */}
                    <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-100 rounded" />
                        ))}
                    </div>
                </div>

                {/* LeftPanel */}
                <div className="flex flex-col w-[20vw] space-y-4 opacity-40">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col bg-bgPrimary rounded-xl p-4 shadow">
                            <div className="h-6 bg-gray-200 rounded mb-2" />
                            <div className="flex-1 bg-gray-100 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
