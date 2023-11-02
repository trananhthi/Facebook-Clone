import { /* Suspense, lazy,  */ useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import routes from './constants/routes'
import { AppContext } from './contexts/app.context'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
/* Layout */
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
/* Pages */
import Auth from './pages/Auth'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ConfirmAccount from './pages/Auth/pages/ConfirmAccount'
import Wellcome from './pages/Auth/pages/Wellcome'
import Friend from './pages/Friend'
import Group from './pages/Group'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={routes.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  const email = useSelector((state: RootState) => state.rootReducer.tempAccountReducer.email)
  if (email) {
    return <Navigate to={'/authenticate/' + btoa(email as string)}></Navigate>
  }

  return isAuthenticated ? <Navigate to={routes.home} /> : <Outlet />
}

function ProtectedRouteIfEmailExists() {
  const email = useSelector((state: RootState) => state.rootReducer.tempAccountReducer.email)
  return email === null ? <Navigate to={routes.login}></Navigate> : <Outlet />
}

function useRouteElements() {
  const isConfirmed = useSelector((state: RootState) => state.rootReducer.tempAccountReducer.isConfirmed)
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: routes.login,
          element: <Auth />
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRouteIfEmailExists />,
      children: [
        {
          path: '',
          element: <AuthLayout />,
          children: [
            {
              path: routes.confirmAccount,
              element: isConfirmed !== true ? <ConfirmAccount /> : <Wellcome />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: routes.home,
              element: <Home />
            },
            {
              path: routes.friend,
              element: <Friend />
            },
            {
              path: routes.group,
              element: <Group />
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <ProtectedRoute />,
      children: [
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
