import NavigationOfHome from './components/NavigationOfHome'
import HomeFeed from './components/HomeFeed'
import ContactOfHome from './components/ContactOfHome'

function Home() {
  return (
    <div className='flex bg-[#f2f4f7] '>
      <div className='w-[360px]'>
        <NavigationOfHome />
      </div>
      <div className='w-[793px]'>
        <HomeFeed />
      </div>
      <div className='w-[360px]'>
        <ContactOfHome />
      </div>
    </div>
  )
}

export default Home
