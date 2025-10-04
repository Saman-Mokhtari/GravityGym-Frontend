'use client'
import FormLabel from '@/components/FormLabel'
import PageTitle from '@/components/PageTitle'
import StatsCard from '@/components/StatsCard'
import TransactionCard from '@/components/TransactionCard'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Main() {
    const { setTitle } = useNavigationTitle()

    useEffect(() => {
        setTitle('مدیریت مالی')
    }, [])

    const datetime = {
        date: '1403/12/12',
        clock: '12:42',
    }

    return (
        <div className="flex flex-col gap-6">
            <PageTitle firstLine="مدیریت" secondLine="مالی" />

            {/* Overall, monthly and weekly financial overview */}
            <div className="w-full flex flex-col gap-2">
                <FormLabel text="خلاصه‌ای از مالی" />
                <StatsCard title="درآمد کل">
                    <div className="text-green-500 font-semibold flex gap-1 items-center text-[18px]">
                        <p>{(80000000).toLocaleString()}</p>
                        <p>تومانءء</p>
                    </div>
                </StatsCard>
                <div className="w-full flex items-center gap-1">
                    <StatsCard title="درآمد این هفته">
                        <div className="text-green-500 font-semibold flex gap-1 items-center text-[18px]">
                            <p>{(80000000).toLocaleString()}</p>
                            <p>تومانءء</p>
                        </div>
                    </StatsCard>
                    <StatsCard title="درآمد این ماه">
                        <div className="text-green-500 font-semibold flex gap-1 items-center text-[18px]">
                            <p>{(80000000).toLocaleString()}</p>
                            <p>تومانءء</p>
                        </div>
                    </StatsCard>
                </div>
            </div>

            {/* Subscriptions overview */}
            <div className="w-full flex flex-col gap-2">
                <FormLabel text="خلاصه‌ای از اشتراک‌ها" />
                <div className="w-full flex items-center gap-1">
                    <StatsCard title="اشتراک‌های فعال">
                        <div className="font-light flex gap-1 items-center text-[18px]">
                            <p>240</p>
                        </div>
                    </StatsCard>
                    <StatsCard title="در انتظار تمدید">
                        <div className="font-light flex gap-1 items-center text-[18px]">
                            <p>12</p>
                        </div>
                    </StatsCard>
                </div>
            </div>

            {/* Latest five transactions */}
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-between gap-2 items-center">
                    <FormLabel text="آخرین تراکنش‌ها" />
                    <div className="flex items-center justify-center p-2 ">
                        <Link href="/admin/finance/history">
                            <p className="text-blue-500">مشاهده همه</p>
                        </Link>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-6">
                    <TransactionCard
                        name={'سامان مختاری'}
                        datetime={datetime}
                        price={8000000}
                    />
                    <TransactionCard
                        name={'سامان مختاری'}
                        datetime={datetime}
                        price={8000000}
                    />
                    <TransactionCard
                        name={'سامان مختاری'}
                        datetime={datetime}
                        price={8000000}
                    />
                </div>
            </div>
        </div>
    )
}
