'use client'

export default function loading() {
    return (
        <form className="w-full flex flex-col gap-6 p-4 animate-pulse">
            {/* فیلدهای متنی */}
            {[...Array(3)].map((_, i) => (
                <div key={i} className="w-full h-14 bg-gray-200 rounded" />
            ))}

            {/* Select مربی */}
            <div className="w-full h-14 bg-gray-200 rounded" />

            {/* روزهای کلاس */}
            <div className="w-full h-14 bg-gray-200 rounded" />

            {/* ساعت شروع و پایان */}
            <div className="w-full h-14 bg-gray-200 rounded" />
            <div className="w-full h-14 bg-gray-200 rounded" />

            {/* تعداد جلسات */}
            <div className="w-1/2 h-14 bg-gray-200 rounded" />

            {/* نوع کلاس */}
            <div className="w-full h-14 bg-gray-200 rounded" />

            {/* مدت دوره (مقدار + واحد) */}
            <div className="w-full flex gap-3">
                <div className="w-1/2 h-14 bg-gray-200 rounded" />
                <div className="w-1/2 h-14 bg-gray-200 rounded" />
            </div>

            {/* وضعیت */}
            <div className="w-full h-14 bg-gray-200 rounded" />

            {/* قیمت */}
            <div className="w-full h-14 bg-gray-200 rounded" />

            {/* دکمه */}
            <div className="w-40 h-10 bg-gray-300 rounded self-start" />
        </form>
    )
}
