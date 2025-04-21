'use client'

import { useAuth } from '@/hooks/auth'
import DashboardNavigation from '@/components/DashboardNavigation'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const pathName = usePathname()
    const router = useRouter()
    useEffect(() => {
        if (user && user.role !== 'superUser') {
            router.back()
        }
    }, [user, router])

    if (!user || user.role !== 'superUser') {
        return null // or a loading indicator
    }

    return (
        <div dir="rtl" className="w-full flex flex-col font-font">
            {pathName === '/complete-signup' && <DashboardNavigation />}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
