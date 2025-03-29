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

  const { reset, stompClient, isAuthenticated, setMessageReceived } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  useEffect(() => {
    if (isAuthenticated && !stompClient.connected) {
      stompClient.activate()
      stompClient.onConnect = () => {
        stompClient.subscribe(`/user/${userAccount.id}/queue/messages`, onMessageReceived)
      }
      return
    }
    if (!isAuthenticated && stompClient.connected) {
      stompClient.deactivate().then(() => console.log('disconnected'))
      return
    }
  }, [isAuthenticated])

  function onMessageReceived(message: IMessage): void {
    setMessageReceived(message)
  }

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
