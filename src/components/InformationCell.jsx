export default function InformationCell({ title, data, dataClassName }) {
    return (
        <div className="flex flex-col gap-2 ">
            <h2 className="text-[18px] font-medium">{title}</h2>
            <p
                className={`text-[18px] font-light text-textSecondary ${dataClassName}`}>
                {data}
            </p>
        </div>
    )
}
