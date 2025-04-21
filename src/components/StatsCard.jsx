export default function StatsCard({ children, title, className }) {
    return (
        <div
            className={`${className} w-[10rem] desktop:w-[13rem] p-4 border border-dashed rounded-xl border-textPrimary flex flex-col gap-3`}>
            <h2 className="text-[18px] font-bold">{title}</h2>
            <p className="text-[20px] font-light">{children}</p>
        </div>
    )
}
