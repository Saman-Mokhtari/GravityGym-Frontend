'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/hooks/user'
import { useTranslator } from '@/hooks/translator'
import FormLabel from '@/components/FormLabel'
import ClassButton from '@/components/ClassButton'
import InformationCell from '@/components/InformationCell'
import Link from 'next/link'
import Icons from '@/components/Icons'
import { useNavigationTitle } from '@/context/NavigationTitleContext'

export default function User() {
    const [, setErrors] = useState([])
    const [userData, setUserData] = useState(null)
    const { persianRoles } = useTranslator()
    const { user } = useUser()
    const params = useParams()
    const { setTitle } = useNavigationTitle()

    useEffect(() => {
        setTitle(`${userData?.name}`)
    }, [userData])

    useEffect(() => {
        if (params?.userId) {
            const fetchUser = async () => {
                try {
                    await user({
                        user_id: params.userId,
                        setUserData,
                    })
                } catch (error) {
                    setErrors(error)
                }
            }
            fetchUser()
        }
    }, [params.userId])

    if (!userData) {
        return <p>در حال بارگذاری...</p>
    }

    // گروه‌بندی اشتراک‌ها
    const allEnrollments = Array.isArray(userData.enrollments)
        ? userData.enrollments
        : []

    // ۱. اشتراک‌های فعال یا رزرو شده
    const activeOrReserved = allEnrollments.filter(e =>
        ['active', 'reserved'].includes(e.status),
    )

    // ۲. اشتراک‌های غیرفعال یا کنسل‌شده
    const inactiveOrCancelled = allEnrollments.filter(
        e => !['active', 'reserved'].includes(e.status),
    )

    return (
        <div className="w-full flex flex-col gap-10 ">
            {/* مشخصات کاربر */}
            <div className="w-full flex items-center justify-between p-2">
                <FormLabel text="مشخصات کاربر" />
                <Link
                    href={`/admin/users/${params.userId}/edit`}
                    className="flex items-center gap-2 text-success hover:scale-105 transition-all">
                    <Icons name="edit" />
                    <p>ویرایش اطلاعات کاربر</p>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 p-2">
                <InformationCell
                    title="نام و نام خانوادگی"
                    data={userData.name}
                />
                <InformationCell title="تاریخ تولد" data={userData.birthdate} />
                <InformationCell
                    title="شماره تلفن"
                    data={userData.phone_number}
                />
                <InformationCell title="کد ملی" data={userData.national_id} />
                <InformationCell
                    title="قد (سانتی‌متر)"
                    data={userData.height}
                />
                <InformationCell title="وزن (کیلوگرم)" data={userData.weight} />

                {userData.disabilities && (
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[18px] font-medium">
                            مشکلات پزشکی
                        </h2>
                        {userData.disabilities.map((d, i) => (
                            <p
                                key={i}
                                className="text-[18px] font-light text-textSecondary">
                                {d}
                            </p>
                        ))}
                    </div>
                )}
                <InformationCell
                    title="نقش فرد"
                    data={persianRoles[userData.role]}
                />
            </div>

            {/* اشتراک‌ها */}
            <div className="w-full flex flex-col gap-8">
                {/* بخش فعال/رزرو */}
                <div className="w-full flex flex-col gap-2">
                    <FormLabel text="اشتراک‌های فعال و رزرو شده" />
                    {activeOrReserved.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {activeOrReserved.map(enroll => (
                                <ClassButton
                                    key={enroll.id}
                                    admin={true}
                                    enrollment={enroll}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center ">
                            <div className="flex flex-col items-center gap-3 bg-bgInput p-4 border border-textPrimary/20 rounded-xl desktop:w-1/2">
                                <div className="flex items-center gap-3 text-textPrimary/30">
                                    <Icons
                                        name="notFound"
                                        className="text-[25px]"
                                    />
                                    <p>تاریخچه‌ای برای نمایش وجود ندارد</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* بخش غیرفعال/کنسل شده */}
                <div className="w-full flex flex-col gap-4">
                    <FormLabel text="اشتراک‌های تمام و کنسل شده" />
                    {inactiveOrCancelled.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {inactiveOrCancelled.map(enroll => (
                                <ClassButton
                                    key={enroll.id}
                                    admin={true}
                                    enrollment={enroll}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center ">
                            <div className="flex flex-col items-center gap-3 bg-bgInput p-4 border border-textPrimary/20 rounded-xl desktop:w-1/2">
                                <div className="flex items-center gap-3 text-textPrimary/30">
                                    <Icons
                                        name="notFound"
                                        className="text-[25px]"
                                    />
                                    <p>تاریخچه‌ای برای نمایش وجود ندارد</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
