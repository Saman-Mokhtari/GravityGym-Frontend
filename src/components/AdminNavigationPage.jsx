import { useAuth } from '@/hooks/auth'
import AdminProfile from './AdminProfile'
import NavigationContent from './NavigationContent'
import { usePathname } from 'next/navigation'

export default function AdminNavigationPage({ navOpen, setNavOpen }) {
    const {user,logout} = useAuth()
    const pathName = usePathname()
    return (
        <section
            className={`absolute top-0 left-0 w-screen pb-6 bg-white h-screen  ${navOpen ? 'flex flex-col justify-between' : 'hidden'} desktop:hidden z-40 px-6`}>
            <NavigationContent setNavOpen={setNavOpen} />
            <AdminProfile logout={logout} user={user} pathName={pathName} onClick={() => {setNavOpen(false)}}/>
        </section>
    )
}
