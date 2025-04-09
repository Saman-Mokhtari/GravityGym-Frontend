import SuggestionCard from '@/components/SuggestionCard'
import suggestion from '/public/images/suggestion.jpg'

export default function Suggestions() {
    return (
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8 w-full place-items-center py-8">
            <SuggestionCard
                image={suggestion}
                alt={'تصویر کلیستنیکس'}
                text="کلیستنیکس"
            />
            <SuggestionCard
                image={suggestion}
                alt={'تصویر کلیستنیکس'}
                text="یوگا"
            />
            <SuggestionCard
                image={suggestion}
                alt={'تصویر کلیستنیکس'}
                text="کراس فیت"
            />
            <SuggestionCard
                image={suggestion}
                alt={'تصویر کلیستنیکس'}
                text="فیتنس"
            />
        </div>
    )
}
