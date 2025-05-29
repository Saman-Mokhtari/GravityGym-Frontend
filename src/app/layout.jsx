import { Nunito } from 'next/font/google'
import '@/app/global.css'
import NavigateToTop from '@/components/NavigateToTop'
import RouteProgress from '@/components/RouteProgress'
import { NavigationTitleProvider } from '@/context/NavigationTitleContext'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">
                <RouteProgress /> {/* نوار لودینگ */}
                <NavigationTitleProvider>{children}</NavigationTitleProvider>
                <NavigateToTop />
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Gravity Gym',
}

export default RootLayout
