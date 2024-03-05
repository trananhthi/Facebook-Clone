import { memo } from 'react'
import { Outlet } from 'react-router-dom'

import HomeHeader from '../../components/HomeHeader'
import { Helmet } from 'react-helmet-async'

function MainLayout() {
  return (
    <div className='h-screen flex flex-col'>
      <Helmet>
        <title>Facebook</title>
        <meta name='description' content='Facebook' />
      </Helmet>
      <HomeHeader />
      <div className='mt-[56px] h-full '>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(MainLayout)
