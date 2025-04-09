'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/(dashboard)/Navigation'
import Loading from '@/app/(app)/(dashboard)/Loading'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div dir="rtl" className="w-full flex flex-col font-font">
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
