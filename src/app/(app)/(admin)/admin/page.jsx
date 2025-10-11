'use client'
import FormLabel from '@/components/FormLabel'
import StatsCard from '@/components/StatsCard'
import { useAuth } from '@/hooks/auth'
import { useSubscription } from '@/hooks/subscription'
import { useClass } from '@/hooks/class'
import { usePayment } from '@/hooks/payment'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { useEffect, useState } from 'react'

const Dashboard = () => {
    const { users } = useAuth()
    const { active: subscriptions } = useSubscription()
    const { classes } = useClass()
    const [filters] = useState({overview: true})
    const { payments } = usePayment(filters)
    const { setTitle } = useNavigationTitle()

    useEffect(() => {
        setTitle('در یک نگاه')
    }, [])
    // انتظار برای دریافت داده‌ها
    if (!users || !subscriptions || !classes || !payments) {
        return <div>در حال بارگذاری...</div>
    }

    // محاسبه تعدادها
    const athletesCount = users.filter(user => user.role === 'athlete').length
    const instructorsCount = users.filter(
        user => user.role === 'instructor',
    ).length
    const subscriptionsCount = subscriptions.length
    const classesCount = classes.length


    return (
        <div className="w-full flex justify-center flex-col gap-6 pb-10">
            <div className="w-full flex flex-col gap-4">
                <FormLabel text="باشگاه در یک نگاه" />
                <div className="grid grid-cols-2 items-center  gap-4 flex-wrap justify-between gap-y-6 ">
                    <StatsCard title="تعداد ورزشکاران">
                        {athletesCount} نفر
                    </StatsCard>
                    <StatsCard title="تعداد مربیان">
                        {instructorsCount} نفر
                    </StatsCard>
                    <StatsCard title="تعداد کلاس‌ها">
                        {classesCount} کلاس
                    </StatsCard>
                    <StatsCard title="تعداد اشتراک‌ها">
                        {subscriptionsCount} اشتراک
                    </StatsCard>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <FormLabel text="خلاصه‌ای از گزارش مالی" />
                <div className="w-full flex items-center flex-col desktop:flex-row justify-between gap-y-6 gap-4 flex-nowrap">
                    <StatsCard
                        title="درآمد این هفته"
                        className="!desktop:w-1/2 !w-full">
                        <p className="text-success font-bold">
                            {payments?.overview?.this_week_revenue?.toLocaleString()} تومانءء
                        </p>
                    </StatsCard>
                    <StatsCard
                        title="درآمد این ماه"
                        className="!desktop:w-1/2 !w-full">
                        <p className="text-success font-bold">
                            {payments?.overview?.this_month_revenue?.toLocaleString()} تومانءء
                        </p>
                    </StatsCard>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
