import { memo } from 'react'
import { Outlet } from 'react-router-dom'

import AuthHeader from 'src/components/AuthHeader'

function AuthLayout() {
  return (
    <div className='h-screen bg-[#f2f4f7]'>
      <AuthHeader />
      <Outlet />
    </div>
  )
}

export default memo(AuthLayout)
