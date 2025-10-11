import Tippy from '@tippyjs/react'
import Icons from './Icons'
import Link from 'next/link'

export default function AdminProfile({ logout, user, pathName, onClick = null }) {
    return (
        <div className="flex flex-col gap-2">
                <Tippy
                    arrow={true}
                    content="اطلاعات کاربری"
                    className="font-font">
                    <Link
                    onClick={onClick}
                        href="/admin/profile"
                        className={`flex items-center gap-4 group py-2 justify-between hover:bg-bgDashboardHover hover:border-textSecondary rounded-md px-2  cursor-pointer ${pathName?.startsWith('/admin/profile') && '!bg-bgDashboardHover '}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-[2.5rem] aspect-square rounded-full bg-gray-200 flex justify-center items-center">
                                <Icons
                                    name="user"
                                    className="text-[20px] text-textSecondary"
                                />
                            </div>
                            <h2 className="font-bold text-[16px]">
                                {user?.name}
                            </h2>
                        </div>
                    </Link>
                </Tippy>

                <div
                    onClick={logout}
                    className="flex items-center gap-4 hover:bg-bgDashboardHover cursor-pointer py-1 rounded-md transition">
                    <div className="w-[2.5rem] aspect-square rounded-full flex justify-center items-center">
                        <Icons
                            name="logout"
                            className="text-[20px] text-error"
                        />
                    </div>
                    <h2 className="font-light text-[18px] text-error">
                        خروج از حساب کاربری
                    </h2>
                </div>
            </div>
    )
}
