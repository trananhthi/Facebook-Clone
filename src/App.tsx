import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import useRouteElements from './useRouteElements'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { IMessage } from '@stomp/stompjs'

function App() {
  const router = useRouteElements()
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  const { reset, stompClient, isAuthenticated, setEventReceived } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  useEffect(() => {
    if (!stompClient) return

    if (isAuthenticated) {
      if (!stompClient.active) {
        stompClient.activate()
      }

      stompClient.onConnect = () => {
        console.log('WebSocket connected!')
        stompClient.subscribe(`/user/${userAccount.id}/queue/messages`, onMessageReceived)
        stompClient.subscribe(`/user/${userAccount.id}/queue/typing`, onMessageReceived)
      }
    } else {
      if (stompClient.active) {
        stompClient.deactivate().then(() => console.log('WebSocket disconnected!'))
      }
    }
  }, [isAuthenticated, stompClient])

  function onMessageReceived(message: IMessage): void {
    setEventReceived(message)
  }

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
