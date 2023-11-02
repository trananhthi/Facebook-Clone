import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'

type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
}

const inititalAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLS() && localStorage.getItem('persist:root')),
  setIsAuthenticated: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextType>(inititalAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(inititalAppContext.isAuthenticated)

  const reset = () => {
    setIsAuthenticated(false)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
