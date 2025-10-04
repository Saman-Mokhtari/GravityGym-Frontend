'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import PageTitle from '@/components/PageTitle'
import TransactionCard from '@/components/TransactionCard'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { useEffect, useState } from 'react'

export default function Main() {
    const [searchText, setSearchText] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [shownUsers, setShownUsers] = useState(null)
    const {setTitle} = useNavigationTitle()

    useEffect(() => {
        setTitle("تاریخچه تراکنش‌ها")
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
        if (debouncedSearch) setShownUsers(debouncedSearch)
    }, [debouncedSearch])

    return (
        <div className="w-full flex flex-col gap-6">
            <PageTitle firstLine="تاریخچه" secondLine="تراکنش‌ها" />

            <form action="" className="flex flex-col w-full gap-4">
                <div className="relative flex w-full">
                    <input
                        className="rounded-md w-full border border-border placeholder-textSecondary py-5"
                        type="text"
                        placeholder="به دنبال تراکنش چه شخصی هستید؟"
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
            </form>

            <div className="w-full flex flex-col gap-7 mt-3">
                <div className="w-full flex flex-col gap-3 ">
                    <FormLabel text="12 اردیبهشت 1403" />
                    <TransactionCard
                        name="سامان مختاری"
                        datetime={{ clock: '12:12' }}
                        price={10000000}
                    />
                    <TransactionCard
                        name="سامان مختاری"
                        datetime={{ clock: '12:12' }}
                        price={10000000}
                    />

                    <TransactionCard
                        name="سامان مختاری"
                        datetime={{ clock: '12:12' }}
                        price={10000000}
                    />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <FormLabel text="12 اردیبهشت 1403" />
                    <TransactionCard
                        name="سامان مختاری"
                        datetime={{ clock: '12:12' }}
                        price={10000000}
                    />
                    <TransactionCard
                        name="سامان مختاری"
                        datetime={{ clock: '12:12' }}
                        price={10000000}
                    />

                    <TransactionCard
                        name="سامان مختاری"
                        datetime={{ clock: '12:12' }}
                        price={10000000}
                    />
                </div>
            </div>
        </div>
    )
}
