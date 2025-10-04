import Icons from './Icons'

export default function TransactionCard({name, datetime, price}) {
    return (
        <article className="w-full flex items-center justify-between">
            {/* Transaction information */}
            <div className="flex items-center gap-3">
                <div className="aspect-square w-12 rounded-xl bg-bgDashboardHover justify-center items-center flex">
                    <Icons
                        name="transaction"
                        className="text-[24px] text-green-500"
                    />
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <div className='w-36 flex items-start'>
                        <h2 className="text-[16px] font-semibold line-clamp-1">{name}</h2>
                    </div>
                    <div
                        dir="ltr"
                        className="flex items-center gap-2 text-[16px]">
                        <p>{datetime?.date}</p>
                        <p>{datetime?.clock}</p>
                    </div>
                </div>
            </div>

            {/* Transaction ammount */}
            <div className="flex items-center gap-1">
                <div className="text-green-500 font-semibold flex gap-1 items-center text-[16px]">
                    <p>{price?.toLocaleString()}</p>
                    <p>تومانءء</p>
                </div>
            </div>
        </article>
    )
}
