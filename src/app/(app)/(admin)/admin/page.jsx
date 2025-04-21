'use client'
import FormLabel from '@/components/FormLabel'
import StatsCard from '@/components/StatsCard'
import { useAuth } from '@/hooks/auth'
import { useSubscription } from '@/hooks/subscription'
import { useClass } from '@/hooks/class'
import { usePayment } from '@/hooks/payment'

const Dashboard = () => {
    const { users } = useAuth()
    const { active: subscriptions } = useSubscription()
    const { classes } = useClass()
    const { payments } = usePayment()
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
    const oneMonthAgo = new Date()
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const weekPaymentsTotal = payments
        .filter(payment => new Date(payment.created_at) >= oneWeekAgo)
        .reduce((sum, payment) => sum + payment.amount, 0)
    const monthPaymentsTotal = payments
        .filter(payment => new Date(payment.created_at) >= oneMonthAgo)
        .reduce((sum, payment) => sum + payment.amount, 0)

    return (
        <div className="w-full flex justify-center flex-col gap-6">
            <div className="w-full flex flex-col gap-4">
                <FormLabel text="باشگاه در یک نگاه" />
                <div className="w-full flex items-center flex-wrap justify-between gap-y-6 ">
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
                            {weekPaymentsTotal.toLocaleString()} تومانءء
                        </p>
                    </StatsCard>
                    <StatsCard
                        title="درآمد این ماه"
                        className="!desktop:w-1/2 !w-full">
                        <p className="text-success font-bold">
                            {monthPaymentsTotal.toLocaleString()} تومانءء
                        </p>
                    </StatsCard>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
