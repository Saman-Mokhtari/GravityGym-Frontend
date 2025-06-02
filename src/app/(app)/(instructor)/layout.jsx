'use client'

import { Toaster } from 'react-hot-toast'
import { NavigationTitleProvider } from '@/context/NavigationTitleContext'
import { ClassProvider } from '@/context/ClassContext'

const AppLayout = ({ children }) => {
    return (
        <ClassProvider>
            <NavigationTitleProvider>
                <div dir="rtl" className="w-full flex flex-col font-font">
                    <Toaster />
                    <main>{children}</main>
                </div>
            </NavigationTitleProvider>
        </ClassProvider>
    )
}

export default AppLayout
