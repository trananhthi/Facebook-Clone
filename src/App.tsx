import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import useRouteElements from './useRouteElements'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { RouterProvider } from 'react-router-dom'

function App() {
  const router = useRouteElements()

  const { reset, stompClient, isAuthenticated } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  useEffect(() => {
    if (isAuthenticated && !stompClient.connected) {
      stompClient.activate()
      return
    }
    if (!isAuthenticated && stompClient.connected) {
      stompClient.deactivate()
      return
    }
  }, [isAuthenticated])

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
