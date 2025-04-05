import LoginLinks from '@/app/LoginLinks'
import Icons from '@/components/Icons'

export const metadata = {
    title: 'Laravel',
}

const Home = () => {
    return (
        <div className="flex p-4 justify-center items-center font-font flex-col gap-4">
            <h2 className="flex text-[25px] font-bold p-4 rounded-xl  text-center bg-bgSecondary text-textPrimary w-fit shadow-custom hover:scale-105 transition-all cursor-pointer duration-200 group">Say Hello Gravity</h2>
            <p className='font-thin text-[25px] text-textSecondary group-hover:scale-95 transition-all duration-75'>پروژه سال 1404</p>
        </div>
    )
}

export default Home
