'use client'
import { ClassProvider } from '@/context/ClassContext'

export default function Layout({ children }) {
    return (
        <>
            <ClassProvider>{children}</ClassProvider>
        </>
    )
}
