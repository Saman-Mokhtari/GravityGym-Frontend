'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSubscription } from '@/hooks/subscription'
import FormLabel from '@/components/FormLabel'
import InformationCell from '@/components/InformationCell'
import { useTranslator } from '@/hooks/translator'
import UserSelect from '@/components/UserSelect'
import { Toaster } from 'react-hot-toast'
import { useUser } from '@/hooks/user'
import { useNavigationTitle } from '@/context/NavigationTitleContext'

export default function Main() {
    const { subscription } = useSubscription()
    const params = useParams()
    const { data: selectedSub } = subscription(params?.subId)
    const { persianDays, subscriptionStatus } = useTranslator()
    const { users } = useUser()
    const [, setNewUsers] = useState(null)
    const { setTitle } = useNavigationTitle()

    useEffect(() => {
        if (users && selectedSub) {
            setTitle(
                `اشتراک ${selectedSub?.sub_name} -  ${selectedSub?.class?.name}`,
            )
            const enrolledIds = selectedSub?.enrollments
                ?.filter(
                    enroll =>
                        !['cancelled', 'expired'].includes(enroll?.status),
                )
                ?.map(enroll => enroll?.userInfo?.id)

            const filteredUsers = users.filter(user => {
                return !enrolledIds.includes(user?.id)
            })

            setNewUsers(filteredUsers)
        }
    }, [users, selectedSub])

    return (
        <div className="w-full flex flex-col gap-6">
            <Toaster />
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex items-center justify-between">
                    <FormLabel text="مشخصات اشتراک" />
                </div>
                <div className="w-full grid grid-cols-2 desktop:grid-cols-2 flex-col gap-6">
                    <InformationCell
                        title="نام اشتراک"
                        data={selectedSub?.sub_name}
                    />
                    <InformationCell
                        title="نوع کلاس"
                        data={selectedSub?.class_type}
                    />
                    <InformationCell
                        title="روزهای"
                        data={selectedSub?.class_days
                            .map(day => persianDays[day])
                            .join('، ')}
                    />
                    <InformationCell
                        title="نام مربی"
                        data={selectedSub?.instructor}
                    />
                    <InformationCell
                        title="ساعت کلاس"
                        data={`${selectedSub?.start_time} تا ${selectedSub?.end_time}`}
                    />
                    <InformationCell
                        title="تعداد جلسات اشتراک"
                        data={`${selectedSub?.session_count} جلسه در ${selectedSub?.duration_value} ${selectedSub?.duration_unit}`}
                    />
                    <InformationCell
                        title="وضعیت کلاس"
                        data={subscriptionStatus[selectedSub?.is_active]}
                    />
                    <InformationCell
                        title="قیمت اشتراک"
                        data={`${(selectedSub?.price * 1000000).toLocaleString()} تومانء`}
                        dataClassName="!text-success !font-bold"
                    />
                </div>
            </div>

            {/*Active Enrollments*/}
            <div className="w-full flex flex-col gap-2 mt-3 ">
                <div className="w-full flex items-center justify-between">
                    <FormLabel text="اعضای کلاس" />
                </div>

                {selectedSub?.enrollments?.filter(
                    e => !['cancelled', 'expired'].includes(e.status),
                ).length === 0 && (
                    <div className="w-full flex items-center justify-center text-center p-4 rounded-xl ">
                        <div className="flex flex-col gap-2 items-center">
                            <p className="text-[18px] font-medium">
                                وزرشکاری در این کلاس وجود ندارد!
                            </p>
                        </div>
                    </div>
                )}
                <div className="w-full flex flex-col gap-1">
                    {selectedSub?.enrollments
                        ?.filter(
                            enroll =>
                                !['cancelled', 'expired'].includes(
                                    enroll?.status,
                                ),
                        )
                        ?.map(enroll => (
                            <div
                                key={enroll?.id}
                                className="w-full flex items-center gap-2">
                                <UserSelect
                                    user={enroll?.userInfo}
                                    canDelete={false}
                                    enroll_id={enroll?.id}
                                    sub_id={params?.subId}
                                />
                            </div>
                        ))}
                </div>
            </div>

            {/*InActive Enrollments*/}
            <div className="w-full flex flex-col gap-2 mt-3 ">
                <div className="w-full flex items-center justify-between">
                    <FormLabel text="تاریخچه اعضای ثبت‌نام‌ شده" />
                </div>

                {selectedSub?.enrollments?.filter(e =>
                    ['cancelled', 'expired'].includes(e.status),
                ).length === 0 && (
                    <div className="w-full flex items-center justify-center text-center p-4 rounded-xl ">
                        <div className="flex flex-col gap-2 items-center">
                            <p className="text-[18px] font-medium">
                                وزرشکاری در این کلاس وجود ندارد!
                            </p>
                        </div>
                    </div>
                )}
                <div className="w-full flex flex-col gap-1">
                    {selectedSub?.enrollments
                        ?.filter(enroll =>
                            ['cancelled', 'expired'].includes(enroll?.status),
                        )
                        ?.map(enroll => (
                            <div
                                key={enroll?.id}
                                className="w-full flex items-center gap-2">
                                <UserSelect
                                    user={enroll?.userInfo}
                                    canDelete={false}
                                    enroll_id={enroll?.id}
                                    sub_id={params?.subId}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
