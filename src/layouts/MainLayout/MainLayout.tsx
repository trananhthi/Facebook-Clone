import { memo, useCallback } from 'react'
import { Outlet, useMatches } from 'react-router-dom'

import HomeHeader from '../../components/HomeHeader'
import { Helmet } from 'react-helmet-async'
import { ScrollRestoration } from 'react-router-dom'

function MainLayout() {
  const getKey = useCallback((location: Location | any, matches: ReturnType<typeof useMatches>) => {
    let match = matches.find((m) => (m.handle as any)?.scrollMode)
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
        <div className='mt-[56px] h-full'>
          <Outlet />
        </div>
      </div>
      <ScrollRestoration getKey={getKey as any} />
    </>
  )
}

export default memo(MainLayout)
