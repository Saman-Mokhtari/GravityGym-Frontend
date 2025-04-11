export default function FormLabel({
    text,
    children,
    error = false,
    className = null,
}) {
    return (
        <div className="flex flex-col relative w-fit">
            <p
                className={`${className} font-light font-font ${!error ? 'text-textSecondary ' : 'text-error'}`}>
                {text}
            </p>
            {children}
        </div>
    )
}
