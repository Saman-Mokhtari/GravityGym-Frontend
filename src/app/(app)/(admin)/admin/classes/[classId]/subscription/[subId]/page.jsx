'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSubscription } from '@/hooks/subscription'
import FormLabel from '@/components/FormLabel'
import InformationCell from '@/components/InformationCell'
import { useTranslator } from '@/hooks/translator'
import Link from 'next/link'
import Icons from '@/components/Icons'
import UserSelect from '@/components/UserSelect'
import { toast, Toaster } from 'react-hot-toast'
import Tippy from '@tippyjs/react'
import { useEnrollments } from '@/hooks/enrollment'
import Select from 'react-select'
import { useUser } from '@/hooks/user'
import { useNavigationTitle } from '@/context/NavigationTitleContext'

export default function Main() {
    const { subscription } = useSubscription()
    const router = useRouter()
    const [, setErrors] = useState(null)
    const params = useParams()
    const { data: selectedSub } = subscription(params?.subId)
    const { persianDays, subscriptionStatus, persianRoles } = useTranslator()
    const [isManaging, setIsManaging] = useState(false)
    const [isConfirmingSubDelete, setIsConfirmingSubDelete] = useState(false)
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
    const [selectedEnrollments, setSelectedEnrollments] = useState([])
    const [selectedUsers, setSelectedUsers] = useState(null)
    const { users } = useUser()
    const { blkCancel, create, loading, cancel } = useEnrollments()
    const [newUsers, setNewUsers] = useState(null)
    const selectRef = useRef()
    const [subDeleted, setSubDeleted] = useState(false)
    const { deleteSub } = useSubscription()
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
    const toggleSelect = id => {
        setSelectedEnrollments(prev => {
            if (prev.includes(id)) {
                return prev.filter(eId => eId !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    const handleDelete = async (user, enroll_id, sub_id) => {
        setIsConfirmingDelete(false)
        try {
            await cancel({
                sub_id: sub_id,
                enroll_id: enroll_id,
                setErrors,
            })
            // if (onUserDelete) onUserDelete(user?.id)
            toast.success('کاربر با موفقیت حذف شد.')
        } catch (error) {
            setErrors(error)
        }
    }

    const toggleSelectAll = () => {
        const validEnrollments = selectedSub?.enrollments?.filter(
            enroll => !['cancelled', 'expired'].includes(enroll?.status),
        )
        const allIds = validEnrollments.map(enroll => enroll.id)

        setSelectedEnrollments(prev =>
            prev.length === allIds.length ? [] : allIds,
        )
    }
    const userDeletionToast = () =>
        toast.success('کاربران با موفقیت حذف شدند', { duration: 2000 })

    const userAddedToast = () => {
        toast.success('کاربران با موفقیت اضافه شدند', { duration: 2000 })
    }
    const handleMultiDelete = () => {
        const multiCancel = async () => {
            try {
                await blkCancel({
                    enrollment_ids: selectedEnrollments,
                    sub_id: params?.subId,
                    setErrors,
                    userDeletionToast,
                })

                setSelectedEnrollments([])
                setIsConfirmingDelete(false)
                setIsManaging(false)
            } catch (e) {
                setErrors(prevErrors => ({ ...prevErrors, e }))
            }
        }
        multiCancel()
    }

    const handleAddingUser = e => {
        e.preventDefault()
        const createEnrollment = async () => {
            try {
                await create({
                    userAddedToast,
                    setErrors,
                    sub_id: selectedSub?.id,
                    users_id: selectedUsers
                        .filter(selectedUser => selectedUser?.id)
                        .map(selectedUser => selectedUser?.id),
                })

                // پاک کردن فرم انتخاب
                setSelectedUsers(null)
                selectRef.current?.clearValue()
            } catch (error) {
                setErrors(...prev => ({ ...prev, error }))
            }
        }
        createEnrollment()
    }

    const handleSubDelete = async () => {
        setIsConfirmingSubDelete(false)
        try {
            await deleteSub({ setSubDeleted, setErrors, sub_id: params?.subId })
        } catch (errors) {
            setErrors(prev => [prev, errors])
        }
    }

    useEffect(() => {
        if (subDeleted) {
            toast.success('اشتراک با موفقیت حذف شد!')
            const timeOut = setTimeout(() => {
                router.push(`/admin/classes/${params?.classId}`)
            }, 2000)

            return () => {
                clearTimeout(timeOut)
            }
        }
    }, [subDeleted])

    return (
        <div className="w-full flex flex-col gap-6">
            <Toaster />
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex items-center justify-between">
                    <FormLabel text="مشخصات اشتراک" />
                    <Link
                        href={`/admin/classes/${params?.classId}/subscription/${params?.subId}/edit`}
                        className="text-blue-500 flex items-center gap-2 ml-4 hover:scale-105 transition-all">
                        <Icons name="edit" className="text-[16px]" />
                        <p className="text-[16px]">ویرایش اشتراک</p>
                    </Link>
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
                    <div className="w-fit flex items-center justify-start">
                        <Tippy
                            asChild
                            visible={isConfirmingSubDelete ? true : undefined} // فقط در حالت true فعال می‌کنه
                            trigger={
                                isConfirmingSubDelete
                                    ? 'manual'
                                    : 'mouseenter focus'
                            } // در حالت false عادی باشه
                            onClickOutside={() =>
                                setIsConfirmingSubDelete(false)
                            }
                            interactive={true}
                            placement="top"
                            theme="light-border"
                            className="!col-span-1 !w-fit"
                            arrow={false}
                            content={
                                isConfirmingSubDelete ? (
                                    <div className="text-center p-2">
                                        <p className="text-sm mb-2">
                                            آیا مطمئن هستید؟
                                        </p>
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={handleSubDelete}
                                                className="text-white bg-red-800 hover:bg-red-900 px-3 py-1 rounded text-sm">
                                                حذف
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setIsConfirmingSubDelete(
                                                        false,
                                                    )
                                                }
                                                className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
                                                لغو
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    'حذف اشتراک'
                                )
                            }>
                            <div
                                onClick={() => {
                                    setIsConfirmingDelete(true)
                                }}
                                className="group p-1 cursor-pointer">
                                <div
                                    onClick={() => {
                                        setIsConfirmingSubDelete(true)
                                    }}
                                    className="px-4 py-2 w-fit flex items-center group gap-3 flex-row-reverse text-error border border-error rounded-md hover:bg-error hover:text-bgPrimary transition-all">
                                    <p>حذف اشتراک</p>
                                    <Icons
                                        name="trash"
                                        className="text-[20px] text-error group-hover:font-black group-hover:text-bgPrimary"
                                    />
                                </div>
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-2 ">
                <div className="w-full flex items-center justify-between">
                    <FormLabel text="اعضای کلاس" />
                    {selectedSub?.enrollments?.filter(
                        e => !['cancelled', 'expired'].includes(e.status),
                    ).length !== 0 && (
                        <div
                            onClick={() => setIsManaging(prev => !prev)}
                            className={`flex justify-center items-center gap-2 w-[12rem] py-2  border border-textPrimary  rounded-lg   transition-all duration-200 cursor-pointer ${isManaging ? 'bg-textPrimary text-bgPrimary hover:bg-bgPrimary hover:border-textPrimary hover:text-textPrimary' : 'bg-bgPrimary text-textPrimary hover:text-white hover:bg-textPrimary'}`}>
                            <Icons
                                name={isManaging ? 'close' : 'settings'}
                                className="transition-transform duration-200 group-hover:rotate-90"
                            />
                            <p className="text-sm font-medium">
                                {isManaging
                                    ? 'لغو مدیریت'
                                    : 'مدیریت اعضای کلاس'}
                            </p>
                        </div>
                    )}
                </div>
                {isManaging && (
                    <div className="w-full p-2 mt-3 flex flex-col gap-4 desktop:flex items-start desktop:items-center justify-between">
                        <p className="text-[18px] font-medium">
                            تعداد اعضای انتخاب شده: {selectedEnrollments.length}{' '}
                            نفر
                        </p>
                        <Tippy
                            content={
                                selectedEnrollments.length === 0 ? (
                                    'کاربری انتخاب نشده'
                                ) : isConfirmingDelete ? (
                                    <div className="text-center p-2">
                                        <p className="text-sm mb-2">
                                            آیا مطمئن هستید؟
                                        </p>
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={handleMultiDelete}
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
                                    'حذف کاربران از دوره'
                                )
                            }
                            visible={isConfirmingDelete ? true : undefined}
                            trigger={
                                isConfirmingDelete
                                    ? 'manual'
                                    : 'mouseenter focus'
                            }
                            onClickOutside={() => setIsConfirmingDelete(false)}
                            interactive={true}
                            placement="bottom"
                            theme="light-border"
                            className="font-font text-[18px] !bg-textPrimary">
                            <div
                                onClick={() => {
                                    if (selectedEnrollments.length !== 0)
                                        setIsConfirmingDelete(true)
                                }}
                                className={`flex items-center gap-2 hover:scale-105 transition-all hover:cursor-pointer ${selectedEnrollments.length === 0 ? 'text-red-300' : 'text-error'}`}>
                                <Icons name="trash" />
                                <p>حذف افراد انتخاب شده</p>
                            </div>
                        </Tippy>
                    </div>
                )}
                {selectedSub?.enrollments?.filter(
                    e => !['cancelled', 'expired'].includes(e.status),
                ).length === 0 && (
                    <div className="w-full flex items-center justify-center text-center p-4      rounded-xl mt-2">
                        <div className="flex flex-col gap-2 items-center">
                            <p className="text-[18px] font-medium">
                                ورزشکاری در این کلاس وجود ندارد!
                            </p>
                        </div>
                    </div>
                )}
                <div className="w-full flex flex-col gap-1">
                    {isManaging && (
                        <form action="">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    onChange={toggleSelectAll}
                                    checked={
                                        selectedEnrollments.length ===
                                        selectedSub?.enrollments?.filter(
                                            enroll =>
                                                ![
                                                    'cancelled',
                                                    'expired',
                                                ].includes(enroll?.status),
                                        )?.length
                                    }
                                    type="checkbox"
                                    className="h-5 w-5 hover:cursor-pointer accent-textPrimary border-2 border-textSecondary rounded focus:ring-2 transition"
                                />
                                <span className="text-md text-textPrimary">
                                    انتخاب همه
                                </span>
                            </label>
                        </form>
                    )}
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
                                {isManaging && (
                                    <form action="#">
                                        <input
                                            checked={selectedEnrollments.includes(
                                                enroll.id,
                                            )}
                                            onChange={() =>
                                                toggleSelect(enroll.id)
                                            }
                                            type="checkbox"
                                            className="h-5 w-5 hover:cursor-pointer accent-textPrimary border-2 border-textSecondary rounded focus:ring-2 focus:ring-offset-1 focus:ring-textPrimary transition"
                                        />
                                    </form>
                                )}
                                <UserSelect
                                    user={enroll?.userInfo}
                                    canDelete={true}
                                    enroll_id={enroll?.id}
                                    handleDelete={handleDelete}
                                    sub_id={params?.subId}
                                    // onUserDelete={removeUserFromList}
                                />
                            </div>
                        ))}
                </div>

                <form
                    onSubmit={handleAddingUser}
                    className="flex justify-between gap-3 w-full">
                    <div className="w-full flex gap-6 desktop:gap-2 flex-col desktop:flex-row">
                        <Select
                            className="w-full"
                            isClearable
                            placeholder="افزودن عضو جدید"
                            closeMenuOnSelect={false}
                            portal
                            isMulti
                            menuPlacement="top"
                            ref={selectRef}
                            onChange={selected =>
                                setSelectedUsers(
                                    selected?.map(s => s.data) || [],
                                )
                            }
                            options={
                                Array.isArray(newUsers)
                                    ? [...newUsers]
                                          .sort((a, b) => {
                                              const rolePriority = {
                                                  athlete: 1,
                                                  superUser: 2,
                                                  manager: 3,
                                                  admin: 4,
                                              }
                                              const aPriority =
                                                  rolePriority[a.role] || 999
                                              const bPriority =
                                                  rolePriority[b.role] || 999
                                              return aPriority - bPriority
                                          })
                                          .map(user => ({
                                              value: user?.id,
                                              label: `${user?.name} (${persianRoles[user?.role]})`,
                                              data: user,
                                          }))
                                    : []
                            }
                            styles={{
                                control: base => ({
                                    ...base,
                                    minHeight: '48px',
                                }),
                            }}
                        />

                        <button
                            disabled={!selectedUsers}
                            className="min-h-[48px] rounded-md hover:scale-95 disabled:cursor-not-allowed hover:bg-textPrimary/70 transition-all text-bgPrimary bg-textPrimary w-full desktop:w-[12rem]">
                            {loading ? (
                                <Icons
                                    name="loadingSpinner"
                                    className="animate-spin text-[20px]"
                                />
                            ) : (
                                'افزودن'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
