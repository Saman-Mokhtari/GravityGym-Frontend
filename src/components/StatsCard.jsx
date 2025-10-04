export default function StatsCard({ children, title, className }) {
    return (
        <div
            className={`${className} w-full desktop:w-[18rem] p-4 border border-dashed rounded-xl border-textPrimary flex flex-col gap-3`}>
            <h2 className="text-[18px] font-semibold">{title}</h2>
            <div className="text-[20px] font-light">{children}</div>
        </div>
    )
}
