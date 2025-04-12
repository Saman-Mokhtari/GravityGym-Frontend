'use client'
import React, { useState } from 'react'
import CornerModal from '@/components/CornerModal'
import LoginSection from '@/components/LoginSection'
import OtpSection from '@/components/OtpSection'
import useWindowSize from '@/hooks/useWindowSize'
import { Drawer } from 'vaul'
import { useAuth } from '@/hooks/auth'
import LoginButton from '@/components/LoginButton'

export default function LoginRegister() {
    const [openModal, setOpenModal] = useState(false)
    const [isClickDisabled, setIsClickDisabled] = useState(false)
    const [codePhase, setCodePhase] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { isDesktop } = useWindowSize()
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [error, setError] = useState(false)
    const { loginExpired } = useAuth()

    const validationSuccess = () => {
        setCodePhase(true)
    }

    const codeExpired = async () => {
        await loginExpired({
            phone_number: phoneNumber,
        })
        setError(true)
        setCodePhase(false)
    }

    const handleClick = () => {
        if (isClickDisabled) return // Prevent clicks while disabled

        setOpenModal(prev => !prev)
        setIsClickDisabled(true) // Disable further clicks

        // Re-enable clicking after 2 seconds
        setTimeout(() => {
            setIsClickDisabled(false)
        }, 500)
    }

    if (isDesktop) {
        return (
            <>
                <LoginButton handleClick={handleClick} />
                <CornerModal
                    overFlow={false}
                    openModal={openModal}
                    setOpenModal={setOpenModal}>
                    {codePhase ? (
                        <OtpSection
                            codeExpired={codeExpired}
                            phoneNumber={phoneNumber}
                        />
                    ) : (
                        <LoginSection
                            validationSuccess={validationSuccess}
                            setPhoneNumber={setPhoneNumber}
                            error={error}
                        />
                    )}
                </CornerModal>
            </>
        )
    }

    return (
        <>
            <Drawer.Root
                dismissible={true}
                open={isOpen}
                onOpenChange={setIsOpen}>
                <Drawer.Trigger className="cursor-pointer">
                    <LoginButton />
                </Drawer.Trigger>

                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
                    <Drawer.Title className="hidden" />

                    <Drawer.Content className="bg-white p-4 z-50 flex flex-col font-font gap-6 fixed bottom-0 left-0 right-0 max-h-[100vh] rounded-t-[10px]">
                        <Drawer.Handle />

                        {/* Make Table Scrollable on X-Axis */}
                        <div className="flex w-full h-full items-center pb-2">
                            {codePhase ? (
                                <OtpSection
                                    codeExpired={codeExpired}
                                    phoneNumber={phoneNumber}
                                />
                            ) : (
                                <LoginSection
                                    validationSuccess={validationSuccess}
                                    setPhoneNumber={setPhoneNumber}
                                    error={error}
                                />
                            )}
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </>
    )
}
