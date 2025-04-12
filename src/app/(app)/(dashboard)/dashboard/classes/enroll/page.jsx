// ✅ Refactored Enroll.tsx - Clean, Modular, Maintainable

'use client'
import React, { useState, useEffect } from 'react'
import { Drawer } from 'vaul'
import Image from 'next/image'
import CenterModal from '@/components/CenterModal'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import ExpandableCard from '@/components/ExpandableCard'
import useWindowSize from '@/hooks/useWindowSize'
import { useClass } from '@/hooks/class'
import { usePayment } from '@/hooks/payment'
import zarinpal from '/public/images/zarinpal.svg'

export default function Enroll() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selectedSub, setSelectedSub] = useState(null)
    const [errors, setErrors] = useState([])

    const { isDesktop } = useWindowSize()
    const { gymClassesToAttend } = useClass()
    const { pay, loading } = usePayment()

    // Handles payment request to the server
    const handlePay = async event => {
        event.preventDefault()
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
        <div className="w-full flex flex-col gap-6 pb-16 desktop:pb-24">
            <div className="w-full flex justify-between gap-8">
                <div className="w-full desktop:w-1/2 flex flex-col gap-3">
                    <FormLabel text="کلاس مد نظر خود را انتخاب کنید" />
                    //Rendering Class Selector for both mobile and desktop
                    <ClassSelector
                        isDesktop={isDesktop}
                        selectedSub={selectedSub}
                        setSelectedSub={setSelectedSub}
                        setDrawerIsOpen={setDrawerIsOpen}
                        setOpenModal={setOpenModal}
                        drawerIsOpen={drawerIsOpen}
                        openModal={openModal}
                        gymClassesToAttend={gymClassesToAttend}
                    />
                </div>
                // Pay Button for desktop
                {isDesktop && selectedSub && (
                    <PaymentBox
                        selectedSub={selectedSub}
                        loading={loading}
                        onPay={handlePay}
                    />
                )}
            </div>
            // Payment summary and mobile payment button
            {selectedSub && (
                <div className="w-full flex flex-col gap-3">
                    <SubscriptionSummary selectedSub={selectedSub} />
                    {!isDesktop && (
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
    <div className="flex flex-col gap-2 px-2">
        <div className="flex items-center gap-2">
            <Icons name={icon} className="text-border" />
            <FormLabel text={label} />
        </div>
        <div className="text-black text-[18px] font-medium">{children}</div>
    </div>
)

//Summary section container
const SubscriptionSummary = ({ selectedSub }) => (
    <div className="flex flex-col gap-6">
        <SummarySection icon="dumbleSolid" label="کلاس انتخاب شده">
            {selectedSub.name}
        </SummarySection>
        <SummarySection icon="clock" label="تاریخ و ساعت">
            روزهای {selectedSub.day_type} از ساعت {selectedSub.start_time} تا{' '}
            {selectedSub.end_time}
        </SummarySection>
        <SummarySection icon="calendar" label="تعداد جلسات">
            {selectedSub.subscription.session_count} جلسه در ماه (
            {selectedSub.subscription.session_count / 4} جلسه در هفته)
        </SummarySection>
        <SummarySection icon="trainer" label="مربی">
            {selectedSub.instructor_name}
        </SummarySection>
        <SummarySection icon="gateway" label="درگاه پرداخت">
            <Image src={zarinpal} alt="zarinpal" className="w-6 h-6" />
        </SummarySection>
    </div>
)

//Payment button
const PaymentBox = ({ selectedSub, loading, onPay, isMobile = false }) => (
    <div
        className={`flex justify-between items-center ${
            isMobile
                ? 'w-full fixed bottom-0 right-0 px-4 py-3 bg-success shadow-custom'
                : 'w-full desktop:w-1/2 px-4 py-3 bg-success rounded-md shadow-custom'
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
            className="flex justify-center items-center bg-bgPrimary p-4 rounded-md w-5/12 hover:scale-[1.02] transition-all">
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

// Class selector component including modal and drawe phone desktop and mobile
const ClassSelector = ({
    isDesktop,
    selectedSub,
    setSelectedSub,
    setDrawerIsOpen,
    setOpenModal,
    drawerIsOpen,
    openModal,
    gymClassesToAttend,
}) => {
    return !isDesktop ? (
        <Drawer.Root
            open={drawerIsOpen}
            onOpenChange={setDrawerIsOpen}
            dismissible>
            <Drawer.Trigger className="cursor-pointer w-full">
                <div className="w-full border border-textPrimary rounded-md h-16 justify-between px-3 items-center flex">
                    <h2 className="font-light text-textPrimary text-center text-[20px]">
                        {selectedSub ? selectedSub.name : 'انتخاب کنید'}
                    </h2>
                    <Icons
                        name="caretDown"
                        className="text-[25px] text-textPrimary"
                    />
                </div>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[100]" />
                <Drawer.Content className="bg-bgPrimary p-4 z-[101] flex flex-col font-font gap-6 fixed bottom-0 left-0 right-0 max-h-[90vh] rounded-t-[10px]">
                    <div
                        dir="rtl"
                        className="flex flex-col w-full h-full py-4 gap-8">
                        <div className="flex flex-col items-center px-2 left-1/2 -translate-x-1/2 gap-12 w-full fixed top-3 bg-bgPrimary">
                            <Drawer.Handle />
                            <p className="text-[18px] w-full text-start">
                                کلاس مورد نظر خود را انتخاب کنید
                            </p>
                        </div>
                        <div className="flex flex-col gap-8 text-[20px] overflow-y-scroll h-[80vh] mt-20">
                            <div className="w-full h-fit flex flex-col">
                                {Array.isArray(gymClassesToAttend) &&
                                    gymClassesToAttend.map(gymClass => (
                                        <ExpandableCard
                                            key={gymClass.id}
                                            gymClass={gymClass}
                                            setSelectedSub={setSelectedSub}
                                            setDrawerIsOpen={setDrawerIsOpen}
                                            setOpenModal={setOpenModal}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    ) : (
        <>
            <div
                onClick={() => setOpenModal(true)}
                className="w-full cursor-pointer border border-textPrimary rounded-md h-16 justify-between px-3 items-center flex">
                <h2 className="font-light text-textPrimary text-center text-[20px]">
                    {selectedSub ? selectedSub.name : 'انتخاب کنید'}
                </h2>
                <Icons
                    name="caretDown"
                    className="text-[25px] text-textPrimary"
                />
            </div>
            <CenterModal
                className="w-[30vw]"
                openModal={openModal}
                setOpenModal={setOpenModal}>
                <div
                    dir="rtl"
                    className="flex flex-col w-full h-full py-4 gap-8">
                    <div className="flex flex-col items-center left-1/2 -translate-x-1/2 gap-12 w-full fixed top-16 bg-bgPrimary px-8 border-b pb-4">
                        <p className="text-[18px] w-full text-start">
                            کلاس مورد نظر خود را انتخاب کنید
                        </p>
                    </div>
                    <div className="flex flex-col gap-8 text-[20px] overflow-y-scroll h-[55vh] mt-16">
                        <div className="w-full h-fit flex flex-col">
                            {Array.isArray(gymClassesToAttend) &&
                                gymClassesToAttend.map(gymClass => (
                                    <ExpandableCard
                                        key={gymClass.id}
                                        gymClass={gymClass}
                                        setSelectedSub={setSelectedSub}
                                        setDrawerIsOpen={setDrawerIsOpen}
                                        setOpenModal={setOpenModal}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </CenterModal>
        </>
    )
}
