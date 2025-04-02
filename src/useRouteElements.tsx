import { ComponentType, FC, lazy, Suspense, /* Suspense, lazy,  */ useContext } from 'react'
import { Navigate, Outlet, createBrowserRouter, matchPath } from 'react-router-dom'
import routes from './constants/routes'
import { AppContext } from './contexts/app.context'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
/* Layout */
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
/* Pages */
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import ConfirmAccount from './pages/Auth/pages/ConfirmAccount'
import Wellcome from './pages/Auth/pages/Wellcome'
import UserProfile from './pages/UserProfile'
import Messenger from './pages/Messenger'
import { Freeze } from 'react-freeze'

const Home = lazy(() => import('./pages/Home'))
const Friend = lazy(() => import('./pages/Friend'))
const Group = lazy(() => import('./pages/Group'))

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

interface FrozenComponentProps {
  component: ComponentType<any> // kiểu cho Component
  routePath: string
  currentPath: string
}

const FrozenComponent: FC<FrozenComponentProps> = ({ component: Component, routePath, currentPath }) => {
  const isActive = matchPath(currentPath, routePath) !== null

  return (
    <Freeze freeze={!isActive}>
      <div style={{ display: isActive ? 'block' : 'none' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      </div>
    </Freeze>
  )
}

function useRouteElements() {
  const isConfirmed = useSelector((state: RootState) => state.rootReducer.tempAccountReducer.isConfirmed)

  // MainLayout HOC với Freeze tích hợp
  const FrozenMainLayout = () => {
    // Lấy đường dẫn hiện tại từ React Router
    const { pathname } = window.location

    // Các component chính cần được freeze
    const frozenRoutes = [
      { path: routes.home, Component: Home },
      { path: routes.friend, Component: Friend },
      { path: routes.group, Component: Group }
    ]

    return (
      <MainLayout>
        {/* Render tất cả components nhưng chỉ hiển thị component hiện tại */}
        {frozenRoutes.map(({ path, Component }) => (
          <FrozenComponent key={path} component={Component} routePath={path} currentPath={pathname} />
        ))}
      </MainLayout>
    )
  }

  const router = createBrowserRouter([
    //Login, Register
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
    //private route
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: routes.home,
          element: <FrozenMainLayout />,
          handle: { scrollMode: 'pathname' }
        },
        {
          path: routes.friend,
          element: <FrozenMainLayout />
        },
        {
          path: routes.group,
          element: <FrozenMainLayout />
        },
        {
          path: routes.profile,
          element: <UserProfile />
        },
        {
          path: routes.messenger,
          element: <Messenger />
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

  return router
}

export default useRouteElements
