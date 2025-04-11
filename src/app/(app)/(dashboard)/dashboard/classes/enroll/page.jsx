'use client'
import FormLabel from '@/components/FormLabel'
import { Drawer } from 'vaul'
import Icons from '@/components/Icons'
import React, { useEffect, useState } from 'react'
import ExpandableCard from '@/components/ExpandableCard'
import { useClass } from '@/hooks/class'
import Image from 'next/image'
import zarinpal from '/public/images/zarinpal.svg'
import useWindowSize from '@/hooks/useWindowSize'
import CenterModal from '@/components/CenterModal'

export default function Enroll() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const { gymClassesToAttend } = useClass()
    const [selectedSub, setSelectedSub] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const { isDesktop } = useWindowSize()
    useEffect(() => {
        if (selectedSub) console.log(selectedSub)
    }, [selectedSub])
    return (
        <>
            <div className="w-full flex flex-col gap-6 pb-16 desktop:pb-24">
                <div className="w-full flex justify-between gap-8">
                    <div className="w-full desktop:w-1/2 flex flex-col gap-3 ">
                        <FormLabel text="کلاس مد نظر خود را انتخاب کنید" />
                        {!isDesktop ? (
                            <Drawer.Root
                                dismissible={true}
                                open={drawerIsOpen}
                                onOpenChange={setDrawerIsOpen}>
                                <Drawer.Trigger className="cursor-pointer w-full">
                                    <div className="w-full  border border-textPrimary rounded-md h-16 justify-between px-3 items-center flex">
                                        <h2 className="font-light text-textPrimary text-center text-[20px]">
                                            {selectedSub
                                                ? `${selectedSub.name}`
                                                : 'انتخاب کنید'}
                                        </h2>
                                        <Icons
                                            name="caretDown"
                                            className="text-[25px] text-textPrimary"
                                        />
                                    </div>
                                </Drawer.Trigger>
                                <Drawer.Portal>
                                    <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[100]" />
                                    <Drawer.Title className="hidden" />

                                    <Drawer.Content className="bg-bgPrimary p-4 z-[101] flex flex-col font-font gap-6 fixed bottom-0 left-0 right-0 max-h-[90vh] rounded-t-[10px]">
                                        {/* Make Table Scrollable on X-Axis */}
                                        <div
                                            dir="rtl"
                                            className="flex flex-col w-full h-full py-4 gap-8">
                                            <div className="flex flex-col items-center px-2 left-1/2 -translate-x-1/2 gap-12 w-full fixed top-3 bg-bgPrimary">
                                                <Drawer.Handle />
                                                <p className="text-[18px] w-full text-start">
                                                    کلاس مورد نظر خود را انتخاب
                                                    کنید
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-8 text-[20px] overflow-y-scroll h-[80vh] mt-20">
                                                <div className="w-full h-fit flex flex-col ">
                                                    {Array.isArray(
                                                        gymClassesToAttend,
                                                    ) &&
                                                        gymClassesToAttend.map(
                                                            gymClass => (
                                                                <ExpandableCard
                                                                    key={
                                                                        gymClass.id
                                                                    }
                                                                    setSelectedSub={
                                                                        setSelectedSub
                                                                    }
                                                                    setDrawerIsOpen={
                                                                        setDrawerIsOpen
                                                                    }
                                                                    gymClass={
                                                                        gymClass
                                                                    }
                                                                />
                                                            ),
                                                        )}
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
                                    className=" w-full cursor-pointer  border border-textPrimary rounded-md h-16 justify-between px-3 items-center flex">
                                    <h2 className="font-light text-textPrimary text-center text-[20px]">
                                        {selectedSub
                                            ? `${selectedSub.name}`
                                            : 'انتخاب کنید'}
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
                                            <div className="w-full h-fit flex flex-col ">
                                                {Array.isArray(
                                                    gymClassesToAttend,
                                                ) &&
                                                    gymClassesToAttend.map(
                                                        gymClass => (
                                                            <ExpandableCard
                                                                key={
                                                                    gymClass.id
                                                                }
                                                                setSelectedSub={
                                                                    setSelectedSub
                                                                }
                                                                setDrawerIsOpen={
                                                                    setDrawerIsOpen
                                                                }
                                                                setOpenModal={
                                                                    setOpenModal
                                                                }
                                                                gymClass={
                                                                    gymClass
                                                                }
                                                            />
                                                        ),
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </CenterModal>
                            </>
                        )}
                    </div>
                    {isDesktop && selectedSub && (
                        <div className="flex w-full desktop:w-1/2 justify-between px-4 items-center py-3 bg-success rounded-md shadow-custom">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-bgPrimary">
                                    <Icons name="price" className="" />
                                    <FormLabel
                                        text="هزینه اشتراک"
                                        className="!text-bgPrimary"
                                    />
                                </div>
                                <div className="text-black  flex gap-2">
                                    <p className="font-bold text-[18px] text-bgPrimary">
                                        {(
                                            selectedSub.subscription.price *
                                            1000000
                                        ).toLocaleString()}{' '}
                                        تومانءء
                                    </p>
                                </div>
                            </div>

                            <button className="flex  w-5/12 justify-center items-center bg-bgPrimary p-4 rounded-md">
                                <h2 className="text-end font-bold text-textSecondary">
                                    پرداخت
                                </h2>
                            </button>
                        </div>
                    )}
                </div>

                {selectedSub && (
                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex flex-col  gap-6">
                            {/*Selected Class*/}
                            <div className="flex flex-col gap-2 px-2">
                                <div className="flex items-center gap-2">
                                    <Icons
                                        name="dumbleSolid"
                                        className="text-border"
                                    />
                                    <FormLabel text="کلاس انتخاب شده" />
                                </div>
                                <div className="text-black flex gap-2">
                                    <p className="text-[18px] font-medium">
                                        {selectedSub.name}
                                    </p>
                                </div>
                            </div>
                            {/*Date & Time*/}
                            <div className="flex flex-col gap-2 px-2">
                                <div className="flex items-center gap-2">
                                    <Icons
                                        name="clock"
                                        className="text-border"
                                    />
                                    <FormLabel text="تاریخ و ساعت" />
                                </div>
                                <div className="text-black  flex gap-2">
                                    <p className="text-[18px] font-medium">
                                        روزهای {selectedSub.day_type}
                                    </p>
                                    <p className="text-[18px] font-medium">
                                        از ساعت {selectedSub.start_time} تا
                                        {selectedSub.end_time}
                                    </p>
                                </div>
                            </div>
                            {/*Subscription Sessions*/}
                            <div className="flex flex-col gap-2 px-2">
                                <div className="flex items-center gap-2">
                                    <Icons
                                        name="calendar"
                                        className="text-border"
                                    />
                                    <FormLabel text="تعداد جلسات" />
                                </div>
                                <div className="text-black  flex gap-2">
                                    <p className="text-[18px] font-medium">
                                        {selectedSub.subscription.session_count}{' '}
                                        جلسه در ماه (
                                        {selectedSub.subscription
                                            .session_count / 4}{' '}
                                        جلسه در هفته)
                                    </p>
                                </div>
                            </div>
                            {/* Trainer */}
                            <div className="flex flex-col gap-2 px-2">
                                <div className="flex items-center gap-2">
                                    <Icons
                                        name="trainer"
                                        className="text-border"
                                    />
                                    <FormLabel text="مربی" />
                                </div>
                                <div className="text-black ">
                                    <p className="text-[18px] font-medium">
                                        {selectedSub.instructor_name}
                                    </p>
                                </div>
                            </div>
                            {/*Payment Gatway*/}
                            <div className="flex flex-col gap-3 px-2">
                                <div className="flex items-center gap-2">
                                    <Icons
                                        name="gateway"
                                        className="text-border"
                                    />
                                    <FormLabel text="درگاه پرداخت" />
                                </div>
                                <div className="text-black w-1/12">
                                    <Image
                                        src={zarinpal}
                                        alt="zarinpal gatewat"
                                    />
                                </div>
                            </div>
                            {/* Payment Call to Action */}
                            {!isDesktop && (
                                <div className="flex w-full fixed  bottom-0 right-0 justify-between px-4 items-center py-3 bg-success shadow-custom">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-bgPrimary">
                                            <Icons name="price" className="" />
                                            <FormLabel
                                                text="هزینه اشتراک"
                                                className="!text-bgPrimary"
                                            />
                                        </div>
                                        <div className="text-black  flex gap-2">
                                            <p className="font-bold text-[18px] text-bgPrimary">
                                                {(
                                                    selectedSub.subscription
                                                        .price * 1000000
                                                ).toLocaleString()}{' '}
                                                تومانءء
                                            </p>
                                        </div>
                                    </div>

                                    <button className="flex  w-5/12 justify-center items-center bg-bgPrimary p-4 rounded-md">
                                        <h2 className="text-end font-bold text-textSecondary">
                                            پرداخت
                                        </h2>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
