'use client'
import { useAuth } from '@/hooks/auth'
import { usePathname, useRouter } from 'next/navigation'
import GravityLoader from '@/components/GravityLoader'
import { useEffect } from 'react'
import { useNavigationTitle } from '@/context/NavigationTitleContext'

export default function Layout({ children }) {
    const { user } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const { setTitle } = useNavigationTitle()
    useEffect(() => {
        if (pathname === '/complete-signup' && user && user.name) {
            router.replace('/dashboard/classes')
        } else if (user?.name) {
            router.back()
            setTitle('تکمیل اطلاعات')
        }
    }, [user, pathname, router])

    if (!user) return <GravityLoader />

    return <>{children}</>
}
