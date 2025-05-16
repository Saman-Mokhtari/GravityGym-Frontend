export default function PageTitle({ firstLine = null, secondLine = null }) {
    return (
        <h2 className="text-[25px] font-bold">
            {firstLine}
            <br />
            {secondLine}
        </h2>
    )
}
