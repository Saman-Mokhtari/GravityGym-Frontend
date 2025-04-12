'use client'
import Icons from '@/components/Icons'
import { Drawer } from 'vaul'
import React, { useState } from 'react'
import SubscriptionCard from '@/components/SubscriptionCard'
import useWindowSize from '@/hooks/useWindowSize'
import CenterModal from '@/components/CenterModal'

export default function Subscription() {
    const [isOpen, setIsOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { isDesktop } = useWindowSize()
    const [isClickDisabled, setIsClickDisabled] = useState(false)

    const handleClick = () => {
        if (isClickDisabled) return // Prevent clicks while disabled

        setOpenModal(prev => !prev)
        setIsClickDisabled(true) // Disable further clicks

        // Re-enable clicking after 2 seconds
        setTimeout(() => {
            setIsClickDisabled(false)
        }, 500)
    }

    return (
        <>
            {!isDesktop ? (
                <Drawer.Root
                    dismissible={true}
                    open={isOpen}
                    onOpenChange={setIsOpen}>
                    <Drawer.Trigger className="cursor-pointer w-full">
                        <div className="w-full  border-2 border-bgPrimary rounded-md h-16 justify-between px-3 items-center flex">
                            <h2 className="font-bold text-bgPrimary text-center text-[20px]">
                                کلیستنیکس
                            </h2>
                            <Icons
                                name="caretDown"
                                className="text-[25px] text-bgPrimary"
                            />
                        </div>
                    </Drawer.Trigger>

                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
                        <Drawer.Title className="hidden" />

                        <Drawer.Content className="bg-white p-4 z-50 flex flex-col font-font gap-6 fixed bottom-0 left-0 right-0 max-h-[80vh] rounded-t-[10px]">
                            {/* Make Table Scrollable on X-Axis */}
                            <div
                                dir="rtl"
                                className="flex flex-col w-full h-full py-4 gap-8">
                                <div className="flex flex-col items-center px-2 left-1/2 -translate-x-1/2 gap-12 w-full fixed top-3 bg-bgPrimary">
                                    <Drawer.Handle />
                                    <p className="text-[18px] w-full text-start">
                                        کلاس مورد نظر خود را انتخاب کنید
                                    </p>
                                </div>
                                <div className="flex flex-col gap-8 font-bold text-[20px] overflow-y-scroll h-[60vh] mt-20">
                                    <div className="w-full h-fit flex flex-col gap-6">
                                        <div className="flex w-full bg-bgInput !h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                        <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                        <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                        <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                        <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                        <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                        <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                        <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                        <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                            <h2>کلیستنیکس</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            ) : (
                <>
                    <div
                        onClick={() => {
                            handleClick()
                        }}
                        className="w-[60%] !cursor-pointer border-2 border-bgPrimary rounded-md h-16 justify-between px-3 items-center flex">
                        <h2 className="font-bold text-bgPrimary text-center text-[20px]">
                            کلیستنیکس
                        </h2>
                        <Icons
                            name="caretDown"
                            className="text-[25px] text-bgPrimary"
                        />
                    </div>
                    <CenterModal
                        setOpenModal={setOpenModal}
                        openModal={openModal}>
                        <div
                            dir="rtl"
                            className="flex flex-col w-full h-full py-4 gap-8">
                            <div className="flex flex-col items-center border-b px-[1.9rem] left-1/2 -translate-x-1/2 py-4 w-full fixed top-3 bg-bgPrimary">
                                <div className="w-full flex items-center justify-end py-2">
                                    <Icons
                                        name={'close'}
                                        className="text-[22px] cursor-pointer"
                                        onClick={() => {
                                            setOpenModal(false)
                                        }}
                                    />
                                </div>
                                <p className="text-[18px] w-full text-start font-bold">
                                    کلاس مورد نظر خود را انتخاب کنید
                                </p>
                            </div>
                            <div className="flex flex-col gap-8 font-bold text-[20px] overflow-y-scroll h-[60vh] mt-16">
                                <div className="w-full h-fit flex flex-col gap-6">
                                    <div className="flex w-full bg-bgInput !h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                    <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                    <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                    <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                    <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                    <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                    <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                    <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                    <div className="flex w-full bg-bgInput h-16 items-center px-2 rounded-md">
                                        <h2>کلیستنیکس</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CenterModal>
                </>
            )}

            <div className="grid grid-cols-1 w-full desktop:grid-cols-3 place-items-center gap-8">
                <SubscriptionCard sessions={8} period="ماهانه" />
                <SubscriptionCard sessions={12} period="ماهانه" />
                <SubscriptionCard sessions={16} period="ماهانه" />
            </div>
        </>
    )
}
