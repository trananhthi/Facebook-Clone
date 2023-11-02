import { memo } from 'react'
import { Outlet } from 'react-router-dom'

import HomeHeader from '../../components/HomeHeader'

function MainLayout() {
  return (
    <div className='h-full bg-[#f2f4f7]'>
      <HomeHeader />
      <div className='mt-[56px]'>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(MainLayout)
