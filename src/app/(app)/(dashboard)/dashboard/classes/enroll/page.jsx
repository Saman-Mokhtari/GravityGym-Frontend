'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import useWindowSize from '@/hooks/useWindowSize'
import { useClass } from '@/hooks/class'
import { usePayment } from '@/hooks/payment'
import zarinpal from '/public/images/zarinpal.svg'
import ClassSelector from '@/components/ClassSelector'
import { useEnrollments } from '@/hooks/enrollment'

export default function Enroll() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selectedSub, setSelectedSub] = useState(null)
    const [errors, setErrors] = useState([])
    const { isDesktop } = useWindowSize()
    const { active: activeClasses } = useClass()
    const [interferedEnrollment, setInterferedEnrollment] = useState(false)
    const [limit, setLimit] = useState(false)
    const { active: activeEnrollments } = useEnrollments()
    const { pay, loading } = usePayment()
    useEffect(() => {
        if (selectedSub && activeEnrollments) {
            const activeEnrollment = activeEnrollments.filter(enrollment => {
                return (
                    enrollment.subscription.id === selectedSub.subscription.id
                )
            })
            const hasActiveEnrollment = !!activeEnrollment
            if (activeEnrollment.length === 1) {
                setInterferedEnrollment(hasActiveEnrollment)
            } else if (activeEnrollment.length > 1) {
                setLimit(true)
            }
        }
    }, [selectedSub])

    // Handles payment request to the server
    const handlePay = async event => {
        event.preventDefault()
        if (loading || !selectedSub) return
        try {
            await pay({
                description: selectedSub.subscription.description,
                amount: selectedSub.subscription.price * 1_000_000,
                subscription_id: selectedSub.subscription.id,
                setErrors,
            })
        } catch (error) {
            setErrors(formatPaymentError(error))
        }
    }

    // Main Component
    return (
        <div className="w-full flex flex-col pb-16 desktop:pb-24">
            <div className="w-full flex justify-between gap-8">
                <div className="w-full desktop:w-full flex flex-col gap-3">
                    <FormLabel text="کلاس مد نظر خود را انتخاب کنید" />
                    {/*Rendering Class Selector for both mobile and desktop*/}
                    <ClassSelector
                        isDesktop={isDesktop}
                        selectedSub={selectedSub}
                        setSelectedSub={setSelectedSub}
                        setDrawerIsOpen={setDrawerIsOpen}
                        setOpenModal={setOpenModal}
                        drawerIsOpen={drawerIsOpen}
                        openModal={openModal}
                        classes={activeClasses}
                    />
                </div>
                {/*Pay Button for desktop*/}
            </div>
            {/*Payment summary and mobile payment button*/}
            {selectedSub && (
                <div className="w-full flex flex-col gap-3 mt-4">
                    {interferedEnrollment && (
                        <div className="w-full flex items-center text-error font-bold leading-10">
                            <p>
                                توجه: شما در حال حاضر دارای اشتراک فعال برای
                                کلاس انتخابی خود هستید. در صورت ثبت‌نام در کلاس
                                جدید، کلاس رزرو شده و پس از پایان اشتراک فعلی،
                                به‌صورت خودکار فعال خواهد شد.{' '}
                            </p>
                        </div>
                    )}
                    {limit && (
                        <div className="w-full flex items-center text-error font-bold leading-10">
                            <p>
                                به دلیل داشتن اشتراک رزرو در این کلاس، امکان
                                خرید مجدد آن برای شما وجود ندارد.
                            </p>
                        </div>
                    )}
                    {!limit && (
                        <SubscriptionSummary
                            selectedSub={selectedSub}
                            isDesktop={isDesktop}
                            loading={loading}
                            handlePay={handlePay}
                            limit={limit}
                        />
                    )}
                    {!isDesktop && !limit && (
                        <PaymentBox
                            selectedSub={selectedSub}
                            loading={loading}
                            onPay={handlePay}
                            isMobile
                        />
                    )}
                </div>
            )}
        </div>
    )
}

// Split price 3 by 3 by comma
const formatToman = amount => `${amount.toLocaleString()} تومان`

const formatPaymentError = error => ({
    phone:
        error?.response?.status === 401
            ? ['Invalid credentials']
            : ['An unexpected error occurred'],
})

// Summary section
const SummarySection = ({ icon, label, children }) => (
    <div className="flex flex-col gap-2 ">
        <div className="flex items-center gap-2">
            <Icons name={icon} className="text-border" />
            <FormLabel text={label} />
        </div>
        <div className="text-black text-[18px] font-medium px-7">
            {children}
        </div>
    </div>
)

//Summary section container
const SubscriptionSummary = ({
    selectedSub,
    isDesktop,
    loading,
    handlePay,
    limit,
}) => (
    <div className="flex flex-col gap-6 desktop:gap-4 desktop:justify-center desktop:p-4 desktop:rounded-xl">
        <SummarySection icon="dumbleSolid" label="کلاس انتخاب شده">
            {selectedSub.name}
        </SummarySection>
        <SummarySection icon="clock" label="تاریخ و ساعت">
            روزهای {selectedSub.subscription.day_type} از ساعت{' '}
            {selectedSub.subscription.start_time} تا{' '}
            {selectedSub.subscription.end_time}
        </SummarySection>
        <SummarySection icon="calendar" label="تعداد جلسات">
            {selectedSub.subscription.session_count} جلسه در ماه (
            {selectedSub.subscription.session_count / 4} جلسه در هفته)
        </SummarySection>
        <SummarySection icon="trainer" label="مربی">
            {selectedSub.subscription.instructor_name}
        </SummarySection>
        <SummarySection icon="gateway" label="درگاه پرداخت">
            <Image src={zarinpal} alt="zarinpal" className="w-24" />
        </SummarySection>
        {isDesktop && !limit && (
            <PaymentBox
                selectedSub={selectedSub}
                loading={loading}
                onPay={handlePay}
            />
        )}
    </div>
)

// Payment button
const PaymentBox = ({ selectedSub, loading, onPay, isMobile = false }) => (
    <div
        className={`flex justify-between items-center ${
            isMobile
                ? 'w-full  fixed bottom-0 right-0 px-4 py-3 bg-success shadow-custom'
                : 'w-full desktop:w-full px-4 py-3 bg-success rounded-md shadow-custom'
        }`}>
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-bgPrimary">
                <Icons name="price" className="" />
                <FormLabel text="هزینه اشتراک" className="!text-bgPrimary" />
            </div>
            <p className="font-bold text-[18px] text-bgPrimary">
                {formatToman(selectedSub.subscription.price * 1_000_000)}
            </p>
        </div>
        <button
            onClick={onPay}
            disabled={loading}
            className="flex justify-center items-center bg-bgPrimary py-4 px-2 rounded-md w-6/12 desktop:w-3/12 hover:scale-[1.02] transition-all">
            {!loading ? (
                <p className="font-bold text-[18px] text-textSecondary">
                    پرداخت
                </p>
            ) : (
                <div className="flex items-center gap-2">
                    <Icons
                        name="loadingSpinner"
                        className="animate-spin text-[30px]"
                    />
                    <p>لطفا منتظر بمانید</p>
                </div>
            )}
        </button>
    </div>
)
