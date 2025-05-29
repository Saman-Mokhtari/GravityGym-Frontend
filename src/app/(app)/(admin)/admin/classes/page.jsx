'use client'

import { useEffect, useState } from 'react'
import PageTitle from '@/components/PageTitle'
import Icons from '@/components/Icons'
import Link from 'next/link'
import { useClass } from '@/hooks/class'
import FormLabel from '@/components/FormLabel'
import ClassSelect from '@/components/ClassSelect'
import { useNavigationTitle } from '@/context/NavigationTitleContext'

export default function Classes() {
    const { classes } = useClass()
    const [searchText, setSearchText] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [, setIsSearching] = useState(false)
    const [filteredClasses, setFilteredClasses] = useState([])
    const { setTitle } = useNavigationTitle()

    useEffect(() => {
        setTitle('کلاس‌ها')
    }, [])
    useEffect(() => {
        setIsSearching(true)
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchText)
            setIsSearching(false)
        }, 600)
        return () => clearTimeout(timeout)
    }, [searchText])

    // Filter classes
    useEffect(() => {
        if (!classes) return
        const filtered = classes.filter(cls =>
            cls.name?.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )

        setFilteredClasses(filtered)
    }, [debouncedSearch, classes])

    return (
        <div className="flex flex-col gap-6">
            <PageTitle firstLine="مدیریت" secondLine="کلاس‌ها" />
            <Link href="/admin/classes/create">
                <div className="flex items-center gap-2 text-success font-medium">
                    <Icons name="plus" />
                    <p>افزودن کلاس جدید</p>
                </div>
            </Link>

            {/* Search input */}
            <form action="" className="flex flex-col w-full">
                <div className="relative flex w-full">
                    <input
                        className="rounded-md w-full border border-border placeholder-textSecondary py-5 px-4"
                        type="text"
                        placeholder="به دنبال چه کلاسی هستید؟"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <Icons
                        name="search"
                        className="text-textSecondary text-[20px] absolute left-4 top-1/2 -translate-y-1/2"
                    />
                </div>
            </form>

            {/* Filtered class list */}
            <div className="w-full flex flex-col gap-1">
                <FormLabel text="کلاس‌ها" />
                {Array.isArray(classes) && classes.length !== 0 ? (
                    <div className="w-full flex flex-col gap-4">
                        {(filteredClasses.length > 0
                            ? filteredClasses
                            : classes
                        )?.map(cls => (
                            <ClassSelect key={cls.id} cls={cls} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center mt-4">
                        <div className="flex flex-col items-center gap-3 bg-bgInput p-4 border border-textPrimary/20 rounded-xl desktop:w-1/2">
                            <div className="flex items-center gap-3 text-textPrimary/30">
                                <Icons
                                    name="notFound"
                                    className="text-[25px]"
                                />
                                <p>کلاسی برای نمایش وجود ندارد</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
