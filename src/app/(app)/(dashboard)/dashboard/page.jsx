'use client'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// export const metadata = {
//     title: 'Laravel - Dashboard',
// }

const Dashboard = () => {
    const { logout } = useAuth()
    const router = useRouter()
    useEffect(() => {
        router.replace('/dashboard/classes')
    }, [])
    return (
        <div className="w-full flex justify-center">
            <h2 className="text-[20px]">در دست ساخت</h2>
        </div>
    )
}

export default Dashboard
