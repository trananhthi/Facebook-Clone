import React, { memo, useCallback } from 'react'
import { Outlet, useMatches, ScrollRestoration } from 'react-router-dom'

import HomeHeader from '../../components/HomeHeader'
import { Helmet } from 'react-helmet-async'

function MainLayout({ children }: { children: React.ReactNode }) {
  const getKey = useCallback((location: Location | any, matches: ReturnType<typeof useMatches>) => {
    const match = matches.find((m) => (m.handle as any)?.scrollMode)
    if ((match?.handle as any)?.scrollMode === 'pathname') {
      return location.pathname
    }

    return location.key
  }, [])
  return (
    <>
      <div className='h-screen flex flex-col'>
        <Helmet>
          <title>Facebook</title>
          <meta name='description' content='Facebook' />
        </Helmet>
        <HomeHeader />
        <div className='mt-[56px] h-full'>{children ? children : <Outlet />}</div>
      </div>
      <ScrollRestoration getKey={getKey as any} />
    </>
  )
}

export default memo(MainLayout)
