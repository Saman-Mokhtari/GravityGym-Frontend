'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/(dashboard)/Navigation'
import Loading from '@/app/(app)/(dashboard)/Loading'
import BottomNavbar from '@/components/BottomNavbar'
import DashboardNavigation from '@/components/DashboardNavigation'
import { usePathname } from 'next/navigation'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const pathName = usePathname()
    if (!user) {
        return <Loading />
    }

    return (
        <div dir="rtl" className="w-full flex flex-col font-font">
            {pathName === '/complete-signup' && <DashboardNavigation />}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
