'use client'

export default function loading() {
    return (
        <form className="w-full flex flex-col gap-8 p-4 animate-pulse">
            {/* عنوان */}
            <div className="w-1/3 h-6 bg-gray-300 rounded" />

            {/* نام کلاس و وضعیت */}
            <div className="w-full flex flex-col gap-3">
                <div className="w-full h-14 bg-gray-200 rounded" />
                <div className="w-1/2 h-14 bg-gray-200 rounded" />
            </div>

            {/* اشتراک‌ها */}
            <div className="w-full flex flex-col gap-2">
                <div className="w-1/4 h-5 bg-gray-300 rounded" />

                {/* کارت اشتراک نمونه */}
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="w-full h-40 bg-gray-200 rounded" />
                ))}

                {/* دکمه افزودن اشتراک */}
                <div className="w-64 h-8 bg-gray-300 rounded self-center" />

                {/* دکمه افزودن کلاس */}
                <div className="w-52 h-10 bg-gray-400 rounded self-start" />
            </div>
        </form>
    )
}
