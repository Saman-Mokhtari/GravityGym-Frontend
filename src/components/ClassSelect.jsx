import Icons from '@/components/Icons'
import FormLabel from '@/components/FormLabel'
import { useClassContext } from '@/context/ClassContext'
import { useRouter } from 'next/navigation'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away-extreme.css'
import { Toaster } from 'react-hot-toast'
import { useClass } from '@/hooks/class'

export default function ClassSelect({ cls }) {
    const { setSelectedClass } = useClassContext()
    const router = useRouter()
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
    const { deleteClass } = useClass()
    const [, setErrors] = useState(null)
    const handleClick = () => {
        setSelectedClass(cls)
        router.push(`/admin/classes/${cls?.id}`)
    }

    const handleDelete = async () => {
        try {
            await deleteClass({ setErrors, cls: cls })
        } catch (errors) {
            setErrors(prev => [prev, errors])
        }
    }

    return (
        <div className="w-full flex items-center justify-between bg-bgInput py-3 px-4 rounded-md mt-2">
            <Toaster />
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
            <div className="flex items-center gap-1">
                <Tippy content="مدیریت کلاس" className="!font-font">
                    <div className="" onClick={handleClick}>
                        <Icons
                            name="settings"
                            className="text-[20px] hover:rotate-90 transition-all hover:cursor-pointer p-2"
                        />
                    </div>
                </Tippy>
                <Tippy
                    asChild
                    visible={isConfirmingDelete ? true : undefined}
                    trigger={isConfirmingDelete ? 'manual' : 'mouseenter focus'}
                    onClickOutside={() => setIsConfirmingDelete(false)}
                    interactive={true}
                    placement="top"
                    theme="light-border"
                    className="!bg-error"
                    arrow={false}
                    content={
                        isConfirmingDelete ? (
                            <div className="text-center p-2">
                                <p className="text-sm mb-2">آیا مطمئن هستید؟</p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={handleDelete}
                                        className="text-white bg-red-800 hover:bg-red-900 px-3 py-1 rounded text-sm">
                                        حذف
                                    </button>
                                    <button
                                        onClick={() =>
                                            setIsConfirmingDelete(false)
                                        }
                                        className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
                                        لغو
                                    </button>
                                </div>
                            </div>
                        ) : (
                            'حذف کاربر از دوره'
                        )
                    }>
                    <div
                        onClick={() => setIsConfirmingDelete(true)}
                        className="group cursor-pointer">
                        <Icons
                            name="trash"
                            className="text-[20px] p-2 text-error group-hover:font-black"
                        />
                    </div>
                </Tippy>
            </div>
        </div>
    )
}
