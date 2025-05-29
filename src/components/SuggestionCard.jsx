import Image from 'next/image'

export default function SuggestionCard({ text, image, alt }) {
    return (
        <div className="w-[90%] max-w-[20rem] aspect-square z-10 overflow-hidden rounded-3xl relative flex  justify-center items-center">
            <Image
                src={image}
                alt={alt}
                fill
                style={{ objectFit: 'cover' }}
                className="absolute top-0 -z-20 "
            />
            <div className="absolute  -z-10 top-0 h-full w-full bg-[#5F7252]/70" />
            <h2 className="font-bold text-[25px] text-bgPrimary">{text}</h2>
        </div>
    )
}
