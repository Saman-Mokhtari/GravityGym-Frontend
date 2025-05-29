'use client'

export default function loading() {
    return (
        <div className="w-full flex flex-col gap-6 p-4 animate-pulse">
            {/* تیتر کلاس */}
            <div className="w-1/2 h-6 bg-gray-300 rounded" />

            {/* بخش در یک نگاه */}
            <div className="w-full flex flex-col gap-2">
                <div className="w-32 h-5 bg-gray-200 rounded" />
                <div className="w-full flex gap-2">
                    <div className="w-full h-20 bg-gray-200 rounded" />
                    <div className="w-full h-20 bg-gray-200 rounded" />
                </div>
            </div>

            {/* اشتراک‌ها */}
            <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="w-32 h-5 bg-gray-200 rounded" />
                    <div className="w-40 h-5 bg-gray-300 rounded" />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-16 bg-gray-200 rounded"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
