'use client'
import PageTitle from '@/components/PageTitle'
import Icons from '@/components/Icons'
import Link from 'next/link'
import FormLabel from '@/components/FormLabel'
import { useClass } from '@/hooks/class'
import { useEffect, useState } from 'react'
import UserSelect from '@/components/UserSelect'
import { useUser } from '@/hooks/user'
import Select from 'react-select'
import { toast } from 'react-hot-toast'
import { useNavigationTitle } from '@/context/NavigationTitleContext'

export default function Main() {
    const { classes } = useClass()
    const { users: allUsers, deleteUser } = useUser()

    const [shownUsers, setShownUsers] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [userDeleted, setUserDeleted] = useState(false)
    const [filteredClass, setFilteredClass] = useState(null)
    const [, setErrors] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)
    const { setTitle } = useNavigationTitle()
    const roleOptions = [
        { value: 'admin', label: 'ادمین' },
        { value: 'superUser', label: 'سوپر ادمین' },
        { value: 'instructor', label: 'مربی' },
        { value: 'athlete', label: 'ورزشکار' },
    ]

    useEffect(() => {
        if (allUsers) setShownUsers(allUsers)
    }, [allUsers])

    useEffect(() => {
        setTitle('مدیریت اعضای باشگاه')
    }, [])

    useEffect(() => {
        setIsSearching(true)
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchText)
            setIsSearching(false)
        }, 600)
        return () => clearTimeout(timeout)
    }, [searchText])

    useEffect(() => {
        if (!allUsers) return

        let filtered = [...allUsers]

        if (debouncedSearch) {
            filtered = filtered.filter(user =>
                user.name
                    ?.toLowerCase()
                    .includes(debouncedSearch.toLowerCase()),
            )
        }

        if (selectedRole) {
            filtered = filtered.filter(user => user.role === selectedRole.value)
        }

        if (filteredClass) {
            const className = filteredClass.label
            filtered = filtered.filter(user => {
                if (user.role === 'instructor') {
                    return user.subscriptions?.some(
                        cls => cls?.class?.name === className,
                    )
                }
                if (user.role === 'athlete') {
                    return user.enrollments?.some(
                        enroll =>
                            enroll?.subscription?.class?.name === className,
                    )
                }
                return false
            })
        }

        setShownUsers(filtered)
    }, [debouncedSearch, selectedRole, filteredClass, allUsers])

    useEffect(() => {
        if (userDeleted) toast.success('کاربر با موفقیت حذف شد!')
    }, [userDeleted])

    const handleDelete = async user => {
        try {
            await deleteUser({ setUserDeleted, setErrors, userId: user?.id })
        } catch (errors) {
            setErrors(prev => [prev, errors])
        }
    }

    return (
        <div className="flex flex-col gap-6 pb-16">
            <PageTitle firstLine="مدیریت" secondLine="ورزشکارها و مربیان" />
            <Link
                href="/admin/users/create"
                className="transition-all flex items-center gap-2 group text-success">
                <Icons
                    name="plus"
                    className="group-hover:rotate-90 transition-all"
                />
                <p className="hover:scale-105 transition-all">
                    افزودن عضو جدید
                </p>
            </Link>

            <form action="" className="flex flex-col w-full gap-4">
                <div className="relative flex w-full">
                    <input
                        className="rounded-md w-full border border-border placeholder-textSecondary py-5"
                        type="text"
                        placeholder="به دنبال چه شخصی هستید؟"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                    {!isSearching ? (
                        <Icons
                            name="search"
                            className="text-textSecondary text-[20px] absolute left-4 top-1/2 -translate-y-1/2"
                        />
                    ) : (
                        <div className="text-textSecondary items-center text-[20px] absolute left-4 top-1/2 -translate-y-1/2">
                            <Icons
                                name="loadingSpinner"
                                className="animate-spin text-[24px]"
                            />
                        </div>
                    )}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <FormLabel text="فیلتر بر اساس" />
                    <div className="flex gap-3">
                        {/* فیلتر کلاس */}
                        <Select
                            className="w-1/2 desktop:w-1/3"
                            isClearable
                            isSearchable={false}
                            placeholder="کلاس"
                            options={
                                Array.isArray(classes)
                                    ? classes.map(cls => ({
                                          value: cls.id,
                                          label: cls.name,
                                      }))
                                    : []
                            }
                            value={filteredClass}
                            onChange={setFilteredClass}
                            menuPortalTarget={
                                typeof window !== 'undefined'
                                    ? document.body
                                    : null
                            }
                            menuPosition="fixed"
                            styles={{
                                control: base => ({
                                    ...base,
                                    minHeight: '48px',
                                    fontFamily: 'iransans',
                                }),
                                menuPortal: base => ({
                                    ...base,
                                    direction: 'rtl',
                                    zIndex: 9999,
                                    fontFamily: 'iransans',
                                }),
                            }}
                        />

                        {/* فیلتر نقش */}
                        <Select
                            className="w-1/2 desktop:w-1/3"
                            isClearable
                            isSearchable={false}
                            placeholder="نقش"
                            options={roleOptions}
                            value={selectedRole}
                            onChange={setSelectedRole}
                            menuPortalTarget={
                                typeof window !== 'undefined'
                                    ? document.body
                                    : null
                            }
                            menuPosition="fixed"
                            styles={{
                                control: base => ({
                                    ...base,
                                    minHeight: '48px',
                                    fontFamily: 'iransans',
                                }),
                                menuPortal: base => ({
                                    ...base,
                                    direction: 'rtl',
                                    zIndex: 9999,
                                    fontFamily: 'iransans',
                                }),
                            }}
                        />
                    </div>
                </div>
            </form>

            <div className="w-full flex flex-col gap-1 mt-4">
                {Array.isArray(shownUsers) &&
                    shownUsers.map(user => (
                        <UserSelect
                            key={user.id}
                            user={user}
                            canDelete={true}
                            handleDelete={handleDelete}
                        />
                    ))}
            </div>
        </div>
    )
}
