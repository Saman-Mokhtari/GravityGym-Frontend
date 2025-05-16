'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/hooks/user'
import { useTranslator } from '@/hooks/translator'
import FormLabel from '@/components/FormLabel'
import ClassButton from '@/components/ClassButton'
import InformationCell from '@/components/InformationCell'

export default function User() {
    const [errors, setErrors] = useState([])
    const [enrollment, setEnrollment] = useState(null)
    const [userData, setUserData] = useState(null)
    const { persianRoles } = useTranslator()
    const { user } = useUser()
    const params = useParams()
    useEffect(() => {
        if (params?.userId) {
            const fetchUser = async () => {
                try {
                    await user({
                        user_id: params?.userId,
                        setUserData,
                    })
                } catch (error) {
                    setErrors(error)
                }
            }
            fetchUser()
        }
    }, [params.userId])

    return (
        <div className="w-full flex flex-col gap-6 mt-2">
            <div className="w-full flex items-center justify-between ">
                <div className="w-full flex flex-col gap-3">
                    <FormLabel text="مشخصات کاربر" />
                    <div className="grid grid-cols-2 gap-4">
                        <InformationCell
                            title="نام و نام خانوادگی"
                            data={userData?.name}
                        />
                        <InformationCell
                            title="نقش فرد"
                            data={persianRoles[userData?.role]}
                        />
                        <InformationCell
                            title="تاریخ تولد"
                            data={userData?.birthdate}
                        />
                        {/*<div className="flex flex-col gap-2 ">*/}
                        {/*    <h2 className="text-[18px] font-medium">عضویت</h2>*/}
                        {/*    <p className="text-[18px] font-light text-textSecondary">*/}
                        {/*        {Math.floor(userData?.created_since['year']) === 0 ?*/}
                        {/*            Math.floor(userData?.created_since['month']) === 0 ? "عضو جدید" : }*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <InformationCell title="قد" data={userData?.height} />
                        <InformationCell title="وزن" data={userData?.weight} />
                        {userData?.disabilities && (
                            <div className="flex flex-col gap-2 ">
                                <h2 className="text-[18px] font-medium">
                                    مشکلات پزشکی
                                </h2>
                                {userData?.disabilities.map(disable => (
                                    <p
                                        key={Math.random()}
                                        className="text-[18px] font-light text-textSecondary">
                                        {disable}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-2">
                <FormLabel text="اشتراک‌ها" />
                <div className="w-full flex flex-col gap-2">
                    {Array.isArray(userData?.enrollments) &&
                        userData?.enrollments.map(enroll => (
                            <ClassButton
                                admin={true}
                                key={enroll?.id}
                                enrollment={enroll}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}
