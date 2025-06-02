import Link from 'next/link'
import Icons from '@/components/Icons'

export default function ClassButton({ enrollment, role }) {
    return (
        <Link
            href={
                role === 'admin'
                    ? `/admin/users/${enrollment?.user}/enrollments/${enrollment?.id}`
                    : role === 'instructor'
                      ? `/instructor/classes/${enrollment?.id}`
                      : `/dashboard/classes/${enrollment?.id}`
            }
            className={`flex w-full desktop:w-1/2 items-center hover:scale-[1.02] transition-all justify-between border border-bgTertiary p-4 rounded-md ${enrollment?.status === 'cancelled' || enrollment?.status === 'expired' ? 'opacity-50' : ''} ${enrollment?.status === 'reserved' ? 'opacity-30' : ''}`}>
            <div className="flex items-center gap-4 p-2">
                <h2 className="font-medium text-[20px]">
                    {enrollment?.subscription?.class?.name}{' '}
                    {enrollment?.status === 'reserved'
                        ? '(رزرو)'
                        : enrollment?.status === 'expired'
                          ? '(تمام شده)'
                          : enrollment?.status === 'cancelled'
                            ? '(کنسل شده)'
                            : null}
                </h2>
            </div>
            <Icons name="externalLink" className="text-[20px] -rotate-90" />
        </Link>
    )
}
