import React, { createContext, useState, useEffect } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'
import { Client, IMessage } from '@stomp/stompjs'

const WS_URL = import.meta.env.VITE_WEBSOCKET_SERVER_URL as string

type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
  stompClient: Client | null
  eventReceived: IMessage | null
  setEventReceived: React.Dispatch<React.SetStateAction<IMessage | null>>
}

export const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  reset: () => null,
  stompClient: null,
  eventReceived: null,
  setEventReceived: () => null
})

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const token = getAccessTokenFromLS()
  const isPersisted = Boolean(localStorage.getItem('persist:root'))
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(token && isPersisted))
  const [eventReceived, setEventReceived] = useState<IMessage | null>(null)
  const [stompClient, setStompClient] = useState<Client | null>(null)

  useEffect(() => {
    if (token) {
      const client = new Client({
        brokerURL: `${WS_URL}?token=Bearer ${token}`,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
          'Accept-Language': 'vi-VN'
        },
        onWebSocketError: (event) => {
          console.error('Lỗi WebSocket:', event)
        },
        onWebSocketClose: (event) => {
          console.log('Kết nối WebSocket đã đóng:', event)
        }
      })

      // client.activate()
      setStompClient(client)
    }
  }, [token]) // Tự động kết nối lại khi token thay đổi

  const reset = () => {
    setIsAuthenticated(false)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        reset,
        stompClient,
        eventReceived,
        setEventReceived
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
