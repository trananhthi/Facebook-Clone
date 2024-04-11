import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'
import { Client, IMessage } from '@stomp/stompjs'

const WS_URL = import.meta.env.VITE_WEBSOCKET_SERVER_URL as string

type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
  stompClient: Client
  messageReceived: IMessage | null
  setMessageReceived: React.Dispatch<React.SetStateAction<IMessage | null>>
}

const inititalAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLS() && localStorage.getItem('persist:root')),
  setIsAuthenticated: () => null,
  reset: () => null,
  stompClient: new Client({
    brokerURL: WS_URL
  }),
  messageReceived: null,
  setMessageReceived: () => null
}

export const AppContext = createContext<AppContextType>(inititalAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(inititalAppContext.isAuthenticated)
  const [messageReceived, setMessageReceived] = useState<IMessage | null>(inititalAppContext.messageReceived)

  // const [stompClient, setStompClient] = useState<Client | null>(null)

  const reset = () => {
    setIsAuthenticated(false)
  }

  const stompClient = inititalAppContext.stompClient

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        reset,
        stompClient,
        messageReceived,
        setMessageReceived
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
