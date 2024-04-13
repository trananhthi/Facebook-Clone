import NavigationOfHome from './components/NavigationOfHome'
import HomeFeed from './components/HomeFeed'
import ContactOfHome from './components/ContactOfHome'

function Home() {
  return (
    <div className='flex bg-[#f2f4f7] justify-center 900-1100:justify-start 950-1100:px-20 900-950:px-12'>
      <div className='3xl:w-[360px] 2xl:w-[340px] xl:w-[280px] semi-lg:w-[280px]  semi-lg:block hidden absolute left-0'>
        <NavigationOfHome />
      </div>
      <div className='950-1100:mr-10'>
        <HomeFeed />
      </div>
      <div className='hidden semi-md:block 3xl:w-[360px] 2xl:w-[340px] xl:w-[280px] semi-lg:w-[280px] 900-950:w-[260px] semi-lg:absolute right-0'>
        <ContactOfHome />
      </div>
    </div>
  )
}

export default Home
/* 2xl:w-[793px] xl:w-[500px] */
