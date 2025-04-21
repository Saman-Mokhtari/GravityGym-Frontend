import { Drawer } from 'vaul'
import Icons from '@/components/Icons'
import CenterModal from '@/components/CenterModal'
import React, { useState } from 'react'
import useWindowSize from '@/hooks/useWindowSize'
import { useClass } from '@/hooks/class'

export default function SubscriptionClassList({
    setSelectedClass,
    selectedClass = null,
}) {
    const { isDesktop } = useWindowSize()
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { active } = useClass()
    return !isDesktop ? (
        <Drawer.Root
            open={drawerIsOpen}
            onOpenChange={setDrawerIsOpen}
            dismissible>
            <Drawer.Trigger className="cursor-pointer w-full">
                <div className="w-full border border-bgPrimary rounded-md h-16 justify-between px-3 items-center flex">
                    <h2 className="font-light text-bgPrimary text-center text-[20px]">
                        {selectedClass
                            ? `${selectedClass.name}`
                            : 'کلاس مورد نظر خود را انتخاب کنید'}{' '}
                    </h2>
                    <Icons
                        name="caretDown"
                        className="text-[25px] text-bgPrimary"
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
                        <div className="flex flex-col gap-8 text-[20px] overflow-y-scroll h-[72vh] mt-20">
                            <div className="w-full h-fit flex flex-col gap-4">
                                {Array.isArray(active) &&
                                    active.map(gymClass => (
                                        // <ExpandableCard
                                        //     key={gymClass.id}
                                        //     gymClass={gymClass}
                                        //     setSelectedSub={setSelectedSub}
                                        //     setDrawerIsOpen={setDrawerIsOpen}
                                        //     setOpenModal={setOpenModal}
                                        // />
                                        <div
                                            className={`flex items-center justify-between w-full px-4 py-4 border border-gray-300 rounded-lg  text-right cursor-pointer transition-all duration-200`}>
                                            <span className="font-semibold text-[17px]">
                                                {gymClass.name}
                                            </span>
                                            <Icons
                                                name="chevronLeft"
                                                className={`transition-transform duration-300`}
                                            />
                                        </div>
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
                className="w-2/3  cursor-pointer border border-bgPrimary rounded-md h-16 justify-between px-3 items-center flex">
                <h2 className="font-light text-bgPrimary text-center text-[20px]">
                    {selectedClass
                        ? `${selectedClass.name}`
                        : 'کلاس مورد نظر خود را انتخاب کنید'}
                </h2>
                <Icons
                    name="caretDown"
                    className="text-[25px] text-bgPrimary"
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
                    <div className="flex flex-col gap-8 text-[20px] overflow-y-scroll h-[50vh] mt-16">
                        <div className="w-full h-fit flex flex-col gap-4">
                            {Array.isArray(active) &&
                                active.map(gymClass => (
                                    <div
                                        onClick={() => {
                                            setSelectedClass(gymClass)
                                            return setOpenModal(false)
                                        }}
                                        key={gymClass.id}
                                        className={`flex items-center hover:bg-gray-50 justify-between w-full px-4 py-4 border border-gray-300 rounded-lg  text-right cursor-pointer transition-all duration-200`}>
                                        <span className="font-semibold text-[17px]">
                                            {gymClass.name}
                                        </span>
                                        <Icons
                                            name="chevronLeft"
                                            className={`transition-transform duration-300`}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </CenterModal>
        </>
    )
}
