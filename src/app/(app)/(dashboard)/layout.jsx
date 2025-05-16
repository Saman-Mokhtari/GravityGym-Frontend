'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/(dashboard)/Loading'
import DashboardNavigation from '@/components/DashboardNavigation'
import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const pathName = usePathname()

    return (
        <div dir="rtl" className="w-full flex flex-col font-font">
            <Toaster />
            {pathName === '/complete-signup' && <DashboardNavigation />}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
