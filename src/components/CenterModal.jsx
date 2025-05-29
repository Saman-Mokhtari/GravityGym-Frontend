'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import useClickOutside from '@/hooks/useClickOutside'
import Icons from '@/components/Icons'

export default function CenterModal({
    children,
    openModal,
    setOpenModal,
    className = null,
    overFlow = false,
}) {
    const modal = useRef(null)
    const modalBack = useRef(null)

    const closeModal = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = ''
        }
    }, [openModal])

    useClickOutside(modal, closeModal)

    useGSAP(() => {
        if (openModal) {
            gsap.set([modalBack.current, modal.current], { display: 'flex' })
            gsap.to(modalBack.current, {
                duration: 0.25,
                opacity: 1,
                ease: 'power2.out',
            })
            gsap.to(modal.current, {
                duration: 0.25,
                opacity: 1,
                ease: 'power2.out',
            })
        } else {
            gsap.to(modal.current, {
                duration: 0.25,
                opacity: 0,
                ease: 'power2.in',
            })
            gsap.to(modalBack.current, {
                duration: 0.25,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set([modalBack.current, modal.current], {
                        display: 'none',
                    })
                },
            })
        }
    }, [openModal])

    return (
        <>
            <div
                ref={modalBack}
                style={{ display: 'none', opacity: 0 }}
                className="w-screen h-screen top-0 left-0 bg-black/50 fixed z-[90] backdrop-blur-[1px] flex-col"
            />
            <div
                ref={modal}
                style={{ display: 'none', opacity: 0 }}
                className={`${className} fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-h-[100vh] h-fit py-4 px-6 rounded-xl shadow-custom bg-bgPrimary overflow-x-hidden flex-col ${overFlow ? 'overflow-y-scroll' : 'overflow-y-hidden'}`}>
                <div className="w-full">
                    <Icons
                        name="close"
                        className="text-[22px] cursor-pointer"
                        onClick={closeModal}
                    />
                </div>
                {children}
            </div>
        </>
    )
}
