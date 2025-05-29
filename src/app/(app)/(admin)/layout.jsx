'use client'

import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SkeletonDashboardLoader from '@/components/SkeletonDashboardLoader'
import { NavigationTitleProvider } from '@/context/NavigationTitleContext'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    useEffect(() => {
        if (user && user?.role !== 'superUser') {
            router.replace('/dashboard')
        }
    }, [user])

    if (!user || user.role !== 'superUser') {
        return <SkeletonDashboardLoader />
    }

    return (
        <div dir="rtl" className="w-full flex flex-col font-font">
            <NavigationTitleProvider>{children}</NavigationTitleProvider>
        </div>
    )
}

export default AppLayout
