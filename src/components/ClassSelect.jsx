import Icons from '@/components/Icons'
import Link from 'next/link'
import FormLabel from '@/components/FormLabel'
import { useClassContext } from '@/context/ClassContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClassSelect({ cls }) {
    const { setSelectedClass } = useClassContext()
    const router = useRouter()

    const handleClick = () => {
        setSelectedClass(cls)
        router.push(`/admin/classes/${cls?.id}`)
    }

    return (
        <div className="w-full flex items-center justify-between bg-bgInput py-3 px-4 rounded-md mt-2">
            <div className="flex items-center gap-3 w-full">
                <div className="flex flex-col gap-3 ">
                    <h2 className="text-[18px] font-bold">{cls?.name}</h2>
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex gap-2">
                            <FormLabel text="اشتراک‌ها:" />
                            <p className="font-normal text-[16px]">
                                {cls?.subscriptions?.filter(Boolean).length}{' '}
                                اشتراک
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="" onClick={handleClick}>
                <Icons
                    name="settings"
                    className="text-[20px] hover:rotate-90 transition-all hover:cursor-pointer p-2"
                />
            </div>
        </div>
    )
}
