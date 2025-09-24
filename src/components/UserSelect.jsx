import Icons from '@/components/Icons'
import { useTranslator } from '@/hooks/translator'
import Link from 'next/link'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away-extreme.css'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function UserSelect({
    user,
    canDelete = false,
    handleDelete,
    enroll_id,
    sub_id,
}) {
    const { persianRoles } = useTranslator()
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

    return (
        <div className="w-full flex items-center justify-between bg-bgInput py-3 px-4 rounded-md mt-2">
            <Toaster />
            <div className="flex items-center gap-3">
                <div className="aspect-square w-[3.5rem] border border-textSecondary rounded-full items-center justify-center relative">
                    <Icons
                        name="user"
                        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-[18px] font-bold">{user?.name}</h2>
                    <p className="font-light text-[16px]">
                        {persianRoles[user?.role]}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Tippy
                    content="مدیریت کاربر"
                    className="font-font font-medium text-[18px] p-1 !rounded-md  !bg-textPrimary">
                    <Link
                        href={`/admin/users/${user?.id}`}
                        className="group p-1">
                        <Icons
                            name="show"
                            className="text-[20px] group-hover:font-black"
                        />
                    </Link>
                </Tippy>
                {canDelete && (
                    <Tippy
                        asChild
                        disabled={user?.role === 'superUser' ?? true}
                        visible={isConfirmingDelete ? true : undefined} // فقط در حالت true فعال می‌کنه
                        trigger={
                            isConfirmingDelete ? 'manual' : 'mouseenter focus'
                        } // در حالت false عادی باشه
                        onClickOutside={() => setIsConfirmingDelete(false)}
                        interactive={true}
                        placement="top"
                        theme="light-border"
                        className="!bg-error"
                        arrow={false}
                        content={
                            isConfirmingDelete ? (
                                <div className="text-center p-2">
                                    <p className="text-sm mb-2">
                                        آیا مطمئن هستید؟
                                    </p>
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => {
                                                handleDelete(
                                                    user,
                                                    enroll_id,
                                                    sub_id,
                                                )
                                            }}
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
                            onClick={() => {
                                if (user?.role !== 'superUser') {
                                    setIsConfirmingDelete(true)
                                }
                            }}
                            className={`group p-1  ${user?.role === 'superUser' ? '!cursor-not-allowed' : 'cursor-pointer'}`}>
                            <Icons
                                name="trash"
                                className={`text-[20px]  group-hover:font-black ${user?.role === 'superUser' ? ' text-error/20' : 'text-error'}`}
                            />
                        </div>
                    </Tippy>
                )}
            </div>
        </div>
    )
}
