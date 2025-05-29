'use client'

export default function loading() {
    return (
        <div className="flex flex-col gap-6 p-4 animate-pulse">
            {/* تیتر صفحه */}
            <div className="w-1/3 h-6 bg-gray-300 rounded" />

            {/* دکمه افزودن */}
            <div className="w-40 h-5 bg-gray-200 rounded" />

            {/* فیلد سرچ */}
            <div className="w-full h-12 bg-gray-200 rounded" />

            {/* فیلترها */}
            <div className="flex flex-wrap gap-3">
                <div className="w-full sm:w-1/2 desktop:w-1/3 h-12 bg-gray-200 rounded" />
                <div className="w-full sm:w-1/2 desktop:w-1/3 h-12 bg-gray-200 rounded" />
            </div>

            {/* کارت‌های کاربر */}
            <div className="flex flex-col gap-4 mt-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-full h-20 bg-gray-200 rounded" />
                ))}
            </div>
        </div>
    )
}
