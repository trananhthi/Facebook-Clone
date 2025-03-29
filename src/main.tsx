import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@material-tailwind/react'
import AppProvider from './contexts/app.context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { themeConfig } from 'src/constants/themeConfig.ts'
const showDevtools = import.meta.env.VITE_REACT_QUERY_DEVTOOLS === 'true'
// Tắt tự động fetch api khi focus vào window
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <RouterProvider router={routeElements} /> */}
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppProvider>
            <HelmetProvider>
              <ThemeProvider value={themeConfig}>
                <App />
              </ThemeProvider>
            </HelmetProvider>
          </AppProvider>
          {showDevtools && <ReactQueryDevtools initialIsOpen={false} />}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
    {/* </RouterProvider> */}
  </React.StrictMode>
)
