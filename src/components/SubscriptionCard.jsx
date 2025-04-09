import Icons from '@/components/Icons'

export default function SubscriptionCard({ sessions, period }) {
    return (
        <div className="aspect-[3/4] bg-bgPrimary flex flex-col justify-between items-center py-6 w-full rounded-2xl">
            <div className="flex flex-col gap-10 w-full items-center">
                <div className="flex items-center gap-2">
                    <h2 className="text-[20px] text-textPrimary font-bold">
                        {sessions} جلسه
                    </h2>
                    <p className="font-light text-[30px]">/</p>
                    <p className="font-thin text-[30px]">{period}</p>
                </div>
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center aspect-square w-8 border border-bgSubs rounded-full">
                                <Icons
                                    name="check"
                                    className="text-[18px] text-bgSubs"
                                />
                            </div>
                            <p className="text-textPrimary text-[18px] font-medium">
                                تمرینات ورزشی
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center aspect-square w-8 border border-bgSubs rounded-full">
                                <Icons
                                    name="check"
                                    className="text-[18px] text-bgSubs"
                                />
                            </div>
                            <p className="text-textPrimary text-[18px] font-medium">
                                دسترسی به همه وسیله و امکانات
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center aspect-square w-8 border border-bgSubs rounded-full">
                                <Icons
                                    name="check"
                                    className="text-[18px] text-bgSubs"
                                />
                            </div>
                            <p className="text-textPrimary text-[18px] font-medium">
                                نظارت کامل مربی
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex bg-bgTertiary justify-center items-center px-8 py-3 rounded-full">
                <h2 className="text-bgPrimary text-[20px] font-light">
                    ثبت نام
                </h2>
            </div>
        </div>
    )
}
