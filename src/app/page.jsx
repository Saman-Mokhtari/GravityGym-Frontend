import Navigation from '@/components/Navigation'
import Image from 'next/image'
import background from '/public/images/heroBackground.jpg'
import Header from '@/components/Header'

export const metadata = {
    title: 'Laravel',
}

const Home = () => {
    return (
        <div dir="rtl" className="w-full flex flex-col font-font">
            <Header />
        </div>
    )
}

export default Home
