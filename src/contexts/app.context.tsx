import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'
import { Client } from '@stomp/stompjs'

const WS_URL = import.meta.env.VITE_WEBSOCKET_SERVER_URL as string

type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
  stompClient: Client
}

const inititalAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLS() && localStorage.getItem('persist:root')),
  setIsAuthenticated: () => null,
  reset: () => null,
  stompClient: new Client({
    brokerURL: WS_URL
  })
}

export const AppContext = createContext<AppContextType>(inititalAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(inititalAppContext.isAuthenticated)
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
        stompClient
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
