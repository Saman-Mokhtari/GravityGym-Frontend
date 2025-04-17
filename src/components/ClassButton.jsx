import Link from 'next/link'
import Image from 'next/image'
import calisthenics from '/public/images/calisthenics.png'
import Icons from '@/components/Icons'

export default function ClassButton({ enrollment }) {
    return (
        <Link
            href="#"
            className={`flex w-full desktop:w-1/2 items-center hover:scale-[1.02] transition-all justify-between border border-bgTertiary p-4 rounded-md ${enrollment.status === 'cancelled' || enrollment.status === 'expired' ? 'opacity-50' : ''} ${enrollment.status === 'reserved' ? 'opacity-30' : ''}`}>
            <div className="flex items-center gap-4">
                <Image src={calisthenics} alt="calis" width={50} height={50} />
                <h2 className="font-medium text-[20px]">
                    {enrollment.subscription.class.name}{' '}
                    {enrollment.status === 'reserved'
                        ? '(رزرو)'
                        : enrollment.status === 'expired'
                          ? '(تمام شده)'
                          : enrollment.status === 'cancelled'
                            ? '(کنسل شده)'
                            : null}
                </h2>
            </div>
            <Icons name="externalLink" className="text-[20px] -rotate-90" />
        </Link>
    )
}
