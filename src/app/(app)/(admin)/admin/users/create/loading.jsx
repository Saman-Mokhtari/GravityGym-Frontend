'use client'

export default function loading() {
    return (
        <div className="w-full flex flex-col gap-6 p-4 animate-pulse">
            {/* عنوان */}
            <div className="w-1/3 h-6 bg-gray-300 rounded" />

            {/* زیرعنوان */}
            <div className="w-1/2 h-4 bg-gray-200 rounded" />

            {/* فرم */}
            <form className="w-full flex flex-col gap-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-14 bg-gray-200 rounded" />
                ))}

                {/* Select ها */}
                <div className="flex flex-col gap-4">
                    <div className="w-full h-14 bg-gray-200 rounded" />
                    <div className="w-full h-14 bg-gray-200 rounded" />
                </div>

                {/* DatePicker */}
                <div className="w-full desktop:w-1/3 h-14 bg-gray-200 rounded" />

                {/* بیماری‌ها */}
                <div className="w-full h-20 bg-gray-200 rounded" />

                {/* چک‌باکس بدون مشکل */}
                <div className="w-40 h-5 bg-gray-200 rounded" />

                {/* بیمه */}
                <div className="w-full h-14 bg-gray-200 rounded" />

                {/* قد و وزن */}
                <div className="w-full flex gap-3">
                    <div className="w-full h-14 bg-gray-200 rounded" />
                    <div className="w-full h-14 bg-gray-200 rounded" />
                </div>

                {/* ایمیل */}
                <div className="w-full h-14 bg-gray-200 rounded" />

                {/* دکمه */}
                <div className="w-40 h-10 bg-gray-300 rounded" />
            </form>
        </div>
    )
}
