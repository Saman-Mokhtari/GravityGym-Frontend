export default function FormLabel({ text, children }) {
    return (
        <div className="flex flex-col relative w-fit">
            <p className="text-textSecondary font-light font-font">{text}</p>
            {children}
        </div>
    )
}
