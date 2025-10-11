import Link from 'next/link'
import Icons from './Icons'

export default function SidebarLink({
    href,
    icon,
    label,
    active,
    className = null,
    onClick = null
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`w-full p-2 rounded-md cursor-pointer flex items-center gap-2 text-[18px] transition-all hover:bg-bgDashboardHover ${className} ${
                active ? '!bg-bgDashboardHover' : ''
            }`}>
            <Icons name={icon} className="text-[16px]" />
            <h2>{label}</h2>
        </Link>
    )
}
