'use client'

export default function loading() {
    return (
        <div className="w-full flex flex-col gap-6 mt-2 p-4 animate-pulse">
            {/* بخش مشخصات */}
            <div className="w-full flex flex-col gap-3">
                <div className="w-40 h-5 bg-gray-300 rounded" />
                <div className="grid grid-cols-2 gap-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded" />
                    ))}
                    {/* اسکلتن مشکلات پزشکی */}
                    <div className="flex flex-col gap-2 col-span-2">
                        <div className="w-24 h-5 bg-gray-300 rounded" />
                        <div className="w-full h-4 bg-gray-200 rounded" />
                        <div className="w-3/4 h-4 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>

            {/* بخش اشتراک‌ها */}
            <div className="w-full flex flex-col gap-2">
                <div className="w-32 h-5 bg-gray-300 rounded" />
                <div className="flex flex-col gap-3">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-20 bg-gray-200 rounded"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
