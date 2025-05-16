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

export default function Main() {
    const { classes } = useClass()
    const { users: allUsers } = useUser()

    const [shownUsers, setShownUsers] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    // فیلتر کلاس
    const [filteredClass, setFilteredClass] = useState(null)
    // فیلتر نقش
    const [selectedRole, setSelectedRole] = useState(null)

    // گزینه‌های نقش
    const roleOptions = [
        { value: 'admin', label: 'ادمین' },
        { value: 'superUser', label: 'سوپر یوزر' },
        { value: 'instructor', label: 'مربی' },
        { value: 'athlete', label: 'ورزشکار' },
    ]

    // تنظیم shownUsers اولیه
    useEffect(() => {
        if (allUsers) setShownUsers(allUsers)
    }, [allUsers])

    // debounce برای سرچ
    useEffect(() => {
        setIsSearching(true)
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchText)
            setIsSearching(false)
        }, 600)
        return () => clearTimeout(timeout)
    }, [searchText])

    // اعمال فیلترها
    useEffect(() => {
        if (!allUsers) return

        let filtered = [...allUsers]

        // جستجو بر اساس نام
        if (debouncedSearch) {
            filtered = filtered.filter(user =>
                user.name
                    ?.toLowerCase()
                    .includes(debouncedSearch.toLowerCase()),
            )
        }

        // فیلتر بر اساس نقش
        if (selectedRole) {
            filtered = filtered.filter(user => user.role === selectedRole.value)
        }

        // فیلتر بر اساس کلاس
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

    return (
        <div className="flex flex-col gap-6">
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
                    <div className="flex flex-wrap gap-3">
                        {/* فیلتر کلاس */}
                        <Select
                            className="w-full sm:w-1/2 desktop:w-1/3"
                            isClearable
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
                                }),
                                menuPortal: base => ({
                                    ...base,
                                    direction: 'rtl',
                                    zIndex: 9999,
                                }),
                            }}
                        />

                        {/* فیلتر نقش */}
                        <Select
                            className="w-full sm:w-1/2 desktop:w-1/3"
                            isClearable
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
                                }),
                                menuPortal: base => ({
                                    ...base,
                                    direction: 'rtl',
                                    zIndex: 9999,
                                }),
                            }}
                        />
                    </div>
                </div>
            </form>

            <div className="w-full flex flex-col gap-1 mt-4">
                {Array.isArray(shownUsers) &&
                    shownUsers.map(user => (
                        <UserSelect key={user.id} user={user} />
                    ))}
            </div>
        </div>
    )
}
