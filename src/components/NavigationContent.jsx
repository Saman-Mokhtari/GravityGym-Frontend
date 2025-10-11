import { usePathname } from 'next/navigation'
import FormLabel from './FormLabel'
import SidebarLink from './SidebarLink'

export default function NavigationContent({ setNavOpen = null }) {
    const pathName = usePathname()

    return (
        <div className="mt-20 desktop:mt-8 flex flex-col gap-2 w-full desktop:p-0 bg-white desktop:bg-transparent">
            <div className="w-full flex items-center">
                <FormLabel text="مدیریت" />
            </div>
            <SidebarLink
                className=""
                href="/admin"
                onClick={() => {
                    setNavOpen(false)
                }}
                icon={pathName === '/admin' ? 'gridSolid' : 'gridLight'}
                active={pathName === '/admin'}
                label="صفحه اصلی داشبورد"
            />

            <SidebarLink
                className=""
                href="/admin/classes"
                active={pathName.startsWith('/admin/classes')}
                onClick={() => {
                    setNavOpen(false)
                }}
                icon={
                    pathName.startsWith('/admin/classes')
                        ? 'dumbleSolid'
                        : 'dumbleLight'
                }
                label="مدیریت کلاس‌ها"
            />
            <SidebarLink
                className=""
                href="/admin/users"
                active={pathName.startsWith('/admin/users')}
                onClick={() => {
                    setNavOpen(false)
                }}
                icon={
                    pathName.startsWith('/admin/users') ? 'users' : 'usersLight'
                }
                label="مدیریت اعضای باشگاه"
            />

            <SidebarLink
                className=""
                href="/admin/finance"
                active={pathName.startsWith('/admin/finance')}
                onClick={() => {
                    setNavOpen(false)
                }}
                icon={
                    pathName.startsWith('/admin/finance')
                        ? 'transactionSolid'
                        : 'transactionThin'
                }
                label="مدیریت مالی باشگاه"
            />
        </div>
    )
}
