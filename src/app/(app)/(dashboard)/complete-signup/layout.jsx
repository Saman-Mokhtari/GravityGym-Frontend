'use client'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import Loading from '@/app/(auth)/Loading'
import { toast } from 'react-hot-toast'

export default function Layout({ children }) {
    const router = useRouter()
    const { user, swrLoading } = useAuth()

    if (swrLoading) return <h2>Loading</h2>

    if (!user) {
        router.push('/')
        return null
    }
    if (!user) return <h2>loading</h2>
    return <>{children}</>
}
