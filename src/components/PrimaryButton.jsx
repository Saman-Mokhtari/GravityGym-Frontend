import Icons from '@/components/Icons'

export default function PrimaryButton({
    loading,
    className,
    children,
    disabled = false,
}) {
    return (
        <button
            disabled={loading || disabled}
            className={`w-full disabled:cursor-not-allowed disabled:opacity-25  mt-4 flex justify-center items-center text-bgPrimary  rounded-md  h-16 bg-bgTertiary hover:scale-[1.02] transition-all !${className}`}>
            {!loading ? (
                <p className="font-bold text-[18px]">{children}</p>
            ) : (
                <div className="flex items-center gap-2">
                    <Icons
                        name="loadingSpinner"
                        className="animate-spin text-[30px]"
                    />
                    <p>لطفا منتظر بمانید</p>
                </div>
            )}
        </button>
    )
}
