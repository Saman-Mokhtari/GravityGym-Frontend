'use client'

import { useAuth } from '@/hooks/auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const pathName = usePathname()
    const router = useRouter()
    useEffect(() => {
        if (user && user?.role !== 'superUser') {
            router.replace('/dashboard')
        }
    }, [user])

    if (!user || user.role !== 'superUser') {
        return null
    }

    return (
        <div dir="rtl" className="w-full flex flex-col font-font">
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
