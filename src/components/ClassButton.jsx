import Link from 'next/link'
import Image from 'next/image'
import calisthenics from '/public/images/calisthenics.png'
import Icons from '@/components/Icons'

export default function ClassButton() {
    return (
        <Link
            href="#"
            className="flex items-center justify-between border border-bgTertiary p-4 rounded-md">
            <div className="flex items-center gap-4">
                <Image src={calisthenics} alt="calis" width={50} height={50} />
                <h2 className="font-medium text-[20px]">کلیستنیکس</h2>
            </div>
            <Icons name="externalLink" className="text-[20px] -rotate-90" />
        </Link>
    )
}
