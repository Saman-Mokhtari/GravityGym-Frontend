'use client'

import DashboardNavigation from '@/components/DashboardNavigation'
import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { NavigationTitleProvider } from '@/context/NavigationTitleContext'

const AppLayout = ({ children }) => {
    const pathName = usePathname()

    return (
        <NavigationTitleProvider>
            <div dir="rtl" className="w-full flex flex-col font-font">
                <Toaster />
                {pathName === '/complete-signup' && <DashboardNavigation />}
                <main>{children}</main>
            </div>
        </NavigationTitleProvider>
    )
}

export default AppLayout
