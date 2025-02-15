import axios, { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from './auth'
import { LoginResponse } from 'src/types/auth.type'
import { URL_SIGNIN, URL_SIGNUP, URL_REFRESH_TOKEN } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

const API_URL = import.meta.env.VITE_SERVER_URL as string

const createHttpInstance = () => {
  let accessToken = getAccessTokenFromLS()
  let refreshToken = getRefreshTokenFromLS()
  let refreshTokenRequest: Promise<void> | null = null

  const http = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
      'X-Requested-With': 'XMLHttpRequest' // Hỗ trợ CORS
    }
  })

  // Add a request interceptor
  http.interceptors.request.use(
    function (config) {
      if (accessToken) config.headers.Authorization = 'Bearer ' + accessToken
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  http.interceptors.response.use(
    function (response) {
      const url = response.config.url

      if (url === URL_SIGNIN) {
        const data = response.data as LoginResponse
        if (data.accessToken !== '') {
          accessToken = data.accessToken
          refreshToken = data.refreshToken
          setAccessTokenToLS(accessToken)
          setRefreshTokenToLS(refreshToken)
        }
      }

      return response
    },
    async function (error: AxiosError<ErrorResponse>) {
      if (
        error.config?.url !== URL_SIGNIN &&
        error.config?.url !== URL_SIGNUP &&
        error.response?.status !== HttpStatusCode.Unauthorized
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const data: any | undefined = error.response?.data
        // const errorMessage = data?.message || error.message
        // toast.error(errorMessage, {
        //   autoClose: 3000
        // })
      }

      // Xử lý lỗi 500 chung
      if (error.response?.status === 500) {
        toast.error(error.response.data.message)
        return Promise.reject(error)
      }

      //Unauthorized error
      if (isAxiosUnauthorizedError<ErrorResponse>(error)) {
        const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
        const { url } = config

        // Trường hợp token hết hạn và request đó không phải của refresh token
        // thì mới gọi refresh token
        if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
          // Tránh gọi refresh token 2 lần
          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : handleRefreshToken().finally(() => {
                // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                setTimeout(() => {
                  refreshTokenRequest = null
                }, 10000)
              })

          await refreshTokenRequest
          return await http(config)
        }

        // Còn những trường hợp token không đúng
        // không truyền token
        // token hết hạn
        // nhưng gọi refresh token fail
        // thì tiến hành xóa local storage và toast message
        accessToken = ''
        refreshToken = ''
        clearLS()
        toast.error(error.response?.data.message || error.message)
      }

      return Promise.reject(error)
    }
  )

  const handleRefreshToken = async () => {
    try {
      const res = await http.post<LoginResponse>(URL_REFRESH_TOKEN, { refreshToken: refreshToken })
      accessToken = res.data.accessToken
      setAccessTokenToLS(accessToken)
    } catch (error) {
      clearLS()
      accessToken = ''
      refreshToken = ''
      throw error
    }
  }

  return http
}

export default createHttpInstance()
